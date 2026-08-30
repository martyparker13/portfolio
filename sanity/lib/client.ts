import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // false: this app uses the Live Content API (sanityFetch) + ISR, which need
  // uncached reads. https://www.sanity.io/docs/api-cdn
  useCdn: false,
});
