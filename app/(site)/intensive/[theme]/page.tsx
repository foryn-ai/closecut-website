import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { INTENSIVE_THEME_PAGES_COPY } from "@/lib/copy/intensive";
import {
  createThemeOverrideMap,
  getClinicianCopyGlobal,
  getThemeQuotes,
} from "@/lib/copy/clinicianCms";
import {
  INTENSIVE_THEME_PAGES,
  INTENSIVE_THEME_PAGES_SEO,
  SEO_IMAGES,
  SEO_TYPES,
  SITE_URL,
  type IntensiveThemeSlug,
} from "@/lib/seo/intensive";
import { buildCitationWebPageSchema } from "@/lib/seo/structuredData";

type ThemePageProps = {
  params: Promise<{ theme: string }>;
};

function getThemeCopy(theme: string) {
  return INTENSIVE_THEME_PAGES_COPY.themes.find((entry) => entry.slug === theme);
}

function isThemeSlug(value: string): value is IntensiveThemeSlug {
  return INTENSIVE_THEME_PAGES.includes(value as IntensiveThemeSlug);
}

export function generateStaticParams() {
  return INTENSIVE_THEME_PAGES.map((theme) => ({ theme }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { theme } = await params;
  if (!isThemeSlug(theme)) return {};

  const seo = INTENSIVE_THEME_PAGES_SEO[theme];
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      type: SEO_TYPES.openGraphWebsite,
      url: seo.canonicalPath,
      images: [
        {
          url: SEO_IMAGES.openGraph.url,
          width: SEO_IMAGES.openGraph.width,
          height: SEO_IMAGES.openGraph.height,
          alt: "Therafox Intensive overview",
        },
      ],
    },
    twitter: {
      card: SEO_TYPES.twitterCard,
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      images: [SEO_IMAGES.twitter],
    },
  };
}

