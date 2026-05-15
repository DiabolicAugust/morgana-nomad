import Image from "next/image";
import Link from "next/link";

import { portableTextHeadings } from "@/lib/portable-text-headings";
import { urlForImage } from "@/sanity/lib/image";
import type { ArticleFull } from "@/types/sanity";

import { ArticleCard } from "./ArticleCard";
import { AuthorBio } from "./AuthorBio";
import { Breadcrumbs } from "./Breadcrumbs";
import { ReadingProgress } from "./ReadingProgress";
import { RichTextRenderer } from "./RichTextRenderer";
import { ShareButtons } from "./ShareButtons";
import { TableOfContents } from "./TableOfContents";

export function ArticleContent({
  article,
  breadcrumbItems,
  heroImage,
}: {
  article: ArticleFull;
  breadcrumbItems: { label: string; href: string }[];
  /** Static hero when there is no Sanity `featuredImage` (e.g. offline demo article). */
  heroImage?: { src: string; alt: string };
}) {
  const headings = portableTextHeadings(article.body as unknown[] | undefined);
  const sanityHero = urlForImage(article.featuredImage)?.width(1200).height(630).url();
  const hero = heroImage?.src ?? sanityHero;
  const heroAlt =
    heroImage?.alt ?? (article.featuredImage as { alt?: string } | undefined)?.alt ?? article.title;

  return (
    <>
      <ReadingProgress />
      <Breadcrumbs items={breadcrumbItems} />
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
          {article.categories?.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="hover:text-accent">
              {c.title}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{article.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground text-balance">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {article.author ? (
            <>
              <span aria-hidden>·</span>
              {article.author.slug ? (
                <Link href={`/authors/${article.author.slug}`} className="hover:text-accent">
                  {article.author.name}
                </Link>
              ) : (
                <span className="text-foreground">{article.author.name}</span>
              )}
            </>
          ) : null}
        </div>
      </header>
      {hero ? (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={hero}
            alt={heroAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      ) : null}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          {article.body ? <RichTextRenderer value={article.body as unknown[]} /> : null}
          {article.faqs?.length ? (
            <section className="mt-12 border-t border-border pt-10" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-semibold mb-6">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {article.faqs.map((f) => (
                  <div key={f._key ?? f.question}>
                    <dt className="font-medium text-foreground">{f.question}</dt>
                    <dd className="mt-2 text-muted-foreground whitespace-pre-wrap">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          <div className="mt-10">
            <ShareButtons title={article.title} path={`/blog/${article.slug}`} />
          </div>
          {article.relatedArticles?.length ? (
            <section className="mt-14 border-t border-border pt-10" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-semibold mb-6">
                Related guides
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {article.relatedArticles.map((a) => (
                  <ArticleCard key={a._id} article={a} variant="compact" />
                ))}
              </div>
            </section>
          ) : null}
          {article.author ? <AuthorBio author={article.author} /> : null}
        </div>
        <div className="lg:sticky lg:top-28 h-fit space-y-8">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </>
  );
}
