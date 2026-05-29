import { describe, expect, it } from "vitest";
import { decodeSharePlan, encodeSharePlan } from "./sharePlan";
import { createPlannerState, placeItemNextAvailable } from "@/lib/pricing/intensive";

describe("share plan payload", () => {
  it("encodes and decodes planner state", () => {
    const base = createPlannerState();
    const first = placeItemNextAvailable(base, "quiet-dinner");
    const second = placeItemNextAvailable(first.state, "threshold-call");
    const generatedAt = new Date("2026-02-04T12:00:00.000Z");

    const token = encodeSharePlan(second.state, generatedAt);
    const decoded = decodeSharePlan(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.state.blocks.length).toBe(2);
    expect(decoded?.generatedAt.toISOString()).toBe(generatedAt.toISOString());
  });

  it("returns null for invalid payload", () => {
    const decoded = decodeSharePlan("not-valid");
    expect(decoded).toBeNull();
  });
});
