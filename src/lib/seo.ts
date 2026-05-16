import { siteConfig } from "@/config/site";

/** Site-relative path for canonical + schema. Handles missing `/`, stray spaces, full URLs only when same host as `NEXT_PUBLIC_SITE_URL`. */
export function canonicalArticlePath(canonicalFromCms: string | undefined, slug: string): string {
  const fallback = `/blog/${slug}`;
  if (!canonicalFromCms?.trim()) return fallback;
  const raw = canonicalFromCms.trim();

  let configuredHost: string | null = null;
  try {
    configuredHost = new URL(siteConfig.url).hostname;
  } catch {
    configuredHost = null;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const u = new URL(raw);
      if (configuredHost && u.hostname === configuredHost) {
        return `${u.pathname}${u.search}` || fallback;
      }
      return raw;
    } catch {
      return fallback;
    }
  }
  if (raw.startsWith("/")) return raw || fallback;
  return `/${raw}`;
}

export function absoluteUrl(path: string, baseUrl: string = siteConfig.url) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function formatDate(iso: string, locale = "en-GB") {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}
