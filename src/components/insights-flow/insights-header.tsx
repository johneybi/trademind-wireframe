import { cn } from "@/lib/utils";
import type { InsightsTabId } from "./types";

const tabOptions: Array<{ id: InsightsTabId; label: string }> = [
  { id: "calendar", label: "멘탈 캘린더" },
  { id: "board", label: "감정 공유 보드" },
];

export function InsightsHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: InsightsTabId;
  onTabChange: (tab: InsightsTabId) => void;
}) {
  return (
    <header className="space-y-3 border-b border-stone-200 bg-white px-5 pb-4 pt-5">
      <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
        내 기록
      </div>

      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">내 기록</h1>
        <p className="mt-1 font-serif text-sm leading-6 text-stone-500">
          최근 흐름과 반복되는 패턴을 한 화면에서 봅니다.
        </p>
      </div>

      <div className="inline-flex w-full rounded-full border border-stone-200 bg-stone-100 p-1">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-white text-stone-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                : "text-stone-500",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
