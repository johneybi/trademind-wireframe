import { useState } from "react";
import { AccountEntrySheet } from "@/components/main-flow/account-entry-sheet";
import { AccountLoginScreen } from "@/components/main-flow/account-login-screen";
import { MainHomeView } from "@/components/main-flow/main-home-view";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export type MainPreviewStateId = "home" | "account-sheet" | "login";

export function MainScreen({
  initialPreviewStateId = "home",
}: {
  initialPreviewStateId?: MainPreviewStateId;
}) {
  const [surface, setSurface] = useState<MainPreviewStateId>(initialPreviewStateId);
  const isAccountSheetOpen = surface === "account-sheet";
  const isLoginScreenOpen = surface === "login";

  return (
    <PrototypeDeviceFrame>
      <div className="relative flex h-full flex-col bg-white text-stone-950">
        <MainHomeView onOpenAccount={() => setSurface("account-sheet")} />

        {isAccountSheetOpen ? (
          <AccountEntrySheet
            onClose={() => setSurface("home")}
            onContinue={() => setSurface("login")}
          />
        ) : null}

        {isLoginScreenOpen ? <AccountLoginScreen onBack={() => setSurface("account-sheet")} /> : null}
      </div>
    </PrototypeDeviceFrame>
  );
}
