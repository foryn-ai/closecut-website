"use client";

import { useState } from "react";
import { ctaClass } from "@/components/shared/cta";
import { Text } from "@/components/ui/Text";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import { focusRing, input } from "@/lib/ui/classes";

type SubmitState = "idle" | "submitting" | "success" | "error" | "spam";

type HomeStartHereFormProps = {
  copy: {
    formTitle: string;
    formNameLabel: string;
    namePlaceholder: string;
    formEmailLabel: string;
    emailPlaceholder: string;
    formMessageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    errorMessage: string;
    spamBlockedMessage: string;
  };
};

export function HomeStartHereForm({
  copy,
}: HomeStartHereFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formStartedAt] = useState(() => Date.now());

  const submitLabel = submitState === "submitting" ? copy.submittingLabel : copy.submitLabel;
  const statusMessage =
    submitState === "success"
      ? copy.successMessage
      : submitState === "spam"
        ? copy.spamBlockedMessage
        : submitState === "error"
          ? copy.errorMessage
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
        return;
      }

      setSubmitState("success");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <Text role="eyebrow" className="text-primary">
        {copy.formTitle}
      </Text>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="sr-only" htmlFor="home-contact-name">
          {copy.formNameLabel}
        </label>
        <input
          id="home-contact-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={copy.namePlaceholder}
          className={`${input} ${focusRing}`}
          required
          minLength={2}
          maxLength={120}
        />
        <label className="sr-only" htmlFor="home-contact-email">
          {copy.formEmailLabel}
        </label>
        <input
          id="home-contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.emailPlaceholder}
          className={`${input} ${focusRing}`}
          required
          maxLength={320}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <label className="sr-only" htmlFor="home-contact-message">
            {copy.formMessageLabel}
          </label>
          <textarea
            id="home-contact-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={copy.messagePlaceholder}
            className={`min-h-[90px] w-full ${input} ${focusRing}`}
            required
            minLength={10}
            maxLength={3000}
          />
        </div>
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className={`${ctaClass("primary")} sm:self-stretch`}
        >
          {submitLabel}
        </button>
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
      />
      {statusMessage ? (
        <Text role="bodySmall" className="text-body">
          {statusMessage}
        </Text>
      ) : null}
    </form>
  );
}
