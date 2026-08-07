export type Metric = { value: string; label: string };
export type Figure = {
  slotId: string;
  aspect: string;
  placeholder: string;
  caption: string;
  src?: string;
  alt?: string;
};

export type CaseStudy = {
  command: string;
  intro: string;
  period: string;
  tags: string[];
  citation: string;
  hero: Figure;
  metrics: Metric[];
  problem: { heading: string; body: string[]; audienceKicker: string; audience: string };
  constraints: { kind: "Constraint" | "Tradeoff"; title: string; body: string }[];
  dataFlow: {
    heading: string;
    body: string;
    rows: { label: string; kind?: "highlight" | "arrow" | "return" }[][];
    diagram: Figure;
  };
  figures: Figure[];
  results: [string, string][];
  lessons: string[];
};

export type Work = {
  slug: string;
  title: string;
  status: "Published" | "Process" | "Tooling" | "Ongoing" | "Dashboard" | "DevOps" | "Workflow" | "Internship";
  statusStyle: "accent" | "outline" | "neutral";
  blurb: string;
  outcome: string;
  tags: string[];
  links: { label: string; href: string; kind?: "primary" | "secondary" | "github" }[];
  visual:
    // `fit` defaults to "cover". Use "contain" when the source aspect is far
    // from the card's 16:9 and cropping would cut meaningful content.
    | {
        kind: "image";
        src: string;
        alt: string;
        width: number;
        height: number;
        fit?: "cover" | "contain";
      }
    | { kind: "slot"; slotId: string; placeholder: string }
    | { kind: "yaml" }
    | { kind: "terminal" };
  caseStudy?: CaseStudy;
};

