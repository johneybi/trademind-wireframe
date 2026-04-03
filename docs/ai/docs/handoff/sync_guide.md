# 해커톤 싱크 가이드

> AI 파트 담당자가 백엔드/프론트엔드에 전달할 내용 + 예상 질문 답변 모음

---

## 공통 전달

- AI는 백엔드가 직접 OpenAI를 호출하는 구조입니다. 중간에서 별도로 전달하는 방식이 아닙니다.
- 프롬프트 파일과 출력 스키마 파일이 레포에 있습니다. 경로를 공유하겠습니다.
- 응답 필드에 `reflection_summary`가 새로 추가되었습니다. 결과 화면의 핵심 문구입니다.
- 확정 기준과 테스트 결과 요약은 `AI_Chatbot_result_summary.md`, 팀과 같이 확인할 항목은 `ai_chatbot_discussion_items.md`에 있습니다.

---

## 백엔드 싱크

### 전달 내용

**1. 구조**
프론트 → /api/chat (BE) → OpenAI 호출 → LLM 응답 파싱 → DB 저장 → 프론트 응답 반환

백엔드가 OpenAI를 직접 호출합니다. 프롬프트 파일은 `prompts/system/system_v1.8.txt`입니다.

**2. 출력 스키마**
LLM 응답 검증에 사용할 JSON 스키마: `schemas/llm_output/cbt_response_v1.0.json`
OpenAI `response_format`에 이 스키마를 그대로 적용하면 됩니다.

**3. 구현 순서 (우선순위 순)**
POST /api/chat — 요청 받아서 OpenAI 호출, 응답 반환

required 계산 — question_type: exploratory → false, meta_cognition → true

previous_distortion_type 자동 주입 — pre turn2에서만, 세션에서 turn1 결과 DB 조회

chat_turn_analysis 저장

POST /api/chat/result 구현

**4. 요청/응답 계약**
`backend.md`를 참고합니다. 요청/응답 JSON 예시가 포함되어 있습니다.

**5. UserDecision enum 확인**
현재 코드에 WATCH/STOP이 있는 경우 **PAUSE/PROCEED/POST_RECORDED**로 변경해야 합니다.

---

### 백엔드 예상 질문 & 답변

**Q. OpenAI API key는 어디서 관리합니까?**
A. 환경변수로 주입합니다. `.env` 또는 설정 파일을 사용합니다. 레포에 커밋해서는 안 됩니다.

**Q. 프롬프트 파일을 코드에 하드코딩해야 합니까, 아니면 설정으로 읽어야 합니까?**
A. 설정값으로 읽는 것이 맞습니다. `prompt_file`, `model`, `temperature` 모두 설정으로 주입해야 합니다. AI 파트 로컬 검증에 사용한 작업본도 이 기준으로 맞춰 테스트했습니다.

**Q. reflection_summary는 백엔드가 생성해야 합니까?**
A. 아닙니다. LLM이 직접 생성합니다. 백엔드는 LLM 응답에서 받아서 그대로 응답에 포함하면 됩니다 (pass-through).

**Q. previous_distortion_type을 프론트에서 받아서 사용하면 안 됩니까?**
A. 안 됩니다. 프론트는 이 값을 계산하거나 전송하지 않습니다. 백엔드가 session_id로 turn1 결과를 DB에서 조회하여 LLM 프롬프트에 자동으로 주입해야 합니다.

**Q. SSE를 반드시 사용해야 합니까?**
A. PRD 기준은 SSE입니다. MVP에서는 중간 토큰 스트리밍 없이 최종 JSON 1건을 `chat_response` 이벤트로 전송하면 됩니다.

**Q. /api/chat/result에서 reflection_summary를 다시 내려줘야 하는데 어디서 가져옵니까?**
A. `/api/chat` 호출 시 LLM 응답을 `chat_turn_analysis`에 저장해 둡니다. result 저장 시 해당 데이터를 조회하여 응답에 포함하면 됩니다.

**Q. required 필드는 LLM이 제공합니까?**
A. 아닙니다. LLM은 `required`를 출력하지 않습니다. 백엔드가 `question_type`을 기준으로 계산합니다: exploratory → false, meta_cognition → true.

**Q. turn_number는 프론트가 전송합니까, 백엔드가 관리해야 합니까?**
A. 프론트가 요청 바디에 `turn_number`를 포함하여 전송합니다. 백엔드는 해당 값을 그대로 사용합니다.

**Q. pre turn2인데 previous_distortion_type이 DB에 없으면 어떻게 처리합니까?**
A. turn1이 완료되지 않은 상태에서 turn2를 요청한 비정상 케이스입니다. 400 에러를 반환하면 됩니다.

**Q. distortion_type이 8개인데 모두 테스트되었습니까?**
A. 8개 enum 전체 프롬프트 테스트가 완료되었습니다. LLM이 스키마 범위 밖의 값을 반환하는 경우 스키마 검증에서 차단됩니다.

---

## 프론트엔드 싱크

