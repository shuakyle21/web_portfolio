# Shua.dev Design System

Design sync source: `design-reference/Portfolio.dc.html`, `design-reference/Case Study.dc.html`, and `design-reference/IMPLEMENTATION.md`.

Reading this as: a developer and researcher portfolio for recruiters, collaborators, and technical reviewers, with a dark verification-led portfolio language, leaning toward the Nocturne design system ported into Next.js.

## Design Intent

Shua.dev should feel like a careful technical workspace, not a generic personal landing page. The visual language is quiet, dark, precise, and evidence-oriented. It should make Joshua Klyne P. Pudadera read as a published researcher, technical writer, backend AI intern, and records/compliance specialist who checks claims before shipping them.

The site should favor proof over performance. Terminal motifs, mono metadata, verification logs, citations, and structured case studies are the brand texture. They should support the content, not become fake developer decoration.

## Source Of Truth

The canonical design reference lives in `design-reference/`.

- `Portfolio.dc.html`: visual source of truth for the home page.
- `Case Study.dc.html`: visual source of truth for work-detail pages.
- `IMPLEMENTATION.md`: implementation handoff for routes, components, motion, accessibility, and data structure.
- `_ds/nocturne-.../styles.css`: original Nocturne tokens and component classes.
- `app/globals.css`: live Next.js port of the Nocturne system.

When these disagree, prefer the rendered reference first, then the implementation notes, then this document. If the live app has intentionally diverged and the result is better, update this file so future changes do not drift.

