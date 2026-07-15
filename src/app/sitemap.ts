import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { SITE } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/collections",
    "/catalog",
    "/booking",
    "/contact",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${SITE.url}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes];
}
