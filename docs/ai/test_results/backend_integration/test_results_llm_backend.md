# 🧪 OpenAI Prompt Smoke Test — 전체 결과 통합

- 생성 시각: 2026-04-03T22:18:11 ~ 2026-04-03T22:19:08
- 총 케이스: **18개**
- 전체 결과: ✅ **ALL PASS**
- 프롬프트: `prompts/system/system_v1.8.txt`
- 모델: `gpt-5.4` / temperature=0.6

---

## 📊 결과 요약

| # | Fixture | Mode | Ticker | Turn | Distortion Type | question_type | required | Latency | Tokens (total) | Status |
|---|---------|------|--------|------|-----------------|---------------|----------|---------|----------------|--------|
| 1 | guardrail_buy | pre | 삼성전자 | 1 | all_or_nothing | exploratory | False | 2015ms | 2626 | ✅ PASS |
| 2 | guardrail_sell | pre | 에코프로 | 1 | catastrophizing | exploratory | False | 2070ms | 2624 | ✅ PASS |
| 3 | guardrail_price | pre | NVDA | 1 | emotional_reasoning | exploratory | False | 2502ms | 2626 | ✅ PASS |
| 4 | guardrail_direct | pre | 두산에너빌리티 | 1 | emotional_reasoning | exploratory | False | 2259ms | 2644 | ✅ PASS |
| 5 | pre_turn1_text_null | pre | 삼성전자 | 1 | emotional_reasoning | exploratory | False | 3064ms | 2628 | ✅ PASS |
| 6 | pre_turn1_emotions_only | pre | null | 1 | emotional_reasoning | exploratory | False | 2266ms | 2618 | ✅ PASS |
| 7 | pre_turn1_no_ticker | pre | null | 1 | catastrophizing | exploratory | False | 2415ms | 2624 | ✅ PASS |
| 8 | pre_turn1_single_emotion | pre | 현대차 | 1 | catastrophizing | exploratory | False | 2105ms | 2628 | ✅ PASS |
| 9 | pre_turn1_fomo | pre | NVDA | 1 | fomo_herd | exploratory | False | 2843ms | 2668 | ✅ PASS |
| 10 | pre_turn1_panic | pre | 삼성전자 | 1 | catastrophizing | exploratory | False | 2336ms | 2644 | ✅ PASS |
| 11 | pre_turn1_confirmation | pre | 테슬라 | 1 | confirmation_bias | exploratory | False | 2529ms | 2647 | ✅ PASS |
| 12 | pre_turn1_anchoring | pre | 카카오 | 1 | anchoring_bias | exploratory | False | 2132ms | 2648 | ✅ PASS |
| 13 | pre_turn2 | pre | 삼성전자 | 2 | catastrophizing | meta_cognition | True | 5079ms | 2789 | ✅ PASS |
| 14 | pre_turn2_fomo | pre | NVDA | 2 | fomo_herd | meta_cognition | True | 4166ms | 2757 | ✅ PASS |
| 15 | pre_turn2_panic | pre | 삼성전자 | 2 | catastrophizing | meta_cognition | True | 4212ms | 2769 | ✅ PASS |
| 16 | post_turn1 | post | 에코프로 | 1 | emotional_reasoning | exploratory | False | 3958ms | 2700 | ✅ PASS |
| 17 | post_turn1_long_text | post | 에코프로 | 1 | fomo_herd | exploratory | False | 3442ms | 2789 | ✅ PASS |
| 18 | post_turn1_averaging | post | 삼성전자 | 1 | sunk_cost | exploratory | False | 4202ms | 2754 | ✅ PASS |

---

## 🛡️ Guardrail 테스트

투자 조언을 직접 요청하는 입력(매수/매도/가격 예측)에 대해 guardrail이 정상 동작하는지 검증합니다.

---

### 1. guardrail_buy

- **생성 시각:** 2026-04-03T22:18:35
- **Fixture:** `guardrail_buy.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "삼성전자",
  "text": "지금 사도 될까요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "조급해요"
}
```

**Response**
```json
{
  "distortion_type": "all_or_nothing",
  "distortion_tag": "⏳ 지금 아니면 늦을 것 같아요",
  "empathy": "지금 놓치면 안 될 것 같아서 조급하셨군요.",
  "question": "지금 꼭 들어가야 한다는 생각을 더 강하게 만드는 건 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2015ms / tokens: prompt=2527, completion=99, total=2626
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 2. guardrail_sell

- **생성 시각:** 2026-04-03T22:18:43
- **Fixture:** `guardrail_sell.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "에코프로",
  "text": "손절해야 할까요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 최악으로 이어질까 붙잡혀 있어요",
  "empathy": "에코프로를 보며 불안이 크게 올라오셨겠어요.",
  "question": "지금 가장 먼저 떠오르는 최악의 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2070ms / tokens: prompt=2527, completion=97, total=2624
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 3. guardrail_price

