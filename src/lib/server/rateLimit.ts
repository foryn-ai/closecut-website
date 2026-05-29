import { getRedisClient } from "@/lib/server/redis";

type Bucket = {
  timestamps: number[];
};

type RateLimitOptions = {
  namespace: "contact" | "waitlist" | "workshops_waitlist" | "analytics";
  ipKey: string;
  now: number;
  windowMs: number;
  max: number;
};

const localBuckets = new Map<string, Bucket>();

function localWithinRateLimit({
  namespace,
  ipKey,
  now,
  windowMs,
  max,
}: RateLimitOptions) {
  const key = `${namespace}:${ipKey}`;
  const bucket = localBuckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (bucket.timestamps.length >= max) {
    localBuckets.set(key, bucket);
    return false;
  }

  bucket.timestamps.push(now);
  localBuckets.set(key, bucket);
  return true;
}

async function redisWithinRateLimit({
  namespace,
  ipKey,
  windowMs,
  max,
}: RateLimitOptions) {
  const redis = getRedisClient();
  if (!redis) return null;

  const key = `rl:${namespace}:${ipKey}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, Math.max(1, Math.ceil(windowMs / 1000)));
  }

  return count <= max;
}

export async function withinRateLimit(options: RateLimitOptions) {
  try {
    const redisResult = await redisWithinRateLimit(options);
    if (redisResult !== null) {
      return redisResult;
    }
  } catch {
    // Fall back to local limiter when redis is unavailable.
  }

  return localWithinRateLimit(options);
}
