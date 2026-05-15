import type { ArticleFull } from "@/types/sanity";

import { absoluteUrl } from "./seo";

export function articleJsonLd(article: ArticleFull, siteUrl: string, heroImageUrl?: string) {
  const url = article.canonicalPath
    ? absoluteUrl(article.canonicalPath, siteUrl)
    : absoluteUrl(`/blog/${article.slug}`, siteUrl);

  const imageUrl =
    heroImageUrl ??
    absoluteUrl(
      `/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(
        (article.seoDescription ?? article.excerpt).slice(0, 140),
      )}`,
      siteUrl,
    );

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: [imageUrl],
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          ...(article.author.slug
            ? { url: absoluteUrl(`/authors/${article.author.slug}`, siteUrl) }
            : {}),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Poland Nomad",
      url: siteUrl,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Poland Nomad",
    url: siteUrl,
    description:
      "Practical guides for remote workers and digital nomads living in Poland — visas, cities, and cost of living.",
  };
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Poland Nomad",
    url: siteUrl,
  };
}
