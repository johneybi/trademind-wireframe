import type { ResultScenario } from "./types";

export function ResultHeader({ scenario }: { scenario: ResultScenario }) {
  return (
    <header className="space-y-4 border-b border-stone-200 px-5 pb-5 pt-6">
      <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
        {scenario.badgeLabel}
      </div>

      <div className="space-y-2">
        <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">{scenario.title}</h1>
        <p className="max-w-[28rem] text-sm leading-6 text-stone-500">{scenario.description}</p>
      </div>
    </header>
  );
}
