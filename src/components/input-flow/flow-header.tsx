import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FLOW_STEPS } from "./constants";
import type { InputStep } from "./types";

function ProgressBar({ step }: { step: InputStep }) {
  const currentIndex = Math.max(0, step - 1);

  return (
    <motion.div layout transition={{ duration: 0.35, ease: "easeInOut" }} className="flex flex-1 items-center gap-1">
      {Array.from({ length: FLOW_STEPS }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-[3px] flex-1 rounded-full transition-colors duration-300",
            index < currentIndex
              ? "bg-stone-900"
              : index === currentIndex
                ? "bg-stone-500"
                : "bg-stone-200",
          )}
        />
      ))}
    </motion.div>
  );
}

export function InputFlowHeader({
  step,
  onBack,
}: {
  step: InputStep;
  onBack: () => void;
}) {
  return (
    <header className="border-b border-stone-100 px-5 pb-4 pt-5">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8 shrink-0 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <ProgressBar step={step} />
        <AnimatePresence>
          {step < 4 ? (
            <motion.div
              key="step-count"
              initial={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <span className="whitespace-nowrap text-xs font-medium text-stone-400">
                {step}/{FLOW_STEPS}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
