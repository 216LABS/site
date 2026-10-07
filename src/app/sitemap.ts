import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publishedPosts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/writing`, changeFrequency: "weekly", priority: 0.6 },
    ...publishedPosts().map((p) => ({
      url: `${site.url}/writing/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
