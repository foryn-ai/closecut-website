import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { withinRateLimit } from "@/lib/server/rateLimit";

type WaitlistPayload = {
  email?: unknown;
  website?: unknown;
  startedAt?: unknown;
  source?: unknown;
  shareUrl?: unknown;
  plannerSummary?: unknown;
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
      namespace: "waitlist",
      ipKey,
      now,
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: RATE_LIMIT_MAX,
    }))
  ) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
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

  const email = trimString(payload.email);
  if (!isValidEmail(email) || email.length > 320) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 422 });
  }

  const source = trimString(payload.source) || "intensive";
  const shareUrl = trimString(payload.shareUrl);
  const plannerSummary = trimString(payload.plannerSummary);
  const campaignAttribution = parseCampaignAttribution(payload.campaignAttribution);
  const safeShareUrl = escapeHtml(shareUrl);
  const safePlannerSummary = escapeHtml(plannerSummary);
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source);
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
      subject: "Therafox Intensive waitlist request",
      text: `Email: ${email}\nSource: ${source}\nSubmitted: ${submittedIso}${shareUrl ? `\nShare link: ${shareUrl}` : ""}${plannerSummary ? `\nPlanner summary: ${plannerSummary}` : ""}${campaignAttribution ? `\nCampaign attribution: ${JSON.stringify(campaignAttribution)}` : ""}`,
      html: `<p><strong>Email:</strong> ${safeEmail}</p><p><strong>Source:</strong> ${safeSource}</p><p><strong>Submitted:</strong> ${submittedIso}</p>${safeShareUrl ? `<p><strong>Share link:</strong> ${safeShareUrl}</p>` : ""}${safePlannerSummary ? `<p><strong>Planner summary:</strong> ${safePlannerSummary}</p>` : ""}${safeCampaignAttribution ? `<p><strong>Campaign attribution:</strong><br /><pre>${safeCampaignAttribution}</pre></p>` : ""}`,
    });
  } catch {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
