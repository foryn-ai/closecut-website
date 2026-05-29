import { describe, expect, it } from "vitest";
import { INTENSIVE_COPY } from "@/lib/copy/intensive";
import {
  applyStarterDraft,
  computeTotals,
  createPlannerState,
  deriveInvestment,
  moveBlock,
  placeItemNextAvailable,
  validateState,
  MOMENTS,
  type PlannerState,
} from "./intensive";

describe("bridge weekend planner", () => {
  it("places a moment in the next available slot", () => {
    const state = createPlannerState();
    const result = placeItemNextAvailable(state, "quiet-dinner");
    expect(result.errors.length).toBe(0);
    expect(result.state.blocks.length).toBe(1);
  });

  it("computes totals across blocks", () => {
    const state: PlannerState = {
      blocks: [
        {
          id: "block-1",
          itemId: "quiet-dinner",
          day: "day1",
          startSlot: 0,
          slotLength: 3,
        },
        {
          id: "block-2",
          itemId: "threshold-call",
          day: "day1",
          startSlot: 4,
          slotLength: 1,
        },
      ],
    };
    const totals = computeTotals(state);
    expect(totals.totalPlannedMinutes).toBe(120);
    expect(totals.clinicianMinutes).toBe(30);
  });

  it("prevents overlaps", () => {
    const state: PlannerState = {
      blocks: [
        {
          id: "block-1",
          itemId: "quiet-dinner",
          day: "day1",
          startSlot: 0,
          slotLength: 3,
        },
        {
          id: "block-2",
          itemId: "listening-exchange",
          day: "day1",
          startSlot: 4,
          slotLength: 1,
        },
      ],
    };
    const result = moveBlock(state, "block-2", "day1", 2);
    expect(result.errors.length).toBe(0);
    expect(result.state.blocks.find((block) => block.id === "block-2")?.startSlot).toBe(
      3,
    );
  });

  it("enforces major exclusivity", () => {
    const state: PlannerState = {
      blocks: [
        {
          id: "block-1",
          itemId: "breakthrough-block",
          day: "day1",
          startSlot: 0,
          slotLength: 3,
        },
        {
          id: "block-2",
          itemId: "integration-sessions",
          day: "day2",
          startSlot: 0,
          slotLength: 4,
        },
      ],
    };
    const errors = validateState(state);
    expect(errors.some((error) => error.code === "major-exclusive")).toBe(true);
  });

  it("derives investment tiers", () => {
    expect(deriveInvestment(0)).toBeNull();
    expect(deriveInvestment(480)).toBe(5000);
    expect(deriveInvestment(600)).toBe(6250);
  });

  it("applies starter draft", () => {
    const state = createPlannerState();
    const result = applyStarterDraft(state, "more-voice");
    expect(result.errors.length).toBe(0);
    expect(result.state.blocks.length).toBeGreaterThan(0);
  });

  it("keeps moment ids aligned with copy", () => {
    const momentIds = MOMENTS.map((item) => item.id).sort();
    const copyIds = Object.keys(INTENSIVE_COPY.catalogCopy).sort();
    expect(momentIds).toEqual(copyIds);
  });
});
