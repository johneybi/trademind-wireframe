# Source Of Truth

## 목적

`물타기`의 AI 관련 작업에서 어떤 문서를 기준으로 판단할지 고정한다.

## 우선순위

1. 사용자 명시 결정
2. 기획안
3. `ai_prompt_design_v0.2.md`
4. 테스트 결과 문서

## 현재 잠금된 결정

- `required`는 LLM이 직접 반환하지 않는다.
- LLM은 `question_type`만 반환한다.
- 백엔드는 `question_type`을 받아 `required`를 매핑한다.
- `pre`는 AI 응답 기준 2턴, `post`는 AI 응답 기준 1턴 구조를 사용한다.
- `text`는 선택 입력이다.
- 왜곡 처리 MVP 범위는 `primary` 1개만 사용한다.
- `emotion`은 단일 문자열을 사용한다.
- 현재 채택 프롬프트 베이스라인은 `prompts/system/system_v1.8.txt`이다.
- `prompts/system/system_v1.4.txt`는 퇴보한 실험 버전으로 남기되, 채택 버전으로 사용하지 않는다.
- `prompts/system/system_v1.5.txt`는 후보 버전이었지만 `system_v1.6.txt`로 대체되었다.
- `prompts/system/system_v1.6.txt`는 안정화 기준선이었지만 `system_v1.7.txt`로 대체되었다.
- `prompts/system/system_v1.7.txt`는 `reflection_summary` 계약 전 기준선이었지만 `system_v1.8.txt`로 대체되었다.

## 프롬프트 베이스라인 운영 규칙

- 새 프롬프트 버전을 만들 때마다 `prompts/changelog.md`에 평가를 기록한다.
- 실험 버전이 이전 채택 버전보다 나쁘면, 이전 채택 버전을 유지하고 다음 버전은 그 버전에서 분기한다.
- 채택 여부가 확정되지 않은 실험 버전은 구현 기준으로 사용하지 않는다.

## 문서 충돌 처리 규칙

- 상위 우선순위 문서와 하위 문서가 충돌하면 하위 문서를 수정한다.
- 같은 문서 안에서 예시와 규칙이 충돌하면 규칙을 기준으로 수정한다.
- 프롬프트, 스키마, 테스트는 항상 함께 움직여야 한다.
