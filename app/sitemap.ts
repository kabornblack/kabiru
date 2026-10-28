import type { MetadataRoute } from "next";

const SITE_URL = "https://www.kabiru.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
