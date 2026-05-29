export type PlannerDay = "day1" | "day2";
export type MomentCategory =
  | "quiet"
  | "connection"
  | "reset"
  | "desire"
  | "integration"
  | "expert-held";

export type DiagnosticQuestionId = "q1" | "q2" | "q3";

export type MomentItem = {
  id: string;
  durationMinutes: number;
  category: MomentCategory;
  tags: string[];
  isClinician: boolean;
  preferredDay?: PlannerDay;
  preferredStartSlot?: number;
  major?: boolean;
  conflictsWith?: string[];
};

export type TimelineBlock = {
  id: string;
  itemId: string;
  day: PlannerDay;
  startSlot: number;
  slotLength: number;
};

export type PlannerState = {
  blocks: TimelineBlock[];
};

export type ValidationError = {
  code:
    | "total-cap"
    | "overlap"
    | "day-hours-cap"
    | "major-exclusive"
    | "conflict"
    | "unknown-item";
  context?: {
    day?: PlannerDay;
  };
};

export type Totals = {
  totalPlannedMinutes: number;
  clinicianMinutes: number;
  remainingMinutes: number;
  clinicianDay1Minutes: number;
  clinicianDay2Minutes: number;
};

export type ToggleResult = {
  state: PlannerState;
  errors: ValidationError[];
};

export const SLOT_MINUTES = 30;
export const SLOTS_PER_DAY = 48;
export const TOTAL_WEEKEND_MINUTES = 2880;
const MAX_CLINICIAN_DAY_MINUTES = 330;
const MAX_CLINICIAN_MINUTES = 630;
const DEFAULT_START_SLOT = 0;
const PERIOD_BUCKETS = [
  { startSlot: 0, endSlot: 16 },
  { startSlot: 16, endSlot: 32 },
  { startSlot: 32, endSlot: 48 },
] as const;

