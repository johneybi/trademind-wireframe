import { InputDeviceFrame } from "@/components/input-flow/device-frame";
import { InputEntryView } from "@/components/input-flow/entry-view";
import type { ModeOption } from "@/components/input-flow/types";

export function InputEntryScreen({
  onSelectMode,
}: {
  onSelectMode: (mode: ModeOption) => void;
}) {
  return (
    <InputDeviceFrame>
      <InputEntryView onSelectMode={onSelectMode} />
    </InputDeviceFrame>
  );
}
