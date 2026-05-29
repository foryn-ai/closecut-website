import {
  SLOTS_PER_DAY,
  getMomentById,
  validateState,
  type PlannerDay,
  type PlannerState,
  type TimelineBlock,
} from "@/lib/pricing/intensive";

const SHARE_VERSION = 1;

type EncodedBlock = {
  itemId: string;
  day: PlannerDay;
  startSlot: number;
  slotLength: number;
};

type SharePlanPayload = {
  v: number;
  generatedAt: string;
  blocks: EncodedBlock[];
};

function encodeBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    return Buffer.from(padded, "base64").toString("utf-8");
  }

  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isPlannerDay(value: unknown): value is PlannerDay {
  return value === "day1" || value === "day2";
}

function isValidEncodedBlock(value: unknown): value is EncodedBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as Partial<EncodedBlock>;
  if (typeof block.itemId !== "string" || !isPlannerDay(block.day)) return false;
  const startSlot = block.startSlot;
  const slotLength = block.slotLength;
  if (typeof startSlot !== "number" || typeof slotLength !== "number") return false;
  if (!Number.isInteger(startSlot) || !Number.isInteger(slotLength)) return false;
  if (slotLength <= 0 || slotLength > SLOTS_PER_DAY) return false;
  if (startSlot < 0 || startSlot + slotLength > SLOTS_PER_DAY) return false;
  if (!getMomentById(block.itemId)) return false;
  return true;
}

function toPlannerBlock(block: EncodedBlock, index: number): TimelineBlock {
  return {
    id: `share-${index + 1}`,
    itemId: block.itemId,
    day: block.day,
    startSlot: block.startSlot,
    slotLength: block.slotLength,
  };
}

export function encodeSharePlan(state: PlannerState, generatedAt: Date) {
  const payload: SharePlanPayload = {
    v: SHARE_VERSION,
    generatedAt: generatedAt.toISOString(),
    blocks: state.blocks.map((block) => ({
      itemId: block.itemId,
      day: block.day,
      startSlot: block.startSlot,
      slotLength: block.slotLength,
    })),
  };

  return encodeBase64Url(JSON.stringify(payload));
}

export function decodeSharePlan(token: string) {
  try {
    const decoded = decodeBase64Url(token);
    const payload = JSON.parse(decoded) as Partial<SharePlanPayload>;

    if (payload.v !== SHARE_VERSION) return null;
    if (typeof payload.generatedAt !== "string") return null;
    if (!Array.isArray(payload.blocks)) return null;

    const blocks = payload.blocks.filter(isValidEncodedBlock).map(toPlannerBlock);
    const state: PlannerState = { blocks };
    const errors = validateState(state);
    if (errors.length > 0) return null;

    const generatedAt = new Date(payload.generatedAt);
    if (Number.isNaN(generatedAt.getTime())) return null;

    return { state, generatedAt };
  } catch {
    return null;
  }
}
