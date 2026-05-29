import { PageShell } from "@/components/layout/PageShell";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveAboutCopy } from "@/lib/copy/clinicianCms";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { chip } from "@/lib/ui/classes";
import { ModalitiesBanner } from "@/components/about/ModalitiesBanner";
import { buildFaqSchema } from "@/lib/seo/structuredData";

type LogoCardProps = {
  src: string;
  alt: string;
  size?: "large" | "small";
  maxWidthClass?: string;
};

function LogoCard({ src, alt, size = "large", maxWidthClass }: LogoCardProps) {
  const sizeClass = maxWidthClass ?? (size === "large" ? "max-w-[250px]" : "max-w-[190px]");
  return (
    <div className="group row-span-1 flex items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-1 p-5 shadow-[0_16px_40px_var(--color-shadow)]">
      <div className={`relative aspect-[3/2] w-full ${sizeClass} transition duration-200 group-hover:translate-x-2`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
        />
      </div>
    </div>
  );
}

function DualLogoCard({
  first,
  second,
}: {
  first: { src: string; alt: string };
  second: { src: string; alt: string };
}) {
  return (
    <div className="group row-span-1 overflow-hidden rounded-xl border border-border bg-surface-1 p-5 shadow-[0_16px_40px_var(--color-shadow)]">
      <div className="grid h-full gap-4">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-[220px] transition duration-200 group-hover:translate-x-2">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
          />
        </div>
        <div className="relative mx-auto aspect-[3/2] w-full max-w-[220px] transition duration-200 group-hover:translate-x-2">
          <Image
            src={second.src}
            alt={second.alt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
          />
        </div>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const cmsCopy = await getClinicianCopyGlobal();
  const about: typeof SITE_COPY.about = resolveAboutCopy(SITE_COPY.about, cmsCopy);
  const logoAssets = about.logoAssets;
  const faqSchema = buildFaqSchema(about.faqItems);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeroHeader
        title={about.nameTitle}
        subtitle={about.heroSubtitle}
        imageSrc={about.heroFurnitureSrc}
        imageAlt={about.heroFurnitureAlt}
        className="pb-12"
      >
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border bg-surface-1 p-6 text-left shadow-[0_14px_36px_var(--color-shadow)] sm:p-8">
          <div className="flex items-center gap-3">
            <IconBadge src={about.heroIconSrc} size={32} />
            <Heading role="h3">{about.credentialResumeTitle}</Heading>
          </div>
          <div className="mt-5 space-y-5">
            {about.credentialResumeSections.map((section) => (
              <div key={section.heading} className="grid gap-2 border-t border-border/70 pt-4 sm:grid-cols-[220px_1fr] sm:gap-4">
                <Text role="label" className="text-heading">
                  {section.heading}
                </Text>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PageHeroHeader>
      <ModalitiesBanner
        title={about.modalitiesBandTitle}
        intro={about.modalitiesBandIntro}
        modalities={about.modalities}
      />
      <section className="tf-rule-section py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <BentoGrid className="md:auto-rows-[minmax(16rem,auto)]">
            <BentoGridItem
              className="md:col-span-2"
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.heroIconSrc} size={32} />
                  <Heading role="h2">{about.goodFitTitle}</Heading>
                </div>
              }
              description={
                <div className="space-y-4">
                  <Text role="body" className="text-body">
                    {about.goodFitBody}
                  </Text>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {about.goodFitDescriptors.map((descriptor) => (
                      <span
                        key={descriptor}
                        className={`${chip} justify-center text-center text-sm`}
                      >
                        {descriptor}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />

            <BentoGridItem
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.whatSexTherapyIsIconSrc} size={32} />
                  <Heading role="h2">{about.whatSexTherapyIsTitle}</Heading>
                </div>
              }
              description={<Text role="body" className="text-body">{about.bodyParagraphs[0]}</Text>}
            />

            <LogoCard src={logoAssets[5].src} alt={logoAssets[5].alt} size="large" />
            <BentoGridItem
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.relationallyTrainedIconSrc} size={32} />
                  <Heading role="h2">{about.relationallyTrainedTitle}</Heading>
                </div>
              }
              description={
                <ul className="t-body list-disc space-y-2 pl-5">
                  {about.relationallyTrainedBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              }
            />
            <LogoCard
              src={logoAssets[0].src}
              alt={logoAssets[0].alt}
              size="large"
              maxWidthClass="max-w-[300px]"
            />
            <LogoCard src={logoAssets[2].src} alt={logoAssets[2].alt} size="large" />

            <BentoGridItem
              className="md:col-span-2"
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.approachIconSrc} size={32} />
                  <Heading role="h2">{about.approachTitle}</Heading>
                </div>
              }
              description={
                <div className="t-body space-y-3">
                  {about.approachParagraphs.filter(Boolean).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className="list-disc space-y-1 pl-5">
                    {about.approachBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              }
            />

            <BentoGridItem
              className="md:col-span-2"
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.systemicThinkerIconSrc} size={32} />
                  <Heading role="h2">{about.systemicThinkerTitle}</Heading>
                </div>
              }
              description={
                <Text role="body" className="text-body">{about.systemicThinkerBody}</Text>
              }
            />

            <LogoCard src={logoAssets[1].src} alt={logoAssets[1].alt} size="small" />
            <div className="group row-span-1 overflow-hidden rounded-xl border border-border bg-surface-1 shadow-[0_16px_40px_var(--color-shadow)]">
              <div className="relative aspect-[4/3] w-full bg-canvas">
                <Image
                  src="/about/flag.jpg"
                  alt={about.portraitAlt}
                  fill
                  className="object-contain p-10 transition duration-200 group-hover:translate-x-2"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </div>

            <BentoGridItem
              className="md:col-span-2"
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.areasOfInterestIconSrc} size={32} />
                  <Heading role="h2">{about.areasOfInterestTitle}</Heading>
                </div>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  {about.areasOfInterest.map((item) => (
                    <span
                      key={item}
                      className={chip}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              }
            />

            <BentoGridItem
              className="md:col-span-2"
              title={
                <div className="flex items-center gap-3">
                  <IconBadge src={about.talkingAboutSexIconSrc} size={32} />
                  <Heading role="h2">{about.talkingAboutSexTitle}</Heading>
                </div>
              }
              description={<Text role="body" className="text-body">{about.bodyParagraphs[1]}</Text>}
            />

            <DualLogoCard first={logoAssets[4]} second={logoAssets[3]} />
          </BentoGrid>
        </div>
      </section>
      <section className="tf-rule-section mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-center gap-3">
          <IconBadge src={about.faqIconSrc} size={36} />
          <Heading role="h2">{about.faqTitle}</Heading>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {about.faqItems.map((item) => (
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
    </PageShell>
  );
}
