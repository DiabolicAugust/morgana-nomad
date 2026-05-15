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
          Poland Nomad publishes independent, practical guides for remote workers comparing Poland’s cities,
          bureaucracy, budgets, and day-to-day life. We prioritize clear explanations, citations to official sources
          where possible, and expectations that reflect how things really work—not only how they read on paper.
        </p>
        <p>
          Topics span{" "}
          <strong>long-stay visas</strong>, <strong>city comparisons</strong>, <strong>rent and daily costs</strong>,
          and <strong>workspace culture</strong>. Articles are revised when rules change or when readers flag errors we
          can verify.
        </p>
        <p>
          We are not immigration lawyers or tax advisers. Guides are informational; decisions about visas, residency, and
          taxes should involve qualified professionals who know your nationality and circumstances.
        </p>
      </div>
    </article>
  );
}
