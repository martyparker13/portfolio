import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Server-only write client (used by the contact form server action).
// `useCdn` must be false: authenticated/mutating requests bypass the CDN
// anyway, and we never want a stale read here.
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
