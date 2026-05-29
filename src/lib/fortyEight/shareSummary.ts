import {
  getMomentById,
  type MomentCategory,
  type PlannerState,
} from "@/lib/pricing/intensive";

const TOGETHER_CATEGORIES = [
  "quiet",
  "connection",
  "reset",
  "desire",
  "integration",
] as const;

type TogetherCategory = (typeof TOGETHER_CATEGORIES)[number];

type ShareSummary = {
  expertHeldMinutes: number;
  togetherMinutes: number;
  minutesByCategory: Record<TogetherCategory, number>;
  percentsByCategory: Record<TogetherCategory, number>;
};

const roundPercent = (value: number) => {
  const step = 5;
  return Math.round(value / step) * step;
};

export const computeShareSummary = (state: PlannerState): ShareSummary => {
  const minutesByCategory: Record<TogetherCategory, number> = {
    quiet: 0,
    connection: 0,
    reset: 0,
    desire: 0,
    integration: 0,
  };

  let expertHeldMinutes = 0;
  let togetherMinutes = 0;

  state.blocks.forEach((block) => {
    const moment = getMomentById(block.itemId);
    if (!moment) return;
    const minutes = moment.durationMinutes;
    const category = moment.category as MomentCategory;

    if (category === "expert-held") {
      expertHeldMinutes += minutes;
      return;
    }

    if (category in minutesByCategory) {
      minutesByCategory[category as TogetherCategory] += minutes;
      togetherMinutes += minutes;
    }
  });

  const percentsByCategory: Record<TogetherCategory, number> = {
    quiet: 0,
    connection: 0,
    reset: 0,
    desire: 0,
    integration: 0,
  };

  TOGETHER_CATEGORIES.forEach((category) => {
    const rawPercent =
      togetherMinutes === 0 ? 0 : (minutesByCategory[category] / togetherMinutes) * 100;
    percentsByCategory[category] = roundPercent(rawPercent);
  });

  return {
    expertHeldMinutes,
    togetherMinutes,
    minutesByCategory,
    percentsByCategory,
  };
};

export const SHARE_CATEGORY_ORDER = TOGETHER_CATEGORIES;
