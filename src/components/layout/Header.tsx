"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

import { cn } from "@/lib/cn";

import { MobileMenu } from "./MobileMenu";

/** DESIGN.md — hides on scroll down, reappears on scroll up; subtle glass (≈10px blur). */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScroll.current;
      lastScroll.current = y;
      if (y < 48) {
        setHidden(false);
        return;
      }
      if (delta > 6 && y > 80) setHidden(true);
      else if (delta < -6) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-[10px] transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0 shadow-soft",
      )}
    >
      <div className="mx-auto hidden h-[3.75rem] max-w-content grid-cols-[1fr_auto_1fr] items-center gap-4 px-gutter md:grid">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-primary lg:text-2xl">
          {siteConfig.name}
        </Link>
        <ul className="flex items-center justify-center gap-10 text-sm font-medium">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div aria-hidden />
      </div>

      <div className="mx-auto flex h-[3.75rem] max-w-content items-center justify-between px-gutter md:hidden">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-primary">
          {siteConfig.name}
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
