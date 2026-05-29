import { PageShell } from "@/components/layout/PageShell";
import { PlannerIsland } from "@/components/bridge-weekend/PlannerIsland";
import { PlannerV2Island } from "@/components/bridge-weekend-v2/PlannerV2Island";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { INTENSIVE_THEME_PAGES_COPY } from "@/lib/copy/intensive";
import { createThemeOverrideMap, getClinicianCopyGlobal } from "@/lib/copy/clinicianCms";
import { INTENSIVE_SEO, SEO_ROBOTS, SITE_URL } from "@/lib/seo/intensive";
import { buildCitationWebPageSchema, buildFaqSchema } from "@/lib/seo/structuredData";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { ctaClass } from "@/components/shared/cta";
import Link from "next/link";
import Image from "next/image";
import { IntensiveWaitlistSection } from "@/components/intensive/IntensiveWaitlistSection";

const SHOW_INTENSIVE_AGENDA_BUILDER = false;

type FortyEightHoursPageProps = {
  searchParams: Promise<{ view?: string; plan?: string }>;
};

export default async function FortyEightHoursPage({
  searchParams,
}: FortyEightHoursPageProps) {
  const params = await searchParams;
  const isShareView = params?.view === "share";
  const planToken = typeof params?.plan === "string" ? params.plan : null;
  const { fortyEight } = SITE_COPY;
  const cmsCopy = await getClinicianCopyGlobal();
  const intensiveCms = cmsCopy?.intensive;
  const themesCms = cmsCopy?.themes;
  const themeOverrideMap = createThemeOverrideMap(cmsCopy);
  const themeQuotes = cmsCopy?.themes?.quotes ?? [];
  const citationItems = themeQuotes
    .map((entry) => {
      if (!entry.quote || !entry.practitioner || !entry.sourceTitle || !entry.sourceUrl) {
        return null;
      }

      const themes =
        entry.themeSlugs?.map((slug) => {
          const theme = INTENSIVE_THEME_PAGES_COPY.themes.find((row) => row.slug === slug);
          return theme?.navLabel ?? slug;
        }) ?? [];

      return {
        quote: entry.quote,
        practitioner: entry.practitioner,
        sourceTitle: entry.sourceTitle,
        sourceUrl: entry.sourceUrl,
        themes,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const baseFaqItems = INTENSIVE_SEO.structuredData.faq.mainEntity.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
  const intensiveFaqItems =
    intensiveCms?.faqItems && intensiveCms.faqItems.length > 0
      ? intensiveCms.faqItems
      : baseFaqItems;
  const includedItemTexts =
    intensiveCms?.includedItems && intensiveCms.includedItems.length > 0
      ? intensiveCms.includedItems
      : fortyEight.includedItems.map((item) => item.text);
  const structuredData = [
    INTENSIVE_SEO.structuredData.organization,
    INTENSIVE_SEO.structuredData.offering,
    buildFaqSchema(intensiveFaqItems),
    buildCitationWebPageSchema({
      pageTitle: "Therafox Intensive",
      pageUrl: `${SITE_URL}/intensive`,
      items: citationItems,
    }),
  ];

  if (isShareView) {
    return (
      <>
        <meta name="robots" content={SEO_ROBOTS.noIndex} />
        {structuredData.map((entry, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <style>{`
          header, footer {
            display: none;
          }
        `}</style>
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <PlannerIsland initialPlanToken={planToken} initialIsShareView={isShareView} />
        </section>
      </>
    );
  }

  return (
    <PageShell>
      {structuredData.map((entry, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <div className="intensive-page">
      <PageHeroHeader
        title={intensiveCms?.heroHeading ?? fortyEight.heroHeading}
        subtitle={intensiveCms?.heroSubhead ?? fortyEight.heroSubhead}
        imageSrc={fortyEight.heroFurnitureSrc}
        imageAlt={fortyEight.heroFurnitureAlt}
      />

      <Section className="pt-8 sm:pt-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
            <div className="mb-4 h-[3px] w-14 rounded-full bg-[var(--accent-warm)]" />
            <Text role="eyebrow" className="text-primary">
              {intensiveCms?.sellTitle ?? fortyEight.sellTitle}
            </Text>
            <Heading role="h2" className="mt-3">
              {intensiveCms?.sellLead ?? fortyEight.sellLead}
            </Heading>
            <div className="mt-4 space-y-4">
              <Text role="body" measure="narrow" className="text-body">
                {intensiveCms?.sellBodyOne ?? fortyEight.sellBodyOne}
              </Text>
              <Text role="body" measure="narrow" className="text-body">
                {intensiveCms?.sellBodyTwo ?? fortyEight.sellBodyTwo}
              </Text>
              <Text role="body" measure="narrow" className="font-medium text-heading">
                {intensiveCms?.sellOutcome ?? fortyEight.sellOutcome}
              </Text>
            </div>
          </div>

          <aside className="flex h-full flex-col rounded-2xl border border-border bg-surface-2 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
            <div className="mx-auto mb-4 h-[3px] w-14 rounded-full bg-[var(--accent)]" />
            <Heading role="h3" className="text-center">
              {intensiveCms?.includedTitle ?? fortyEight.includedTitle}
            </Heading>
            <ul className="mt-4 flex flex-1 flex-col justify-between gap-5">
              {includedItemTexts.map((item, index) => (
                <li key={`${item}-${index}`} className="flex flex-col items-center gap-3 text-center">
                  <IconBadge
                    src={fortyEight.includedItems[index]?.iconSrc ?? fortyEight.includedItems[0]?.iconSrc}
                    size={58}
                    variant="primary"
                  />
                  <Text role="bodySmall" className="text-body">{item}</Text>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
      <Section className="-mt-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface-2 p-6 shadow-[0_16px_36px_var(--color-shadow)] sm:flex-row sm:items-center sm:p-8">
            <div className="space-y-3">
              <Heading role="h3">
                {intensiveCms?.waitlistCtaTitle ?? fortyEight.waitlistCtaTitle}
              </Heading>
              <Text role="bodySmall" className="text-body">
                {intensiveCms?.waitlistCtaBody ?? fortyEight.waitlistCtaBody}
              </Text>
            </div>
            <Link
              className={ctaClass(
                "primary",
                "px-8 text-[17px] !bg-[var(--accent-warm)] !text-canvas hover:!bg-[#b85f36]",
              )}
              href="#conversion"
            >
              {fortyEight.waitlistCtaLabel}
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pt-2 sm:pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Heading role="h2">{fortyEight.vignettesTitle}</Heading>
            <Text role="body" className="mt-3 text-body" measure="narrow">
              {fortyEight.vignettesIntro}
            </Text>
          </div>
          <div className="mt-6 space-y-4">
            {fortyEight.vignettes.map(
              (vignette: { title: string; body: string; outcomes: string[] }) => (
                <details
                  key={vignette.title}
                  className="rounded-2xl border border-border bg-surface-1 p-6 shadow-[0_16px_36px_var(--color-shadow)]"
                >
                  <summary className="cursor-pointer list-none text-lg font-medium text-heading">
                    <div className="flex items-center justify-between gap-4">
                      <span>{vignette.title}</span>
                      <span className="text-sm font-normal text-body">
                        {fortyEight.vignetteToggleLabel}
                      </span>
                    </div>
                  </summary>
                  <div className="mt-4 space-y-4">
                    <Text role="body" className="text-body" measure="narrow">
                      {vignette.body}
                    </Text>
                    <div>
                      <Text role="body" className="font-medium text-heading">
                        {fortyEight.vignetteOutcomeLabel}
                      </Text>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-body">
                        {vignette.outcomes.map((item) => (
                          <li key={item}>
                            <Text role="body" as="span" className="text-body">
                              {item}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              ),
            )}
          </div>
          <Text role="bodySmall" className="mt-4 text-body" measure="narrow">
            {fortyEight.vignettesNote}
          </Text>
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-6 py-2 sm:py-4">
        <div className="relative mx-auto h-[146px] w-full max-w-[520px] sm:h-[168px] sm:max-w-[620px]">
          <Image
            src="/furniture/sideboard-2-elevation-color.png"
            alt=""
            fill
            className="object-contain"
            sizes="(min-width: 640px) 620px, 520px"
          />
        </div>
      </section>

      <Section>
        <div id="themes" className="mx-auto max-w-6xl">
          <Text role="eyebrow" className="text-primary">
            {themesCms?.sectionEyebrow ?? INTENSIVE_THEME_PAGES_COPY.sectionEyebrow}
          </Text>
          <Heading role="h2" className="mt-3">
            {themesCms?.sectionTitle ?? INTENSIVE_THEME_PAGES_COPY.sectionTitle}
          </Heading>
          <Text role="body" className="mt-3 text-body" measure="narrow">
            {themesCms?.sectionBody ?? INTENSIVE_THEME_PAGES_COPY.sectionBody}
          </Text>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INTENSIVE_THEME_PAGES_COPY.themes.map((theme) => (
              <Link key={theme.slug} href={`/intensive/${theme.slug}`} className="block">
                <SurfaceCard interactive className="h-full">
                  <Text role="body" className="font-medium text-heading">
                    {themeOverrideMap.get(theme.slug)?.navLabel ?? theme.navLabel}
                  </Text>
                  <Text role="bodySmall" className="mt-2 text-body" measure="narrow">
                    {themeOverrideMap.get(theme.slug)?.subtitle ?? theme.subtitle}
                  </Text>
                </SurfaceCard>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-2 sm:pt-4">
        <IntensiveWaitlistSection copy={fortyEight} />
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
              {themeQuotes.map((entry, index) => {
                const firstThemeSlug = entry.themeSlugs?.[0];
                const firstTheme = firstThemeSlug
                  ? INTENSIVE_THEME_PAGES_COPY.themes.find((theme) => theme.slug === firstThemeSlug)
                  : null;

                return (
                  <SurfaceCard key={`${entry.practitioner}-${index}`} className="h-full">
                    <Text role="body" className="text-heading">
                      "{entry.quote}"
                    </Text>
                    <Text role="bodySmall" className="mt-3 text-body">
                      {entry.practitioner}
                    </Text>
                    <Link
                      className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                      href={entry.sourceUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {themesCms?.quoteSourcePrefix ?? INTENSIVE_THEME_PAGES_COPY.quoteSourcePrefix}:{" "}
                      {entry.sourceTitle}
                    </Link>
                    {firstTheme ? (
                      <Link
                        className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                        href={`/intensive/${firstTheme.slug}`}
                      >
                        {themesCms?.quoteThemePrefix ?? INTENSIVE_THEME_PAGES_COPY.quoteThemePrefix}:{" "}
                        {themeOverrideMap.get(firstTheme.slug)?.navLabel ?? firstTheme.navLabel}
                      </Link>
                    ) : null}
                  </SurfaceCard>
                );
              })}
            </div>
          </div>
        </Section>
      ) : null}

      {SHOW_INTENSIVE_AGENDA_BUILDER ? (
        <Section>
          <PlannerV2Island />
        </Section>
      ) : null}
      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="h-6 w-[3px] rounded-full bg-[var(--accent-warm)]" />
            <IconBadge src={fortyEight.faqIconSrc} size={50} variant="accent" />
            <Heading role="h2">{intensiveCms?.faqTitle ?? fortyEight.faqTitle}</Heading>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {intensiveFaqItems.map((item, index) => (
              <div
                key={`${item.question}-${index}`}
                className="rounded-2xl border border-border bg-surface-1 p-6"
              >
                <Text role="body" className="text-heading font-medium">
                  {item.question}
                </Text>
                <Text role="bodySmall" className="mt-3 text-body">
                  {item.answer}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Section>
      </div>
    </PageShell>
  );
}
