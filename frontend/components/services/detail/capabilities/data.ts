import type { ServiceSlug } from "../types";
import type { CoreCapabilitiesConfig } from "./types";

export const CORE_CAPABILITIES: Record<ServiceSlug, CoreCapabilitiesConfig> = {
  "ai-automation": {
    service: "ai-automation",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "What actually moves the system forward.",
    supportingCopy:
      "Capabilities built to remove operational friction and ship AI that works in production.",
    capabilities: [
      {
        id: "ai-agents",
        index: "01",
        title: "AI Agents",
        description:
          "Design and deploy intelligent agents that can reason, act and assist across repeatable workflows.",
        metadata: ["AGENTS", "TOOLS", "MEMORY"],
        outcome: "Faster execution",
        icon: "workflow",
        primary: true,
      },
      {
        id: "workflow-automation",
        index: "02",
        title: "Workflow Automation",
        description:
          "Replace manual handoffs and repetitive steps with reliable automated workflows.",
        metadata: ["WORKFLOWS", "RULES", "APPROVALS"],
        outcome: "Less operational drag",
        icon: "check-route",
      },
      {
        id: "systems-integration",
        index: "03",
        title: "Systems Integration",
        description:
          "Connect your apps, data and platforms into one coordinated operating layer.",
        metadata: ["APIs", "DATA", "PLATFORMS"],
        outcome: "Cleaner data flow",
        icon: "database",
      },
      {
        id: "intelligence-monitoring",
        index: "04",
        title: "Intelligence & Monitoring",
        description:
          "Turn fragmented information into usable insight and continuously improve system performance.",
        metadata: ["INSIGHTS", "MONITORING", "OPTIMIZATION"],
        outcome: "Better decisions",
        icon: "insight",
      },
    ],
  },

  "growth-strategy": {
    service: "growth-strategy",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Turn direction into momentum.",
    supportingCopy:
      "Clarify priorities, sharpen positioning, and build a path for growth that ships.",
    capabilities: [
      {
        id: "growth-architecture",
        index: "01",
        title: "Growth Architecture",
        description:
          "Define the priorities, systems and growth levers that give the business a clear path forward.",
        metadata: ["PRIORITIES", "ROADMAP", "GROWTH LEVERS"],
        outcome: "Clearer direction",
        icon: "architecture",
        primary: true,
      },
      {
        id: "positioning-messaging",
        index: "02",
        title: "Positioning & Messaging",
        description:
          "Clarify how the business should be understood, differentiated and communicated in the market.",
        metadata: ["POSITIONING", "MESSAGE", "DIFFERENTIATION"],
        outcome: "Stronger market clarity",
        icon: "position",
      },
      {
        id: "gtm-strategy",
        index: "03",
        title: "Go-To-Market Strategy",
        description:
          "Build a focused approach for reaching the right audience, channels and opportunities.",
        metadata: ["GTM", "CHANNELS", "AUDIENCE"],
        outcome: "More focused execution",
        icon: "target",
      },
      {
        id: "funnel-measurement",
        index: "04",
        title: "Funnel & Measurement",
        description:
          "Design the journey, measurement model and feedback loops needed to improve growth decisions.",
        metadata: ["FUNNELS", "METRICS", "OPTIMIZATION"],
        outcome: "Better growth visibility",
        icon: "funnel",
      },
    ],
  },

  "technology-transformation": {
    service: "technology-transformation",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Build the foundation growth depends on.",
    supportingCopy:
      "Connect systems, modernize infrastructure, and remove the drag growth cannot afford.",
    capabilities: [
      {
        id: "architecture-modernization",
        index: "01",
        title: "Architecture Modernization",
        description:
          "Restructure legacy systems into a cleaner architecture built for change and scale.",
        metadata: ["ARCHITECTURE", "MODERNIZATION", "SCALE"],
        outcome: "Stronger technical foundation",
        icon: "architecture",
        primary: true,
      },
      {
        id: "systems-integration",
        index: "02",
        title: "Systems Integration",
        description:
          "Connect applications, APIs and workflows into one reliable technology ecosystem.",
        metadata: ["APIs", "INTEGRATIONS", "SYSTEMS"],
        outcome: "Fewer broken handoffs",
        icon: "api",
      },
      {
        id: "cloud-infrastructure",
        index: "03",
        title: "Cloud & Infrastructure",
        description:
          "Build secure, resilient infrastructure that supports performance and future growth.",
        metadata: ["CLOUD", "INFRASTRUCTURE", "RELIABILITY"],
        outcome: "More resilient operations",
        icon: "cloud",
      },
      {
        id: "data-operations",
        index: "04",
        title: "Data & Operations",
        description:
          "Create cleaner data flows and reduce manual dependencies across internal systems.",
        metadata: ["DATA", "OPERATIONS", "AUTOMATION"],
        outcome: "More reliable execution",
        icon: "data",
      },
    ],
  },

  "brand-creative": {
    service: "brand-creative",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Turn identity into recognition.",
    supportingCopy:
      "Positioning, visual identity, and creative production as one system that converts.",
    capabilities: [
      {
        id: "brand-positioning",
        index: "01",
        title: "Brand Positioning",
        description:
          "Define the strategic territory, point of view and differentiation behind the brand.",
        metadata: ["POSITIONING", "STRATEGY", "DIFFERENTIATION"],
        outcome: "Clearer brand direction",
        icon: "position",
        primary: true,
      },
      {
        id: "visual-identity",
        index: "02",
        title: "Visual Identity",
        description:
          "Create a recognizable visual system across typography, color, layout and core brand assets.",
        metadata: ["IDENTITY", "TYPOGRAPHY", "DESIGN"],
        outcome: "Stronger recognition",
        icon: "identity",
      },
      {
        id: "creative-systems",
        index: "03",
        title: "Creative Systems",
        description:
          "Build repeatable creative frameworks for campaigns, content and digital channels.",
        metadata: ["CREATIVE", "CAMPAIGNS", "CONTENT"],
        outcome: "More consistent expression",
        icon: "creative",
      },
      {
        id: "brand-governance",
        index: "04",
        title: "Brand Governance",
        description:
          "Create guidelines and systems that keep the brand coherent as teams and channels grow.",
        metadata: ["GUIDELINES", "SYSTEMS", "CONSISTENCY"],
        outcome: "Better brand control",
        icon: "guide",
      },
    ],
  },

  "paid-media": {
    service: "paid-media",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Build a smarter acquisition engine.",
    supportingCopy:
      "Targeting, creative learning, and honest attribution, spend that returns.",
    capabilities: [
      {
        id: "media-strategy",
        index: "01",
        title: "Media Strategy",
        description:
          "Define channel roles, audience priorities and investment logic around real growth objectives.",
        metadata: ["CHANNELS", "BUDGET", "STRATEGY"],
        outcome: "More focused spend",
        icon: "target",
        primary: true,
      },
      {
        id: "creative-testing",
        index: "02",
        title: "Creative Testing",
        description:
          "Build structured testing systems that turn creative performance into repeatable learning.",
        metadata: ["CREATIVE", "TESTING", "LEARNING"],
        outcome: "Faster optimization",
        icon: "creative",
      },
      {
        id: "campaign-optimization",
        index: "03",
        title: "Campaign Optimization",
        description:
          "Continuously improve targeting, bidding, allocation and conversion performance.",
        metadata: ["TARGETING", "BIDDING", "OPTIMIZATION"],
        outcome: "Less wasted spend",
        icon: "campaign",
      },
      {
        id: "measurement-attribution",
        index: "04",
        title: "Measurement & Attribution",
        description:
          "Create clearer performance visibility across channels, campaigns and conversion paths.",
        metadata: ["ATTRIBUTION", "METRICS", "INSIGHTS"],
        outcome: "Better scaling decisions",
        icon: "measure",
      },
    ],
  },

  "web-digital": {
    service: "web-digital",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Build digital experiences that perform.",
    supportingCopy:
      "UX, development, and conversion, marketing sites and landing pages built to perform.",
    capabilities: [
      {
        id: "experience-design",
        index: "01",
        title: "Experience Design",
        description:
          "Design clear user journeys and interfaces around real customer intent and business goals.",
        metadata: ["UX", "JOURNEYS", "INTERFACES"],
        outcome: "Better user experience",
        icon: "ux",
        primary: true,
      },
      {
        id: "frontend-development",
        index: "02",
        title: "Frontend Development",
        description:
          "Build responsive, performant interfaces with production-grade implementation.",
        metadata: ["FRONTEND", "RESPONSIVE", "PERFORMANCE"],
        outcome: "Faster digital experiences",
        icon: "interface",
      },
      {
        id: "platform-integration",
        index: "03",
        title: "Platform Integration",
        description:
          "Connect content, APIs, data and business systems into one reliable digital product.",
        metadata: ["APIs", "CMS", "INTEGRATIONS"],
        outcome: "Cleaner system flow",
        icon: "api",
      },
      {
        id: "conversion-optimization",
        index: "04",
        title: "Conversion Optimization",
        description:
          "Improve friction points, interaction patterns and journeys that influence action.",
        metadata: ["CONVERSION", "TESTING", "UX"],
        outcome: "More effective journeys",
        icon: "convert",
      },
    ],
  },

  search: {
    service: "search",
    eyebrow: "CORE CAPABILITIES / 03",
    headline: "Build visibility that compounds.",
    supportingCopy:
      "SEO, GEO, and authority, visibility that compounds across search and AI.",
    capabilities: [
      {
        id: "search-strategy",
        index: "01",
        title: "Search Strategy",
        description:
          "Map demand, intent and opportunity into a focused discovery roadmap.",
        metadata: ["INTENT", "DEMAND", "STRATEGY"],
        outcome: "Clearer search direction",
        icon: "search",
        primary: true,
      },
      {
        id: "content-architecture",
        index: "02",
        title: "Content Architecture",
        description:
          "Structure content around topics, entities and relationships that discovery systems can understand.",
        metadata: ["CONTENT", "TOPICS", "ENTITIES"],
        outcome: "Stronger relevance",
        icon: "structure",
      },
      {
        id: "authority-building",
        index: "03",
        title: "Authority Building",
        description:
          "Strengthen the signals that increase trust, credibility and discoverability.",
        metadata: ["AUTHORITY", "TRUST", "SIGNALS"],
        outcome: "Greater visibility",
        icon: "authority",
      },
      {
        id: "geo-ai-discovery",
        index: "04",
        title: "GEO & AI Discovery",
        description:
          "Improve how the brand is understood and surfaced across modern AI-driven discovery environments.",
        metadata: ["GEO", "AI SEARCH", "DISCOVERY"],
        outcome: "Wider discoverability",
        icon: "discover",
      },
    ],
  },
};

export function getCoreCapabilities(
  slug: ServiceSlug,
): CoreCapabilitiesConfig {
  return CORE_CAPABILITIES[slug];
}
