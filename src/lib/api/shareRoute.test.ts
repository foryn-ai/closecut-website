import { beforeEach, describe, expect, it, vi } from "vitest";

async function loadRoute() {
  vi.resetModules();
  return import("../../../app/(site)/api/share/route");
}

beforeEach(async () => {
  vi.restoreAllMocks();
  const store = await import("@/lib/fortyEight/shareLinkStore");
  store.clearShareShortLinks();
});

describe("share route", () => {
  it("creates a short link for valid planner target", async () => {
    const route = await loadRoute();
    const response = await route.POST(
      new Request("https://example.test/api/share", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          targetPath: "/48-hours?plan=abc123&view=share#shareable",
        }),
      }),
    );

    const body = (await response.json()) as { ok?: boolean; shortUrl?: string };
    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.shortUrl?.startsWith("https://example.test/s/")).toBe(true);
  });

  it("rejects invalid target path", async () => {
    const route = await loadRoute();
    const response = await route.POST(
      new Request("https://example.test/api/share", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ targetPath: "/contact" }),
      }),
    );

    const body = (await response.json()) as { code?: string };
    expect(response.status).toBe(422);
    expect(body.code).toBe("invalid_target_path");
  });
});
