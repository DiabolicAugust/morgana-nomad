# Poland Nomad — Next.js + Sanity blog

Production-ready starter for a **Poland-focused digital nomad** site: App Router, embedded **Sanity Studio** at `/studio`, Tailwind + typography, SEO metadata, JSON-LD, sitemap/robots, dynamic OG images (`/api/og`), and a **seed script** for demo content.

## Defaults (documented)

| Topic | Choice |
|--------|--------|
| Site | **Poland Nomad** (`NEXT_PUBLIC_SITE_URL`, e.g. `https://polandnomad.com`) |
| Language | English |
| Deployment | Cloudflare Pages or Vercel (both work with this stack) |
| Multi-author | Yes (two demo authors in seed) |
| Search | Not included (add Pagefind or Sanity search later) |

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Fill NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN, then:
npm run seed
npm run dev
```

- Site: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy the **Project ID** into `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`.
3. Create an **Editor** API token → `SANITY_API_WRITE_TOKEN` (server-only; never `NEXT_PUBLIC_`).
4. Run `npm run seed` to upload hero images and create categories, cities, authors, site settings, and **three long-form articles** (Kraków guide, cost of living, Type D visa checklist).
5. Open `/studio` to edit content; published changes appear after ISR revalidation (listing/article routes use `revalidate` 120s where configured).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` / `npm start` | Production build & serve |
| `npm run seed` | Populate Sanity (requires write token) |
| `npm run lint` | ESLint |

## Deployment

### Vercel

1. Push the repo to GitHub/GitLab.
2. Import in Vercel; set the same env vars as `.env.local.example` (including `NEXT_PUBLIC_SITE_URL` for production).
3. Build command: `npm run build`; output: Next default.

### Cloudflare Pages

Use the [Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/) adapter if you target Workers/Pages; set env vars in the Pages project. Verify `@vercel/og` / Edge routes against your adapter version—adjust `runtime` on `opengraph-image` and `/api/og` if your host does not support Edge.

## Adding articles

1. Open `/studio` → **Article** → create/publish.
2. Fill SEO fields (`seoTitle`, `seoDescription`, keywords), **FAQ** entries for FAQ schema, **featured image + alt**, categories, author, and body (H2/H3 for TOC).
3. Use internal links in rich text with paths like `/blog/other-slug`.
4. Follow the editorial checklist: [references/seo-checklist.md](references/seo-checklist.md).

## Troubleshooting

- **Studio blank / project error**: confirm `NEXT_PUBLIC_SANITY_PROJECT_ID` and restart `npm run dev`.
- **Build fails fetching content**: production builds need valid Sanity env vars so `generateStaticParams` can query slugs.
- **Images 403**: only `cdn.sanity.io` is allowlisted in `next.config.mjs`; extend `images.remotePatterns` if you add other hosts.

## Project layout (high level)

- `src/app` — routes (blog, authors, marketing, `studio`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, `api/og`).
- `src/components` — article, layout, home, SEO helpers.
- `src/sanity` — schemas, GROQ queries, image URL helper, env helpers.
- `sanity.config.ts` — Studio config (embedded at `/studio`).
- `scripts/seed-sanity.ts` — deterministic demo dataset.
# morgana-nomad
