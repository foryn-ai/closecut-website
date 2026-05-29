import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { withinRateLimit } from "@/lib/server/rateLimit";
import { WORKSHOP_TOPICS } from "@/lib/workshops/config";
import { SITE_COPY } from "@/lib/copy";

type WorkshopsWaitlistPayload = {
  firstName?: unknown;
  email?: unknown;
  selectedTopicId?: unknown;
  seatsInterested?: unknown;
  preferredTiming?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
  campaignAttribution?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_TIME_MS = 2500;

let cachedTransporter: nodemailer.Transporter | null = null;
let cachedMailerConfig: ReturnType<typeof getMailerConfig> | null = null;

function getIpKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function trimString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseCampaignAttribution(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const keys = [
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmTerm",
    "utmContent",
    "landingPath",
    "referrer",
  ] as const;
  const parsed: Record<string, string> = {};
  keys.forEach((key) => {
    const raw = input[key];
    if (typeof raw !== "string") return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    parsed[key] = trimmed.slice(0, 500);
  });
  return Object.keys(parsed).length > 0 ? parsed : null;
}

function getMailerConfig() {
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail =
    process.env.WAITLIST_TO_EMAIL || process.env.CONTACT_TO_EMAIL || user;

  if (!host || !portValue || !user || !pass || !toEmail) {
    return null;
  }

  const port = Number(portValue);
  if (!Number.isInteger(port) || port <= 0) {
    return null;
  }

  const secure =
    process.env.SMTP_SECURE === "true"
      ? true
      : process.env.SMTP_SECURE === "false"
        ? false
        : port === 465;

  const fromEmail =
    process.env.WAITLIST_FROM_EMAIL ||
    process.env.CONTACT_FROM_EMAIL ||
    process.env.SMTP_USER;

  return {
    host,
    port,
    secure,
    user,
    pass,
    toEmail,
    fromEmail,
  };
}

function getTransporter() {
  if (!cachedMailerConfig) {
    cachedMailerConfig = getMailerConfig();
  }

  if (!cachedMailerConfig) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: cachedMailerConfig.host,
      port: cachedMailerConfig.port,
      secure: cachedMailerConfig.secure,
      auth: {
        user: cachedMailerConfig.user,
        pass: cachedMailerConfig.pass,
      },
    });
  }

  return cachedTransporter;
}

export async function POST(request: Request) {
  const now = Date.now();
  const ipKey = getIpKey(request);

  if (
    !(await withinRateLimit({
      namespace: "workshops_waitlist",
      ipKey,
      now,
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: RATE_LIMIT_MAX,
    }))
  ) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let payload: WorkshopsWaitlistPayload;
  try {
    payload = (await request.json()) as WorkshopsWaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_payload" }, { status: 400 });
  }

  const honeypot = trimString(payload.website);
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json({ ok: false, code: "spam_blocked" }, { status: 429 });
  }

  const firstName = trimString(payload.firstName);
  const email = trimString(payload.email);
  const selectedTopicId = trimString(payload.selectedTopicId);
  const seatsInterested = trimString(payload.seatsInterested);
  const preferredTiming = trimString(payload.preferredTiming);
  const consent = payload.consent === true;
  const { workshops } = SITE_COPY;

  if (firstName.length < 2 || firstName.length > 120) {
    return NextResponse.json({ ok: false, code: "invalid_first_name" }, { status: 422 });
  }

  if (!isValidEmail(email) || email.length > 320) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 422 });
  }

  if (!selectedTopicId) {
    return NextResponse.json({ ok: false, code: "invalid_topic" }, { status: 422 });
  }

  if (seatsInterested && !workshops.formSeatsOptions.includes(seatsInterested)) {
    return NextResponse.json({ ok: false, code: "invalid_seats" }, { status: 422 });
  }

  if (preferredTiming && !workshops.formTimingOptions.includes(preferredTiming)) {
    return NextResponse.json({ ok: false, code: "invalid_timing" }, { status: 422 });
  }

  if (!consent) {
    return NextResponse.json({ ok: false, code: "consent_required" }, { status: 422 });
  }

  const topic = WORKSHOP_TOPICS.find((entry) => entry.id === selectedTopicId);
  if (!topic) {
    return NextResponse.json({ ok: false, code: "invalid_topic" }, { status: 422 });
  }

  const safeName = escapeHtml(firstName);
  const safeEmail = escapeHtml(email);
  const safeTopic = escapeHtml(topic.title);
  const safeSeats = escapeHtml(seatsInterested);
  const safeTiming = escapeHtml(preferredTiming);
  const campaignAttribution = parseCampaignAttribution(payload.campaignAttribution);
  const safeCampaignAttribution = campaignAttribution
    ? escapeHtml(JSON.stringify(campaignAttribution, null, 2))
    : "";
  const submittedIso = new Date(now).toISOString();
  const transporter = getTransporter();
  if (!transporter || !cachedMailerConfig) {
    return NextResponse.json(
      { ok: false, code: "email_not_configured" },
      { status: 500 },
    );
  }

  try {
    await transporter.sendMail({
      from: cachedMailerConfig.fromEmail,
      to: cachedMailerConfig.toEmail,
      replyTo: email,
      subject: "Therafox Workshops waitlist request",
      text: `First name: ${firstName}\nEmail: ${email}\nTopic: ${topic.title}\nSeats interested: ${seatsInterested || ""}\nPreferred timing: ${preferredTiming || ""}\nConsent: ${consent ? "Yes" : "No"}\nSubmitted: ${submittedIso}${campaignAttribution ? `\nCampaign attribution: ${JSON.stringify(campaignAttribution)}` : ""}`,
      html: `<p><strong>First name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Topic:</strong> ${safeTopic}</p><p><strong>Seats interested:</strong> ${safeSeats || ""}</p><p><strong>Preferred timing:</strong> ${safeTiming || ""}</p><p><strong>Consent:</strong> ${consent ? "Yes" : "No"}</p><p><strong>Submitted:</strong> ${submittedIso}</p>${safeCampaignAttribution ? `<p><strong>Campaign attribution:</strong><br /><pre>${safeCampaignAttribution}</pre></p>` : ""}`,
    });
  } catch {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
