import type { ResultScenario } from "./types";

function StatBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-stone-600">{label}</span>
        <span className="font-semibold text-stone-950">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-stone-900" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function TogetherPanel({ scenario }: { scenario: ResultScenario }) {
  return (
    <section className="space-y-4 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-stone-950">TOGETHER 데이터</p>
        <p className="text-sm leading-6 text-stone-500">{scenario.stat.helperText}</p>
      </div>

      <div className="space-y-4 rounded-3xl border border-stone-200 bg-white p-4">
        <StatBar label={scenario.stat.primaryLabel} value={scenario.stat.primaryValue} />
        <StatBar label={scenario.stat.secondaryLabel} value={scenario.stat.secondaryValue} />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-stone-950">{scenario.reasonsTitle}</p>
        <div className="space-y-2">
          {scenario.reasons.map((reason) => (
            <div key={reason} className="rounded-3xl border border-stone-200 bg-white px-4 py-3">
              <p className="font-serif text-sm leading-6 text-stone-600">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
