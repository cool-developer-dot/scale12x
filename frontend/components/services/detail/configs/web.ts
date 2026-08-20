import type { ServiceConfig } from "../types";

export const WEB_SERVICE: ServiceConfig = {
  slug: "web-digital",
  index: "06",
  eyebrow: "06 / WEB & DIGITAL",
  serviceName: "Web & Digital",
  headline: {
    soft: ["Build digital experiences"],
    accent: ["engineered to convert."],
  },
  description:
    "Marketing sites, landing pages, and e-commerce, designed and built to convert, not decorate.",
  primaryCta: { label: "Start Your Digital Project", href: "/contact" },
  metadata: ["UX", "PRODUCT", "DEVELOPMENT", "CONVERSION"],
  seoTitle: "Web & Digital: Scale12x",
  seoDescription:
    "Marketing sites and landing pages engineered to convert. Brand, UX, and development as one system.",
  visual: {
    inputLabel: "Disconnected Experience",
    outputLabel: "High-Performing Experience",
    coreLabel: "EXPERIENCE LAYER",
    coreTitle: "DIGITAL CORE",
    variant: "web",
    accentMode: "cobalt",
    inputs: [
      { id: "needs", title: "User Needs", subtitle: "Jobs to be done", icon: "users" },
      { id: "goals", title: "Business Goals", subtitle: "Outcomes first", icon: "target" },
      { id: "content", title: "Content", subtitle: "Message & media", icon: "content" },
      { id: "brand-sys", title: "Brand System", subtitle: "Visual rules", icon: "brand" },
      { id: "data-in", title: "Data", subtitle: "Signals & analytics", icon: "data" },
      { id: "integrations", title: "Integrations", subtitle: "Connected stack", icon: "api" },
    ],
    outputs: [
      { id: "ux", title: "UX Architecture", subtitle: "Clear journeys", icon: "ux" },
      { id: "ui", title: "Responsive Interface", subtitle: "Every screen", icon: "interface" },
      { id: "product", title: "Product Experience", subtitle: "Useful & usable", icon: "workflow" },
      { id: "perf", title: "Fast Performance", subtitle: "Speed matters", icon: "perf" },
      { id: "connected", title: "Connected Systems", subtitle: "Data in flow", icon: "sync" },
      { id: "journey", title: "Conversion Journey", subtitle: "Designed to convert", icon: "convert" },
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
