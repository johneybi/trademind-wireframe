import type { ReactNode } from "react";

export function InputDeviceFrame({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full text-stone-950">
      <div className="flex h-full w-full flex-col bg-white">
        {children}
      </div>
    </main>
  );
}
