import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BottomTabBar } from "@/components/bottom-tab-bar";

export type ChatPreviewStateId = "typing" | "exploratory" | "required" | "decision";

// ─── Avatars ────────────────────────────────────────────────────────────────

function AIAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[10px] font-semibold text-white">
      AI
    </div>
  );
}

function UserAvatar() {
  return <div className="h-8 w-8 shrink-0 rounded-full bg-stone-300" />;
}

// ─── Message bubbles ─────────────────────────────────────────────────────────

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex items-end justify-end gap-2">
      <div className="max-w-[258px] rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-stone-600 px-4 py-3">
        <p className="text-sm leading-relaxed text-white">{text}</p>
      </div>
      <UserAvatar />
    </div>
  );
}

function AIMessage({ text, showAvatar = false }: { text: string; showAvatar?: boolean }) {
  return (
    <div className="flex items-end gap-2">
      {showAvatar ? <AIAvatar /> : <div className="w-8 shrink-0" />}
      <div className="max-w-[258px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl border border-stone-200 bg-white px-4 py-3">
        <p className="text-sm leading-relaxed text-stone-800">{text}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <AIAvatar />
      <div className="rounded-br-2xl rounded-tl-2xl rounded-tr-2xl border border-stone-200 bg-white px-4 py-3">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Layout pieces ───────────────────────────────────────────────────────────

function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="shrink-0 border-b border-stone-100 bg-white px-4 py-3">
      <button
        type="button"
        onClick={onBack}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
    </header>
  );
}

function DistortionTag({ text }: { text: string }) {
  return (
    <div className="shrink-0 border-b border-stone-100 bg-white px-5 py-3">
      <div className="flex items-center justify-center rounded-xl bg-stone-100 px-4 py-3">
        <p className="text-sm font-semibold text-stone-800">{text}</p>
      </div>
    </div>
  );
}

// ─── Footer variants ─────────────────────────────────────────────────────────

function TextInputFooter({ skippable }: { skippable: boolean }) {
  return (
    <footer className="shrink-0 space-y-3 border-t border-stone-100 bg-white px-5 pb-5 pt-4">
      <div className="flex h-12 items-center rounded-2xl border border-stone-200 bg-stone-50 px-4">
        <p className="text-sm text-stone-400">직접 입력해 주세요.</p>
      </div>
      <button
        type="button"
        className={cn(
          "h-14 w-full rounded-2xl text-base font-semibold text-white",
          skippable ? "bg-stone-800" : "bg-stone-300",
        )}
      >
        {skippable ? "건너뛰기" : "다음"}
      </button>
    </footer>
  );
}

function ChoiceFooter({
  choices,
}: {
  choices: { label: string; highlighted?: boolean }[];
}) {
  return (
    <footer className="shrink-0 space-y-2 border-t border-stone-100 bg-white px-5 pb-5 pt-4">
      {choices.map((choice) => (
        <button
          key={choice.label}
          type="button"
          className={cn(
            "w-full rounded-2xl border px-4 py-3.5 text-center text-sm font-semibold",
            choice.highlighted
              ? "border-stone-900 bg-stone-100 text-stone-900"
              : "border-stone-200 bg-white text-stone-700",
          )}
        >
          {choice.label}
        </button>
      ))}
    </footer>
  );
}

// ─── Conversation snapshots ──────────────────────────────────────────────────

