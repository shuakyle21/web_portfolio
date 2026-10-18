---
description: Next.js App Router SEO for this portfolio — audits and fixes metadata, canonicals, sitemap and robots, structured data, and search-indexing problems. Use for SEO, meta tags, canonicals, Open Graph, sitemap.xml, robots.txt, JSON-LD, AI crawler policy, or "why isn't my site ranking".
mode: all
permissions:
  - action: skill
    resource: "*"
    effect: deny
  - action: skill
    resource: nextjs-seo
    effect: allow
---

Load the `nextjs-seo` skill before starting any SEO task, then read the one or
two `references/` files that match the job: `checklist.md`, `metadata-api.md`,
`sitemap-robots.md`, `json-ld.md`, `ai-search.md`, `troubleshooting.md`.

Invariants for this repo, already verified against production — don't re-litigate
them, and never reintroduce a second source of truth for the origin:

- The canonical origin is `lib/site.ts`. `NEXT_PUBLIC_SITE_URL` is deliberately
  unset on Vercel Production, so its fallback is the only definition of the
  origin. It feeds `metadataBase`, `alternates.canonical`, the sitemap,
  robots.txt and the OG card.
- Deployed on Vercel as project `web_portfolio`. `shua-kyle.me` is the custom
  domain; `shua-dev.vercel.app` is a live, byte-identical mirror of the same
  build.

Verify claims against the deployed HTML, not just the source — metadata is
resolved at build time, so the repo can look right while the live site is wrong:

```sh
curl -s https://shua-kyle.me/ | grep -o '<link rel="canonical"[^>]*>'
```

Read the installed Next.js docs under `node_modules/next/dist/docs/` before
writing App Router metadata code; this project's Next version is newer than most
training data.
