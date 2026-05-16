import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch about partnerships, corrections, or collaboration on Poland Nomad.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-headline-lg tracking-tight text-primary">Contact</h1>
      <p className="mt-6 text-muted-foreground">
        Corrections to published guides, media enquiries, and partnership ideas are welcome. Include the relevant
        article URL and supporting sources wherever possible—we review factual updates and revise content when verified.
      </p>
      <p className="mt-4 text-muted-foreground">
        We do not provide individual immigration or tax advice by email; those situations need a licensed professional who
        can review your full circumstances.
      </p>
    </article>
  );
}
