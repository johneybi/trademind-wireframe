import { ResultActions } from "./result-actions";
import { ResultHeader } from "./result-header";
import { ResultSummaryCard } from "./result-summary-card";
import { TogetherPanel } from "./together-panel";
import type { ResultScenario } from "./types";

export function ResultPreview({ scenario }: { scenario: ResultScenario }) {
  return (
    <div className="flex h-full flex-col bg-white text-stone-950">
      <ResultHeader scenario={scenario} />

      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-100 px-4 py-4">
        <div className="space-y-4">
          <ResultSummaryCard scenario={scenario} />
          <TogetherPanel scenario={scenario} />
        </div>
      </div>

      <ResultActions scenario={scenario} />
    </div>
  );
}
