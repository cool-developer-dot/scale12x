import GrowthStrategyVisual from "./GrowthStrategyVisual";
import AIAutomationVisual from "./AIAutomationVisual";
import TechnologyVisual from "./TechnologyVisual";
import BrandCreativeVisual from "./BrandCreativeVisual";
import PaidMediaVisual from "./PaidMediaVisual";
import WebDigitalVisual from "./WebDigitalVisual";
import SearchVisual from "./SearchVisual";

export {
  GrowthStrategyVisual,
  AIAutomationVisual,
  TechnologyVisual,
  BrandCreativeVisual,
  PaidMediaVisual,
  WebDigitalVisual,
  SearchVisual,
};

export const SERVICE_VISUALS = {
  growth: GrowthStrategyVisual,
  ai: AIAutomationVisual,
  technology: TechnologyVisual,
  brand: BrandCreativeVisual,
  paid: PaidMediaVisual,
  web: WebDigitalVisual,
  search: SearchVisual,
} as const;
