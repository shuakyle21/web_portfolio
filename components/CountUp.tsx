"use client";

import { useEffect, useRef } from "react";

/** CountingNumber equivalent: counts up once when scrolled into view. */
export function CountUp({
  value,
  suffix = "",
  group = false,
  className,
  style,
}: {
  value: number;
  suffix?: string;
  group?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    (group ? Math.round(v).toLocaleString("en-US") : String(Math.round(v))) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const dur = 900;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            el.textContent = fmt(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          };
          el.textContent = fmt(0);
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, suffix, group]);

  return (
    <span ref={ref} className={className} style={style}>
      {fmt(value)}
    </span>
  );
}
