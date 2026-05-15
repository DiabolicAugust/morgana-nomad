"use client";

import { useState } from "react";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(path, siteConfig.url);
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-muted-foreground">Share</span>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1 hover:bg-muted"
      >
        X / Twitter
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1 hover:bg-muted"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-border px-3 py-1 hover:bg-muted"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
