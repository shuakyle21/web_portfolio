/**
 * One source of truth for the canonical origin. Read by the root metadata,
 * the sitemap, robots.txt and the OG card, so they cannot drift apart.
 *
 * Set NEXT_PUBLIC_SITE_URL to override; it is unset on Vercel Production on
 * purpose, so this fallback is the single source of truth for the origin. The
 * fallback is the custom domain, which is served and returns 200 — never point
 * it at a host that isn't live yet, because a canonical tag aimed at an
 * unfetchable host tells search engines the real site lives somewhere it
 * cannot reach.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shua-kyle.me";

/** Host without protocol, for display (e.g. in the OG card footer). */
export const siteHost = siteUrl.replace(/^https?:\/\//, "");
