import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  BrainCircuit,
  Check,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BottomTabBar } from "@/components/bottom-tab-bar";

type Step = 0 | 1 | 2 | 3 | 4;
type ModeOption = "pre" | "post";

type StockSelection = {
  name: string;
  code?: string;
  market?: string;
  source: "preset" | "manual";
};

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

const STOCKS: StockSelection[] = [
  { name: "삼성전자", code: "005930", market: "KOSPI", source: "preset" },
  { name: "삼성SDI", code: "006400", market: "KOSPI", source: "preset" },
  { name: "SK하이닉스", code: "000660", market: "KOSPI", source: "preset" },
  { name: "LG에너지솔루션", code: "373220", market: "KOSPI", source: "preset" },
  { name: "현대차", code: "005380", market: "KOSPI", source: "preset" },
  { name: "기아", code: "000270", market: "KOSPI", source: "preset" },
  { name: "POSCO홀딩스", code: "005490", market: "KOSPI", source: "preset" },
  { name: "에코프로비엠", code: "247540", market: "KOSDAQ", source: "preset" },
  { name: "에코프로", code: "086520", market: "KOSDAQ", source: "preset" },
  { name: "카카오", code: "035720", market: "KOSPI", source: "preset" },
  { name: "네이버", code: "035420", market: "KOSPI", source: "preset" },
  { name: "셀트리온", code: "068270", market: "KOSPI", source: "preset" },
  { name: "NVDA", code: "NVDA", market: "NASDAQ", source: "preset" },
  { name: "TSLA", code: "TSLA", market: "NASDAQ", source: "preset" },
  { name: "AAPL", code: "AAPL", market: "NASDAQ", source: "preset" },
  { name: "MSFT", code: "MSFT", market: "NASDAQ", source: "preset" },
  { name: "AMZN", code: "AMZN", market: "NASDAQ", source: "preset" },
  { name: "META", code: "META", market: "NASDAQ", source: "preset" },
  { name: "GOOGL", code: "GOOGL", market: "NASDAQ", source: "preset" },
];

const emotionOptions = ["불안해요", "조급해요", "확신해요", "후회돼요", "모르겠어요"];
const FLOW_STEPS = 4;

function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <main className="h-full bg-stone-100 text-stone-950">
      <div className="mx-auto flex h-full w-full max-w-[390px] flex-col bg-white shadow-[0_0_0_1px_rgba(231,229,228,0.9),0_30px_80px_-40px_rgba(28,25,23,0.4)]">
        {children}
      </div>
    </main>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const currentIndex = Math.max(0, step - 1);

  return (
    <div className="flex flex-1 items-center gap-1">
      {Array.from({ length: FLOW_STEPS }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-[3px] flex-1 rounded-full transition-colors duration-300",
            index < currentIndex
              ? "bg-stone-900"
              : index === currentIndex
                ? "bg-stone-500"
                : "bg-stone-200",
          )}
        />
      ))}
    </div>
  );
}



function FlowStepLayout({
  step,
  title,
  description,
  children,
}: {
  step: Step;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="shrink-0 px-5 pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
          Step {step}
        </p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-stone-950">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-[31ch] font-serif text-sm leading-6 text-stone-500">{description}</p>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-5">{children}</div>
    </motion.section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="text-right text-stone-800">{value}</span>
    </div>
  );
}

