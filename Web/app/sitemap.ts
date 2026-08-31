import type { MetadataRoute } from "next";
import { docsFlat } from "@/lib/nav";
import { site } from "@/lib/site";

/** Generated from the documentation tree, so a new page is listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...docsFlat.map((item) => item.href)];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
