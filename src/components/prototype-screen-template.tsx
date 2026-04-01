type ScreenSection = {
  title: string;
  description: string;
};

type PrototypeScreenTemplateProps = {
  code: string;
  title: string;
  summary: string;
  mode?: string;
  primaryAction?: string;
  sections: ScreenSection[];
  notes: string[];
};

export function PrototypeScreenTemplate({
  code,
  title,
  summary,
  mode,
  primaryAction,
  sections,
  notes,
}: PrototypeScreenTemplateProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-6 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col gap-6 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
              {code}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">{summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {mode ? (
              <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
                {mode}
              </div>
            ) : null}
            {primaryAction ? (
              <div className="rounded-full border border-slate-200 bg-slate-900 px-3 py-1.5 text-sm text-white">
                {primaryAction}
              </div>
            ) : null}
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="grid gap-4">
            {sections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{section.description}</p>
                  </div>
                  <div className="h-16 w-24 rounded-2xl border border-dashed border-slate-300 bg-white" />
                </div>
              </div>
            ))}
          </section>

          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div>
              <p className="text-sm font-medium text-slate-900">구성 메모</p>
              <p className="mt-1 text-sm text-slate-500">기획안 기준의 화면 뼈대입니다.</p>
            </div>

            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  {note}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
