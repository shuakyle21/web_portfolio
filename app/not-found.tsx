import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/icons";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist on shua.dev.",
};

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100dvh",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "clip",
      }}
    >
      <div aria-hidden="true" className="bg-glow" />
      <div aria-hidden="true" className="bg-dots" />

      <header
        style={{
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <nav
          className="nav"
          style={{ maxWidth: 880, margin: "0 auto", padding: "12px 24px" }}
          aria-label="Primary"
        >
          <Link
            className="nav-brand"
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}
          >
            <BrandMark />
            <span>shua</span>
          </Link>
          <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 13, textDecoration: "none" }}>
            ← cd ~
          </Link>
        </nav>
      </header>

      <main
        id="main"
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          maxWidth: 880,
          width: "100%",
          margin: "0 auto",
          padding: "96px 24px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--color-accent)",
              margin: "0 0 20px",
              letterSpacing: "0.02em",
            }}
          >
            $ cat .{"{"}pathname{"}"}
          </p>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              margin: "0 0 16px",
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            No such file or directory
          </h1>
          <p
            className="prose"
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              maxWidth: "58ch",
              color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
              textWrap: "pretty",
            }}
          >
            That page isn&apos;t here — either the link is wrong or it never existed.
            Nothing was moved. The work, the writing and the case study are all still
            where they were.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            <Link className="btn btn-primary btn-lift" href="/" style={{ padding: "11px 20px", fontSize: 14 }}>
              Back to portfolio
            </Link>
            <Link className="btn btn-secondary btn-lift" href="/#work" style={{ padding: "11px 20px", fontSize: 14 }}>
              View work
            </Link>
            <Link className="btn btn-secondary btn-lift" href="/#contact" style={{ padding: "11px 20px", fontSize: 14 }}>
              Get in touch
            </Link>
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-neutral-600)",
              marginTop: 28,
            }}
          >
            {"// error 404 — the only broken thing here, hopefully"}
          </p>
        </div>
      </main>

      <Footer right={{ href: "/", label: "← back to portfolio" }} />
    </div>
  );
}
