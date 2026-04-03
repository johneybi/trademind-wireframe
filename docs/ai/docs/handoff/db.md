# DB Handoff

## 목적
- 이 문서는 AI 챗봇 저장 구조를 구현 가능한 수준으로 고정한 DB 명세입니다.
- 기본안은 `Option B (chat_turn_analysis 분리)`입니다.

## 확정 사항
- `pre`는 2턴, `post`는 1턴
- `emotion`은 단일 문자열
- `text`는 nullable
- `distortion_type`은 1개만 저장
- `question_type`만 저장
- `meta_question_type`은 저장하지 않음
- `required`는 백엔드 계산값 저장
- `previous_distortion_type`은 `pre` turn 2에서만 사용
- `reflection_summary`는 마지막 AI 응답에서 생성된 값을 저장
  - `pre` turn 1: `null`
  - `pre` turn 2: non-null
  - `post` turn 1: non-null
- 운영 추적용 `prompt_version`, `model_name`, `temperature` 저장
- 결과 enum은 `PAUSE / PROCEED / POST_RECORDED`
- 저장 방식은 `Option B`를 기준으로 구현

## Enum 값

### `distortion_type`
- `catastrophizing`
- `all_or_nothing`
- `emotional_reasoning`
- `confirmation_bias`
- `fomo_herd`
- `illusion_of_control`
- `anchoring_bias`
- `sunk_cost`

### `question_type`
- `exploratory`
- `meta_cognition`

### `user_decision`
- `PAUSE`
- `PROCEED`
- `POST_RECORDED`

## 최종 스키마

### 1. `chat_session`
| column | type | nullable | 설명 | 저장 시점 |
|---|---|---|---|---|
| `id` | `BIGINT` | `N` | 세션 PK | 세션 생성 |
| `member_id` | `BIGINT` | `Y` | 로그인 사용자 FK | 세션 생성 |
| `stock_id` | `BIGINT` | `Y` | 종목 FK | 세션 생성 |
| `custom_stock_name` | `VARCHAR(255)` | `Y` | 직접 입력 종목명 | 세션 생성 |
| `session_mode` | `ENUM('PRE','POST')` | `N` | 상담 모드 | 세션 생성 |
| `status` | `VARCHAR(32)` | `N` | 세션 상태 | 세션 생성/종료 |
| `prompt_version` | `VARCHAR(32)` | `N` | 예: `v1.8` | 세션 생성 |
| `model_name` | `VARCHAR(64)` | `N` | 예: `gpt-5.4` | 세션 생성 |
| `temperature` | `DECIMAL(3,2)` | `N` | 예: `0.60` | 세션 생성 |
| `created_at` | `DATETIME(6)` | `N` | 생성 시각 | 세션 생성 |
| `completed_at` | `DATETIME(6)` | `Y` | 종료 시각 | 세션 종료 |

### 2. `chat_message`
| column | type | nullable | 설명 | 저장 시점 |
|---|---|---|---|---|
| `id` | `BIGINT` | `N` | 메시지 PK | 메시지 저장 |
| `session_id` | `BIGINT` | `N` | 세션 FK | 메시지 저장 |
| `sender_type` | `ENUM('AI','USER')` | `N` | 발화 주체 | 메시지 저장 |
| `content` | `TEXT` | `Y` | 원문 메시지 | 메시지 저장 |
| `emotion` | `VARCHAR(32)` | `Y` | 사용자 감정 | USER 저장 시 |
| `is_skipped` | `BIT(1)` | `N` | 입력 skip 여부 | USER 저장 시 |
| `created_at` | `DATETIME(6)` | `N` | 생성 시각 | 메시지 저장 |

