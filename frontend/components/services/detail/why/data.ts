import type { ServiceSlug } from "../types";
import type { WhyItMattersConfig } from "./types";

export const WHY_IT_MATTERS: Record<ServiceSlug, WhyItMattersConfig> = {
  "ai-automation": {
    service: "ai-automation",
    eyebrow: "WHY IT MATTERS / 02",
    headline: [
      { segments: [{ text: "Your team is not" }] },
      { segments: [{ text: "short on effort." }] },
      { segments: [{ text: "" }] },
      { segments: [{ text: "It is losing time" }] },
      {
        segments: [
          { text: "to " },
          { text: "friction", accent: true },
          { text: "." },
        ],
      },
    ],
    supportingCopy:
      "Manual handoffs, disconnected tools, and repetitive decisions slow every cycle. AI-native systems remove work that should never need a human.",
    tensions: [
      {
        index: "01",
        title: "Work gets repeated.",
        description:
          "Teams copy, check, route, and switch systems instead of shipping outcomes.",
      },
      {
        index: "02",
        title: "Decisions move too slowly.",
        description:
          "Approvals and context-gathering stretch cycles that should finish in minutes.",
      },
      {
        index: "03",
        title: "Response cycles lag.",
        description:
          "When information stays fragmented, the business reacts after the opportunity.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "ship AI that removes friction, not slides about AI" },
      { text: ".", accent: true },
    ],
  },

  "growth-strategy": {
    service: "growth-strategy",
    eyebrow: "WHY IT MATTERS / 01",
    headline: [
      { segments: [{ text: "Growth isn’t about" }] },
      { segments: [{ text: "doing more." }] },
      { segments: [{ text: "" }] },
      { segments: [{ text: "It’s about doing the" }] },
      {
        segments: [
          { text: "right things, faster", accent: true },
          { text: "." },
        ],
      },
    ],
    supportingCopy:
      "Agency sprawl dilutes focus. Too many priorities and unclear positioning spread effort faster than results compound.",
    tensions: [
      {
        index: "01",
        title: "Too many priorities compete.",
        description:
          "Teams move in multiple directions without a clear hierarchy of what matters.",
      },
      {
        index: "02",
        title: "Positioning stays unclear.",
        description:
          "When the market cannot say why you are different, acquisition gets expensive.",
      },
      {
        index: "03",
        title: "Execution loses focus.",
        description:
          "Disconnected initiatives create activity without a growth system.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "replace agency sprawl with one focused growth system" },
      { text: ".", accent: true },
    ],
  },

  "technology-transformation": {
    service: "technology-transformation",
    eyebrow: "WHY IT MATTERS / 03",
    headline: [
      { segments: [{ text: "Technology should enable" }] },
      { segments: [{ text: "the business." }] },
      { segments: [{ text: "" }] },
      {
        segments: [
          { text: "Not slow it down", accent: true },
          { text: "." },
        ],
      },
    ],
    supportingCopy:
      "Disconnected systems, legacy workflows, and brittle integrations create drag across operations, data, and customer experience.",
    tensions: [
      {
        index: "01",
        title: "Systems stop talking.",
        description:
          "Disconnected tools create duplicate work, broken handoffs, and inconsistent information.",
      },
      {
        index: "02",
        title: "Change becomes expensive.",
        description:
          "Legacy architecture makes every improvement slower, riskier, and more costly.",
      },
      {
        index: "03",
        title: "Scale exposes weaknesses.",
        description:
          "What works at small volume breaks when the business grows.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "modernize the stack growth actually runs on" },
      { text: ".", accent: true },
    ],
  },

  "brand-creative": {
    service: "brand-creative",
    eyebrow: "WHY IT MATTERS / 04",
    headline: [
      { segments: [{ text: "Being seen is easy." }] },
      { segments: [{ text: "" }] },
      {
        segments: [
          { text: "Being remembered", accent: true },
        ],
      },
      { segments: [{ text: "is harder." }] },
    ],
    supportingCopy:
      "Inconsistent positioning, identity, and creative make the brand harder to recognize, trust, and buy from.",
    tensions: [
      {
        index: "01",
        title: "The brand feels inconsistent.",
        description:
          "Different channels communicate different versions of the same company.",
      },
      {
        index: "02",
        title: "Differentiation disappears.",
        description:
          "Without a clear point of view, strong businesses look interchangeable.",
      },
      {
        index: "03",
        title: "Creative loses leverage.",
        description:
          "One-off assets create output, not a brand system that compounds.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "build a brand system that converts, not a one-off deck" },
      { text: ".", accent: true },
    ],
  },

  "paid-media": {
    service: "paid-media",
    eyebrow: "WHY IT MATTERS / 05",
    headline: [
      { segments: [{ text: "More spend does not" }] },
      { segments: [{ text: "guarantee more growth." }] },
      { segments: [{ text: "" }] },
      {
        segments: [
          { text: "Better systems do", accent: true },
          { text: "." },
        ],
      },
    ],
    supportingCopy:
      "Weak creative, unclear attribution, and inefficient allocation turn paid media into a cost center instead of predictable acquisition.",
    tensions: [
      {
        index: "01",
        title: "Spend leaks into waste.",
        description:
          "Budgets scale before campaigns, audiences, and creative are validated.",
      },
      {
        index: "02",
        title: "Creative learns too slowly.",
        description:
          "Without structured testing, teams repeat assumptions instead of compounding insight.",
      },
      {
        index: "03",
        title: "Attribution stays unclear.",
        description:
          "Fragmented performance signals make confident scaling hard.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "turn every media dollar into a measurable growth signal" },
      { text: ".", accent: true },
    ],
  },

  "web-digital": {
    service: "web-digital",
    eyebrow: "WHY IT MATTERS / 06",
    headline: [
      { segments: [{ text: "Your digital experience" }] },
      {
        segments: [
          { text: "is " },
          { text: "part of the product", accent: true },
          { text: "." },
        ],
      },
      { segments: [{ text: "" }] },
      { segments: [{ text: "Not just the website." }] },
    ],
    supportingCopy:
      "Slow interfaces, confusing journeys, and disconnected systems sit between customer intent and revenue.",
    tensions: [
      {
        index: "01",
        title: "Users work too hard.",
        description:
          "Confusing journeys force people to think about the interface instead of the decision.",
      },
      {
        index: "02",
        title: "Performance kills momentum.",
        description:
          "Slow experiences quietly reduce trust, engagement, and conversion.",
      },
      {
        index: "03",
        title: "Systems stay disconnected.",
        description:
          "Front-end experience breaks when content, data, and operations do not work together.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "build sites and pages engineered to convert" },
      { text: ".", accent: true },
    ],
  },

  search: {
    service: "search",
    eyebrow: "WHY IT MATTERS / 07",
    headline: [
      { segments: [{ text: "Visibility is changing." }] },
      { segments: [{ text: "" }] },
      {
        segments: [
          { text: "Discovery no longer starts", accent: true },
        ],
      },
      { segments: [{ text: "in one place." }] },
    ],
    supportingCopy:
      "Search engines, AI systems, and content platforms shape how brands are found, understood, and trusted, before the click.",
    tensions: [
      {
        index: "01",
        title: "Demand exists before the click.",
        description:
          "Prospects form opinions before they ever reach your site.",
      },
      {
        index: "02",
        title: "Content stays disconnected.",
        description:
          "Publishing without structure limits discoverability and authority.",
      },
      {
        index: "03",
        title: "AI changes discovery.",
        description:
          "Brands AI cannot understand become harder to surface.",
      },
    ],
    opportunityLabel: "THE OPPORTUNITY:",
    opportunityStatement: [
      { text: "win where buyers and AI look first: SEO, GEO, ASO" },
      { text: ".", accent: true },
    ],
  },
};

export function getWhyItMatters(slug: ServiceSlug): WhyItMattersConfig {
  return WHY_IT_MATTERS[slug];
}