export default async function IntensiveThemePage({ params }: ThemePageProps) {
  const { theme } = await params;
  if (!isThemeSlug(theme)) notFound();

  const themeCopy = getThemeCopy(theme);
  if (!themeCopy) notFound();
  const cmsCopy = await getClinicianCopyGlobal();
  const themeOverrideMap = createThemeOverrideMap(cmsCopy);
  const currentThemeOverride = themeOverrideMap.get(theme);
  const themesCms = cmsCopy?.themes;
  const themeQuotes = getThemeQuotes(cmsCopy, theme);
  const relatedThemes = INTENSIVE_THEME_PAGES_COPY.themes.filter((entry) => entry.slug !== theme);

  const seo = INTENSIVE_THEME_PAGES_SEO[theme];
  const { fortyEight } = SITE_COPY;
  const fitBullets =
    currentThemeOverride?.fitBullets && currentThemeOverride.fitBullets.length > 0
      ? currentThemeOverride.fitBullets
      : themeCopy.fitBullets;
  const outcomesBullets =
    currentThemeOverride?.outcomesBullets && currentThemeOverride.outcomesBullets.length > 0
      ? currentThemeOverride.outcomesBullets
      : themeCopy.outcomesBullets;
  const themeFaqItems =
    currentThemeOverride?.faq && currentThemeOverride.faq.length > 0
      ? currentThemeOverride.faq
      : themeCopy.faq;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: seo.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: seo.faqAnswer,
        },
      },
      ...themeFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Therafox Intensive: ${themeCopy.navLabel}`,
    description: seo.description,
    provider: {
      "@type": "Organization",
      name: "Therafox",
      url: SITE_URL,
    },
    areaServed: "United States",
    url: `${SITE_URL}${seo.canonicalPath}`,
  };
  const quoteCitationItems = themeQuotes
    .map((entry) => {
      if (!entry.quote || !entry.practitioner || !entry.sourceTitle || !entry.sourceUrl) {
        return null;
      }

      return {
        quote: entry.quote,
        practitioner: entry.practitioner,
        sourceTitle: entry.sourceTitle,
        sourceUrl: entry.sourceUrl,
        themes: [currentThemeOverride?.navLabel ?? themeCopy.navLabel],
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const quoteSchema = buildCitationWebPageSchema({
    pageTitle: currentThemeOverride?.title ?? themeCopy.title,
    pageUrl: `${SITE_URL}${seo.canonicalPath}`,
    items: quoteCitationItems,
  });

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteSchema) }}
      />
      <PageHeroHeader
        title={currentThemeOverride?.title ?? themeCopy.title}
        subtitle={currentThemeOverride?.subtitle ?? themeCopy.subtitle}
        imageSrc={fortyEight.heroFurnitureSrc}
        imageAlt={fortyEight.heroFurnitureAlt}
      />

      <Section>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-1 p-6">
            <Heading role="h2">{currentThemeOverride?.fitTitle ?? themeCopy.fitTitle}</Heading>
            <Text role="body" className="mt-3 text-body" measure="narrow">
              {currentThemeOverride?.intro ?? themeCopy.intro}
            </Text>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {fitBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-6">
            <Heading role="h2">
              {currentThemeOverride?.outcomesTitle ?? themeCopy.outcomesTitle}
            </Heading>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {outcomesBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {themeQuotes.length > 0 ? (
        <Section>
          <div className="mx-auto max-w-6xl">
            <Heading role="h2">
              {themesCms?.quotesTitle ?? INTENSIVE_THEME_PAGES_COPY.quotesTitle}
            </Heading>
            <Text role="body" className="mt-3 text-body" measure="narrow">
              {themesCms?.quotesBody ?? INTENSIVE_THEME_PAGES_COPY.quotesBody}
            </Text>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {themeQuotes.map((quote, index) => (
                <SurfaceCard key={`${quote.practitioner}-${index}`} className="h-full">
                  <Text role="body" className="text-heading">
                    "{quote.quote}"
                  </Text>
                  <Text role="bodySmall" className="mt-3 text-body">
                    {quote.practitioner}
                  </Text>
                  <Link
                    className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                    href={quote.sourceUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {themesCms?.quoteSourcePrefix ?? INTENSIVE_THEME_PAGES_COPY.quoteSourcePrefix}:{" "}
                    {quote.sourceTitle}
                  </Link>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-surface-1 p-6">
          <Heading role="h2">{seo.faqQuestion}</Heading>
          <Text role="body" className="mt-3 text-body" measure="narrow">
            {seo.faqAnswer}
          </Text>
          <div className="mt-6 space-y-4">
            {themeFaqItems.map((item) => (
              <div key={item.question}>
                <Text role="body" className="font-medium text-heading">
                  {item.question}
                </Text>
                <Text role="bodySmall" className="mt-1 text-body" measure="narrow">
                  {item.answer}
                </Text>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className={ctaClass("primary")}
              href={themesCms?.waitlistCtaHref ?? INTENSIVE_THEME_PAGES_COPY.waitlistCtaHref}
            >
              {themesCms?.waitlistCtaLabel ?? INTENSIVE_THEME_PAGES_COPY.waitlistCtaLabel}
            </Link>
            <Link className={ctaClass("secondary")} href="/intensive#themes">
              {themesCms?.backToIntensiveLabel ?? INTENSIVE_THEME_PAGES_COPY.backToIntensiveLabel}
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <Heading role="h2">
            {themesCms?.relatedThemesTitle ?? INTENSIVE_THEME_PAGES_COPY.relatedThemesTitle}
          </Heading>
          <Text role="body" className="mt-3 text-body" measure="narrow">
            {themesCms?.relatedThemesBody ?? INTENSIVE_THEME_PAGES_COPY.relatedThemesBody}
          </Text>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedThemes.map((entry) => (
              <Link key={entry.slug} href={`/intensive/${entry.slug}`} className="block">
                <SurfaceCard interactive className="h-full">
                  <Text role="body" className="font-medium text-heading">
                    {themeOverrideMap.get(entry.slug)?.navLabel ?? entry.navLabel}
                  </Text>
                  <Text role="bodySmall" className="mt-2 text-body" measure="narrow">
                    {themeOverrideMap.get(entry.slug)?.subtitle ?? entry.subtitle}
                  </Text>
                </SurfaceCard>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
