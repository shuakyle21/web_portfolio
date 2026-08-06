"use client";

import { useEffect, useState } from "react";

/**
 * TypingText equivalent: types each role, holds, deletes, moves on. Loops.
 * The full role list lives in visually-hidden text for assistive tech;
 * the animated line is aria-hidden.
 */
export function TypingText({
  words,
  speedMs = 36,
}: {
  words: string[];
  speedMs?: number;
}) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    if (reduced) {
      t = setTimeout(() => setTyped(words[0]), 0);
      return () => clearTimeout(t);
    }
    const tick = () => {
      const word = words[ri % words.length];
      let delay: number;
      if (!deleting) {
        ci += 1;
        setTyped(word.slice(0, ci));
        delay = speedMs;
        if (ci >= word.length) {
          deleting = true;
          delay = 1600;
        }
      } else if (ci > 0) {
        ci -= 1;
        setTyped(word.slice(0, ci));
        delay = Math.max(18, speedMs * 0.45);
      } else {
        deleting = false;
        ri = (ri + 1) % words.length;
        delay = 280;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, speedMs);
    return () => clearTimeout(t);
  }, [words, speedMs]);

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
