import type { ComponentType } from "react";
import { SERVICE_VISUALS } from "./visuals";

/** navy = deep dark card, blue = luminous cobalt, featured = brightest blue */
export type ServiceSurface = "navy" | "blue" | "featured";

export type ServiceVisualKey = keyof typeof SERVICE_VISUALS;

export type ServiceIcon =
  | "orbit"
  | "chip"
  | "cloud"
  | "spark"
  | "funnel"
  | "window"
  | "search";

export type ServiceItem = {
  index: string;
  label: string;
  title: string;
  description: string;
  visual: ServiceVisualKey;
  icon: ServiceIcon;
  surface: ServiceSurface;
  featured?: boolean;
  row: "top" | "bottom";
  /** Service detail route */
  href: string;
};

export type ServiceVisualProps = {
  active?: boolean;
};

export type ServiceVisualComponent = ComponentType<ServiceVisualProps>;

export const SERVICES: ServiceItem[] = [
  {
    index: "01",
    label: "PILLAR",
    title: "Growth Strategy",
    description: "Positioning, channels, and priorities that compound.",
    visual: "growth",
    icon: "orbit",
    surface: "navy",
    row: "top",
    href: "/services/growth-strategy",
  },
  {
    index: "02",
    label: "FEATURED",
    title: "AI & Automation",
    description: "Custom AI apps, chatbots, and workflows that ship.",
    visual: "ai",
    icon: "chip",
    surface: "featured",
    featured: true,
    row: "top",
    href: "/services/ai-automation",
  },
  {
    index: "03",
    label: "PILLAR",
    title: "Technology & Transformation",
    description: "Modernize the stack growth actually runs on.",
    visual: "technology",
    icon: "cloud",
    surface: "navy",
    row: "top",
    href: "/services/technology-transformation",
  },
  {
    index: "04",
    label: "CAPABILITY",
    title: "Brand & Creative",
    description: "Identity, ad creative, and design that converts.",
    visual: "brand",
    icon: "spark",
    surface: "blue",
    row: "bottom",
    href: "/services/brand-creative",
  },
  {
    index: "05",
    label: "CAPABILITY",
    title: "Paid Media",
    description: "Google, Meta, LinkedIn, spend that returns.",
    visual: "paid",
    icon: "funnel",
    surface: "navy",
    row: "bottom",
    href: "/services/paid-media",
  },
  {
    index: "06",
    label: "CAPABILITY",
    title: "Web & Digital",
    description: "Marketing sites and landing pages engineered to convert.",
    visual: "web",
    icon: "window",
    surface: "blue",
    row: "bottom",
    href: "/services/web-digital",
  },
  {
    index: "07",
    label: "CAPABILITY",
    title: "Search / SEO / GEO",
    description: "SEO, GEO, and ASO where buyers and AI look first.",
    visual: "search",
    icon: "search",
    surface: "navy",
    row: "bottom",
    href: "/services/search",
  },
];

export const SERVICES_TOP = SERVICES.filter((s) => s.row === "top");
export const SERVICES_BOTTOM = SERVICES.filter((s) => s.row === "bottom");
