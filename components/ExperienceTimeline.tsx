"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/lib/data/experience";
import { Reveal } from "./Reveal";

/**
 * Stepped timeline tracker: the accent fill and head travel node-to-node and
 * settle ON the current entry's dot instead of gliding continuously.
 */
export function ExperienceTimeline() {
  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    const fill = ol.querySelector<HTMLElement>("[data-tl-fill]");
    const head = ol.querySelector<HTMLElement>("[data-tl-head]");
    const nodes = Array.from(ol.querySelectorAll<HTMLButtonElement>("[data-tl-jump]"));
    const dots = nodes.map((b) => b.querySelector<HTMLElement>("[data-tl-dot]")!);
    if (!fill || !head) return;
    const ACTIVE =
      "0 0 0 4px var(--color-bg), 0 0 14px 3px color-mix(in srgb, var(--color-accent) 42%, transparent)";
    const IDLE = "0 0 0 4px var(--color-bg)";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      fill.style.transform = "scaleY(1)";
      dots.forEach((d) => {
        d.style.background = "var(--color-accent)";
        d.style.boxShadow = ACTIVE;
      });
      return;
    }

    let frame = 0;
    let lit = -1;
    const offsets = () =>
      nodes.map((b) => (b.parentElement as HTMLElement).offsetTop + b.offsetTop + 16);
    let marks = offsets();
    const paint = () => {
      frame = 0;
      const r = ol.getBoundingClientRect();
      const lineY = window.innerHeight * 0.42 - r.top;
      let n = 0;
      for (const m of marks) if (m <= lineY) n++;
      if (n === lit) return;
      lit = n;
      const y = n > 0 ? marks[n - 1] : 0;
      fill.style.transform = `scaleY(${y / r.height})`;
      head.style.transform = `translate3d(0,${y - 3.5}px,0)`;
      head.style.opacity = n > 0 ? "1" : "0";
      dots.forEach((d, i) => {
        const on = i < n;
        d.style.background = on ? "var(--color-accent)" : "var(--color-neutral-700)";
        d.style.boxShadow = on ? ACTIVE : IDLE;
        const b = d.parentElement as HTMLElement;
        if (!b.matches(":focus-visible") && !b.matches(":hover")) {
          d.style.transform = on ? "scale(1.12)" : "scale(1)";
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      marks = offsets();
      lit = -1;
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(onResize);
    paint();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jump = (e: React.MouseEvent<HTMLButtonElement>) => {
    const li = e.currentTarget.closest("li");
    if (!li) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = li.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="experience" style={{ padding: "112px 0 0", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">$ git log --author=shua --date=short</h6>
      <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 38 }}>
        Experience
      </Reveal>
      <ol
        ref={olRef}
        style={{
          position: "relative",
          listStyle: "none",
          margin: 0,
          padding: "0 0 0 26px",
          borderLeft: "1px solid var(--color-divider)",
          display: "flex",
          flexDirection: "column",
          gap: 38,
        }}
      >
        <span
          data-tl-fill=""
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 0,
            left: -1,
            top: 0,
            width: 1,
            height: "100%",
            transformOrigin: "top center",
            transform: "scaleY(0)",
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-accent) 30%, transparent), var(--color-accent))",
            transition: "transform 340ms cubic-bezier(.77,0,.175,1)",
            willChange: "transform",
          }}
        />
        <span
          data-tl-head=""
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 0,
            left: -4,
            top: 0,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--color-accent)",
            opacity: 0,
            boxShadow: "0 0 10px 3px color-mix(in srgb, var(--color-accent) 45%, transparent)",
            transition:
              "transform 340ms cubic-bezier(.77,0,.175,1), opacity 200ms var(--ease-out)",
            willChange: "transform,opacity",
          }}
        />
        {experience.map((job) => (
          <li key={`${job.org}-${job.period}`} style={{ position: "relative" }}>
            <button
              data-tl-jump=""
              type="button"
              aria-label={`Jump to ${job.role} at ${job.org}`}
              title={`${job.role} at ${job.org}`}
              onClick={jump}
              style={{
                position: "absolute",
                zIndex: 1,
                left: -42.5,
                top: -4.5,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                border: 0,
                borderRadius: "50%",
                background: "none",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                data-tl-dot=""
                aria-hidden="true"
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "var(--color-neutral-700)",
                  boxShadow: "0 0 0 4px var(--color-bg)",
                  transition:
                    "background 240ms var(--ease-out), box-shadow 240ms var(--ease-out), transform 200ms var(--ease-out)",
                  pointerEvents: "none",
                }}
              />
            </button>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-neutral-500)",
                margin: "0 0 6px",
              }}
            >
              {job.period}
            </p>
            <h3 style={{ fontSize: 21, margin: "0 0 2px" }}>{job.role}</h3>
            <p style={{ margin: "0 0 10px", fontSize: 15, color: "var(--color-accent-300)" }}>
              {job.org}
            </p>
            <ul
              style={{
                maxWidth: "62ch",
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 9,
                fontSize: 15,
                lineHeight: 1.7,
                color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
                textWrap: "pretty",
              }}
            >
              {job.bullets.map((bullet) => (
                <li key={bullet} style={{ display: "flex", gap: 10 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      lineHeight: 1.7,
                    }}
                  >
                    ›
                  </span>
                  {/* .prose lives on the span, not the flex <li> — text-align
                      does nothing on a flex container and only ever worked
                      here by inheriting down into this child. */}
                  <span className="prose">{bullet}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {job.tags.map((tag) => (
                <span key={tag} className="tag tag-outline">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
