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
  const img = urlForImage(article.featuredImage)?.width(900).height(600).url();
  const href = `/blog/${article.slug}`;

  const tagClass =
    "rounded-md bg-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-chip-foreground transition hover:opacity-90";

  const imageEl = (
    <Link
      href={href}
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-lg bg-muted",
        variant === "featured" && "aspect-[3/2] md:w-1/2 md:min-h-[240px]",
        variant === "default" && "aspect-[3/2] w-full",
        variant === "compact" && "h-20 w-28 rounded-lg",
        variant === "horizontal" && "aspect-[3/2] w-full rounded-lg sm:w-64 sm:min-h-[180px]",
      )}
    >
      {img ? (
        <Image
          src={img}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 480px"
        />
      ) : null}
    </Link>
  );

  const body = (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2 text-left",
        variant === "default" && "p-5",
        variant === "featured" && "p-6 md:w-1/2 md:justify-center md:py-8 md:pl-8",
        variant === "compact" && "flex-1 py-0",
        variant === "horizontal" && "flex-1 justify-center py-0 sm:py-2",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {article.categories?.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}`} className={tagClass}>
            {c.title}
          </Link>
        ))}
        {article.city ? <span className={cn(tagClass, "cursor-default")}>{article.city.name}</span> : null}
      </div>
      <h2
        className={cn(
          "font-display font-semibold tracking-tight text-primary transition-colors group-hover:text-accent",
          variant === "featured" ? "text-headline-lg md:text-3xl lg:text-[2.25rem]" : "text-xl",
          variant === "compact" && "text-base leading-snug",
        )}
      >
        <Link href={href}>{article.title}</Link>
      </h2>
      {variant !== "compact" ? (
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.excerpt}</p>
      ) : (
        <p className="line-clamp-2 text-xs text-muted-foreground">{article.excerpt}</p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-editorial-label text-muted-foreground">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        {article.author ? (
          article.author.slug ? (
            <Link href={`/authors/${article.author.slug}`} className="uppercase hover:text-accent">
              {article.author.name}
            </Link>
          ) : (
            <span className="uppercase">{article.author.name}</span>
          )
        ) : null}
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-elevated",
        variant === "default" && "flex flex-col",
        variant === "featured" && "flex flex-col md:flex-row md:items-stretch",
        variant === "compact" && "flex flex-row items-start gap-4 p-3",
        variant === "horizontal" && "flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch",
      )}
    >
      {imageEl}
      {body}
    </article>
  );
}
