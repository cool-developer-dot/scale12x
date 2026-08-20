import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/components/services/detail/configs";

const SITE = "https://scale12x.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...servicePages,
  ];
}
