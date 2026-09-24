import type { ServiceConfig } from "../types";

export const WEB_SERVICE: ServiceConfig = {
  slug: "web-digital",
  index: "06",
  eyebrow: "06 / WEB & DIGITAL",
  serviceName: "Web and digital",
  headline: {
    soft: ["Build digital experiences"],
    accent: ["engineered to convert."],
  },
  description:
    "Marketing sites, landing pages, and e-commerce, designed and built to convert, not decorate.",
  primaryCta: { label: "Start your digital project", href: "/contact" },
  metadata: ["UX", "PRODUCT", "DEVELOPMENT", "CONVERSION"],
  seoTitle: "Web and digital: Scale 12x",
  seoDescription:
    "Marketing sites and landing pages engineered to convert. Brand, UX, and development as one system.",
  visual: {
    inputLabel: "Disconnected experience",
    outputLabel: "High-performing experience",
    coreLabel: "EXPERIENCE LAYER",
    coreTitle: "DIGITAL CORE",
    variant: "web",
    accentMode: "cobalt",
    inputs: [
      { id: "needs", title: "User needs", subtitle: "Jobs to be done", icon: "users" },
      { id: "goals", title: "Business goals", subtitle: "Outcomes first", icon: "target" },
      { id: "content", title: "Content", subtitle: "Message & media", icon: "content" },
      { id: "brand-sys", title: "Brand system", subtitle: "Visual rules", icon: "brand" },
      { id: "data-in", title: "Data", subtitle: "Signals & analytics", icon: "data" },
      { id: "integrations", title: "Integrations", subtitle: "Connected stack", icon: "api" },
    ],
    outputs: [
      { id: "ux", title: "UX architecture", subtitle: "Clear journeys", icon: "ux" },
      { id: "ui", title: "Responsive interface", subtitle: "Every screen", icon: "interface" },
      { id: "product", title: "Product experience", subtitle: "Useful & usable", icon: "workflow" },
      { id: "perf", title: "Fast performance", subtitle: "Speed matters", icon: "perf" },
      { id: "connected", title: "Connected systems", subtitle: "Data in flow", icon: "sync" },
      { id: "journey", title: "Conversion journey", subtitle: "Designed to convert", icon: "convert" },
    ],
    stages: [
      { id: "structure", label: "Structure" },
      { id: "design", label: "Design" },
      { id: "build", label: "Build" },
      { id: "connect", label: "Connect" },
      { id: "optimize", label: "Optimize" },
    ],
    pairings: [
      { inputId: "needs", outputId: "ux" },
      { inputId: "goals", outputId: "journey" },
      { inputId: "content", outputId: "ui" },
      { inputId: "brand-sys", outputId: "product" },
      { inputId: "data-in", outputId: "perf" },
      { inputId: "integrations", outputId: "connected" },
    ],
    mobileInputIds: ["needs", "goals", "brand-sys"],
    mobileOutputIds: ["ux", "product", "journey"],
  },
};
