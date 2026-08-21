import type { ComponentType } from "react";
import type { CapabilityVisualKey } from "../data";
import type { CapabilityVisualProps } from "./types";
import GrowthStrategyVisual from "./GrowthStrategyVisual";
import AIAutomationVisual from "./AIAutomationVisual";
import TechnologyVisual from "./TechnologyVisual";
import CloudComputingVisual from "./CloudComputingVisual";
import CybersecurityVisual from "./CybersecurityVisual";
import WebDigitalVisual from "./WebDigitalVisual";

export type { CapabilityVisualProps } from "./types";

export {
  GrowthStrategyVisual,
  AIAutomationVisual,
  TechnologyVisual,
  CloudComputingVisual,
  CybersecurityVisual,
  WebDigitalVisual,
};

export const CAPABILITY_VISUALS: Record<
  CapabilityVisualKey,
  ComponentType<CapabilityVisualProps>
> = {
  growth: GrowthStrategyVisual,
  ai: AIAutomationVisual,
  technology: TechnologyVisual,
  cloud: CloudComputingVisual,
  cyber: CybersecurityVisual,
  web: WebDigitalVisual,
};
