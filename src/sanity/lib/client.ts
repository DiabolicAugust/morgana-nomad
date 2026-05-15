import { createClient, type SanityClient } from "next-sanity";

import { sanityEnv } from "../env";

export function getClient(): SanityClient {
  const { projectId, dataset, apiVersion } = sanityEnv();
  if (!projectId) {
    console.error(
      "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Set it on your hosting provider (Production + Preview) for builds and runtime, then redeploy. Local: add to .env.local at project root.",
    );
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
