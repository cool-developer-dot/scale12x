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

  "cloud-computing": {
    service: "cloud-computing",
    eyebrow: "CORE CAPABILITIES / 04",
    headline: "Build cloud that scales with the business.",
    supportingCopy:
      "Architecture, migration, automation, and optimization as one infrastructure system.",
    capabilities: [
      {
        id: "cloud-architecture",
        index: "01",
        title: "Cloud Architecture",
        description:
          "Design secure, scalable topologies across compute, data, networking, and environments.",
        metadata: ["TOPOLOGY", "COMPUTE", "NETWORK"],
        outcome: "Clearer infrastructure direction",
        icon: "architecture",
        primary: true,
      },
      {
        id: "migration-modernization",
        index: "02",
        title: "Migration & Modernization",
        description:
          "Move and modernize workloads with controlled cutovers that protect delivery momentum.",
        metadata: ["MIGRATION", "CUTOVER", "MODERNIZE"],
        outcome: "Lower legacy drag",
        icon: "pipeline",
      },
      {
        id: "devops-automation",
        index: "03",
        title: "DevOps & Automation",
        description:
          "Introduce IaC, CI/CD, and operational automation so environments stay repeatable.",
        metadata: ["IAC", "CI/CD", "OPS"],
        outcome: "Faster reliable releases",
        icon: "workflow",
      },
      {
        id: "cloud-optimization",
        index: "04",
        title: "Performance & Cost Optimization",
        description:
          "Tune reliability, performance, and spend so growth does not inflate waste.",
        metadata: ["COST", "PERFORMANCE", "RELIABILITY"],
        outcome: "More efficient scale",
        icon: "measure",
      },
    ],
  },

  cybersecurity: {
    service: "cybersecurity",
    eyebrow: "CORE CAPABILITIES / 05",
    headline: "Engineer security into every layer.",
    supportingCopy:
      "Architecture, identity, application protection, and monitoring as one security posture.",
    capabilities: [
      {
        id: "security-architecture",
        index: "01",
        title: "Security Architecture",
        description:
          "Design controls, perimeters, and trust boundaries around the systems business depends on.",
        metadata: ["CONTROLS", "PERIMETER", "TRUST"],
        outcome: "Stronger security foundation",
        icon: "secure",
        primary: true,
      },
      {
        id: "cloud-security",
        index: "02",
        title: "Cloud Security",
        description:
          "Harden cloud environments, identities, and shared services before exposure grows.",
        metadata: ["CLOUD", "HARDENING", "IDENTITY"],
        outcome: "Reduced cloud exposure",
        icon: "cloud",
      },
      {
        id: "application-security",
        index: "03",
        title: "Application Security",
        description:
          "Protect applications and APIs with verification, review, and release-time safeguards.",
        metadata: ["APPS", "APIS", "REVIEW"],
        outcome: "Safer software delivery",
        icon: "architecture",
      },
      {
        id: "monitoring-hardening",
        index: "04",
        title: "Monitoring & Hardening",
        description:
          "Improve visibility and continuous hardening so threats are caught before they compound.",
        metadata: ["MONITORING", "DETECTION", "POSTURE"],
        outcome: "Faster risk response",
        icon: "insight",
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
