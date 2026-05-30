"use client";

import { useState } from "react";
import { ctaClass } from "@/components/shared/cta";
import { Text } from "@/components/ui/Text";
import { focusRing, input } from "@/lib/ui/classes";

type SubmitState = "idle" | "submitting" | "success" | "error" | "spam";

export function PressContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [startedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/press", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website, startedAt }),
      });

      const data = (await res.json()) as { ok?: boolean; code?: string };

      if (!res.ok || !data.ok) {
        setState(data.code === "spam_blocked" ? "spam" : "error");
        return;
      }

      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-6">
        <Text role="body" className="text-heading">
          Message sent. We will follow up at the email provided.
        </Text>
      </div>
    );
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="press-name">
            Name
          </label>
          <input
            id="press-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`w-full ${input} ${focusRing}`}
            required
            minLength={2}
            maxLength={120}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="press-email">
            Email
          </label>
          <input
            id="press-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full ${input} ${focusRing}`}
            required
            maxLength={320}
          />
        </div>
      </div>
      <div>
        <label className="sr-only" htmlFor="press-message">
          Message
        </label>
        <textarea
          id="press-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you working on?"
          className={`min-h-[120px] w-full ${input} ${focusRing}`}
          required
          minLength={10}
          maxLength={3000}
        />
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className={ctaClass("primary", "w-full")}
      >
        {state === "submitting" ? "Sending..." : "Send message"}
      </button>
      {(state === "error" || state === "spam") && (
        <Text role="fine" className="text-body">
          Something went wrong. Try again or email press@closecut.ai directly.
        </Text>
      )}
    </form>
  );
}
