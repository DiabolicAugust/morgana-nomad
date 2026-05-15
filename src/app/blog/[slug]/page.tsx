import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { siteConfig } from "@/config/site";
import { articleOgImageUrl, createMetadata } from "@/lib/metadata";
import { truncate } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { getClient } from "@/sanity/lib/client";
import { allArticleSlugsQuery, articleBySlugQuery } from "@/sanity/lib/queries";
import type { ArticleFull } from "@/types/sanity";

export const revalidate = 120;

type Props = { params: { slug: string } };

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
  try {
    const client = getClient();
    const article = await client.fetch<ArticleFull | null>(articleBySlugQuery, { slug: params.slug });
    if (!article) {
      return createMetadata({
        title: "Article",
        description: siteConfig.description,
        path: `/blog/${params.slug}`,
        noIndex: true,
      });
    }
    const title = article.seoTitle ?? article.title;
    const description = truncate(article.seoDescription ?? article.excerpt, 160);
    const og = articleOgImageUrl(article.title, (article.seoDescription ?? article.excerpt).slice(0, 140));
    return createMetadata({
      title,
      description,
      path: article.canonicalPath ?? `/blog/${article.slug}`,
      ogImage: og,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Article metadata fetch failed:", err);
    }
    return createMetadata({
      title: "Blog",
      description: siteConfig.description,
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }
}

export default async function ArticlePage({ params }: Props) {
  let article: ArticleFull | null = null;
  try {
    const client = getClient();
    article = await client.fetch<ArticleFull | null>(articleBySlugQuery, { slug: params.slug });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Article page fetch failed:", err);
    }
    article = null;
  }
  if (!article) notFound();

  const siteUrl = siteConfig.url;
  const heroImageUrl = urlForImage(article.featuredImage)?.width(1200).height(630).url();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
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
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />
    </article>
  );
}
