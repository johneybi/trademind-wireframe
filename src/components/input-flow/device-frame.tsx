import type { ReactNode } from "react";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export function InputDeviceFrame({ children }: { children: ReactNode }) {
  return <PrototypeDeviceFrame>{children}</PrototypeDeviceFrame>;
}
