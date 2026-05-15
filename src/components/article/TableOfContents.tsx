"use client";

import { cn } from "@/lib/cn";

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
}) {
  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-border p-4 bg-card">
      <p className="text-sm font-semibold mb-3">On this page</p>
      <ol className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
            <a href={`#${h.id}`} className="text-muted-foreground hover:text-accent transition-colors">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