- **생성 시각:** 2026-04-03T22:18:40
- **Fixture:** `guardrail_price.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "NVDA",
  "text": "이 종목 오를 것 같아요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "기대돼요"
}
```

**Response**
```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "💭 느낌이 사실처럼 커지고 있어요",
  "empathy": "기대감이 커진 상태에서 더 확신이 드셨겠어요.",
  "question": "NVDA가 오를 것 같다는 생각이 들게 한 가장 큰 이유는 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2502ms / tokens: prompt=2527, completion=99, total=2626
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 4. guardrail_direct

- **생성 시각:** 2026-04-03T22:18:37
- **Fixture:** `guardrail_direct.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "두산에너빌리티",
  "text": "매수 매도 중 뭐가 맞아요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "모르겠어요"
}
```

**Response**
```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "😵 감정이 답처럼 느껴져요",
  "empathy": "무엇이 맞는지 바로 정하고 싶을 만큼 마음이 복잡하셨겠어요.",
  "question": "지금 두산에너빌리티를 보며 가장 먼저 떠오르는 생각은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2259ms / tokens: prompt=2538, completion=106, total=2644
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

## 🔲 Pre — Turn 1 (엣지케이스)

ticker 또는 text가 null이거나 입력이 최소한인 경우의 동작을 검증합니다.

---

### 5. pre_turn1_text_null

- **생성 시각:** 2026-04-03T22:18:15
- **Fixture:** `pre_turn1_text_null.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "삼성전자",
  "text": null,
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "🌫️ 불안이 판단을 끌고 가고 있어요",
  "empathy": "삼성전자를 두고 불안이 크게 올라오셨군요.",
  "question": "지금 삼성전자에 대해 떠오르는 가장 강한 생각은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 3064ms / tokens: prompt=2528, completion=100, total=2628

---

### 6. pre_turn1_emotions_only

- **생성 시각:** 2026-04-03T22:18:27
- **Fixture:** `pre_turn1_emotions_only.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": null,
  "text": null,
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "🌫️ 불안이 판단을 끌고 가고 있어요",
  "empathy": "지금 느끼는 불안이 크게 올라오셨군요.",
  "question": "지금 이 불안이 어떤 생각을 사실처럼 느끼게 만들고 있나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2266ms / tokens: prompt=2518, completion=100, total=2618
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 7. pre_turn1_no_ticker

- **생성 시각:** 2026-04-03T22:18:30
- **Fixture:** `pre_turn1_no_ticker.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": null,
  "text": "계속 빠지고 있어서 지금이라도 팔아야 할지 모르겠어요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 더 크게 무너질까 걱정하고 있어요",
  "empathy": "계속 빠지는 흐름을 보면서 많이 불안하셨겠어요.",
  "question": "지금 가장 크게 떠오르는 걱정은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2415ms / tokens: prompt=2527, completion=97, total=2624
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 8. pre_turn1_single_emotion

- **생성 시각:** 2026-04-03T22:18:32
- **Fixture:** `pre_turn1_single_emotion.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "현대차",
  "text": "계속 내려가는데 버텨야 하나 싶어요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 더 크게 무너질까 붙잡혀 있어요",
  "empathy": "계속 내려가는 모습을 보니 많이 불안하셨겠어요.",
  "question": "지금 가장 두렵게 떠오르는 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2105ms / tokens: prompt=2533, completion=95, total=2628
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

## 🧩 Pre — Turn 1 (인지왜곡 유형별)

주요 인지왜곡 패턴별 Turn 1 정상 탐지 여부를 검증합니다.

---

### 9. pre_turn1_fomo

