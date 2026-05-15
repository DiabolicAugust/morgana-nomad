import Link from "next/link";

import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
