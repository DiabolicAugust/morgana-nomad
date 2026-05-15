import type { ArticleFull } from "@/types/sanity";

import { articleJsonLd } from "@/lib/jsonld-builders";

import { JsonLd } from "./JsonLd";

export function ArticleSchema({
  article,
  siteUrl,
  heroImageUrl,
}: {
  article: ArticleFull;
  siteUrl: string;
  heroImageUrl?: string;
}) {
  return <JsonLd data={articleJsonLd(article, siteUrl, heroImageUrl)} />;
}