export const work: Work[] = [
  {
    slug: "egace-dashboard",
    title: "EGACE status dashboard",
    status: "Dashboard",
    statusStyle: "accent",
    blurb:
      "A recurring Excel dashboard tracking every scholarship trainee through the five EGACE stages — Enrolled, Graduated, Assessed, Certified, Employed — built on lookups against the trainee records so the counts update from one source rather than being tallied by hand.",
    outcome: "One place to see where a batch stands, instead of five separate counts.",
    tags: ["Excel", "Lookups", "Charting", "Status reporting"],
    links: [],
    visual: {
      kind: "image",
      src: "/egace-dashboard.png",
      alt: "EGACE report dashboard: 15 trainees enrolled, 14 graduates (93.3% completion), 12 assessed, 12 certified (100% pass rate), and an 86.7% employment rate, with a training funnel bar chart and an employment status pie chart",
      width: 2130,
      height: 812,
      // 2.62:1 source in a 16:9 slot — cover would crop ~16% off each side,
      // cutting the Enrollment tile and the pie legend. Letterbox instead.
      fit: "contain",
    },
  },
  {
    slug: "agentic-cicd",
    title: "Agentic CI/CD workflow",
    status: "DevOps",
    statusStyle: "accent",
    blurb:
      "A GitHub Skills challenge completed end to end: an agentic GitHub Actions workflow authored in markdown and compiled to a .lock.yml pipeline. Runs on a daily schedule or on demand with read-only permissions, fetches sources over an explicit network allowlist, keeps its credentials in repository secrets, and returns its change as a draft pull request instead of pushing to main.",
    outcome: "Triggers, least privilege, secrets and a human review gate.",
    tags: ["GitHub Actions", "CI/CD", "YAML", "Secrets management"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/skills-agentic-workflows-that-read-the-room",
        kind: "github",
      },
    ],
    visual: { kind: "yaml" },
  },
  {
    slug: "linear-git-skills",
    title: "linear-git-skills",
    status: "Workflow",
    statusStyle: "accent",
    blurb:
      "Two custom Claude Code skills that automate the branch-to-PR loop for teams using Linear with the GitHub integration. Linear links a branch to an issue only by matching the branch name it would have generated itself, so create-feature-branch reproduces that format exactly rather than re-implementing the slug, and create-pr runs the project's checks, summarizes the real diff, and updates an open PR instead of failing on one.",
    outcome: "Read-only against Linear, so a two-way sync can't produce duplicate issues.",
    tags: ["Claude Code skills", "Linear MCP", "GitHub CLI", "Git workflow"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/linear-git-skills",
        kind: "github",
      },
    ],
    visual: { kind: "terminal" },
  },
  {
    slug: "dengue-forecasting",
    title: "Dengue Outbreak Forecasting Dataset & Model",
    status: "Published",
    statusStyle: "accent",
    blurb:
      "A monthly 2015–2024 dataset for SOCCSKSARGEN, reconciled from DOH-CHD case records, Google Earth Engine rasters and NAMRIA shapefiles, and the forecasting model built on it.",
    outcome: "2,918 rows × 19 columns from three incompatible source types. First author of four.",
    tags: ["Dataset assembly", "Earth Engine", "Shapefiles", "Forecasting"],
    links: [
      { label: "Read case study", href: "/work/dengue-forecasting", kind: "primary" },
      {
        label: "DOI",
        href: "https://doi.org/10.51583/IJLTEMAS.2026.150600192",
        kind: "secondary",
      },
    ],
    visual: {
      kind: "image",
      src: "/cs-hero.webp",
      alt: "Dengue forecasting case study hero figure",
      width: 1200,
      height: 675,
    },
    caseStudy: {
      command: "$ cat research/dengue-forecasting/case-study.md",
      intro:
        "A monthly 2015–2024 dataset for SOCCSKSARGEN, assembled and reconciled from three incompatible source types, and the forecasting model built on it. First author of four. Published in IJLTEMAS.",
      period: "Dec 2024 – May 2025",
      tags: [
        "Published research",
        "Dataset assembly",
        "Google Earth Engine",
        "NAMRIA shapefiles",
        "Forecasting",
      ],
      citation: "IJLTEMAS Vol. XV Issue VI · DOI: 10.51583/IJLTEMAS.2026.150600192",
      hero: {
        slotId: "cs-hero",
        aspect: "16/9",
        placeholder: "Hero figure — case curve, or the study area map",
        caption: "",
        src: "/cs-hero.webp",
        alt: "Monthly dengue case curve for SOCCSKSARGEN, 2015–2024, from the reconciled dataset",
      },
      metrics: [
        { value: "2,918", label: "Rows, monthly resolution" },
        { value: "19", label: "Columns, documented" },
        { value: "10 yrs", label: "2015 through 2024" },
        { value: "3", label: "Incompatible source types" },
      ],
      problem: {
        heading: "The data existed. It just wasn’t one dataset.",
        body: [
          "Forecasting dengue outbreaks in SOCCSKSARGEN needs case counts, climate, and geography in the same table. Those three things live in three different institutions, in three formats that do not agree on units, resolution, or place names: DOH-CHD SOCCSKSARGEN surveillance records, Google Earth Engine rasters, and NAMRIA shapefiles.",
          "Before any modelling could start, someone had to sit with all three and reconcile them — and then be able to say, for every value in the result, where it came from.",
        ],
        audienceKicker: "Who it was for",
        audience:
          "Regional health planning: the people who decide where vector control goes and when. A forecast is only useful to them if the inputs are auditable and the failure modes are stated.",
      },
      constraints: [
        {
          kind: "Constraint",
          title: "Three institutions, three formats",
          body: "Tabular case records, raster climate data, and vector boundaries had to be reconciled before they could sit in one row together.",
        },
        {
          kind: "Tradeoff",
          title: "Monthly resolution, not weekly",
          body: "Monthly is the resolution every source could support consistently across ten years. Weekly would have meant gaps, and gaps get filled with assumptions.",
        },
        {
          kind: "Constraint",
          title: "Completeness checked first",
          body: "Completeness and consistency were verified before any pre-modelling method ran. Cleaning a dataset you have not audited hides the problem instead of fixing it.",
        },
        {
          kind: "Tradeoff",
          title: "Report the misses, not only the wins",
          body: "The model still underpredicts extreme spikes. That is in the paper, next to the results, because a planner needs to know where the forecast is weakest.",
        },
      ],
      dataFlow: {
        heading: "From three sources to one table",
        body: "Surveillance records came from the regional health office, climate variables from DOST PAG-ASA and Earth Engine, boundaries from NAMRIA. Each stream was checked on its own, then joined on municipality and month, then checked again as a whole before modelling.",
        rows: [
          [
            { label: "DOH-CHD case records" },
            { label: "Earth Engine rasters" },
            { label: "NAMRIA shapefiles" },
          ],
          [
            { label: "↳", kind: "return" },
            { label: "completeness & consistency check", kind: "highlight" },
            { label: "→", kind: "arrow" },
            { label: "join on municipality × month" },
          ],
          [
            { label: "↳", kind: "return" },
            { label: "2,918 × 19 dataset + data dictionary" },
            { label: "→", kind: "arrow" },
            { label: "pre-modelling" },
            { label: "→", kind: "arrow" },
            { label: "forecast + error report" },
          ],
        ],
        diagram: {
          slotId: "cs-arch",
          aspect: "16/10",
          placeholder: "Drop the data-flow diagram from the paper",
          caption:
            "The full pipeline as published, including the reconciliation steps between source types.",
        },
      },
      figures: [
        {
          slotId: "cs-fig-1",
          aspect: "4/3",
          placeholder: "Study area map",
          caption: "Study area — SOCCSKSARGEN municipalities, from the NAMRIA boundaries.",
        },
        {
          slotId: "cs-fig-2",
          aspect: "4/3",
          placeholder: "Monthly case series, 2015–2024",
          caption: "Ten years of monthly case counts, after reconciliation.",
        },
        {
          slotId: "cs-fig-3",
          aspect: "4/3",
          placeholder: "Predicted vs actual, with the spike underprediction visible",
          caption: "Predicted against actual — the extreme spikes are where it underpredicts.",
        },
      ],
      results: [
        ["Dataset", "2,918 rows × 19 columns, monthly, 2015–2024, with a data dictionary"],
        ["Sources reconciled", "DOH-CHD SOCCSKSARGEN, DOST PAG-ASA, Google Earth Engine, NAMRIA"],
        ["Publication", "IJLTEMAS Vol. XV Issue VI — first author of four"],
        [
          "Stated limitation",
          "Remaining underprediction of extreme spikes, reported alongside results",
        ],
        [
          "My role",
          "Sourcing, reconciliation, completeness and consistency checks, first-author write-up",
        ],
      ],
      lessons: [
        "Most of the work was reconciliation, not modelling. The dataset was the contribution; the model was what proved it was usable.",
        "Check completeness before you clean. Every pre-modelling method assumes something about the gaps, so you need to know what the gaps are first.",
        "Write the data dictionary as you go. Reconstructing what a column meant six months later is worse than documenting it the day you made it.",
        "Reporting the underprediction made the paper more useful, not weaker. A stated failure mode is something a planner can work around.",
      ],
    },
  },
  {
    slug: "ai-verification-pipeline",
    title: "AI research & verification pipeline",
    status: "Process",
    statusStyle: "outline",
    blurb:
      "A repeatable pipeline built in Claude: topic and niche validation, source gathering, automated scraping with Firecrawl, claim verification against official documentation and peer-reviewed sources, then an editorial pass for voice and consistency.",
    outcome: "Ran on every article, so the process stayed auditable and each claim traceable.",
    tags: ["Claude", "Firecrawl", "Prompt engineering"],
    links: [],
    visual: {
      kind: "slot",
      slotId: "work-pipeline",
      placeholder: "Screenshot of the research pipeline in Claude",
    },
  },
  {
    slug: "medium-draft-skill",
    title: "medium-draft, a custom Claude skill",
    status: "Tooling",
    statusStyle: "outline",
    blurb:
      "A Claude skill that outputs publication-ready drafts directly into Google Docs, so research and publishing meet without a manual reformatting step in between.",
    outcome: "Removed the reformatting step entirely.",
    tags: ["Claude skills", "Google Docs", "Workflow design"],
    links: [],
    visual: {
      kind: "slot",
      slotId: "work-skill",
      placeholder: "Skill output landing in Google Docs",
    },
  },
  {
    slug: "transaction-tracking-app",
    title: "Transaction tracking mobile app",
    status: "Internship",
    statusStyle: "outline",
    blurb:
      "Built at LEADSolutions INC as an on-the-job trainee: a Flutter mobile application for transaction tracking, integrated with the company's existing web system on Azure Cloud so data moved between the two without manual re-entry.",
    outcome: "Designed the UI/UX as well as the build, from navigation through to cloud integration.",
    tags: ["Flutter / Dart", "Android Studio", "Azure Cloud", "UI/UX design"],
    links: [],
    visual: {
      kind: "image",
      src: "/leadsolutions.jpg",
      alt: "The transaction tracking app running on an Android device in front of the Flutter project in Android Studio",
      width: 960,
      height: 540,
    },
  },
  {
    slug: "tesda-records",
    title: "TESDA scholarship records, end to end",
    status: "Ongoing",
    statusStyle: "neutral",
    blurb:
      "Trainee, programme and scholarship records encoded into T2MIS, TESDA’s national training management information system, plus the compliance documentation behind them and the billing reconciled against government purchase orders.",
    outcome: "Three vocational programmes kept audit-ready for four years running.",
    tags: ["T2MIS", "Compliance", "Billing reconciliation"],
    links: [],
    visual: {
      kind: "slot",
      slotId: "work-records",
      placeholder: "Records or compliance documentation (redacted)",
    },
  },
];
