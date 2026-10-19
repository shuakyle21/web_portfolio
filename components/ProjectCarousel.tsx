"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { edgeMask, edgeState, type EdgeState } from "@/lib/scroll-edges";

const FADE = 56;

/**
 * One straight row of project cards. The cards are server-rendered children:
 * nothing is rotated, scaled or re-parented, the row simply scrolls sideways and
 * snaps. That keeps every card's own links, and leaves the travel direction
 * unambiguous — left is left.
 */
export function ProjectCarousel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<EdgeState>({ start: false, end: false });
  const [step, setStep] = useState(0);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges(edgeState(el.scrollLeft, el.clientWidth, el.scrollWidth));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      // The distance between two cards, so one click advances exactly one card.
      setStep(cards[1] && cards[0] ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth);
    };

    measure();
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    // Cards change width with the viewport, so re-measure rather than caching.
    const resize = new ResizeObserver(() => {
      measure();
      sync();
    });
    resize.observe(el);

    return () => {
      el.removeEventListener("scroll", sync);
      resize.disconnect();
    };
  }, [sync]);

  const slide = (by: number) => {
    const el = trackRef.current;
    if (!el || step === 0) return;
    // Jump rather than glide when the visitor has asked for less motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: by * step, behavior: reduced ? "auto" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      slide(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      slide(-1);
    }
  };

  const mask = edgeMask(edges, FADE);

  return (
    <div className="carousel">
      <div
        ref={trackRef}
        className="carousel-track"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        // Only the edge that hides cards fades, and nothing fades when the row
        // fits. Both buttons disabled means there is nowhere to scroll.
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {children}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="btn btn-secondary btn-lift"
          onClick={() => slide(-1)}
          disabled={!edges.start}
          aria-label="Previous projects"
        >
          ←
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lift"
          onClick={() => slide(1)}
          disabled={!edges.end}
          aria-label="Next projects"
        >
          →
        </button>
      </div>
    </div>
  );
}
