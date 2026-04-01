import { motion } from "motion/react";
import type { ModeOption, StockSelection } from "./types";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="text-sm font-medium text-stone-900">{value}</span>
    </div>
  );
}


export function InputBridgeStep({
  mode,
  stock,
  emotion,
}: {
  mode: ModeOption | null;
  stock: StockSelection | null;
  emotion: string | null;
}) {
  return (
    <motion.section
      key={4}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6 pt-7"
    >
      <div className="shrink-0">
        <h1 className="text-[28px] font-semibold leading-snug tracking-tight text-stone-950">
          이런 내용으로
          <br />
          대화를 시작해요
        </h1>
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
        <div className="space-y-3">
          <SummaryRow
            label="상황"
            value={mode === "post" ? "이미 한 매매가 마음에 걸려요" : "사고 싶거나 팔고 싶어요"}
          />
          {stock ? <SummaryRow label="종목" value={stock.name} /> : null}
          {emotion ? <SummaryRow label="감정" value={emotion} /> : null}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-serif text-[15px] leading-7 text-stone-700">
          AI에게 마음을 들려주시면, 스스로 돌아보실 수 있도록 도와드릴게요.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <p className="text-xs leading-5 text-stone-400">
          AI의 답변은 감정 점검을 위한 대화이며, 투자 조언이 아닙니다. AI는 틀릴 수 있고, 모든 투자
          판단의 책임은 본인에게 있습니다. 입력하신 내용은 AI 응답 생성을 위해 외부 서버로 전송될 수
          있습니다.
        </p>
      </div>
    </motion.section>
  );
}
