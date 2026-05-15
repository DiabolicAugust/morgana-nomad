import Link from "next/link";

import type { CategoryRef } from "@/types/sanity";

export function Categories({ categories }: { categories: CategoryRef[] }) {
  if (!categories.length) return null;
  return (
    <section className="mt-16" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-2xl font-bold tracking-tight mb-6">
        Browse by topic
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/category/${c.slug}`}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="font-semibold text-lg">{c.title}</h3>
            {c.description ? <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.description}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
