import { Users } from "lucide-react";
import { InputFlowStepLayout } from "./flow-step-layout";
import type { ModeOption } from "./types";

export function InputDetailStep({
  emotion,
  mode,
  detail,
  onDetailChange,
}: {
  emotion: string | null;
  mode: ModeOption | null;
  detail: string;
  onDetailChange: (value: string) => void;
}) {
  return (
    <InputFlowStepLayout
      step={3}
      title={`어떤 상황 때문에 '${emotion}'라고 느껴지나요?`}
      description="지금 상황을 자유롭게 적어 주세요."
    >
      <div className="space-y-4">
        <textarea
          className="min-h-[180px] w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-4 text-sm leading-6 text-stone-900 outline-hidden transition focus:border-stone-500"
          placeholder={
            mode === "post"
              ? "예: 급등하는 흐름을 보고 바로 따라 들어갔어요. 지금은 손실보다 왜 그렇게 눌렸는지가 더 마음에 걸려요."
              : "예: 지금 안 사면 영영 놓칠 것 같아요. 근거보다 조급함이 먼저 올라오는 느낌이 있어요."
          }
          value={detail}
          onChange={(event) => onDetailChange(event.target.value)}
        />

        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-2 text-stone-700 shadow-xs">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">다음 화면에서 이어집니다</p>
              <p className="mt-1 font-serif text-sm leading-6 text-stone-600">
                공감, 질문, 그리고 비슷한 상황의 선택 데이터를 순서대로 보게 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InputFlowStepLayout>
  );
}
