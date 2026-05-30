import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import copy from "@/copy-drafts/home.json";

const STEAM_URL = "https://store.steampowered.com";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <PageShell tone="home">

        {/* Hero -- logo only, no overlay text */}
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
            className="absolute inset-0"
            style={{ background: "rgba(26,22,18,0.35)" }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 relative"
              style={{ top: "23%", width: "clamp(200px, 28vw, 380px)", aspectRatio: "960/311" }}
            >
              <Image
                src="/images/closecut-logo.svg"
                alt="Close Cut"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* Hook */}
        <Section>
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <div className="mx-auto w-14 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2" className="text-[34px] sm:text-[44px]">
              {copy.hook_heading}
            </Heading>
            <Text role="body" measure="narrow" className="text-body mx-auto">
              {copy.hook_body}
            </Text>
            <Text role="body" className="text-body">
              {copy.hook_tagline}
            </Text>
          </div>
        </Section>

        {/* Feature cards */}
        <Section>
          <div className="mx-auto mb-8 max-w-xl text-center">
            <Heading role="h2">{copy.features_heading}</Heading>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {copy.features.map((f) => (
              <SurfaceCard key={f.id}>
                <div className="space-y-3">
                  <Heading role="h4" as="p">
                    {f.title}
                  </Heading>
                  <Text role="body" className="text-body">
                    {f.body}
                  </Text>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        {/* Steam CTA */}
        <Section band="soft">
          <div className="mx-auto max-w-lg space-y-5 text-center">
            <div className="mx-auto w-14 tf-home-rule tf-home-rule--warm" />
            <Heading role="h2">{copy.cta_heading}</Heading>
            <Text role="body" className="text-body">
              {copy.cta_body}
            </Text>
            <Link href={STEAM_URL} className={ctaClass("primary", "mt-3 px-10 text-[17px]")}>
              {copy.cta_button}
            </Link>
            <Text role="fine" as="span" className="text-body block">
              {copy.cta_fine}
            </Text>
          </div>
        </Section>

      </PageShell>
    </div>
  );
}
