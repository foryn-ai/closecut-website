import {
  AGENDA_DAYS,
  AGENDA_PERIODS,
  type AgendaDay,
  type AgendaPeriod,
  type AgendaSlot,
  type AgendaSlotId,
  type AgendaState,
  type SkillId,
  type ThemeId,
  makeAgendaSlotId,
} from "@/lib/planner-v2/model";

const MAX_SKILLS_PER_SLOT = 3;
const MAX_EXPERT_HELD_SLOTS_PER_DAY = 2;

export type AgendaValidationErrorCode =
  | "unknown-slot"
  | "skills-cap"
  | "missing-theme-for-skills"
  | "missing-skills-for-theme"
  | "expert-held-day-cap"
  | "expert-held-needs-theme"
  | "day-missing-theme";

export type AgendaValidationError = {
  code: AgendaValidationErrorCode;
  slotId?: AgendaSlotId;
  day?: AgendaDay;
};

export type AgendaUpdateResult = {
  state: AgendaState;
  errors: AgendaValidationError[];
};

type ValidateOptions = {
  enforceCompleteness?: boolean;
};

const DAY_PERIOD_ORDER: Record<AgendaPeriod, number> = {
  morning: 0,
  afternoon: 1,
  evening: 2,
};

function cloneSlot(slot: AgendaSlot): AgendaSlot {
  return {
    ...slot,
    skillIds: [...slot.skillIds],
  };
}

function cloneState(state: AgendaState): AgendaState {
  const slots = {} as AgendaState["slots"];
  Object.entries(state.slots).forEach(([slotId, slot]) => {
    slots[slotId as AgendaSlotId] = cloneSlot(slot);
  });
  return { slots };
}

function getSlot(state: AgendaState, slotId: AgendaSlotId) {
  return state.slots[slotId] ?? null;
}

function byDayAndPeriod(a: AgendaSlot, b: AgendaSlot) {
  if (a.day !== b.day) return a.day.localeCompare(b.day);
  return DAY_PERIOD_ORDER[a.period] - DAY_PERIOD_ORDER[b.period];
}

export function validateAgendaState(
  state: AgendaState,
  options: ValidateOptions = {},
): AgendaValidationError[] {
  const errors: AgendaValidationError[] = [];
  const { enforceCompleteness = false } = options;
  const slots = Object.values(state.slots).sort(byDayAndPeriod);

  AGENDA_DAYS.forEach((day) => {
    const daySlots = slots.filter((slot) => slot.day === day);
    const dayExpertHeldCount = daySlots.filter((slot) => slot.isExpertHeld).length;
    if (dayExpertHeldCount > MAX_EXPERT_HELD_SLOTS_PER_DAY) {
      errors.push({ code: "expert-held-day-cap", day });
    }

    const hasThemeInDay = daySlots.some((slot) => Boolean(slot.themeId));
    if (enforceCompleteness && !hasThemeInDay) {
      errors.push({ code: "day-missing-theme", day });
    }

    daySlots.forEach((slot, index) => {
      if (slot.skillIds.length > MAX_SKILLS_PER_SLOT) {
        errors.push({ code: "skills-cap", slotId: slot.id });
      }

      if (!slot.themeId && slot.skillIds.length > 0) {
        errors.push({ code: "missing-theme-for-skills", slotId: slot.id });
      }

      if (enforceCompleteness && slot.themeId && slot.skillIds.length === 0) {
        errors.push({ code: "missing-skills-for-theme", slotId: slot.id });
      }

      if (slot.isExpertHeld && !slot.themeId) {
        errors.push({ code: "expert-held-needs-theme", slotId: slot.id });
      }

      if (index === 0) return;
    });
  });

  return errors;
}

export function setSlotTheme(
  state: AgendaState,
  slotId: AgendaSlotId,
  themeId: ThemeId | null,
): AgendaUpdateResult {
  const slot = getSlot(state, slotId);
  if (!slot) return { state, errors: [{ code: "unknown-slot", slotId }] };

  const nextState = cloneState(state);
  const nextSlot = nextState.slots[slotId];
  nextSlot.themeId = themeId;

  if (!themeId) {
    nextSlot.skillIds = [];
    nextSlot.isExpertHeld = false;
  }

  const errors = validateAgendaState(nextState);
  if (errors.length > 0) return { state, errors };
  return { state: nextState, errors: [] };
}

export function toggleSlotSkill(
  state: AgendaState,
  slotId: AgendaSlotId,
  skillId: SkillId,
): AgendaUpdateResult {
  const slot = getSlot(state, slotId);
  if (!slot) return { state, errors: [{ code: "unknown-slot", slotId }] };

  if (!slot.themeId) {
    return { state, errors: [{ code: "missing-theme-for-skills", slotId }] };
  }

  const nextState = cloneState(state);
  const nextSlot = nextState.slots[slotId];
  const hasSkill = nextSlot.skillIds.includes(skillId);

  if (hasSkill) {
    nextSlot.skillIds = nextSlot.skillIds.filter((id) => id !== skillId);
  } else {
    nextSlot.skillIds = [...nextSlot.skillIds, skillId];
  }

  const errors = validateAgendaState(nextState);
  if (errors.length > 0) return { state, errors };
  return { state: nextState, errors: [] };
}

export function toggleSlotExpertHeld(
  state: AgendaState,
  slotId: AgendaSlotId,
): AgendaUpdateResult {
  const slot = getSlot(state, slotId);
  if (!slot) return { state, errors: [{ code: "unknown-slot", slotId }] };

  const nextState = cloneState(state);
  const nextSlot = nextState.slots[slotId];
  nextSlot.isExpertHeld = !nextSlot.isExpertHeld;

  const errors = validateAgendaState(nextState);
  if (errors.length > 0) return { state, errors };
  return { state: nextState, errors: [] };
}

export function computeAgendaSummary(state: AgendaState) {
  const slots = Object.values(state.slots);
  const selectedSlots = slots.filter((slot) => Boolean(slot.themeId));
  const expertHeldSlots = slots.filter((slot) => slot.isExpertHeld).length;
  const skillCount = slots.reduce((sum, slot) => sum + slot.skillIds.length, 0);

  const themesByDay: Record<AgendaDay, number> = {
    day1: 0,
    day2: 0,
  };

  selectedSlots.forEach((slot) => {
    themesByDay[slot.day] += 1;
  });

  return {
    selectedSlotCount: selectedSlots.length,
    expertHeldSlots,
    skillCount,
    themesByDay,
  };
}

export function getAgendaSlotsByDay(state: AgendaState, day: AgendaDay) {
  return AGENDA_PERIODS.map((period) => state.slots[makeAgendaSlotId(day, period)]);
}

export function serializeAgendaForWaitlist(state: AgendaState) {
  const slots = Object.values(state.slots)
    .sort(byDayAndPeriod)
    .map((slot) => ({
      slotId: slot.id,
      day: slot.day,
      period: slot.period,
      themeId: slot.themeId,
      skillIds: slot.skillIds,
      isExpertHeld: slot.isExpertHeld,
    }));

  return JSON.stringify({ slots });
}
