"use client";

import { useEffect, useRef, useState } from "react";

/** HighlightText equivalent: accent sweep behind a phrase, once, on entry. */
export function HighlightSweep({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "go">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: stay static
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setState("go");
            io.disconnect();
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="hl-sweep" data-animate={state === "idle" ? undefined : state}>
      {children}
    </span>
  );
}
