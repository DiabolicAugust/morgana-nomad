import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article/ArticleCard";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { truncate } from "@/lib/seo";
import { getClient } from "@/sanity/lib/client";
import {
  allCategorySlugsQuery,
  articlesByCategorySlugQuery,
  categoryArticleCountQuery,
  categoryBySlugQuery,
} from "@/sanity/lib/queries";
import type { ArticleCard as ArticleCardData, CategoryRef } from "@/types/sanity";

export const revalidate = 120;

const PAGE_SIZE = 9;

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  try {
    const client = getClient();
    const rows = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery);
    return rows?.map((r) => ({ category: r.slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Pick<Props, "params">) {
  const { category: categorySlug } = await params;
  try {
    const client = getClient();
    const cat = await client.fetch<CategoryRef | null>(categoryBySlugQuery, { slug: categorySlug });
    if (!cat) {
      return createMetadata({
        title: "Category",
        description: "Browse articles by category.",
        path: `/blog/category/${categorySlug}`,
        noIndex: true,
      });
    }
    return createMetadata({
      title: `${cat.title} articles`,
      description: truncate(cat.description ?? `Articles filed under ${cat.title}.`, 160),
      path: `/blog/category/${cat.slug}`,
    });
  } catch {
    return createMetadata({
      title: "Category",
      description: "Browse articles.",
      path: `/blog/category/${categorySlug}`,
      noIndex: true,
    });
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const client = getClient();
  let category: CategoryRef | null = null;
  try {
    category = await client.fetch<CategoryRef | null>(categoryBySlugQuery, { slug: categorySlug });
  } catch {
    category = null;
  }
  if (!category) notFound();

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  let articles: ArticleCardData[] = [];
  let total = 0;
  try {
    [articles, total] = await Promise.all([
      client.fetch<ArticleCardData[]>(articlesByCategorySlugQuery, {
        categorySlug,
        start,
        end,
      }),
      client.fetch<number>(categoryArticleCountQuery, { categorySlug }),
    ]);
  } catch {
    articles = [];
    total = 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const siteUrl = siteConfig.url;

  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: category.title, path: `/blog/category/${category.slug}` },
        ]}
        siteUrl={siteUrl}
      />
      <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
      {category.description ? <p className="mt-3 text-muted-foreground max-w-2xl">{category.description}</p> : null}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {articles?.map((a) => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav className="mt-12 flex justify-center gap-2 text-sm" aria-label="Pagination">
          {page > 1 ? (
            <Link
              href={`/blog/category/${categorySlug}?page=${page - 1}`}
              className="rounded-full border border-border px-4 py-2 hover:bg-muted"
              rel="prev"
            >
              Previous
            </Link>
          ) : null}
          <span className="rounded-full border border-border px-4 py-2 text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/blog/category/${categorySlug}?page=${page + 1}`}
              className="rounded-full border border-border px-4 py-2 hover:bg-muted"
              rel="next"
            >
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
