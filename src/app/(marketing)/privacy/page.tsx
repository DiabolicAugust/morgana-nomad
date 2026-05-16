import Link from "next/link";

import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy policy",
  description:
    "How Poland Nomad collects, uses, and protects information when you use our website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-headline-lg tracking-tight text-primary">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: 15 May 2026</p>

      <div className="mt-10 prose-custom text-muted-foreground space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Overview</h2>
          <p>
            Poland Nomad (&quot;we&quot;, &quot;us&quot;) runs this website to publish guides for people interested in living
            and working remotely in Poland. This policy describes how we handle personal information in connection with
            the site. For legal advice tailored to your situation, speak with a qualified professional.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Information we may collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Usage and technical data.</strong> Like most sites, hosting and security
              systems may log information such as your IP address, browser type, device type, and pages visited. We use this
              to operate the site, fix errors, and protect against abuse.
            </li>
            <li>
              <strong className="text-foreground">Communications.</strong> If you email us or use a contact channel we
              provide, we retain the contents of your message and your contact details as long as needed to respond and handle
              any follow‑up we reasonably owe you.
            </li>
            <li>
              <strong className="text-foreground">Newsletter or marketing.</strong> If we offer a mailing list or similar sign‑up,
              we only collect details you voluntarily submit (for example email address) and only use them for the purpose stated
              at sign‑up, subject to withdrawal at any time.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Cookies and similar technologies</h2>
          <p>
            We may use cookies or similar technologies that are strictly necessary to run the site, remember preferences where
            you opt in, or measure traffic and performance where we enable analytics. You can restrict cookies through your
            browser settings; some features may not work as intended if you do so.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">How we use information</h2>
          <p>We use collected information only for legitimate purposes, such as:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Providing articles, navigation, and site functionality</li>
            <li>Maintaining security and preventing fraud or misuse</li>
            <li>Understanding readership trends in aggregated form where applicable</li>
            <li>Responding to enquiries and complying with applicable law</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Service providers</h2>
          <p>
            We rely on reputable infrastructure and tooling providers (for example hosting, content delivery, and email) to run
            the site. Those providers process data only on our instructions and for the purposes described here, consistent with
            their own privacy commitments and contracts.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Retention</h2>
          <p>
            We retain information only as long as needed for the purposes above, unless a longer period is required by law or
            to resolve disputes. Technical logs may be kept for shorter rolling periods as determined by our hosting practices.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Rights (EEA / UK and similar regions)</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, or restrict processing of certain personal
            data, or to object to processing or to data portability where applicable. You may lodge a complaint with your local data
            protection authority. To exercise rights, contact us using the details below; we respond within legally required timelines.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">International transfers</h2>
          <p>
            If you visit from outside Poland, your information may be processed in the European Economic Area or in other regions
            where our providers operate, using appropriate safeguards where required.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Children</h2>
          <p>This site is not directed at children under 16. We do not knowingly collect personal information from young children.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Changes</h2>
          <p>
            We may update this policy periodically. Material changes will be reflected by revising the &quot;Last updated&quot; date above.
            Continuing to use the site after updates means you accept the revised policy to the extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-primary">Contact</h2>
          <p>
            Privacy-related questions can be directed through our{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact page
            </Link>
            . Please include enough detail that we can assist you responsibly.
          </p>
        </section>
      </div>
    </article>
  );
}
