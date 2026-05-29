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
  delete process.env.CONTACT_FROM_EMAIL;
  process.env.SMTP_SECURE = "false";
}

function createRequest(payload: Record<string, unknown>, ip = "203.0.113.10") {
  return new Request("http://localhost/api/contact", {
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

  const route = await import("../../../app/(site)/api/contact/route");

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

describe("contact route", () => {
  it("sends a contact email for valid payload", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        name: "Alex Person",
        email: "person@example.com",
        message: "I want to schedule a consult this week.",
        website: "",
        startedAt: Date.now() - 6000,
      }),
    );

    const body = (await response.json()) as { ok?: boolean };
    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(mock.createTransport).toHaveBeenCalledTimes(1);
    expect(mock.sendMail).toHaveBeenCalledTimes(1);
  });

  it("falls back to smtp user when contact inbox env is missing", async () => {
    delete process.env.CONTACT_TO_EMAIL;
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        name: "Alex Person",
        email: "person@example.com",
        message: "I want to schedule a consult this week.",
        website: "",
        startedAt: Date.now() - 2000,
      }),
    );

    expect(response.status).toBe(200);
    expect(mock.sendMail).toHaveBeenCalledTimes(1);
    expect(mock.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "mailer@example.com",
      }),
    );
  });

  it("rejects invalid message", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        name: "Alex Person",
        email: "person@example.com",
        message: "short",
        website: "",
        startedAt: Date.now() - 6000,
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(422);
    expect(body.code).toBe("invalid_message");
    expect(mock.sendMail).not.toHaveBeenCalled();
  });

  it("blocks spam submissions that are too fast", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        name: "Alex Person",
        email: "person@example.com",
        message: "I need help with scheduling and next steps.",
        website: "",
        startedAt: Date.now(),
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(429);
    expect(body.code).toBe("spam_blocked");
    expect(mock.sendMail).not.toHaveBeenCalled();
  });

  it("allows valid submissions shortly after page load", async () => {
    const { route, mock } = await loadRoute();

    const response = await route.POST(
      createRequest({
        name: "Alex Person",
        email: "person@example.com",
        message: "I need help with scheduling and next steps.",
        website: "",
        startedAt: Date.now() - 1500,
      }),
    );

    const body = (await response.json()) as { ok?: boolean };
    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(mock.sendMail).toHaveBeenCalledTimes(1);
  });

  it("rate limits requests by ip", async () => {
    const { route } = await loadRoute();

    const payload = {
      name: "Alex Person",
      email: "person@example.com",
      message: "I need help with scheduling and next steps.",
      website: "",
      startedAt: Date.now() - 6000,
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
});
