export const siteConfig = {
  name: "Poland Nomad",
  tagline: "Practical guides for remote workers living in Poland.",
  description:
    "City guides, visas, cost of living, and workspace tips for digital nomads in Poland.",
  /** Set NEXT_PUBLIC_SITE_URL in production, e.g. https://polandnomad.com */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
} as const;
