"use client";

import { useState } from "react";
import Link from "next/link";
import { ctaClass } from "@/components/shared/cta";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { track } from "@/lib/analytics/adapter";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import { focusRing, input } from "@/lib/ui/classes";

type SubmitState = "idle" | "submitting" | "success" | "error" | "spam";

type IntensiveWaitlistSectionProps = {
  copy: {
    pricingEyebrow?: string;
    pricingTitle?: string;
    pricingBodyOne?: string;
    pricingBodyTwo?: string;
    pricingSecondaryCtaLabel?: string;
    waitlistCtaLabel?: string;
    conversionIntroLabel?: string;
    conversionSteps?: string[];
    waitlistFormTitle?: string;
    waitlistFormBody?: string;
    waitlistEmailLabel?: string;
    waitlistEmailPlaceholder?: string;
    waitlistSubmitLabel?: string;
    waitlistSubmittingLabel?: string;
    waitlistSuccessMessage?: string;
    waitlistErrorMessage?: string;
    waitlistSpamBlockedMessage?: string;
    waitlistMicroline?: string;
  };
};

export function IntensiveWaitlistSection({ copy }: IntensiveWaitlistSectionProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [startedAt] = useState(() => Date.now());
  const resolvedCopy = {
    pricingEyebrow: copy.pricingEyebrow ?? "Next step",
    pricingTitle: copy.pricingTitle ?? "Request details and availability",
    pricingBodyOne:
      copy.pricingBodyOne ??
      "Intensive is offered in limited windows and scheduled around fit, timing, and pacing.",
    pricingBodyTwo:
      copy.pricingBodyTwo ??
      "Join the waitlist to receive upcoming dates and private availability. If you want to talk through fit first, book a consult.",
    pricingSecondaryCtaLabel: copy.pricingSecondaryCtaLabel ?? "Book a consult",
    conversionIntroLabel: copy.conversionIntroLabel ?? "What happens next",
    conversionSteps: copy.conversionSteps ?? [
      "Join the waitlist to receive dates and private availability.",
      "If a date fits, I will send the next intake step.",
      "If you prefer to confirm fit first, book a consult.",
    ],
    waitlistFormTitle: copy.waitlistFormTitle ?? "Join the intensive waitlist",
    waitlistFormBody:
      copy.waitlistFormBody ??
      "Enter your preferred email. You will hear from me when dates open.",
    waitlistEmailLabel: copy.waitlistEmailLabel ?? "Email",
    waitlistEmailPlaceholder: copy.waitlistEmailPlaceholder ?? "Enter your preferred email",
    waitlistSubmitLabel: copy.waitlistSubmitLabel ?? copy.waitlistCtaLabel ?? "Join the waitlist",
    waitlistSubmittingLabel: copy.waitlistSubmittingLabel ?? "Joining waitlist",
    waitlistSuccessMessage:
      copy.waitlistSuccessMessage ?? "Thanks. You are on the waitlist and will get dates when they open.",
    waitlistErrorMessage:
      copy.waitlistErrorMessage ?? "Something went wrong. Please try again in a minute.",
    waitlistSpamBlockedMessage:
      copy.waitlistSpamBlockedMessage ?? "Request blocked. Please wait a moment, then try again.",
    waitlistMicroline:
      copy.waitlistMicroline ?? "No newsletters. You will only hear from me when dates open.",
  };

  const submitLabel =
    submitState === "submitting"
      ? resolvedCopy.waitlistSubmittingLabel
      : resolvedCopy.waitlistSubmitLabel;

  const statusMessage =
    submitState === "success"
      ? resolvedCopy.waitlistSuccessMessage
      : submitState === "spam"
        ? resolvedCopy.waitlistSpamBlockedMessage
        : submitState === "error"
          ? resolvedCopy.waitlistErrorMessage
          : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          website,
          startedAt,
          source: "intensive-page",
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
        track(ANALYTICS_EVENTS.waitlistSubmitError, { reason: payload.code ?? "response_error" });
        return;
      }

      setSubmitState("success");
      setEmail("");
      setWebsite("");
      track(ANALYTICS_EVENTS.waitlistSubmit, { source: "intensive-page" });
    } catch {
      setSubmitState("error");
      track(ANALYTICS_EVENTS.waitlistSubmitError, { reason: "network_error" });
    }
  }

  return (
    <div
      id="conversion"
      className="mx-auto grid max-w-6xl gap-6 rounded-[28px] border border-border bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(107,127,109,0.08))] p-6 shadow-[0_22px_60px_var(--color-shadow)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="space-y-5">
        <div>
          <Text role="eyebrow" className="text-primary">
            {resolvedCopy.pricingEyebrow}
          </Text>
          <Heading role="h2" className="mt-3">
            {resolvedCopy.pricingTitle}
          </Heading>
        </div>
        <div className="max-w-2xl space-y-4">
          <Text role="body" className="text-body" measure="narrow">
            {resolvedCopy.pricingBodyOne}
          </Text>
          <Text role="body" className="text-body" measure="narrow">
            {resolvedCopy.pricingBodyTwo}
          </Text>
        </div>
        <div className="rounded-2xl border border-border bg-canvas/70 p-5">
          <Text role="eyebrow" className="text-primary">
            {resolvedCopy.conversionIntroLabel}
          </Text>
          <div className="mt-4 space-y-3">
            {resolvedCopy.conversionSteps.map((item) => (
              <Text key={item} role="bodySmall" className="text-body" measure="narrow">
                  {item}
              </Text>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-border bg-canvas p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-7">
        <div className="space-y-3">
          <Heading role="h3">{resolvedCopy.waitlistFormTitle}</Heading>
          <Text role="bodySmall" className="text-body" measure="narrow">
            {resolvedCopy.waitlistFormBody}
          </Text>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="intensive-waitlist-email">
            {resolvedCopy.waitlistEmailLabel}
          </label>
          <input
            id="intensive-waitlist-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={resolvedCopy.waitlistEmailPlaceholder}
            className={`${input} ${focusRing} h-12 w-full`}
            required
            maxLength={320}
          />
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="hidden"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className={ctaClass(
                "primary",
                "px-8 text-[17px] !bg-[var(--accent-warm)] !text-canvas hover:!bg-[#b85f36]",
              )}
            >
              {submitLabel}
            </button>
            <Link className={ctaClass("secondary", "px-8 text-[17px]")} href="/contact">
              {resolvedCopy.pricingSecondaryCtaLabel}
            </Link>
          </div>
          <Text role="fine" className="text-body">
            {resolvedCopy.waitlistMicroline}
          </Text>
          {statusMessage ? (
            <Text role="bodySmall" className="text-body">
              {statusMessage}
            </Text>
          ) : null}
        </form>
      </div>
    </div>
  );
}
