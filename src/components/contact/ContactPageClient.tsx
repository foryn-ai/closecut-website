"use client";

import { useState } from "react";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { track } from "@/lib/analytics/adapter";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import { focusRing, input } from "@/lib/ui/classes";
import { IconBadge } from "@/components/shared/IconBadge";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { buildFaqSchema } from "@/lib/seo/structuredData";

type SubmitState = "idle" | "submitting" | "success" | "error" | "spam";

type ContactPageClientProps = {
  contact: any;
};

export function ContactPageClient({ contact }: ContactPageClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formStartedAt] = useState(() => Date.now());

  const submitLabel =
    submitState === "submitting" ? contact.submittingLabel : contact.submitLabel;

  const statusMessage =
    submitState === "success"
      ? contact.successMessage
      : submitState === "spam"
        ? contact.spamBlockedMessage
        : submitState === "error"
          ? contact.errorMessage
          : "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
          startedAt: formStartedAt,
          campaignAttribution: getCampaignAttribution(),
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; code?: string };
      if (!response.ok || !payload.ok) {
        if (payload.code === "spam_blocked") {
          setSubmitState("spam");
          return;
        }
        setSubmitState("error");
        track(ANALYTICS_EVENTS.contactFormError, { reason: "response_error" });
        return;
      }

      setSubmitState("success");
      track(ANALYTICS_EVENTS.contactFormSubmit);
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setSubmitState("error");
      track(ANALYTICS_EVENTS.contactFormError, { reason: "network_error" });
    }
  };

  const faqSchema = buildFaqSchema(contact.faqItems);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeroHeader
        title={contact.heroTitle}
        subtitle={contact.heroSubtitle}
        imageSrc={contact.heroFurnitureSrc}
        imageAlt={contact.heroFurnitureAlt}
        subtitleRole="bodySmall"
      />
      <Section className="pt-8 sm:pt-10">
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <SurfaceCard>
              <Text role="body" className="text-body">
                {contact.contactIntro}
              </Text>
              {contact.contactBody ? (
                <Text role="body" className="mt-3 text-body">
                  {contact.contactBody}
                </Text>
              ) : null}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-1 p-4">
                  <div className="flex items-center gap-2">
                    <IconBadge src={contact.serviceAreaIconSrc} size={28} />
                    <Text role="eyebrow" className="text-primary">
                      {contact.serviceAreaTitle}
                    </Text>
                  </div>
                  <Text role="bodySmall" className="mt-2 text-body">
                    {contact.serviceAreaBody}
                  </Text>
                </div>
                <div className="rounded-xl border border-border bg-surface-1 p-4">
                  <div className="flex items-center gap-2">
                    <IconBadge src={contact.hoursIconSrc} size={28} />
                    <Text role="eyebrow" className="text-primary">
                      {contact.hoursTitle}
                    </Text>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-body">
                    {contact.hoursItems.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          </div>
          <SurfaceCard>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3">
                <IconBadge src={contact.formIconSrc} size={32} />
                <Heading role="h3">{contact.formTitle}</Heading>
              </div>
              <div className="grid gap-3">
                <label className="sr-only" htmlFor="contact-name">
                  {contact.formNameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={contact.namePlaceholder}
                  className={`${input} ${focusRing}`}
                  required
                  minLength={2}
                  maxLength={120}
                />
                <label className="sr-only" htmlFor="contact-email">
                  {contact.formEmailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={contact.emailPlaceholder}
                  className={`${input} ${focusRing}`}
                  required
                  maxLength={320}
                />
                <label className="sr-only" htmlFor="contact-message">
                  {contact.formMessageLabel}
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={contact.messagePlaceholder}
                  className={`min-h-[120px] ${input} ${focusRing}`}
                  required
                  minLength={10}
                  maxLength={3000}
                />
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  className="hidden"
                />
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className={ctaClass("primary")}
                >
                  {submitLabel}
                </button>
                <Text role="fine" className="text-body">
                  {contact.formHelperText}
                </Text>
                {statusMessage ? (
                  <Text role="bodySmall" className="text-body">
                    {statusMessage}
                  </Text>
                ) : null}
              </div>
            </form>
          </SurfaceCard>
        </div>
        <div className="mt-10 sm:mt-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {contact.locationPhotos.map((photo: { src: string; alt: string }) => (
              <div
                key={photo.src}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-2"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 92vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-3">
            <IconBadge src={contact.faqIconSrc} size={36} />
            <Heading role="h2">{contact.faqTitle}</Heading>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {contact.faqItems.map((item: { question: string; answer: string }) => (
              <SurfaceCard key={item.question}>
                <Heading role="h3">{item.question}</Heading>
                <Text role="bodySmall" className="mt-3 text-body">
                  {item.answer}
                </Text>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
