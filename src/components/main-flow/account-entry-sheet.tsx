import { ChevronRight, LogIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccountEntrySheet({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end bg-stone-950/25 p-3">
      <button
        type="button"
        aria-label="계정 시트 닫기"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative rounded-[28px] border border-stone-200 bg-white px-5 pb-5 pt-4 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            <LogIn className="h-3.5 w-3.5" />
            계정
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <h2 className="text-[24px] font-semibold tracking-tight text-stone-950">
            로그인하면
            <br />
            기록을 저장할 수 있어요
          </h2>
          <p className="font-serif text-sm leading-6 text-stone-500">
            대화 기록과 패턴이 쌓여서 다음번 판단에 도움이 돼요.
          </p>
        </div>

        <div className="mt-5 space-y-2">
          <Button
            className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95"
            onClick={onContinue}
          >
            이메일로 시작하기
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full rounded-2xl border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            onClick={onClose}
          >
            지금은 둘러볼게요
          </Button>
        </div>
      </div>
    </div>
  );
}
