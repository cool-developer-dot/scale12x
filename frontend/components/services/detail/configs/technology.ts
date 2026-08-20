import type { ServiceConfig } from "../types";

export const TECHNOLOGY_SERVICE: ServiceConfig = {
  slug: "technology-transformation",
  index: "03",
  eyebrow: "03 / TECHNOLOGY & TRANSFORMATION",
  serviceName: "Technology & Transformation",
  headline: {
    soft: ["Modernize what"],
    accent: ["growth depends on."],
  },
  description:
    "Cloud, data, integrations, and end-to-end modernization, the stack growth actually runs on.",
  primaryCta: { label: "Modernize Your Systems", href: "/contact" },
  metadata: ["ARCHITECTURE", "CLOUD", "INTEGRATION", "SCALE"],
  seoTitle: "Technology & Transformation: Scale12x",
  seoDescription:
    "Modernize the stack growth runs on. Cloud, data, integrations, and transformation that ships.",
  visual: {
    inputLabel: "Disconnected Systems",
    outputLabel: "Connected Platform",
    coreLabel: "TRANSFORMATION LAYER",
    coreTitle: "TECHNOLOGY CORE",
    variant: "technology",
    accentMode: "cobalt",
    inputs: [
      { id: "legacy", title: "Legacy Apps", subtitle: "Aging systems", icon: "legacy" },
      { id: "workflows", title: "Disconnected Workflows", subtitle: "Broken handoffs", icon: "api" },
      { id: "manual", title: "Manual Operations", subtitle: "Human glue", icon: "ops" },
      { id: "siloed", title: "Siloed Data", subtitle: "Fragmented truth", icon: "data" },
      { id: "cloud", title: "Cloud Systems", subtitle: "Partial adoption", icon: "cloud" },
      { id: "tools", title: "Internal Tools", subtitle: "Shadow IT", icon: "tool" },
    ],
    outputs: [
      { id: "architecture", title: "Unified Architecture", subtitle: "One system map", icon: "architecture" },
      { id: "connected", title: "Connected Systems", subtitle: "Clean contracts", icon: "api" },
      { id: "infra", title: "Modern Infrastructure", subtitle: "Cloud-ready", icon: "infra" },
      { id: "dataflow", title: "Reliable Data", subtitle: "Trusted pipelines", icon: "pipeline" },
      { id: "automated-ops", title: "Automated Operations", subtitle: "Less manual work", icon: "workflow" },
      { id: "platform", title: "Scalable Platform", subtitle: "Ready to grow", icon: "secure" },
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
