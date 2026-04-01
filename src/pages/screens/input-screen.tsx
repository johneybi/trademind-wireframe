import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, BrainCircuit, Check, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModeOption = "pre" | "post";

const modeOptions: { value: ModeOption; label: string; hint: string }[] = [
  {
    value: "pre",
    label: "사고 싶거나 팔고 싶어요",
    hint: "매매 직전 판단 점검",
  },
  {
    value: "post",
    label: "이미 한 매매가 마음에 걸려요",
    hint: "사후 복기 기록",
  },
];

const STOCKS = [
  { name: "삼성전자", code: "005930", market: "KOSPI" },
  { name: "삼성SDI", code: "006400", market: "KOSPI" },
  { name: "SK하이닉스", code: "000660", market: "KOSPI" },
  { name: "LG에너지솔루션", code: "373220", market: "KOSPI" },
  { name: "현대차", code: "005380", market: "KOSPI" },
  { name: "기아", code: "000270", market: "KOSPI" },
  { name: "POSCO홀딩스", code: "005490", market: "KOSPI" },
  { name: "에코프로비엠", code: "247540", market: "KOSDAQ" },
  { name: "에코프로", code: "086520", market: "KOSDAQ" },
  { name: "카카오", code: "035720", market: "KOSPI" },
  { name: "네이버", code: "035420", market: "KOSPI" },
  { name: "셀트리온", code: "068270", market: "KOSPI" },
  { name: "NVDA", code: "NVDA", market: "NASDAQ" },
  { name: "TSLA", code: "TSLA", market: "NASDAQ" },
  { name: "AAPL", code: "AAPL", market: "NASDAQ" },
  { name: "MSFT", code: "MSFT", market: "NASDAQ" },
  { name: "AMZN", code: "AMZN", market: "NASDAQ" },
  { name: "META", code: "META", market: "NASDAQ" },
  { name: "GOOGL", code: "GOOGL", market: "NASDAQ" },
];

const emotionOptions = ["불안해요", "조급해요", "확신해요", "후회돼요", "모르겠어요"];

// step 0 = 모드 선택 (인디케이터 없음)
// step 1~4 = 종목·감정·기록·AI (인디케이터 4칸)
const INDICATOR_STEPS = 4;

function ProgressBar({ step }: { step: number }) {
  // step 1~4 → indicator position 0~3
  const pos = step - 1;
  return (
    <div className="flex flex-1 items-center gap-1">
      {Array.from({ length: INDICATOR_STEPS }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-[3px] flex-1 rounded-full transition-colors duration-300",
            i < pos ? "bg-stone-900" : i === pos ? "bg-stone-500" : "bg-stone-200",
          )}
        />
      ))}
    </div>
  );
}

