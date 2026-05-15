import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { blockPlainText, slugify } from "@/lib/portable-text-headings";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/cn";

const calloutTone: Record<string, string> = {
  note: "border-l-4 border-border bg-muted/50",
  tip: "border-l-4 border-accent bg-accent/5",
  warning: "border-l-4 border-amber-500 bg-amber-500/10",
};

export function RichTextRenderer({ value }: { value: unknown[] }) {
  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => {
        const text = blockPlainText(value);
        const id = slugify(text);
        return (
          <h2 id={id} className="scroll-mt-28 text-2xl font-semibold tracking-tight mt-10 mb-4">
            {children}
          </h2>
        );
      },
      h3: ({ children, value }) => {
        const text = blockPlainText(value);
        const id = slugify(text);
        return (
          <h3 id={id} className="scroll-mt-28 text-xl font-semibold tracking-tight mt-8 mb-3">
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const href = value?.href as string | undefined;
        const openInNewTab = Boolean(value?.openInNewTab);
        if (!href) return <span>{children}</span>;
        const external = href.startsWith("http");
        if (external) {
          return (
            <a
              href={href}
              className="text-accent underline-offset-4 hover:underline font-medium"
              target={openInNewTab ? "_blank" : undefined}
              rel={openInNewTab ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          );
        }
        return (
          <Link href={href} className="text-accent underline-offset-4 hover:underline font-medium">
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const src = urlForImage(value)?.width(900).url();
        if (!src) return null;
        const alt = (value?.alt as string) || "";
        return (
          <figure className="my-8">
            <Image
              src={src}
              alt={alt}
              width={900}
              height={506}
              className="rounded-lg w-full h-auto"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            {value?.caption ? (
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                {value.caption as string}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      callout: ({ value }) => {
        const tone = (value?.tone as string) || "note";
        return (
          <aside
            className={cn("my-8 rounded-r-lg p-4", calloutTone[tone] ?? calloutTone.note)}
            role="note"
          >
            {value?.title ? (
              <p className="font-semibold text-foreground mb-1">{value.title as string}</p>
            ) : null}
            {value?.body ? (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{value.body as string}</p>
            ) : null}
          </aside>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
  };

  return (
    <div className="prose-custom">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
