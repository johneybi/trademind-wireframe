import { useState } from "react";
import { STOCKS, emotionOptions } from "@/components/input-flow/constants";
import type {
  InputPreviewStateId,
  InputStep,
  ModeOption,
  StockSelection,
} from "@/components/input-flow/types";
import { InputEntryScreen } from "@/pages/screens/input-entry-screen";
import { InputFlowScreen } from "@/pages/screens/input-flow-screen";

type InputFlowSnapshot = {
  step: InputStep;
  mode: ModeOption | null;
  stockQuery: string;
  selectedStock: StockSelection | null;
  emotion: string | null;
  detail: string;
};

const defaultEmotion = emotionOptions[0] ?? null;
const defaultStock = STOCKS[0] ?? null;

const inputPreviewSnapshots: Record<InputPreviewStateId, InputFlowSnapshot> = {
  entry: {
    step: 0,
    mode: null,
    stockQuery: "",
    selectedStock: null,
    emotion: null,
    detail: "",
  },
  stock: {
    step: 1,
    mode: "pre",
    stockQuery: "",
    selectedStock: null,
    emotion: null,
    detail: "",
  },
  emotion: {
    step: 2,
    mode: "pre",
    stockQuery: "",
    selectedStock: defaultStock,
    emotion: null,
    detail: "",
  },
  detail: {
    step: 3,
    mode: "pre",
    stockQuery: "",
    selectedStock: defaultStock,
    emotion: defaultEmotion,
    detail: "",
  },
  bridge: {
    step: 4,
    mode: "pre",
    stockQuery: "",
    selectedStock: defaultStock,
    emotion: defaultEmotion,
    detail: "실적 발표를 앞두고 지금 들어가도 될지 조금 더 마음이 흔들려요.",
  },
};

function getInitialSnapshot(previewStateId?: InputPreviewStateId): InputFlowSnapshot {
  if (!previewStateId) {
    return inputPreviewSnapshots.entry;
  }

  return inputPreviewSnapshots[previewStateId] ?? inputPreviewSnapshots.entry;
}

export function InputScreen({ initialPreviewStateId }: { initialPreviewStateId?: InputPreviewStateId }) {
  const initialSnapshot = getInitialSnapshot(initialPreviewStateId);
  const [step, setStep] = useState<InputStep>(initialSnapshot.step);
  const [mode, setMode] = useState<ModeOption | null>(initialSnapshot.mode);
  const [stockQuery, setStockQuery] = useState(initialSnapshot.stockQuery);
  const [selectedStock, setSelectedStock] = useState<StockSelection | null>(initialSnapshot.selectedStock);
  const [emotion, setEmotion] = useState<string | null>(initialSnapshot.emotion);
  const [detail, setDetail] = useState(initialSnapshot.detail);

  const goBack = () => {
    if (step === 1) {
      setStep(0);
      return;
    }

    if (step > 1) {
      setStep((current) => (current - 1) as Exclude<InputStep, 0>);
    }
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

  if (step === 0) {
    return (
      <InputEntryScreen
        onSelectMode={(nextMode) => {
          setMode(nextMode);
          setStep(1);
        }}
      />
    );
  }

  return (
    <InputFlowScreen
      step={step}
      mode={mode}
      stockQuery={stockQuery}
      selectedStock={selectedStock}
      emotion={emotion}
      detail={detail}
      onBack={goBack}
      onPrimaryAction={goNext}
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
      onSelectEmotion={setEmotion}
      onDetailChange={setDetail}
    />
  );
}
