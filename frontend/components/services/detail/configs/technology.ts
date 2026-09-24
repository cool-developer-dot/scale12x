import type { ServiceConfig } from "../types";

export const TECHNOLOGY_SERVICE: ServiceConfig = {
  slug: "technology-transformation",
  index: "03",
  eyebrow: "03 / TECHNOLOGY & TRANSFORMATION",
  serviceName: "Technology and transformation",
  headline: {
    soft: ["Modernize what"],
    accent: ["growth depends on."],
  },
  description:
    "Cloud, data, integrations, and end-to-end modernization, the stack growth actually runs on.",
  primaryCta: { label: "Modernize your systems", href: "/contact" },
  metadata: ["ARCHITECTURE", "CLOUD", "INTEGRATION", "SCALE"],
  seoTitle: "Technology and transformation: Scale 12x",
  seoDescription:
    "Modernize the stack growth runs on. Cloud, data, integrations, and transformation that ships.",
  visual: {
    inputLabel: "Disconnected systems",
    outputLabel: "Connected platform",
    coreLabel: "TRANSFORMATION LAYER",
    coreTitle: "TECHNOLOGY CORE",
    variant: "technology",
    accentMode: "cobalt",
    inputs: [
      { id: "legacy", title: "Legacy apps", subtitle: "Aging systems", icon: "legacy" },
      { id: "workflows", title: "Disconnected workflows", subtitle: "Broken handoffs", icon: "api" },
      { id: "manual", title: "Manual operations", subtitle: "Human glue", icon: "ops" },
      { id: "siloed", title: "Siloed data", subtitle: "Fragmented truth", icon: "data" },
      { id: "cloud", title: "Cloud systems", subtitle: "Partial adoption", icon: "cloud" },
      { id: "tools", title: "Internal tools", subtitle: "Shadow IT", icon: "tool" },
    ],
    outputs: [
      { id: "architecture", title: "Unified architecture", subtitle: "One system map", icon: "architecture" },
      { id: "connected", title: "Connected systems", subtitle: "Clean contracts", icon: "api" },
      { id: "infra", title: "Modern infrastructure", subtitle: "Cloud-ready", icon: "infra" },
      { id: "dataflow", title: "Reliable data", subtitle: "Trusted pipelines", icon: "pipeline" },
      { id: "automated-ops", title: "Automated operations", subtitle: "Less manual work", icon: "workflow" },
      { id: "platform", title: "Scalable platform", subtitle: "Ready to grow", icon: "secure" },
    ],
    stages: [
      { id: "map", label: "Map" },
      { id: "connect", label: "Connect" },
      { id: "modernize", label: "Modernize" },
      { id: "secure", label: "Secure" },
      { id: "scale", label: "Scale" },
    ],
    pairings: [
      { inputId: "legacy", outputId: "architecture" },
      { inputId: "workflows", outputId: "connected" },
      { inputId: "manual", outputId: "automated-ops" },
      { inputId: "siloed", outputId: "dataflow" },
      { inputId: "cloud", outputId: "infra" },
      { inputId: "tools", outputId: "platform" },
    ],
    mobileInputIds: ["legacy", "workflows", "siloed"],
    mobileOutputIds: ["architecture", "connected", "platform"],
  },
};
