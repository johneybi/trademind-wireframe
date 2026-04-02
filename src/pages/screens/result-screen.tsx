import { ResultPreview } from "@/components/result-flow/result-preview";
import { resultScenarios } from "@/components/result-flow/scenarios";
import type { ResultPreviewStateId } from "@/components/result-flow/types";
import { PrototypeDeviceFrame } from "@/components/prototype-device-frame";

export { type ResultPreviewStateId } from "@/components/result-flow/types";

export function ResultScreen({
  initialPreviewStateId = "pre",
}: {
  initialPreviewStateId?: ResultPreviewStateId;
}) {
  const scenario = resultScenarios[initialPreviewStateId] ?? resultScenarios.pre;

  return (
    <PrototypeDeviceFrame>
      <ResultPreview scenario={scenario} />
    </PrototypeDeviceFrame>
  );
}
