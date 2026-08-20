import type { ServiceSlug } from "../types";

export type WhyHeadlineSegment = {
  text: string;
  accent?: boolean;
};

export type WhyHeadlineLine = {
  segments: WhyHeadlineSegment[];
};

export type WhyTension = {
  index: string;
  title: string;
  description: string;
};

export type WhyOpportunitySegment = {
  text: string;
  accent?: boolean;
};

export type WhyItMattersConfig = {
  service: ServiceSlug;
  eyebrow: string;
  headline: WhyHeadlineLine[];
  supportingCopy: string;
  tensions: [WhyTension, WhyTension, WhyTension];
  opportunityLabel: string;
  opportunityStatement: WhyOpportunitySegment[];
};
