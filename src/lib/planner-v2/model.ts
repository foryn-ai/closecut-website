export const AGENDA_DAYS = ["day1", "day2"] as const;
export const AGENDA_PERIODS = ["morning", "afternoon", "evening"] as const;

export type AgendaDay = (typeof AGENDA_DAYS)[number];
export type AgendaPeriod = (typeof AGENDA_PERIODS)[number];
export type AgendaSlotId = `${AgendaDay}-${AgendaPeriod}`;

export const THEME_IDS = [
  "before-we-commit",
  "making-a-decision",
  "important-transition",
  "breach-of-trust",
  "loss-of-spark-sexual-challenges",
  "communication-breakdown",
] as const;

export const SKILL_IDS = [
  "rel_stage_mapping",
  "relationship_acclimation",
  "attunement_reading",
  "shared_boundary_building",
  "idealization_reality_shift",
  "difference_tolerance",
  "nondefensive_expression",
  "nonreactive_listening",
  "discomfort_regulation",
  "decision_clarity",
  "transition_alignment",
  "autonomy_self_esteem",
  "secure_reconnection",
  "trust_repair_protocol",
  "impact_ownership",
  "sexual_reconnection",
  "object_constancy",
  "rupture_repair",
  "symbiotic_bind_spotting",
  "stage_matched_next_step",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];
export type SkillId = (typeof SKILL_IDS)[number];

export type AgendaSlot = {
  id: AgendaSlotId;
  day: AgendaDay;
  period: AgendaPeriod;
  themeId: ThemeId | null;
  skillIds: SkillId[];
  isExpertHeld: boolean;
};

export type AgendaState = {
  slots: Record<AgendaSlotId, AgendaSlot>;
};

export function makeAgendaSlotId(day: AgendaDay, period: AgendaPeriod): AgendaSlotId {
  return `${day}-${period}`;
}

export function createAgendaState(): AgendaState {
  const slots = {} as Record<AgendaSlotId, AgendaSlot>;

  AGENDA_DAYS.forEach((day) => {
    AGENDA_PERIODS.forEach((period) => {
      const id = makeAgendaSlotId(day, period);
      slots[id] = {
        id,
        day,
        period,
        themeId: null,
        skillIds: [],
        isExpertHeld: false,
      };
    });
  });

  return { slots };
}
