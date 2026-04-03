import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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
        <p className="text-xs font-semibold text-stone-400">Step 1</p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-stone-950">
          어떤 종목이 마음에 걸리세요?
        </h1>
        <p className="mt-2 font-serif text-sm leading-6 text-stone-500">
          종목명을 입력하거나 목록에서 선택해 주세요.
        </p>
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
              <Button
                type="button"
                variant="link"
                onClick={onClearStock}
                className="h-auto p-0 text-xs text-stone-400 no-underline hover:text-stone-700"
              >
                지우기
              </Button>
            </div>
          </div>
        ) : null}

        <Command shouldFilter={false} className={cn("rounded-none bg-transparent text-stone-950")}>
          <div className="rounded-2xl border border-stone-200 bg-stone-50">
            <CommandInput
              value={stockQuery}
              onValueChange={onStockQueryChange}
              placeholder="종목명을 입력하거나 선택해 주세요"
              wrapperClassName="rounded-2xl border-0 px-4"
              className="h-12 bg-transparent py-0 text-sm text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {stockQuery && !selectedStock ? (
            <div className="mt-2 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <CommandList className="max-h-52">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock, index) => (
                    <CommandItem
                      key={stock.code ?? stock.name}
                      value={`${stock.name} ${stock.code ?? ""} ${stock.market ?? ""}`}
                      onSelect={() => onSelectStock(stock)}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-none px-4 py-3.5 text-left data-[selected=true]:bg-stone-50 data-[selected=true]:text-stone-900",
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
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty className="px-4 py-4 text-left font-serif text-sm leading-6 text-stone-500">
                    목록에 없는 종목이어도 괜찮아요. 지금 적은 이름 그대로 다음으로 이어갈 수 있어요.
                  </CommandEmpty>
                )}
              </CommandList>
            </div>
          ) : null}
        </Command>
      </div>
    </motion.section>
  );
}
