import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { appendAnalyticsRow } from "@/lib/server/appsScriptAnalytics";
import { withinRateLimit } from "@/lib/server/rateLimit";

type AnalyticsPayload = {
  eventName?: unknown;
  props?: unknown;
  path?: unknown;
  query?: unknown;
  referrer?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 240;

const ALLOWED_EVENTS = new Set([
  "page_view",
  "resource_book_click",
  "resource_view",
  "resource_citation_click",
  "worksheet_download_click",
  "contact_form_submit",
  "contact_form_error",
  "waitlist_submit",
  "waitlist_submit_error",
  "intensive_fit_check_start",
  "intensive_fit_check_step_view",
  "intensive_fit_check_answer",
  "intensive_fit_check_complete",
  "intensive_fit_check_exit",
  "intensive_fit_check_cta_click",
]);

function getIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function normalizeString(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function sanitizeProps(value: unknown) {
  if (!value || typeof value !== "object") return {};

  const output: Record<string, string> = {};
  Object.entries(value as Record<string, unknown>).forEach(([key, raw]) => {
    if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
      output[key] = String(raw).slice(0, 1000);
    }
  });
  return output;
}

function bucketIp(ip: string) {
  if (!ip || ip === "unknown") return "unknown";
  if (ip.includes(".")) {
    const parts = ip.split(".");
    return parts.length >= 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : ip;
  }

  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean);
    return parts.slice(0, 4).join(":") || "unknown";
  }

  return ip;
}

function simplifyUserAgent(userAgent: string) {
  const normalized = userAgent.toLowerCase();
  if (normalized.includes("iphone")) return "iphone";
  if (normalized.includes("ipad")) return "ipad";
  if (normalized.includes("android")) return "android";
  if (normalized.includes("mac os")) return "mac";
  if (normalized.includes("windows")) return "windows";
  if (normalized.includes("linux")) return "linux";
  return normalized.slice(0, 80) || "unknown";
}

function makeApproxVisitorKey(ipBucket: string, uaFamily: string, date: string) {
  const salt = process.env.ANALYTICS_HASH_SALT || "site-analytics";
  return createHash("sha256")
    .update(`${salt}|${date}|${ipBucket}|${uaFamily}`)
    .digest("hex")
    .slice(0, 16);
}

export async function POST(request: Request) {
  const now = Date.now();
  const ip = getIp(request);

  if (
    !(await withinRateLimit({
      namespace: "analytics",
      ipKey: ip,
      now,
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: RATE_LIMIT_MAX,
    }))
  ) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let payload: AnalyticsPayload;
  try {
    payload = (await request.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_payload" }, { status: 400 });
  }

  const eventName = normalizeString(payload.eventName, 100);
  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: false, code: "invalid_event" }, { status: 422 });
  }

  const props = sanitizeProps(payload.props);
  const timestamp = new Date(now).toISOString();
  const day = timestamp.slice(0, 10);
  const ipBucket = bucketIp(ip);
  const uaFamily = simplifyUserAgent(request.headers.get("user-agent") ?? "");
  const approxVisitorKey = makeApproxVisitorKey(ipBucket, uaFamily, day);

  try {
    await appendAnalyticsRow({
      timestamp,
      eventName,
      path: normalizeString(payload.path, 500) || "/",
      query: normalizeString(payload.query, 1000),
      referrer: normalizeString(payload.referrer, 1000),
      approxVisitorKey,
      ipBucket,
      uaFamily,
      resultType: normalizeString(props.result_type, 100),
      stepId: normalizeString(props.step_id, 100),
      stepIndex: normalizeString(props.step_index, 20),
      ctaClicked: normalizeString(props.cta_clicked, 200),
      payloadJson: JSON.stringify(props),
    });
  } catch (error) {
    console.error("[analytics] apps-script delivery failed", error);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
