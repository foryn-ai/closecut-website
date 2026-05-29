"use client";

import { useEffect } from "react";
import { SITE_COPY } from "@/lib/copy";
import { track } from "@/lib/analytics/adapter";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ctaClass } from "@/components/shared/cta";

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { contact } = SITE_COPY;

  useEffect(() => {
    track(ANALYTICS_EVENTS.contactFormError, {
      reason: "error_boundary",
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[40vh] w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <Heading role="h2">{contact.errorTitle}</Heading>
      <Text role="body" className="text-body" measure="narrow">
        {contact.errorBody}
      </Text>
      <button type="button" onClick={reset} className={ctaClass("primary")}>
        {contact.errorCtaLabel}
      </button>
    </div>
  );
}
