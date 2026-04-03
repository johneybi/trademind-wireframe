# gpt-5.4 비용 분석 리포트 (v1.8 기준)

> **기준:** system_v1.8 · temperature 0.6 · Standard 요금
> **단가:** Input $2.50/1M · Output $15.00/1M tokens
> **테스트 실행:** 2026-04-03_21-59-47
> **환율:** $1 ≈ ₩1,380 (참고용)
> **v1.8 변경점:** `reflection_summary` 필드 추가 — pre turn2, post turn1에서 completion 토큰 증가

---

## 1. 테스트 케이스별 실측 비용

| 케이스                         | 턴 유형    | prompt | completion | total | **비용** |
| ------------------------------ | ---------- | ------ | ---------- | ----- | -------- |
| baseline/post_turn1            | post turn1 | 2,537  | 171        | 2,708 | $0.00891 |
| baseline/pre_turn1_text_null   | pre turn1  | 2,528  | 98         | 2,626 | $0.00779 |
| baseline/pre_turn2             | pre turn2  | 2,546  | 217        | 2,763 | $0.00962 |
| edge/post_turn1_long_text      | post turn1 | 2,604  | 183        | 2,787 | $0.00926 |
| edge/pre_turn1_emotions_only   | pre turn1  | 2,518  | 101        | 2,619 | $0.00781 |
| edge/pre_turn1_no_ticker       | pre turn1  | 2,527  | 99         | 2,626 | $0.00780 |
| edge/pre_turn1_single_emotion  | pre turn1  | 2,533  | 97         | 2,630 | $0.00779 |
| guardrail/guardrail_buy        | pre turn1  | 2,527  | 104        | 2,631 | $0.00788 |
| guardrail/guardrail_direct     | pre turn1  | 2,538  | 98         | 2,636 | $0.00782 |
| guardrail/guardrail_price      | pre turn1  | 2,527  | 99         | 2,626 | $0.00780 |
| guardrail/guardrail_sell       | pre turn1  | 2,527  | 101        | 2,628 | $0.00783 |
| persona/post_turn1_averaging   | post turn1 | 2,562  | 186        | 2,748 | $0.00920 |
| persona/pre_turn1_anchoring    | pre turn1  | 2,542  | 102        | 2,644 | $0.00789 |
| persona/pre_turn1_confirmation | pre turn1  | 2,550  | 97         | 2,647 | $0.00783 |
| persona/pre_turn1_fomo         | pre turn1  | 2,547  | 115        | 2,662 | $0.00809 |
| persona/pre_turn1_panic        | pre turn1  | 2,546  | 98         | 2,644 | $0.00784 |
| persona/pre_turn2_fomo         | pre turn2  | 2,550  | 222        | 2,772 | $0.00971 |
| persona/pre_turn2_panic        | pre turn2  | 2,551  | 226        | 2,777 | $0.00977 |

---

## 2. 턴 유형별 평균

| 턴 유형                              | 케이스 수 | 평균 prompt | 평균 completion | 평균 비용    |
| ------------------------------------ | --------- | ----------- | --------------- | ------------ |
| pre turn1 (reflection_summary=null)  | 12건      | 2,534       | 101             | **$0.00785** |
| post turn1 (reflection_summary 포함) | 3건       | 2,568       | 180             | **$0.00912** |
| pre turn2 (reflection_summary 포함)  | 3건       | 2,549       | 222             | **$0.00970** |
| 전체 평균                            | 18건      | 2,542       | 134             | **$0.00837** |

> v1.8에서 pre turn1과 post turn1의 completion 토큰이 분리됨.
> post turn1은 reflection_summary 생성으로 completion 101 → 180 (+79 tokens).
> pre turn2는 meta_options + reflection_summary 포함으로 completion 161 → 222 (+61 tokens).

---

## 3. v1.7 대비 변화

