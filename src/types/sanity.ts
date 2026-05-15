import type { Image } from "sanity";

export type SanitySlug = { current?: string };

export type CategoryRef = {
  title: string;
  slug: string;
  description?: string;
};

export type CityRef = {
  name: string;
  slug: string;
};

export type AuthorCard = {
  name: string;
  slug?: string;
  photo?: Image;
};

export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  featuredImage?: Image;
  author?: AuthorCard;
  categories?: CategoryRef[];
  city?: CityRef;
};

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type AuthorFull = AuthorCard & {
  role?: string;
  bio?: string;
  credentials?: string[];
  twitter?: string;
  linkedin?: string;
};

export type ArticleFull = ArticleCard & {
  updatedAt?: string;
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  canonicalPath?: string;
  faqs?: FaqItem[];
  author?: AuthorFull;
  relatedArticles?: ArticleCard[];
};

export type SiteSettings = {
  title: string;
  description: string;
  url?: string;
  ogImage?: Image;
  twitterHandle?: string;
};
