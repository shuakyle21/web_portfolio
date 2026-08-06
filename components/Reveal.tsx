"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SplittingText-style heading reveal: blur-and-rise once on entry.
 * Renders children visible on the server; hides + releases only when
 * JS runs and the user has no reduced-motion preference.
 */
export function Reveal({
  as: Tag = "h2",
  className,
  style,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<"idle" | "pending" | "go">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anything already at or above the fold reveals immediately.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setPhase("go");
      return;
    }
    setPhase("pending");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight) {
            setPhase("go");
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [
    className,
    phase === "pending" ? "reveal-pending" : "",
    phase === "go" ? "reveal-pending reveal-go" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} data-reveal="" className={cls} style={style}>
      {children}
    </Tag>
  );
}
