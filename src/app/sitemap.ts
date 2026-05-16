import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getClient } from "@/sanity/lib/client";
import {
  allArticleSlugsQuery,
  allAuthorSlugsQuery,
  allCategorySlugsQuery,
} from "@/sanity/lib/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const client = getClient();
    const [articles, categories, authors] = await Promise.all([
      client.fetch<{ slug: string; _updatedAt?: string }[]>(allArticleSlugsQuery),
      client.fetch<{ slug: string }[]>(allCategorySlugsQuery),
      client.fetch<{ slug: string }[]>(allAuthorSlugsQuery),
    ]);

    const articleUrls: MetadataRoute.Sitemap =
      articles?.map((a) => ({
        url: `${base}/blog/${a.slug}`,
        lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) ?? [];

    const categoryUrls: MetadataRoute.Sitemap =
      categories?.map((c) => ({
        url: `${base}/blog/category/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })) ?? [];

    const authorUrls: MetadataRoute.Sitemap =
      authors?.map((a) => ({
        url: `${base}/authors/${a.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      })) ?? [];

    return [...staticRoutes, ...articleUrls, ...categoryUrls, ...authorUrls];
  } catch {
    return staticRoutes;
  }
}
