// Resolved in three contexts:
//  - the Next.js app  -> NEXT_PUBLIC_* are inlined at build time
//  - the standalone Studio (`sanity deploy`) -> only SANITY_STUDIO_* are
//    bundled by the Sanity CLI, so NEXT_PUBLIC_* are undefined there
//  - CLI / CI (typegen, schema deploy) -> reads process.env directly
// projectId and dataset are public identifiers (they appear in every API
// request and asset URL), so a hardcoded fallback is safe and keeps the
// standalone Studio from crashing when no env is provided.
const DEFAULT_PROJECT_ID = "2we6aup7";
const DEFAULT_DATASET = "develop";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  "2025-11-21";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  DEFAULT_PROJECT_ID;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  DEFAULT_DATASET;
