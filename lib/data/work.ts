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
      citation: "IJLTEMAS Vol. XV Issue VI, pp. 2621–2632 · DOI: 10.51583/IJLTEMAS.2026.150600192",
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
    slug: "gmail-sheets-drive-automation",
    title: "Multi-label Gmail → Sheets & Drive automation",
    status: "Workflow",
    statusStyle: "accent",
    blurb:
      "An n8n workflow that polls Gmail every 30 minutes for messages under monitored labels, extracts the metadata, detects attachments, and archives them into a Google Drive hierarchy keyed by label/date/sender while logging one row per email to Google Sheets. Now running on a self-hosted n8n instance, deployed via Docker on a VPS.",
    outcome: "Duplicate-folder prevention and a read-mark step, so re-runs stay idempotent.",
    tags: ["n8n", "Gmail API", "Google Sheets", "Google Drive", "Docker", "Self-hosted"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/-multi-label_gmail_to_google_sheets_-_drive_automation",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/gmail-sheets-drive-automation.png",
      alt: "n8n workflow diagram: Gmail labels polled on a schedule, routed through metadata extraction and attachment detection, into Google Drive archiving and a Google Sheets log",
      width: 3082,
      height: 798,
      // 3.86:1 source in a 16:9 slot — cover would crop most of the node
      // graph off each side. Letterbox instead.
      fit: "contain",
    },
  },
  {
    slug: "telegram-receipt-automation",
    title: "Telegram receipt photo processing automation",
    status: "Workflow",
    statusStyle: "accent",
    blurb:
      "An n8n workflow that takes receipt photos sent through Telegram, runs them through Google Gemini Vision with a receipt-specific prompt to extract merchant, amount and date, archives the original photo to Google Drive by submission date, and logs the extraction with a direct Drive link in Google Sheets. Runs on the same self-hosted n8n instance, deployed via Docker on a VPS.",
    outcome: "A photo in Telegram becomes a logged, linked Sheets row with no manual entry.",
    tags: ["n8n", "Telegram Bot API", "Google Gemini", "Google Sheets", "Docker", "Self-hosted"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/telegram-receipt-photo-processing-automation",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/telegram-receipt-automation.png",
      alt: "n8n workflow diagram: a Telegram receipt photo routed through Google Gemini Vision extraction, into Google Drive archiving and a Google Sheets log with a Drive link",
      width: 1716,
      height: 401,
      // 4.28:1 source in a 16:9 slot — cover would crop most of the node
      // graph off each side. Letterbox instead.
      fit: "contain",
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
  {
    slug: "nenita-pos",
    title: "Nenita Farm Lechon Haus Restaurant Management System",
    status: "Tooling",
    statusStyle: "accent",
    blurb:
      "Order-to-receipt system built for Nenita Farm Lechon Haus and Catering Services — React 19 on Vite, Supabase behind row-level security policies, sales trends charted with Recharts, and receipts, daily reconciliation and payroll reports generated as PDFs in-app. Past the point of sale it carries inventory and menu management, staff scheduling, financial reporting and catering bookings.",
    outcome:
      "Covers the shop floor end to end: orders, bookings, GCash payments, Senior/PWD discounts, payroll and an offline paper-POS import.",
    tags: ["React 19", "Vite", "Supabase", "PostgreSQL RLS", "PDF reporting"],
    links: [
      {
        label: "Live site",
        href: "https://nenitafarmlechonhausrms.app",
        kind: "primary",
      },
      {
        label: "Source",
        href: "https://github.com/shuakyle21/nenitafarm-lechonhaus",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/nenitafarm-lechonhaus.jpg",
      alt: "Nenita Farm Lechon Haus POS terminal: an empty order summary beside a menu grid of lechon, sisig and party tray items with prices",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "jdvp-enrollment-dashboard",
    title: "JDVP enrollment dashboard",
    status: "Dashboard",
    statusStyle: "accent",
    blurb:
      "A Looker Studio dashboard consolidating JDVP enrollment reports for participating schools: total enrollment, learner demographics, barangay-level distribution, client classifications and training status in one live view.",
    outcome: "Enrollment across participating schools read from one dashboard.",
    tags: ["Looker Studio", "Enrollment reporting", "Demographics"],
    links: [
      {
        label: "Live dashboard",
        href: "https://datastudio.google.com/reporting/b8c0030c-04c4-471f-837c-1e0778532267",
        kind: "primary",
      },
    ],
    visual: {
      kind: "slot",
      slotId: "work-jdvp",
      placeholder: "JDVP dashboard screenshot",
    },
  },
  {
    slug: "tvi-cams",
    title: "TVI-CAMS — TESDA compliance & attendance manager",
    status: "Tooling",
    statusStyle: "accent",
    blurb:
      "A multi-tenant compliance and document tracker for TVIs running TESDA scholarship programmes. Each school’s batches move through the internal lifecycle — AOU, NTP, TIP, Training, Assessment, Billing — while a per-programme document checklist holds every required file at missing, pending, submitted or verified. Clerk handles sign-in for Admin, Coordinator, Trainer and Viewer roles, and Supabase row-level security scopes every query to the signed-in school. Billing documents generate only when the compound gate passes: training progress at or above 80% and every required document verified. It stays an internal working layer by design — official records remain in TESDA’s own SIS, T2MIS and BSRS.",
    outcome: "Billing gated on verified documents rather than on a calendar date.",
    tags: ["Next.js 16", "Clerk", "Supabase RLS", "Drizzle ORM", "PostgreSQL"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/tesda-compliance-manager",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/tvi-cams.jpg",
      alt: "TVI-CAMS sign-in page: a Continue with Google button above email and password fields and a demo-account option",
      width: 1600,
      height: 902,
    },
  },
  {
    slug: "job-tracker-dashboard",
    title: "Job Tracker",
    status: "Workflow",
    statusStyle: "accent",
    blurb:
      "Job applications tracked without a spreadsheet. n8n polls Gmail every fifteen minutes, classifies each confirmation or status update with pattern rules, and upserts one row per application into Airtable. Only when the rules fail does an LLM get one attempt, capped at medium confidence so it can never override a rules match. Rows are keyed on company and job title, so a hand-typed entry and a generated one are the same application; a corrected status is never overwritten or regressed, and an email that cannot be classified lands in Needs Review rather than poisoning the feed. An Airtable webhook triggers a GitHub Actions rebuild within seconds, and an hourly health check compares the live n8n instance against the repo and emails when anything is stuck or drifted.",
    outcome: "A status change in Gmail reaches the live dashboard in under a minute.",
    tags: ["n8n", "Gmail API", "Airtable", "GitHub Actions", "Vercel"],
    links: [
      {
        label: "Live dashboard",
        href: "https://job-tracker-dashboard-orcin.vercel.app",
        kind: "primary",
      },
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/job-tracker-dashboard",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/job-tracker.jpg",
      alt: "Job Search Analytics Dashboard: 151 applications sent, a 33.1% reply rate, 5 interviews reached, and a stage-flow diagram running from Applied through to Offer",
      width: 1600,
      height: 951,
    },
  },
  {
    slug: "t2mis-encoder",
    title: "T2MIS Encoder",
    status: "Tooling",
    statusStyle: "accent",
    blurb:
      "A PySide6 desktop tool that takes the verified masterlist and fills TESDA’s T2MIS learner registration form row by row with Selenium — while a human operator reviews and submits every record. Three stages: encoding from a masterlist CSV, enrollment against an enrollees CSV, and offline attendance-sheet generation as DOCX. The CSV preview shows the first 500 rows with a per-row status — queued, filling, review, done, failed — so the operator can see where a run stands, and a legacy CLI is kept for scripted runs.",
    outcome: "Data entry becomes review-and-submit instead of type-and-check.",
    tags: ["Python 3.12", "PySide6", "Selenium", "DOCX generation"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/T2MIS-Data-Entry-Automation-Tool",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/t2mis-encoder.jpg",
      alt: "T2MIS Encoder main window in Stage 1 — Encoding: a preview of the first 500 rows from registrants.sample.csv, a run log, and Start, Next, Retry, Skip and Stop controls",
      width: 1600,
      height: 1123,
      // 1.43:1 source in a 16:9 slot — cover would crop ~10% off the top and
      // bottom, cutting the stage header and the Start/Stop row. Letterbox.
      fit: "contain",
    },
  },
  {
    slug: "stride-running-club",
    title: "Stride Running Club",
    status: "Tooling",
    statusStyle: "accent",
    blurb:
      "A full-stack app for running communities: group runs with distance, pace category and live RSVP headcounts, verified routes on interactive Leaflet GPS maps with elevation profiles, and a filterable club roster carrying pacer badges and session counts. React 19 and Tailwind v4 on the front, Express and Drizzle over PostgreSQL behind it, with Firebase Authentication and Google OAuth handling sign-in.",
    outcome: "Route discovery, RSVP coordination and club rostering in one app.",
    tags: ["React 19", "TypeScript", "Firebase Auth", "Leaflet", "Drizzle ORM"],
    links: [
      {
        label: "Live site",
        href: "https://runclub-connect.ai.studio/",
        kind: "primary",
      },
      {
        label: "View repository",
        href: "https://github.com/shuakyle21/running-club-firebase-studio",
        kind: "github",
      },
    ],
    visual: {
      kind: "image",
      src: "/stride-running-club.jpg",
      alt: "Stride Run Club home page: a bold headline above upcoming group runs filtered by pace and distance",
      width: 1600,
      height: 889,
    },
  },
];
