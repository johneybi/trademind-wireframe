import { ChatConversationPreview } from "@/components/chat-flow/conversation-preview";
import { chatScenarios } from "@/components/chat-flow/scenarios";
import type { ChatPreviewStateId } from "@/components/chat-flow/types";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export { type ChatPreviewStateId } from "@/components/chat-flow/types";

export function ChatScreen({
  initialPreviewStateId = "pre-question",
}: {
  initialPreviewStateId?: ChatPreviewStateId;
}) {
  const scenario = chatScenarios[initialPreviewStateId] ?? chatScenarios["pre-question"];

  return (
    <PrototypeDeviceFrame>
      <ChatConversationPreview scenario={scenario} />
    </PrototypeDeviceFrame>
  );
}
