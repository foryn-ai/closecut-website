"use client";

import { useMemo, useState } from "react";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { IconBadge } from "@/components/shared/IconBadge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ctaClass } from "@/components/shared/cta";
import { SITE_COPY } from "@/lib/copy";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import type { WorkshopTopic } from "@/lib/workshops/config";
import { focusRing, input } from "@/lib/ui/classes";

type SubmitState = "idle" | "submitting" | "success" | "error" | "spam";

type WorkshopsWaitlistProps = {
  topics: WorkshopTopic[];
};

export function WorkshopsWaitlist({ topics }: WorkshopsWaitlistProps) {
  const { workshops } = SITE_COPY;
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id ?? "");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [seatsInterested, setSeatsInterested] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formStartedAt] = useState(() => Date.now());

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedTopicId) ?? null,
    [selectedTopicId, topics],
  );

  const successMessage = selectedTopic
    ? workshops.formSuccessTemplate.replace("{topic}", selectedTopic.title)
    : workshops.formSuccessTemplate.replace("{topic}", workshops.formSuccessFallbackTopic);

  const statusMessage =
    submitState === "spam"
      ? workshops.formSpamMessage
      : submitState === "error"
        ? workshops.formErrorMessage
        : "";

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    document.getElementById("workshop-waitlist")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/workshops-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          selectedTopicId,
          seatsInterested,
          preferredTiming,
          consent,
          website,
          startedAt: formStartedAt,
          campaignAttribution: getCampaignAttribution(),
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; code?: string };
      if (!response.ok || !payload.ok) {
        if (response.status === 429 || payload.code === "spam_blocked") {
          setSubmitState("spam");
          return;
        }
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setFirstName("");
      setEmail("");
      setSeatsInterested("");
      setPreferredTiming("");
      setConsent(false);
      setWebsite("");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <SurfaceCard key={topic.id} className="h-full" interactive>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <IconBadge src={topic.iconSrc} size={40} />
                  <Heading role="h3">{topic.title}</Heading>
                </div>
                <Text role="body" className="text-body">
                  {topic.shortDescription}
                </Text>
                <ul className="t-body list-disc space-y-2 pl-5 text-body">
                  {topic.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <Text role="bodySmall" className="text-body">
                  <span className="font-medium text-heading">{workshops.topicWhoItsForLabel}</span> {topic.whoItsFor}
                </Text>
                <Text role="bodySmall" className="text-body">
                  <span className="font-medium text-heading">{workshops.topicTakeawayLabel}</span> {topic.takeaway}
                </Text>
                <button
                  type="button"
                  className={ctaClass()}
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  {workshops.topicCtaLabel}
                </button>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section id="workshop-waitlist" className="space-y-4">
        <div className="flex items-center gap-3">
          <IconBadge src={workshops.formIconSrc} size={36} />
          <Heading role="h2">{workshops.formTitle}</Heading>
        </div>
        <Text role="body" className="text-body" measure="narrow">
          {workshops.formBody}
        </Text>
        <SurfaceCard>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <label className="sr-only" htmlFor="workshop-first-name">
                {workshops.formFirstNameLabel}
              </label>
              <input
                id="workshop-first-name"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder={workshops.formFirstNameLabel}
                className={`${input} ${focusRing}`}
                required
                minLength={2}
                maxLength={120}
              />
              <label className="sr-only" htmlFor="workshop-email">
                {workshops.formEmailLabel}
              </label>
              <input
                id="workshop-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={workshops.formEmailLabel}
                className={`${input} ${focusRing}`}
                required
                maxLength={320}
              />
              <label className="sr-only" htmlFor="workshop-topic">
                {workshops.formTopicLabel}
              </label>
              <select
                id="workshop-topic"
                value={selectedTopicId}
                onChange={(event) => setSelectedTopicId(event.target.value)}
                className={`${input} ${focusRing}`}
                required
              >
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="workshop-seats">
                {workshops.formSeatsLabel}
              </label>
              <select
                id="workshop-seats"
                value={seatsInterested}
                onChange={(event) => setSeatsInterested(event.target.value)}
                className={`${input} ${focusRing}`}
              >
                <option value="">{workshops.formSeatsLabel}</option>
                {workshops.formSeatsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="workshop-timing">
                {workshops.formTimingLabel}
              </label>
              <select
                id="workshop-timing"
                value={preferredTiming}
                onChange={(event) => setPreferredTiming(event.target.value)}
                className={`${input} ${focusRing}`}
              >
                <option value="">{workshops.formTimingLabel}</option>
                {workshops.formTimingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label className="flex items-start gap-3 text-sm text-body">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                  className="mt-1 h-4 w-4"
                />
                <span>{workshops.formConsentLabel}</span>
              </label>
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
                {workshops.formSubmitLabel}
              </button>
              {submitState === "success" ? (
                <Text role="bodySmall" className="text-body">
                  {successMessage}
                </Text>
              ) : null}
              {statusMessage ? (
                <Text role="bodySmall" className="text-body">
                  {statusMessage}
                </Text>
              ) : null}
            </div>
          </form>
        </SurfaceCard>
      </section>
    </div>
  );
}
