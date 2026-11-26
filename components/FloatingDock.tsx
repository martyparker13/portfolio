import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FloatingDockClient } from "./FloatingDockClient";

const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

const HIDDEN_NAV_TITLES = new Set(["Achievements", "GitHub"]);

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });

  if (!navItems || navItems.length === 0) {
    return null;
  }

  const visibleNavItems = navItems.filter(
    (item) => !HIDDEN_NAV_TITLES.has(item.title ?? ""),
  );

  if (visibleNavItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={visibleNavItems} />;
}
