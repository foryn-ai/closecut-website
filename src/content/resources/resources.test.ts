import { describe, expect, it } from "vitest";
import { RESOURCES } from "./resources";

describe("resources registry", () => {
  it("has unique slugs", () => {
    const slugs = RESOURCES.map((resource) => resource.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("has at least three citations per resource", () => {
    RESOURCES.forEach((resource) => {
      expect(resource.citations.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("uses valid https URLs for citations", () => {
    RESOURCES.forEach((resource) => {
      resource.citations.forEach((citation) => {
        const parsed = new URL(citation.url);
        expect(parsed.protocol).toBe("https:");
      });
    });
  });
});
