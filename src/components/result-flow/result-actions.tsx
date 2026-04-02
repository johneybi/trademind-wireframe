import { Button } from "@/components/ui/button";
import type { ResultScenario } from "./types";

export function ResultActions({ scenario }: { scenario: ResultScenario }) {
  const isPreMode = scenario.mode === "pre";

  return (
    <footer className="shrink-0 space-y-4 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
      <div className="rounded-[28px] border border-stone-200 bg-stone-50 px-4 py-4">
        <p className="text-sm font-semibold text-stone-950">{scenario.footerTitle}</p>
        <p className="mt-1 text-sm leading-6 text-stone-500">{scenario.footerDescription}</p>
      </div>

      {isPreMode ? (
        <div className="grid gap-2">
          <Button type="button" className="h-12 rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95">
            {scenario.primaryActionLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-2xl border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
          >
            {scenario.secondaryActionLabel}
          </Button>
        </div>
      ) : (
        <Button type="button" className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95">
          {scenario.primaryActionLabel}
        </Button>
      )}
    </footer>
  );
}