### 전달 내용

**1. 새로 추가된 응답 필드**
reflection_summary: string | null

- pre turn1: null (렌더링하지 않음)
- pre turn2, post turn1: 결과 화면 카드 본문에 표시

**2. 흐름 요약**
pre 모드: 세션 생성 → turn1 → turn2 (버튼 선택) → 결과 저장 → 결과 화면
post 모드: 세션 생성 → turn1 → 결과 저장 → 결과 화면

**3. turn2 버튼 선택 후 전송 필드**

```json
{
  "session_id": 101,
  "mode": "pre",
  "selected_meta_option_index": 0,
  "selected_meta_option": "선택된 텍스트",
  "user_decision": "PAUSE"
}
```

canonical 값은 `selected_meta_option_index` (0 또는 1)입니다.

**4. 상세 명세**
`frontend.md`를 참고합니다. 상태 전이 표, 렌더링 조건, 요청/응답 예시가 모두 포함되어 있습니다.

---

### 프론트엔드 예상 질문 & 답변

**Q. reflection_summary를 채팅 말풍선에도 표시해야 합니까?**
A. 아닙니다. 결과 화면 전용입니다. 채팅 화면에는 표시하지 않습니다. AI 마지막 메시지는 "결과 화면에서 정리해볼게요" 같은 전환 문구이며, reflection_summary는 결과 화면 카드 본문에만 표시합니다.

**Q. previous_distortion_type을 프론트에서 계산하여 전송해야 합니까?**
A. 아닙니다. 프론트는 이 값을 전송하지 않습니다. 백엔드가 세션에서 자동으로 처리합니다.

**Q. post 모드는 turn1 하나만 있습니까?**
A. 맞습니다. post는 turn1 응답을 받으면 바로 결과 저장 단계로 넘어갑니다. turn2는 없습니다.

**Q. meta_options가 null이면 어떻게 처리합니까?**
A. 버튼 영역을 렌더링하지 않으면 됩니다. turn1 응답은 항상 null입니다.

**Q. required=false이면 버튼 없이 바로 넘어갈 수 있습니까?**
A. 맞습니다. required=false이면 CTA를 즉시 활성화합니다. required=true이면 meta_options 중 하나를 선택하기 전까지 CTA를 비활성화합니다.

**Q. SSE는 어떻게 연결합니까?**
A. EventSource 또는 fetch + ReadableStream으로 연결합니다. 이벤트 이름은 `chat_response`, 에러는 `error`입니다. MVP는 최종 JSON 1건만 전달되므로 구현이 단순합니다.

**Q. 에러 이벤트가 오면 어떻게 처리합니까?**
A. `retryable: true`이면 재시도 버튼을 표시하고, `retryable: false`이면 에러 화면으로 이동합니다.

**Q. user_decision은 어떤 값을 전송해야 합니까?**
A. `PAUSE`, `PROCEED`, `POST_RECORDED` 세 가지입니다. 결과 화면 CTA 버튼에 다음과 같이 매핑됩니다:

- "잠시 관망하겠습니다" → PAUSE
- "그래도 진행하겠습니다" → PROCEED
- post 모드 저장 완료 → POST_RECORDED

**Q. distortion_tag는 어디에 표시합니까?**
A. 채팅 화면 상단 고정 레이블과 결과 화면 카드 뱃지, 두 곳에 표시합니다. turn2 기준(마지막 턴)이 최종값입니다.

**Q. conversation_history는 프론트가 관리해야 합니까?**
A. 맞습니다. 프론트가 이전 AI 응답과 사용자 입력을 누적하여 turn2 요청 시 함께 전송해야 합니다. `backend.md` 요청 예시에 형식이 명시되어 있습니다.

**Q. turn2에서 자유 텍스트를 건너뛰면 conversation_history는 어떻게 전송합니까?**
A. 현재 턴의 skip 입력으로 인해 프론트가 임의의 빈 문자열이나 플레이스홀더를 `conversation_history`에 포함해서는 안 됩니다. 요청 바디에는 `text: null`만 전송하고, `conversation_history`는 직전까지 실제로 오간 메시지만 유지하면 됩니다. 현재 턴의 user content 정규화는 백엔드가 처리합니다.

---

## 공유 문서 목록 (전달 순서)

| 대상       | 문서                             | 목적                                      |
| ---------- | -------------------------------- | ----------------------------------------- |
| 공통       | `AI_Chatbot_result_summary.md`   | AI 계약 기준, 테스트 결과, 비용 참고 요약 |
| 공통       | `ai_chatbot_discussion_items.md` | 팀과 같이 확인할 AI 연동 항목             |
| 백엔드     | `backend.md`                     | API 구현 명세                             |
| 백엔드     | `db.md`                          | DB 스키마 명세                            |
| 프론트엔드 | `frontend.md`                    | 상태 전이 + 렌더링 명세                   |
| 공통 참고  | `sync_guide.md`                  | 싱크 시 예상 질문과 답변 모음             |
