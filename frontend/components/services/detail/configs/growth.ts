import type { ServiceConfig } from "../types";

export const GROWTH_SERVICE: ServiceConfig = {
  slug: "growth-strategy",
  index: "01",
  eyebrow: "01 / GROWTH STRATEGY",
  serviceName: "Growth strategy",
  headline: {
    soft: ["Turn ambition into", "a "],
    accent: ["growth system."],
  },
  description:
    "Positioning, channels, and priorities that compound, for founders and revenue leaders tired of juggling five agencies to grow.",
  primaryCta: { label: "Build your growth strategy", href: "/contact" },
  metadata: ["POSITIONING", "GTM", "FUNNELS", "GROWTH"],
  seoTitle: "Growth strategy: Scale 12x",
  seoDescription:
    "Positioning, channels, and priorities that compound. One partner for strategy that ships.",
  visual: {
    inputLabel: "Scattered signals",
    outputLabel: "Focused direction",
    coreLabel: "STRATEGY LAYER",
    coreTitle: "STRATEGY CORE",
    variant: "growth",
    accentMode: "cobalt",
    inputs: [
      { id: "market", title: "Market signals", subtitle: "Demand & trends", icon: "signal" },
      { id: "customers", title: "Customer insights", subtitle: "Jobs & friction", icon: "users" },
      { id: "revenue", title: "Revenue goals", subtitle: "Targets & pace", icon: "target" },
      { id: "competitors", title: "Competitors", subtitle: "Whitespace", icon: "competitors" },
      { id: "funnel", title: "Funnel data", subtitle: "Leakage points", icon: "funnel" },
      { id: "constraints", title: "Growth constraints", subtitle: "Capacity & risk", icon: "constraint" },
    ],
    outputs: [
      { id: "positioning", title: "Clear positioning", subtitle: "Market stance", icon: "position" },
      { id: "gtm", title: "GTM direction", subtitle: "Where to play", icon: "roadmap" },
      { id: "priorities", title: "Growth priorities", subtitle: "Highest leverage", icon: "target" },
      { id: "funnel-strategy", title: "Funnel strategy", subtitle: "Conversion path", icon: "funnel" },
      { id: "measurement", title: "Measurement plan", subtitle: "North-star metrics", icon: "measure" },
      { id: "execution", title: "Execution roadmap", subtitle: "Sequenced moves", icon: "roadmap" },
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
