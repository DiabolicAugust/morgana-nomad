import { faqJsonLd } from "@/lib/jsonld-builders";
import type { FaqItem } from "@/types/sanity";

import { JsonLd } from "./JsonLd";

export function FAQSchema({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs?.length) return null;
  return <JsonLd data={faqJsonLd(faqs)} />;
}
