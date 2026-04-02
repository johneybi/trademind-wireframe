import { Button } from "@/components/ui/button";
import type { ResultDecision, ResultScenario } from "./types";

export function ResultActions({
  scenario,
  selectedDecision,
  didConfirmPostAction = false,
  onSelectDecision,
  onConfirmPostAction,
  onResetState,
}: {
  scenario: ResultScenario;
  selectedDecision?: ResultDecision | null;
  didConfirmPostAction?: boolean;
  onSelectDecision?: (decision: ResultDecision) => void;
  onConfirmPostAction?: () => void;
  onResetState?: () => void;
}) {
  const isPreMode = scenario.mode === "pre";
  const decisionFeedback = selectedDecision ? scenario.decisionResponses?.[selectedDecision] : null;
  const postFeedback = didConfirmPostAction ? scenario.postActionResponse : null;

  if (decisionFeedback || postFeedback) {
    const feedback = decisionFeedback ?? postFeedback;

    return (
      <footer className="shrink-0 space-y-3 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
        <div className="rounded-[28px] border border-stone-200 bg-stone-50 px-4 py-4">
          <p className="text-sm font-semibold text-stone-950">{feedback?.title}</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">{feedback?.description}</p>
        </div>
        <Button
          type="button"
          className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95"
          onClick={onResetState}
        >
          {feedback?.actionLabel}
        </Button>
      </footer>
    );
  }

  return (
    <footer className="shrink-0 space-y-2 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
      {scenario.stateNote ? (
        <p className="px-1 text-sm leading-6 text-stone-500">{scenario.stateNote}</p>
      ) : null}
      {isPreMode ? (
        <>
          <Button
            type="button"
            className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95"
            onClick={() => onSelectDecision?.("pause")}
          >
            {scenario.primaryActionLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-2xl border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            onClick={() => onSelectDecision?.("proceed")}
          >
            {scenario.secondaryActionLabel}
          </Button>
        </>
      ) : (
        <Button
          type="button"
          className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95"
          onClick={onConfirmPostAction}
        >
          {scenario.primaryActionLabel}
        </Button>
      )}
    </footer>
  );
}
