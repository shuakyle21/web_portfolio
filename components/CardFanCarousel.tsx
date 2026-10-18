"use client";

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import gsap from "gsap";
import {
  ARC,
  TILT,
  fanHeight,
  fanMetrics,
  fanTransform,
  fanWindow,
  type FanGeometry,
} from "@/lib/fan-layout";

/** There is no layout before paint on the server, and React warns if asked. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

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
 * A hand-of-cards fan over server-rendered cards. The fan is an enhancement:
 * with scripts off the cards are an ordinary grid, and with them on GSAP only
 * ever moves the existing nodes, so every title, blurb, tag and link is in the
 * document either way.
 */
export function CardFanCarousel({
  cards,
  children,
}: {
  cards: FanCardMeta[];
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const geometry = useRef<FanGeometry>({ step: 130, arc: ARC, tilt: TILT, window: 3 });
  const entered = useRef(false);
  const reduced = useRef(false);
  const previous = useRef<{ hovered: number | null; active: number }>({ hovered: null, active: -1 });

  const [active, setActive] = useState(Math.floor((cards.length - 1) / 2));
  const [hovered, setHovered] = useState<number | null>(null);
  /** Cards shown either side of the centre, from the measured width. */
  const [shown, setShown] = useState(3);
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const activeRef = useRef(active);

  const count = cards.length;
  const faces = Children.toArray(children);
  // Arrows and dots are only worth showing when the fan cannot hold every card.
  const showControls = count > shown * 2 + 1;

  const kids = () =>
    Array.from(containerRef.current?.querySelectorAll<HTMLElement>(".fan-card") ?? []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const measure = useCallback(() => {
    const el = containerRef.current;
    const first = el?.querySelector<HTMLElement>(".fan-card");
    if (!el || !first) return;

    const width = el.clientWidth;
    const win = fanWindow(width);
    const { cardW, step } = fanMetrics(width, window.innerHeight, win);
    el.style.setProperty("--fan-card-w", `${cardW}px`);

    // Height depends on the rendered card, so it has to be read back after the
    // width lands — one forced reflow, and only here.
    geometry.current = { step, arc: ARC, tilt: TILT, window: win };
    el.style.height = `${fanHeight(first.offsetHeight, win)}px`;
    setShown((current) => (current === win ? current : win));
  }, []);

  // Hand the layout to GSAP before the first paint, so the grid the server sent
  // is replaced without ever being shown.
  useIsoLayoutEffect(() => {
    setReady(true);
  }, []);

  // Entrance, once, when the fan comes into view like every other section.
  useIsoLayoutEffect(() => {
    if (!ready) return;
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
          autoAlpha: t.alpha,
          zIndex: t.zIndex,
          duration: reduced.current ? 0 : 0.7,
          // Deal outward from the centre card rather than left to right.
          delay: reduced.current ? 0 : Math.abs(i - activeRef.current) * 0.05,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const intersection = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          intersection.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    intersection.observe(el);

    // Width only. measure() writes the container height, and observing the
    // element you resize is how a ResizeObserver loop starts.
    let lastWidth = el.clientWidth;
    const resize = new ResizeObserver(() => {
      if (el.clientWidth === lastWidth) return;
      lastWidth = el.clientWidth;
      measure();
      setTick((t) => t + 1);
    });
    resize.observe(el);

    return () => {
      intersection.disconnect();
      resize.disconnect();
      gsap.killTweensOf(elements);
    };
  }, [ready, measure]);

  // Everything after the entrance is the same tween to recomputed positions.
  useEffect(() => {
    if (!ready || !entered.current) return;
    // Hover is feedback, so it settles faster than a deliberate step across the
    // fan.
    const hoverOnly =
      previous.current.active === active && previous.current.hovered !== hovered;
    previous.current = { hovered, active };

    const elements = kids();
    elements.forEach((card, i) => {
      // Reduced motion still gets the new arrangement, without the travel.
      const t = fanTransform(i, active, reduced.current ? null : hovered, geometry.current);
      gsap.to(card, {
        x: t.x,
        y: t.y,
        rotation: t.rotation,
        scale: t.scale,
        autoAlpha: t.alpha,
        zIndex: t.zIndex,
        duration: reduced.current ? 0 : hoverOnly ? 0.3 : 0.5,
        ease: hoverOnly ? "power3.out" : "power2.out",
        overwrite: "auto",
      });
    });

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [active, hovered, tick, shown, ready]);

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
        data-ready={ready || undefined}
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
            // Only the fan hides cards, so only the fan marks them hidden. With
            // scripts off they are all real, reachable content.
            aria-hidden={ready && Math.abs(i - active) > shown ? true : undefined}
            // Mouse only: on touch a pointerenter latches and the card stays
            // lifted after the tap that caused it.
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHovered(i);
            }}
            // Tabbing to a card's own links brings it forward, since the fan can
            // place its buttons underneath a neighbour.
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            // Clicking the card body centres it. Its links and buttons keep
            // their own clicks.
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a, button")) return;
              setActive(i);
            }}
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

      {ready && showControls && (
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
          <div className="fan-dots" role="group" aria-label="Jump to a project">
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
