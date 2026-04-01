import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { InputStep } from "./types";

export function InputFlowStepLayout({
  step,
  title,
  description,
  children,
}: {
  step: InputStep;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="shrink-0 px-5 pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Step {step}</p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-stone-950">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-[31ch] font-serif text-sm leading-6 text-stone-500">{description}</p>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-5">{children}</div>
    </motion.section>
  );
}
