import { createClient, type SanityClient } from "next-sanity";

import { sanityEnv } from "../env";

export function getClient(): SanityClient {
  const { projectId, dataset, apiVersion } = sanityEnv();
  if (!projectId) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Add it to .env.local in the project root (next to package.json), restart `npm run dev`, and confirm the file is not named .env only (Next only autoloads certain env files).",
      );
    }
  }
  return createClient({
    projectId: projectId || "placeholder",
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    perspective: "published",
    stega: {
      enabled: false,
    },
  });
}
