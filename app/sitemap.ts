import type { MetadataRoute } from "next";
import { getAllResources } from "@/content/resources/utils";
import {
  INTENSIVE_THEME_PAGES_SEO,
  SEO_LAST_MODIFIED,
  SITE_STATIC_PATHS,
  SITE_URL,
} from "@/lib/seo/intensive";

const lastModified = new Date(SEO_LAST_MODIFIED);

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getAllResources();
  const intensiveThemeRoutes = Object.values(INTENSIVE_THEME_PAGES_SEO).map((entry) => ({
    url: `${SITE_URL}${entry.canonicalPath}`,
    lastModified,
  }));
  const staticRoutes = SITE_STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));

  return [
    ...staticRoutes,
    ...intensiveThemeRoutes,
    ...resources.map((resource) => ({
      url: `${SITE_URL}/resources/${resource.slug}`,
      lastModified: resource.updatedAt ? new Date(resource.updatedAt) : lastModified,
    })),
  ];
}
