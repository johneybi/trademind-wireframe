import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { BottomTabBar } from "@/components/bottom-tab-bar";
import { cn } from "@/lib/utils";
import { modeOptions } from "./constants";
import type { ModeOption } from "./types";

export function InputEntryView({
  onSelectMode,
}: {
  onSelectMode: (mode: ModeOption) => void;
}) {
  return (
    <>
      <header className="border-b border-stone-100 px-5 pb-4 pt-5">
        <div className="flex h-8 items-center justify-center">
          <span className="text-sm font-semibold tracking-widest text-stone-400">TRADEMIND</span>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-1 flex-col px-5 pb-6 pt-8"
      >
        <div className="flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-stone-100">
            <BrainCircuit className="h-14 w-14 text-stone-500" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">
            지금 어떤 이야기를
            <br />
            하고 싶으세요?
          </h1>
          <p className="mt-3 font-serif text-sm leading-6 text-stone-500">
            종목 추천이 아니라, 지금 그 판단이
            <br />
            감정에서 온 건지 확인해보려는 흐름이에요.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {modeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectMode(option.value)}
              className={cn(
                "w-full rounded-2xl border px-5 py-5 text-left transition-colors",
                option.value === "pre"
                  ? "border-stone-900 bg-stone-800 text-white"
                  : "border-stone-300 bg-stone-400 text-white",
              )}
            >
              <p className="text-base font-semibold">{option.label}</p>
              <p className="mt-1 text-sm text-white/70">{option.hint}</p>
            </button>
          ))}
        </div>
      </motion.section>

      <BottomTabBar activeTab="chat" />
    </>
  );
}
