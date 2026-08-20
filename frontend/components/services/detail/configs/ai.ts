import type { ServiceConfig } from "../types";

export const AI_SERVICE: ServiceConfig = {
  slug: "ai-automation",
  index: "02",
  eyebrow: "02 / AI & AUTOMATION",
  serviceName: "AI & Automation",
  headline: {
    soft: ["Turn repetitive work", "into "],
    accent: ["intelligent", "systems."],
  },
  description:
    "Custom AI apps, chatbots, and production workflows, AI-native, not bolted on. Ships in weeks.",
  primaryCta: { label: "Discuss Your AI System", href: "/contact" },
  metadata: ["AI", "AGENTS", "AUTOMATION", "INTEGRATION"],
  seoTitle: "AI & Automation: Scale12x",
  seoDescription:
    "Custom AI apps, chatbots, and production workflows. AI-native execution that ships.",
  visual: {
    inputLabel: "Manual & Fragmented",
    outputLabel: "Automated & Unified",
    coreLabel: "AI ORCHESTRATION LAYER",
    coreTitle: "AI CORE",
    variant: "ai",
    accentMode: "cobalt",
    inputs: [
      { id: "emails", title: "Emails", subtitle: "Manual triage", icon: "mail" },
      { id: "spreadsheets", title: "Spreadsheets", subtitle: "Copy / paste", icon: "sheet" },
      { id: "chat", title: "Chat Requests", subtitle: "Context switching", icon: "chat" },
      { id: "reports", title: "Reports", subtitle: "Manual updates", icon: "report" },
      { id: "approvals", title: "Approvals", subtitle: "Delays & follow-ups", icon: "approval" },
      { id: "data", title: "Data Sources", subtitle: "Siloed systems", icon: "database" },
    ],
    outputs: [
      { id: "workflows", title: "Automated Workflows", subtitle: "End-to-end execution", icon: "workflow" },
      { id: "responses", title: "Smart Responses", subtitle: "AI-powered replies", icon: "response" },
      { id: "insights", title: "Real-Time Insights", subtitle: "Signals & summaries", icon: "insight" },
      { id: "sync", title: "Synchronized Systems", subtitle: "Two-way updates", icon: "sync" },
      { id: "approvals-out", title: "Approvals Automated", subtitle: "Rules & routing", icon: "check-route" },
      { id: "pipelines", title: "Clean Data Pipelines", subtitle: "Validated & connected", icon: "pipeline" },
    ],
    stages: [
      { id: "understand", label: "Understand" },
      { id: "reason", label: "Reason" },
      { id: "decide", label: "Decide" },
      { id: "act", label: "Act" },
      { id: "learn", label: "Learn" },
    ],
    pairings: [
      { inputId: "emails", outputId: "responses", inboundScale: 0.95, outboundScale: 0.95 },
      { inputId: "spreadsheets", outputId: "pipelines", inboundScale: 1.12, outboundScale: 1.15 },
      { inputId: "chat", outputId: "workflows", inboundScale: 1.05, outboundScale: 1.08 },
      { inputId: "reports", outputId: "insights", inboundScale: 1.0, outboundScale: 0.98 },
      { inputId: "approvals", outputId: "approvals-out", inboundScale: 0.98, outboundScale: 0.95 },
      { inputId: "data", outputId: "sync", inboundScale: 1.1, outboundScale: 1.05 },
    ],
    mobileInputIds: ["emails", "chat", "approvals"],
    mobileOutputIds: ["responses", "workflows", "approvals-out"],
  },
};
