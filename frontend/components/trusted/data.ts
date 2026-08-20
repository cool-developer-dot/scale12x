export type PlatformItem = {
  id: string;
  /** Full name for accessibility */
  name: string;
  /** Visible label beside the logo */
  displayName: string;
  src: string;
};

/**
 * Platform / technology marks — ecosystem expertise, not client claims.
 * Single source of truth for the platforms marquee.
 */
export const PLATFORM_LOGOS: PlatformItem[] = [
  { id: "linkedin", name: "LinkedIn", displayName: "LinkedIn", src: "/logos/linkedin.svg?v=3" },
  { id: "hubspot", name: "HubSpot", displayName: "HubSpot", src: "/logos/hubspot.svg?v=3" },
  { id: "shopify", name: "Shopify", displayName: "Shopify", src: "/logos/shopify.svg?v=3" },
  { id: "wordpress", name: "WordPress", displayName: "WordPress", src: "/logos/wordpress.svg?v=3" },
  { id: "webflow", name: "Webflow", displayName: "Webflow", src: "/logos/webflow.svg?v=3" },
  { id: "google-analytics", name: "Google Analytics", displayName: "Google Analytics", src: "/logos/google-analytics.svg?v=3" },
  { id: "aws", name: "Amazon Web Services", displayName: "AWS", src: "/logos/aws.svg?v=3" },
  { id: "meta", name: "Meta", displayName: "Meta", src: "/logos/meta.svg?v=3" },
  { id: "google-ads", name: "Google Ads", displayName: "Google Ads", src: "/logos/google-ads.svg?v=3" },
  { id: "openai", name: "OpenAI", displayName: "OpenAI", src: "/logos/openai.svg?v=3" },
  { id: "claude", name: "Claude", displayName: "Claude", src: "/logos/claude.svg?v=1" },
];

/** @deprecated use PlatformItem */
export type LogoItem = PlatformItem;

/** @deprecated use PLATFORM_LOGOS */
export const TRUSTED_LOGOS = PLATFORM_LOGOS;