const MSG = {
  user1: "삼성전자 3일 연속 빠지는데 더 떨어지기 전에 팔아야 할 것 같아요.",
  aiEmpathy: "3일 연속 하락이라니, 파란 숫자를 보는 것만으로도 마음이 많이 무거우시겠어요.",
  aiQuestion1:
    "잠시 숨을 고르고 떠올려 볼까요? 처음 이 종목을 매수했을 때 세웠던 실적이나 배당, 혹은 장기 보유 계획 같은 근거들이 오늘도 여전히 유효한가요?",
  user2: "잘 모르겠어요. 그냥 파란 불이라서 무서워요. 이러다 원금 다 까먹을까 봐 아무 생각도 안 들어요.",
  aiObjective:
    "지금은 이성적인 판단보다 감정이 앞서기 쉬운 상황이에요. 스스로의 마음을 객관적으로 바라보는 연습이 필요합니다.",
  aiQuestion2: "지금 매도를 고민하시는 진짜 이유는 무엇인가요?",
  userChoice: "그냥 숫자가 깎이는게 너무 불안해서에요.",
  aiTogether1: "솔직하게 답해주셔서 감사해요. 내 마음을 인정하는 것만으로도 큰 시작이에요.",
  aiTogether2: "사실 비슷한 상황인 투자자 78%는 일단 '지켜보기'를 선택했어요.",
  aiFinal: "통계와 내 마음을 모두 고려했을 때, 지금 어떤 결정을 내리고 싶으신가요?",
};

const DISTORTION_TAG = "⚡ 지금 아니면 안 된다는 생각 주의해요!";

// ─── Screen states ───────────────────────────────────────────────────────────

function TypingState() {
  return (
    <>
      <DistortionTag text={DISTORTION_TAG} />
      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 overflow-y-auto px-5 py-5">
        <TypingIndicator />
        <UserMessage text={MSG.user1} />
      </div>
      <TextInputFooter skippable={false} />
    </>
  );
}

function ExploratoryState() {
  return (
    <>
      <DistortionTag text={DISTORTION_TAG} />
      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 overflow-y-auto px-5 py-5">
        <AIMessage text={MSG.aiQuestion1} showAvatar />
        <AIMessage text={MSG.aiEmpathy} />
        <UserMessage text={MSG.user1} />
      </div>
      <TextInputFooter skippable />
    </>
  );
}

function RequiredState() {
  return (
    <>
      <DistortionTag text={DISTORTION_TAG} />
      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 overflow-y-auto px-5 py-5">
        <AIMessage text={MSG.aiQuestion2} showAvatar />
        <AIMessage text={MSG.aiObjective} />
        <UserMessage text={MSG.user2} />
        <AIMessage text={MSG.aiQuestion1} showAvatar />
        <AIMessage text={MSG.aiEmpathy} />
        <UserMessage text={MSG.user1} />
      </div>
      <ChoiceFooter
        choices={[
          { label: "기업의 가치가 실제로 떨어졌기 때문이에요." },
          { label: "그냥 숫자가 깎이는게 너무 불안해서예요.", highlighted: true },
        ]}
      />
    </>
  );
}

function DecisionState() {
  return (
    <>
      <DistortionTag text={DISTORTION_TAG} />
      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 overflow-y-auto px-5 py-5">
        <AIMessage text={MSG.aiFinal} showAvatar />
        <AIMessage text={MSG.aiTogether2} />
        <AIMessage text={MSG.aiTogether1} />
        <UserMessage text={MSG.userChoice} />
        <AIMessage text={MSG.aiQuestion2} showAvatar />
        <AIMessage text={MSG.aiObjective} />
        <UserMessage text={MSG.user2} />
        <AIMessage text={MSG.aiQuestion1} showAvatar />
        <AIMessage text={MSG.aiEmpathy} />
        <UserMessage text={MSG.user1} />
      </div>
      <ChoiceFooter
        choices={[
          { label: "조금 더 차분히 지켜볼게요.", highlighted: true },
          { label: "불안이 너무 크니 지금 팔게요." },
        ]}
      />
    </>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

const stateMap: Record<ChatPreviewStateId, () => React.ReactNode> = {
  typing: () => <TypingState />,
  exploratory: () => <ExploratoryState />,
  required: () => <RequiredState />,
  decision: () => <DecisionState />,
};

export function ChatScreen({
  initialPreviewStateId = "exploratory",
}: {
  initialPreviewStateId?: ChatPreviewStateId;
}) {
  const content = stateMap[initialPreviewStateId]?.() ?? stateMap.exploratory();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <ChatHeader />
      <motion.div
        key={initialPreviewStateId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex min-h-0 flex-1 flex-col"
      >
        {content}
      </motion.div>
      <BottomTabBar activeTab="chat" />
    </div>
  );
}