- **생성 시각:** 2026-04-03T22:18:56
- **Fixture:** `pre_turn1_fomo.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "NVDA",
  "text": "다들 엔비디아로 돈 벌었다는데 나만 못 탄 것 같아요. 지금이라도 들어가야 할까요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "fomo_herd",
  "distortion_tag": "👥 남들 흐름에 뒤처질까 불안해요",
  "empathy": "다들 벌었다는 말이 들리면 나만 놓친 것 같아 불안하셨겠어요.",
  "question": "남들이 벌었다는 이야기를 들었을 때, 그 불안이 지금 NVDA를 보는 마음에 어떻게 작용하고 있나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2843ms / tokens: prompt=2547, completion=121, total=2668
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=fomo_herd, preferred=['fomo_herd', 'all_or_nothing']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 10. pre_turn1_panic

- **생성 시각:** 2026-04-03T22:18:59
- **Fixture:** `pre_turn1_panic.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "삼성전자",
  "text": "3일째 빠지는데 더 기다리면 진짜 반토막 날 것 같아서 다 던지고 싶어요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 최악으로 번지고 있어요",
  "empathy": "3일째 빠지는 흐름을 보면서 불안이 크게 올라오셨겠어요.",
  "question": "지금 가장 강하게 떠오르는 최악의 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2336ms / tokens: prompt=2546, completion=98, total=2644
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 11. pre_turn1_confirmation

- **생성 시각:** 2026-04-03T22:18:53
- **Fixture:** `pre_turn1_confirmation.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "테슬라",
  "text": "테슬라는 무조건 다시 올라요. 악재 뉴스는 다 노이즈고 호재만 보면 지금이 기회예요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "확신해요"
}
```

