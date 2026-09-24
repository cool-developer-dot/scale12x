import type { ServiceConfig } from "../types";

export const SEARCH_SERVICE: ServiceConfig = {
  slug: "search",
  index: "07",
  eyebrow: "07 / SEARCH",
  serviceName: "Search and GEO",
  headline: {
    soft: ["Be discovered wherever"],
    accent: ["decisions begin."],
  },
  description:
    "SEO, GEO, and ASO, where buyers and AI look first. Visibility that compounds.",
  primaryCta: { label: "Expand your visibility", href: "/contact" },
  metadata: ["SEARCH", "CONTENT", "AUTHORITY", "GEO"],
  seoTitle: "Search and GEO: Scale 12x",
  seoDescription:
    "SEO, GEO, and ASO where buyers and AI look first. Discoverability that compounds.",
  visual: {
    inputLabel: "Fragmented discovery",
    outputLabel: "Visible everywhere",
    coreLabel: "DISCOVERY LAYER",
    coreTitle: "SEARCH CORE",
    variant: "search",
    accentMode: "cobalt",
    inputs: [
      { id: "queries", title: "Search queries", subtitle: "Intent language", icon: "query" },
      { id: "topics", title: "Topics", subtitle: "Coverage map", icon: "topic" },
      { id: "entities", title: "Entities", subtitle: "Meaning graph", icon: "entity" },
      { id: "content", title: "Content", subtitle: "Source material", icon: "content" },
      { id: "authority", title: "Authority signals", subtitle: "Trust & proof", icon: "authority" },
      { id: "structure", title: "Site structure", subtitle: "Crawl paths", icon: "structure" },
    ],
    outputs: [
      { id: "visibility", title: "Search visibility", subtitle: "Rank & reach", icon: "visibility" },
      { id: "ai-discover", title: "AI discoverability", subtitle: "GEO presence", icon: "discover" },
      { id: "coverage", title: "Content coverage", subtitle: "Topic depth", icon: "coverage" },
      { id: "authority-out", title: "Authority growth", subtitle: "Stronger signals", icon: "authority" },
      { id: "semantic", title: "Semantic relevance", subtitle: "Meaning match", icon: "semantic" },
      { id: "demand", title: "Qualified demand", subtitle: "Ready buyers", icon: "demand" },
    ],
    stages: [
      { id: "map", label: "Map" },
      { id: "connect", label: "Connect" },
      { id: "structure", label: "Structure" },
      { id: "optimize", label: "Optimize" },
      { id: "surface", label: "Surface" },
    ],
    pairings: [
      { inputId: "queries", outputId: "visibility" },
      { inputId: "topics", outputId: "coverage" },
      { inputId: "entities", outputId: "semantic" },
      { inputId: "content", outputId: "ai-discover" },
      { inputId: "authority", outputId: "authority-out" },
      { inputId: "structure", outputId: "demand" },
    ],
    mobileInputIds: ["queries", "content", "authority"],
    mobileOutputIds: ["visibility", "ai-discover", "demand"],
  },
};
