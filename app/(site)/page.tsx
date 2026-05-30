import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const STEAM_URL = "https://store.steampowered.com";

const features = [
  {
    id: "timing",
    title: "Risk / reward timing",
    description:
      "Longer holds earn more points, but the danger window closes in at the end of every stroke. Release inside the greed window for a score multiplier. Hold through it and the blade finds your fingers.",
  },
  {
    id: "knives",
    title: "Three knives",
    description:
      "Heavy Chef Knife for forgiving first runs. Chef Knife tightens the timing windows. The Paring Knife demands near-perfect form on every stroke.",
  },
  {
    id: "depth",
    title: "Steam achievements",
    description:
      "Eight achievements tracking clean finishes, close calls, cash milestones, and streaks. Nine languages at launch: EN, DE, ES, FR, JA, KO, PT-BR, RU, ZH-CN.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <PageShell tone="home">

        {/* Hero */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(300px, 42vw, 560px)" }}
        >
          <Image
            src="/images/hero.png"
            alt="Close Cut -- knife on a whetstone"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
            style={{ background: "rgba(26,22,18,0.55)" }}
          >
            <div
              className="relative mx-auto"
              style={{ width: "clamp(160px, 22vw, 300px)", aspectRatio: "16/9" }}
            >
              <Image
                src="/images/logo.png"
                alt="Close Cut"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <p
              className="text-[17px] sm:text-[20px] max-w-sm"
              style={{ color: "var(--text)" }}
            >
              One stroke separates a sharp blade from a cut hand.
            </p>
            <Link href={STEAM_URL} className={ctaClass("primary", "px-8 py-3 text-[16px]")}>
              Wishlist on Steam
            </Link>
          </div>
        </div>

        {/* Hook */}
        <Section>
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <div className="mx-auto w-14 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2" className="text-[34px] sm:text-[44px]">
              Hold. Push. Release.
            </Heading>
            <Text role="body" measure="narrow" className="text-body mx-auto">
              Push the knife across the stone. The longer you hold, the more you earn -- but
              the danger window is always at the end. Release inside the greed window for a
              score multiplier. Hold through it and the blade slips.
            </Text>
            <Text role="body" className="text-body">
              Three knives. Increasing difficulty. One-more-try loop.
            </Text>
          </div>
        </Section>

        {/* Feature cards */}
        <Section>
          <div className="mx-auto mb-8 max-w-xl text-center">
            <Heading role="h2">What you are getting into</Heading>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((f) => (
              <SurfaceCard key={f.id}>
                <div className="space-y-3">
                  <Heading role="h4" as="p">
                    {f.title}
                  </Heading>
                  <Text role="body" className="text-body">
                    {f.description}
                  </Text>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        {/* Art showcase */}
        <Section rule="none">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[1.37fr_1fr]">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/images/capsule.png"
                alt="Close Cut key art -- knife on whetstone"
                fill
                style={{ objectFit: "cover" }}
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ aspectRatio: "748/896" }}
            >
              <Image
                src="/images/poster.png"
                alt="Close Cut vertical poster"
                fill
                style={{ objectFit: "cover" }}
                sizes="(min-width: 768px) 36vw, 80vw"
              />
            </div>
          </div>
        </Section>

        {/* Steam CTA */}
        <Section band="soft">
          <div className="mx-auto max-w-lg space-y-5 text-center">
            <div className="mx-auto w-14 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2">Coming to Steam</Heading>
            <Text role="body" className="text-body">
              Add to your wishlist to be notified at launch.
            </Text>
            <Link href={STEAM_URL} className={ctaClass("primary", "mt-3 px-10 text-[17px]")}>
              Wishlist on Steam
            </Link>
            <Text role="fine" as="span" className="text-body block">
              9 languages at launch -- EN, DE, ES, FR, JA, KO, PT-BR, RU, ZH-CN
            </Text>
          </div>
        </Section>

      </PageShell>
    </div>
  );
}
