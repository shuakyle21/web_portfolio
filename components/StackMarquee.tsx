"use client";

import { stackRows, type StackItem } from "@/lib/data/skills";
import { Reveal } from "./Reveal";

function Chip({ item, hidden }: { item: StackItem; hidden?: boolean }) {
  return (
    <div className="stack-chip" aria-hidden={hidden}>
      {/* Monochrome marks at neutral-400 so the rows read as tone, not a rainbow. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${item.slug}/b2b6ca`}
        alt=""
        width={22}
        height={22}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        style={{ width: 22, height: 22, display: "block", opacity: 0.9 }}
      />
      <span style={{ fontSize: 13, color: "var(--color-neutral-400)" }}>{item.name}</span>
    </div>
  );
}

export function StackMarquee() {
  return (
    <section id="stack" style={{ padding: "112px 0 0", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">$ cat stack.json</h6>
      <Reveal style={{ fontSize: "clamp(28px,3.6vw,34px)", marginBottom: 8 }}>
        Tech stack
      </Reveal>
      <p className="text-muted prose" style={{ maxWidth: "54ch", marginBottom: 34 }}>
        The tools the work actually runs on. Analysis on top, dashboards and
        documentation in the middle, what ships at the bottom.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {stackRows.map((row) => (
          <div key={row.id} className="marquee">
            <div
              className="marquee-track"
              style={{
                animation: `noct-marquee-${row.direction} ${row.duration}s linear infinite`,
              }}
            >
              {row.items.map((item) => (
                <Chip key={item.slug} item={item} />
              ))}
              {/* duplicate pass so the loop is seamless */}
              {row.items.map((item) => (
                <Chip key={`${item.slug}-dup`} item={item} hidden />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
