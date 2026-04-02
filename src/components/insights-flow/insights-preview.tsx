import { BottomTabBar } from "@/components/bottom-tab-bar";
import { CalendarView } from "./calendar-view";
import { InsightsHeader } from "./insights-header";

export function InsightsPreview() {
  return (
    <div className="flex h-full flex-col bg-white text-stone-950">
      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-100">
        <InsightsHeader />
        <div className="px-4 pb-4 pt-3">
          <CalendarView />
        </div>
      </div>
      <BottomTabBar activeTab="insights" />
    </div>
  );
}
