"use client";

import Link from "next/link";
import { useState } from "react";

import { mainNav } from "@/config/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="rounded-lg border border-border bg-card/90 px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-primary shadow-soft backdrop-blur-[10px]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          className="absolute right-0 top-full z-50 mt-2 flex max-h-[min(70vh,28rem)] w-[min(calc(100vw-48px),20rem)] flex-col gap-1 overflow-auto rounded-lg border border-border bg-card p-4 text-[15px] shadow-elevated"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2.5 text-muted-foreground transition hover:bg-muted hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
