"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { TypingText } from "./TypingText";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

function EducationJson() {
  const edu = profile.education;
  const key = (s: string) => (
    <span style={{ color: "var(--color-accent-300)" }}>&quot;{s}&quot;</span>
  );
  const val = (s: string) => (
    <span style={{ color: "color-mix(in srgb, var(--color-text) 86%, transparent)" }}>
      &quot;{s}&quot;
    </span>
  );
  return (
    <>
      <div style={{ marginBottom: 8, color: "var(--color-neutral-600)" }}>
        {"// cat education.json"}
      </div>
      <div>{"{"}</div>
      <div style={{ paddingLeft: 16 }}>{key("degree")}: {val(edu.degree)},</div>
      <div style={{ paddingLeft: 16 }}>{key("college")}: {val(edu.college)},</div>
      <div style={{ paddingLeft: 16 }}>{key("university")}: {val(edu.university)},</div>
      <div style={{ paddingLeft: 16 }}>{key("years")}: {val(edu.years)},</div>
      <div style={{ paddingLeft: 16 }}>{key("leadership")}: {"{"}</div>
      <div style={{ paddingLeft: 32 }}>{key("role")}: {val(edu.leadership.role)},</div>
      <div style={{ paddingLeft: 32 }}>{key("term")}: {val(edu.leadership.term)},</div>
      <div style={{ paddingLeft: 32 }}>{key("note")}: {val(edu.leadership.note)}</div>
      <div style={{ paddingLeft: 16 }}>{"},"}</div>
      <div style={{ paddingLeft: 16 }}>{key("honors")}: [</div>
      {edu.honors.map((h, i) => (
        <div key={h} style={{ paddingLeft: 32 }}>
          {val(h)}
          {i < edu.honors.length - 1 ? "," : ""}
        </div>
      ))}
      <div style={{ paddingLeft: 16 }}>],</div>
      <div style={{ paddingLeft: 16 }}>{key("thesis")}: {val(edu.thesis)}</div>
      <div>{"}"}</div>
    </>
  );
}

// Standard ID-photo ratio, preserved exactly from the 540x694 source. Fixed at
// every viewport — never fluid — but sized down so the hero copy stays the
// primary read and the portrait supports it rather than competing with it.
const PORTRAIT_W = 360;
const PORTRAIT_H = Math.round((PORTRAIT_W * 694) / 540); // 463

function PortraitCard() {
  const [flipped, setFlipped] = useState(false);
  const corner = (pos: React.CSSProperties) => (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        opacity: 0.62,
        ...pos,
      }}
    />
  );
  return (
    <div
      className="hero-portrait"
      style={{
        flexDirection: "column",
        alignSelf: "center",
        justifySelf: "end",
        position: "relative",
        // Fixed, non-responsive: the photo is a standard ID portrait and must
        // render at its native 540x694 regardless of viewport. Only the text
        // column flexes. +8px covers the frame's 1px border and 3px side
        // padding on each side, so the photo itself lands on exactly 540.
        width: PORTRAIT_W + 8,
        flex: "none",
      }}
    >
      {corner({ top: -9, left: -9, borderTop: "1px solid var(--color-accent)", borderLeft: "1px solid var(--color-accent)" })}
      {corner({ top: -9, right: -9, borderTop: "1px solid var(--color-accent)", borderRight: "1px solid var(--color-accent)" })}
      {corner({ bottom: -9, left: -9, borderBottom: "1px solid var(--color-accent)", borderLeft: "1px solid var(--color-accent)" })}
      {corner({ bottom: -9, right: -9, borderBottom: "1px solid var(--color-accent)", borderRight: "1px solid var(--color-accent)" })}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          flexDirection: "column",
          borderRadius: "var(--radius-lg)",
          border: "1px solid color-mix(in srgb, var(--color-accent) 26%, var(--color-divider))",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-md)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "11px 14px",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-neutral-700)" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-neutral-700)" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-accent-700)" }} />
          <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-neutral-500)" }}>
            {flipped ? "education.json" : "portrait.jpg"}
          </span>
        </div>
        <div style={{ position: "relative", height: PORTRAIT_H, flex: "none", perspective: 1400 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: "transform 560ms cubic-bezier(.77,0,.175,1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              aria-hidden={flipped}
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                lineHeight: 0,
                padding: "0 3px",
              }}
            >
              <Image
                src="/portrait.jpg"
                width={PORTRAIT_W}
                height={PORTRAIT_H}
                alt="Joshua Klyne Pudadera"
                priority
                style={{
                  display: "block",
                  width: PORTRAIT_W,
                  height: PORTRAIT_H,
                  borderRadius: "calc(var(--radius-lg) - 3px)",
                  filter: "saturate(0.94) contrast(1.02) brightness(0.97)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0 3px",
                  borderRadius: "calc(var(--radius-lg) - 3px)",
                  background:
                    "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 22%, transparent) 0%, transparent 26%, transparent 68%, color-mix(in srgb, var(--color-bg) 46%, transparent) 100%)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 3,
                  right: 3,
                  bottom: 0,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-accent) 55%, transparent) 22%, color-mix(in srgb, var(--color-accent) 55%, transparent) 78%, transparent)",
                }}
              />
            </div>
            <div
              aria-hidden={!flipped}
              style={{
                position: "absolute",
                inset: "0 3px",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                overflow: "auto",
                borderRadius: "calc(var(--radius-lg) - 3px)",
                background: "color-mix(in srgb, var(--color-accent) 5%, var(--color-bg))",
                padding: "18px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                lineHeight: 1.9,
                color: "var(--color-neutral-500)",
              }}
            >
              <EducationJson />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 14px 13px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-neutral-500)",
          }}
        >
          <span>{profile.name.replace(" P.", "")}</span>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent-300)",
              background: "none",
              border: 0,
              padding: "2px 4px",
              cursor: "pointer",
              borderRadius: "var(--radius-sm)",
              transition: "color 160ms ease, transform 140ms var(--ease-out)",
            }}
          >
            {flipped ? "← portrait" : "About me →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-grid">
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--color-accent)",
            margin: "0 0 20px",
            letterSpacing: "0.02em",
          }}
        >
          $ whoami
        </p>
        <Reveal
          as="h1"
          style={{ fontSize: "clamp(38px,5.6vw,58px)", margin: "0 0 14px", letterSpacing: "-0.03em" }}
        >
          Hi, I’m{" "}
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 600,
              fontSize: "1.3em",
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            {profile.handle}
          </span>
        </Reveal>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(15px,2.2vw,19px)",
            margin: "0 0 24px",
            color: "var(--color-neutral-300)",
            minHeight: "1.6em",
          }}
        >
          <TypingText words={profile.roles} />
        </p>
        <div
          style={{
            maxWidth: "54ch",
            fontSize: 16,
            lineHeight: 1.7,
            color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
            textWrap: "pretty",
          }}
        >
          {profile.intro.map((par, i) => (
            <p
              key={i}
              className="prose"
              style={{ margin: i < profile.intro.length - 1 ? "0 0 14px" : 0 }}
            >
              {par}
            </p>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "28px 0 26px" }}>
          <a className="btn btn-primary btn-lift" href="#work" style={{ padding: "11px 20px", fontSize: 14 }}>
            View Work
          </a>
          <a
            className="btn btn-secondary btn-lift"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            style={{ padding: "11px 20px", fontSize: 14 }}
          >
            Download Resume
          </a>
        </div>
        <SocialLinks />
      </div>
      <PortraitCard />
    </section>
  );
}
