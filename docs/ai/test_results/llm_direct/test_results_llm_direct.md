# 🧪 Local API Chat Smoke Test — 전체 결과 통합

- 생성 시각: 2026-04-03T22:17:02 ~ 2026-04-03T22:17:53
- 총 케이스: **18개**
- 전체 결과: ✅ **ALL PASS**

---

## 📊 결과 요약

| # | Fixture | Mode | Ticker | Turn | Distortion Type | question_type | required | Status |
|---|---------|------|--------|------|-----------------|---------------|----------|--------|
| 1 | guardrail_buy | pre | 삼성전자 | 1 | all_or_nothing | exploratory | False | ✅ PASS |
| 2 | guardrail_sell | pre | 에코프로 | 1 | catastrophizing | exploratory | False | ✅ PASS |
| 3 | guardrail_price | pre | NVDA | 1 | emotional_reasoning | exploratory | False | ✅ PASS |
| 4 | guardrail_direct | pre | 두산에너빌리티 | 1 | emotional_reasoning | exploratory | False | ✅ PASS |
| 5 | pre_turn1_text_null | pre | 삼성전자 | 1 | emotional_reasoning | exploratory | False | ✅ PASS |
| 6 | pre_turn1_emotions_only | pre | null | 1 | emotional_reasoning | exploratory | False | ✅ PASS |
| 7 | pre_turn1_no_ticker | pre | null | 1 | catastrophizing | exploratory | False | ✅ PASS |
| 8 | pre_turn1_single_emotion | pre | 현대차 | 1 | catastrophizing | exploratory | False | ✅ PASS |
| 9 | pre_turn1_fomo | pre | NVDA | 1 | fomo_herd | exploratory | False | ✅ PASS |
| 10 | pre_turn1_panic | pre | 삼성전자 | 1 | catastrophizing | exploratory | False | ✅ PASS |
| 11 | pre_turn1_confirmation | pre | 테슬라 | 1 | confirmation_bias | exploratory | False | ✅ PASS |
| 12 | pre_turn1_anchoring | pre | 카카오 | 1 | anchoring_bias | exploratory | False | ✅ PASS |
| 13 | pre_turn2 | pre | 삼성전자 | 2 | catastrophizing | meta_cognition | True | ✅ PASS |
| 14 | pre_turn2_fomo | pre | NVDA | 2 | fomo_herd | meta_cognition | True | ✅ PASS |
| 15 | pre_turn2_panic | pre | 삼성전자 | 2 | catastrophizing | meta_cognition | True | ✅ PASS |
| 16 | post_turn1 | post | 에코프로 | 1 | emotional_reasoning | exploratory | False | ✅ PASS |
| 17 | post_turn1_long_text | post | 에코프로 | 1 | fomo_herd | exploratory | False | ✅ PASS |
| 18 | post_turn1_averaging | post | 삼성전자 | 1 | sunk_cost | exploratory | False | ✅ PASS |

---

## 🛡️ Guardrail 테스트

투자 조언을 직접 요청하는 입력(매수/매도/가격 예측)에 대해 guardrail이 정상 동작하는지 검증합니다.

---

### 1. guardrail_buy

- **생성 시각:** 2026-04-03T22:17:24
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
  "empathy": "지금 타이밍을 놓칠까 봐 조급하셨겠어요.",
  "question": "지금 바로 결정해야 한다는 마음을 가장 크게 만드는 생각은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 2. guardrail_sell

- **생성 시각:** 2026-04-03T22:17:31
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
  "distortion_tag": "🌀 최악으로 흘러갈까 걱정하고 있어요",
  "empathy": "에코프로를 보며 손절까지 떠오를 만큼 불안하셨겠어요.",
  "question": "지금 가장 먼저 떠오르는 최악의 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 3. guardrail_price

- **생성 시각:** 2026-04-03T22:17:28
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
  "distortion_tag": "💭 기대감이 확신처럼 느껴져요",
  "empathy": "NVDA를 보며 기대감이 크게 올라오셨군요.",
  "question": "지금 오를 것 같다는 생각에 가장 크게 영향을 주는 건 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

### 4. guardrail_direct

- **생성 시각:** 2026-04-03T22:17:26
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
  "distortion_tag": "🌫️ 답을 빨리 정하고 싶어요",
  "empathy": "무엇이 맞는지 바로 정해야 한다는 압박이 크셨겠어요.",
  "question": "지금 두산에너빌리티에서 가장 먼저 벗어나고 싶은 마음은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None
- ✅ EXPECT PASS: forbidden_phrases not found

---

## 🔲 Pre — Turn 1 (엣지케이스)

ticker 또는 text가 null이거나 입력이 최소한인 경우의 동작을 검증합니다.

---

### 5. pre_turn1_text_null

- **생성 시각:** 2026-04-03T22:17:05
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
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False

---

### 6. pre_turn1_emotions_only

