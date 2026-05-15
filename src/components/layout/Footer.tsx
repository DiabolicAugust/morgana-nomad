import Link from "next/link";

import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-2 text-sm">
        <div>
          <p className="font-semibold text-foreground">{siteConfig.name}</p>
          <p className="mt-2 text-muted-foreground max-w-xs">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-3">Explore</p>
          <ul className="space-y-2 text-muted-foreground">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
