import { AnimatePresence } from "motion/react";
import { STOCKS } from "@/components/input-flow/constants";
import { InputBridgeStep } from "@/components/input-flow/bridge-step";
import { InputDetailStep } from "@/components/input-flow/detail-step";
import { InputDeviceFrame } from "@/components/input-flow/device-frame";
import { InputEmotionStep } from "@/components/input-flow/emotion-step";
import { InputFlowFooter } from "@/components/input-flow/flow-footer";
import { InputFlowHeader } from "@/components/input-flow/flow-header";
import { InputStockStep } from "@/components/input-flow/stock-step";
import type { InputStep, ModeOption, StockSelection } from "@/components/input-flow/types";

export function InputFlowScreen({
  step,
  mode,
  stockQuery,
  selectedStock,
  emotion,
  detail,
  onBack,
  onPrimaryAction,
  onStockQueryChange,
  onSelectStock,
  onClearStock,
  onSelectEmotion,
  onDetailChange,
}: {
  step: Exclude<InputStep, 0>;
  mode: ModeOption | null;
  stockQuery: string;
  selectedStock: StockSelection | null;
  emotion: string | null;
  detail: string;
  onBack: () => void;
  onPrimaryAction: () => void;
  onStockQueryChange: (value: string) => void;
  onSelectStock: (stock: StockSelection) => void;
  onClearStock: () => void;
  onSelectEmotion: (value: string) => void;
  onDetailChange: (value: string) => void;
}) {
  const filteredStocks = STOCKS.filter(
    (stock) =>
      stock.name.toLowerCase().includes(stockQuery.toLowerCase()) ||
      stock.code?.toLowerCase().includes(stockQuery.toLowerCase()),
  );

  const primaryLabel = step === 4 ? "대화 시작하기" : "다음";
  const isPrimaryDisabled =
    (step === 1 && !selectedStock && !stockQuery.trim()) ||
    (step === 2 && !emotion) ||
    (step === 3 && !detail.trim());

  return (
    <InputDeviceFrame>
      <InputFlowHeader step={step} onBack={onBack} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <InputStockStep
              stockQuery={stockQuery}
              selectedStock={selectedStock}
              filteredStocks={filteredStocks}
              onStockQueryChange={onStockQueryChange}
              onSelectStock={onSelectStock}
              onClearStock={onClearStock}
            />
          ) : null}

          {step === 2 ? <InputEmotionStep emotion={emotion} onSelectEmotion={onSelectEmotion} /> : null}

          {step === 3 ? (
            <InputDetailStep
              emotion={emotion}
              mode={mode}
              detail={detail}
              onDetailChange={onDetailChange}
            />
          ) : null}

          {step === 4 ? <InputBridgeStep mode={mode} stock={selectedStock} emotion={emotion} /> : null}
        </AnimatePresence>
      </div>

      <InputFlowFooter
        step={step}
        primaryLabel={primaryLabel}
        disabled={isPrimaryDisabled}
        onPrimaryAction={onPrimaryAction}
      />
    </InputDeviceFrame>
  );
}
