import { skills } from "@/lib/data/skills";
import { Reveal } from "./Reveal";

export function SkillsCloud() {
  return (
    <section id="skills" style={{ padding: "112px 0 0", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">$ ls ./capabilities</h6>
      <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 8 }}>
        Capabilities
      </Reveal>
      <p className="text-muted" style={{ maxWidth: "56ch", marginBottom: 34 }}>
        Dashboards and analysis first, then the engineering that supports the data work
        and keeps it running. Written from what I have shipped, not what I have read
        about.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 16,
        }}
      >
        {skills.map((cat) => (
          <div key={cat.index} className="card elev-sm card-lift" style={{ padding: 20, gap: 14 }}>
            <span className="card-kicker" style={{ fontFamily: "var(--font-mono)" }}>
              {cat.index} / {cat.label}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {cat.items.map((item) => (
                <span key={item} className="tag tag-neutral">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
