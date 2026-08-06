# Shua.dev — portfolio

Joshua Klyne P. Pudadera's portfolio: research, verification and technical writing.
Built with **Next.js (App Router) + TypeScript + Tailwind**, implementing the
Claude Design project "Claude Code portfolio website" (Nocturne design system).
The visual source of truth lives in [`design-reference/`](design-reference/) —
`Portfolio.dc.html`, `Case Study.dc.html`, and the Nocturne tokens.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `app/` — layout (fonts, metadata, JSON-LD), home page, `/work/[slug]` case-study
  route, `/api/contact` form handler, `sitemap.ts`, `robots.ts`
- `components/` — one component per section (`Nav`, `Hero`, `About`, `SkillsCloud`,
  `StackMarquee`, `ProjectGrid`, `Writing`, `ExperienceTimeline`, `ContactCTA`,
  `Footer`) plus the animation primitives (`TypingText`, `CountUp`, `Reveal`,
  `HighlightSweep`, `CopyEmailButton`)
- `lib/data/` — every editable fact: `profile.ts`, `skills.ts`, `work.ts`
  (incl. the dengue case-study object), `experience.ts`, `links.ts`
- `app/globals.css` — the Nocturne token system, component classes, keyframes and
  the three easing curves (`--ease-out`, `--ease-std`, `--ease-nav`)

All scroll-triggered effects fire once and everything sits behind
`prefers-reduced-motion` (marquees become plain scrollers, counters and reveals
render final state).

## Contact form

`/api/contact` validates with the same zod schema as the client, has a honeypot
and a submit-speed check. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to deliver
via Resend; without them, submissions are accepted and logged (dev mode).

## Deploy

- **Vercel** (recommended): push the repo and import it — the API route, sitemap
  and SSG case study all work as-is. Env vars: `NEXT_PUBLIC_SITE_URL`,
  `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
- **GitHub Pages**: possible via `output: "export"` in `next.config.ts`, but the
  `/api/contact` route must be dropped — point the form at a form service
  (Formspree etc.) instead.

## Content still needed (from IMPLEMENTATION.md §12)

- Real screenshots for the EGACE, pipeline, medium-draft and TESDA work cards,
  and the case-study figure slots (`components/ImageSlot.tsx` placeholders).
- Individual Medium article titles/URLs for the Writing section.
- A public repo URL for the dengue dataset, if one exists.
- An `/og.png` social share image.
