import { cn } from "@/lib/utils";
import { emotionDistribution, emotionStories } from "./data";

function FilterChip({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-600",
      )}
    >
      {label}
    </button>
  );
}

export function EmotionBoardView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-stone-200 bg-white p-5">
        <div>
          <p className="text-sm font-semibold text-stone-950">오늘 투자자들의 감정</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">오늘 많이 나타난 패턴을 비율로 봅니다.</p>
        </div>

        <div className="mt-5 space-y-4">
          {emotionDistribution.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className={index === 0 ? "font-medium text-stone-950" : "text-stone-500"}>{item.label}</span>
                <span className={index === 0 ? "font-semibold text-stone-950" : "font-medium text-stone-500"}>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full ${index === 0 ? "bg-stone-900" : index === 1 ? "bg-stone-500" : "bg-stone-300"}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-stone-950">오늘의 이야기</p>
            <p className="mt-1 text-sm leading-6 text-stone-500">나만 그런 게 아니라는 감각을 짧게 확인합니다.</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip label="전체" active />
          <FilterChip label="사전" />
          <FilterChip label="사후" />
        </div>

        <div className="mt-4 space-y-3">
          {emotionStories.map((story) => (
            <div key={story.id} className="rounded-[28px] border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1">{story.mode}</span>
                <span>{story.tag}</span>
              </div>
              <p className="mt-3 font-serif text-sm leading-7 text-stone-700">{story.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
