import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { siteConfig } from "@/config/site";
import { offlineTestArticle, offlineTestArticleHero } from "@/content/offline-test-article";
import { articleOgImageUrl, createMetadata } from "@/lib/metadata";

/** Overrides `blog/[slug]` for this path so the article works with zero Sanity data. */
export const metadata = createMetadata({
  title: offlineTestArticle.seoTitle ?? offlineTestArticle.title,
  description: offlineTestArticle.seoDescription ?? offlineTestArticle.excerpt,
  path: "/blog/test-article",
  ogImage: articleOgImageUrl(offlineTestArticle.title, offlineTestArticle.excerpt.slice(0, 140)),
});

export default function OfflineTestArticlePage() {
  const article = offlineTestArticle;
  const siteUrl = siteConfig.url;
  const heroUrl = offlineTestArticleHero.src;

  return (
    <article>
      <ArticleSchema article={article} siteUrl={siteUrl} heroImageUrl={heroUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: "/blog/test-article" },
        ]}
        siteUrl={siteUrl}
      />
      {article.faqs?.length ? <FAQSchema faqs={article.faqs} /> : null}
      <ArticleContent
        article={article}
        heroImage={offlineTestArticleHero}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title, href: "/blog/test-article" },
        ]}
      />
    </article>
  );
}
