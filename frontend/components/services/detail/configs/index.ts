import type { ServiceConfig, ServiceSlug } from "../types";
import { AI_SERVICE } from "./ai";
import { CLOUD_SERVICE } from "./cloud";
import { CYBER_SERVICE } from "./cyber";
import { GROWTH_SERVICE } from "./growth";
import { SEARCH_SERVICE } from "./search";
import { TECHNOLOGY_SERVICE } from "./technology";
import { WEB_SERVICE } from "./web";

export const SERVICE_CONFIGS: Record<ServiceSlug, ServiceConfig> = {
  "growth-strategy": GROWTH_SERVICE,
  "ai-automation": AI_SERVICE,
  "technology-transformation": TECHNOLOGY_SERVICE,
  "cloud-computing": CLOUD_SERVICE,
  cybersecurity: CYBER_SERVICE,
  "web-digital": WEB_SERVICE,
  search: SEARCH_SERVICE,
};

export const SERVICE_SLUGS = Object.keys(SERVICE_CONFIGS) as ServiceSlug[];

export function getServiceConfig(slug: string): ServiceConfig | null {
  if (slug in SERVICE_CONFIGS) {
    return SERVICE_CONFIGS[slug as ServiceSlug];
  }
  return null;
}

export {
  AI_SERVICE,
  CLOUD_SERVICE,
  CYBER_SERVICE,
  GROWTH_SERVICE,
  SEARCH_SERVICE,
  TECHNOLOGY_SERVICE,
  WEB_SERVICE,
};
