import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article/ArticleCard";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { truncate } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { getClient } from "@/sanity/lib/client";
import { allAuthorSlugsQuery, articlesByAuthorSlugQuery, authorBySlugQuery } from "@/sanity/lib/queries";
import type { ArticleCard as ArticleCardData, AuthorFull } from "@/types/sanity";

export const revalidate = 120;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  try {
    const client = getClient();
    const rows = await client.fetch<{ slug: string }[]>(allAuthorSlugsQuery);
    return rows?.map((r) => ({ slug: r.slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  try {
    const client = getClient();
    const author = await client.fetch<AuthorFull | null>(authorBySlugQuery, { slug: params.slug });
    if (!author) {
      return createMetadata({
        title: "Author",
        description: "Author profile.",
        path: `/authors/${params.slug}`,
        noIndex: true,
      });
    }
    const desc = truncate(author.bio ?? `${author.name} writes for Poland Nomad.`, 160);
    return createMetadata({
      title: `${author.name} — Author`,
      description: desc,
      path: `/authors/${author.slug}`,
    });
  } catch {
    return createMetadata({
      title: "Author",
      description: "Author profile.",
      path: `/authors/${params.slug}`,
      noIndex: true,
    });
  }
}

export default async function AuthorPage({ params }: Props) {
  const client = getClient();
  let author: AuthorFull | null = null;
  let articles: ArticleCardData[] = [];
  try {
    author = await client.fetch<AuthorFull | null>(authorBySlugQuery, { slug: params.slug });
    if (author) {
      articles = await client.fetch<ArticleCardData[]>(articlesByAuthorSlugQuery, { authorSlug: params.slug });
    }
  } catch {
    author = null;
  }
  if (!author) notFound();

  const photo = urlForImage(author.photo)?.width(400).height(400).url();
  const siteUrl = siteConfig.url;

  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: author.name, path: `/authors/${author.slug}` },
        ]}
        siteUrl={siteUrl}
      />
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {photo ? (
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={photo}
              alt={(author.photo as { alt?: string } | undefined)?.alt ?? author.name}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
        ) : null}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{author.name}</h1>
          {author.role ? <p className="mt-2 text-accent font-medium">{author.role}</p> : null}
          {author.bio ? <p className="mt-4 text-muted-foreground whitespace-pre-wrap max-w-2xl">{author.bio}</p> : null}
          {author.credentials?.length ? (
            <ul className="mt-4 text-sm list-disc pl-5 text-muted-foreground space-y-1 max-w-xl">
              {author.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {author.twitter ? (
              <a href={author.twitter} className="text-accent hover:underline" rel="noopener noreferrer">
                Twitter / X
              </a>
            ) : null}
            {author.linkedin ? (
              <a href={author.linkedin} className="text-accent hover:underline" rel="noopener noreferrer">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <section className="mt-14" aria-labelledby="author-articles">
        <h2 id="author-articles" className="text-2xl font-semibold mb-6">
          Articles by {author.name}
        </h2>
        {articles?.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No published articles yet.</p>
        )}
      </section>
    </div>
  );
}
