import { beforeEach, describe, expect, it, vi } from "vitest";

type MailerSend = ReturnType<typeof vi.fn>;

type MailerMock = {
  sendMail: MailerSend;
  createTransport: ReturnType<typeof vi.fn>;
};

function setMailerEnv() {
  process.env.SMTP_HOST = "smtp.example.com";
  process.env.SMTP_PORT = "587";
  process.env.SMTP_USER = "mailer@example.com";
  process.env.SMTP_PASS = "secret";
  process.env.CONTACT_TO_EMAIL = "inbox@example.com";
  delete process.env.WAITLIST_TO_EMAIL;
  delete process.env.WAITLIST_FROM_EMAIL;
  process.env.SMTP_SECURE = "false";
}

function createRequest(payload: Record<string, unknown>, ip = "203.0.113.10") {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}

async function loadRoute(sendMailImpl?: () => Promise<unknown>) {
  vi.resetModules();

  const sendMail = vi.fn(sendMailImpl ?? (() => Promise.resolve({} as unknown)));
  const createTransport = vi.fn(() => ({ sendMail }));

  vi.doMock("nodemailer", () => ({
    default: {
      createTransport,
    },
  }));

  const route = await import("../../../app/(site)/api/waitlist/route");

  const mock: MailerMock = {
    sendMail,
    createTransport,
  };

  return { route, mock };
}

beforeEach(() => {
  vi.restoreAllMocks();
  setMailerEnv();
});

describe("waitlist route", () => {
  it("sends a waitlist email for valid payload", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        email: "person@example.com",
        website: "",
        startedAt: Date.now() - 5000,
        source: "48-hours",
        shareUrl: "https://example.com/48-hours?plan=abc&view=share#shareable",
        plannerSummary: "{\"expertHeldMinutes\":120}",
      }),
    );

    const body = (await response.json()) as { ok?: boolean };
    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(mock.createTransport).toHaveBeenCalledTimes(1);
    expect(mock.sendMail).toHaveBeenCalledTimes(1);
    expect(mock.sendMail.mock.calls[0]?.[0]?.text).toContain("Share link:");
    expect(mock.sendMail.mock.calls[0]?.[0]?.text).toContain("Planner summary:");
  });

  it("rejects invalid email", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        email: "bad-email",
        website: "",
        startedAt: Date.now() - 5000,
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(422);
    expect(body.code).toBe("invalid_email");
    expect(mock.sendMail).not.toHaveBeenCalled();
  });

  it("blocks spam submissions that are too fast", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        email: "person@example.com",
        website: "",
        startedAt: Date.now(),
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(429);
    expect(body.code).toBe("spam_blocked");
    expect(mock.sendMail).not.toHaveBeenCalled();
  });

  it("rate limits requests by ip", async () => {
    const { route } = await loadRoute();

    const payload = {
      email: "person@example.com",
      website: "",
      startedAt: Date.now() - 5000,
    };

    for (let i = 0; i < 5; i += 1) {
      const response = await route.POST(createRequest(payload, "198.51.100.5"));
      expect(response.status).toBe(200);
    }

    const limited = await route.POST(createRequest(payload, "198.51.100.5"));
    const body = (await limited.json()) as { code?: string };
    expect(limited.status).toBe(429);
    expect(body.code).toBe("rate_limited");
  });

  it("returns 500 when mailer env is missing", async () => {
    delete process.env.SMTP_HOST;

    const { route, mock } = await loadRoute();
    const response = await route.POST(
      createRequest({
        email: "person@example.com",
        website: "",
        startedAt: Date.now() - 5000,
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(500);
    expect(body.code).toBe("email_not_configured");
    expect(mock.sendMail).not.toHaveBeenCalled();
  });
});
