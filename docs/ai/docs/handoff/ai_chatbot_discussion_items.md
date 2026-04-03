# AI Chatbot Discussion Items

## 목적

- 이 문서는 AI 챗봇 기준 중 팀과 같이 확인해야 하는 항목만 정리합니다.

## 전제

- 아래 항목 외 AI 계약 핵심은 이미 확정됐습니다.
- 확정 기준은 `docs/handoff/AI_Chatbot_result_summary.md`를 따릅니다.

## 같이 확인할 항목

### 1. API 응답에 디버그 필드를 노출할지

- 대상:
  - `prompt_version`
  - `model_name`
- 현재 상태:
  - 현재 문서 기준(handoff)은 기본적으로 미노출입니다.
  - 내부 로그 저장은 전제로 잡혀 있습니다.
- 확인이 필요한 이유:
  - 프론트 디버그 패널이나 운영 확인 용도로 외부 응답에도 넣을지 팀 판단이 필요합니다.

### 2. LLM raw output을 별도로 저장할지

- 대상:
  - raw LLM JSON 원문
- 현재 상태:
  - AI 계약상 필수는 아닙니다.
  - 현재 문서 기준(handoff)에서는 협의 필요로 남겨뒀습니다.
- 확인이 필요한 이유:
  - 디버깅/재현성에는 도움이 되지만, 저장 범위는 팀 판단이 필요합니다.

### 3. `previous_distortion_type` 연결 방식 정렬

- 기준:
  - `pre` turn 2에서는 `previous_distortion_type`가 필요합니다.
  - handoff 문서는 백엔드가 세션 기준으로 자동 주입하는 기준으로 정리돼 있습니다.
- 현재 상태:
  - AI 파트 로컬 검증에서는 `previous_distortion_type`를 요청 입력으로 받을 수 있는 구조도 함께 확인했습니다.
- 정리:
  - 이 항목은 AI 계약 자체를 다시 정하는 문제가 아니라, 현재 구현이 handoff 기준과 같은 방식으로 정렬되는지 확인이 필요한 항목입니다.

### 4. 결과 저장 enum과 `/api/chat/result` 구현 정렬

- 기준:
  - PRD 기준 결과 저장 enum은 `PAUSE / PROCEED / POST_RECORDED`입니다.
  - AI 테스트 및 현재 문서도 이 기준으로 정리했습니다.
- 현재 상태:
  - 현재 문서는 `PAUSE / PROCEED / POST_RECORDED`, `/api/chat/result` 기준으로 작성돼 있습니다.
  - 현재 `github기준` 코드의 `UserDecision` enum은 아직 `WATCH / PROCEED / STOP`입니다.

- 정리:
  - 이 항목은 새로 결정할 사항이 아니라, 이미 정해진 PRD 기준에 현재 코드가 맞춰져야 하는 정렬 항목입니다.

## 이미 정리된 항목

- `reflection_summary`는 `/api/chat`, `/api/chat/result` 응답 모두에 포함
- `pre`는 2턴, `post`는 1턴
- `question_type`만 사용
- `meta_question_type`은 사용하지 않음
- `emotion`은 단일 문자열
- `required`는 백엔드 계산

## 상세항목 참고

- backend.md
- frontend.md
- db.md
- sync_guide.md
