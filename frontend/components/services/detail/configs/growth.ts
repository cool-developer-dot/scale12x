import type { ServiceConfig } from "../types";

export const GROWTH_SERVICE: ServiceConfig = {
  slug: "growth-strategy",
  index: "01",
  eyebrow: "01 / GROWTH STRATEGY",
  serviceName: "Growth Strategy",
  headline: {
    soft: ["Turn ambition into", "a "],
    accent: ["growth system."],
  },
  description:
    "Positioning, channels, and priorities that compound, for US B2B teams tired of juggling five agencies to grow.",
  primaryCta: { label: "Build Your Growth Strategy", href: "/contact" },
  metadata: ["POSITIONING", "GTM", "FUNNELS", "GROWTH"],
  seoTitle: "Growth Strategy: Scale12x",
  seoDescription:
    "Positioning, channels, and priorities that compound. One partner for strategy that ships.",
  visual: {
    inputLabel: "Scattered Signals",
    outputLabel: "Focused Direction",
    coreLabel: "STRATEGY LAYER",
    coreTitle: "STRATEGY CORE",
    variant: "growth",
    accentMode: "cobalt",
    inputs: [
      { id: "market", title: "Market Signals", subtitle: "Demand & trends", icon: "signal" },
      { id: "customers", title: "Customer Insights", subtitle: "Jobs & friction", icon: "users" },
      { id: "revenue", title: "Revenue Goals", subtitle: "Targets & pace", icon: "target" },
      { id: "competitors", title: "Competitors", subtitle: "Whitespace", icon: "competitors" },
      { id: "funnel", title: "Funnel Data", subtitle: "Leakage points", icon: "funnel" },
      { id: "constraints", title: "Growth Constraints", subtitle: "Capacity & risk", icon: "constraint" },
    ],
    outputs: [
      { id: "positioning", title: "Clear Positioning", subtitle: "Market stance", icon: "position" },
      { id: "gtm", title: "GTM Direction", subtitle: "Where to play", icon: "roadmap" },
      { id: "priorities", title: "Growth Priorities", subtitle: "Highest leverage", icon: "target" },
      { id: "funnel-strategy", title: "Funnel Strategy", subtitle: "Conversion path", icon: "funnel" },
      { id: "measurement", title: "Measurement Plan", subtitle: "North-star metrics", icon: "measure" },
      { id: "execution", title: "Execution Roadmap", subtitle: "Sequenced moves", icon: "roadmap" },
    ],
    stages: [
      { id: "analyze", label: "Analyze" },
      { id: "prioritize", label: "Prioritize" },
      { id: "position", label: "Position" },
      { id: "model", label: "Model" },
      { id: "plan", label: "Plan" },
    ],
    pairings: [
      { inputId: "market", outputId: "positioning" },
      { inputId: "customers", outputId: "gtm" },
      { inputId: "revenue", outputId: "priorities" },
      { inputId: "competitors", outputId: "funnel-strategy" },
      { inputId: "funnel", outputId: "measurement" },
      { inputId: "constraints", outputId: "execution" },
    ],
    mobileInputIds: ["market", "revenue", "constraints"],
    mobileOutputIds: ["positioning", "priorities", "execution"],
  },
};
