import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-20">
      <div className="relative mx-auto w-full max-w-[900px] overflow-hidden rounded-lg border border-border bg-gradient-to-b from-card to-muted shadow-soft">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-10 sm:py-24 lg:py-28">
          <p className="text-editorial-label text-accent">Digital nomads · Poland</p>
          <h1 className="font-display mt-5 text-balance text-display-xl text-primary sm:text-5xl md:text-display-2xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-10 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex h-12 min-h-[2.75rem] items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              Read the guides
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-foreground/35 bg-transparent px-8 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-foreground/70 hover:bg-foreground/5"
            >
              About us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
