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

const stockOptions = ["삼성전자", "SK하이닉스", "NVDA", "에코프로"];
const emotionOptions = ["불안해요", "조급해요", "확신해요", "후회돼요", "모르겠어요"];
const stepLabels = ["의도", "종목", "감정", "기록", "AI"];

function StepDot({ state, label }: { state: "done" | "current" | "todo"; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
          state === "done" && "border-stone-900 bg-stone-900 text-white",
          state === "current" && "border-stone-900 bg-white text-stone-900",
          state === "todo" && "border-stone-300 bg-white text-transparent",
        )}
        aria-hidden="true"
      >
        {state === "done" ? <Check className="h-3 w-3" /> : "•"}
      </div>
      <span className="sr-only">{label}</span>
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
        {description ? <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p> : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-8">
        <div className="flex justify-center">{visual ?? <div className="h-36 w-36 rounded-full bg-stone-200" />}</div>
        <div className="mt-10 flex-1">{children}</div>
      </div>
    </motion.section>
  );
}

export function InputScreen() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<ModeOption | null>(null);
  const [stock, setStock] = useState("");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const canMoveStep2 = true;
  const canMoveStep3 = Boolean(emotion);
  const canMoveStep4 = Boolean(detail.trim());

  const goBack = () => {
    if (step === 0) return;
    setStep((current) => current - 1);
  };

  const primaryLabel = step === 1 ? (stock.trim() ? "다음" : "종목 없이 진행") : step === 2 ? "다음" : "입력 완료";

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-white shadow-[0_0_0_1px_rgba(231,229,228,0.9),0_30px_80px_-40px_rgba(28,25,23,0.4)]">
        <header className="border-b border-stone-100 px-5 pb-4 pt-5">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="h-8 w-8 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex flex-1 items-center">
              {stepLabels.map((label, index) => {
                const state = index < step ? "done" : index === step ? "current" : "todo";

                return (
                  <div key={label} className="flex flex-1 items-center gap-2 last:flex-initial last:gap-0">
                    <StepDot label={label} state={state} />
                    {index < stepLabels.length - 1 ? (
                      <div className={cn("h-px flex-1 bg-stone-300", index < step && "bg-stone-900")} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <ScreenFrame
                title="무엇이 고민이신가요?"
                description="지금 매매 직전인지, 이미 한 매매가 마음에 걸리는지 먼저 고릅니다."
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
                        <p className={cn("mt-1 text-xs", selected ? "text-stone-300" : "text-white/80")}>{option.hint}</p>
                      </button>
                    );
                  })}

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600">
                    TRADEMIND는 종목 추천이 아니라 지금 판단을 밀어붙이는 감정과 논리를 먼저 분리합니다.
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {step === 1 ? (
              <ScreenFrame
                title="종목명을 입력하거나 선택해주세요"
                description="모르면 비워두고 진행해도 됩니다. 감정 기록만으로도 AI 대화를 시작할 수 있습니다."
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {stockOptions.map((option) => {
                      const selected = stock === option;

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
                          onClick={() => setStock(option)}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>

                  <label className="relative block">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
                      placeholder="예: 삼성전자, NVDA, 에코프로"
                      value={stock}
                      onChange={(event) => setStock(event.target.value)}
                    />
                  </label>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600">
                    특정 종목이 없어도 괜찮습니다. 지금 느끼는 조급함이나 불안 자체가 더 중요한 입력입니다.
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {step === 2 ? (
              <ScreenFrame
                title="현재 감정은 어떠신가요?"
                description="가장 가까운 감정 하나를 먼저 고르세요. 이 값이 인지 왜곡 패턴 탐지의 기준점이 됩니다."
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
                      <div className="rounded-2xl bg-white p-2 text-stone-700 shadow-sm">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">AI가 여기서 하는 일</p>
                        <p className="mt-1 text-sm leading-6 text-stone-600">
                          감정을 비난하지 않고 먼저 공감한 뒤, 감정적 추론인지 합리적 판단인지 질문으로 구분합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {step === 3 ? (
              <ScreenFrame
                title="현재 감정과 상태를 조금 더 자세히 말해주세요"
                description="타이핑 브레이크입니다. 1~2문장만 적어도 첫 번째 쿨다운이 시작됩니다."
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-xl border-2 border-stone-900 px-4 py-2 text-sm font-medium text-stone-900">
                      {emotion ?? "감정 미선택"}
                    </div>
                    <div className="rounded-xl bg-stone-100 px-3 py-2 text-xs text-stone-600">
                      {mode === "post" ? "사후 복기 모드" : "사전 개입 모드"}
                    </div>
                  </div>

                  <textarea
                    className="min-h-[140px] w-full resize-none rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-900 outline-none transition focus:border-stone-500 focus:bg-white"
                    placeholder={
                      mode === "post"
                        ? "예: 급등 보고 따라 샀는데 바로 빠져서 마음이 걸려요. 왜 들어갔는지 다시 보면 감정이 앞섰던 것 같아요."
                        : "예: NVDA가 너무 빨리 올라서 지금 안 사면 놓칠 것 같아요. 근거보다 조급함이 더 큰지 헷갈립니다."
                    }
                    value={detail}
                    onChange={(event) => setDetail(event.target.value)}
                  />

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-white p-2 text-stone-700 shadow-sm">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">다음 화면에서 이어지는 흐름</p>
                        <p className="mt-1 text-sm leading-6 text-stone-600">
                          공감 문장, 객관화 질문, 메타인지 질문, 그리고 비슷한 상황 투자자들의 선택 데이터를 순서대로
                          보여줍니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {step === 4 ? (
              <ScreenFrame
                title="AI가 판단 흐름을 준비하고 있어요"
                description="입력은 끝났습니다. 이제 종목 추천이 아니라 지금 판단의 질을 점검하는 대화로 넘어갑니다."
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
                        <span>{stock.trim() || "미입력"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-stone-500">감정</span>
                        <span>{emotion ?? "-"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-stone-900 bg-stone-900 px-4 py-4 text-white">
                    <p className="text-sm font-semibold">다음 AI 단계</p>
                    <p className="mt-2 text-sm leading-6 text-stone-300">
                      {mode === "post"
                        ? "사후 복기 2턴으로, 당시 근거와 감정이 무엇이었는지 다시 짚습니다."
                        : "사전 점검 3턴으로, 지금 결정이 감정적 지배인지 질문으로 확인합니다."}
                    </p>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}
          </AnimatePresence>
        </div>

        <footer className="sticky bottom-0 border-t border-stone-200 bg-white/95 px-5 pb-4 pt-4 backdrop-blur">
          {step > 0 && step < 4 ? (
            <Button
              type="button"
              disabled={(step === 1 && !canMoveStep2) || (step === 2 && !canMoveStep3) || (step === 3 && !canMoveStep4)}
              onClick={() => {
                if (step === 1 && canMoveStep2) setStep(2);
                if (step === 2 && canMoveStep3) setStep(3);
                if (step === 3 && canMoveStep4) setStep(4);
              }}
              className={cn(
                "h-14 w-full rounded-2xl text-base font-semibold",
                step === 2 && !canMoveStep3
                  ? "bg-stone-400 text-white hover:bg-stone-400"
                  : step === 3 && !canMoveStep4
                    ? "bg-stone-400 text-white hover:bg-stone-400"
                    : "bg-stone-800 text-white hover:bg-stone-800/95",
              )}
            >
              {primaryLabel}
            </Button>
          ) : null}

          {step === 4 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center text-sm text-stone-600">
              다음 프로토타입 화면인 `AI 채팅`에서 이어지는 단계입니다.
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between px-1">
            {["메인", "입력", "캘린더", "보드"].map((item, index) => (
              <div key={item} className="flex w-14 justify-center">
                <div className={cn("h-8 w-8 rounded-sm", index === 1 ? "bg-stone-800" : "bg-stone-200")} />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
