import { InsightsPreview } from "@/components/insights-flow/insights-preview";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export function InsightsScreen() {
  return (
    <PrototypeDeviceFrame>
      <InsightsPreview />
    </PrototypeDeviceFrame>
  );
}
