import { cn } from "@/lib/utils";
import { Home, ChatBubble, Activity, Settings } from "iconoir-react";

export type TabMenu = "home" | "chat" | "insights" | "settings";

const menus = [
  { id: "home", label: "홈", Icon: Home },
  { id: "chat", label: "대화하기", Icon: ChatBubble },
  { id: "insights", label: "인사이트", Icon: Activity },
  { id: "settings", label: "설정", Icon: Settings },
] as const;

interface BottomTabBarProps {
  activeTab?: TabMenu;
  onTabChange?: (tab: TabMenu) => void;
}

export function BottomTabBar({ activeTab = "home", onTabChange }: BottomTabBarProps) {
  return (
    <div className="flex h-[68px] items-center justify-between border-t border-stone-200 bg-white px-6 pb-2 pt-2">
      {menus.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange?.(id)}
            className="flex flex-col items-center gap-1.5 px-2"
          >
            <Icon
              className={cn(
                "h-6 w-6 transition-colors",
                isActive ? "text-stone-900" : "text-stone-400"
              )}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-stone-900" : "text-stone-400"
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
