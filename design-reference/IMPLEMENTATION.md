# Claude Code implementation notes

Reference for rebuilding this portfolio in React, Next.js, or Astro. The design in
`Portfolio.dc.html` and `Case Study.dc.html` is the visual source of truth; the content is
Joshua Klyne P. Pudadera's resume (`uploads/CV_research.pdf`).

Recommended stack: **Next.js (App Router) + TypeScript + Tailwind + Animate UI**.

---

## 1. Animate UI

Components come from https://animate-ui.com (React + TypeScript + Tailwind + Motion,
installed through the shadcn CLI). Install what the design uses:

```bash
npx shadcn@latest add @animate-ui/text-typing
npx shadcn@latest add @animate-ui/text-counting-number
npx shadcn@latest add @animate-ui/text-splitting
npx shadcn@latest add @animate-ui/text-highlight
npx shadcn@latest add @animate-ui/buttons-copy
npx shadcn@latest add @animate-ui/components-motion-highlight
npx shadcn@latest add @animate-ui/effects-magnetic
```

Where each one goes — the reference implements these effects natively; swap them for the
real components on rebuild:

| Reference behavior | Animate UI component | Where |
|---|---|---|
| Hero roles typed then deleted, blinking caret | `TypingText` (`loop`, `cursor`) | `Hero` |
| Stat numbers counting up on scroll | `CountingNumber` (`inView`) | `About` stat grid |
| Headings blur-and-rise on entry | `SplittingText` (`by="word"`) | every `h2` marked `data-reveal` |
| Accent sweep behind a phrase | `HighlightText` | About, "audit-ready or it is not" |
| Sliding indicator under the active nav link | `MotionHighlight` | `Nav` |
| Email copy button with a checkmark state | `CopyButton` | `ContactCTA` |
| Card lift on hover | plain Tailwind `transition` + `hover:-translate-y-1` | project + article cards |

Rules: one animated element per viewport region, headings only (never body copy), every
scroll-triggered effect fires `once`, and everything sits behind
`prefers-reduced-motion` — Animate UI respects it, but check your own additions.

### Base transitions and easing

Everything below the Animate UI layer — hovers, lifts, the nav indicator, link colors —
is plain CSS, generated and tuned with the https://design.dev/tools/ set (Cubic Bezier
Studio for the curves, Hover Effects Generator and Transform Playground for the states).
Three values cover the whole page; do not add a fourth:

| Token | Value | Used for |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,.7,.2,1)` | card lifts, button lifts, heading reveals |
| `--ease-std` | `cubic-bezier(.4,0,.2,1)` | link color and 1px link nudges |
| `--ease-nav` | `cubic-bezier(.32,.72,0,1)` | the nav highlight sliding between links |

Durations: 160ms links, 180ms buttons, 220ms cards, 260ms nav indicator, 620ms heading
reveal. Transform and opacity only — never animate layout properties.

> **Implementation note (deviation):** the table above lists `--ease-out` as
> `cubic-bezier(.22,.7,.2,1)`, but `Portfolio.dc.html` itself uses
> `cubic-bezier(.23,1,.32,1)` in all 114 of its transitions. The rendered design wins, so
> the build uses the stronger curve.

## 2. Component boundaries

```
app/
  layout.tsx                 root html, fonts, metadata defaults, skip-link
  page.tsx                   home: composes the sections below
  work/[slug]/page.tsx       case-study route
  api/contact/route.ts       form handler
components/
  Nav.tsx                    sticky header, scroll-spy, MotionHighlight, mobile drawer
  Hero.tsx                   heading, TypingText, CTAs, SocialLinks, VerifyLogCard
  VerifyLogCard.tsx          the terminal-style pipeline log
  About.tsx                  summary + StatGrid + ToolChips + CertList
  StatGrid.tsx               CountingNumber stats
  SkillsCloud.tsx            renders SkillCategory[] — chip lists, one icon-tile group
  ProjectGrid.tsx            grid wrapper, maps work[] -> ProjectCard
  ProjectCard.tsx            image, title, status tag, blurb, outcome, tags, links
  CaseStudyPreview.tsx       compact ProjectCard variant for "more work" rails
  PipelineSteps.tsx          the five-step verification pipeline
  WritingLinks.tsx           Medium / DOI / LinkedIn cards
  ExperienceTimeline.tsx     ol with the accent node rail
  ContactCTA.tsx             email, CopyButton, ContactForm, response-time copy
  ContactForm.tsx            client component: validation + success state
  Footer.tsx
lib/data/
  profile.ts  skills.ts  work.ts  experience.ts  links.ts
```

Only `Nav`, `Hero`, `ContactForm`, and the Animate UI text components need
`"use client"`. Everything else renders on the server.

## 3. Placeholder data arrays

Keep every editable fact in `lib/data/` so customizing means editing one folder.

```ts
// profile.ts
export const profile = {
  name: "Joshua Klyne P. Pudadera",
  handle: "Shua.dev",
  roles: ["Published Researcher", "Technical Writer", "Backend AI Intern",
          "Records & Compliance Specialist"],   // TypingText sequence
  location: "Banga, South Cotabato, Philippines",
  email: "klynejoshua13@gmail.com",
  phone: "0939 705 8119",
  resumeUrl: "/CV_research.pdf",
  stats: [
    { value: 4,    suffix: "+", label: "Years of audit-ready records" },
    { value: 2918, group: true, label: "Rows reconciled, dengue dataset" },
    { value: 3,    label: "Vocational programmes covered" },
    { value: 1,    label: "Peer-reviewed paper, first author" },
  ],
};

