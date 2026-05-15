import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Poland Nomad publishes independent, practical guides for remote workers considering Poland as a base in the EU.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">About Poland Nomad</h1>
      <div className="mt-8 prose-custom">
        <p>
          Poland Nomad is a content-first site built with{" "}
          <a href="https://nextjs.org" rel="noopener noreferrer">
            Next.js
          </a>{" "}
          and{" "}
          <a href="https://www.sanity.io" rel="noopener noreferrer">
            Sanity
          </a>
          . We focus on verified sources, clear structure, and realistic expectations for life in Poland on a remote
          salary.
        </p>
        <p>
          Topics span{" "}
          <strong>long-stay visas</strong>, <strong>city comparisons</strong>, <strong>rent and daily costs</strong>,
          and <strong>workspace culture</strong>. Articles are edited for readability and SEO without sacrificing
          accuracy.
        </p>
        <p>
          Editorial workflows live in <code className="text-sm bg-muted px-1 rounded">/studio</code> so writers can
          publish without touching code. Structured data (Article, FAQ, Breadcrumb) is emitted automatically from
          fields you fill in the CMS.
        </p>
      </div>
    </article>
  );
}