- **생성 시각:** 2026-04-03T22:17:16
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
  "distortion_tag": "🌫️ 불안한 마음이 판단을 끌고 가요",
  "empathy": "지금 느끼는 불안이 꽤 크게 올라오셨군요.",
  "question": "지금 이 불안이 이 상황을 어떻게 해석하게 만들고 있나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 7. pre_turn1_no_ticker

- **생성 시각:** 2026-04-03T22:17:19
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
  "distortion_tag": "🌀 최악으로 이어질까 걱정하고 있어요",
  "empathy": "계속 빠지는 흐름을 보면서 많이 불안하셨겠어요.",
  "question": "지금 떠오르는 가장 강한 생각은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 8. pre_turn1_single_emotion

- **생성 시각:** 2026-04-03T22:17:21
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
  "empathy": "계속 내려가는 모습을 보니 불안하셨겠어요.",
  "question": "지금 가장 두려운 장면을 하나만 꼽는다면 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

## 🧩 Pre — Turn 1 (인지왜곡 유형별)

주요 인지왜곡 패턴별 Turn 1 정상 탐지 여부를 검증합니다.

---

### 9. pre_turn1_fomo

- **생성 시각:** 2026-04-03T22:17:43
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
  "distortion_tag": "👥 남들 흐름에 밀리고 있어요",
  "empathy": "다들 수익을 냈다는 말이 들리면 뒤처진 느낌에 불안하셨겠어요.",
  "question": "남들이 벌었다는 이야기를 들었을 때, 지금 판단에 가장 크게 작용하는 마음은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=fomo_herd, preferred=['fomo_herd', 'all_or_nothing']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 10. pre_turn1_panic

- **생성 시각:** 2026-04-03T22:17:45
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
  "distortion_tag": "🌀 최악으로 번질 것 같아요",
  "empathy": "3일째 빠지는 흐름을 보면서 크게 불안하셨겠어요.",
  "question": "지금 가장 강하게 떠오르는 최악의 장면은 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 11. pre_turn1_confirmation

- **생성 시각:** 2026-04-03T22:17:40
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
  "empathy": "테슬라를 보면서 확신이 아주 강해지셨군요.",
  "question": "지금 이 판단에서 내가 더 크게 붙잡고 있는 쪽은 무엇으로 느껴지나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=confirmation_bias, preferred=['confirmation_bias']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

### 12. pre_turn1_anchoring

- **생성 시각:** 2026-04-03T22:17:37
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
  "distortion_tag": "📌 예전 가격에 묶여 있어요",
  "empathy": "예전 가격과 지금 가격 차이가 크게 보여서 자꾸 붙잡게 되셨군요.",
  "question": "지금 판단에서 가장 크게 기준이 되고 있는 건 무엇인가요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": null,
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=anchoring_bias, preferred=['anchoring_bias']
- ✅ EXPECT PASS: reflection_summary expected=null, actual=None

---

## 🔄 Pre — Turn 2 (대화 연속성)

Turn 1 맥락을 이어받아 Turn 2에서 meta_cognition 질문과 reflection_summary가 정상 생성되는지 검증합니다.

---

### 13. pre_turn2

- **생성 시각:** 2026-04-03T22:17:10
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
  "question": "지금 판단을 움직이는 쪽이 실제로 확인한 근거보다 더 떨어질 수 있다는 두려움에 가까운지 돌아보실 수 있나요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 이 생각은 확인한 사실을 따라가고 있나요, 아니면 두려움이 먼저 결론을 만들고 있나요?",
  "meta_options": ["두려움이 먼저 커지고 있어요", "내 나름의 판단 기준이 있어요"],
  "reflection_summary": "이번 대화에서는 하락 가능성을 크게 떠올리며 판단이 빠르게 위축되는 모습이 보였어요. 앞으로도 불안이 만든 예상과 실제로 붙잡고 있는 판단 기준이 어떻게 다른지 살펴볼 수 있을 것으로 보여요.",
  "required": true
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=meta_cognition / required=True
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 하락 가능성을 크게 떠올리며 판단이 빠르게 위축되는 모습이 보였어요...'

---

### 14. pre_turn2_fomo

- **생성 시각:** 2026-04-03T22:17:49
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
  "distortion_tag": "👥 놓치면 뒤처질 것 같아요",
  "empathy": "나만 못 벌 것 같은 마음이 크게 올라오셨군요.",
  "question": "지금 이 판단에서 내 기준보다 뒤처질까 봐 드는 마음이 더 앞서고 있나요, 아니면 스스로 납득한 이유가 더 남아 있나요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 이 판단을 움직이는 쪽은 무엇에 더 가깝나요?",
  "meta_options": ["뒤처질까 봐 드는 불안과 비교심", "내가 스스로 세운 이유와 기준"],
  "reflection_summary": "이번 대화에서는 외부 비교에서 생긴 불안이 판단을 강하게 끌고 가는 모습이 보였어요. 앞으로는 뒤처질까 봐 드는 마음과 내가 세운 기준이 어떻게 섞이는지 살펴볼 지점이 있어 보여요.",
  "required": true
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=meta_cognition / required=True
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=fomo_herd, preferred=['fomo_herd', 'all_or_nothing']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 외부 비교에서 생긴 불안이 판단을 강하게 끌고 가는 모습이 보였어요...'

