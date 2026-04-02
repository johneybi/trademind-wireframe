import type { ResultScenario } from "./types";

export function ResultHeader({ scenario }: { scenario: ResultScenario }) {
  return (
    <header className="space-y-3 border-b border-stone-200 bg-white px-5 pb-4 pt-5">
      <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
        {scenario.badgeLabel}
      </div>
      <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">{scenario.title}</h1>
    </header>
  );
}
