import Link from "next/link";

import type { CategoryRef } from "@/types/sanity";

export function Categories({ categories }: { categories: CategoryRef[] }) {
  if (!categories.length) return null;
  return (
    <section aria-labelledby="categories-heading">
      <h2
        id="categories-heading"
        className="mb-10 font-display text-headline-lg tracking-tight text-primary"
      >
        Browse by topic
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/category/${c.slug}`}
            className="rounded-lg border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <h3 className="font-display text-xl font-semibold text-primary">{c.title}</h3>
            {c.description ? (
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
