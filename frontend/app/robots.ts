import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://scale12x.com/sitemap.xml",
    host: "https://scale12x.com",
  };
}
