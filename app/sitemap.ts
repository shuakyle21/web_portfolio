import type { MetadataRoute } from "next";
import { work } from "@/lib/data/work";
import { siteUrl } from "@/lib/site";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...work
      .filter((w) => w.caseStudy)
      .map((w) => ({
        url: `${siteUrl}/work/${w.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
  ];
}
