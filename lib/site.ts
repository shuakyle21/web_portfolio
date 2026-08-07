/**
 * One source of truth for the canonical origin. Read by the root metadata,
 * the sitemap, robots.txt and the OG card, so they cannot drift apart.
 *
 * Set NEXT_PUBLIC_SITE_URL to override (it is set on Vercel Production). The
 * fallback is the live Vercel alias, not a domain that isn't served yet —
 * pointing canonical tags at an unserved host tells search engines the real
 * version of the site lives somewhere it cannot fetch.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shua-dev.vercel.app";

/** Host without protocol, for display (e.g. in the OG card footer). */
export const siteHost = siteUrl.replace(/^https?:\/\//, "");
