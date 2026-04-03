# Frontend Handoff

## 목적

- 이 문서는 프론트가 AI 챗봇 플로우를 바로 구현할 수 있도록 상태 전이와 응답 렌더링 기준을 고정한 문서입니다.
- API wire format은 `snake_case`를 사용합니다.
- 프론트 내부 상태명은 camelCase를 써도 되지만, 서버와 주고받는 필드명은 문서 예시를 따릅니다.

## 확정 사항

- `pre`는 2턴, `post`는 1턴
- `emotion`은 단일 선택
- `text`는 선택 입력
- `question_type`만 사용
- `meta_question_type`은 사용하지 않음
- `required`는 백엔드가 계산
- `required=true`면 선택이 필수
- `required=false`면 바로 다음 단계로 진행 가능
- `reflection_summary`는 결과 화면용 핵심 문구이며 `/api/chat`, `/api/chat/result` 응답 모두에 포함
  - `pre` turn 1: `null`
  - `pre` turn 2: non-null
  - `post` turn 1: non-null
- 결과 저장값은 `PAUSE / PROCEED / POST_RECORDED`
- 선택지 전송값은 아래 두 필드를 함께 사용
  - `selected_meta_option_index`
  - `selected_meta_option`
- canonical 값은 `selected_meta_option_index`

## 화면 흐름

### 상태 전이 표

| 단계        | mode       | 서버 호출                 | 성공 시 다음 단계 | 비고                                                |
| ----------- | ---------- | ------------------------- | ----------------- | --------------------------------------------------- |
| 세션 생성   | `pre/post` | `POST /api/chat/sessions` | turn 1 입력 화면  | 세션 ID 확보                                        |
| turn 1 요청 | `pre/post` | `POST /api/chat`          | AI turn 1 표시    | `text` 없이도 가능                                  |
| turn 2 요청 | `pre`만    | `POST /api/chat`          | AI turn 2 표시    | `previous_distortion_type`는 프론트가 계산하지 않음 |
| 결과 저장   | `pre/post` | `POST /api/chat/result`   | 결과 화면         | `pre`는 선택값 포함 가능                            |
| 결과 화면   | `pre/post` | 없음                      | 종료/후속 액션    | CTA는 `user_decision` 기반                          |

### 예외 흐름

| 상황                          | 처리                                  |
| ----------------------------- | ------------------------------------- |
| turn 1 API 실패               | 에러 토스트 + 재시도 버튼             |
| turn 2 API 실패               | 기존 turn 1 화면 유지 + 재시도 버튼   |
| result 저장 실패              | 결과 화면 진입 차단, 저장 재시도 노출 |
| `required=true`인데 선택 없음 | CTA 비활성화                          |

## 응답 렌더링 기준

| 필드            | 값          | 프론트 동작                                |
| --------------- | ----------- | ------------------------------------------ |
| `required`      | `false`     | 자유 입력 또는 다음 CTA 허용               |
| `required`      | `true`      | `meta_question`, `meta_options` 2개 렌더링 |
| `meta_question` | `null`      | 메타 질문 영역 숨김                        |
| `meta_options`  | `null`      | 선택 버튼 영역 숨김                        |
| `meta_options`  | 길이 2 배열 | 버튼 2개 렌더링                            |

## API 예시

### `POST /api/chat` 요청 예시: `pre` turn 1

```json
{
  "session_id": 101,
  "mode": "pre",
  "ticker": "삼성전자",
  "emotion": "불안해요",
  "text": "계속 떨어져서 너무 불안해요.",
  "turn_number": 1,
  "conversation_history": []
}
```

### `POST /api/chat` 요청 예시: `pre` turn 2

```json
{
  "session_id": 101,
  "mode": "pre",
  "ticker": "삼성전자",
  "emotion": "불안해요",
  "text": "사실 그냥 불안해서요. 딱히 새로운 이유는 없어요.",
  "turn_number": 2,
  "conversation_history": [
    {
      "role": "assistant",
      "content": "계속 떨어지는 흐름 때문에 많이 불안하셨겠어요. 지금 가장 두려운 장면은 무엇인가요?"
    },
    {
      "role": "user",
      "content": "사실 그냥 불안해서요. 딱히 새로운 이유는 없어요."
    }
  ]
}
```

> `previous_distortion_type`는 프론트가 계산하거나 전송하지 않습니다. 백엔드가 세션에서 자동으로 주입합니다.

### `POST /api/chat` 응답 예시: `pre` turn 2

```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 더 큰 하락을 먼저 떠올리고 있어요",
  "empathy": "더 떨어질까 봐 무서운 마음이 크게 올라오셨겠어요.",
  "question": "지금 판단에 더 크게 작용하는 쪽은 무엇에 가까운가요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 삼성전자에 대한 생각은 현재의 불안에서 나온 쪽에 더 가깝나요, 아니면 스스로 정리한 기준에서 나온 쪽에 더 가깝나요?",
  "meta_options": [
    "불안이 커져서 더 나빠질 것 같다는 생각이 앞서요",
    "내 기준과 이유를 떠올리며 보고 있어요"
  ],
  "reflection_summary": "하락 자체보다 더 큰 손실이 올 것 같다는 상상이 판단을 먼저 끌고 가는 모습이 보였어요. 매수 근거가 바뀐 건지, 숫자를 보는 불안이 커진 건지 한 번 더 나눠볼 필요가 있어요.",
  "required": true
}
```

### `POST /api/chat/result` 요청 예시

```json
{
  "session_id": 101,
  "mode": "pre",
  "selected_meta_option_index": 0,
  "selected_meta_option": "불안이 커져서 더 나빠질 것 같다는 생각이 앞서요",
  "user_decision": "PAUSE"
}
```

### 결과 저장 응답 예시

```json
{
  "session_id": 101,
  "reflection_summary": "불안이 현재 판단에 크게 개입하고 있음을 스스로 확인했습니다.",
  "user_decision": "PAUSE",
  "saved": true
}
```

## 렌더링 규칙

- `distortion_tag`: 결과 화면 및 turn 요약에 표시
- `empathy`: 말풍선 본문 첫 문장으로 표시
- `question`: 같은 AI 말풍선 안에 공감문 다음 문장으로 표시
- `meta_question`: `required=true`일 때만 별도 강조 영역으로 표시
- `meta_options[0]`, `meta_options[1]`: 버튼 2개로 표시
- `reflection_summary`: 결과 화면 핵심 문구
- `user_decision`: 결과 화면 CTA 상태 및 저장값

## 협의 필요

- 에러를 전체 모달로 보여줄지, 인라인 토스트로 보여줄지
- 모델/프롬프트 버전을 프론트 디버그 패널에 노출할지

## 구현 체크리스트

- [ ] 감정 선택을 단일 선택으로 유지
- [ ] `text` 없이 turn 1 호출 가능하게 처리
- [ ] `pre` turn 2에서 `required=true`일 때 버튼 2개를 렌더링
- [ ] `selected_meta_option_index`, `selected_meta_option` 둘 다 result 저장 요청에 포함
- [ ] `post`는 turn 1 응답 후 바로 결과 저장 단계로 이동
- [ ] 결과 화면을 `distortion_tag`, `reflection_summary`, `user_decision` 기준으로 연결
- [ ] API snake_case 필드명을 프론트 매퍼에서 일관되게 처리
