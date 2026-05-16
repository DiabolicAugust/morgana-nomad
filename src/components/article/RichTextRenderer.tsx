import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { cn } from "@/lib/cn";
import { blockPlainText, slugify } from "@/lib/portable-text-headings";
import { urlForImage } from "@/sanity/lib/image";

const calloutTone: Record<string, string> = {
  note: "border-l-4 border-border bg-muted/50",
  tip: "border-l-4 border-accent bg-accent/5",
  warning: "border-l-4 border-amber-500 bg-amber-500/10",
};

/**
 * Mark the first normal paragraph so the editorial drop-cap renders only there.
 * Done in JSX (not CSS `:first-child` / `:first-of-type`) to guarantee no leak
 * into list items, callouts, or other nested blocks.
 */
function markFirstNormal(blocks: unknown[]): unknown[] {
  let marked = false;
  return blocks.map((entry) => {
    if (marked || !entry || typeof entry !== "object") return entry;
    const block = entry as Record<string, unknown>;
    if (block._type !== "block") return entry;
    const style = (block.style as string | undefined) ?? "normal";
    if (style !== "normal") return entry;
    const children = block.children as { _type?: string; text?: string }[] | undefined;
    const hasText = children?.some((c) => c?._type === "span" && typeof c.text === "string" && c.text.trim().length);
    if (!hasText) return entry;
    marked = true;
    return { ...block, __dropcap: true };
  });
}

export function RichTextRenderer({ value }: { value: unknown[] }) {
  const blocks = markFirstNormal(value);
  const components: PortableTextComponents = {
    block: {
      normal: ({ children, value }) => {
        const isDropcap = Boolean((value as { __dropcap?: boolean })?.__dropcap);
        return (
          <p
            className="mb-6 text-[17px] leading-[1.7] text-foreground"
            data-dropcap={isDropcap ? "true" : undefined}
          >
            {children}
          </p>
        );
      },
      h2: ({ children, value }) => {
        const text = blockPlainText(value);
        const id = slugify(text);
        return (
          <h2
            id={id}
            className="font-display mb-6 mt-14 scroll-mt-32 text-headline-md font-semibold leading-[1.3] tracking-tight text-primary first:mt-0 md:text-[1.875rem]"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, value }) => {
        const text = blockPlainText(value);
        const id = slugify(text);
        return (
          <h3
            id={id}
            className="font-display mb-4 mt-10 scroll-mt-32 text-xl font-semibold tracking-tight text-primary md:text-2xl"
          >
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent bg-muted/20 px-8 py-5 font-display text-lg font-semibold italic leading-snug text-primary md:text-xl lg:leading-relaxed [&_strong]:font-bold [&_strong]:italic">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
      link: ({ children, value }) => {
        const href = value?.href as string | undefined;
        const openInNewTab = Boolean(value?.openInNewTab);
        if (!href) return <span>{children}</span>;
        const external = href.startsWith("http");
        const className =
          "font-semibold text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-accent hover:decoration-accent/55";
        if (external) {
          return (
            <a href={href} className={className} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>
              {children}
            </a>
          );
        }
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const src = urlForImage(value)?.width(1200).url();
        if (!src) return null;
        const alt = (value?.alt as string) || "";
        return (
          <figure className="my-14">
            <Image
              src={src}
              alt={alt}
              width={1080}
              height={720}
              className="h-auto w-full rounded-lg shadow-soft"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            {value?.caption ? (
              <figcaption className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                {value.caption as string}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      callout: ({ value }) => {
        const tone = (value?.tone as string) || "note";
        return (
          <aside className={cn("my-10 rounded-lg p-5", calloutTone[tone] ?? calloutTone.note)} role="note">
            {value?.title ? (
              <p className="mb-2 font-display text-[1.0625rem] font-semibold text-primary">{value.title as string}</p>
            ) : null}
            {value?.body ? (
              <p className="text-[15px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {value.body as string}
              </p>
            ) : null}
          </aside>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
  };

  return (
    <div className="prose-custom">
      <PortableText value={blocks as never} components={components} />
    </div>
  );
}
