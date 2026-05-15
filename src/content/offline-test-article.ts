import type { ArticleFull } from "@/types/sanity";

/** Hero for the static `/blog/test-article` demo (no Sanity asset). */
export const offlineTestArticleHero = {
  src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
  alt: "Laptop and coffee on a desk",
} as const;

/**
 * Fully local article used only by `src/app/blog/test-article/page.tsx`.
 * This route overrides a Sanity document with the same slug if one exists.
 */
export const offlineTestArticle = {
  _id: "offline-test-article",
  slug: "test-article",
  title: "Test article (no Sanity)",
  excerpt:
    "This page is hard-coded in the repo so you can preview the article layout, TOC, FAQ block, and JSON-LD without connecting Sanity or running seed scripts.",
  publishedAt: "2026-05-13T12:00:00.000Z",
  updatedAt: "2026-05-13T12:00:00.000Z",
  categories: [],
  tags: ["demo", "offline"],
  author: {
    name: "Local editor",
    role: "Static demo",
    bio: "This author exists only in TypeScript. Publish real authors from /studio when your CMS is connected.",
    credentials: ["No database required"],
  },
  body: [
    {
      _type: "block",
      _key: "off-h2-1",
      style: "h2",
      markDefs: [],
      children: [
        { _type: "span", _key: "off-s1", marks: [], text: "Why this page exists" },
      ],
    },
    {
      _type: "block",
      _key: "off-p1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "off-s2",
          marks: [],
          text: "Use it to verify fonts, spacing, reading progress, and responsive behavior while you wire environment variables or wait on API tokens. When Sanity is ready, remove this folder or change the slug so your CMS content can own /blog/test-article.",
        },
      ],
    },
    {
      _type: "block",
      _key: "off-h2-2",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "off-s3", marks: [], text: "Portable Text still works" }],
    },
    {
      _type: "block",
      _key: "off-p2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "off-s4",
          marks: [],
          text: "The body below is real Portable Text JSON—the same shape Sanity stores—so RichTextRenderer, heading anchors, and the table of contents behave like production.",
        },
      ],
    },
    {
      _type: "callout",
      _key: "off-co-1",
      tone: "tip",
      title: "Tip",
      body: "Compare this page side-by-side with a Sanity-backed article once your project ID is configured.",
    },
  ],
  faqs: [
    {
      _key: "off-faq-1",
      question: "Will this disappear if I add Sanity?",
      answer:
        "This file-based route always wins over /blog/[slug] for the path /blog/test-article. Rename the folder or delete src/app/blog/test-article when you want Sanity to control that URL.",
    },
    {
      _key: "off-faq-2",
      question: "Can I duplicate this pattern?",
      answer: "Yes. Copy the page folder, point at another fixture in src/content/, and keep slugs unique.",
    },
  ],
  seoTitle: "Test article (offline) — Poland Nomad",
  seoDescription: "Static demo article with no Sanity fetches—useful for UI and SEO checks during setup.",
  keywords: ["test", "offline", "demo"],
} satisfies ArticleFull;
