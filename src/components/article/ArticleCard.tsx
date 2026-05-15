import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import type { ArticleCard as ArticleCardType } from "@/types/sanity";

export function ArticleCard({
  article,
  variant = "default",
}: {
  article: ArticleCardType;
  variant?: "default" | "featured" | "compact" | "horizontal";
}) {
  const img = urlForImage(article.featuredImage)?.width(900).height(506).url();
  const href = `/blog/${article.slug}`;

  const imageEl = (
    <Link
      href={href}
      className={cn(
        "relative block shrink-0 overflow-hidden bg-muted",
        variant === "featured" && "aspect-[16/10] md:w-1/2 md:min-h-[240px]",
        variant === "default" && "aspect-[16/10] w-full",
        variant === "compact" && "w-28 h-20 rounded-lg",
        variant === "horizontal" && "aspect-[16/10] w-full sm:w-64 sm:min-h-[180px] rounded-lg",
      )}
    >
      {img ? (
        <Image
          src={img}
          alt={article.title}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 480px"
        />
      ) : null}
    </Link>
  );

  const body = (
    <div
      className={cn(
        "flex flex-col gap-2 min-w-0",
        variant === "default" && "p-4",
        variant === "featured" && "p-6 md:w-1/2 md:justify-center",
        variant === "compact" && "flex-1 py-0",
        variant === "horizontal" && "flex-1 justify-center py-0 sm:py-2",
      )}
    >
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {article.categories?.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/category/${c.slug}`}
            className="rounded-full bg-muted px-2 py-0.5 hover:text-accent"
          >
            {c.title}
          </Link>
        ))}
        {article.city ? (
          <span className="rounded-full border border-border px-2 py-0.5">{article.city.name}</span>
        ) : null}
      </div>
      <h2
        className={cn(
          "font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors",
          variant === "featured" ? "text-2xl md:text-3xl" : "text-lg",
          variant === "compact" && "text-base",
        )}
      >
        <Link href={href}>{article.title}</Link>
      </h2>
      {variant !== "compact" ? (
        <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
      ) : (
        <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        {article.author ? (
          article.author.slug ? (
            <Link href={`/authors/${article.author.slug}`} className="hover:text-accent">
              {article.author.name}
            </Link>
          ) : (
            <span>{article.author.name}</span>
          )
        ) : null}
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        "group rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md",
        variant === "default" && "flex flex-col",
        variant === "featured" && "flex flex-col md:flex-row md:items-stretch",
        variant === "compact" && "flex flex-row gap-4 items-start p-3",
        variant === "horizontal" && "flex flex-col sm:flex-row gap-4 sm:items-stretch p-4",
      )}
    >
      {imageEl}
      {body}
    </article>
  );
}
