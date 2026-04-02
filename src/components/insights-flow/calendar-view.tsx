import { calendarCells, calendarLegend, distortionFrequency, recentRecords } from "./data";

function getCellTone(cell: (typeof calendarCells)[number]) {
  switch (cell) {
    case "pause":
      return "bg-stone-900";
    case "proceed":
      return "bg-stone-400";
    case "review":
      return "bg-stone-200";
    default:
      return "bg-stone-100";
  }
}

function getOutcomeTone(outcome: string) {
  switch (outcome) {
    case "관망":
      return "bg-stone-900 text-white";
    case "진행":
      return "bg-stone-300 text-stone-800";
    default:
      return "bg-stone-100 text-stone-700";
  }
}

export function CalendarView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-stone-200 bg-white p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-950">이번 달 흐름</p>
            <p className="mt-1 text-sm leading-6 text-stone-500">날짜별로 관망, 진행, 기록을 색으로 구분해서 봅니다.</p>
          </div>
          <div className="grid gap-1 text-right">
            <p className="text-2xl font-semibold text-stone-950">12회</p>
            <p className="text-xs text-stone-400">이번 달 기록</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-2">
          {calendarCells.map((cell, index) => (
            <div key={`${cell}-${index}`} className={`aspect-square rounded-xl ${getCellTone(cell)}`} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {calendarLegend.map((item) => (
            <div key={item.label} className="inline-flex items-center gap-2 text-xs text-stone-500">
              <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-stone-950">자주 나타나는 패턴</p>
            <p className="mt-1 text-sm leading-6 text-stone-500">지금 가장 자주 흔들리는 지점을 먼저 봅니다.</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {distortionFrequency.map((item, index) => (
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
        <div>
          <p className="text-sm font-semibold text-stone-950">최근 기록</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">최근 선택을 짧게 다시 확인합니다.</p>
        </div>

        <div className="mt-4 space-y-2">
          {recentRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between gap-3 rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-stone-900">{record.tag}</p>
                <p className="mt-1 text-xs text-stone-500">{record.date}</p>
              </div>
              <div className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getOutcomeTone(record.outcome)}`}>
                {record.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
