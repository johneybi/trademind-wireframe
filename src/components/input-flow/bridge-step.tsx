import { BrainCircuit } from "lucide-react";
import { InputFlowStepLayout } from "./flow-step-layout";
import type { ModeOption } from "./types";

export function InputBridgeStep({ mode }: { mode: ModeOption | null }) {
  return (
    <InputFlowStepLayout
      step={4}
      title="이제 하나씩 살펴볼게요"
      description="지금 마음과 판단이 어디에서 엉키는지 차분히 확인해볼게요."
    >
      <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-stone-100 text-stone-500">
          <BrainCircuit className="h-10 w-10" />
        </div>

        <div className="mt-8 max-w-[280px]">
          <p className="font-serif text-sm leading-6 text-stone-500">
            {mode === "post"
              ? "방금 있었던 판단을 다시 짚어보면서, 무엇이 마음을 흔들었는지 함께 볼게요."
              : "지금 결정을 밀어붙이는 감정이 무엇인지, 대화로 하나씩 확인해볼게요."}
          </p>
        </div>
      </div>
    </InputFlowStepLayout>
  );
}
