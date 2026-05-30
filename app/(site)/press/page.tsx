import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { PressContactForm } from "@/components/press/PressContactForm";

export const metadata: Metadata = {
  title: "Press Kit -- Close Cut",
  description:
    "Key art, factsheet, and press contact for Close Cut -- a knife-sharpening skill game for Steam.",
};

const factsheet: Array<[string, string]> = [
  ["Title", "Close Cut"],
  ["Genre", "Arcade / Skill"],
  ["Platform", "PC -- Steam"],
  ["Developer", "Foryn AI"],
  ["Release", "TBA"],
  ["Languages", "EN, DE, ES, FR, JA, KO, PT-BR, RU, ZH-CN"],
  ["Achievements", "8 Steam achievements"],
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <PageShell tone="interior">
        <Section>
          <div className="mb-10 space-y-4">
            <Heading role="h1Page">Press Kit</Heading>
            <Text role="body" measure="narrow" className="text-body">
              Close Cut is a knife-sharpening skill game for Steam. One button, three knives,
              one-more-try loop. Key art, factsheet, and press contact below.
            </Text>
          </div>

          {/* Factsheet */}
          <div className="mb-12">
            <Heading role="h2" className="mb-5">Factsheet</Heading>
            <SurfaceCard>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {factsheet.map(([label, value]) => (
                  <div key={label}>
                    <Text role="eyebrow" as="p" className="text-primary mb-0.5">
                      {label}
                    </Text>
                    <Text role="body" className="text-heading">
                      {value}
                    </Text>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          {/* Key art */}
          <Heading role="h2" className="mb-5">Key Art</Heading>
          <div className="mb-12 grid grid-cols-1 items-start gap-5 md:grid-cols-[1.37fr_1fr]">
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/images/capsule.png"
                  alt="Close Cut horizontal key art"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </div>
              <Text role="fine" className="text-body">Horizontal capsule -- 1232x706</Text>
            </div>
            <div className="space-y-2">
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "748/896" }}>
                <Image
                  src="/images/poster.png"
                  alt="Close Cut vertical poster"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(min-width: 768px) 33vw, 80vw"
                />
              </div>
              <Text role="fine" className="text-body">Vertical capsule -- 748x896</Text>
            </div>
          </div>

          {/* Hero banner */}
          <Heading role="h3" className="mb-5">Hero Banner</Heading>
          <div className="mb-12">
            <div className="relative aspect-[3840/1240] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/hero.png"
                alt="Close Cut hero banner"
                fill
                style={{ objectFit: "cover" }}
                sizes="90vw"
              />
            </div>
            <Text role="fine" className="mt-2 text-body">Hero banner -- 3840x1240</Text>
          </div>

          {/* Logo */}
          <Heading role="h3" className="mb-5">Logo</Heading>
          <div className="mb-12 inline-block rounded-xl border border-border bg-surface-1 p-6">
            <Image
              src="/images/logo.png"
              alt="Close Cut logo"
              width={320}
              height={180}
            />
          </div>

          {/* Press contact */}
          <div className="mb-2">
            <Heading role="h2" className="mb-5">Press contact</Heading>
            <Text role="body" measure="narrow" className="text-body mb-6">
              For preview builds, interviews, or additional assets.
            </Text>
          </div>
          <SurfaceCard>
            <PressContactForm />
          </SurfaceCard>
        </Section>
      </PageShell>
    </div>
  );
}
