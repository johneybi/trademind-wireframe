import type { ResultScenario } from "./types";

export function ResultSummaryCard({ scenario }: { scenario: ResultScenario }) {
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white p-5">
      <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
        {scenario.distortionTag}
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-stone-950">{scenario.summaryTitle}</h2>
        <p className="text-sm leading-7 text-stone-600">{scenario.summaryBody}</p>
      </div>
    </section>
  );
}