| 항목                      | v1.7     | v1.8     | 변화                  |
| ------------------------- | -------- | -------- | --------------------- |
| pre turn1 avg prompt      | 2,332    | 2,534    | **+202 tokens (+9%)** |
| pre turn1 avg completion  | 99       | 101      | +2 tokens             |
| post turn1 avg completion | 99       | 180      | **+81 tokens (+82%)** |
| pre turn2 avg prompt      | 2,348    | 2,549    | **+201 tokens (+9%)** |
| pre turn2 avg completion  | 161      | 222      | **+61 tokens (+38%)** |
| pre turn1 비용            | $0.00732 | $0.00785 | **+$0.00053 (+7%)**   |
| post turn1 비용           | $0.00732 | $0.00912 | **+$0.00180 (+25%)**  |
| pre turn2 비용            | $0.00829 | $0.00970 | **+$0.00141 (+17%)**  |

> v1.8 prompt 증가 (+200 tokens)는 v1.7과 동일한 수준 (시스템 프롬프트 reflection_summary 지시 추가).
> completion 증가는 reflection_summary 생성이 원인. post turn1 영향이 가장 큼.

---

## 4. 세션당 예상 비용 (v1.8 기준)

| 모드                          | 구성                  | 예상 비용                          | 원화        |
| ----------------------------- | --------------------- | ---------------------------------- | ----------- |
| **pre**                       | pre turn1 + pre turn2 | $0.00785 + $0.00970 = **$0.01755** | **약 24원** |
| **post**                      | post turn1만          | **$0.00912**                       | **약 13원** |
| **평균** (pre/post 반반 가정) | —                     | **$0.01334**                       | **약 18원** |

---

## 5. 사용자 규모별 월간 비용 추산

pre/post 50:50 가정, 사용자 1인당 세션 1회 기준.

| 사용자 수 | 비용     | 원화             |
| --------- | -------- | ---------------- |
| 100명     | ~$1.33   | **약 1,840원**   |
| 500명     | ~$6.67   | **약 9,200원**   |
| 1,000명   | ~$13.34  | **약 18,410원**  |
| 5,000명   | ~$66.70  | **약 92,050원**  |
| 10,000명  | ~$133.40 | **약 184,090원** |

---

## 6. 비용 구조 분석

### input vs output 비중

| 항목        | pre turn1 기준              | 비중   |
| ----------- | --------------------------- | ------ |
| Input 비용  | 2,534 × $2.50/1M = $0.00634 | 약 81% |
| Output 비용 | 101 × $15.00/1M = $0.00152  | 약 19% |

> output 단가가 input의 6배이지만 completion 토큰 수가 적어 비중은 19~26% 수준.
> reflection_summary 생성 케이스(post turn1, pre turn2)는 output 비중이 30%까지 상승.

### 최적화 여지

| 방법                | 예상 효과                                                                               |
| ------------------- | --------------------------------------------------------------------------------------- |
| Prompt Caching 적용 | 시스템 프롬프트 ~2,300 tokens → 캐시 단가 $0.25/1M 적용 시 **input 비용 최대 41% 절감** |
| Output 길이 제한    | max_tokens 300~350 설정 권장 (현재 평균 101~222, 여유 있음)                             |
| post 모드 비중 증가 | turn2 없으나 reflection_summary로 v1.7 대비 post 비용 25% 증가 유의                     |

### Prompt Caching 적용 시 참고 (시스템 프롬프트 ~2,300 tokens 캐시 가정)

| 모드      | 기본     | 캐싱 적용 시 | 절감            |
| --------- | -------- | ------------ | --------------- |
| pre 세션  | $0.01755 | ~$0.01227    | **약 30% 절감** |
| post 세션 | $0.00912 | ~$0.00627    | **약 31% 절감** |

---

## 7. 해커톤 MVP 비용 평가

| 항목            | 내용                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------- |
| 비용 리스크     | **없음** — 해커톤 규모 수천 세션은 $13~80 이내                                                     |
| 주요 리스크     | reflection_summary 생성으로 completion 증가. max_tokens 미설정 시 응답 길이 폭발 가능. 설정 권장   |
| 권장 max_tokens | 300~350                                                                                            |
| 대안 모델 비교  | gpt-5.4-mini(output $4.50/1M) 전환 시 output 비용 **70% 절감** 가능. 단, override 품질 저하 확인됨 |