export function InputScreen() {
  const [step, setStep] = useState<Step>(0);
  const [mode, setMode] = useState<ModeOption | null>(null);
  const [stockQuery, setStockQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockSelection | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const filteredStocks = STOCKS.filter(
    (stock) =>
      stock.name.toLowerCase().includes(stockQuery.toLowerCase()) ||
      stock.code?.toLowerCase().includes(stockQuery.toLowerCase()),
  );

  const primaryLabel = step === 4 ? "AI 채팅으로 이어보기" : "다음";

  const isPrimaryDisabled =
    (step === 1 && !selectedStock && !stockQuery.trim()) ||
    (step === 2 && !emotion) ||
    (step === 3 && !detail.trim());

  const goBack = () => {
    if (step === 0) return;
    if (step === 1) {
      setStep(0);
      return;
    }

    setStep((current) => (current - 1) as Step);
  };

  const goNext = () => {
    if (step === 1) {
      if (!selectedStock && stockQuery.trim()) {
        setSelectedStock({
          name: stockQuery.trim(),
          source: "manual",
        });
      }

      setStep(2);
      return;
    }

    if (step === 2 && emotion) {
      setStep(3);
      return;
    }

    if (step === 3 && detail.trim()) {
      setStep(4);
    }
  };

  return (
    <DeviceFrame>
      {step === 0 ? (
        <>
          <header className="border-b border-stone-100 px-5 pb-4 pt-5">
            <div className="flex h-8 items-center justify-center">
              <span className="text-sm font-semibold tracking-widest text-stone-400">TRADEMIND</span>
            </div>
          </header>

          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-1 flex-col px-5 pb-6 pt-8"
          >
            <div className="flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-stone-100">
                <BrainCircuit className="h-14 w-14 text-stone-500" />
              </div>
            </div>

            <div className="mt-8 text-center">
              <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">
                지금 어떤 이야기를
                <br />
                하고 싶으세요?
              </h1>
              <p className="mt-3 font-serif text-sm leading-6 text-stone-500">
                종목 추천이 아니에요. 지금 그 판단이
                <br />
                감정에서 온 건지 함께 살펴봐요.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {modeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setMode(option.value);
                    setStep(1);
                  }}
                  className={cn(
                    "w-full rounded-2xl border px-5 py-5 text-left transition-colors",
                    option.value === "pre"
                      ? "border-stone-900 bg-stone-800 text-white"
                      : "border-stone-300 bg-stone-400 text-white",
                  )}
                >
                  <p className="text-base font-semibold">{option.label}</p>
                  <p className="mt-1 text-sm text-white/70">{option.hint}</p>
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <BottomTabBar activeTab="chat" />
            </div>
          </motion.section>
        </>
      ) : (
        <>
          <header className="border-b border-stone-100 px-5 pb-4 pt-5">
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
              <span className="shrink-0 text-xs font-medium text-stone-400">
                {step}/{FLOW_STEPS}
              </span>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                // Step 1은 인풋이 하단 고정이어야 해서 FlowStepLayout을 쓰지 않음
                <motion.section
                  key={1}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  {/* 상단: 타이틀 */}
                  <div className="shrink-0 px-5 pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Step 1</p>
                    <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-stone-950">
                      어떤 종목인가요?
                    </h1>
                    <p className="mt-2 font-serif text-sm leading-6 text-stone-500">
                      지금 마음에 걸리는 종목을 입력해요.
                    </p>
                  </div>

                  {/* 중간: 여백 (선택된 종목 카드가 있으면 하단으로 내려감) */}
                  <div className="min-h-0 flex-1" />

                  {/* 하단: 선택 확인 → 검색 결과 → 인풋 순으로 위에서 아래로 */}
                  <div className="shrink-0 space-y-2 px-5 pb-3">
                    {selectedStock ? (
                      <div className="rounded-2xl border border-stone-900 bg-white px-4 py-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Check className="h-4 w-4 shrink-0 text-stone-900" />
                            <div>
                              <p className="text-sm font-semibold text-stone-900">{selectedStock.name}</p>
                              {selectedStock.source === "preset" && (
                                <p className="text-xs text-stone-400">
                                  {[selectedStock.code, selectedStock.market].filter(Boolean).join(" · ")}
                                </p>
                              )}
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
                      </div>
                    ) : null}

                    {stockQuery && !selectedStock ? (
                      <div className="max-h-52 overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
                        {filteredStocks.length > 0 ? (
                          filteredStocks.map((stock, index) => (
                            <button
                              key={stock.code}
                              type="button"
                              onClick={() => {
                                setSelectedStock(stock);
                                setStockQuery("");
                              }}
                              className={cn(
                                "flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-stone-50",
                                index > 0 && "border-t border-stone-100",
                              )}
                            >
                              <span className="text-sm font-medium text-stone-900">{stock.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-stone-400">{stock.code}</span>
                                <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500">
                                  {stock.market}
                                </span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-4">
                            <p className="font-serif text-sm leading-6 text-stone-500">
                              목록에 없어도 괜찮아요. 지금 이름 그대로 다음으로 이어갈 수 있어요.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : null}

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

              {step === 2 ? (
                <FlowStepLayout
                  step={2}
                  title="지금 어떤 감정에 가까운가요?"
                  description="틀린 감정은 없어요. 지금 가장 가까운 것 하나를 골라 주세요."
                >
                  <div className="space-y-2">
                    {emotionOptions.map((option) => {
                      const selected = emotion === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setEmotion(option)}
                          className={cn(
                            "flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors",
                            selected
                              ? "border-stone-900 bg-stone-900 text-white"
                              : "border-stone-200 bg-white text-stone-800 hover:bg-stone-50",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              selected
                                ? "border-white bg-white"
                                : "border-stone-300 bg-transparent",
                            )}
                          >
                            {selected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-stone-900" />
                            )}
                          </span>
                          <span className="text-[15px] font-medium">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                </FlowStepLayout>
              ) : null}

              {step === 3 ? (
                <FlowStepLayout
                  step={3}
                  title="조금만 적어볼까요?"
                  description="지금 상황을 자유롭게 적어 주세요."
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700">
                        {mode === "post" ? "사후 복기" : "사전 개입"}
                      </div>
                      {emotion ? (
                        <div className="inline-flex rounded-xl border border-stone-900 bg-stone-900 px-4 py-2 text-sm text-white">
                          {emotion}
                        </div>
                      ) : null}
                    </div>

                    <textarea
                      className="min-h-[180px] w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-4 text-sm leading-6 text-stone-900 outline-hidden transition focus:border-stone-500"
                      placeholder={
                        mode === "post"
                          ? "예: 급등하는 흐름을 보고 바로 따라 들어갔어요. 지금은 손실보다 왜 그렇게 눌렸는지가 더 마음에 걸려요."
                          : "예: 지금 안 사면 영영 놓칠 것 같아요. 근거보다 조급함이 먼저 올라오는 느낌이 있어요."
                      }
                      value={detail}
                      onChange={(event) => setDetail(event.target.value)}
                    />

                    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white p-2 text-stone-700 shadow-xs">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">다음 화면에서 이어집니다</p>
                          <p className="mt-1 font-serif text-sm leading-6 text-stone-600">
                            공감, 객관화 질문, 메타인지 질문, 그리고 비슷한 사례의 선택 데이터 순서로 연결됩니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FlowStepLayout>
              ) : null}

              {step === 4 ? (
                <FlowStepLayout
                  step={4}
                  title="AI가 대화를 준비했어요"
                  description="이 단계는 실행 유도가 아니라 대화 진입 전 확인 화면입니다."
                >
                  <div className="space-y-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-stone-950 text-white">
                      <BrainCircuit className="h-10 w-10" />
                    </div>

                    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                        입력 요약
                      </p>
                      <div className="mt-3 space-y-3">
                        <SummaryRow label="모드" value={mode === "post" ? "사후 복기" : "사전 개입"} />
                        <SummaryRow label="종목" value={selectedStock?.name ?? "미입력"} />
                        <SummaryRow label="감정" value={emotion ?? "-"} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-stone-900 bg-stone-900 px-4 py-4 text-white">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white/10 p-2 text-white">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">이어서 받게 될 질문</p>
                          <p className="mt-2 font-serif text-sm leading-6 text-stone-300">
                            {mode === "post"
                              ? "그때의 판단이 근거보다 감정에 더 기대고 있었는지부터 차분히 되짚습니다."
                              : "지금 결정을 밀어붙이는 감정이 무엇인지 먼저 분리해서 살펴봅니다."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FlowStepLayout>
              ) : null}
            </AnimatePresence>
          </div>

          <footer className="shrink-0 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
            {step < 4 ? (
              <>
                <Button
                  type="button"
                  disabled={isPrimaryDisabled}
                  onClick={goNext}
                  className={cn(
                    "h-14 w-full rounded-2xl text-base font-semibold",
                    isPrimaryDisabled
                      ? "bg-stone-300 text-white hover:bg-stone-300"
                      : "bg-stone-800 text-white hover:bg-stone-800/95",
                  )}
                >
                  {primaryLabel}
                </Button>
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-3 w-full text-center text-sm text-stone-400 hover:text-stone-600"
                  >
                    종목 없이 건너뛸게요
                  </button>
                ) : null}
              </>
            ) : (
              <>
                <Button
                  type="button"
                  className="h-14 w-full rounded-2xl bg-stone-800 text-base font-semibold text-white hover:bg-stone-800/95"
                >
                  {primaryLabel}
                </Button>
                <p className="mt-3 text-center text-xs text-stone-400">
                  다음 프로토타입에서는 AI 채팅 화면으로 이어집니다.
                </p>
              </>
            )}
          </footer>
        </>
      )}
    </DeviceFrame>
  );
}
