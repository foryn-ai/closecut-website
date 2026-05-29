import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveBillingCopy } from "@/lib/copy/clinicianCms";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { buildFaqSchema } from "@/lib/seo/structuredData";

export default async function BillingPage() {
  const cmsCopy = await getClinicianCopyGlobal();
  const billing: typeof SITE_COPY.billing = resolveBillingCopy(SITE_COPY.billing, cmsCopy);
  const hasStructuredBillingContent = Array.isArray(billing.paymentPolicyParagraphs);

  const faqSchema = buildFaqSchema(billing.faqItems);

  return (
    <div className="min-h-screen bg-canvas">
      <PageShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <PageHeroHeader
          title={billing.heroTitle}
          subtitle={billing.heroSubtitle}
          imageSrc={billing.heroFurnitureSrc}
          imageAlt={billing.heroFurnitureAlt}
        >
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link className={ctaClass("primary")} href={billing.primaryCtaHref}>
              {billing.primaryCtaLabel}
            </Link>
            <Link className={ctaClass("secondary")} href={billing.secondaryCtaHref}>
              {billing.secondaryCtaLabel}
            </Link>
          </div>
        </PageHeroHeader>

        {hasStructuredBillingContent ? (
          <Section className="pt-8 sm:pt-10">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="rounded-2xl bg-surface-2 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
                <div className="flex items-center gap-3">
                  <IconBadge src={billing.ratesIconSrc} size={36} />
                  <Heading role="h2">{billing.rates.title}</Heading>
                </div>
                <Text role="bodySmall" className="mt-2 text-body">
                  {billing.rates.subtitle}
                </Text>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {billing.rates.cards.map((card: { title: string; price: string; body: string }) => (
                    <SurfaceCard key={card.title}>
                      <Text role="eyebrow" className="text-primary">
                        {card.price}
                      </Text>
                      <Heading role="h4" className="mt-2">
                        {card.title}
                      </Heading>
                      <Text role="body" className="mt-3 text-body">
                        {card.body}
                      </Text>
                    </SurfaceCard>
                  ))}
                </div>
              </div>

              <SurfaceCard>
                <Heading role="h2">{billing.paymentPolicyTitle}</Heading>
                <div className="mt-4 space-y-3">
                  {billing.paymentPolicyParagraphs.map((paragraph: string) => (
                    <Text key={paragraph} role="body" className="text-body">
                      {paragraph}
                    </Text>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard>
                <Heading role="h2">{billing.superbillSectionTitle}</Heading>
                <Text role="body" className="mt-4 text-body">
                  {billing.superbillSectionBody}
                </Text>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
                  {billing.superbillItems.map((item: string) => (
                    <li key={item}>
                      <Text role="body" as="span" className="text-body">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
                <Text role="body" className="mt-4 text-body">
                  {billing.superbillSectionNote}
                </Text>
              </SurfaceCard>

              <SurfaceCard>
                <Heading role="h2">{billing.outOfNetworkTitle}</Heading>
                <Text role="body" className="mt-4 text-body">
                  {billing.outOfNetworkIntro}
                </Text>
                <Text role="body" className="mt-4 text-body">
                  {billing.outOfNetworkPrompt}
                </Text>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
                  {billing.outOfNetworkQuestions.map((question: string) => (
                    <li key={question}>
                      <Text role="body" as="span" className="text-body">
                        {question}
                      </Text>
                    </li>
                  ))}
                </ul>
                <Text role="bodySmall" className="mt-4 text-body">
                  {billing.outOfNetworkNote}
                </Text>
              </SurfaceCard>

              <SurfaceCard>
                <Heading role="h2">{billing.cptTitle}</Heading>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 pr-4 text-sm font-medium text-heading">Code</th>
                        <th className="py-3 text-sm font-medium text-heading">Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billing.cptCodes.map((row: { code: string; service: string }) => (
                        <tr key={row.code} className="border-b border-border last:border-b-0">
                          <td className="py-3 pr-4 align-top text-sm text-heading">{row.code}</td>
                          <td className="py-3 text-sm text-body">{row.service}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Text role="bodySmall" className="mt-4 text-body">
                  {billing.cptNote}
                </Text>
              </SurfaceCard>

              <SurfaceCard>
                <Heading role="h2">{billing.diagnosisRequirementTitle}</Heading>
                <div className="mt-4 space-y-3">
                  {billing.diagnosisRequirementParagraphs.map((paragraph: string) => (
                    <Text key={paragraph} role="body" className="text-body">
                      {paragraph}
                    </Text>
                  ))}
                </div>
                <Text role="body" className="mt-4 text-body">
                  {billing.diagnosisExamplesTitle}
                </Text>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
                  {billing.diagnosisExamples.map((item: string) => (
                    <li key={item}>
                      <Text role="body" as="span" className="text-body">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>

              <SurfaceCard>
                <Heading role="h2">{billing.importantNotesTitle}</Heading>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
                  {billing.importantNotes.map((item: string) => (
                    <li key={item}>
                      <Text role="body" as="span" className="text-body">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>

            </div>
          </Section>
        ) : (
          <>
            <Section className="pt-8 sm:pt-10">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="rounded-2xl bg-surface-2 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <IconBadge src={billing.ratesIconSrc} size={36} />
                    <Heading role="h2">{billing.rates.title}</Heading>
                  </div>
                  <Text role="bodySmall" className="mt-2 text-body">
                    {billing.rates.subtitle}
                  </Text>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {billing.rates.cards.map((card: { title: string; price: string; body: string }) => (
                      <SurfaceCard key={card.title}>
                        <Text role="eyebrow" className="text-primary">
                          {card.price}
                        </Text>
                        <Heading role="h4" className="mt-2">
                          {card.title}
                        </Heading>
                        <Text role="body" className="mt-3 text-body">
                          {card.body}
                        </Text>
                      </SurfaceCard>
                    ))}
                  </div>
                </div>

                <SurfaceCard>
                  <Heading role="h2">{billing.privatePayTitle}</Heading>
                  <div className="mt-4 space-y-3">
                    {billing.privatePayParagraphs.map((paragraph: string) => (
                      <Text key={paragraph} role="body" className="text-body">
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                </SurfaceCard>

                <SurfaceCard>
                  <Heading role="h2">{billing.superbillsTitle}</Heading>
                  <Text role="body" className="mt-4 text-body">
                    {billing.superbillsBody}
                  </Text>
                </SurfaceCard>

                <SurfaceCard>
                  <Heading role="h2">{billing.howItWorksTitle}</Heading>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-body">
                    {billing.howItWorksSteps.map((step: string) => (
                      <li key={step}>
                        <Text role="body" as="span" className="text-body">
                          {step}
                        </Text>
                      </li>
                    ))}
                  </ol>
                  <Text role="bodySmall" className="mt-4 text-body">
                    {billing.howItWorksNote}
                  </Text>
                </SurfaceCard>

                <SurfaceCard>
                  <Heading role="h2">{billing.diagnosisTitle}</Heading>
                  <div className="mt-4 space-y-3">
                    {billing.diagnosisParagraphs.map((paragraph: string) => (
                      <Text key={paragraph} role="body" className="text-body">
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                </SurfaceCard>

                <SurfaceCard>
                  <Heading role="h2">{billing.beforeStartTitle}</Heading>
                  <Text role="body" className="mt-4 text-body">
                    {billing.beforeStartBody}
                  </Text>
                </SurfaceCard>
              </div>
            </Section>

            {billing.faqItems.length > 0 ? (
              <Section>
                <div className="mx-auto max-w-6xl">
                  <div className="flex items-center gap-3">
                    <IconBadge src={billing.faqIconSrc} size={36} />
                    <Heading role="h2">{billing.faqTitle}</Heading>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {billing.faqItems.map((item: { question: string; answer: string }) => (
                      <div
                        key={item.question}
                        className="rounded-2xl border border-border bg-surface-1 p-6"
                      >
                        <Text role="body" className="font-medium text-heading">
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
            ) : null}
          </>
        )}

        <Section band="soft">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-1 px-6 py-8 text-center shadow-[0_20px_50px_var(--color-shadow)] sm:px-10">
            <Heading role="h2">{billing.closingCtaTitle}</Heading>
            <Text role="body" className="mx-auto mt-3 max-w-3xl text-body">
              {billing.closingCtaBody}
            </Text>
            <Link className={`${ctaClass("primary")} mt-5 inline-flex`} href={billing.closingCtaHref}>
              {billing.closingCtaLabel}
            </Link>
          </div>
        </Section>
      </PageShell>
    </div>
  );
}
