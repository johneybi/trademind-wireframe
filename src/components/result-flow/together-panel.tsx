import { Cell, Pie, PieChart } from "recharts";
import type { ResultScenario } from "./types";

function StatDonut({ stat }: { stat: ResultScenario["stat"] }) {
  const data = [{ value: stat.primaryValue }, { value: stat.secondaryValue }];

  return (
    <div className="space-y-5">
      <div className="relative mx-auto h-[180px] w-[180px]">
        <PieChart width={180} height={180}>
          <Pie
            data={data}
            cx={90}
            cy={90}
            innerRadius={62}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill="#1c1917" />
            <Cell fill="#e7e5e4" />
          </Pie>
        </PieChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[32px] font-semibold leading-none text-stone-950">{stat.primaryValue}%</p>
          <p className="mt-1.5 w-20 text-center text-xs leading-4 text-stone-500">{stat.primaryLabel}</p>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-stone-900" />
            <span className="text-sm font-semibold text-stone-950">{stat.primaryValue}%</span>
          </div>
          <p className="text-xs text-stone-500">{stat.primaryLabel}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-stone-300" />
            <span className="text-sm font-semibold text-stone-700">{stat.secondaryValue}%</span>
          </div>
          <p className="text-xs text-stone-500">{stat.secondaryLabel}</p>
        </div>
      </div>
    </div>
  );
}

export function TogetherPanel({ scenario }: { scenario: ResultScenario }) {
  return (
    <section className="space-y-4 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
      <p className="text-sm font-semibold text-stone-950">TOGETHER 데이터</p>

      <div className="rounded-3xl border border-stone-200 bg-white p-4">
        <StatDonut stat={scenario.stat} />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-stone-950">{scenario.reasonsTitle}</p>
        <div className="space-y-2">
          {scenario.reasons.slice(0, 2).map((reason) => (
            <div key={reason} className="rounded-3xl border border-stone-200 bg-white px-4 py-3">
              <p className="font-serif text-sm leading-6 text-stone-600">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
