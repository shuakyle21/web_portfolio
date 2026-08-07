import { profile } from "@/lib/data/profile";
import { links } from "@/lib/data/links";
import { CountUp } from "./CountUp";
import { HighlightSweep } from "./HighlightSweep";
import { Reveal } from "./Reveal";
import { LinkedInIcon } from "./icons";

const bodyStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
  maxWidth: "58ch",
  textWrap: "pretty",
};

export function About() {
  return (
    <section id="about" style={{ padding: "112px 0 0", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">$ cat about.md</h6>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 48,
        }}
      >
        <div>
          <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 18 }}>
            I check things before they ship
          </Reveal>
          <p className="prose" style={bodyStyle}>{profile.about[0]}</p>
          <p className="prose" style={bodyStyle}>
            {profile.about[1]}{" "}
            <HighlightSweep>{profile.aboutHighlight}</HighlightSweep>
            {profile.aboutHighlightTail}
          </p>
          <p className="prose" style={bodyStyle}>{profile.about[2]}</p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--color-neutral-500)",
              marginTop: 26,
            }}
          >
            # {profile.location} · open to remote
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
              gap: 12,
            }}
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="card elev-sm" style={{ gap: 4 }}>
                <CountUp
                  value={stat.value}
                  suffix={"suffix" in stat ? (stat.suffix as string) : ""}
                  group={"group" in stat ? Boolean(stat.group) : false}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 30,
                    letterSpacing: "-0.02em",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-neutral-500)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-neutral-500)",
                marginBottom: 10,
              }}
            >
              /tools-used
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {profile.tools.map((tool) => (
                <span
                  key={tool.label}
                  className={`tag ${"accent" in tool && tool.accent ? "tag-accent" : "tag-neutral"}`}
                >
                  {tool.label}
                </span>
              ))}
            </div>
          </div>
          <div
            className="card elev-sm"
            style={{
              padding: 18,
              gap: 8,
              borderStyle: "double",
              borderWidth: 3,
              borderColor: "var(--color-accent)",
              boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span className="card-kicker" style={{ fontFamily: "var(--font-mono)" }}>
              Certifications
            </span>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 7,
                fontSize: 13,
                color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
              }}
            >
              {profile.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 4,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
            >
              <a
                href={links.linkedinCertifications}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none" }}
              >
                <LinkedInIcon size={15} />
                <span>Verify on LinkedIn</span>
              </a>
              <a
                href={links.credly}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none" }}
              >
                <span>Credly badges ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