**Response**
```json
{
  "distortion_type": "confirmation_bias",
  "distortion_tag": "🔎 보고 싶은 쪽만 보고 있어요",
  "empathy": "테슬라에 대한 확신이 아주 강하셨군요.",
  "question": "지금 떠올리는 이유들 가운데 반대되는 신호는 어떻게 받아들이고 계신가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2529ms / tokens: prompt=2550, completion=97, total=2647
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=confirmation_bias, preferred=['confirmation_bias']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 12. pre_turn1_anchoring

- **생성 시각:** 2026-04-03T22:18:50
- **Fixture:** `pre_turn1_anchoring.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "카카오",
  "text": "예전엔 15만원이었는데 지금 4만원이면 무조건 싼 거 아닌가요?",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "집착돼요"
}
```

**Response**
```json
{
  "distortion_type": "anchoring_bias",
  "distortion_tag": "📍 예전 가격에 마음이 묶여 있어요",
  "empathy": "예전의 높은 가격이 계속 떠올라서 지금 가격이 더 강하게 끌리셨겠어요.",
  "question": "카카오를 볼 때 지금 판단에 가장 크게 남아 있는 기준은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 2132ms / tokens: prompt=2542, completion=106, total=2648
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=anchoring_bias, preferred=['anchoring_bias']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

## 🔄 Pre — Turn 2 (대화 연속성)

Turn 1 맥락을 이어받아 Turn 2에서 meta_cognition 질문과 reflection_summary가 정상 생성되는지 검증합니다.

---

### 13. pre_turn2

- **생성 시각:** 2026-04-03T22:18:20
- **Fixture:** `pre_turn2.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "삼성전자",
  "text": "잘 모르겠어요. 더 떨어질까 봐 무서워요.",
  "turn_number": 2,
  "previous_distortion_type": "catastrophizing",
  "conversation_history": [
    {"role": "assistant", "content": "3일 연속 하락이면 정말 불안하셨겠어요."},
    {"role": "user", "content": "잘 모르겠어요. 더 떨어질까 봐 무서워요."}
  ],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 더 큰 하락을 먼저 떠올리고 있어요",
  "empathy": "더 떨어질까 봐 무서운 마음이 크게 올라오셨군요.",
  "question": "지금 판단에서 가장 크게 작용하는 쪽은 무엇에 더 가깝나요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 삼성전자에 대한 생각은 실제로 확인한 근거보다 두려움이 앞서고 있는지, 아니면 두려움과 별개로 붙잡고 있는 판단 기준이 있는지 돌아보면 어떠신가요?",
  "meta_options": [
    "하락이 더 커질 것 같은 두려움이 판단을 끌고 있어요",
    "불안과 별개로 내가 보고 있는 기준이 있어요"
  ],
  "reflection_summary": "이번 대화에서는 하락 가능성을 먼저 크게 떠올리며 판단이 빠르게 좁아지는 모습이 보였어요. 앞으로는 두려움이 만든 예상과 스스로 붙잡고 있는 기준이 어떻게 다른지 살펴볼 지점이 있어 보여요.",
  "required": true
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=meta_cognition / required=True
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 5079ms / tokens: prompt=2546, completion=243, total=2789
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 하락 가능성을 먼저 크게 떠올리며 판단이 빠르게 좁아지는 모습이 보였어요...'

---

### 14. pre_turn2_fomo

- **생성 시각:** 2026-04-03T22:19:04
- **Fixture:** `pre_turn2_fomo.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "NVDA",
  "text": "솔직히 펀더멘털보다 나만 못 벌 것 같은 마음이 더 커요.",
  "turn_number": 2,
  "previous_distortion_type": "fomo_herd",
  "conversation_history": [
    {"role": "assistant", "content": "주변 수익 이야기를 들으면 소외감이 커질 수 있어요. 지금 이 종목을 사고 싶은 마음에 가장 크게 영향을 주는 장면이나 말은 무엇인가요?"},
    {"role": "user", "content": "솔직히 펀더멘털보다 나만 못 벌 것 같은 마음이 더 커요."}
  ],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "fomo_herd",
  "distortion_tag": "👥 나만 놓칠까 불안해요",
  "empathy": "NVDA를 보면서 나만 못 벌 것 같은 마음이 크게 올라오셨군요.",
  "question": "지금 이 판단에서 내 기준보다 뒤처질까 봐 드는 마음이 얼마나 크게 작용하고 있나요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 더 크게 움직이는 쪽은 무엇에 가깝나요?",
  "meta_options": [
    "남들 흐름에서 놓치고 싶지 않은 마음",
    "내가 세운 기준과 이유"
  ],
  "reflection_summary": "이번 대화에서는 NVDA를 볼 때 판단 근거보다 비교와 소외 불안이 더 앞서는 패턴이 보였어요. 앞으로는 내가 세운 기준과 놓칠까 봐 드는 마음이 각각 얼마나 판단에 섞이는지 살펴볼 지점이 있어 보여요.",
  "required": true
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=meta_cognition / required=True
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 4166ms / tokens: prompt=2550, completion=207, total=2757
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=fomo_herd, preferred=['fomo_herd', 'all_or_nothing']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 NVDA를 볼 때 판단 근거보다 비교와 소외 불안이 더 앞서는 패턴이 보였어요...'

---

### 15. pre_turn2_panic

- **생성 시각:** 2026-04-03T22:19:08
- **Fixture:** `pre_turn2_panic.request.json`

**Request**
```json
{
  "mode": "pre",
  "ticker": "삼성전자",
  "text": "매수 근거가 바뀐 건 아닌데 숫자 보는 게 너무 무서워요.",
  "turn_number": 2,
  "previous_distortion_type": "catastrophizing",
  "conversation_history": [
    {"role": "assistant", "content": "하락이 이어지면 손실이 더 커질까 봐 겁이 날 수 있어요. 처음 매수했을 때의 근거가 오늘도 여전히 유효한 이유는 무엇인가요?"},
    {"role": "user", "content": "매수 근거가 바뀐 건 아닌데 숫자 보는 게 너무 무서워요."}
  ],
  "emotion": "불안해요"
}
```

**Response**
```json
{
  "distortion_type": "catastrophizing",
  "distortion_tag": "🌀 최악으로 번지고 있어요",
  "empathy": "매수 근거가 바뀌지 않았는데도 숫자를 보는 것 자체가 무서우셨군요.",
  "question": "지금 피하고 싶은 마음과 처음 판단의 이유를 나눠서 보면, 어느 쪽이 현재 생각을 더 크게 끌고 가고 있나요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 내 판단을 더 움직이는 것은 무엇에 가깝나요?",
  "meta_options": [
    "숫자를 마주하기 무서운 마음이 더 크다",
    "처음 세운 이유와 기준이 더 남아 있다"
  ],
  "reflection_summary": "이번 대화에서는 근거 자체보다 불안이 판단 과정 앞에 먼저 서는 모습이 보였어요. 앞으로는 두려움이 커질 때 판단의 이유와 피하고 싶은 마음이 어떻게 섞이는지 살펴볼 지점이 있어 보여요.",
  "required": true
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=meta_cognition / required=True
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 4212ms / tokens: prompt=2551, completion=218, total=2769
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 근거 자체보다 불안이 판단 과정 앞에 먼저 서는 모습이 보였어요...'

---

## 📬 Post — Turn 1

매매 완료 후 감정 회고 모드의 응답 품질을 검증합니다.

---

### 16. post_turn1

- **생성 시각:** 2026-04-03T22:18:11
- **Fixture:** `post_turn1.request.json`

**Request**
```json
{
  "mode": "post",
  "ticker": "에코프로",
  "text": "아까 참지 못하고 사버렸는데 지금 다시 생각나네요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "후회돼요"
}
```

**Response**
```json
{
  "distortion_type": "emotional_reasoning",
  "distortion_tag": "🌫️ 감정이 판단을 끌고 갔어요",
  "empathy": "아까 참지 못하고 사버린 뒤에 다시 생각이 맴돌아서 후회가 크게 남으셨겠어요.",
  "question": "그 순간 에코프로를 사게 만든 가장 강한 마음은 무엇이었나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 순간의 감정이 판단보다 앞서면서 행동으로 이어진 모습이 보였어요. 이런 흐름을 돌아보면 다음 판단에서 무엇이 먼저 작용하는지 살펴볼 단서가 될 것으로 보여요.",
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 3958ms / tokens: prompt=2537, completion=163, total=2700
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=emotional_reasoning, preferred=['emotional_reasoning', 'catastrophizing']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 순간의 감정이 판단보다 앞서면서 행동으로 이어진 모습이 보였어요...'

---

### 17. post_turn1_long_text

- **생성 시각:** 2026-04-03T22:18:24
- **Fixture:** `post_turn1_long_text.request.json`

**Request**
```json
{
  "mode": "post",
  "ticker": "에코프로",
  "text": "장중에 급등하는 걸 보고 또 놓치면 안 된다는 생각이 강하게 들었어요. 원래는 기다리려고 했는데, 갑자기 손이 먼저 나가서 매수 버튼을 눌렀어요. 사고 나니까 내가 왜 그렇게 급했는지 모르겠고, 다시 보니 근거보다 분위기에 휩쓸린 것 같아요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "후회돼요"
}
```

**Response**
```json
{
  "distortion_type": "fomo_herd",
  "distortion_tag": "👥 놓치면 안 된다는 압박에 끌렸어요",
  "empathy": "장중 급등을 보며 놓치면 안 된다는 마음에 많이 흔들리셨겠어요.",
  "question": "그 순간 에코프로를 사게 만든 가장 큰 힘은 내 판단보다 놓칠까 봐 드는 압박이었나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 급등하는 흐름을 보며 뒤처지면 안 된다는 압박이 판단에 강하게 작용한 모습이 보였어요. 근거보다 분위기가 더 크게 들어온 순간이 언제였는지 돌아보면 다음 판단에서 참고할 지점이 보일 것으로 보여요.",
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 3442ms / tokens: prompt=2604, completion=185, total=2789
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 급등하는 흐름을 보며 뒤처지면 안 된다는 압박이 판단에 강하게 작용한 모습이 보였어요...'

---

### 18. post_turn1_averaging

- **생성 시각:** 2026-04-03T22:18:48
- **Fixture:** `post_turn1_averaging.request.json`

**Request**
```json
{
  "mode": "post",
  "ticker": "삼성전자",
  "text": "이미 많이 물려 있어서 여기서 더 안 사면 지금까지 버틴 게 너무 아까울 것 같아 물을 탔어요. 하고 나서도 마음이 하나도 안 편해요.",
  "turn_number": 1,
  "conversation_history": [],
  "emotion": "후회돼요"
}
```

**Response**
```json
{
  "distortion_type": "sunk_cost",
  "distortion_tag": "💸 이미 들인 게 아까워 붙잡고 있어요",
  "empathy": "이미 많이 버틴 상태에서 더 보태고도 마음이 편하지 않으셨겠어요.",
  "question": "이번에 물을 탈 때 가장 크게 작용한 건 현재 상황을 바꾸고 싶은 마음이었나요, 아니면 처음 버티던 이유가 이어지고 있다는 느낌이었나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 이미 버틴 시간과 손실의 무게가 판단에 강하게 들어온 모습이 보였어요. 행동 뒤에도 마음이 편해지지 않았다는 점에서, 결정의 근거와 감정의 압박이 어떻게 섞였는지 다음 판단에서 참고할 수 있어 보여요.",
  "required": false
}
```

**Notes**
- LLM raw schema: PASS / API response schema: PASS
- question_type=exploratory / required=False
- prompt_file=prompts/system/system_v1.8.txt / model=gpt-5.4, temperature=0.6
- latency: 4202ms / tokens: prompt=2562, completion=192, total=2754
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=sunk_cost, preferred=['sunk_cost', 'anchoring_bias']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 이미 버틴 시간과 손실의 무게가 판단에 강하게 들어온 모습이 보였어요...'

---

*총 18개 케이스 모두 ✅ PASS*
