import { useState } from "react";
import { BottomTabBar } from "@/components/bottom-tab-bar";
import { CalendarView } from "./calendar-view";
import { EmotionBoardView } from "./emotion-board-view";
import { InsightsHeader } from "./insights-header";
import type { InsightsTabId } from "./types";

export function InsightsPreview({
  initialTab = "calendar",
}: {
  initialTab?: InsightsTabId;
}) {
  const [activeTab, setActiveTab] = useState<InsightsTabId>(initialTab);

  return (
    <div className="flex h-full flex-col bg-white text-stone-950">
      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-100">
        <InsightsHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="px-4 pb-4 pt-3">
          {activeTab === "calendar" ? <CalendarView /> : <EmotionBoardView />}
        </div>
      </div>
      <BottomTabBar activeTab="insights" />
    </div>
  );
}
