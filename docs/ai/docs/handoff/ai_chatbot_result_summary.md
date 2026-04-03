# AI Chatbot Share Ready

## 목적

- 이 문서는 팀에 바로 공유하는 AI 챗봇 확정 기준 요약본입니다.

---

## 현재 기준선

- 프롬프트 기준선: `prompts/system/system_v1.8.txt`
- 메인 모델: `gpt-5.4`
- temperature: `0.6`
- API wire format: `snake_case`

---

## 확정된 AI 계약

- `pre`는 2턴, `post`는 1턴
- `emotion`은 단일 문자열
- `text`는 optional
- `question_type`만 사용
- `meta_question_type`은 사용하지 않음
- `required`는 백엔드가 계산
  - `exploratory -> false`
  - `meta_cognition -> true`
- `pre` turn 2에서만 `previous_distortion_type`가 필요
- 결과 저장 enum은 `PAUSE / PROCEED / POST_RECORDED`

---

## `reflection_summary` 계약

- `reflection_summary`는 결과 화면 핵심 문구입니다.
- `/api/chat` 응답과 `/api/chat/result` 응답 모두에 포함합니다.
- 생성 규칙:
  - `pre` turn 1: `null`
  - `pre` turn 2: non-null
  - `post` turn 1: non-null
- 톤 규칙:
  - 2문장
  - 관찰형
  - 직접 투자 조언 없음

---

## 빠른 참조

### `POST /api/chat` 응답 예시: `pre` turn 1

```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 더 큰 하락을 먼저 떠올리고 있어요",
  "empathy": "계속 떨어지는 흐름 때문에 많이 불안하셨겠어요.",
  "question": "지금 가장 두려운 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

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

### `POST /api/chat` 응답 예시: `post` turn 1

```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "💭 감정이 판단을 끌고 갔어요",
  "empathy": "아까 참지 못하고 사버린 일이 지금 더 후회되셨겠어요.",
  "question": "그 순간 에코프로를 사게 만든 가장 강한 생각은 무엇이었나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 순간의 압박감이나 감정이 판단을 앞서간 모습이 보였어요. 어떤 생각이 그 행동을 밀어붙였는지 돌아보면 다음 판단에서 참고할 단서가 될 것으로 보여요.",
  "required": false
}
```

---

## 테스트 상태

### 1. Direct Expect 테스트 (`v1.8`)

- 결과 경로:
  - `test_results/llm_direct/test_results_llm_direct.md`
- 실행 범위: baseline / edge / guardrail / persona
- 확인된 내용:
  - `pre` turn 1: `reflection_summary = null`
  - `pre` turn 2: `reflection_summary` non-null
  - `post` turn 1: `reflection_summary` non-null
  - guardrail 케이스 통과
  - `v1.8` 프롬프트 기준 direct 경로는 계약대로 동작

### 2. Backend `/api/chat` 통합 테스트

- 결과 경로:
  - `test_results/backend_integration/test_results_llm_backend.md`
- 실행 범위: baseline / edge / guardrail / persona
- 확인된 내용:
  - backend `/api/chat` 경로에서도 `v1.8` 계약 재현
  - `baseline/pre_turn2`, `baseline/post_turn1` 통과
  - `persona/pre_turn2_fomo`, `persona/pre_turn2_panic` 통과
  - `persona/post_turn1_averaging` 통과
  - `pre` turn 1 및 guardrail 케이스에서 `reflection_summary = null` 유지

### 검증 범위 정리

- ✅ 직접 검증 완료: direct LLM 경로, backend `/api/chat` 경로
- 🔸 계약상 포함이나 자동 검증 미완료:
  - `/api/chat/result`
  - 결과 저장 enum 실제 코드 정렬

---

## 비용 참고

- 비용 리포트:
  - `test_results/cost_report.md`
- 기준: `system_v1.8` / `gpt-5.4` / `temperature 0.6` / Standard pricing
- 핵심 수치:
  - `pre` 세션 예상 비용: `$0.01755` (약 24원)
  - `post` 세션 예상 비용: `$0.00912` (약 13원)
  - 평균 세션 비용: `$0.01334` (약 18원)
- 주의: 운영 실제 비용은 캐싱, 응답 길이, 세션 비율에 따라 달라질 수 있습니다.

---

## 최종 판단

- `system_v1.8 + gpt-5.4` 기준으로 direct 테스트와 backend `/api/chat` 통합 테스트를 통과했습니다.
- 현재 공유 가능한 수준의 AI 계약 기준선으로 볼 수 있습니다.
- 다만 `/api/chat/result`, `UserDecision` enum, `previous_distortion_type` 연결 방식은
  현재 코드와 문서가 아직 완전히 같은 상태는 아니므로 별도 정렬이 필요합니다.

---

## 참고 상세 문서

- `docs/handoff/backend.md`
- `docs/handoff/frontend.md`
- `docs/handoff/db.md`
