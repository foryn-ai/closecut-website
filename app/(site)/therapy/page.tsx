import { PageShell } from "@/components/layout/PageShell";
import { Timeline } from "@/components/aceternity/timeline";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveTherapyCopy } from "@/lib/copy/clinicianCms";
import Link from "next/link";
import { ctaClass } from "@/components/shared/cta";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import Image from "next/image";
import { buildFaqSchema } from "@/lib/seo/structuredData";

const SERVICE_IMAGE_FALLBACK = "/images/office.jpg";

const SERVICE_VISUALS: Record<
  string,
  | { type: "single"; src: string; alt: string }
  | { type: "pair"; items: Array<{ src: string; alt: string }> }
> = {
  intensive: {
    type: "single",
    src: "/furniture/desk-lamp.svg",
    alt: "Desk lamp furniture illustration",
  },
  individual: {
    type: "single",
    src: "/furniture/chair-2-elevation-color.png",
    alt: "Chair furniture illustration",
  },
  relational: {
    type: "single",
    src: "/furniture/sofa.svg",
    alt: "Sofa furniture illustration",
  },
  "sex-therapy": {
    type: "single",
    src: "/furniture/single-bed-elevation-color.png",
    alt: "Single bed furniture illustration",
  },
  "pre-commitment": {
    type: "pair",
    items: [
      { src: "/furniture/meeting-chair-1.svg", alt: "Meeting chair one illustration" },
      { src: "/furniture/meeting-chair-2.svg", alt: "Meeting chair two illustration" },
    ],
  },
};

type TherapyPageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function TherapyPage({ searchParams }: TherapyPageProps) {
  const params = await searchParams;
  const cmsCopy = await getClinicianCopyGlobal();
  const therapy: typeof SITE_COPY.therapy = resolveTherapyCopy(SITE_COPY.therapy, cmsCopy);
  const services = therapy.services;
  const defaultService = services[0];
  const selectedService =
    services.find((service) => service.id === params?.service) ?? defaultService;
  const selectedServiceVisual =
    SERVICE_VISUALS[selectedService.id] ?? {
      type: "single" as const,
      src: SERVICE_IMAGE_FALLBACK,
      alt: selectedService.title,
    };
  const faqSchema = buildFaqSchema(therapy.faqItems);

  return (
    <div className="min-h-screen bg-canvas">
      <PageShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <PageHeroHeader
          title={therapy.setupTitle}
          subtitle={therapy.setupSubhead}
          imageSrc={therapy.heroFurnitureSrc}
          imageAlt={therapy.heroFurnitureAlt}
        />
        <section id="services" className="tf-rule-section mx-auto max-w-6xl px-6 pb-12 pt-8">
          <div className="flex items-center gap-3">
            <IconBadge src={therapy.heroIconSrc} size={36} />
            <Heading role="h2">{therapy.servicesTitle}</Heading>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={therapy.servicePickerLabel}>
            {services.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <Link
                  key={service.id}
                  href={`/therapy?service=${service.id}#services`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-current={isSelected ? "page" : undefined}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface-1 text-heading hover:border-primary/60 hover:bg-surface-2"
                  }`}
                >
                  {service.tabLabel}
                </Link>
              );
            })}
          </div>
          <div className="mt-6 grid gap-6 rounded-2xl border border-border bg-surface-1 p-6 md:grid-cols-[1fr_1.3fr] md:p-8">
            <div
              className="relative min-h-[240px] overflow-hidden rounded-xl border border-border bg-surface-2 md:min-h-[320px]"
              aria-label={therapy.serviceImageLabel}
            >
              {selectedServiceVisual.type === "single" ? (
                <Image
                  src={selectedServiceVisual.src}
                  alt={selectedServiceVisual.alt}
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 768px) 34vw, 100vw"
                />
              ) : (
                <div className="grid h-full grid-cols-2 gap-3 p-4">
                  {selectedServiceVisual.items.map((item) => (
                    <div key={item.src} className="relative h-full w-full">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 768px) 17vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <Heading role="h3">{selectedService.title}</Heading>
              {selectedService.paragraphs.map((paragraph) => (
                <Text key={paragraph} role="body" className="text-body">
                  {paragraph}
                </Text>
              ))}
              <Text role="bodySmall" className="font-medium text-heading">
                {selectedService.goodFit}
              </Text>
            </div>
          </div>
        </section>
        <section className="tf-rule-section mx-auto max-w-6xl px-6 pt-4">
          <Heading role="h2">{therapy.howItWorksTitle}</Heading>
        </section>
        <Timeline
          className="tf-no-rule pb-16"
          items={therapy.scrollSteps.map((step) => ({
            title: (
              <div className="flex items-center gap-3">
                <IconBadge src={step.iconSrc} size={32} />
                <span>{step.title}</span>
              </div>
            ),
            content: (
              <div className="space-y-5">
                <p className="t-body">{step.body}</p>
                <ul className="t-body list-disc space-y-2 pl-5">
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
        <section className="tf-rule-section mx-auto max-w-6xl px-6 pb-12">
          <div className="flex items-center gap-3">
            <IconBadge src={therapy.faqIconSrc} size={36} />
            <Heading role="h2">{therapy.faqTitle}</Heading>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {therapy.faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-border bg-surface-1 p-6">
                <Text role="body" className="text-heading font-medium">
                  {item.question}
                </Text>
                <Text role="bodySmall" className="mt-3 text-body">
                  {item.answer}
                </Text>
              </div>
            ))}
          </div>
        </section>
        <section className="tf-rule-section mx-auto grid max-w-6xl gap-6 px-6 pb-16 pt-8 sm:pt-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-2 p-6">
            <div className="flex items-center gap-3">
              <IconBadge src={therapy.resourceIconSrc} size={32} />
              <Heading role="h3">{therapy.resourceTitle}</Heading>
            </div>
            <Text role="body" className="mt-3 text-body">
              {therapy.resourceBody}
            </Text>
            <Link className={`${ctaClass()} mt-4 inline-flex`} href="/resources">
              {therapy.resourceCtaLabel}
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-6">
            <div className="flex items-center gap-3">
              <IconBadge src={therapy.intensiveIconSrc} size={32} />
              <Heading role="h3">{therapy.intensiveTitle}</Heading>
            </div>
            <Text role="body" className="mt-3 text-body">
              {therapy.intensiveBody}
            </Text>
            <Link className={`${ctaClass()} mt-4 inline-flex`} href="/intensive">
              {therapy.intensiveCtaLabel}
            </Link>
          </div>
        </section>
      </PageShell>
    </div>
  );
}
