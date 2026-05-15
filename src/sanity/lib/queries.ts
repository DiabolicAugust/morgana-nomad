/** GROQ fragments and queries for Poland Nomad */

const articleCard = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  tags,
  featuredImage,
  "author": author->{name, "slug": slug.current, photo},
  "categories": categories[]->{title, "slug": slug.current},
  "city": city->{name, "slug": slug.current}
`;

const articleFull = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  body,
  featuredImage,
  tags,
  seoTitle,
  seoDescription,
  keywords,
  canonicalPath,
  faqs,
  "author": author->{
    name,
    "slug": slug.current,
    role,
    bio,
    photo,
    credentials,
    twitter,
    linkedin
  },
  "categories": categories[]->{title, "slug": slug.current, description},
  "city": city->{name, "slug": slug.current},
  "relatedArticles": relatedArticles[]->{
    ${articleCard}
  }
`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  url,
  ogImage,
  twitterHandle
}`;

export const allArticleSlugsQuery = `
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0]{
    ${articleFull}
  }
`;

export const articlesPaginatedQuery = `
  *[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[$start...$end]{
    ${articleCard}
  }
`;

export const articlesCountQuery = `count(*[_type == "article" && defined(publishedAt)])`;

export const featuredArticlesQuery = `
  *[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[0...4]{
    ${articleCard}
  }
`;

export const articlesByCategorySlugQuery = `
  *[_type == "article" && defined(publishedAt) && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[$start...$end]{
    ${articleCard}
  }
`;

export const categoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description
  }
`;

export const categoryArticleCountQuery = `
  count(*[_type == "article" && defined(publishedAt) && $categorySlug in categories[]->slug.current])
`;

export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    role,
    bio,
    photo,
    credentials,
    twitter,
    linkedin
  }
`;

export const articlesByAuthorSlugQuery = `
  *[_type == "article" && defined(publishedAt) && author->slug.current == $authorSlug] | order(publishedAt desc){
    ${articleCard}
  }
`;

export const allCategorySlugsQuery = `
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const allAuthorSlugsQuery = `
  *[_type == "author" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc){
    title,
    "slug": slug.current,
    description
  }
`;
