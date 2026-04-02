import { useState } from "react";
import { ResultActions } from "./result-actions";
import { ResultHeader } from "./result-header";
import { ResultSummaryCard } from "./result-summary-card";
import { TogetherPanel } from "./together-panel";
import type { ResultDecision, ResultScenario } from "./types";

export function ResultPreview({ scenario }: { scenario: ResultScenario }) {
  const [selectedDecision, setSelectedDecision] = useState<ResultDecision | null>(null);
  const [didConfirmPostAction, setDidConfirmPostAction] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white text-stone-950">
      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-100">
        <ResultHeader scenario={scenario} />

        <div className="px-4 pb-4 pt-3">
          <div className="space-y-4">
            <ResultSummaryCard scenario={scenario} />
            <TogetherPanel scenario={scenario} />
          </div>
        </div>
      </div>

      <ResultActions
        scenario={scenario}
        selectedDecision={selectedDecision}
        didConfirmPostAction={didConfirmPostAction}
        onSelectDecision={setSelectedDecision}
        onConfirmPostAction={() => setDidConfirmPostAction(true)}
        onResetState={() => {
          setSelectedDecision(null);
          setDidConfirmPostAction(false);
        }}
      />
    </div>
  );
}
