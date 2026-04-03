import { calendarCells, calendarLegend, distortionFrequency, recentRecords } from "./data";

function getCellTone(cell: (typeof calendarCells)[number]) {
  switch (cell) {
    case "single":
      return "bg-stone-400";
    case "multiple":
      return "bg-stone-900";
    default:
      return "bg-stone-100";
  }
}

function getModeTone(mode: string) {
  return mode === "사전"
    ? "border-stone-200 bg-white text-stone-600"
    : "border-stone-900 bg-stone-900 text-white";
}

export function CalendarView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-stone-200 bg-white p-5">
        <div>
          <p className="text-sm font-semibold text-stone-950">다시 돌아본 날</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">마음이 걸려 다시 들여다본 날을 모아 봅니다.</p>
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
            <p className="text-sm font-semibold text-stone-950">자주 걸리는 생각</p>
            <p className="mt-1 text-sm leading-6 text-stone-500">
              비슷한 순간마다 어떤 생각이 반복됐는지 봅니다.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {distortionFrequency.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className={index === 0 ? "font-medium text-stone-950" : "text-stone-500"}>{item.label}</span>
                <span className={index === 0 ? "font-semibold text-stone-950" : "font-medium text-stone-500"}>
                  {item.value}%
                </span>
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
          <p className="text-sm font-semibold text-stone-950">마음이 남았던 순간들</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">
            그날 어떤 마음이 올라왔는지 다시 봅니다.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {recentRecords.map((record) => (
            <div key={record.id} className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getModeTone(record.mode)}`}>
                      {record.mode}
                    </span>
                    <span className="text-xs text-stone-400">{record.date}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-stone-950">{record.emotion}</p>
                  <p className="mt-1 text-xs text-stone-500">{record.distortion}</p>
                </div>
              </div>
              <p className="mt-3 font-serif text-sm leading-6 text-stone-600">{record.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
