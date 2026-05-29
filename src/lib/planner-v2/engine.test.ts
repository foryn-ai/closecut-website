import { describe, expect, it } from "vitest";
import { createAgendaState, makeAgendaSlotId } from "@/lib/planner-v2/model";
import {
  computeAgendaSummary,
  setSlotTheme,
  toggleSlotExpertHeld,
  toggleSlotSkill,
  validateAgendaState,
} from "@/lib/planner-v2/engine";

describe("planner v2 engine", () => {
  it("sets theme on slot", () => {
    const initial = createAgendaState();
    const slotId = makeAgendaSlotId("day1", "morning");
    const result = setSlotTheme(initial, slotId, "making-a-decision");
    expect(result.errors.length).toBe(0);
    expect(result.state.slots[slotId].themeId).toBe("making-a-decision");
  });

  it("blocks skill selection before theme", () => {
    const initial = createAgendaState();
    const slotId = makeAgendaSlotId("day1", "morning");
    const result = toggleSlotSkill(initial, slotId, "rel_stage_mapping");
    expect(result.errors.some((error) => error.code === "missing-theme-for-skills")).toBe(
      true,
    );
  });

  it("enforces max expert-held slots per day", () => {
    const initial = createAgendaState();
    const slots = [
      makeAgendaSlotId("day1", "morning"),
      makeAgendaSlotId("day1", "afternoon"),
      makeAgendaSlotId("day1", "evening"),
    ] as const;

    let state = initial;
    const themePlan = [
      "before-we-commit",
      "making-a-decision",
      "important-transition",
    ] as const;
    slots.forEach((slotId, index) => {
      const themed = setSlotTheme(state, slotId, themePlan[index]);
      if (themed.errors.length === 0) {
        state = themed.state;
      }
      const skilled = toggleSlotSkill(state, slotId, "nondefensive_expression");
      if (skilled.errors.length === 0) {
        state = skilled.state;
      }
    });

    const one = toggleSlotExpertHeld(state, slots[0]);
    expect(one.errors.length).toBe(0);
    const two = toggleSlotExpertHeld(one.state, slots[1]);
    expect(two.errors.length).toBe(0);
    const three = toggleSlotExpertHeld(two.state, slots[2]);
    expect(three.errors.some((error) => error.code === "expert-held-day-cap")).toBe(true);
  });

  it("computes summary totals", () => {
    let state = createAgendaState();
    const day1Morning = makeAgendaSlotId("day1", "morning");
    const day2Morning = makeAgendaSlotId("day2", "morning");

    state = setSlotTheme(state, day1Morning, "making-a-decision").state;
    state = toggleSlotSkill(state, day1Morning, "rel_stage_mapping").state;
    state = toggleSlotSkill(state, day1Morning, "nondefensive_expression").state;
    state = toggleSlotExpertHeld(state, day1Morning).state;

    state = setSlotTheme(state, day2Morning, "important-transition").state;
    state = toggleSlotSkill(state, day2Morning, "stage_matched_next_step").state;

    const summary = computeAgendaSummary(state);
    expect(summary.selectedSlotCount).toBe(2);
    expect(summary.expertHeldSlots).toBe(1);
    expect(summary.skillCount).toBe(3);
    expect(summary.themesByDay.day1).toBe(1);
    expect(summary.themesByDay.day2).toBe(1);
  });

  it("requires at least one themed slot in each day", () => {
    const state = createAgendaState();
    const errors = validateAgendaState(state, { enforceCompleteness: true });
    expect(errors.filter((error) => error.code === "day-missing-theme").length).toBe(2);
  });
});
