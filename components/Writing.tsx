import { pipelineSteps } from "@/lib/data/experience";
import { links } from "@/lib/data/links";
import { Reveal } from "./Reveal";

const linkCards = [
  {
    href: links.doi,
    meta: "IJLTEMAS · Vol. XV Issue VI",
    title: "Peer-reviewed publication",
    body: "Dengue outbreak forecasting for SOCCSKSARGEN. First author of four.",
    cta: "10.51583/IJLTEMAS.2026.150600192 →",
  },
  {
    href: links.linkedin,
    meta: "LinkedIn",
    title: "Shorter pieces",
    body: "Notes on verification, AI tooling and what the model got wrong this week.",
    cta: "Follow along →",
  },
  {
    href: links.substack,
    meta: "Substack · @joshuaklynepudadera",
    title: "Newsletter",
    body: "",
    cta: "Subscribe →",
  },
];

export function Writing() {
  return (
    <section
      id="writing"
      style={{ display: "flex", flexDirection: "column", padding: "112px 0 0", scrollMarginTop: 90 }}
    >
      <h6 className="section-kicker">$ cat pipeline.md</h6>
      <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 8 }}>
        Writing, and the gate before it
      </Reveal>
      <p className="text-muted prose" style={{ maxWidth: "56ch", marginBottom: 34 }}>
        Long-form technical articles on AI and software engineering, 1,200 to 2,500
        words, for professional audiences on Medium and LinkedIn. Every one of them went
        through these five steps.
      </p>
      <ol
        style={{
          listStyle: "none",
          margin: "0 0 28px",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
          gap: 14,
        }}
      >
        {pipelineSteps.map((step) => (
          <li
            key={step.num}
            className="card elev-sm"
            style={
              step.featured
                ? { padding: 18, gap: 8, boxShadow: "var(--shadow-md)", borderLeft: "2px solid var(--color-accent)" }
                : { padding: 18, gap: 8 }
            }
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-accent)" }}>
              {step.num}
            </span>
            <h4 style={{ fontSize: 15, margin: 0 }}>{step.title}</h4>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "color-mix(in srgb, var(--color-text) 72%, transparent)",
              }}
            >
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 16,
        }}
      >
        {linkCards.map((card) => (
          <a
            key={card.href}
            className="card elev-sm card-lift"
            href={card.href}
            target="_blank"
            rel="noreferrer"
            style={{ padding: 20, gap: 10, textDecoration: "none", color: "inherit" }}
          >
            <span className="card-meta" style={{ fontFamily: "var(--font-mono)" }}>
              {card.meta}
            </span>
            <h3 className="card-title">{card.title}</h3>
            {card.body ? (
              <p className="card-body" style={{ fontSize: 14 }}>
                {card.body}
              </p>
            ) : null}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-accent)" }}>
              {card.cta}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
