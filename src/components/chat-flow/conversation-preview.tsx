import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChatFooter } from "./chat-footer";
import { ChatHeader } from "./chat-header";
import { DistortionBanner } from "./distortion-banner";
import { ChatMessageList } from "./message-list";
import { buildChatViewModel } from "./view-model";
import type { ChatMessage, ChatScenario } from "./types";

export function ChatConversationPreview({ scenario }: { scenario: ChatScenario }) {
  const [activeScenario, setActiveScenario] = useState(scenario);
  const [composerValue, setComposerValue] = useState("");
  const [temporaryMessages, setTemporaryMessages] = useState<ChatMessage[] | null>(null);
  const [isAwaitingReply, setIsAwaitingReply] = useState(activeScenario.stage === "awaiting");
  const replyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveScenario(scenario);
    setComposerValue("");
    setTemporaryMessages(null);
    setIsAwaitingReply(scenario.stage === "awaiting");

    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }

    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
        replyTimeoutRef.current = null;
      }
    };
  }, [scenario]);

  const viewModel = buildChatViewModel(activeScenario);
  const displayedMessages = temporaryMessages ?? viewModel.messages;

  const transitionFromQuestion = (replyText?: string) => {
    if (activeScenario.mode === "pre") {
      setActiveScenario({
        ...activeScenario,
        stage: "meta",
        userReply: replyText?.trim() || "조급함 때문에 더 흔들리는 것 같아요.",
      });
      return;
    }

    setActiveScenario({
      ...activeScenario,
      stage: "complete",
      userReply: replyText?.trim() || "근거보다 조급함이 먼저였던 것 같아요.",
      completionMessage: "좋아요. 지금 나눈 내용은 결과 화면에서 한 번 더 정리해볼게요.",
      completionCtaLabel: "결과 보기",
    });
  };

  const handleComposerSubmit = () => {
    const nextValue = composerValue.trim();
    if (viewModel.footer.type !== "composer" || !nextValue || isAwaitingReply) {
      return;
    }

    const typingMessage: ChatMessage = {
      id: `preview-typing-${Date.now()}`,
      role: "typing",
    };

    setTemporaryMessages([
      ...viewModel.messages,
      {
        id: `preview-user-${Date.now()}`,
        role: "user",
        text: nextValue,
      },
      typingMessage,
    ]);
    setComposerValue("");
    setIsAwaitingReply(true);

    replyTimeoutRef.current = window.setTimeout(() => {
      setTemporaryMessages(null);
      setIsAwaitingReply(false);
      transitionFromQuestion(nextValue);
      replyTimeoutRef.current = null;
    }, 1100);
  };

  const handleSecondaryAction = () => {
    if (viewModel.footer.type !== "composer" || isAwaitingReply) {
      return;
    }

    transitionFromQuestion("");
  };

  const handleChoiceSelect = (_choiceId: string, label: string) => {
    setActiveScenario({
      ...activeScenario,
      stage: "complete",
      selectedMetaOption: label,
      completionMessage: "좋아요. 이 내용은 결과 화면에서 이어서 정리할게요.",
      completionCtaLabel: "결과 보기",
    });
  };

  const footer =
    viewModel.footer.type === "composer"
      ? {
          ...viewModel.footer,
          disabled: viewModel.footer.disabled || isAwaitingReply,
          disabledHint:
            viewModel.footer.disabled || isAwaitingReply
              ? viewModel.footer.disabledHint ?? "AI가 답변을 정리하는 동안에는 입력이 잠시 멈춰요."
              : undefined,
        }
      : viewModel.footer;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <ChatHeader mode={viewModel.mode} stage={viewModel.stage} />
      <motion.div
        key={activeScenario.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex min-h-0 flex-1 flex-col"
      >
        {viewModel.stage !== "awaiting" && <DistortionBanner text={viewModel.distortionLabel} />}
        <ChatMessageList messages={displayedMessages} />
        <ChatFooter
          footer={footer}
          composerValue={composerValue}
          onComposerChange={setComposerValue}
          onComposerSubmit={handleComposerSubmit}
          onSecondaryAction={handleSecondaryAction}
          onChoiceSelect={handleChoiceSelect}
        />
      </motion.div>
    </div>
  );
}
