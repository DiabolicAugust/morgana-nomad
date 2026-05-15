# Per-article SEO checklist

Use this when publishing or updating an article in Sanity Studio.

## Metadata

- [ ] **Title**: `seoTitle` ≤ ~60 characters; matches search intent and H1.
- [ ] **Description**: `seoDescription` ≤ ~160 characters; unique vs other posts.
- [ ] **Canonical**: leave `canonicalPath` empty unless you intentionally override the default `/blog/[slug]`.
- [ ] **Keywords**: 5–10 specific phrases; avoid stuffing.

## Content

- [ ] **Excerpt**: compelling, ≤ ~220 characters; used in listings and fallbacks.
- [ ] **H2/H3 structure**: logical outline; drives table of contents on the article page.
- [ ] **Internal links**: at least two links to other guides using relative `/blog/...` paths.
- [ ] **External authority**: link to official portals (consulates, government, Eurostat, etc.) where relevant.
- [ ] **Featured image**: high resolution; **alt text** describes the image, not the title alone.

## Rich results

- [ ] **FAQ block**: 3–5 real questions readers ask; answers plain and factual.
- [ ] **Author**: correct **author** reference; bio/credentials filled for E-E-A-T.
- [ ] **Categories**: at least one accurate category.

## After publish

- [ ] Request indexing in Search Console for high-priority URLs.
- [ ] Spot-check **View Source** for `application/ld+json` (Article, Breadcrumb, FAQ when present).
- [ ] Share preview: OG image resolves (uses `/api/og` when no Sanity hero is preferred in JSON-LD).

## Performance & a11y

- [ ] Large images cropped reasonably before upload.
- [ ] No critical information only in images (screen readers).
