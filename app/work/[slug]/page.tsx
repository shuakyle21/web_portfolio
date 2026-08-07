import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/lib/data/work";
import { links } from "@/lib/data/links";
import { profile } from "@/lib/data/profile";
import { ImageSlot } from "@/components/ImageSlot";
import { Footer } from "@/components/Footer";
import { BrandMark } from "@/components/icons";

export function generateStaticParams() {
  return work.filter((w) => w.caseStudy).map((w) => ({ slug: w.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug && w.caseStudy);
  if (!item) return {};
  return {
    title: `${item.title} — case study`,
    description: `${item.blurb} ${item.outcome}`,
  };
}

const sectionHead = (num: string, label: string) => (
  <h6
    style={{
      fontFamily: "var(--font-mono)",
      color: "var(--color-accent)",
      textTransform: "none",
      letterSpacing: "0.02em",
      marginBottom: 16,
      fontSize: 13,
    }}
  >
    # {num} / {label}
  </h6>
);

const bodyText: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  maxWidth: "64ch",
  color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
  textWrap: "pretty",
};

const flowChip = (highlight?: boolean): React.CSSProperties => ({
  padding: "8px 12px",
  borderRadius: "var(--radius-md)",
  border: `1px solid ${highlight ? "var(--color-accent)" : "var(--color-divider)"}`,
  color: highlight ? "var(--color-accent-300)" : undefined,
});

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item?.caseStudy) notFound();
  const cs = item.caseStudy;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title,
    author: [{ "@type": "Person", name: profile.name }],
    sameAs: links.doi,
    identifier: "10.51583/IJLTEMAS.2026.150600192",
    isPartOf: "IJLTEMAS Vol. XV Issue VI",
  };

  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100dvh",
        fontFamily: "var(--font-body)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "color-mix(in srgb, #161826 88%, transparent)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <nav
          className="nav"
          style={{ maxWidth: 880, margin: "0 auto", padding: "12px 24px" }}
          aria-label="Primary"
        >
          <Link
            className="nav-brand"
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}
          >
            <BrandMark />
            <span>shua</span>
          </Link>
          <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 13, textDecoration: "none" }}>
            ← cd ..
          </Link>
          <Link className="btn btn-primary" href="/#contact" style={{ fontSize: 13 }}>
            Contact
          </Link>
        </nav>
      </header>

      <main id="main" style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px 96px" }}>
        <section style={{ padding: "72px 0 48px", scrollMarginTop: 90 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-accent)", margin: "0 0 20px" }}>
            {cs.command}
          </p>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              margin: "0 0 16px",
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {item.title}
          </h1>
          <p className="prose" style={{ ...bodyText, fontSize: 18, lineHeight: 1.7, maxWidth: "58ch" }}>
            {cs.intro}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "26px 0 24px" }}>
            <span className="tag tag-accent">{cs.tags[0]}</span>
            <span className="tag tag-neutral">{cs.period}</span>
            {cs.tags.slice(1).map((tag) => (
              <span key={tag} className="tag tag-neutral">
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a className="btn btn-primary" href={links.doi} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
              Read the paper (DOI)
            </a>
            <a className="btn btn-secondary" href={links.github} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
              GitHub
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-neutral-600)", marginTop: 18 }}>
            {cs.citation}
          </p>
        </section>

        <div
          style={{
            width: "100%",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            background: "color-mix(in srgb, var(--color-text) 4%, transparent)",
          }}
        >
          {cs.hero.src ? (
            <Image
              src={cs.hero.src}
              alt={cs.hero.alt ?? ""}
              width={1200}
              height={675}
              priority
              style={{ display: "block", width: "100%", height: "auto", aspectRatio: cs.hero.aspect, objectFit: "cover" }}
            />
          ) : (
            <ImageSlot placeholder={cs.hero.placeholder} aspect={cs.hero.aspect} />
          )}
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 14,
            padding: "40px 0 12px",
            scrollMarginTop: 90,
          }}
        >
          {cs.metrics.map((m) => (
            <div key={m.label} className="card elev-sm" style={{ gap: 4 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 29, letterSpacing: "-0.02em" }}>
                {m.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-neutral-500)",
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("01", "problem")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 16 }}>{cs.problem.heading}</h2>
          {cs.problem.body.map((par) => (
            <p key={par.slice(0, 24)} className="prose" style={bodyText}>
              {par}
            </p>
          ))}
          <div
            className="card elev-sm"
            style={{ marginTop: 26, padding: 18, gap: 10, borderLeft: "2px solid var(--color-accent)" }}
          >
            <span className="card-kicker" style={{ fontFamily: "var(--font-mono)" }}>
              {cs.problem.audienceKicker}
            </span>
            <p
              className="prose"
              style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}
            >
              {cs.problem.audience}
            </p>
          </div>
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("02", "constraints and tradeoffs")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 24 }}>
            What the sources allowed, and what they cost
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {cs.constraints.map((c) => (
              <div key={c.title} className="card elev-sm" style={{ padding: 20, gap: 8 }}>
                <span className="card-kicker" style={{ fontFamily: "var(--font-mono)" }}>
                  {c.kind}
                </span>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-body" style={{ fontSize: 14 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("03", "data flow")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 16 }}>{cs.dataFlow.heading}</h2>
          <p className="prose" style={bodyText}>
            {cs.dataFlow.body}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              margin: "26px 0 20px",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            {cs.dataFlow.rows.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 10,
                  paddingLeft: ri * 18,
                }}
              >
                {row.map((cell, ci) =>
                  cell.kind === "arrow" ? (
                    <span key={ci} style={{ color: "var(--color-accent)" }}>
                      {cell.label}
                    </span>
                  ) : cell.kind === "return" ? (
                    <span key={ci} style={{ color: "var(--color-neutral-600)" }}>
                      {cell.label}
                    </span>
                  ) : (
                    <span key={ci} style={flowChip(cell.kind === "highlight")}>
                      {cell.label}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
          <figure>
            <div
              style={{
                width: "100%",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
                background: "color-mix(in srgb, var(--color-text) 4%, transparent)",
              }}
            >
              <ImageSlot placeholder={cs.dataFlow.diagram.placeholder} aspect={cs.dataFlow.diagram.aspect} />
            </div>
            <figcaption>{cs.dataFlow.diagram.caption}</figcaption>
          </figure>
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("04", "figures")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 24 }}>Three views worth showing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {cs.figures.map((fig) => (
              <figure key={fig.slotId}>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)",
                    background: "color-mix(in srgb, var(--color-text) 4%, transparent)",
                  }}
                >
                  <ImageSlot placeholder={fig.placeholder} aspect={fig.aspect} />
                </div>
                <figcaption>{fig.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("05", "results")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 22 }}>What came out of it</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Output</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {cs.results.map(([output, detail]) => (
                <tr key={output}>
                  <td>{output}</td>
                  <td>{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ padding: "52px 0 0", scrollMarginTop: 90 }}>
          {sectionHead("06", "lessons")}
          <h2 style={{ fontSize: "clamp(26px,3.4vw,32px)", marginBottom: 20 }}>Lessons learned</h2>
          <ol
            style={{
              margin: 0,
              paddingLeft: 22,
              listStyle: "decimal",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: "64ch",
            }}
          >
            {cs.lessons.map((lesson) => (
              <li
                key={lesson.slice(0, 24)}
                className="prose"
                style={{ fontSize: 16, lineHeight: 1.75, color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}
              >
                {lesson}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ padding: "56px 0 0", scrollMarginTop: 90 }}>
          <hr className="hr" style={{ margin: "0 0 40px" }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ fontSize: "clamp(24px,3.2vw,30px)", marginBottom: 6 }}>
                Got a dataset nobody trusts yet?
              </h2>
              <p className="text-muted" style={{ margin: 0, fontSize: 15 }}>
                Research, reconciliation, verification, and the writing that explains it.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link className="btn btn-primary" href="/#contact" style={{ padding: "10px 18px", fontSize: 14 }}>
                Get in touch
              </Link>
              <Link className="btn btn-secondary" href="/#work" style={{ padding: "10px 18px", fontSize: 14 }}>
                All work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        left="© 2026 Joshua Klyne P. Pudadera · case study 01"
        right={{ href: "/", label: "← back to portfolio" }}
      />
    </div>
  );
}
