import { cn } from "@/lib/utils";
import { emotionOptions } from "./constants";
import { InputFlowStepLayout } from "./flow-step-layout";

export function InputEmotionStep({
  emotion,
  onSelectEmotion,
}: {
  emotion: string | null;
  onSelectEmotion: (value: string) => void;
}) {
  return (
    <InputFlowStepLayout
      step={2}
      title="지금 어떤 감정에 가까운가요?"
      description="가장 가까운 감정 하나를 골라 주세요."
    >
      <div className="space-y-2">
        {emotionOptions.map((option) => {
          const selected = emotion === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectEmotion(option)}
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
                  selected ? "border-white bg-white" : "border-stone-300 bg-transparent",
                )}
              >
                {selected ? <span className="h-2.5 w-2.5 rounded-full bg-stone-900" /> : null}
              </span>
              <span className="text-[15px] font-medium">{option}</span>
            </button>
          );
        })}
      </div>
    </InputFlowStepLayout>
  );
}
