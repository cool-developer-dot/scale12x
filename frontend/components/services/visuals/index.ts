import GrowthStrategyVisual from "./GrowthStrategyVisual";
import AIAutomationVisual from "./AIAutomationVisual";
import TechnologyVisual from "./TechnologyVisual";
import CloudComputingVisual from "./CloudComputingVisual";
import CybersecurityVisual from "./CybersecurityVisual";
import WebDigitalVisual from "./WebDigitalVisual";
import SearchVisual from "./SearchVisual";

export {
  GrowthStrategyVisual,
  AIAutomationVisual,
  TechnologyVisual,
  CloudComputingVisual,
  CybersecurityVisual,
  WebDigitalVisual,
  SearchVisual,
};

export const SERVICE_VISUALS = {
  growth: GrowthStrategyVisual,
  ai: AIAutomationVisual,
  technology: TechnologyVisual,
  cloud: CloudComputingVisual,
  cyber: CybersecurityVisual,
  web: WebDigitalVisual,
  search: SearchVisual,
} as const;
