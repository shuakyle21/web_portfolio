import Image from "next/image";
import { work, type Work } from "@/lib/data/work";
import { ImageSlot } from "./ImageSlot";
import { ProjectCard } from "./ui/project-card";
import { Reveal } from "./Reveal";

const mono = { fontFamily: "var(--font-mono)" } as const;

function YamlVisual() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        display: "flex",
        flexDirection: "column",
        background: "color-mix(in srgb, var(--color-text) 4%, transparent)",
        borderBottom: "1px solid var(--color-divider)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 14px",
          borderBottom: "1px solid var(--color-divider)",
          flex: "none",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-700)" }} />
        <span style={{ ...mono, fontSize: 10.5, color: "var(--color-neutral-500)" }}>
          update-github-info.yml
        </span>
      </div>
      <div
        style={{
          padding: "12px 14px",
          ...mono,
          fontSize: 10.5,
          lineHeight: 1.8,
          color: "var(--color-neutral-300)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div><span style={{ color: "var(--color-neutral-500)" }}>on:</span></div>
        <div>&nbsp;&nbsp;workflow_dispatch:</div>
        <div>&nbsp;&nbsp;<span style={{ color: "var(--color-neutral-500)" }}>schedule:</span> [cron: daily]</div>
        <div><span style={{ color: "var(--color-neutral-500)" }}>permissions:</span></div>
        <div>&nbsp;&nbsp;contents: <span style={{ color: "var(--color-accent-300)" }}>read</span></div>
        <div><span style={{ color: "var(--color-neutral-500)" }}>safe-outputs:</span></div>
        <div>&nbsp;&nbsp;create-pull-request:</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;draft: <span style={{ color: "var(--color-accent-300)" }}>true</span></div>
      </div>
    </div>
  );
}

function TerminalVisual() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        display: "flex",
        flexDirection: "column",
        background: "color-mix(in srgb, var(--color-text) 4%, transparent)",
        borderBottom: "1px solid var(--color-divider)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 14px",
          borderBottom: "1px solid var(--color-divider)",
          flex: "none",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-700)" }} />
        <span style={{ ...mono, fontSize: 10.5, color: "var(--color-neutral-500)" }}>
          create-feature-branch
        </span>
      </div>
      <div
        style={{
          padding: "12px 14px",
          ...mono,
          fontSize: 10.5,
          lineHeight: 1.9,
          color: "var(--color-neutral-300)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div><span style={{ color: "var(--color-accent)" }}>$</span> /create-feature-branch ENG-59</div>
        <div><span style={{ color: "var(--color-neutral-500)" }}>[OK]</span> issue title resolved</div>
        <div><span style={{ color: "var(--color-neutral-500)" }}>[OK]</span> tree clean, base up to date</div>
        <div><span style={{ color: "var(--color-accent-300)" }}>→</span> eng-59-add-webhook-retries</div>
        <div><span style={{ color: "var(--color-neutral-500)" }}>[OK]</span> pushed with tracking</div>
      </div>
    </div>
  );
}

function CardVisual({ visual }: { visual: Work["visual"] }) {
  switch (visual.kind) {
    case "image": {
      const fit = visual.fit ?? "cover";
      return (
        <div style={{ width: "100%", background: "color-mix(in srgb, var(--color-text) 4%, transparent)" }}>
          <Image
            src={visual.src}
            width={visual.width}
            height={visual.height}
            alt={visual.alt}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              objectFit: fit,
              filter: "saturate(0.92) contrast(1.03) brightness(0.94)",
            }}
          />
        </div>
      );
    }
    case "slot":
      return (
        <div style={{ width: "100%", background: "color-mix(in srgb, var(--color-text) 4%, transparent)" }}>
          <ImageSlot placeholder={visual.placeholder} aspect="16/9" />
        </div>
      );
    case "yaml":
      return <YamlVisual />;
    case "terminal":
      return <TerminalVisual />;
  }
}

function statusTagClass(style: Work["statusStyle"]) {
  if (style === "accent") return "tag tag-accent";
  if (style === "outline") return "tag tag-outline";
  return "tag tag-neutral";
}

function WorkCard({ item }: { item: Work }) {
  return (
    <ProjectCard
      media={<CardVisual visual={item.visual} />}
      title={item.title}
      description={item.blurb}
      badge={
        <span className={statusTagClass(item.statusStyle)} style={{ flex: "none" }}>
          {item.status}
        </span>
      }
      links={item.links}
    >
      {/* Outcome and tags are this app's card content, so they come through the
          card's children rather than widening its API. */}
      <p
        style={{
          margin: "11px 0 0",
          ...mono,
          fontSize: 12,
          color: "var(--color-accent-300)",
          lineHeight: 1.6,
        }}
      >
        → {item.outcome}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 11 }}>
        {item.tags.map((tag) => (
          <span key={tag} className="tag tag-neutral">
            {tag}
          </span>
        ))}
      </div>
    </ProjectCard>
  );
}

export function ProjectGrid() {
  return (
    <section id="work" style={{ padding: "112px 0 0", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">$ ls ./projects</h6>
      <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 8 }}>
        Projects
      </Reveal>
      <p className="text-muted prose" style={{ maxWidth: "54ch", marginBottom: 34 }}>
        {work.length} projects, with what each one actually produced.
      </p>
      {/* Every card is server-rendered, so the titles, blurbs, outcomes, tags
          and links are all in the document — with real screenshots, or the
          terminal panels for the projects that have none. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
