import { UserRound } from "lucide-react";
import { EmotionBoardView } from "@/components/insights-flow/emotion-board-view";
import { BottomTabBar } from "@/components/bottom-tab-bar";

export function MainHomeView({
  onOpenAccount,
}: {
  onOpenAccount: () => void;
}) {
  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-100">
        <header className="space-y-4 bg-white px-5 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                오늘의 시장
              </div>
              <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">
                지금 흔들리고 있나요?
              </h1>
              <p className="font-serif text-sm leading-6 text-stone-500">
                오늘 많은 투자자들이 감정으로 흔들렸어요.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAccount}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100"
            >
              <UserRound className="h-3.5 w-3.5" />
              로그인
            </button>
          </div>

          <button
            type="button"
            className="w-full rounded-2xl bg-stone-900 px-5 py-4 text-center text-base font-semibold text-white"
          >
            살까 / 팔까 — 지금 살펴봐요
          </button>
        </header>

        <div className="px-4 pb-4 pt-3">
          <EmotionBoardView />
        </div>
      </div>

      <BottomTabBar activeTab="home" />
    </>
  );
}
