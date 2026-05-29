import { describe, expect, it } from "vitest";
import sitemap from "../../../app/sitemap";
import { SITE_COPY } from "@/lib/copy";
import {
  INTENSIVE_SEO,
  PAGE_SEO,
  SHELVED_STATIC_PATHS,
  SITE_STATIC_PATHS,
  SITE_URL,
} from "@/lib/seo/intensive";

const pageSeoPaths = [
  PAGE_SEO.home.canonicalPath,
  PAGE_SEO.therapy.canonicalPath,
  PAGE_SEO.about.canonicalPath,
  INTENSIVE_SEO.canonicalPath,
  PAGE_SEO.intensiveFitCheck.canonicalPath,
  PAGE_SEO.workshops.canonicalPath,
  PAGE_SEO.billing.canonicalPath,
  PAGE_SEO.contact.canonicalPath,
  "/resources",
];

const NON_NAV_STATIC_PATHS: string[] = [PAGE_SEO.intensiveFitCheck.canonicalPath];
const LEGACY_REDIRECT_PATHS = [
  "/48-hours",
  "/bridge-weekend",
  "/intensive/collaborative",
  "/services",
  "/workshops",
];

describe("route consistency", () => {
  const shelvedPaths = new Set<string>(SHELVED_STATIC_PATHS);
  const activeSeoPaths = pageSeoPaths.filter((path) => !shelvedPaths.has(path));
  const navStaticPaths = SITE_STATIC_PATHS.filter((path) => !NON_NAV_STATIC_PATHS.includes(path));

  it("keeps nav links aligned with static site paths", () => {
    const navPaths = SITE_COPY.nav.links.map((link) => link.href);
    expect(new Set(navPaths)).toEqual(new Set(navStaticPaths));
  });

  it("keeps active static paths aligned with canonical SEO paths", () => {
    expect(new Set(SITE_STATIC_PATHS)).toEqual(new Set(activeSeoPaths));
  });

  it("includes all static paths in sitemap", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));

    for (const path of SITE_STATIC_PATHS) {
      expect(urls.has(`${SITE_URL}${path}`)).toBe(true);
    }
  });

  it("keeps legacy redirect routes out of the sitemap", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));

    for (const path of LEGACY_REDIRECT_PATHS) {
      expect(urls.has(`${SITE_URL}${path}`)).toBe(false);
    }
  });
});
