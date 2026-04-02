import type { ChatMessage } from "./types";

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

function TypingDots() {
  return (
    <div className="flex gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:300ms]" />
    </div>
  );
}

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "typing") {
    return (
      <div className="flex items-end gap-2">
        <AIAvatar />
        <div className="rounded-2xl rounded-bl-md border border-stone-200 bg-white px-4 py-3">
          <TypingDots />
        </div>
      </div>
    );
  }

  if (message.role === "user") {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="max-w-[268px] rounded-2xl rounded-br-md bg-stone-700 px-4 py-3">
          <p className="text-sm leading-6 text-white">{message.text}</p>
        </div>
        <UserAvatar />
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      {message.showAvatar ? <AIAvatar /> : <div className="w-8 shrink-0" />}
      <div className="max-w-[268px] rounded-2xl rounded-bl-md border border-stone-200 bg-white px-4 py-3">
        <p className="font-serif text-sm leading-6 text-stone-800">{message.text}</p>
      </div>
    </div>
  );
}
