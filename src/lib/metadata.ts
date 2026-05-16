import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { absoluteUrl } from "./seo";

export type CreateMetadataArticleOg = {
  publishedAt?: string;
  updatedAt?: string;
  /** First category title, if any — maps to OG `article:section`. */
  section?: string;
  /** Display names for OG `article:tag` / parity with metadata. */
  tags?: string[];
  authorNames?: string[];
};

export function createMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  /** When set, emits `og:type article` plus times/tags for richer sharing. */
  articleOg?: CreateMetadataArticleOg;
}): Metadata {
  const url = absoluteUrl(input.path, siteConfig.url);
  const title = input.title.includes(siteConfig.name)
    ? input.title
    : `${input.title} | ${siteConfig.name}`;
  const isArticleOg = !!input.articleOg?.publishedAt;
  const defaultOgImageAlt = `${siteConfig.name} — ${title}`;

  const openGraph: Metadata["openGraph"] = {
    title,
    description: input.description,
    url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: isArticleOg ? "article" : "website",
    images: input.ogImage
      ? [{ url: input.ogImage, width: 1200, height: 630, alt: defaultOgImageAlt }]
      : [
          {
            url: absoluteUrl("/opengraph-image", siteConfig.url),
            width: 1200,
            height: 630,
            alt: defaultOgImageAlt,
          },
        ],
    ...(isArticleOg && input.articleOg
      ? {
          publishedTime: input.articleOg.publishedAt,
          modifiedTime: input.articleOg.updatedAt ?? input.articleOg.publishedAt,
          ...(input.articleOg.authorNames?.length
            ? { authors: input.articleOg.authorNames }
            : {}),
          ...(input.articleOg.section ? { section: input.articleOg.section } : {}),
          ...(input.articleOg.tags?.length ? { tags: input.articleOg.tags } : {}),
        }
      : {}),
  };

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: input.ogImage ? [input.ogImage] : [absoluteUrl("/opengraph-image", siteConfig.url)],
    },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
  };
}

export function articleOgImageUrl(title: string, description: string) {
  const params = new URLSearchParams({ title, description });
  return absoluteUrl(`/api/og?${params.toString()}`, siteConfig.url);
}
