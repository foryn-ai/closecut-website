const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const robotsPath = join(process.cwd(), "app", "robots.ts");
const sitemapPath = join(process.cwd(), "app", "sitemap.ts");
const seoPath = join(process.cwd(), "src", "lib", "seo", "siteMetadata.ts");

const robotsSource = readFileSync(robotsPath, "utf8");
const sitemapSource = readFileSync(sitemapPath, "utf8");
const seoSource = readFileSync(seoPath, "utf8");
const siteUrlMatch = seoSource.match(/export const SITE_URL = "([^"]+)"/);
const siteUrl = siteUrlMatch?.[1] ?? "";
const errors = [];

if (!robotsSource.includes("sitemap: `${SITE_URL}/sitemap.xml`")) {
  errors.push("robots sitemap is missing or does not use SITE_URL");
}

if (!sitemapSource.includes("SITE_STATIC_PATHS")) {
  errors.push("sitemap does not reference SITE_STATIC_PATHS");
}

if (!sitemapSource.includes("SITE_URL")) {
  errors.push("sitemap does not reference SITE_URL");
}

if (!sitemapSource.includes("INTENSIVE_THEME_PAGES_SEO")) {
  errors.push("sitemap does not include intensive theme routes");
}

if (!sitemapSource.includes('url: `${SITE_URL}/resources/${resource.slug}`')) {
  errors.push("sitemap does not include resource detail URLs");
}

if (errors.length > 0) {
  console.error("Sitemap audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Sitemap audit passed for ${siteUrl || "configured SITE_URL"}.`);
