"use client";

import { useState } from "react";

import { mainNav } from "@/config/nav";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          className="absolute left-0 right-0 top-14 border-b border-border bg-background px-4 py-4 shadow-lg flex flex-col gap-3 text-sm"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-1"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/studio" className="py-1 text-muted-foreground" onClick={() => setOpen(false)}>
            Studio
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
