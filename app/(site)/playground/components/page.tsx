import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { HeroFurnitureImage } from "@/components/shared/HeroFurnitureImage";
import { HeroMediaBand } from "@/components/shared/HeroMediaBand";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { VideoCard } from "@/components/shared/VideoCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function ComponentPlaygroundPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas">
      <PageShell>
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-12 sm:pt-14">
          <Heading role="h1Page">Component Catalog</Heading>
          <Text role="body" className="mt-3 text-body">
            Dev-only reference for all shared UI building blocks. All components
            import from <code>@/components/shared/</code> or{" "}
            <code>@/components/ui/</code>.
          </Text>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Typography */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader title="Typography — Heading" />
          <div className="mt-8 space-y-6">
            {(
              [
                ["h1Hero", "h1Hero — 34/42px display"],
                ["h1Page", "h1Page — 30/36px display"],
                ["h2", "h2 — 24/30px display"],
                ["h3", "h3 — 20/22px display"],
                ["h4", "h4 — 18/20px display"],
              ] as const
            ).map(([role, label]) => (
              <div key={role} className="flex flex-col gap-1">
                <Text role="eyebrow" className="text-body/60">
                  role="{role}"
                </Text>
                <Heading role={role}>{label}</Heading>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader title="Typography — Text" />
          <div className="mt-8 space-y-6">
            {(
              [
                ["body", "body — 17/18px sans, leading 1.65"],
                ["bodySmall", "bodySmall — 16px sans, leading 1.6"],
                ["caption", "caption — 15px sans, leading 1.5"],
                ["label", "label — 14px sans medium"],
                ["fine", "fine — 13px sans"],
                ["eyebrow", "eyebrow — 12px sans uppercase tracked"],
                ["buttonText", "buttonText — 16px sans medium"],
              ] as const
            ).map(([role, label]) => (
              <div key={role} className="flex flex-col gap-1">
                <Text role="eyebrow" className="text-body/60">
                  role="{role}"
                </Text>
                <Text role={role}>{label}</Text>
              </div>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* Buttons / CTA */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader title="CTA Buttons" subtitle='ctaClass(variant) from @/components/shared/cta' />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className={ctaClass("primary")}>Primary CTA</button>
            <button className={ctaClass("secondary")}>Secondary CTA</button>
            <button className={ctaClass("tertiary")}>Tertiary CTA</button>
          </div>
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'ctaClass("primary") | ctaClass("secondary") | ctaClass("tertiary")'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* Section + SectionHeader */}
        {/* ------------------------------------------------------------------ */}
        <Section band="soft">
          <SectionHeader
            title="SectionHeader"
            subtitle="Optional subtitle — appears as bodySmall below the h2. Section wraps content in max-w-5xl with py-14 sm:py-20."
          />
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'<Section band="none|soft" rule="auto|none">'}
              {" / "}
              {'<SectionHeader title="..." subtitle="..." />'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* SurfaceCard */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader title="SurfaceCard" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SurfaceCard>
              <Heading role="h3">Standard card</Heading>
              <Text role="bodySmall" className="mt-2 text-body">
                Default — no interactive prop. Border, surface-1 bg, accent
                left-border rule.
              </Text>
            </SurfaceCard>
            <SurfaceCard interactive>
              <Heading role="h3">Interactive card</Heading>
              <Text role="bodySmall" className="mt-2 text-body">
                interactive=true adds hover scale, deeper border, and deeper
                shadow.
              </Text>
            </SurfaceCard>
          </div>
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'<SurfaceCard interactive={false|true}>'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* IconBadge */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader title="IconBadge" />
          <div className="mt-8 flex flex-wrap items-end gap-6">
            {(["primary", "accent", "soft"] as const).map((variant) => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <IconBadge
                  src="/icons/icon-heart.svg"
                  size={44}
                  variant={variant}
                />
                <Text role="fine" className="text-body/60">
                  {variant}
                </Text>
              </div>
            ))}
            {([32, 44, 56] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <IconBadge src="/icons/icon-heart.svg" size={size} />
                <Text role="fine" className="text-body/60">
                  size={size}
                </Text>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'<IconBadge src="..." size={44} variant="primary|accent|soft" />'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* HeroFurnitureImage */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader
            title="HeroFurnitureImage"
            subtitle="Fixed-height furniture illustration used at the top of page heroes. h-20 sm:h-24."
          />
          <div className="mt-8">
            <HeroFurnitureImage
              src="/furniture/lamp-elevation-color-2.png"
              alt="Lamp illustration"
            />
          </div>
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'<HeroFurnitureImage src="..." alt="..." />'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* PageHeroHeader */}
        {/* ------------------------------------------------------------------ */}
        <div className="border-y border-border">
          <PageHeroHeader
            title="PageHeroHeader"
            subtitle="Standard interior page hero — furniture image, h1Page heading, subtitle. Used on Therapy, About, Contact, Billing, Resources."
            imageSrc="/furniture/lamp-elevation-color-2.png"
            imageAlt="Lamp illustration"
          />
        </div>
        <Section>
          <Text role="fine" className="text-body/60">
            {'<PageHeroHeader title="..." subtitle="..." imageSrc="..." imageAlt="..." subtitleRole="body|bodySmall" subtitleMeasure="tight|narrow|none" />'}
          </Text>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* VideoCard */}
        {/* ------------------------------------------------------------------ */}
        <Section>
          <SectionHeader title="VideoCard" />
          <div className="mt-8 max-w-sm">
            <VideoCard
              title="Video card title"
              description="Optional description shown above the video area."
            />
          </div>
          <div className="mt-4">
            <Text role="fine" className="text-body/60">
              {'<VideoCard title="..." description="..." posterSrc="..." videoSrc="..." caption="..." />'}
            </Text>
          </div>
        </Section>

        {/* ------------------------------------------------------------------ */}
        {/* HeroMediaBand */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 border-y border-border">
          <HeroMediaBand
            posterSrc="/furniture/lamp-elevation-color-2.png"
            alt="Lamp illustration demo"
            showFade
          >
            <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center">
              <Heading role="h2" className="text-canvas">
                HeroMediaBand
              </Heading>
              <Text role="body" className="mt-4 text-canvas/80">
                Full-bleed image (or video) with overlay and optional fade.
                Accepts children for centered content.
              </Text>
            </div>
          </HeroMediaBand>
        </div>
        <Section>
          <Text role="fine" className="text-body/60">
            {'<HeroMediaBand posterSrc="..." alt="..." videoSrc="?" showFade imagePosition="..." overlayClassName="...">'}
          </Text>
        </Section>
      </PageShell>
    </div>
  );
}
