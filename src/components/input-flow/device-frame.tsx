import type { ReactNode } from "react";

export function InputDeviceFrame({ children }: { children: ReactNode }) {
  return (
    <main className="h-full bg-stone-100 text-stone-950">
      <div className="mx-auto flex h-full w-full max-w-[390px] flex-col bg-white shadow-[0_0_0_1px_rgba(231,229,228,0.9),0_30px_80px_-40px_rgba(28,25,23,0.4)]">
        {children}
      </div>
    </main>
  );
}
