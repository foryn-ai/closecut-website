import { describe, expect, it } from "vitest";
import {
  clearShareShortLinks,
  createShareShortLink,
  isValidShortCode,
  readShareShortLink,
} from "./shareLinkStore";

describe("share short link store", () => {
  it("creates and resolves a short code", async () => {
    clearShareShortLinks();
    const code = await createShareShortLink("/48-hours?plan=abc&view=share#shareable", 0);
    expect(isValidShortCode(code)).toBe(true);
    await expect(readShareShortLink(code, 1)).resolves.toBe(
      "/48-hours?plan=abc&view=share#shareable",
    );
  });

  it("expires links", async () => {
    clearShareShortLinks();
    const code = await createShareShortLink("/48-hours?plan=abc&view=share#shareable", 0);
    const thirtyDaysAndOneMs = 30 * 24 * 60 * 60 * 1000 + 1;
    await expect(readShareShortLink(code, thirtyDaysAndOneMs)).resolves.toBeNull();
  });
});
