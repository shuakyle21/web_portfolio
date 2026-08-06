export type SkillCategory = {
  index: string;
  label: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    index: "01",
    label: "Dashboards & reporting",
    items: [
      "Excel",
      "Lookups & pivot summaries",
      "Google Sheets / Looker Studio",
      "Status & funnel reporting",
      "Recurring report cycles",
      "Charts people can read",
    ],
  },
  {
    index: "02",
    label: "Analysis & modelling",
    items: [
      "pandas / NumPy",
      "SQL",
      "Cleaning & deduplication",
      "matplotlib / seaborn",
      "scikit-learn",
      "Orange Data Mining",
      "Jupyter",
      "Forecasting models",
      "Geospatial data",
    ],
  },
  {
    index: "03",
    label: "Backend & APIs",
    items: [
      "Python",
      "REST endpoint design",
      "Request validation",
      "Error handling",
      "Relational schema design",
      "Cloud integration",
      "Working from written specs",
    ],
  },
  {
    index: "04",
    label: "LLM integration",
    items: [
      "LLM API calls",
      "Prompt engineering",
      "Structured output",
      "Custom Claude skills",
      "Grounding in real sources",
      "Output review against spec",
    ],
  },
  {
    index: "05",
    label: "Automation & pipelines",
    items: [
      "Scripted ETL",
      "Firecrawl scraping",
      "Repeatable runs",
      "Multi-source reconciliation",
      "Failure & retry handling",
      "Google Workspace automation",
    ],
  },
  {
    index: "06",
    label: "Engineering practice",
    items: [
      "Git & GitHub",
      "GitHub Actions CI/CD",
      "Code review of AI output",
      "Technical documentation",
      "Version-controlled revisions",
      "Verification before merge",
      "Architecture & system design",
      "Full-stack delivery",
    ],
  },
];

export type StackItem = { name: string; slug: string };

// Monochrome logo marks at neutral-400, so the rows read as tone, not a rainbow.
export const stackRows: { id: string; direction: "l" | "r"; duration: number; items: StackItem[] }[] = [
  {
    id: "rowA",
    direction: "l",
    duration: 48,
    items: [
      { name: "Claude", slug: "claude" },
      { name: "Gemini", slug: "googlegemini" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Python", slug: "python" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "Colab", slug: "googlecolab" },
      { name: "pandas", slug: "pandas" },
      { name: "NumPy", slug: "numpy" },
      { name: "scikit-learn", slug: "scikitlearn" },
      { name: "Streamlit", slug: "streamlit" },
    ],
  },
  {
    id: "rowB",
    direction: "r",
    duration: 56,
    items: [
      { name: "Looker Studio", slug: "looker" },
      { name: "MySQL", slug: "mysql" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "QGIS", slug: "qgis" },
      { name: "Google Earth", slug: "googleearth" },
      { name: "Sheets", slug: "googlesheets" },
      { name: "Docs", slug: "googledocs" },
      { name: "Drive", slug: "googledrive" },
      { name: "Forms", slug: "googleforms" },
      { name: "Notion", slug: "notion" },
      { name: "Markdown", slug: "markdown" },
    ],
  },
  {
    id: "rowC",
    direction: "l",
    duration: 44,
    items: [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Flutter", slug: "flutter" },
      { name: "Dart", slug: "dart" },
      { name: "Android Studio", slug: "androidstudio" },
      { name: "Figma", slug: "figma" },
      { name: "Postman", slug: "postman" },
    ],
  },
];
