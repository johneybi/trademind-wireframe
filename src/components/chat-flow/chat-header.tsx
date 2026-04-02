import { ArrowLeft } from "lucide-react";
import type { ChatMode, ChatStage } from "./types";

function getHeaderCopy(mode: ChatMode, stage: ChatStage) {
  if (mode === "pre") {
    if (stage === "awaiting") {
      return {
        badge: "매매 전 점검",
        title: "입력한 내용을 먼저 읽고 있어요",
        description: "방금 적은 상황과 감정을 바탕으로 첫 질문을 준비하고 있어요.",
      };
    }

    if (stage === "question") {
      return {
        badge: "매매 전 점검",
        title: "입력한 내용을 바탕으로 같이 볼게요",
        description: "방금 적은 상황과 감정을 먼저 읽고 질문을 이어가요.",
      };
    }

    return {
      badge: "매매 전 점검",
      title: "마지막 선택만 한 번 더 정리할게요",
      description: "방금 나눈 내용을 바탕으로 감정과 근거를 한 번 더 나눠봐요.",
    };
  }

  if (stage === "complete") {
    return {
      badge: "매매 돌아보기",
      title: "복기 내용을 정리했어요",
      description: "방금 돌아본 내용을 바탕으로 결과 화면으로 이어져요.",
    };
  }

  return {
    badge: "매매 돌아보기",
    title: "입력한 매매 상황을 함께 돌아봐요",
    description: "방금 적은 내용을 기준으로 감정과 근거를 나눠서 봐요.",
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
