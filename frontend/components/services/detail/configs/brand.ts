import type { ServiceConfig } from "../types";

export const BRAND_SERVICE: ServiceConfig = {
  slug: "brand-creative",
  index: "04",
  eyebrow: "04 / BRAND & CREATIVE",
  serviceName: "Brand & Creative",
  headline: {
    soft: ["Build a brand"],
    accent: ["people remember."],
  },
  description:
    "Brand identity, ad creative, design, and video, a system that converts, not a one-off deck.",
  primaryCta: { label: "Build Your Brand", href: "/contact" },
  metadata: ["POSITIONING", "IDENTITY", "CREATIVE", "SYSTEMS"],
  seoTitle: "Brand & Creative: Scale12x",
  seoDescription:
    "Identity, ad creative, and design that converts. A brand system built to ship.",
  visual: {
    inputLabel: "Fragmented Brand",
    outputLabel: "Coherent Brand",
    coreLabel: "IDENTITY LAYER",
    coreTitle: "BRAND CORE",
    variant: "brand",
    accentMode: "cobalt",
    inputs: [
      { id: "market-pos", title: "Market Position", subtitle: "Where you stand", icon: "position" },
      { id: "audience", title: "Audience", subtitle: "Who you speak to", icon: "audience" },
      { id: "story", title: "Brand Story", subtitle: "Narrative core", icon: "story" },
      { id: "refs", title: "Visual References", subtitle: "Mood & direction", icon: "palette" },
      { id: "campaign-needs", title: "Campaign Needs", subtitle: "Near-term asks", icon: "campaign" },
      { id: "assets", title: "Existing Assets", subtitle: "What remains", icon: "asset" },
    ],
    outputs: [
      { id: "positioning", title: "Positioning", subtitle: "Clear stance", icon: "position" },
      { id: "identity", title: "Visual Identity", subtitle: "Distinct mark", icon: "identity" },
      { id: "typography", title: "Typography System", subtitle: "Voice in type", icon: "type" },
      { id: "campaign", title: "Campaign Creative", subtitle: "Launch-ready", icon: "campaign" },
      { id: "guidelines", title: "Brand Guidelines", subtitle: "System rules", icon: "guide" },
      { id: "digital", title: "Digital Expression", subtitle: "Everywhere consistent", icon: "interface" },
    ],
    stages: [
      { id: "distill", label: "Distill" },
      { id: "position", label: "Position" },
      { id: "define", label: "Define" },
      { id: "design", label: "Design" },
      { id: "systemize", label: "Systemize" },
    ],
    pairings: [
      { inputId: "market-pos", outputId: "positioning" },
      { inputId: "audience", outputId: "identity" },
      { inputId: "story", outputId: "typography" },
      { inputId: "refs", outputId: "campaign" },
      { inputId: "campaign-needs", outputId: "guidelines" },
      { inputId: "assets", outputId: "digital" },
    ],
    mobileInputIds: ["audience", "story", "refs"],
    mobileOutputIds: ["identity", "campaign", "guidelines"],
  },
};
