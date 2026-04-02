import { ArrowLeft } from "lucide-react";
import type { ChatMode, ChatStage } from "./types";

function getHeaderCopy(mode: ChatMode, stage: ChatStage) {
  if (mode === "pre") {
    if (stage === "awaiting") {
      return {
        badge: "매매 전 점검",
        title: "마음 상태를 잠깐 살펴볼게요",
        description: "AI가 첫 질문을 준비하고 있어요.",
      };
    }

    if (stage === "question") {
      return {
        badge: "매매 전 점검",
        title: "매매 전에 한 번 같이 살펴봐요",
        description: "질문에 답하면서 스스로 정리해보세요.",
      };
    }

    return {
      badge: "매매 전 점검",
      title: "마지막으로 한 번만 더 확인해봐요",
      description: "감정과 근거를 분리해서 생각해볼게요.",
    };
  }

  if (stage === "complete") {
    return {
      badge: "매매 돌아보기",
      title: "거의 다 됐어요",
      description: "내용을 저장하면 결과를 확인할 수 있어요.",
    };
  }

  return {
    badge: "매매 돌아보기",
    title: "이미 한 결정, 함께 돌아봐요",
    description: "당시 감정을 기록해두면 다음에 도움이 돼요.",
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
