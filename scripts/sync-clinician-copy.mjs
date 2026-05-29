import path from "node:path";
import { pathToFileURL } from "node:url";
import { getPayload } from "payload";

const root = process.cwd();

const configModule = await import(pathToFileURL(path.resolve(root, "payload.config.ts")).toString());
const config = configModule.default ?? configModule;

const copyModule = await import(pathToFileURL(path.resolve(root, "src/lib/copy/therafoxWebsite.ts")).toString());
const copyExports = copyModule.default ?? copyModule;
const INTENSIVE_THEME_PAGES_COPY = copyExports.INTENSIVE_THEME_PAGES_COPY;

if (!INTENSIVE_THEME_PAGES_COPY || !Array.isArray(INTENSIVE_THEME_PAGES_COPY.themes)) {
  throw new Error("INTENSIVE_THEME_PAGES_COPY not found in src/lib/copy/therafoxWebsite.ts");
}

const payload = await getPayload({ config });

const current = await payload.findGlobal({
  slug: "clinician-copy",
  depth: 0,
});

const syncedEntries = INTENSIVE_THEME_PAGES_COPY.themes.map((theme) => ({
  slug: theme.slug,
  navLabel: theme.navLabel,
  title: theme.title,
  subtitle: theme.subtitle,
  intro: theme.intro,
  fitTitle: theme.fitTitle,
  fitBullets: theme.fitBullets.map((text) => ({ text })),
  outcomesTitle: theme.outcomesTitle,
  outcomesBullets: theme.outcomesBullets.map((text) => ({ text })),
  faq: theme.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
}));

const currentThemes = current?.themes ?? {};

await payload.updateGlobal({
  slug: "clinician-copy",
  data: {
    themes: {
      ...currentThemes,
      sectionEyebrow: INTENSIVE_THEME_PAGES_COPY.sectionEyebrow,
      sectionTitle: INTENSIVE_THEME_PAGES_COPY.sectionTitle,
      sectionBody: INTENSIVE_THEME_PAGES_COPY.sectionBody,
      relatedThemesTitle: INTENSIVE_THEME_PAGES_COPY.relatedThemesTitle,
      relatedThemesBody: INTENSIVE_THEME_PAGES_COPY.relatedThemesBody,
      quotesTitle: INTENSIVE_THEME_PAGES_COPY.quotesTitle,
      quotesBody: INTENSIVE_THEME_PAGES_COPY.quotesBody,
      quoteSourcePrefix: INTENSIVE_THEME_PAGES_COPY.quoteSourcePrefix,
      quoteThemePrefix: INTENSIVE_THEME_PAGES_COPY.quoteThemePrefix,
      backToIntensiveLabel: INTENSIVE_THEME_PAGES_COPY.backToIntensiveLabel,
      waitlistCtaLabel: INTENSIVE_THEME_PAGES_COPY.waitlistCtaLabel,
      waitlistCtaHref: INTENSIVE_THEME_PAGES_COPY.waitlistCtaHref,
      entries: syncedEntries,
    },
  },
});

console.log(
  JSON.stringify(
    {
      syncedThemes: syncedEntries.length,
      syncedFaqTotal: syncedEntries.reduce((acc, row) => acc + row.faq.length, 0),
      preservedQuotes: Array.isArray(currentThemes.quotes) ? currentThemes.quotes.length : 0,
    },
    null,
    2,
  ),
);

await payload.destroy();
