import { describe, expect, it } from "vitest";
import sitemap from "../../../app/sitemap";
import { PAGE_SEO, SITE_STATIC_PATHS, SITE_URL } from "@/lib/seo/intensive";

const pageSeoPaths = [PAGE_SEO.home.canonicalPath, PAGE_SEO.press.canonicalPath];

describe("route consistency", () => {
  it("keeps active static paths aligned with canonical SEO paths", () => {
    expect(new Set(SITE_STATIC_PATHS)).toEqual(new Set(pageSeoPaths));
  });

  it("includes all static paths in sitemap", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));

    for (const path of SITE_STATIC_PATHS) {
      expect(urls.has(`${SITE_URL}${path}`)).toBe(true);
    }
  });
});