### 3. `chat_turn_analysis`
| column | type | nullable | 설명 | 저장 시점 |
|---|---|---|---|---|
| `id` | `BIGINT` | `N` | 턴 분석 PK | AI 응답 저장 |
| `session_id` | `BIGINT` | `N` | 세션 FK | AI 응답 저장 |
| `ai_message_id` | `BIGINT` | `N` | AI 메시지 FK | AI 응답 저장 |
| `turn_number` | `TINYINT` | `N` | `1` 또는 `2` | AI 응답 저장 |
| `distortion_id` | `BIGINT` | `N` | 왜곡 FK | AI 응답 저장 |
| `previous_distortion_id` | `BIGINT` | `Y` | 이전 왜곡 FK | `pre` turn 2 저장 |
| `distortion_tag` | `VARCHAR(100)` | `N` | 이모지 포함 태그 | AI 응답 저장 |
| `empathy` | `TEXT` | `N` | 공감 문장 | AI 응답 저장 |
| `question` | `TEXT` | `N` | 질문 문장 | AI 응답 저장 |
| `question_type` | `ENUM('exploratory','meta_cognition')` | `N` | 질문 상태 | AI 응답 저장 |
| `meta_question` | `TEXT` | `Y` | 메타 질문 | `meta_cognition` 시 |
| `meta_option_1` | `VARCHAR(255)` | `Y` | 첫 선택지 | `meta_cognition` 시 |
| `meta_option_2` | `VARCHAR(255)` | `Y` | 둘째 선택지 | `meta_cognition` 시 |
| `reflection_summary` | `TEXT` | `Y` | 결과 화면용 요약 문구 | AI 응답 저장 |
| `required` | `BIT(1)` | `N` | 백엔드 계산값 | AI 응답 저장 |
| `prompt_version` | `VARCHAR(32)` | `N` | 예: `v1.8` | AI 응답 저장 |
| `model_name` | `VARCHAR(64)` | `N` | 예: `gpt-5.4` | AI 응답 저장 |
| `temperature` | `DECIMAL(3,2)` | `N` | 예: `0.60` | AI 응답 저장 |
| `created_at` | `DATETIME(6)` | `N` | 생성 시각 | AI 응답 저장 |

### 4. `user_turn_selection`
| column | type | nullable | 설명 | 저장 시점 |
|---|---|---|---|---|
| `id` | `BIGINT` | `N` | 선택 PK | 결과 저장 |
| `session_id` | `BIGINT` | `N` | 세션 FK | 결과 저장 |
| `turn_number` | `TINYINT` | `N` | 현재는 `2` 고정 | 결과 저장 |
| `selected_meta_option_index` | `TINYINT` | `N` | canonical 값 (`0` 또는 `1`) | 결과 저장 |
| `selected_meta_option` | `VARCHAR(255)` | `N` | 선택된 텍스트 | 결과 저장 |
| `submitted_at` | `DATETIME(6)` | `N` | 저장 시각 | 결과 저장 |

### 5. `analysis_result`
| column | type | nullable | 설명 | 저장 시점 |
|---|---|---|---|---|
| `id` | `BIGINT` | `N` | 결과 PK | 결과 저장 |
| `session_id` | `BIGINT` | `N` | 세션 FK | 결과 저장 |
| `distortion_id` | `BIGINT` | `Y` | 최종 왜곡 FK | 결과 저장 |
| `reflection_summary` | `TEXT` | `N` | 마지막 AI 응답에서 생성된 결과 화면 요약 문구 | 결과 저장 |
| `user_decision` | `ENUM('PAUSE','PROCEED','POST_RECORDED')` | `N` | 최종 선택 | 결과 저장 |
| `created_at` | `DATETIME(6)` | `N` | 저장 시각 | 결과 저장 |

## 인덱스 권장
- `chat_message(session_id, created_at)`
- `chat_turn_analysis(session_id, turn_number)`
- `chat_turn_analysis(distortion_id)`
- `user_turn_selection(session_id, turn_number)`
- `analysis_result(session_id)`

## 바로 반영할 것
- `chat_session`에 `prompt_version`, `model_name`, `temperature`, `completed_at` 추가
- `chat_turn_analysis` 신규 생성
- `user_turn_selection` 신규 생성
- `analysis_result.user_decision`을 PRD enum으로 정렬
- `text`는 nullable 유지

## 협의 필요
- LLM raw output을 별도 저장할지
- `analysis_result.final_advice`를 유지/변경/미사용 처리할지
- 해커톤 속도 이슈로 `Option A (chat_message 확장)`로 타협할지

## Option A 메모
- 속도 최우선이면 `chat_message`에 턴 메타를 붙이는 방식도 가능
- 다만 기본 구현 기준은 `Option B`이며, 현재 문서의 최종 스키마도 `Option B`를 전제로 합니다
