import type { ComponentType } from "react";
import type { CapabilityVisualKey } from "../data";
import type { CapabilityVisualProps } from "./types";
import GrowthStrategyVisual from "./GrowthStrategyVisual";
import AIAutomationVisual from "./AIAutomationVisual";
import TechnologyVisual from "./TechnologyVisual";
import BrandCreativeVisual from "./BrandCreativeVisual";
import PaidMediaVisual from "./PaidMediaVisual";
import WebDigitalVisual from "./WebDigitalVisual";

export type { CapabilityVisualProps } from "./types";

export {
  GrowthStrategyVisual,
  AIAutomationVisual,
  TechnologyVisual,
  BrandCreativeVisual,
  PaidMediaVisual,
  WebDigitalVisual,
};

export const CAPABILITY_VISUALS: Record<
  CapabilityVisualKey,
  ComponentType<CapabilityVisualProps>
> = {
  growth: GrowthStrategyVisual,
  ai: AIAutomationVisual,
  technology: TechnologyVisual,
  brand: BrandCreativeVisual,
  paid: PaidMediaVisual,
  web: WebDigitalVisual,
};
