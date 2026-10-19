/**
 * Fixed-window limiter shared by the two public POST routes.
 *
 * shortcut: in-memory and per-instance, so a caller spread across Vercel's
 * concurrent instances gets up to N × the limit, and a cold start resets the
 * window. It stops the scripted loop that would otherwise burn the Resend
 * quota and flood the inbox; it is not a defence against a distributed flood.
 * Move the state to Upstash Redis or turn on Vercel WAF rate limiting when
 * that becomes the real threat.
 */
const WINDOW_MS = 60_000;

/** Requests allowed per client per window. Exported so the check can assert it. */
export const MAX_PER_WINDOW = 5;

/** Bound on tracked clients, so the limiter itself cannot be the memory leak. */
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

/**
 * Vercel sets x-forwarded-for, and the left-most entry is the client. Falls
 * back to a single shared bucket rather than trusting a spoofable header.
 */
export function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}
