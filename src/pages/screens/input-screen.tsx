import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { STOCKS } from "@/components/input-flow/constants";
import { InputBridgeStep } from "@/components/input-flow/bridge-step";
import { InputDetailStep } from "@/components/input-flow/detail-step";
import { InputDeviceFrame } from "@/components/input-flow/device-frame";
import { InputEntryView } from "@/components/input-flow/entry-view";
import { InputEmotionStep } from "@/components/input-flow/emotion-step";
import { InputFlowFooter } from "@/components/input-flow/flow-footer";
import { InputFlowHeader } from "@/components/input-flow/flow-header";
import { InputStockStep } from "@/components/input-flow/stock-step";
import type { InputStep, ModeOption, StockSelection } from "@/components/input-flow/types";

export function InputScreen() {
  const [step, setStep] = useState<InputStep>(0);
  const [mode, setMode] = useState<ModeOption | null>(null);
  const [stockQuery, setStockQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockSelection | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

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

  const goBack = () => {
    if (step === 0) return;
    if (step === 1) {
      setStep(0);
      return;
    }

    setStep((current) => (current - 1) as InputStep);
  };

  const goNext = () => {
    if (step === 1) {
      if (!selectedStock && stockQuery.trim()) {
        setSelectedStock({
          name: stockQuery.trim(),
          source: "manual",
        });
      }

      setStep(2);
      return;
    }

    if (step === 2 && emotion) {
      setStep(3);
      return;
    }

    if (step === 3 && detail.trim()) {
      setStep(4);
    }
  };

  return (
    <InputDeviceFrame>
      {step === 0 ? (
        <InputEntryView
          onSelectMode={(nextMode) => {
            setMode(nextMode);
            setStep(1);
          }}
        />
      ) : (
        <>
          {step < 4 ? <InputFlowHeader step={step} onBack={goBack} /> : <div className="h-16 shrink-0" />}

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <InputStockStep
                  stockQuery={stockQuery}
                  selectedStock={selectedStock}
                  filteredStocks={filteredStocks}
                  onStockQueryChange={(value) => {
                    setStockQuery(value);
                    if (selectedStock) {
                      setSelectedStock(null);
                    }
                  }}
                  onSelectStock={(stock) => {
                    setSelectedStock(stock);
                    setStockQuery("");
                  }}
                  onClearStock={() => setSelectedStock(null)}
                />
              ) : null}

              {step === 2 ? <InputEmotionStep emotion={emotion} onSelectEmotion={setEmotion} /> : null}

              {step === 3 ? (
                <InputDetailStep
                  emotion={emotion}
                  mode={mode}
                  detail={detail}
                  onDetailChange={setDetail}
                />
              ) : null}

              {step === 4 ? <InputBridgeStep mode={mode} /> : null}
            </AnimatePresence>
          </div>

          <InputFlowFooter
            step={step}
            primaryLabel={primaryLabel}
            disabled={isPrimaryDisabled}
            onPrimaryAction={goNext}
          />
        </>
      )}
    </InputDeviceFrame>
  );
}
