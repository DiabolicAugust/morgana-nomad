import { breadcrumbJsonLd } from "@/lib/jsonld-builders";

import { JsonLd } from "./JsonLd";

export function BreadcrumbSchema({
  items,
  siteUrl,
}: {
  items: { name: string; path: string }[];
  siteUrl: string;
}) {
  return <JsonLd data={breadcrumbJsonLd(items, siteUrl)} />;
}
