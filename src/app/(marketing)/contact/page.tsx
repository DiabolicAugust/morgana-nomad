import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch about partnerships, corrections, or collaboration on Poland Nomad.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-6 text-muted-foreground">
        For corrections, media enquiries, or partnerships, email the address you configure in production. This page is
        a static placeholder so navigation and metadata stay complete out of the box.
      </p>
      <p className="mt-4 text-muted-foreground">
        Replace this section with a form provider (Tally, Basin, Formspark) or your support inbox.
      </p>
    </article>
  );
}