## Design Dials

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`

The site should be composed and slightly asymmetric, with enough motion to feel alive but not theatrical. It is a portfolio for technical trust, so avoid agency chaos, oversized decorative gestures, and dense dashboard patterns.

## Color System

Use one locked dark theme. Do not introduce light sections, cream panels, or mid-page theme inversions.

Core tokens:

```css
--color-bg: #161826;
--color-surface: #232532;
--color-text: #e9e9ed;
--color-accent: #9184d9;
--color-accent-2: #a7a1db;
--color-divider: color-mix(in srgb, #e9e9ed 16%, transparent);
```

Accent behavior:

- The accent is blurple, not generic AI purple. Use it for focus rings, links, key mono marks, active nav state, status emphasis, and small borders.
- Never flood large page areas with the accent.
- Do not add neon outer glows. Prefer hairlines, subtle inner tints, and small glyphs.
- Use the neutral and accent ramps from `app/globals.css` for all derived values.

Background behavior:

- The page ground is `--color-bg`.
- Cards and form controls use `--color-surface`.
- Supporting fills should use transparent `color-mix()` overlays rather than new hex colors.
- The existing fixed glow and dot furniture may stay subtle. It should never compete with content.

## Typography

Live stack:

- Heading: `Space Grotesk`, with Inter fallback.
- Body: `Inter`.
- Mono: `JetBrains Mono`.
- Signature script: `Caveat`.

Rules:

- Use `next/font` only. Do not add external font links.
- Headings are compact, slightly tight, and not oversized for their own sake.
- Body copy is measured and readable. Prefer `max-width` around `54ch` to `65ch`.
- Mono is for commands, metadata, numbers, source labels, and proof-oriented fragments.
- Caveat appears only in the hero signature treatment for `Shua.dev`. Do not use the script face elsewhere.
- Avoid random mixed-font emphasis. The brand already has enough typographic texture.

## Layout Principles

The page is a constrained dark workspace:

- Main content max width: `1120px`.
- Page gutters: `24px` on desktop, tighter only where mobile needs it.
- Section spacing: generous but not gallery-like. `96px` to `120px` between major sections is the normal range.
- Multi-column layouts collapse to one column below tablet width.
- Use CSS Grid for responsive sections. Avoid flex percentage math.
- Use `min-height: 100dvh` where a viewport-height layout is needed. Do not use `h-screen`.

Hero:

- Use an asymmetric split: content first, portrait card second.
- The hero image is a real portrait, not a fake product mockup.
- The first read should be name, role rotation, intro, and primary actions.
- The portrait card is part of the identity system. Preserve its framed, file-viewer feel.
- Keep CTAs short: `View Work`, `Download Resume`, `Contact`.

Section rhythm:

- Do not make every section a card grid.
- Alternate layout families: split intro, stat grid, chip cloud, marquee, project cards, writing rail, timeline, contact form.
- Avoid decorative section numbers.
- Terminal-style kickers are allowed, but ration them. They should look like useful context, not repeated labels.

## Components

### Navigation

- Sticky, compact, and one line on desktop.
- Background: dark transparent mix with blur.
- Active link state uses the sliding underline/highlight.
- Mobile uses a drawer with Escape close, focus trap, and focus return.
- Keep nav height below 80px.

### Buttons

- Base class: `.btn`.
- Radius: `--radius-md`.
- Primary buttons are outlined accent buttons, not filled neon CTAs.
- Secondary buttons use divider borders.
- Hover lift is small and gated to fine pointers.
- Active state uses a small scale press.
- Button labels must remain one line.

### Cards

- Cards exist for bounded items: projects, stats, certifications, writing links, contact surfaces.
- Use `--color-surface`, `--radius-md`, and the Nocturne shadow tokens.
- Hover lift is 4px to 5px maximum.
- Do not nest cards inside cards.
- Prefer hairline separation or spacing when a box is not needed.

### Tags

- Tags use neutral or accent variants from `app/globals.css`.
- Tags are metadata, not decoration.
- Avoid long tag text and avoid wrapping inside individual tags.

### Forms

- Labels sit above inputs.
- Placeholders never replace labels.
- Inputs use dark surface, divider border, accent focus ring, and readable text.
- Contact form states must include idle, invalid, submitting, sent, and failed.
- Honeypot and timestamp checks belong in the form flow.

### Images

- Use real assets through `next/image`.
- Always define width and height.
- Preserve aspect ratios: work cards 16:9, case-study figures 4:3, data-flow diagrams 16:10.
- Case-study hero images get priority. Other images stay lazy.
- Research figures need descriptive alt text.

## Motion

Motion should communicate feedback, hierarchy, or verification flow.

Approved motion:

- Hero role typing with a blinking caret.
- Count-up stats when in view.
- Word-level heading reveal on section entry.
- Accent sweep behind a short phrase.
- Sliding nav active indicator.
- Copy email button success state.
- Card and button hover lift.
- One stack marquee for breadth.

Rules:

- One animated element per viewport region is enough.
- Scroll-triggered effects fire once.
- Animate transform and opacity only.
- Use `prefers-reduced-motion` fallbacks.
- Do not add scroll hijacks, parallax, or GSAP unless a specific page section truly needs it.
- Do not use React state for continuous pointer or scroll values.

Easing tokens:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-std: cubic-bezier(0.4, 0, 0.2, 1);
--ease-nav: cubic-bezier(0.32, 0.72, 0, 1);
```

Durations:

- Links: `160ms`.
- Buttons: `180ms`.
- Cards: `220ms`.
- Nav indicator: `260ms`.
- Heading reveal: about `620ms`.

## Content Voice

The copy should sound direct, technical, and evidence-aware.

Use:

- Concrete claims.
- Specific outcomes.
- Source-aware language.
- Short labels.
- Resume facts from `lib/data/`.

Avoid:

- Generic portfolio filler.
- Inflated startup verbs.
- Fake precision.
- Cute meta copy.
- Decorative version strings.
- Weather, locale, or status strips that do not convey real state.

The site can use command-line phrasing when it reinforces the verification theme, for example `$ whoami`, `$ cat about.md`, `/tools-used`, `verify.log`, or similar short labels. Do not turn every heading into a command.

## Data And Content Architecture

Editable facts belong in `lib/data/`:

- `profile.ts`: identity, roles, contact, intro, stats, education, certifications.
- `skills.ts`: grouped capabilities and tool chips.
- `work.ts`: project cards, visual definitions, links, and case-study data.
- `experience.ts`: timeline entries.
- `links.ts`: external profile URLs and publication links.

Components should map these arrays rather than hard-code facts. This keeps the portfolio maintainable and makes future resume updates safer.

## Accessibility

Required baseline:

- One `h1` per page.
- Sections use semantic `<section>` elements with headings.
- Skip link points to `#main`.
- Focus rings are visible and use the accent token.
- Nav scroll-spy state sets `aria-current="page"`.
- Typed role animation is not the only accessible source of role text.
- Drawer supports keyboard use.
- Forms use `aria-invalid`, `aria-describedby`, and live status messaging.
- Text and form contrast must pass WCAG AA.

Never remove accessibility behavior to simplify animation or visual styling.

## SEO And Metadata

Preserve:

- Person JSON-LD in `app/layout.tsx`.
- Scholarly article structured data on research case studies where applicable.
- `app/sitemap.ts`.
- `app/robots.ts`.
- `app/opengraph-image.tsx`.
- Canonical URL through `siteUrl`.

Do not change route slugs, anchor IDs, or nav labels unless the content architecture changes intentionally.

## Implementation Constraints

- Framework: Next.js App Router with TypeScript.
- Styling: Tailwind v4 plus project CSS variables in `app/globals.css`.
- Server Components by default.
- Client Components only for navigation, hero interactivity, forms, copy state, rating, and motion leaves.
- Before changing Next.js conventions, read the local Next docs under `node_modules/next/dist/docs/` as required by `AGENTS.md`.
- Check `package.json` before importing any new third-party library.

## Anti-Patterns

Do not introduce:

- AI-purple gradient hero backgrounds.
- Three identical feature cards as a default section.
- Fake dashboard or terminal screenshots built from divs unless they are an actual component preview with real content.
- Large accent color blocks.
- Pure black or pure white.
- Rounded pill systems mixed with square cards without a rule.
- Nested cards.
- Scroll cues.
- Decorative status dots.
- Section-number eyebrows.
- Long body copy inside cards.
- CTA labels with duplicate intent.
- Inconsistent icon styles.

## Pre-Flight Checklist

Before shipping a visual change:

- Does it still look like Nocturne?
- Are all new colors from existing tokens or documented extensions?
- Is the accent still restrained?
- Is the page still one dark theme?
- Do buttons, links, forms, and focus states pass contrast checks?
- Does the hero fit the initial viewport on mobile and desktop?
- Does every multi-column section have an explicit mobile collapse?
- Are images real, sized, optimized, and described with useful alt text?
- Are animations reduced-motion aware?
- Are CTAs short and non-wrapping?
- Is content pulled from `lib/data/` where it is an editable fact?
- Did the change preserve existing SEO metadata, route slugs, and anchor IDs?

## Open Content Needs

Still-needed assets and content are tracked from the implementation handoff:

- Real screenshots and figures for work cards and case-study slots.
- Study-area map, monthly case series, and predicted-vs-actual figures for the research case study.
- Individual writing titles and URLs.
- Public dataset repository URL, if one exists.

