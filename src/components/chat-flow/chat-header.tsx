import { ArrowLeft } from "lucide-react";
import type { ChatMode, ChatStage } from "./types";

function getHeaderCopy(mode: ChatMode, stage: ChatStage) {
  if (mode === "pre") {
    if (stage === "awaiting") {
      return {
        badge: "사전 개입",
        title: "지금 판단을 점검하는 중이에요",
        description: "첫 질문을 준비하며 개입을 시작합니다.",
      };
    }

    if (stage === "question") {
      return {
        badge: "사전 개입",
        title: "지금 판단의 근거를 다시 묻고 있어요",
        description: "바로 실행하기 전에 이유가 아직 유효한지 확인합니다.",
      };
    }

    return {
      badge: "사전 개입",
      title: "계속할지 멈출지 직전이에요",
      description: "감정 때문인지, 근거가 바뀌었는지 마지막으로 나눠봅니다.",
    };
  }

  if (stage === "complete") {
    return {
      badge: "사후 복기",
      title: "이미 한 판단을 정리하고 있어요",
      description: "복기 내용을 저장하고 결과 화면으로 이어집니다.",
    };
  }

  return {
    badge: "사후 복기",
    title: "이미 한 판단을 돌아보고 있어요",
    description: "당시의 근거와 감정을 분리해서 기록합니다.",
  };
}

export function ChatHeader({
  mode,
  stage,
  onBack,
}: {
  mode: ChatMode;
  stage: ChatStage;
  onBack?: () => void;
}) {
  const headerCopy = getHeaderCopy(mode, stage);

  return (
    <header className="shrink-0 border-b border-stone-200 bg-white px-4 py-3">
      <div className="grid grid-cols-[40px_1fr_40px] items-start gap-y-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600">
            {headerCopy.badge}
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-900">{headerCopy.title}</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">{headerCopy.description}</p>
        </div>

        <div />
      </div>
    </header>
  );
}
