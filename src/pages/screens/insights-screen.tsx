import { InsightsPreview } from "@/components/insights-flow/insights-preview";
import type { InsightsTabId } from "@/components/insights-flow/types";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export { type InsightsTabId } from "@/components/insights-flow/types";

export function InsightsScreen({
  initialPreviewStateId = "calendar",
}: {
  initialPreviewStateId?: InsightsTabId;
}) {
  return (
    <PrototypeDeviceFrame>
      <InsightsPreview initialTab={initialPreviewStateId} />
    </PrototypeDeviceFrame>
  );
}
