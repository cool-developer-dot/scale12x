import type { ServiceConfig } from "../types";

export const MEDIA_SERVICE: ServiceConfig = {
  slug: "paid-media",
  index: "05",
  eyebrow: "05 / PAID MEDIA",
  serviceName: "Paid Media",
  headline: {
    soft: ["Turn attention into"],
    accent: ["predictable acquisition."],
  },
  description:
    "Google, Meta, LinkedIn, and GPT-native ads, spend that returns, with reporting you can trust.",
  primaryCta: { label: "Improve Acquisition", href: "/contact" },
  metadata: ["MEDIA", "CREATIVE", "ATTRIBUTION", "SCALE"],
  seoTitle: "Paid Media: Scale12x",
  seoDescription:
    "Google, Meta, LinkedIn, paid media that returns. Transparent reporting. Outcomes we stand behind.",
  visual: {
    inputLabel: "Scattered Attention",
    outputLabel: "Predictable Acquisition",
    coreLabel: "OPTIMIZATION LAYER",
    coreTitle: "MEDIA CORE",
    variant: "media",
    accentMode: "cobalt",
    inputs: [
      { id: "search-ch", title: "Search", subtitle: "Intent capture", icon: "search" },
      { id: "meta-ch", title: "Meta", subtitle: "Social demand", icon: "meta" },
      { id: "linkedin-ch", title: "LinkedIn", subtitle: "B2B reach", icon: "linkedin" },
      { id: "creative-in", title: "Creative", subtitle: "Message assets", icon: "creative" },
      { id: "audience", title: "Audience Data", subtitle: "Who converts", icon: "audience" },
      { id: "signals", title: "Campaign Signals", subtitle: "Live feedback", icon: "signal" },
    ],
    outputs: [
      { id: "traffic", title: "Qualified Traffic", subtitle: "Better intent", icon: "traffic" },
      { id: "waste", title: "Lower Waste", subtitle: "Spend efficiency", icon: "measure" },
      { id: "learnings", title: "Creative Learnings", subtitle: "What wins", icon: "learn" },
      { id: "conversion", title: "Conversion Growth", subtitle: "Pipeline lift", icon: "convert" },
      { id: "insights", title: "Audience Insights", subtitle: "Segment truth", icon: "insight" },
      { id: "scale", title: "Scalable Acquisition", subtitle: "Repeatable growth", icon: "target" },
    ],
    stages: [
      { id: "test", label: "Test" },
      { id: "measure", label: "Measure" },
      { id: "optimize", label: "Optimize" },
      { id: "allocate", label: "Allocate" },
      { id: "scale", label: "Scale" },
    ],
    pairings: [
      { inputId: "search-ch", outputId: "traffic" },
      { inputId: "meta-ch", outputId: "conversion" },
      { inputId: "linkedin-ch", outputId: "insights" },
      { inputId: "creative-in", outputId: "learnings" },
      { inputId: "audience", outputId: "waste" },
      { inputId: "signals", outputId: "scale" },
    ],
    mobileInputIds: ["search-ch", "creative-in", "signals"],
    mobileOutputIds: ["traffic", "learnings", "scale"],
  },
};
