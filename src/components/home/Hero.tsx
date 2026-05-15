import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/80 to-background px-6 py-16 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Digital nomads · Poland</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-balance">{siteConfig.tagline}</h1>
        <p className="mt-6 text-lg text-muted-foreground text-balance">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Read the guides
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium hover:bg-muted transition-colors"
          >
            About the project
          </Link>
        </div>
      </div>
    </section>
  );
}
