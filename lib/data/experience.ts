export type Experience = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "Jun 2026 – present",
    role: "Backend AI Engineer — Intern",
    org: "FlyRank AI",
    bullets: [
      "Work from written specifications and ship written documentation with every deliverable.",
      "Review AI-generated output against my own work line by line and document the differences.",
      "That audit surfaced a logic error neither version flagged on its own.",
    ],
    tags: ["Specifications", "Documentation", "AI output review"],
  },
  {
    period: "Nov 2021 – present",
    role: "Data Entry Specialist, Processing Officer / Registrar, Compliance Officer",
    org: "Nenita Farm Rice-Based Farm Training Center",
    bullets: [
      "Build the Excel dashboards and status reports that track each batch across the EGACE stages: Enrolled, Graduated, Assessed, Certified, Employed, so programme staff can see where a cohort stands without opening the underlying records.",
      "Encode trainee, programme and scholarship records into T2MIS and maintain the compliance documentation behind them.",
      "Keep records audit-ready across three vocational programmes, working to agency documentation standards rather than internal convenience.",
      "Coordinate scholarship batch records with TESDA offices through the full lifecycle, from enrolment through training and assessment to billing.",
      "Prepare billing statements against government purchase orders.",
    ],
    tags: [
      "Excel dashboards",
      "EGACE reporting",
      "T2MIS",
      "SOPs",
      "Audit checklists",
      "Billing reconciliation",
    ],
  },
  {
    period: "Jan 2026 – Jun 2026",
    role: "AI Content Producer & Technical Writer",
    org: "Freelance (Remote)",
    bullets: [
      "Long-form technical articles on AI and software engineering for professional audiences.",
      "Built the research pipeline behind them in Claude.",
      "Generated explanatory diagrams and facts sheets so verified facts read at a glance.",
      "Shipped a custom skill that puts publication-ready drafts straight into Google Docs.",
    ],
    tags: ["Claude", "Firecrawl", "Medium", "Diagrams", "Apify"],
  },
  {
    period: "Jun 2024 – Jul 2024",
    role: "On-the-Job Trainee",
    org: "LEADSolutions INC, Koronadal City",
    bullets: [
      "Developed a mobile application for transaction tracking in Flutter and Dart with Android Studio.",
      "Integrated it with the company's existing web system hosted on Azure Cloud for seamless data exchange.",
      "Designed the UI/UX so navigation and functionality stayed intuitive for the people entering transactions daily.",
    ],
    tags: ["Flutter / Dart", "Android Studio", "Azure Cloud", "UI/UX"],
  },
];

export type PipelineStep = { num: string; title: string; body: string; featured?: boolean };

export const pipelineSteps: PipelineStep[] = [
  {
    num: "01",
    title: "Topic and niche validation",
    body: "Is there an audience, and is there anything new to say to them.",
  },
  {
    num: "02",
    title: "Source gathering",
    body: "Government, academic and technical documentation first, commentary second.",
  },
  {
    num: "03",
    title: "Automated scraping",
    body: "Firecrawl pulls the sources so the reading list is complete before drafting.",
  },
  {
    num: "04",
    title: "Claim verification",
    body: "Every technical claim checked against primary sources. Nothing publishes on trust.",
    featured: true,
  },
  {
    num: "05",
    title: "Editorial pass",
    body: "Voice and consistency, plus diagrams so verified facts read at a glance.",
  },
];
