export type CapabilityId = "01" | "02" | "03" | "04" | "05" | "06";

export type CapabilityVisualKey =
  | "growth"
  | "ai"
  | "technology"
  | "cloud"
  | "cyber"
  | "web";

export type CapabilityItem = {
  id: CapabilityId;
  visual: CapabilityVisualKey;
  title: string;
  promise: string;
  status: string;
  href: string;
  /** Cobalt feature treatment — color system only */
  featured?: boolean;
};

/** Six homepage/services capabilities — content only; visuals are hand-authored per service. */
export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    visual: "growth",
    title: "Growth Strategy",
    promise: "Positioning, channels, and priorities that compound.",
    status: "Strategy · Positioning · Direction",
    href: "/services/growth-strategy",
  },
  {
    id: "02",
    visual: "ai",
    title: "AI & Automation",
    promise: "Custom AI apps, chatbots, and workflows that ship.",
    status: "AI · Systems · Automation",
    href: "/services/ai-automation",
    featured: true,
  },
  {
    id: "03",
    visual: "technology",
    title: "Technology & Transformation",
    promise: "Modernize the stack growth actually runs on.",
    status: "Infrastructure · Systems · Scale",
    href: "/services/technology-transformation",
  },
  {
    id: "04",
    visual: "cloud",
    title: "Cloud Computing",
    promise: "Secure, scalable cloud infrastructure built for modern operations.",
    status: "Architecture · Migration · Reliability",
    href: "/services/cloud-computing",
    featured: true,
  },
  {
    id: "05",
    visual: "cyber",
    title: "Cybersecurity",
    promise: "Protect systems, data, and operations with security built in.",
    status: "Protection · Identity · Monitoring",
    href: "/services/cybersecurity",
  },
  {
    id: "06",
    visual: "web",
    title: "Web & Digital",
    promise: "Marketing sites and landing pages engineered to convert.",
    status: "UX · Product · Conversion",
    href: "/services/web-digital",
    featured: true,
  },
];
