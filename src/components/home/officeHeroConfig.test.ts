import { describe, expect, it } from "vitest";
import { OFFICE_PLACEMENTS, SCENE_AVOID_RECTS } from "@/components/home/officeHeroConfig";

function isRectWithinViewport(rect: { left: number; top: number; width: number; height: number }) {
  return rect.left >= 0 && rect.top >= 0 && rect.left + rect.width <= 100 && rect.top + rect.height <= 100;
}

describe("office hero hotspot config", () => {
  it("has unique placement ids", () => {
    const ids = OFFICE_PLACEMENTS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps avoid rects within viewport", () => {
    for (const rect of SCENE_AVOID_RECTS) {
      expect(isRectWithinViewport(rect)).toBe(true);
    }
  });

  it("keeps hotspot rectangles valid and easy to hit", () => {
    const hotspots = OFFICE_PLACEMENTS.filter((item) => item.hotspot).map((item) => item.hotspot!);
    expect(hotspots.length).toBeGreaterThan(0);

    for (const hotspot of hotspots) {
      expect(isRectWithinViewport(hotspot.visualRect)).toBe(true);
      expect(isRectWithinViewport(hotspot.hitRect)).toBe(true);

      // Minimum practical targets in percentage-space for this full-width scene.
      expect(hotspot.hitRect.width).toBeGreaterThanOrEqual(4);
      expect(hotspot.hitRect.height).toBeGreaterThanOrEqual(8);
    }
  });

  it("uses internal routes for hotspot links", () => {
    const hotspots = OFFICE_PLACEMENTS.filter((item) => item.hotspot).map((item) => item.hotspot!);
    for (const hotspot of hotspots) {
      expect(hotspot.href.startsWith("/")).toBe(true);
      expect(hotspot.href.startsWith("//")).toBe(false);
    }
  });
});
