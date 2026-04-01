import { Layers3, PencilRuler, PieChart } from "lucide-react";

const quickNotes = [
  "Drop your lo-fi layout into simple blocks first.",
  "Use shadcn primitives only where they save time.",
  "Add charts last after the screen structure feels stable.",
];

export function BlankCanvasScreen() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-6 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col gap-6 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Blank canvas</p>
            <h1 className="text-3xl font-semibold tracking-tight">Start your next screen here.</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              This screen is intentionally plain. Replace the blocks below with your actual layout
              and register the file in the screen registry.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
            <PieChart className="h-4 w-4" />
            Recharts is installed
          </div>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Suggested flow</p>
                <p className="text-sm text-slate-500">Build structure before polish.</p>
              </div>
            </div>

            <div className="space-y-3">
              {quickNotes.map((note) => (
                <div key={note} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  {note}
                </div>
              ))}
            </div>
          </aside>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <PencilRuler className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="font-medium">Hero / Summary area</p>
                  <p className="text-sm text-slate-500">Good place for the main hook and top metrics.</p>
                </div>
              </div>
              <div className="mt-6 h-40 rounded-2xl border border-dashed border-slate-300 bg-white" />
            </div>

            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <PieChart className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="font-medium">Chart / Insight area</p>
                  <p className="text-sm text-slate-500">A good slot for donut or radial charts later.</p>
                </div>
              </div>
              <div className="mt-6 h-40 rounded-2xl border border-dashed border-slate-300 bg-white" />
            </div>

            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 md:col-span-2">
              <p className="font-medium">Detail / table / activity area</p>
              <p className="mt-2 text-sm text-slate-500">
                This wide section is useful for lists, timeline items, or system status cards.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="h-28 rounded-2xl border border-dashed border-slate-300 bg-white" />
                <div className="h-28 rounded-2xl border border-dashed border-slate-300 bg-white" />
                <div className="h-28 rounded-2xl border border-dashed border-slate-300 bg-white" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
