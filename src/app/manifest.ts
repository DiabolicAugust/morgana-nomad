import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "PNomad",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#172c21",
    lang: "en",
  };
}
