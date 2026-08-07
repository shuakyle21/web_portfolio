"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ratingSchema } from "@/lib/rating-schema";
import { StarIcon } from "./icons";

const STORAGE_KEY = "shua.rating.v1";
const STARS = [1, 2, 3, 4, 5];

/* Reading localStorage via useSyncExternalStore rather than in an effect:
   it gives a clean server snapshot (no hydration mismatch) without a
   setState-in-effect. There is nothing to subscribe to — the value only
   changes when this component writes it, and that path already re-renders
   through `status`. Defined at module scope so the identities stay stable. */
const subscribeToNothing = () => () => {};
const readRated = () => {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false; // private mode — just show the input
  }
};
const notRatedOnServer = () => false;

export function RatePortfolio() {
  const [value, setValue] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");
  const [announcement, setAnnouncement] = useState("");
  const startedAt = useRef(0);
  const thanksRef = useRef<HTMLDivElement>(null);
  const rated = useSyncExternalStore(subscribeToNothing, readRated, notRatedOnServer);

  useEffect(() => {
    // Belongs in an effect, not render — Date.now() in render trips
    // react-hooks/purity. Same pattern as ContactForm.
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    // The fieldset unmounts on success; without this, focus falls to <body>.
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === null) return;
    const parsed = ratingSchema.safeParse({
      rating: value,
      comment: comment.trim() || undefined,
    });
    if (!parsed.success) return;

    setStatus("submitting");
    try {
      const company = (
        e.currentTarget.elements.namedItem("company") as HTMLInputElement | null
      )?.value;
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: company ?? "",
          startedAt: startedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ v: value, at: Date.now() }),
        );
      } catch {
        /* not a security boundary, just a courtesy — fine if it fails */
      }
      setAnnouncement(`Thanks — you rated this ${value} out of 5.`);
      setStatus("sent");
    } catch {
      setAnnouncement("That didn't send. You can try again.");
      setStatus("failed");
    }
  };

  const showThanks = rated || status === "sent";

  return (
    <section
      id="rate"
      style={{ padding: "0 0 96px", maxWidth: 520, margin: "0 auto", textAlign: "center" }}
    >
      <hr className="hr" style={{ margin: "0 0 40px" }} />

      {/* Rendered up front, populated later. A live region inserted at the same
          moment as its content is announced unreliably. */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {showThanks ? (
        <div
          ref={thanksRef}
          tabIndex={-1}
          className="rate-enter"
          style={{ display: "flex", flexDirection: "column", gap: 8, outline: "none" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-accent)" }}>
            ✓ rated
          </span>
          <p style={{ margin: 0, fontSize: 15, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
            Thanks for the signal — it helps more than you&apos;d think.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <fieldset className="rate-fieldset">
            <legend>Rate my portfolio</legend>
            <div className="rate-row">
              {STARS.map((n) => (
                <span className="rate-item" key={n}>
                  <input
                    className="rate-input sr-only"
                    type="radio"
                    name="rating"
                    id={`rate-${n}`}
                    value={n}
                    checked={value === n}
                    onChange={() => setValue(n)}
                  />
                  <label
                    className="rate-star"
                    htmlFor={`rate-${n}`}
                    data-filled={value !== null && n <= value}
                  >
                    <StarIcon />
                    <span className="sr-only">{n === 1 ? "1 star" : `${n} stars`}</span>
                  </label>
                </span>
              ))}
            </div>
          </fieldset>

          {/* Mounted only once a star is picked. A CSS-collapsed field would stay
              in the accessibility tree, so a keyboard user would tab into an
              invisible input before choosing anything. */}
          {value !== null && (
            <div
              className="rate-enter"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 18,
                textAlign: "left",
              }}
            >
              <div className="field">
                <label htmlFor="rate-comment">Anything you&apos;d change? (optional)</label>
                <input
                  className="input"
                  id="rate-comment"
                  name="comment"
                  type="text"
                  maxLength={140}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === "submitting"}
                style={{ alignSelf: "flex-start", fontSize: 13 }}
              >
                {status === "submitting" ? "Sending…" : "Send rating"}
              </button>
              {status === "failed" && (
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-accent-300)",
                  }}
                >
                  {"// that didn't send — try again"}
                </p>
              )}
            </div>
          )}

          {/* Honeypot: hidden from people, tempting for bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />
        </form>
      )}
    </section>
  );
}
