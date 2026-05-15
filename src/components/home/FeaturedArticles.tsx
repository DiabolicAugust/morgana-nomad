import type { ArticleCard as ArticleCardType } from "@/types/sanity";

import { ArticleCard } from "@/components/article/ArticleCard";
import Link from "next/link";

export function FeaturedArticles({ articles }: { articles: ArticleCardType[] }) {
  if (!articles.length) {
    return (
      <section className="mt-16" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 id="featured-heading" className="text-2xl font-bold tracking-tight">
            Latest articles
          </h2>
        </div>
        <p className="text-muted-foreground rounded-xl border border-dashed border-border p-8 text-center">
          We&apos;re preparing new guides. Check back soon.
        </p>
      </section>
    );
  }

  const [first, ...rest] = articles;

  return (
    <section className="mt-16" aria-labelledby="featured-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="featured-heading" className="text-2xl font-bold tracking-tight">
          Latest articles
        </h2>
        <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-8">
        <ArticleCard article={first} variant="featured" />
        {rest.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
