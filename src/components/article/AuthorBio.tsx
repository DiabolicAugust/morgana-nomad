import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { AuthorFull } from "@/types/sanity";

export function AuthorBio({ author }: { author: AuthorFull }) {
  const photo = urlForImage(author.photo)?.width(160).height(160).url();
  return (
    <aside className="mt-12 rounded-xl border border-border p-6 bg-card">
      <div className="flex flex-col sm:flex-row gap-6">
        {photo ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={photo}
              alt={(author.photo as { alt?: string } | undefined)?.alt ?? author.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">About the author</p>
          <p className="text-xl font-semibold mt-1">
            {author.slug ? (
              <Link href={`/authors/${author.slug}`} className="hover:text-accent">
                {author.name}
              </Link>
            ) : (
              <span className="text-foreground">{author.name}</span>
            )}
          </p>
          {author.role ? <p className="text-sm text-muted-foreground mt-1">{author.role}</p> : null}
          {author.bio ? <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{author.bio}</p> : null}
          {author.credentials?.length ? (
            <ul className="mt-3 text-sm list-disc pl-5 text-muted-foreground space-y-1">
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
    </aside>
  );
}