// skills.ts
export type SkillCategory = {
  index: string;          // "01"
  label: string;
  items: string[];        // chip labels
  tiles?: { name: string; short: string }[];  // monogram tiles (AI tools only)
};

// work.ts
export type Work = {
  slug: string;
  title: string;
  status: "Published" | "Process" | "Tooling" | "Ongoing";
  blurb: string;
  outcome: string;        // one line, accent mono
  tags: string[];
  links: { label: string; href: string }[];
  image: { src: string; alt: string; width: number; height: number };
  caseStudy?: CaseStudy;  // presence enables /work/[slug]
};

// experience.ts — { org, role, start, end, summary, tags }
// links.ts     — { github, linkedin, medium, doi }
```

## 4. Case-study routing

```ts
// app/work/[slug]/page.tsx
export function generateStaticParams() {
  return work.filter(w => w.caseStudy).map(w => ({ slug: w.slug }));
}
export const dynamicParams = false;
```

`CaseStudy` mirrors the page's sections so the second case study cannot drift from the
first: `metrics: Metric[]`, `problem: { body: string[], audience: string }`,
`constraints: { kind: "constraint" | "tradeoff", title, body }[]`,
`dataFlow: { body, rows: string[][], diagram: Image }`, `figures: Figure[]`,
`results: Row[]`, `lessons: string[]`. Render in fixed order from that object.

Set `scroll-margin-top` to the sticky nav height (90px here) on every anchored section.

## 5. Image optimization

- `next/image` with explicit `width`/`height` from the data array — no layout shift.
- Work cards 16:9 (1600×900 source), case-study figures 4:3, data-flow diagram 16:10.
- Case-study hero gets `priority`; everything else stays lazy.
- `images: { formats: ["image/avif", "image/webp"] }`.
- Real `alt` on every figure. Research figures need descriptive alt text, not "chart".
- On Astro use `<Image />` from `astro:assets` and import files so hashes stay stable.

## 6. Metadata and SEO

```ts
export const metadata: Metadata = {
  title: { default: "Shua.dev — Research, Verification & Technical Writing",
           template: "%s — Shua.dev" },
  description: "Published first-author researcher and AI-assisted technical writer. " +
               "Claims verified against primary sources before they ship.",
  keywords: ["developer portfolio", "technical writer portfolio",
             "AI research portfolio", "claude code portfolio", "fact-checking"],
  openGraph: { type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://shua.dev" },
};
```

- `generateMetadata` per case study from the work entry.
- JSON-LD: `Person` in the layout, `ScholarlyArticle` on the dengue case study with the
  real DOI (`10.51583/IJLTEMAS.2026.150600192`) — it is a citable publication, so mark it up.
- `app/sitemap.ts` and `app/robots.ts` generated from `work[]`.
- OG images via `next/og` from title + outcome line.

## 7. Responsive breakpoints

Mobile-first. Three are enough:

| Token | Width | What changes |
|---|---|---|
| base | < 700px | one column everywhere, drawer nav, 24px gutters |
| `md` | ≥ 700px | work / skill / writing grids go two-up |
| `lg` | ≥ 900px | nav links replace the hamburger, hero splits two-up |

The grids use `repeat(auto-fit, minmax(300px, 1fr))`, which handles most of it without
media queries. Reach for breakpoints only for the nav swap and the hero split.

## 8. Accessibility and keyboard

- One `<h1>` per page; sections are `<section>` with a heading; timelines are `<ol>`.
- Skip link to `#main` as the first focusable element.
- Drawer: `aria-expanded` on the toggle, focus trapped while open, `Escape` closes,
  focus returns to the toggle.
- Scroll-spy sets `aria-current="page"`; the MotionHighlight follows that, so state is
  never carried by color alone.
- Keep Nocturne's `:focus-visible` ring (2px accent, 2px offset). Never remove it.
- The typed roles line is `aria-hidden`; the full role list sits in visually-hidden text
  beside it.
- Form: `aria-invalid` + `aria-describedby` per field, `aria-live="polite"` on success.

## 9. Contact form

- Client component posting to `app/api/contact/route.ts`; same zod schema both sides.
- States: idle, invalid (per-field), submitting (disabled), sent, failed.
- Honeypot field plus a timestamp check. No CAPTCHA.
- Resend or Postmark; key in an env var, never client-side.

## 10. Deployment

- Vercel, `main` auto-deploying, preview deploys on PRs.
- `output: "export"` works if you drop the API route and use a form service.
- Env: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
- CI: typecheck, lint, `next build`, Lighthouse CI — LCP < 2.0s, CLS < 0.05, no a11y
  regressions.

## 11. Design notes

- Design system: Nocturne (dark `#161826` ground, `#9184d9` accent, Inter). Every color,
  space, radius and shadow comes from its CSS variables.
- "Shua.dev" in the hero is Caveat 600 at 1.3em inside an Inter heading. That is the only
  place the script face appears.
- Brand mark: a rounded accent tile holding a chevron-and-underscore prompt glyph.
- Terminal motifs are typographic only — mono `$ command` kickers above section headings,
  `//` and `#` comment lines for asides, mono for numbers and metadata, and the one
  `verify.log` card in the hero. No fake shells beyond it.
- Cards lift 4–5px on hover with one shadow step. Nothing else moves.
- Accent never floods a large area; it lives in lines, marks and single glyphs.

## 12. Content still needed from Shua

- Real screenshots and figures for the four work cards and the case-study slots
  (study-area map, monthly case series, predicted-vs-actual).
- Individual Medium article titles and URLs — the Writing section currently links the
  profile and describes the pipeline rather than naming pieces.
- A public repo URL for the dengue dataset, if one exists.
