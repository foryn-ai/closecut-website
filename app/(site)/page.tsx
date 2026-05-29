import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { VideoCard } from "@/components/shared/VideoCard";
import { ctaClass } from "@/components/shared/cta";
import { IconBadge } from "@/components/shared/IconBadge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import {
  getClinicianCopyGlobal,
  resolveContactCopy,
  resolveHomeCopy,
} from "@/lib/copy/clinicianCms";
import { HomeStartHereForm } from "@/components/home/HomeStartHereForm";
import { OfficeHeroScene } from "@/components/home/OfficeHeroScene";
import { AreasOfInterestBanner } from "@/components/home/AreasOfInterestBanner";

export default async function Home() {
  const cmsCopy = await getClinicianCopyGlobal();
  const home: typeof SITE_COPY.home = resolveHomeCopy(SITE_COPY.home, cmsCopy);
  const contact: typeof SITE_COPY.contact = resolveContactCopy(SITE_COPY.contact, cmsCopy);

  return (
    <div className="min-h-screen bg-canvas">
      <PageShell tone="home">
        <OfficeHeroScene title="" subtitle={home.heroSubhead} />

        <Section className="mt-2 pt-0 sm:mt-4 sm:pt-0">
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface-1 px-6 py-8 text-center shadow-[0_20px_50px_var(--color-shadow)] sm:px-10 sm:py-10">
            <div className="mx-auto mb-5 w-20 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2" className="text-[34px] sm:text-[42px]">
              {home.connectionBandTitle}
            </Heading>
            <div className="mx-auto mt-4 max-w-3xl space-y-3">
              {home.connectionBandBody.map((paragraph, index) => (
                <Text key={`connection-band-${index}`} role="body" className="text-body">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </Section>

        <Section className="mt-6 pt-0 sm:mt-8 sm:pt-2">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="mx-auto w-16 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2">
              {home.waysTitle}
            </Heading>
            <Text role="body" className="text-body">
              {home.waysSubtitle}
            </Text>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {home.waysCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="block w-full md:max-w-[calc(50%-0.75rem)] xl:max-w-[calc(33.333%-1rem)] xl:flex-[0_1_calc(33.333%-1rem)]"
              >
                <SurfaceCard interactive className="h-full">
                  <div className="space-y-4 text-center">
                    <IconBadge src={card.iconSrc} size={56} className="mx-auto" />
                    <Heading role="h4" as="p">
                      {card.title}
                    </Heading>
                    <Text role="body" className="text-body">
                      {card.description}
                    </Text>
                  </div>
                </SurfaceCard>
              </Link>
            ))}
          </div>
        </Section>

        <section className="mx-auto max-w-6xl px-6 py-4 sm:py-6">
          <div className="relative mx-auto h-[120px] w-full max-w-[360px] sm:h-[140px] sm:max-w-[420px]">
            <Image
              src="/furniture/table-elevation-color.png"
              alt=""
              fill
              className="object-contain"
              sizes="(min-width: 640px) 420px, 360px"
            />
          </div>
        </section>

        <Section>
          <VideoCard
            title={home.videoTitle}
            description={home.videoDescription}
            videoSrc="/images/meet_anastasia_fox.mp4"
          />
        </Section>

        <Section className="pt-2 sm:pt-4">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border border-border bg-surface-2 p-6 text-center shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
              <div className="mx-auto mb-4 h-[3px] w-14 rounded-full bg-[var(--accent-warm)]" />
              <Heading role="h3">{home.intensiveTitle}</Heading>
              <Text role="body" className="mt-3 text-body">
                {home.intensiveBody}
              </Text>
              <Link
                className={`${ctaClass("primary", "mt-5 inline-flex px-8 text-[17px] !bg-[var(--accent-warm)] !text-canvas hover:!bg-[#b85f36]")}`}
                href="/intensive#conversion"
              >
                {home.intensiveCtaLabel}
              </Link>
            </div>
          </div>
        </Section>

        <section className="mx-auto max-w-6xl px-6 py-2 sm:py-4">
          <div className="relative mx-auto h-[100px] w-full max-w-[320px] sm:h-[120px] sm:max-w-[380px]">
            <Image
              src="/furniture/table-2-elevation-color.png"
              alt=""
              fill
              className="object-contain"
              sizes="(min-width: 640px) 380px, 320px"
            />
          </div>
        </section>

        <AreasOfInterestBanner
          title={home.areasOfInterestTitle}
          intro={home.areasOfInterestIntro}
          items={home.areasOfInterestItems}
        />

        <Section band="soft">
          <div className="mx-auto grid max-w-6xl gap-5 rounded-2xl border border-border bg-surface-1 p-5 shadow-[0_18px_45px_var(--color-shadow)] sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
            <div className="space-y-4">
              <div className="w-14 tf-home-rule tf-home-rule--warm" />
              <Heading role="h2" as="p">
                {home.nextStepTitle}
              </Heading>
              <Text role="body" measure="narrow" className="text-body">
                {home.nextStepBody}
              </Text>
            </div>
            <HomeStartHereForm
              copy={{
                formTitle: contact.formTitle,
                formNameLabel: contact.formNameLabel,
                namePlaceholder: contact.namePlaceholder,
                formEmailLabel: contact.formEmailLabel,
                emailPlaceholder: contact.emailPlaceholder,
                formMessageLabel: contact.formMessageLabel,
                messagePlaceholder: contact.messagePlaceholder,
                submitLabel: contact.submitLabel,
                submittingLabel: contact.submittingLabel,
                successMessage: contact.successMessage,
                errorMessage: contact.errorMessage,
                spamBlockedMessage: contact.spamBlockedMessage,
              }}
            />
          </div>
        </Section>
      </PageShell>
    </div>
  );
}
