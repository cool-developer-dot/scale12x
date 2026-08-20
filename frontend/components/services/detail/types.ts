export type ServiceSlug =
  | "growth-strategy"
  | "ai-automation"
  | "technology-transformation"
  | "brand-creative"
  | "paid-media"
  | "web-digital"
  | "search";

export type CoreVariant =
  | "growth"
  | "ai"
  | "technology"
  | "brand"
  | "media"
  | "web"
  | "search";

export type ServiceIconName =
  | "mail"
  | "sheet"
  | "chat"
  | "report"
  | "approval"
  | "database"
  | "workflow"
  | "response"
  | "insight"
  | "sync"
  | "check-route"
  | "pipeline"
  | "signal"
  | "users"
  | "target"
  | "competitors"
  | "funnel"
  | "constraint"
  | "position"
  | "roadmap"
  | "measure"
  | "legacy"
  | "api"
  | "ops"
  | "cloud"
  | "tool"
  | "architecture"
  | "infra"
  | "secure"
  | "audience"
  | "story"
  | "palette"
  | "campaign"
  | "asset"
  | "identity"
  | "type"
  | "guide"
  | "search"
  | "meta"
  | "linkedin"
  | "creative"
  | "traffic"
  | "learn"
  | "convert"
  | "ux"
  | "content"
  | "brand"
  | "data"
  | "interface"
  | "perf"
  | "query"
  | "topic"
  | "entity"
  | "authority"
  | "structure"
  | "visibility"
  | "discover"
  | "coverage"
  | "semantic"
  | "demand"
  | "dot";

export type ServiceNode = {
  id: string;
  title: string;
  subtitle: string;
  icon: ServiceIconName;
};

export type ServiceProcessStage = {
  id: string;
  label: string;
};

export type ServiceRoutePairing = {
  inputId: string;
  outputId: string;
  bendIn?: number;
  bendOut?: number;
  inboundScale?: number;
  outboundScale?: number;
};

export type ServiceHeadline = {
  /** Soft white lines before accent */
  soft: string[];
  /** Cobalt accent lines */
  accent: string[];
};

export type ServiceConfig = {
  slug: ServiceSlug;
  index: string;
  eyebrow: string;
  serviceName: string;
  headline: ServiceHeadline;
  description: string;
  primaryCta: { label: string; href: string };
  metadata: [string, string, string, string];
  seoTitle: string;
  seoDescription: string;
  visual: {
    inputLabel: string;
    outputLabel: string;
    coreLabel: string;
    coreTitle: string;
    variant: CoreVariant;
    /** Soft accent tone — brand uses less cobalt */
    accentMode?: "cobalt" | "neutral";
    inputs: ServiceNode[];
    outputs: ServiceNode[];
    stages: ServiceProcessStage[];
    pairings: ServiceRoutePairing[];
    mobileInputIds: string[];
    mobileOutputIds: string[];
  };
};
