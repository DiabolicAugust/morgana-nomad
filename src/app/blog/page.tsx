import Link from "next/link";

import { ArticleCard } from "@/components/article/ArticleCard";
import { createMetadata } from "@/lib/metadata";
import { getClient } from "@/sanity/lib/client";
import { articlesCountQuery, articlesPaginatedQuery } from "@/sanity/lib/queries";
import type { ArticleCard as ArticleCardType } from "@/types/sanity";

const PAGE_SIZE = 9;

export const metadata = createMetadata({
  title: "Blog",
  description: "Articles on visas, cities, budgets, and remote work in Poland for digital nomads.",
  path: "/blog",
});

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  let articles: ArticleCardType[] = [];
  let total = 0;
  try {
    const client = getClient();
    [articles, total] = await Promise.all([
      client.fetch<ArticleCardType[]>(articlesPaginatedQuery, { start, end }),
      client.fetch<number>(articlesCountQuery),
    ]);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[sanity] Blog index fetch failed:", err);
    }
    articles = [];
    total = 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Deep dives on Polish cities, immigration rules, monthly budgets, and how to build a comfortable remote-work
        rhythm here.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {articles.map((a) => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav className="mt-12 flex justify-center gap-2 text-sm" aria-label="Pagination">
          {page > 1 ? (
            <Link
              href={`/blog?page=${page - 1}`}
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
              href={`/blog?page=${page + 1}`}
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
