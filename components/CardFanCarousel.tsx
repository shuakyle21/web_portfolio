"use client";

import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { fanTransform, type FanGeometry } from "@/lib/fan-layout";

const ARC = 10;
const TILT = 4.5;
/** Cards shown either side of the active one. */
const WINDOW = 3;
/** Room above the top card for the hover lift, in px. */
const TOP = 36;

export type FanCardMeta = {
  title: string;
  /**
   * Optional destination for the whole card. Only supply it when the card
   * renders no call-to-action of its own — a stretched link under a card that
   * already has buttons would compete with them for the click.
   */
  linkUrl?: string;
};

/**
 * A hand-of-cards fan over server-rendered cards. GSAP only ever moves the
 * existing nodes, so every title, link and image stays in the document for
 * search engines and for no-JS readers.
 */
export function CardFanCarousel({
  cards,
  children,
}: {
  cards: FanCardMeta[];
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const geometry = useRef<FanGeometry>({ step: 130, arc: ARC, tilt: TILT, window: WINDOW });
  const entered = useRef(false);
  const reduced = useRef(false);

  const [active, setActive] = useState(Math.floor((cards.length - 1) / 2));
  const [hovered, setHovered] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const activeRef = useRef(active);

  const count = cards.length;
  const showControls = count > 7;
  const faces = Children.toArray(children);

  const kids = () =>
    Array.from(containerRef.current?.querySelectorAll<HTMLElement>(".fan-card") ?? []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /** Size the cards and the container from the space available. */
  const measure = useCallback(() => {
    const el = containerRef.current;
    const first = el?.querySelector<HTMLElement>(".fan-card");
    if (!el || !first) return;

    const width = el.clientWidth;
    // Card height lands near 1.55x its width (16:9 visual plus the text block),
    // so the width is capped by the shorter of the two axes.
    const cardW = Math.round(
      Math.min(300, Math.max(176, Math.min(width * 0.3, (window.innerHeight * 0.56) / 1.55))),
    );
    el.style.setProperty("--fan-card-w", `${cardW}px`);

    // Reading the height back after the width change forces one reflow here;
    // the container height depends on it, so it cannot be a CSS-only rule.
    const cardH = first.offsetHeight;
    const gap = Math.max(64, Math.min(cardW * 0.62, (width - cardW) / (2 * WINDOW)));
    geometry.current = { step: gap, arc: ARC, tilt: TILT, window: WINDOW };
    el.style.height = `${TOP + cardH + ARC * WINDOW + 28}px`;
  }, []);

  // Entrance. Runs once, triggered by the fan coming into view like every other
  // section on the page rather than on load.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    measure();
    const elements = kids();
    gsap.set(elements, { x: 0, y: 0, rotation: 0, scale: 0.86, autoAlpha: 0 });

    const play = () => {
      if (entered.current) return;
      entered.current = true;
      elements.forEach((card, i) => {
        const t = fanTransform(i, activeRef.current, null, geometry.current);
        gsap.to(card, {
          x: t.x,
          y: t.y,
          rotation: t.rotation,
          scale: t.scale,
          autoAlpha: t.visible ? 1 : 0,
          zIndex: t.zIndex,
          duration: reduced.current ? 0 : 0.7,
          // Deal outward from the centre card rather than left to right.
          delay: reduced.current ? 0 : Math.abs(i - activeRef.current) * 0.05,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    const resize = new ResizeObserver(() => {
      measure();
      setTick((t) => t + 1);
    });
    resize.observe(el);

    return () => {
      observer.disconnect();
      resize.disconnect();
      gsap.killTweensOf(elements);
    };
  }, [measure]);

  // Every later change — stepping, hovering, resizing — is the same tween to the
  // recomputed positions.
  useEffect(() => {
    if (!entered.current) return;
    const elements = kids();
    elements.forEach((card, i) => {
      const t = fanTransform(i, active, hovered, geometry.current);
      gsap.to(card, {
        x: t.x,
        y: t.y,
        rotation: t.rotation,
        scale: t.scale,
        autoAlpha: t.visible ? 1 : 0,
        zIndex: t.zIndex,
        duration: reduced.current ? 0 : 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
    return () => {
      gsap.killTweensOf(elements);
    };
  }, [active, hovered, tick]);

  const go = (by: number) => setActive((a) => Math.min(count - 1, Math.max(0, a + by)));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div className="fan">
      <div
        ref={containerRef}
        className="fan-layout"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerLeave={() => setHovered(null)}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="fan-card"
            // Only the cards inside the window are shown, so only those are
            // exposed to assistive tech. Cards outside it are already out of
            // tab order, because autoAlpha sets visibility at opacity 0.
            aria-hidden={Math.abs(i - active) > WINDOW || undefined}
            onPointerEnter={() => setHovered(i)}
          >
            {faces[i]}
            {card.linkUrl && (
              <a
                className="fan-stretched"
                href={card.linkUrl}
                aria-label={`Open ${card.title}`}
              />
            )}
          </div>
        ))}
      </div>

      {showControls && (
        <div className="fan-controls">
          <button
            type="button"
            className="btn btn-secondary btn-lift"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            ←
          </button>
          <div className="fan-dots" aria-label="Projects">
            {cards.map((card, i) => (
              <button
                key={card.title}
                type="button"
                className="fan-dot"
                aria-current={i === active ? "true" : undefined}
                aria-label={card.title}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-lift"
            onClick={() => go(1)}
            disabled={active === count - 1}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
