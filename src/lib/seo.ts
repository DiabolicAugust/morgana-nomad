import { siteConfig } from "@/config/site";

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
