/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    // Pins the Studio app so `sanity deploy` / CI don't prompt for a hostname.
    appId: "weqhiu2kbk116loyywb3khve",
  },
  typegen: {
    path: "./{app,components,sanity}/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
  // The Studio build runs through Vite, which would otherwise auto-load the
  // app's root postcss.config.mjs (Tailwind v4 / Next.js). Vite's PostCSS
  // loader rejects string plugin names, so give the Studio an empty inline
  // PostCSS config — it uses styled-components and needs no PostCSS.
  vite: (config) => ({
    ...config,
    css: { ...config.css, postcss: {} },
  }),
});
