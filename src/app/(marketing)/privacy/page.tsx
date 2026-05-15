import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy policy",
  description: "How Poland Nomad handles analytics, cookies, and personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Privacy policy</h1>
      <div className="mt-8 prose-custom text-muted-foreground">
        <p>
          This is a starter privacy page for development. Before launch, replace it with counsel-reviewed text that
          covers analytics (e.g. Vercel Analytics, Plausible), contact forms, newsletters, and any affiliate disclosures
          required in your jurisdiction.
        </p>
        <p>
          Sanity Studio is authenticated separately; do not expose write tokens in the browser. Only{" "}
          <code className="text-sm bg-muted px-1 rounded">NEXT_PUBLIC_*</code> variables ship to the client bundle.
        </p>
      </div>
    </article>
  );
}
