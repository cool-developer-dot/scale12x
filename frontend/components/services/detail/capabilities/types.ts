import type { ServiceIconName, ServiceSlug } from "../types";

export type CapabilityItem = {
  id: string;
  index: string;
  title: string;
  description: string;
  metadata: string[];
  outcome: string;
  icon: ServiceIconName;
  primary?: boolean;
};

export type CoreCapabilitiesConfig = {
  service: ServiceSlug;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  capabilities: [CapabilityItem, CapabilityItem, CapabilityItem, CapabilityItem];
};
