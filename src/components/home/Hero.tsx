import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-border/80 bg-gradient-to-br from-card via-muted/40 to-muted shadow-soft">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 sm:py-24 lg:py-28">
        <p className="text-editorial-label text-accent">Digital nomads · Poland</p>
        <h1 className="font-display mt-5 text-balance text-display-xl text-primary sm:text-5xl md:text-display-2xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-8 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {siteConfig.description}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex h-12 min-h-[2.75rem] items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            Read the guides
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/80 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-soft"
          >
            About us
          </Link>
        </div>
      </div>
    </section>
  );
}
