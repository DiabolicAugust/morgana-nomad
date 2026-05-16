import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Poland Nomad",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="font-display mt-2 text-headline-lg tracking-tight text-primary">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The link may be broken or the page was removed. Try the homepage or blog index.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="text-accent font-medium hover:underline">
          Home
        </Link>
        <Link href="/blog" className="text-accent font-medium hover:underline">
          Blog
        </Link>
      </div>
    </div>
  );
}
