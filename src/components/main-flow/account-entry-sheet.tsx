import { ChevronRight, LogIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function AccountEntrySheet({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-stone-950/25"
        aria-describedby={undefined}
        className="fixed inset-x-0 bottom-0 top-auto z-50 w-auto max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-transparent p-3 shadow-none duration-200 data-[state=closed]:slide-out-to-bottom-8 data-[state=open]:slide-in-from-bottom-8 sm:rounded-none"
      >
        <div className="relative rounded-[28px] border border-stone-200 bg-white px-5 pb-5 pt-4 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              <LogIn className="h-3.5 w-3.5" />
              계정
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-full border-stone-200 bg-white text-stone-500 hover:bg-white"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-[24px] font-semibold tracking-tight text-stone-950">
              로그인하면
              <br />
              기록이 이어질 수 있어요
            </h2>
            <p className="font-serif text-sm leading-6 text-stone-500">
              지난 기록과 패턴을 잇고 다음번 판단에 다시 참고할 수 있어요.
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
      </DialogContent>
    </Dialog>
  );
}