export const MOMENTS: MomentItem[] = [
  {
    id: "quiet-dinner",
    durationMinutes: 90,
    category: "quiet",
    tags: ["Quiet", "Presence"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 32,
  },
  {
    id: "listening-exchange",
    durationMinutes: 30,
    category: "connection",
    tags: ["Listening", "Voice"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 18,
  },
  {
    id: "walk-reset",
    durationMinutes: 60,
    category: "reset",
    tags: ["Reset", "Pacing"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 20,
  },
  {
    id: "phones-off-hour",
    durationMinutes: 60,
    category: "quiet",
    tags: ["Presence"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 24,
  },
  {
    id: "appreciation-round",
    durationMinutes: 30,
    category: "connection",
    tags: ["Gratitude", "Voice"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 16,
  },
  {
    id: "reset-practice",
    durationMinutes: 30,
    category: "reset",
    tags: ["Reset", "Steadiness"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 14,
  },
  {
    id: "morning-coffee",
    durationMinutes: 30,
    category: "connection",
    tags: ["Check-in", "Alignment"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 8,
  },
  {
    id: "solo-decompression",
    durationMinutes: 60,
    category: "quiet",
    tags: ["Calm", "Reset"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 6,
  },
  {
    id: "journal-share",
    durationMinutes: 30,
    category: "integration",
    tags: ["Reflection", "Clarity"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 22,
  },
  {
    id: "values-alignment",
    durationMinutes: 60,
    category: "integration",
    tags: ["Alignment", "Direction"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 26,
  },
  {
    id: "desire-mapping",
    durationMinutes: 60,
    category: "desire",
    tags: ["Desire", "Curiosity"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 18,
  },
  {
    id: "non-goal-touch",
    durationMinutes: 30,
    category: "desire",
    tags: ["Touch", "Ease"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 20,
  },
  {
    id: "plan-for-monday",
    durationMinutes: 60,
    category: "integration",
    tags: ["Transition", "Clarity"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 30,
  },
  {
    id: "relationship-agreements",
    durationMinutes: 30,
    category: "integration",
    tags: ["Agreements", "Clarity"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 28,
  },
  {
    id: "shared-playlist",
    durationMinutes: 30,
    category: "quiet",
    tags: ["Memory", "Ease"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 34,
  },
  {
    id: "integration-journaling",
    durationMinutes: 30,
    category: "integration",
    tags: ["Integration", "Steadiness"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 32,
  },
  {
    id: "sunrise-checkin",
    durationMinutes: 30,
    category: "connection",
    tags: ["Check-in", "Pacing"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 8,
  },
  {
    id: "threshold-call",
    durationMinutes: 30,
    category: "expert-held",
    tags: ["Entry", "Pacing"],
    isClinician: true,
    preferredDay: "day1",
    preferredStartSlot: 4,
  },
  {
    id: "alignment-checkins",
    durationMinutes: 60,
    category: "expert-held",
    tags: ["Alignment", "Steadiness"],
    isClinician: true,
    preferredDay: "day1",
    preferredStartSlot: 6,
  },
  {
    id: "breakthrough-block",
    durationMinutes: 90,
    category: "expert-held",
    tags: ["Breakthrough", "Momentum"],
    isClinician: true,
    preferredDay: "day1",
    major: true,
    preferredStartSlot: 10,
  },
  {
    id: "stabilization-session",
    durationMinutes: 60,
    category: "expert-held",
    tags: ["Stabilization", "Integration"],
    isClinician: true,
    preferredDay: "day2",
    conflictsWith: ["integration-sessions"],
    preferredStartSlot: 10,
  },
  {
    id: "integration-sessions",
    durationMinutes: 120,
    category: "expert-held",
    tags: ["Integration", "Follow-through"],
    isClinician: true,
    preferredDay: "day2",
    major: true,
    conflictsWith: ["stabilization-session"],
    preferredStartSlot: 12,
  },
  {
    id: "expert-held-session",
    durationMinutes: 60,
    category: "expert-held",
    tags: ["Expert held", "Clarity"],
    isClinician: true,
    preferredDay: "day1",
    preferredStartSlot: 14,
  },
  {
    id: "home-blueprint",
    durationMinutes: 60,
    category: "integration",
    tags: ["Blueprint", "Follow-through"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 34,
  },
  {
    id: "calendar-protection",
    durationMinutes: 30,
    category: "integration",
    tags: ["Protection", "Pacing"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 12,
  },
  {
    id: "quiet-reading",
    durationMinutes: 60,
    category: "quiet",
    tags: ["Quiet", "Reset"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 36,
  },
  {
    id: "evening-wind-down",
    durationMinutes: 60,
    category: "quiet",
    tags: ["Calm", "Sleep"],
    isClinician: false,
    preferredDay: "day1",
    preferredStartSlot: 38,
  },
  {
    id: "focus-ritual",
    durationMinutes: 30,
    category: "reset",
    tags: ["Focus", "Steadiness"],
    isClinician: false,
    preferredDay: "day2",
    preferredStartSlot: 16,
  },
];

let blockIdCounter = 0;

type StarterDraftBlock = Omit<TimelineBlock, "id">;
type StarterDraft = {
  id: string;
  label: string;
  blocks: StarterDraftBlock[];
};

export const STARTER_DRAFTS: StarterDraft[] = [
  {
    id: "more-voice",
    label: "More voice",
    blocks: [
      { itemId: "threshold-call", day: "day1", startSlot: 2, slotLength: 1 },
      { itemId: "alignment-checkins", day: "day1", startSlot: 4, slotLength: 2 },
      { itemId: "breakthrough-block", day: "day1", startSlot: 8, slotLength: 3 },
      { itemId: "expert-held-session", day: "day1", startSlot: 12, slotLength: 2 },
      { itemId: "listening-exchange", day: "day1", startSlot: 16, slotLength: 1 },
      { itemId: "values-alignment", day: "day1", startSlot: 18, slotLength: 2 },
      { itemId: "quiet-dinner", day: "day1", startSlot: 32, slotLength: 3 },
      { itemId: "stabilization-session", day: "day2", startSlot: 4, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 8, slotLength: 2 },
      { itemId: "alignment-checkins", day: "day2", startSlot: 12, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 16, slotLength: 2 },
      { itemId: "journal-share", day: "day2", startSlot: 22, slotLength: 1 },
      { itemId: "plan-for-monday", day: "day2", startSlot: 26, slotLength: 2 },
    ],
  },
  {
    id: "more-calm",
    label: "More calm",
    blocks: [
      { itemId: "threshold-call", day: "day1", startSlot: 2, slotLength: 1 },
      { itemId: "alignment-checkins", day: "day1", startSlot: 4, slotLength: 2 },
      { itemId: "expert-held-session", day: "day1", startSlot: 8, slotLength: 2 },
      { itemId: "expert-held-session", day: "day1", startSlot: 12, slotLength: 2 },
      { itemId: "solo-decompression", day: "day1", startSlot: 16, slotLength: 2 },
      { itemId: "walk-reset", day: "day1", startSlot: 20, slotLength: 2 },
      { itemId: "quiet-dinner", day: "day1", startSlot: 32, slotLength: 3 },
      { itemId: "integration-sessions", day: "day2", startSlot: 6, slotLength: 4 },
      { itemId: "expert-held-session", day: "day2", startSlot: 12, slotLength: 2 },
      { itemId: "alignment-checkins", day: "day2", startSlot: 16, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 20, slotLength: 2 },
      { itemId: "phones-off-hour", day: "day2", startSlot: 26, slotLength: 2 },
      { itemId: "evening-wind-down", day: "day2", startSlot: 34, slotLength: 2 },
    ],
  },
  {
    id: "more-desire",
    label: "More desire",
    blocks: [
      { itemId: "threshold-call", day: "day1", startSlot: 2, slotLength: 1 },
      { itemId: "alignment-checkins", day: "day1", startSlot: 4, slotLength: 2 },
      { itemId: "breakthrough-block", day: "day1", startSlot: 8, slotLength: 3 },
      { itemId: "expert-held-session", day: "day1", startSlot: 12, slotLength: 2 },
      { itemId: "listening-exchange", day: "day1", startSlot: 16, slotLength: 1 },
      { itemId: "quiet-dinner", day: "day1", startSlot: 32, slotLength: 3 },
      { itemId: "stabilization-session", day: "day2", startSlot: 6, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 10, slotLength: 2 },
      { itemId: "alignment-checkins", day: "day2", startSlot: 14, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 18, slotLength: 2 },
      { itemId: "desire-mapping", day: "day2", startSlot: 24, slotLength: 2 },
      { itemId: "non-goal-touch", day: "day2", startSlot: 28, slotLength: 1 },
    ],
  },
  {
    id: "more-alignment",
    label: "More alignment",
    blocks: [
      { itemId: "threshold-call", day: "day1", startSlot: 2, slotLength: 1 },
      { itemId: "alignment-checkins", day: "day1", startSlot: 4, slotLength: 2 },
      { itemId: "expert-held-session", day: "day1", startSlot: 8, slotLength: 2 },
      { itemId: "expert-held-session", day: "day1", startSlot: 12, slotLength: 2 },
      { itemId: "values-alignment", day: "day1", startSlot: 16, slotLength: 2 },
      { itemId: "quiet-dinner", day: "day1", startSlot: 32, slotLength: 3 },
      { itemId: "integration-sessions", day: "day2", startSlot: 6, slotLength: 4 },
      { itemId: "expert-held-session", day: "day2", startSlot: 12, slotLength: 2 },
      { itemId: "alignment-checkins", day: "day2", startSlot: 16, slotLength: 2 },
      { itemId: "expert-held-session", day: "day2", startSlot: 20, slotLength: 2 },
      { itemId: "relationship-agreements", day: "day2", startSlot: 24, slotLength: 1 },
      { itemId: "plan-for-monday", day: "day2", startSlot: 28, slotLength: 2 },
      { itemId: "home-blueprint", day: "day2", startSlot: 32, slotLength: 2 },
    ],
  },
];

export function getCatalog() {
  const categories: MomentCategory[] = [
    "expert-held",
    "quiet",
    "connection",
    "reset",
    "desire",
    "integration",
  ];

  return {
    categories,
    moments: MOMENTS,
  };
}

export function createPlannerState(): PlannerState {
  return {
    blocks: [],
  };
}

function createBlockId() {
  blockIdCounter += 1;
  return `block-${blockIdCounter}`;
}

function minutesToSlots(minutes: number) {
  return Math.max(1, Math.round(minutes / SLOT_MINUTES));
}

export function getMomentById(id: string) {
  return MOMENTS.find((item) => item.id === id);
}

export function canPlaceBlock(
  block: TimelineBlock,
  blocks: TimelineBlock[],
) {
  if (block.startSlot < 0) return false;
  if (block.startSlot + block.slotLength > SLOTS_PER_DAY) return false;

  return !blocks.some((existing) => {
    if (existing.day !== block.day) return false;
    if (existing.id === block.id) return false;
    const blockStart = block.startSlot;
    const blockEnd = block.startSlot + block.slotLength;
    const existingStart = existing.startSlot;
    const existingEnd = existing.startSlot + existing.slotLength;
    return blockStart < existingEnd && blockEnd > existingStart;
  });
}

function reflowDayBlocks(
  blocks: TimelineBlock[],
  day: PlannerDay,
): { blocks: TimelineBlock[]; fits: boolean } {
  const dayBlocks = blocks
    .filter((block) => block.day === day)
    .sort((a, b) => a.startSlot - b.startSlot);

  let cursor = 0;
  let fits = true;

  const normalized = dayBlocks.map((block) => {
    const nextStart = Math.max(block.startSlot, cursor);
    cursor = nextStart + block.slotLength;
    if (cursor > SLOTS_PER_DAY) fits = false;
    return { ...block, startSlot: nextStart };
  });

  const otherBlocks = blocks.filter((block) => block.day !== day);
  return { blocks: [...otherBlocks, ...normalized], fits };
}

function reflowBlocksForDays(
  blocks: TimelineBlock[],
  days: PlannerDay[],
): { blocks: TimelineBlock[]; fits: boolean } {
  let currentBlocks = blocks;
  let fits = true;
  days.forEach((day) => {
    const result = reflowDayBlocks(currentBlocks, day);
    currentBlocks = result.blocks;
    if (!result.fits) fits = false;
  });
  return { blocks: currentBlocks, fits };
}

function getOpenSlot(
  blocks: TimelineBlock[],
  day: PlannerDay,
  slotLength: number,
  preferredStartSlot?: number,
) {
  const startFrom = Math.min(
    Math.max(preferredStartSlot ?? DEFAULT_START_SLOT, 0),
    SLOTS_PER_DAY - slotLength,
  );

  for (let startSlot = startFrom; startSlot <= SLOTS_PER_DAY - slotLength; startSlot += 1) {
    const candidate: TimelineBlock = {
      id: "candidate",
      itemId: "candidate",
      day,
      startSlot,
      slotLength,
    };
    if (canPlaceBlock(candidate, blocks)) return startSlot;
  }

  for (let startSlot = 0; startSlot < startFrom; startSlot += 1) {
    const candidate: TimelineBlock = {
      id: "candidate",
      itemId: "candidate",
      day,
      startSlot,
      slotLength,
    };
    if (canPlaceBlock(candidate, blocks)) return startSlot;
  }

  return null;
}

export function placeItemNextAvailable(
  state: PlannerState,
  itemId: string,
  preferredDay?: PlannerDay,
): ToggleResult {
  const item = getMomentById(itemId);
  if (!item) {
    return {
      state,
      errors: [{ code: "unknown-item" }],
    };
  }

  const slotLength = minutesToSlots(item.durationMinutes);
  const daysToTry: PlannerDay[] = preferredDay
    ? [preferredDay, preferredDay === "day1" ? "day2" : "day1"]
    : item.preferredDay
      ? [item.preferredDay, item.preferredDay === "day1" ? "day2" : "day1"]
      : ["day1", "day2"];

  for (const day of daysToTry) {
    const startSlot = getOpenSlot(
      state.blocks,
      day,
      slotLength,
      item.preferredStartSlot,
    );
    if (startSlot === null) continue;

    const block: TimelineBlock = {
      id: createBlockId(),
      itemId,
      day,
      startSlot,
      slotLength,
    };

    const nextState: PlannerState = {
      ...state,
      blocks: [...state.blocks, block],
    };

    const errors = validateState(nextState);
    if (errors.length > 0) {
      return { state, errors };
    }

    return { state: nextState, errors: [] };
  }

  return { state, errors: [{ code: "total-cap" }] };
}

export function placeItemAtSlot(
  state: PlannerState,
  itemId: string,
  day: PlannerDay,
  startSlot: number,
): ToggleResult {
  const item = getMomentById(itemId);
  if (!item) {
    return { state, errors: [{ code: "unknown-item" }] };
  }

  const slotLength = minutesToSlots(item.durationMinutes);
  const block: TimelineBlock = {
    id: createBlockId(),
    itemId,
    day,
    startSlot,
    slotLength,
  };

  const nextBlocks = [...state.blocks, block];
  const reflowed = reflowBlocksForDays(nextBlocks, [day]);
  if (!reflowed.fits) {
    return { state, errors: [{ code: "overlap" }] };
  }

  const nextState = { ...state, blocks: reflowed.blocks };
  const errors = validateState(nextState);
  if (errors.length > 0) {
    return { state, errors };
  }

  return { state: nextState, errors: [] };
}

export function moveBlock(
  state: PlannerState,
  blockId: string,
  day: PlannerDay,
  startSlot: number,
): ToggleResult {
  const block = state.blocks.find((item) => item.id === blockId);
  if (!block) return { state, errors: [{ code: "unknown-item" }] };

  const fixedBlocks = state.blocks.filter((item) => item.id !== blockId);
  const maxStart = Math.max(0, SLOTS_PER_DAY - block.slotLength);
  const requestedStart = Math.max(0, Math.min(startSlot, maxStart));
  const movingForward = requestedStart >= block.startSlot;

  const canPlaceAt = (candidateStart: number) =>
    canPlaceBlock(
      {
        ...block,
        day,
        startSlot: candidateStart,
      },
      fixedBlocks,
    );

  let resolvedStart: number | null = null;
  if (canPlaceAt(requestedStart)) {
    resolvedStart = requestedStart;
  } else if (movingForward) {
    for (let slot = requestedStart + 1; slot <= maxStart; slot += 1) {
      if (canPlaceAt(slot)) {
        resolvedStart = slot;
        break;
      }
    }
    if (resolvedStart === null) {
      for (let slot = requestedStart - 1; slot >= 0; slot -= 1) {
        if (canPlaceAt(slot)) {
          resolvedStart = slot;
          break;
        }
      }
    }
  } else {
    for (let slot = requestedStart - 1; slot >= 0; slot -= 1) {
      if (canPlaceAt(slot)) {
        resolvedStart = slot;
        break;
      }
    }
    if (resolvedStart === null) {
      for (let slot = requestedStart + 1; slot <= maxStart; slot += 1) {
        if (canPlaceAt(slot)) {
          resolvedStart = slot;
          break;
        }
      }
    }
  }

  if (resolvedStart === null) {
    return { state, errors: [{ code: "overlap" }] };
  }

  const candidate = { ...block, day, startSlot: resolvedStart };
  const nextState = {
    ...state,
    blocks: [...fixedBlocks, candidate],
  };

  const errors = validateState(nextState);
  if (errors.length > 0) {
    return { state, errors };
  }

  return { state: nextState, errors: [] };
}

export function resizeBlock(
  state: PlannerState,
  blockId: string,
  slotLength: number,
): ToggleResult {
  const block = state.blocks.find((item) => item.id === blockId);
  if (!block) return { state, errors: [{ code: "unknown-item" }] };

  const nextLength = Math.max(1, slotLength);
  const candidate = { ...block, slotLength: nextLength };
  const updatedBlocks = state.blocks.map((item) =>
    item.id === blockId ? candidate : item,
  );
  const reflowed = reflowBlocksForDays(updatedBlocks, [block.day]);
  if (!reflowed.fits) {
    return { state, errors: [{ code: "overlap" }] };
  }

  const nextState = {
    ...state,
    blocks: reflowed.blocks,
  };

  const errors = validateState(nextState);
  if (errors.length > 0) {
    return { state, errors };
  }

  return { state: nextState, errors: [] };
}

export function removeBlock(state: PlannerState, blockId: string) {
  return {
    ...state,
    blocks: state.blocks.filter((item) => item.id !== blockId),
  };
}

export function computeTotals(state: PlannerState): Totals {
  const blocks = state.blocks;
  const totalPlannedMinutes = blocks.reduce((sum, block) => {
    const item = getMomentById(block.itemId);
    return sum + (item?.durationMinutes ?? 0);
  }, 0);

  const clinicianMinutes = blocks.reduce((sum, block) => {
    const item = getMomentById(block.itemId);
    if (!item?.isClinician) return sum;
    return sum + item.durationMinutes;
  }, 0);

  const clinicianDay1Minutes = blocks.reduce((sum, block) => {
    const item = getMomentById(block.itemId);
    if (!item?.isClinician || block.day !== "day1") return sum;
    return sum + item.durationMinutes;
  }, 0);

  const clinicianDay2Minutes = blocks.reduce((sum, block) => {
    const item = getMomentById(block.itemId);
    if (!item?.isClinician || block.day !== "day2") return sum;
    return sum + item.durationMinutes;
  }, 0);

  return {
    totalPlannedMinutes,
    clinicianMinutes,
    remainingMinutes: Math.max(TOTAL_WEEKEND_MINUTES - totalPlannedMinutes, 0),
    clinicianDay1Minutes,
    clinicianDay2Minutes,
  };
}

export function deriveInvestment(clinicianMinutes: number) {
  const cappedMinutes = Math.min(clinicianMinutes, MAX_CLINICIAN_MINUTES);
  if (cappedMinutes === 0) return null;
  return cappedMinutes <= 480 ? 5000 : 6250;
}

export function validateState(state: PlannerState): ValidationError[] {
  const errors: ValidationError[] = [];

  const unknownBlock = state.blocks.find(
    (block) => !getMomentById(block.itemId),
  );
  if (unknownBlock) {
    return [{ code: "unknown-item" }];
  }

  for (const block of state.blocks) {
    if (!canPlaceBlock(block, state.blocks)) {
      return [{ code: "overlap" }];
    }
  }

  const totals = computeTotals(state);
  if (totals.totalPlannedMinutes > TOTAL_WEEKEND_MINUTES) {
    errors.push({ code: "total-cap" });
  }

  if (totals.clinicianDay1Minutes > MAX_CLINICIAN_DAY_MINUTES) {
    errors.push({ code: "day-hours-cap", context: { day: "day1" } });
  }

  if (totals.clinicianDay2Minutes > MAX_CLINICIAN_DAY_MINUTES) {
    errors.push({ code: "day-hours-cap", context: { day: "day2" } });
  }

  const clinicianItems = state.blocks
    .map((block) => getMomentById(block.itemId))
    .filter((item): item is MomentItem => Boolean(item && item.isClinician));

  const majorClinicianItems = clinicianItems.filter((item) => item.major);
  if (majorClinicianItems.length > 1) {
    errors.push({ code: "major-exclusive" });
  }

  clinicianItems
    .filter((item) => item.conflictsWith?.length)
    .forEach((item) => {
      const conflict = item.conflictsWith?.find((conflictId) =>
        state.blocks.some((block) => block.itemId === conflictId),
      );
      if (conflict) {
        errors.push({ code: "conflict" });
      }
    });

  return errors;
}

export function applyStarterDraft(
  state: PlannerState,
  draftId: string,
): ToggleResult {
  const draft = STARTER_DRAFTS.find((item) => item.id === draftId);
  if (!draft) return { state, errors: [{ code: "unknown-item" }] };

  const blocks: TimelineBlock[] = draft.blocks.map((block) => ({
    ...block,
    id: createBlockId(),
  }));

  const nextState = {
    ...state,
    blocks,
  };

  const errors = validateState(nextState);
  if (errors.length > 0) {
    return { state, errors };
  }

  return { state: nextState, errors: [] };
}

export function organizeTimeline(state: PlannerState): ToggleResult {
  const packedBlocks: TimelineBlock[] = [];

  (["day1", "day2"] as PlannerDay[]).forEach((day) => {
    const dayBlocks = state.blocks
      .filter((block) => block.day === day)
      .sort((a, b) => a.startSlot - b.startSlot);

    PERIOD_BUCKETS.forEach((bucket) => {
      const bucketBlocks = dayBlocks.filter(
        (block) =>
          block.startSlot >= bucket.startSlot &&
          block.startSlot < bucket.endSlot,
      );
      let cursor = bucket.startSlot;
      bucketBlocks.forEach((block) => {
        const nextStart = cursor;
        cursor = nextStart + block.slotLength;
        packedBlocks.push({ ...block, startSlot: nextStart });
      });
    });
  });

  const overflow = packedBlocks.some((block) => {
    const bucket = PERIOD_BUCKETS.find(
      (period) =>
        block.startSlot >= period.startSlot && block.startSlot < period.endSlot,
    );
    if (!bucket) return true;
    return block.startSlot + block.slotLength > bucket.endSlot;
  });
  if (overflow) {
    return { state, errors: [{ code: "overlap" }] };
  }

  const reflowed = reflowBlocksForDays(packedBlocks, ["day1", "day2"]);
  if (!reflowed.fits) {
    return { state, errors: [{ code: "overlap" }] };
  }
  const nextState = { ...state, blocks: reflowed.blocks };
  const errors = validateState(nextState);
  if (errors.length > 0) {
    return { state, errors };
  }
  return { state: nextState, errors: [] };
}
