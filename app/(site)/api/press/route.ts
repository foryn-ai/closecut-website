import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { withinRateLimit } from "@/lib/server/rateLimit";

const FORM_MIN_AGE_MS = 2000;

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

    const toEmail = process.env.PRESS_TO_EMAIL ?? "press@closecut.ai";
    const fromEmail = process.env.PRESS_FROM_EMAIL ?? "press@closecut.ai";

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Close Cut Press <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Press inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
