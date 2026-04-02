import { useEffect, useRef } from "react";
import { ChatMessageBubble } from "./message-bubble";
import type { ChatMessage } from "./types";

export function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
      <div className="flex min-h-full flex-col justify-end gap-3">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
