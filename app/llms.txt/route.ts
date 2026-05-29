import {
  AI_DISCOVERY,
  INTENSIVE_SEO,
  INTENSIVE_THEME_PAGES_SEO,
  SITE_URL,
  THERAFOX_SITE_SEO,
} from "@/lib/seo/intensive";

export function GET() {
  const lines = [
    `# ${AI_DISCOVERY.title}`,
    "",
    `> ${AI_DISCOVERY.summary}`,
    "",
    `Site: ${SITE_URL}`,
    `Primary offer: ${INTENSIVE_SEO.title}`,
    `Primary canonical: ${SITE_URL}${INTENSIVE_SEO.canonicalPath}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Robots: ${SITE_URL}/robots.txt`,
    "",
    "## Focus",
    AI_DISCOVERY.focus,
    "",
    "## Priority URLs",
    ...AI_DISCOVERY.priorityPaths.map((path) => `- ${SITE_URL}${path}`),
    "",
    "## Theme Intents",
    ...AI_DISCOVERY.themeIntents.map((theme) => `- ${theme}`),
    "",
    "## Theme URLs",
    ...Object.values(INTENSIVE_THEME_PAGES_SEO).map((entry) => `- ${SITE_URL}${entry.canonicalPath}`),
    "",
    "## Brand Summary",
    THERAFOX_SITE_SEO.description,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
