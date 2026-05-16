import type { ArticleCard as ArticleCardType } from "@/types/sanity";

import { ArticleCard } from "@/components/article/ArticleCard";
import Link from "next/link";

export function FeaturedArticles({ articles }: { articles: ArticleCardType[] }) {
  if (!articles.length) {
    return (
      <section aria-labelledby="featured-heading">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="featured-heading" className="font-display text-headline-lg tracking-tight text-primary">
            Latest articles
          </h2>
        </div>
        <p className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
          We&apos;re preparing new guides. Check back soon.
        </p>
      </section>
    );
  }

  const [first, ...rest] = articles;

  return (
    <section aria-labelledby="featured-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="featured-heading" className="font-display text-headline-lg tracking-tight text-primary">
          Latest articles
        </h2>
        <Link
          href="/blog"
          className="text-sm font-semibold uppercase tracking-wider text-accent underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-10 md:space-y-12">
        <ArticleCard article={first} variant="featured" />
        {rest.length ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
