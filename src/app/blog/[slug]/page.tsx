import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { siteConfig } from "@/config/site";
import { articleOgImageUrl, createMetadata } from "@/lib/metadata";
import { canonicalArticlePath, truncate } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { getClient } from "@/sanity/lib/client";
import { allArticleSlugsQuery, articleBySlugQuery } from "@/sanity/lib/queries";
import type { ArticleFull } from "@/types/sanity";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const client = getClient();
    const rows = await client.fetch<{ slug: string }[]>(allArticleSlugsQuery);
    return rows?.map((r) => ({ slug: r.slug })) ?? [];
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] generateStaticParams failed:", err);
    }
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const client = getClient();
    const article = await client.fetch<ArticleFull | null>(articleBySlugQuery, { slug });
    if (!article) {
      return createMetadata({
        title: "Article",
        description: siteConfig.description,
        path: `/blog/${slug}`,
        noIndex: true,
      });
    }
    const title = article.seoTitle ?? article.title;
    const description = truncate(article.seoDescription ?? article.excerpt, 160);
    const og = articleOgImageUrl(article.title, (article.seoDescription ?? article.excerpt).slice(0, 140));
    const path = canonicalArticlePath(article.canonicalPath, article.slug);
    const tagList = [
      ...(article.tags ?? []),
      ...(article.keywords ?? []).filter((k): k is string => typeof k === "string"),
    ];
    return createMetadata({
      title,
      description,
      path,
      ogImage: og,
      articleOg: {
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        section: article.categories?.[0]?.title,
        tags: tagList.length ? Array.from(new Set(tagList)).slice(0, 16) : undefined,
        authorNames: article.author?.name ? [article.author.name] : undefined,
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Article metadata fetch failed:", err);
    }
    return createMetadata({
      title: "Blog",
      description: siteConfig.description,
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: ArticleFull | null = null;
  try {
    const client = getClient();
    article = await client.fetch<ArticleFull | null>(articleBySlugQuery, { slug });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Article page fetch failed:", err);
    }
    article = null;
  }
  if (!article) notFound();

  const siteUrl = siteConfig.url;
  const heroImageUrl = urlForImage(article.featuredImage)?.width(1200).height(630).url();
  const articlePath = canonicalArticlePath(article.canonicalPath, article.slug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path: articlePath },
  ];

  return (
    <article>
      <ArticleSchema article={article} siteUrl={siteUrl} heroImageUrl={heroImageUrl} />
      <BreadcrumbSchema items={breadcrumbs} siteUrl={siteUrl} />
      {article.faqs?.length ? <FAQSchema faqs={article.faqs} /> : null}
      <ArticleContent
        article={article}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title, href: articlePath },
        ]}
      />
    </article>
  );
}
