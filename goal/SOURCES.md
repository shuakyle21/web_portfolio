# Sources for `goal/index.html`

Each claim on the page is listed with the place it came from. Anything without a source was cut.

Source keys:
- **CV**: `public/CV_research.pdf`
- **work**: `lib/data/work.ts`
- **exp**: `lib/data/experience.ts`
- **profile**: `lib/data/profile.ts`
- **paper**: the IJLTEMAS article page (abstract), https://www.ijltemas.in/submission/online/article/view/5359, fetched 2026-09-26
- **lgs**: README of github.com/shuakyle21/linear-git-skills
- **aw**: github.com/shuakyle21/skills-agentic-workflows-that-read-the-room (file tree, `.github/workflows/update-github-info.md`, commit log)

## Header
| Claim | Source |
| --- | --- |
| Backend AI Engineering Intern (project-based), FlyRank, 2026 – | CV ("July 2026 – Present"); exp says "Jun 2026" and "FlyRank AI". **Conflict.** The page only says "2026". |
| Records, compliance, billing for a TESDA-registered centre since 2021 | CV, exp (Nov 2021 – present) |
| BS CS, Notre Dame of Marbel University, 2025 | CV, profile |
| Banga, South Cotabato | CV, profile |

## Dengue forecasting
| Claim | Source |
| --- | --- |
| Dec 2024 – May 2025, first author of four | CV, work |
| Barangays in Koronadal City, South Cotabato | paper abstract ("Different Barangays in Koronadal, South Cotabato") |
| 2,918 rows × 19 columns, monthly, 2015–2024, data dictionary | CV, work (results) |
| DOH-CHD SOCCSKSARGEN case records, climate data (DOST PAG-ASA, Earth Engine rasters), NAMRIA shapefiles | CV, work (dataFlow, results) |
| Joined on location and month | work says "municipality × month". The paper says barangays, so the page uses the neutral "location". |
| Role: sourcing, reconciliation, checks, first-author write-up | work (results → "My role") |
| Attention-based LSTM tuned by the Honey Badger Algorithm | paper title and abstract |
| Monthly, not weekly, and why | work (constraints) |
| Completeness checked before pre-modelling, because cleaning methods assume things about the gaps | CV, work (constraints, lessons) |
| MSE 43.7% lower than standard LSTM, 22.2% lower than attention models | paper abstract |
| Underpredicts extreme spikes, reported in the paper | CV, work |
| Figure: Zone III (Poblacion), HBO RMSE lowest in all four windows | `public/cs-hero.webp`: 3.75 / 2.33 / 2.79 / 3.74 vs higher LSTM and AE values |
| IJLTEMAS Vol. XV Issue VI, pp. 2621–2632, DOI | paper, README |

## linear-git-skills
| Claim | Source |
| --- | --- |
| Two Claude Code skills, branch-to-PR loop, Linear + GitHub integration, MIT | lgs |
| Linear links by matching its own generated branch name; a wrong name fails silently | lgs |
| What each skill does | lgs table |
| `gitBranchName`, read-only against Linear, update the existing PR | lgs "Design notes" |
| Dirty-tree refusal, `stash pop --index`, never pipe a gate, `[OK]/[WARN]/[ERROR]` | lgs "Design notes" |
| `ISSUE_PREFIX`, `BASE_BRANCH`, `/create-feature-branch ENG-59`, `/create-pr` | lgs "Install" / "Configure" |
| `npm run build \| tail -5` reports tail's status | lgs. The redirect-and-`$?` line illustrates the README's "redirect to a file and check `$?`". |
| Linear MCP optional | lgs "Requirements" |

## Agentic workflow
| Claim | Source |
| --- | --- |
| GitHub Skills exercise | work, repo name `skills-…` |
| Markdown source compiled to `update-github-info.lock.yml` | aw tree (both files present); work. Both commits to the file are by shuakyle21. The page does not claim sole authorship, because the exercise ships a Copilot workflow-designer agent. |
| Reads notes, GitHub Blog, Changelog; edits `site/content/github-info.md` | aw workflow body |
| Frontmatter panel | aw `update-github-info.md`, copied exactly |
| `noop` when there is nothing useful | aw workflow body |
| Credential in repository secrets | work ("keeps its credentials in repository secrets"). The repo includes the add-token-secret instructions image. |
| Ran, opened a `[mona]` draft PR, merged | aw commits: "[mona] docs: update Mona GitHub Info" by github-actions[bot], then "Merge pull request #5" by the repo owner |
| Small Astro site | aw `site/astro.config.mjs` |

## EGACE dashboard
| Claim | Source |
| --- | --- |
| Five stages, recurring Excel report, lookups against trainee records, not hand-tallied | work, exp |
| Staff see batch status without opening records | exp |
| Rates, funnel chart, employment breakdown | `public/egace-dashboard.png` |
| "One view instead of five separate counts" | work (outcome) |
| Caption: programme and scholarship names | read from the screenshot |

## Other work
| Claim | Source |
| --- | --- |
| T2MIS, compliance docs, three programmes, lifecycle coordination, billing vs purchase orders reconciled against delivered records, SOPs and audit checklists | CV, exp |
| Pipeline steps, Firecrawl, claim verification, 1,200–2,500 words, Medium and LinkedIn, Jan–Jun 2026 | CV, exp |
| medium-draft writes drafts into Google Docs, removing the manual reformatting step | CV |
| Flutter/Dart, Android Studio, Azure, existing web system, UI/UX, Jun–Jul 2024, LEADSolutions | CV, exp, work |
| "so entries didn't have to be typed twice" | work ("without manual re-entry") |

## Footer
| Claim | Source |
| --- | --- |
| FlyRank specs, documentation, line-by-line review caught a logic error | CV, exp |
| Tools list | profile (`skills.ts`), work tags |

## Removed from the current site copy (kept out of the asset)
- "seamless data exchange", "intuitive" (exp, LEADSolutions bullets)
- "Removed the reformatting step entirely" (work). The CV says "removing the manual reformatting step".
- "1 Peer-reviewed paper, author out of four authors" (profile stats). The correct wording is "first author of four".
- The stat tiles and the "SOCCSKSARGEN" study-area framing (see conflicts below)

## Conflicts to fix in the live site
1. **Study area.** `work.ts` and the case study say "for SOCCSKSARGEN" and "SOCCSKSARGEN municipalities". The published abstract says barangays in Koronadal, South Cotabato. SOCCSKSARGEN is the region of the DOH-CHD office that supplied the records, not the study area.
2. **FlyRank.** `experience.ts` says "Jun 2026" and "FlyRank AI". The CV says "July 2026" and "FlyRank", project-based.
3. **Join key.** The case-study flow says "join on municipality × month". The unit in the paper is the barangay.
4. **EGACE provider.** The screenshot header reads "J3ED Farm" as the provider, but `experience.ts` places the EGACE work at Nenita Farm Rice-Based Farm Training Center. Confirm which is correct, or whether the report covers a partner provider.
