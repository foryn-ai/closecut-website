import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { withinRateLimit } from "@/lib/server/rateLimit";

const FORM_MIN_AGE_MS = 2000;
const FROM_EMAIL = "admin@foryn.org";
const TO_EMAIL = "admin@foryn.org";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
      startedAt?: number;
    };

    const { name, email, message, website, startedAt } = body;

    if (website) {
      return NextResponse.json({ ok: false, code: "spam_blocked" }, { status: 400 });
    }

    if (startedAt && Date.now() - startedAt < FORM_MIN_AGE_MS) {
      return NextResponse.json({ ok: false, code: "spam_blocked" }, { status: 400 });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const allowed = await withinRateLimit({
      namespace: "contact",
      ipKey: ip,
      now: Date.now(),
      windowMs: 60 * 60 * 1000,
      max: 3,
    });

    if (!allowed) {
      return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Close Cut <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[closecut.ai] Press inquiry from ${name}`,
      text: [
        "Site: closecut.ai /press",
        `From: ${name} <${email}>`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
