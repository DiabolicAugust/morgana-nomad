export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type PtChild = { _type?: string; text?: string; children?: PtChild[] };

function childText(node: PtChild | undefined): string {
  if (!node) return "";
  if (node.text) return node.text;
  if (node.children) return node.children.map(childText).join("");
  return "";
}

export function blockPlainText(block: { children?: unknown } | undefined | null): string {
  const children = block?.children;
  if (!children || !Array.isArray(children)) return "";
  return children.map((c) => childText(c as PtChild)).join("").trim();
}

export function portableTextHeadings(body: unknown[] | undefined) {
  if (!body?.length) return [];
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const block of body) {
    if (!block || typeof block !== "object") continue;
    const b = block as { _type?: string; style?: string; children?: PtChild[] };
    if (b._type !== "block") continue;
    if (b.style !== "h2" && b.style !== "h3") continue;
    const text = blockPlainText(b);
    if (!text) continue;
    const id = slugify(text);
    out.push({ id, text, level: b.style === "h2" ? 2 : 3 });
  }
  return out;
}
