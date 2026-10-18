"use client";

import { useEffect, useRef, useState } from "react";
import { edgeState } from "@/lib/scroll-edges";

/** Matches the marquee's 48px so both fades read as the same gesture. */
const FADE = 48;

/**
 * Horizontal scroll-snap strip. CSS does the scrolling, snapping and fade —
 * native overflow keeps momentum, trackpad and keyboard access, so there is no
 * slider JS to maintain.
 *
 * The mask is applied inline rather than in the stylesheet because a static
 * fade lies at the extremes: at rest it would dim the first card as if
 * something were hidden to the left of it.
 */
export function ProjectStrip({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setEdges(edgeState(el.scrollLeft, el.clientWidth, el.scrollWidth));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const left = edges.left ? FADE : 0;
  const right = edges.right ? FADE : 0;
  const mask = `linear-gradient(90deg, transparent 0, #000 ${left}px, #000 calc(100% - ${right}px), transparent 100%)`;

  return (
    <div
      ref={ref}
      className="project-strip"
      // A scroll region needs to be focusable for keyboard users to reach the
      // cards past the first few, and a label so it isn't an anonymous box.
      role="region"
      aria-label="More projects"
      tabIndex={0}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      {children}
    </div>
  );
}
