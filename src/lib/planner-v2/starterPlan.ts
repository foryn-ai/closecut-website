import { SKILL_IDS, type SkillId, type ThemeId } from "@/lib/planner-v2/model";

const STARTER_SKILLS_PER_DAY = 6;

const DAY1_BASE: SkillId[] = [
  "rel_stage_mapping",
  "relationship_acclimation",
  "attunement_reading",
  "nonreactive_listening",
  "discomfort_regulation",
  "nondefensive_expression",
  "difference_tolerance",
  "shared_boundary_building",
  "symbiotic_bind_spotting",
  "idealization_reality_shift",
];

const DAY2_BASE: SkillId[] = [
  "decision_clarity",
  "stage_matched_next_step",
  "transition_alignment",
  "trust_repair_protocol",
  "impact_ownership",
  "rupture_repair",
  "secure_reconnection",
  "object_constancy",
  "sexual_reconnection",
  "autonomy_self_esteem",
];

const THEME_SEED_SKILLS: Record<ThemeId, { day1: SkillId[]; day2: SkillId[] }> = {
  "before-we-commit": {
    day1: ["rel_stage_mapping", "attunement_reading", "difference_tolerance"],
    day2: ["decision_clarity", "shared_boundary_building", "stage_matched_next_step"],
  },
  "making-a-decision": {
    day1: ["decision_clarity", "nonreactive_listening", "discomfort_regulation"],
    day2: ["stage_matched_next_step", "object_constancy", "autonomy_self_esteem"],
  },
  "important-transition": {
    day1: ["transition_alignment", "shared_boundary_building", "relationship_acclimation"],
    day2: ["stage_matched_next_step", "secure_reconnection", "decision_clarity"],
  },
  "breach-of-trust": {
    day1: ["trust_repair_protocol", "impact_ownership", "discomfort_regulation"],
    day2: ["rupture_repair", "secure_reconnection", "object_constancy"],
  },
  "loss-of-spark-sexual-challenges": {
    day1: ["sexual_reconnection", "attunement_reading", "nondefensive_expression"],
    day2: ["secure_reconnection", "difference_tolerance", "stage_matched_next_step"],
  },
  "communication-breakdown": {
    day1: ["symbiotic_bind_spotting", "nonreactive_listening", "discomfort_regulation"],
    day2: ["nondefensive_expression", "rupture_repair", "stage_matched_next_step"],
  },
};

function buildDaySkills(seed: SkillId[], preferredPool: SkillId[], exclude: Set<SkillId>): SkillId[] {
  const result: SkillId[] = [];
  const allPools = [seed, preferredPool, SKILL_IDS];
  allPools.forEach((pool) => {
    pool.forEach((skillId) => {
      if (result.length >= STARTER_SKILLS_PER_DAY) return;
      if (exclude.has(skillId)) return;
      if (result.includes(skillId)) return;
      result.push(skillId);
    });
  });
  return result.slice(0, STARTER_SKILLS_PER_DAY);
}

export function buildStarterSkillPlan(themeId: ThemeId) {
  const seeds = THEME_SEED_SKILLS[themeId];
  const day1 = buildDaySkills(seeds.day1, DAY1_BASE, new Set());
  const day2 = buildDaySkills(seeds.day2, DAY2_BASE, new Set(day1));
  return { day1, day2 };
}

export const STARTER_PLAN_RULES = {
  skillsPerDay: STARTER_SKILLS_PER_DAY,
} as const;
