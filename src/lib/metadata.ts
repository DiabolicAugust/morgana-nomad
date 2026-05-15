import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { absoluteUrl } from "./seo";

export function createMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path, siteConfig.url);
  const title = input.title.includes(siteConfig.name)
    ? input.title
    : `${input.title} | ${siteConfig.name}`;

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: input.ogImage
        ? [{ url: input.ogImage, width: 1200, height: 630, alt: title }]
        : [{ url: absoluteUrl("/opengraph-image", siteConfig.url), width: 1200, height: 630 }],
    },
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
