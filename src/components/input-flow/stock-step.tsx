import { motion } from "motion/react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StockSelection } from "./types";

export function InputStockStep({
  stockQuery,
  selectedStock,
  filteredStocks,
  onStockQueryChange,
  onSelectStock,
  onClearStock,
}: {
  stockQuery: string;
  selectedStock: StockSelection | null;
  filteredStocks: StockSelection[];
  onStockQueryChange: (value: string) => void;
  onSelectStock: (stock: StockSelection) => void;
  onClearStock: () => void;
}) {
  return (
    <motion.section
      key={1}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="shrink-0 px-5 pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Step 1</p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-stone-950">어떤 종목이 걸리나요?</h1>
        <p className="mt-2 font-serif text-sm leading-6 text-stone-500">종목명을 입력하거나 선택해 주세요.</p>
      </div>

      <div className="min-h-0 flex-1" />

      <div className="shrink-0 space-y-2 px-5 pb-3">
        {selectedStock ? (
          <div className="rounded-2xl border border-stone-900 bg-white px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-stone-900" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">{selectedStock.name}</p>
                  {selectedStock.source === "preset" ? (
                    <p className="text-xs text-stone-400">
                      {[selectedStock.code, selectedStock.market].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={onClearStock}
                className="text-xs text-stone-400 hover:text-stone-700"
              >
                지우기
              </button>
            </div>
          </div>
        ) : null}

        {stockQuery && !selectedStock ? (
          <div className="max-h-52 overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <button
                  key={stock.code ?? stock.name}
                  type="button"
                  onClick={() => onSelectStock(stock)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-stone-50",
                    index > 0 && "border-t border-stone-100",
                  )}
                >
                  <span className="text-sm font-medium text-stone-900">{stock.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">{stock.code}</span>
                    <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500">
                      {stock.market}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-4">
                <p className="font-serif text-sm leading-6 text-stone-500">
                  목록에 없는 종목이어도 괜찮아요. 지금 적은 이름 그대로 다음으로 이어갈 수 있어요.
                </p>
              </div>
            )}
          </div>
        ) : null}

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:bg-white"
            placeholder="종목명을 입력하거나 선택해 주세요"
            value={stockQuery}
            onChange={(event) => onStockQueryChange(event.target.value)}
          />
        </div>
      </div>
    </motion.section>
  );
}
