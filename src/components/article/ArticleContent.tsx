import Image from "next/image";
import Link from "next/link";

import { portableTextHeadings } from "@/lib/portable-text-headings";
import { estimateReadingMinutes } from "@/lib/reading-time";
import { canonicalArticlePath } from "@/lib/seo";
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
  heroImage?: { src: string; alt: string };
}) {
  const headings = portableTextHeadings(article.body as unknown[] | undefined);
  const sanityHero = urlForImage(article.featuredImage)?.width(1920).height(1080).url();
  const hero = heroImage?.src ?? sanityHero;
  const heroAlt =
    heroImage?.alt ?? (article.featuredImage as { alt?: string } | undefined)?.alt ?? article.title;

  const readMinutes = estimateReadingMinutes(article.body as unknown[], article.faqs);

  const categoryChips = article.categories ?? [];
  const primaryCategory = categoryChips[0];
  const restCategories = categoryChips.slice(1);

  const topicTags = Array.from(new Set([...(article.tags ?? []), ...(article.keywords ?? [])])).filter(
    (t): t is string => typeof t === "string" && t.trim().length > 0,
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const metaRow = (
    <>
      {article.author ? (
        article.author.slug ? (
          <Link href={`/authors/${article.author.slug}`} className="uppercase hover:underline hover:brightness-125">
            {article.author.name}
          </Link>
        ) : (
          <span className="uppercase">{article.author.name}</span>
        )
      ) : null}
      {article.author ? <span aria-hidden>·</span> : null}
      <time dateTime={article.publishedAt}>{formattedDate}</time>
      <span aria-hidden>·</span>
      <span>{readMinutes} min read</span>
    </>
  );

  const chipMuted = "rounded-md bg-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-chip-foreground";
  const heroChipSecondary =
    "inline-flex rounded-md bg-accent px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-accent-foreground shadow-sm";

  return (
    <>
      <ReadingProgress />
      <Breadcrumbs items={breadcrumbItems} />

      {hero ? (
        <>
          <section className="article-hero-bleed mb-12 md:mb-16 lg:mb-section">
            <div className="relative isolate min-h-[min(92vw,460px)] w-full md:min-h-[min(70vw,520px)] md:aspect-[21/11] lg:aspect-[21/9] lg:max-h-[min(85vh,640px)]">
              <Image
                src={hero}
                alt={heroAlt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 pt-32 sm:px-10 lg:mx-auto lg:max-w-content lg:px-gutter xl:pb-14">
                <div className="flex max-w-[40rem] flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {primaryCategory ? (
                      <Link href={`/blog/category/${primaryCategory.slug}`} className={heroChipSecondary}>
                        {primaryCategory.title}
                      </Link>
                    ) : (
                      <span className={heroChipSecondary}>Article</span>
                    )}
                    {restCategories.map((c) => (
                      <Link key={c.slug} href={`/blog/category/${c.slug}`} className="rounded-md bg-white/14 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/92 backdrop-blur-[2px] hover:bg-white/22">
                        {c.title}
                      </Link>
                    ))}
                  </div>
                  <h1 className="font-display text-balance text-[2.125rem] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-display-2xl">
                    {article.title}
                  </h1>
                  {article.excerpt ? (
                    <p className="max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                      {article.excerpt}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/20 pt-4 font-sans text-[11px] font-medium uppercase tracking-[0.07em] text-white/85">
                    {metaRow}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <header className="mb-10 max-w-[42rem]">
          <div className="mb-4 flex flex-wrap gap-2">
            {categoryChips.map((c) => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`} className={`${chipMuted} hover:opacity-90`}>
                {c.title}
              </Link>
            ))}
          </div>
          <h1 className="font-display text-balance text-display-xl text-primary sm:text-5xl md:text-display-2xl lg:text-[2.75rem]">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-6 text-pretty text-lg leading-[1.7] text-muted-foreground sm:text-xl">{article.excerpt}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-6 text-editorial-label text-muted-foreground">
            {metaRow}
          </div>
        </header>
      )}

      <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(180px,13rem)]">
        <div className="mx-auto min-w-0 w-full max-w-[42rem] lg:mx-0">
          {headings.length ? (
            <div className="mb-12 lg:hidden">
              <TableOfContents headings={headings} />
            </div>
          ) : null}
          {article.body ? <RichTextRenderer value={article.body as unknown[]} /> : null}
          {topicTags.length ? (
            <footer className="mt-14 flex flex-wrap gap-2 border-t border-border pt-10">
              <span className="sr-only">Topics</span>
              {topicTags.slice(0, 12).map((tag) => (
                <span key={tag} className={`${chipMuted} pointer-events-none cursor-default bg-chip/95`}>
                  {tag}
                </span>
              ))}
            </footer>
          ) : null}
          {article.faqs?.length ? (
            <section className="mt-section border-t border-border pt-section" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display text-headline-md text-primary mb-10">
                Frequently asked questions
              </h2>
              <dl className="space-y-10">
                {article.faqs.map((f) => (
                  <div key={f._key ?? f.question}>
                    <dt className="font-display text-[1.0625rem] font-semibold text-primary">{f.question}</dt>
                    <dd className="mt-3 text-[17px] leading-[1.7] text-muted-foreground whitespace-pre-wrap">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          <div className="mt-section pt-10">
            <ShareButtons title={article.title} path={canonicalArticlePath(article.canonicalPath, article.slug)} />
          </div>
          {article.relatedArticles?.length ? (
            <section className="mt-section border-t border-border pt-section" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-12 font-display text-headline-lg text-primary tracking-tight">
                Continue your journey
              </h2>
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {article.relatedArticles.map((a) => (
                  <ArticleCard key={a._id} article={a} />
                ))}
              </div>
            </section>
          ) : null}
          {article.author ? <AuthorBio author={article.author} /> : null}
        </div>

        <div className="mx-auto hidden h-fit w-full max-w-xs space-y-8 lg:block lg:mx-0 lg:max-w-none">
          <TableOfContents headings={headings} />
        </div>
      </div>

    </>
  );
}
