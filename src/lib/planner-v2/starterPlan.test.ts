import { describe, expect, it } from "vitest";
import { THEME_IDS } from "@/lib/planner-v2/model";
import { STARTER_PLAN_RULES, buildStarterSkillPlan } from "@/lib/planner-v2/starterPlan";

describe("planner v2 starter plan", () => {
  it("builds six skills per day for every theme", () => {
    THEME_IDS.forEach((themeId) => {
      const plan = buildStarterSkillPlan(themeId);
      expect(plan.day1.length).toBe(STARTER_PLAN_RULES.skillsPerDay);
      expect(plan.day2.length).toBe(STARTER_PLAN_RULES.skillsPerDay);
    });
  });

  it("keeps skills unique across days", () => {
    THEME_IDS.forEach((themeId) => {
      const plan = buildStarterSkillPlan(themeId);
      const day1 = new Set(plan.day1);
      const overlap = plan.day2.filter((skillId) => day1.has(skillId));
      expect(overlap.length).toBe(0);
    });
  });

  it("keeps each day internally unique", () => {
    THEME_IDS.forEach((themeId) => {
      const plan = buildStarterSkillPlan(themeId);
      expect(new Set(plan.day1).size).toBe(plan.day1.length);
      expect(new Set(plan.day2).size).toBe(plan.day2.length);
    });
  });
});
