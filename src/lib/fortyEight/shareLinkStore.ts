import { getRedisClient } from "@/lib/server/redis";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 7;
const MAX_ATTEMPTS = 12;
const LINK_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Entry = {
  targetPath: string;
  createdAt: number;
  expiresAt: number;
};

const linkStore = new Map<string, Entry>();

function randomCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    const index = Math.floor(Math.random() * CODE_ALPHABET.length);
    code += CODE_ALPHABET[index];
  }
  return code;
}

function pruneExpired(now: number) {
  for (const [code, entry] of linkStore.entries()) {
    if (entry.expiresAt <= now) {
      linkStore.delete(code);
    }
  }
}

export async function createShareShortLink(targetPath: string, now = Date.now()) {
  const redis = getRedisClient();
  if (redis) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      const code = randomCode();
      const key = `share:${code}`;
      const result = await redis.set(key, targetPath, {
        nx: true,
        ex: Math.max(1, Math.ceil(LINK_TTL_MS / 1000)),
      });
      if (result === "OK") return code;
    }
    throw new Error("short_code_generation_failed");
  }

  pruneExpired(now);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const code = randomCode();
    if (linkStore.has(code)) continue;

    linkStore.set(code, {
      targetPath,
      createdAt: now,
      expiresAt: now + LINK_TTL_MS,
    });

    return code;
  }

  throw new Error("short_code_generation_failed");
}

export async function readShareShortLink(code: string, now = Date.now()) {
  const redis = getRedisClient();
  if (redis) {
    const key = `share:${code}`;
    const value = await redis.get<string>(key);
    return value ?? null;
  }

  pruneExpired(now);
  const entry = linkStore.get(code);
  if (!entry) return null;
  if (entry.expiresAt <= now) {
    linkStore.delete(code);
    return null;
  }
  return entry.targetPath;
}

export function isValidShortCode(code: string) {
  return /^[A-Z2-9]{7}$/.test(code);
}

export function clearShareShortLinks() {
  linkStore.clear();
}