function ScreenFrame({
  title,
  description,
  visual,
  children,
}: {
  title: string;
  description?: string;
  visual?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.section
      key={title}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      <div className="px-5 pt-8 text-center">
        <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">{title}</h1>
        {description ? <p className="mt-3 font-serif text-sm leading-6 text-stone-500">{description}</p> : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-8">
        {visual ? <div className="flex justify-center">{visual}</div> : null}
        <div className={cn("flex-1", visual ? "mt-10" : "")}>{children}</div>
      </div>
    </motion.section>
  );
}

export function InputScreen() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<ModeOption | null>(null);
  const [stockQuery, setStockQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<{ name: string; code: string; market: string } | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const filteredStocks = STOCKS.filter(
    (s) =>
      s.name.includes(stockQuery) ||
      s.code.toLowerCase().includes(stockQuery.toLowerCase()),
  );

  const canMoveStep3 = Boolean(emotion);
  const canMoveStep4 = Boolean(detail.trim());

  const goBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const primaryLabel = step === 1 ? (selectedStock ? "다음" : "종목 없이 진행") : "다음";

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-white shadow-[0_0_0_1px_rgba(231,229,228,0.9),0_30px_80px_-40px_rgba(28,25,23,0.4)]">

        {/* 헤더: step 0은 브랜드명만, step 1+는 뒤로가기 + 진행 바 */}
        <header className="border-b border-stone-100 px-5 pb-4 pt-5">
          {step === 0 ? (
            <div className="flex h-8 items-center justify-center">
              <span className="text-sm font-semibold tracking-widest text-stone-400">TRADEMIND</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="h-8 w-8 shrink-0 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <ProgressBar step={step} />
            </div>
          )}
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">

            {/* step 0 — 모드 선택 */}
            {step === 0 ? (
              <ScreenFrame
                title="지금 어떤 이야기를 하고 싶으세요?"
                visual={
                  <div className="flex h-36 w-36 items-center justify-center rounded-full bg-stone-100">
                    <BrainCircuit className="h-14 w-14 text-stone-500" />
                  </div>
                }
              >
                <div className="space-y-3">
                  {modeOptions.map((option) => {
                    const selected = mode === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setMode(option.value);
                          setStep(1);
                        }}
                        className={cn(
                          "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                          selected
                            ? "border-stone-900 bg-stone-900 text-white"
                            : option.value === "pre"
                              ? "border-stone-900 bg-stone-800 text-white"
                              : "border-stone-300 bg-stone-400 text-white",
                        )}
                      >
                        <p className="text-base font-semibold">{option.label}</p>
                        <p className={cn("mt-1 text-xs", selected ? "text-stone-300" : "text-white/80")}>
                          {option.hint}
                        </p>
                      </button>
                    );
                  })}

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-serif text-sm leading-6 text-stone-600">
                    종목 추천이 아니에요. 지금 그 판단이 감정에서 온 건지 함께 살펴봐요.
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {/* step 1 — 종목 */}
            {step === 1 ? (
              <motion.section
                key="stock"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex min-h-0 flex-1 flex-col"
              >
                {/* 상단: 타이틀 */}
                <div className="shrink-0 px-5 pt-8 text-center">
                  <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">어떤 종목인가요?</h1>
                  <p className="mt-3 font-serif text-sm leading-6 text-stone-500">
                    몰라도 괜찮아요. 감정만으로도 대화를 시작할 수 있어요.
                  </p>
                </div>

                {/* 중간: 검색 결과 or 선택된 종목 or 힌트 카드 */}
                <div className="min-h-0 flex-1 overflow-auto px-5 pt-6">
                  {stockQuery.length > 0 ? (
                    filteredStocks.length > 0 ? (
                      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                        {filteredStocks.map((s, i) => (
                          <button
                            key={s.code}
                            type="button"
                            onClick={() => {
                              setSelectedStock(s);
                              setStockQuery("");
                            }}
                            className={cn(
                              "flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-stone-50",
                              i > 0 && "border-t border-stone-100",
                              selectedStock?.code === s.code && "bg-stone-50",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                                {selectedStock?.code === s.code ? (
                                  <Check className="h-4 w-4 text-stone-900" />
                                ) : null}
                              </div>
                              <span className="text-sm font-medium text-stone-900">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-stone-400">{s.code}</span>
                              <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500">
                                {s.market}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="py-10 text-center font-serif text-sm text-stone-400">결과 없음</p>
                    )
                  ) : selectedStock ? (
                    <div className="flex items-center justify-between rounded-2xl border border-stone-900 bg-white px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Check className="h-4 w-4 shrink-0 text-stone-900" />
                        <div>
                          <span className="text-sm font-medium text-stone-900">{selectedStock.name}</span>
                          <span className="ml-2 text-xs text-stone-400">{selectedStock.code}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedStock(null)}
                        className="text-xs text-stone-400 hover:text-stone-700"
                      >
                        지우기
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-serif text-sm leading-6 text-stone-600">
                      특정 종목이 없어도 괜찮아요. 지금 느끼는 조급함이나 불안 자체가 더 중요한 이야기예요.
                    </div>
                  )}
                </div>

                {/* 하단: 검색 인풋 */}
                <div className="shrink-0 px-5 pb-4 pt-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:bg-white"
                      placeholder="종목명 또는 코드 입력"
                      value={stockQuery}
                      onChange={(e) => {
                        setStockQuery(e.target.value);
                        if (selectedStock) setSelectedStock(null);
                      }}
                    />
                  </div>
                </div>
              </motion.section>
            ) : null}

            {/* step 2 — 감정 */}
            {step === 2 ? (
              <ScreenFrame
                title="지금 어떤 감정인가요?"
                description="가장 가까운 감정을 골라주세요."
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {emotionOptions.map((option) => {
                      const selected = emotion === option;
                      return (
                        <Button
                          key={option}
                          type="button"
                          variant="outline"
                          size="sm"
                          className={cn(
                            "rounded-xl border-stone-300 px-4 text-sm",
                            selected
                              ? "border-2 border-stone-900 bg-white text-stone-900 hover:bg-white"
                              : "bg-white text-stone-700 hover:bg-stone-50",
                          )}
                          onClick={() => setEmotion(option)}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-white p-2 text-stone-700 shadow-xs">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">감정을 비난하지 않아요</p>
                        <p className="mt-1 font-serif text-sm leading-6 text-stone-600">
                          먼저 공감한 다음, 지금 감정이 앞서는지 질문으로 함께 살펴봐요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {/* step 3 — 자유 기록 */}
            {step === 3 ? (
              <ScreenFrame
                title="조금 더 적어주세요"
                description="1~2문장이면 충분해요. 적는 것 자체가 첫 번째 쿨다운이에요."
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-xl border-2 border-stone-900 px-4 py-2 text-sm font-medium text-stone-900">
                      {emotion ?? "감정 미선택"}
                    </div>
                    <div className="rounded-xl bg-stone-100 px-3 py-2 text-xs text-stone-600">
                      {mode === "post" ? "사후 복기" : "사전 개입"}
                    </div>
                  </div>

                  <textarea
                    className="min-h-[140px] w-full resize-none rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-900 outline-hidden transition focus:border-stone-500 focus:bg-white"
                    placeholder={
                      mode === "post"
                        ? "예: 급등 보고 따라 샀는데 바로 빠져서 마음이 걸려요. 감정이 앞섰던 것 같아요."
                        : "예: NVDA가 너무 빨리 올라서 지금 안 사면 놓칠 것 같아요. 근거보다 조급함이 더 큰지 헷갈려요."
                    }
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-white p-2 text-stone-700 shadow-xs">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">다음 화면에서 이어져요</p>
                        <p className="mt-1 font-serif text-sm leading-6 text-stone-600">
                          공감 → 객관화 질문 → 비슷한 상황 투자자들의 선택 순서로 대화가 이어져요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {/* step 4 — AI 준비 */}
            {step === 4 ? (
              <ScreenFrame
                title="AI가 준비하고 있어요"
                description="종목 추천이 아니에요. 지금 판단의 질을 함께 점검해요."
                visual={
                  <div className="flex h-36 w-36 items-center justify-center rounded-full bg-stone-950 text-white">
                    <BrainCircuit className="h-14 w-14" />
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="rounded-[28px] border border-stone-200 bg-stone-50 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">입력 요약</p>
                    <div className="mt-3 space-y-2 text-sm text-stone-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-stone-500">모드</span>
                        <span>{mode === "post" ? "사후 복기" : "사전 개입"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-stone-500">종목</span>
                        <span>{selectedStock ? selectedStock.name : "미입력"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-stone-500">감정</span>
                        <span>{emotion ?? "-"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-stone-900 bg-stone-900 px-4 py-4 text-white">
                    <p className="text-sm font-semibold">이어지는 대화</p>
                    <p className="mt-2 font-serif text-sm leading-6 text-stone-300">
                      {mode === "post"
                        ? "2번의 질문으로, 그때 근거와 감정이 무엇이었는지 다시 살펴봐요."
                        : "3번의 질문으로, 지금 결정이 감정에서 온 건지 함께 확인해요."}
                    </p>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

          </AnimatePresence>
        </div>

        <footer className="sticky bottom-0 border-t border-stone-200 bg-white/95 px-5 pb-4 pt-4 backdrop-blur-sm">
          {step > 0 && step < 4 ? (
            <Button
              type="button"
              disabled={(step === 2 && !canMoveStep3) || (step === 3 && !canMoveStep4)}
              onClick={() => {
                if (step === 1) setStep(2);
                if (step === 2 && canMoveStep3) setStep(3);
                if (step === 3 && canMoveStep4) setStep(4);
              }}
              className={cn(
                "h-14 w-full rounded-2xl text-base font-semibold",
                (step === 2 && !canMoveStep3) || (step === 3 && !canMoveStep4)
                  ? "bg-stone-400 text-white hover:bg-stone-400"
                  : "bg-stone-800 text-white hover:bg-stone-800/95",
              )}
            >
              {primaryLabel}
            </Button>
          ) : null}

          {step === 4 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center text-sm text-stone-600">
              다음 프로토타입 화면인 AI 채팅에서 이어지는 단계예요.
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between px-1">
            {["메인", "입력", "캘린더", "보드"].map((item, index) => (
              <div key={item} className="flex w-14 justify-center">
                <div className={cn("h-8 w-8 rounded-xs", index === 1 ? "bg-stone-800" : "bg-stone-200")} />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
