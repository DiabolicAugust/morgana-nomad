import Link from "next/link";

import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-section border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-content gap-12 px-gutter py-14 text-sm sm:grid-cols-2">
        <div>
          <p className="font-display text-xl font-semibold text-primary">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-editorial-label mb-5 text-muted-foreground">Explore</p>
          <ul className="space-y-3 text-muted-foreground">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-primary hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="transition hover:text-primary hover:underline underline-offset-4">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-editorial-label text-muted-foreground">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
