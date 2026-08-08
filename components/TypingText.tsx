"use client";

import { useEffect, useState } from "react";

/**
 * Types the primary role once and holds — no delete, no cycling. A rotating
 * version left the line mid-transition more often than not on a quick
 * glance, which is the one glance a resume screen actually gets. The full
 * role list still lives in visually-hidden text for assistive tech.
 */
export function TypingText({
  words,
  speedMs = 36,
}: {
  words: string[];
  speedMs?: number;
}) {
  const [typed, setTyped] = useState("");
  const word = words[0];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(word);
      return;
    }
    let ci = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      ci += 1;
      setTyped(word.slice(0, ci));
      if (ci < word.length) t = setTimeout(tick, speedMs);
    };
    t = setTimeout(tick, speedMs);
    return () => clearTimeout(t);
  }, [word, speedMs]);

  return (
    <>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
        }}
      >
        {words.join(", ")}.
      </span>
      <span aria-hidden="true">{typed}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 9,
          height: "1.05em",
          marginLeft: 2,
          background: "var(--color-accent)",
          verticalAlign: "-0.16em",
          animation: "noct-blink 1s step-end infinite",
        }}
      />
    </>
  );
}
