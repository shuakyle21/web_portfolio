# Shua.dev — portfolio 

<a href="https://websitelaunches.com/site/shua-kyle.me" target="_blank" rel="noopener">
  <img
    src="https://websitelaunches.com/badge/shua-kyle.me.svg"
    alt="Established online - Public launch record"
    width="255"
    height="55"
  >
</a>

**Live at [shua-kyle.me](https://shua-kyle.me)**

The personal site of **Joshua Klyne P. Pudadera** — data specialist, backend AI
intern, and published first-author researcher, working out of Banga, South
Cotabato, Philippines.

This repository is the site itself. It exists to do one thing well: show the
work in enough detail that someone can check it. Every project card names a
concrete outcome rather than a technology list, the research is linked to the
published paper, and the one piece of work that deserves the full story — the
dengue forecasting dataset — gets a long-form case study of its own instead of a
paragraph.

## What's in the site

**The published research.** A peer-reviewed paper, first author of four:

> **Improving Prediction of Dengue Outbreaks Using Attention-based LSTM Model
> with Honey Badger Optimization for Hyperparameter Tuning**  
> Pudadera, Sombero, Dollaga, Sueno · *IJLTEMAS* Vol. XV, Issue VI (2026),
> pp. 2621–2632 · DOI [10.51583/IJLTEMAS.2026.150600192](https://doi.org/10.51583/IJLTEMAS.2026.150600192)
>
> Combines an attention-based LSTM with the Honey Badger Algorithm for
> hyperparameter tuning, trained on disease, climate and geographic data for
> Koronadal, South Cotabato spanning 2015–2024. The tuned model cuts Mean
> Squared Error by 43.7% against a standard LSTM while reducing overfitting.
>
> 📄 [Read the paper on IJLTEMAS](https://www.ijltemas.in/submission/online/article/view/5359)

**The case study behind it.** `/work/dengue-forecasting` walks through how the
dataset was actually built: 2,918 rows × 19 columns reconciled from three
incompatible source types — DOH-CHD case records, Google Earth Engine rasters
and NAMRIA shapefiles — including the decisions that shaped it (monthly rather
than weekly resolution, completeness checked before modelling) and the results
that didn't land, like the remaining underprediction of extreme spikes.

**The other work**, each with the outcome stated up front:

| Project | What it produced |
| --- | --- |
| EGACE status dashboard | One place to see where a training batch stands, instead of five separate counts |
| TESDA scholarship records | Three vocational programmes kept audit-ready, four years running |
| Agentic CI/CD workflow | Triggers, least privilege, secrets and a human review gate |
| `linear-git-skills` | Read-only against Linear, so a two-way sync can't produce duplicate issues |
| AI research & verification pipeline | Ran on every article, keeping each claim traceable |
| `medium-draft` Claude skill | Removed the reformatting step entirely |
| Transaction tracking mobile app | UI/UX through to cloud integration, built during an internship |

Alongside these: a background section, a skills cloud, an experience timeline, a
contact form and a small "rate this portfolio" widget.

## How it's built

A **Next.js 16** App Router site — React 19, TypeScript, Tailwind v4 — deployed
on Vercel. The case-study route is fully static; two small API routes handle the
contact form and the rating widget, each validating with a zod schema shared
verbatim with the client.

Everything editable lives in `lib/data/` (`profile.ts`, `work.ts`, `skills.ts`,
`experience.ts`, `links.ts`), so updating the site means editing facts, not
markup. The visual design is the Nocturne system, implemented from the Claude
Design project kept in [`design-reference/`](design-reference/) — build notes in
[`IMPLEMENTATION.md`](design-reference/IMPLEMENTATION.md).

Motion is deliberate: scroll-triggered effects fire once, and everything sits
behind `prefers-reduced-motion` — marquees become plain scrollers, counters and
reveals render their final state.
