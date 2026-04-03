import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { InputStep } from "./types";

export function InputFlowFooter({
  step,
  primaryLabel,
  disabled,
  onPrimaryAction,
}: {
  step: InputStep;
  primaryLabel: string;
  disabled: boolean;
  onPrimaryAction: () => void;
}) {
  return (
    <footer className="shrink-0 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
      {step < 4 ? (
        <>
          <Button
            type="button"
            disabled={disabled}
            onClick={onPrimaryAction}
            className={cn(
              "h-14 w-full rounded-2xl text-base font-semibold",
              disabled ? "bg-stone-300 text-white hover:bg-stone-300" : "bg-stone-800 text-white hover:bg-stone-800/95",
            )}
          >
            {primaryLabel}
          </Button>
          {step === 1 ? (
            <Button
              type="button"
              variant="link"
              onClick={onPrimaryAction}
              className="mt-3 h-auto w-full p-0 text-center text-sm text-stone-400 no-underline hover:text-stone-600"
            >
              종목 없이 건너갈게요
            </Button>
          ) : null}
        </>
      ) : (
        <Button
          type="button"
          className="h-14 w-full rounded-2xl bg-stone-800 text-base font-semibold text-white hover:bg-stone-800/95"
        >
          {primaryLabel}
        </Button>
      )}
    </footer>
  );
}