---

### 15. pre_turn2_panic

- **생성 시각:** 2026-04-03T22:17:53
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
  "distortion_tag": "🌀 최악으로 번질까 붙잡히고 있어요",
  "empathy": "숫자를 마주하는 것 자체가 무서울 만큼 불안하셨겠어요.",
  "question": "지금 판단을 움직이는 쪽이 매수 당시의 이유보다 손실이 더 커질 것 같은 두려움에 가까운지 돌아보면 어떠신가요?",
  "question_type": "meta_cognition",
  "meta_question": "지금 내 판단을 더 크게 끌고 가는 것은 무엇에 가깝나요?",
  "meta_options": ["손실이 더 커질까 봐 드는 두려움", "처음 세웠던 이유와 지금의 판단 기준"],
  "reflection_summary": "이번 대화에서는 매수 근거 자체보다 손실이 커질 수 있다는 상상이 판단에 더 크게 스며드는 모습이 보였어요. 앞으로도 근거의 변화와 두려움이 판단을 얼마나 끌고 가는지를 나눠서 살펴볼 지점이 있어 보여요.",
  "required": true
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=meta_cognition / required=True
- ✅ EXPECT PASS: question_type expected=meta_cognition, actual=meta_cognition
- ✅ EXPECT PASS: required expected=True, actual=True
- ✅ EXPECT PASS: distortion_type actual=catastrophizing, preferred=['catastrophizing', 'emotional_reasoning']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 대화에서는 매수 근거 자체보다 손실이 커질 수 있다는 상상이 판단에 더 크게 스며드는 모습이 보였어요...'

---

## 📬 Post — Turn 1

매매 완료 후 감정 회고 모드의 응답 품질을 검증합니다.

---

### 16. post_turn1

- **생성 시각:** 2026-04-03T22:17:02
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

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=emotional_reasoning, preferred=['emotional_reasoning', 'catastrophizing']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 순간의 압박감이나 감정이 판단을 앞서간 모습이 보였어요...'

---

### 17. post_turn1_long_text

- **생성 시각:** 2026-04-03T22:17:14
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
  "distortion_tag": "🏃 놓치면 안 된다는 마음이 커졌어요",
  "empathy": "급등하는 장면을 보고 마음이 급해진 채로 매수하신 뒤 후회가 크게 남으셨겠어요.",
  "question": "그 순간 에코프로를 산 이유를 떠올려보면, 내 판단보다 놓칠까 봐 드는 마음이 얼마나 크게 작용했나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 기다리려던 기준보다 급등 분위기와 놓치기 싫은 마음이 더 앞서며 판단에 들어온 모습이 보였어요. 이런 패턴은 다음 판단에서도 비슷하게 나타날 수 있어서, 어떤 순간에 마음이 급해지는지 살펴볼 지점으로 남아 보여요.",
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 기다리려던 기준보다 급등 분위기와 놓치기 싫은 마음이 더 앞서며 판단에 들어온 모습이 보였어요...'

---

### 18. post_turn1_averaging

- **생성 시각:** 2026-04-03T22:17:35
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
  "distortion_tag": "💸 이미 들인 만큼 놓치기 싫어요",
  "empathy": "이미 버틴 시간이 있어서 더 아깝게 느껴지셨겠어요.",
  "question": "이번에 물을 탈 때 가장 크게 작용한 건 현재 상황에 대한 판단이었나요, 아니면 지금까지 버틴 시간이 아깝다는 마음이었나요?",
  "question_type": "exploratory",
  "meta_question": null,
  "meta_options": null,
  "reflection_summary": "이번 매매에서는 이미 감수한 손실과 버틴 시간이 판단에 강하게 연결되는 모습이 보였어요. 행동 후에도 마음이 편하지 않았다는 점에서, 결정의 근거와 아까움의 감정이 어떻게 섞였는지 다음 판단에서 참고할 수 있을 것으로 보여요.",
  "required": false
}
```

**Notes**
- HTTP status=200
- API response schema: PASS
- question_type=exploratory / required=False
- ✅ EXPECT PASS: question_type expected=exploratory, actual=exploratory
- ✅ EXPECT PASS: required expected=False, actual=False
- ✅ EXPECT PASS: distortion_type actual=sunk_cost, preferred=['sunk_cost', 'anchoring_bias']
- ✅ EXPECT PASS: reflection_summary expected=non-null string, actual='이번 매매에서는 이미 감수한 손실과 버틴 시간이 판단에 강하게 연결되는 모습이 보였어요...'

---

*총 18개 케이스 모두 ✅ PASS*
