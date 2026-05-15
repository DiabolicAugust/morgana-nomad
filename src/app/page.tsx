import { Categories } from "@/components/home/Categories";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld-builders";
import { getClient } from "@/sanity/lib/client";
import { allCategoriesQuery, featuredArticlesQuery } from "@/sanity/lib/queries";
import type { ArticleCard, CategoryRef } from "@/types/sanity";

async function loadHome() {
  try {
    const client = getClient();
    const [articles, categories] = await Promise.all([
      client.fetch<ArticleCard[]>(featuredArticlesQuery),
      client.fetch<CategoryRef[]>(allCategoriesQuery),
    ]);
    return { articles: articles ?? [], categories: categories ?? [] };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Home page fetch failed:", err);
    }
    return { articles: [] as ArticleCard[], categories: [] as CategoryRef[] };
  }
}

export default async function HomePage() {
  const { articles, categories } = await loadHome();
  const siteUrl = siteConfig.url;

  return (
    <>
      <JsonLd data={organizationJsonLd(siteUrl)} />
      <JsonLd data={websiteJsonLd(siteUrl)} />
      <Hero />
      <FeaturedArticles articles={articles} />
      <Categories categories={categories} />
      <Newsletter />
    </>
  );
}
