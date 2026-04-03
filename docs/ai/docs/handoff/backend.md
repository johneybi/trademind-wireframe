# Backend Handoff

## 목적

- 이 문서는 백엔드가 AI 챗봇 API를 구현할 때 바로 착수할 수 있도록 계약을 고정한 문서입니다.
- wire format은 외부 API 기준 `snake_case`를 사용합니다.

## 확정 사항

- 프롬프트 기준선: `system_v1.8.txt`
- 메인 모델: `gpt-5.4`
- `emotion`은 단일 문자열
- `text`는 optional
- `question_type`만 사용
- `meta_question_type`은 사용하지 않음
- `required`는 백엔드가 계산
  - `exploratory -> false`
  - `meta_cognition -> true`
- `reflection_summary`는 `/api/chat`와 `/api/chat/result` 응답 모두에 포함
  - `pre` turn 1: `null`
  - `pre` turn 2: non-null
  - `post` turn 1: non-null
- `pre`는 2턴, `post`는 1턴
- `pre` turn 2에서만 `previous_distortion_type`를 runtime context에 주입
- 결과 저장 enum은 `PAUSE / PROCEED / POST_RECORDED`
- 프롬프트 경로, 모델, temperature는 코드 하드코딩이 아니라 설정으로 주입

## 바로 반영할 계약

### 1. `POST /api/chat`

#### Request: `pre` turn 1

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

#### Request: `pre` turn 2

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

> `previous_distortion_type`는 프론트가 전송하지 않습니다. 백엔드가 `session_id`로 turn 1 결과를 DB에서 조회해 런타임 컨텍스트에 자동 주입합니다.

#### Request: `post` turn 1

```json
{
  "session_id": 202,
  "mode": "post",
  "ticker": "테슬라",
  "emotion": "후회돼요",
  "text": "왜 그때 물을 탔는지 모르겠어요.",
  "turn_number": 1,
  "conversation_history": []
}
```

#### Response: exploratory

```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "💭 감정이 판단을 이끌고 있어요",
  "empathy": "지금 후회와 불안이 크게 올라오셨겠어요.",
  "question": "지금 가장 크게 남아 있는 감정은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

#### Response: meta cognition

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

### 2. `POST /api/chat/result`

#### Request

```json
{
  "session_id": 101,
  "mode": "pre",
  "selected_meta_option_index": 0,
  "selected_meta_option": "감정의 압박이 더 크게 작용해요",
  "user_decision": "PAUSE"
}
```

> canonical 값은 `selected_meta_option_index` (0 또는 1)입니다. `selected_meta_option`은 로그/추적용으로 함께 전송합니다.

#### Response

```json
{
  "session_id": 101,
  "reflection_summary": "불안이 현재 판단에 크게 개입하고 있음을 스스로 확인했습니다.",
  "user_decision": "PAUSE",
  "saved": true
}
```

### 3. SSE 포맷

#### 성공 이벤트

```text
event: chat_response
data: {"distortion_type":"catastrophizing","distortion_tag":"...","empathy":"...","question":"...","question_type":"meta_cognition","meta_question":"...","meta_options":["...","..."],"reflection_summary":"...","required":true}
```

#### 에러 이벤트

```text
event: error
data: {"code":"AI_RESPONSE_VALIDATION_FAILED","message":"LLM response did not match schema","retryable":true}
```

#### SSE 구현 기준

- PRD 기준 transport는 `SSE`
- MVP 기준 payload는 최종 JSON 1건
- 토큰 단위 스트리밍은 현재 기본 요구사항이 아님

### 4. 에러 응답 포맷

#### 공통 형식

```json
{
  "code": "AI_RESPONSE_VALIDATION_FAILED",
  "message": "LLM response did not match schema",
  "retryable": true
}
```

#### 권장 HTTP status

| status | code                            | 의미                     |
| ------ | ------------------------------- | ------------------------ |
| `400`  | `INVALID_REQUEST`               | 요청 필드 누락/형식 오류 |
| `422`  | `AI_RESPONSE_VALIDATION_FAILED` | LLM 응답이 스키마 불일치 |
| `502`  | `AI_PROVIDER_ERROR`             | OpenAI 호출 실패         |
| `500`  | `INTERNAL_SERVER_ERROR`         | 예상치 못한 서버 오류    |

## 구현 포인트

- `previous_distortion_type`는 `pre` turn 1 결과를 사용
- `pre` turn 2에서는 기본적으로 이전 왜곡을 유지하고, 새 입력이 1턴 해석을 명확히 뒤집을 때만 변경 허용
- LLM raw output 검증과 최종 API 응답 매핑을 분리
- `reflection_summary`는 마지막 AI 응답에서 생성된 값을 `/api/chat`에 그대로 포함하고, 결과 저장/조회에서도 같은 값을 재사용
- 실서비스 로그에 `prompt_version`, `model_name`, `temperature`를 남김
- API 응답은 현재 계약 기준으로만 반환하고, 디버그 필드는 기본적으로 숨김

## 협의 필요

- `prompt_version`, `model_name`을 API 응답에도 포함할지
- LLM raw output을 별도 테이블/스토리지에 저장할지
- SSE를 최종 JSON 1건으로만 보낼지, 토큰 스트리밍을 열지
- `POST /api/chat/result` 경로를 그대로 확정할지, 세션 nested path로 바꿀지

## 구현 체크리스트

- [ ] `/api/chat` 요청/응답을 위 JSON 예시 기준으로 정렬
- [ ] `previous_distortion_type`를 `pre` turn 2에서만 주입
- [ ] `required` 계산을 `question_type` 단일 기준으로 유지
- [ ] 설정 기반 `prompt_file`, `model`, `temperature` 사용
- [ ] SSE 성공/에러 이벤트 형식 구현
- [ ] `POST /api/chat/result` 또는 동등 경로 구현
- [ ] 결과 저장 enum을 `PAUSE / PROCEED / POST_RECORDED`로 정렬
