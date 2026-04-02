import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatFooterModel } from "./types";

export function ChatFooter({
  footer,
  composerValue = "",
  onComposerChange,
  onComposerSubmit,
  onSecondaryAction,
  onChoiceSelect,
}: {
  footer: ChatFooterModel;
  composerValue?: string;
  onComposerChange?: (value: string) => void;
  onComposerSubmit?: () => void;
  onSecondaryAction?: () => void;
  onChoiceSelect?: (choiceId: string, label: string) => void;
}) {
  if (footer.type === "composer") {
    const isDisabled = footer.disabled;
    const isSubmitDisabled = isDisabled || !composerValue.trim();

    return (
      <footer className="shrink-0 space-y-3 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors",
            isDisabled ? "border-stone-200 bg-stone-100" : "border-stone-200 bg-stone-50",
          )}
        >
          <textarea
            value={composerValue}
            onChange={(event) => onComposerChange?.(event.target.value)}
            placeholder={footer.placeholder}
            rows={1}
            disabled={isDisabled}
            className={cn(
              "field-sizing-content max-h-24 min-h-[22px] min-w-0 flex-1 resize-none bg-transparent text-sm leading-5 outline-hidden placeholder:text-stone-400",
              isDisabled ? "cursor-not-allowed text-stone-400" : "text-stone-800",
            )}
          />

          <button
            type="button"
            onClick={onComposerSubmit}
            disabled={isSubmitDisabled}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
              isSubmitDisabled ? "bg-stone-300 text-white" : "bg-stone-800 text-white",
            )}
            aria-label={footer.submitLabel ?? "보내기"}
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>

        {footer.disabledHint ? <p className="text-center text-xs text-stone-400">{footer.disabledHint}</p> : null}

        {footer.secondaryActionLabel ? (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="w-full text-center text-sm text-stone-400 transition-colors hover:text-stone-600"
          >
            {footer.secondaryActionLabel}
          </button>
        ) : null}
      </footer>
    );
  }

  if (footer.type === "cta") {
    return (
      <footer className="shrink-0 space-y-3 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
          {footer.title ? <p className="text-sm font-semibold text-stone-900">{footer.title}</p> : null}
          {footer.description ? <p className="mt-1 text-xs leading-5 text-stone-500">{footer.description}</p> : null}
        </div>
        <Button type="button" className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95">
          {footer.label}
        </Button>
      </footer>
    );
  }

  return (
    <footer className="shrink-0 space-y-2 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
      {footer.title || footer.description ? (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
          {footer.title ? <p className="text-sm font-semibold text-stone-900">{footer.title}</p> : null}
          {footer.description ? <p className="mt-1 text-xs leading-5 text-stone-500">{footer.description}</p> : null}
        </div>
      ) : null}
      {footer.choices.map((choice) => (
        <Button
          key={choice.id}
          type="button"
          variant="outline"
          onClick={() => onChoiceSelect?.(choice.id, choice.label)}
          className={cn(
            "h-auto w-full rounded-2xl border px-4 py-3.5 text-center text-sm font-semibold",
            choice.highlighted
              ? "border-stone-900 bg-stone-100 text-stone-900 hover:bg-stone-100"
              : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50",
          )}
        >
          {choice.label}
        </Button>
      ))}
    </footer>
  );
}
