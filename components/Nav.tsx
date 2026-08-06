"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "./icons";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Capabilities" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Projects" },
  { id: "writing", label: "Publications" },
  { id: "experience", label: "Experience" },
];

export function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // MotionHighlight equivalent: the indicator slides under the active link.
  const moveHighlight = useCallback((id: string | null) => {
    const hl = hlRef.current;
    const wrap = wrapRef.current;
    if (!hl || !wrap) return;
    const active = id
      ? wrap.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`)
      : null;
    if (!active) {
      hl.style.opacity = "0";
      return;
    }
    const a = active.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    hl.style.transform = `translate3d(${a.left - w.left}px,0,0) scaleX(${a.width})`;
    hl.style.opacity = "1";
  }, []);

  // Scroll spy: resolve the active section from a line just under the sticky header.
  useEffect(() => {
    let queued = false;
    let current: string | null = null;
    const resolve = () => {
      queued = false;
      const line = 132;
      let next: string | null = null;
      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      });
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        next = NAV_LINKS[NAV_LINKS.length - 1].id;
      }
      if (next === current) return;
      current = next;
      setActiveId(next);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(resolve);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    resolve();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    moveHighlight(activeId);
  }, [activeId, moveHighlight]);

  useEffect(() => {
    const onResize = () => moveHighlight(activeId);
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, moveHighlight]);

  // Drawer: Escape closes, focus trapped while open, focus returns to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const focusables = [
        burgerRef.current,
        ...Array.from(drawer.querySelectorAll<HTMLElement>("a")),
      ].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, #161826 88%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <nav
        className="nav"
        style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 24px" }}
        aria-label="Primary"
      >
        <a
          className="nav-brand"
          href="#top"
          style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}
        >
          <BrandMark />
          <span>shua</span>
        </a>
        <div
          ref={wrapRef}
          className="nav-links"
          style={{ position: "relative", alignItems: "center", gap: 22 }}
        >
          <span
            ref={hlRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -6,
              left: 0,
              width: 1,
              height: 2,
              borderRadius: 2,
              background: "var(--color-accent)",
              opacity: 0,
              transformOrigin: "left center",
              transform: "translate3d(0,0,0) scaleX(0)",
              transition:
                "transform 260ms var(--ease-nav), opacity 180ms ease",
            }}
          />
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a className="btn btn-primary" href="#contact" style={{ fontSize: 13 }}>
            Contact
          </a>
        </div>
        <button
          ref={burgerRef}
          className="btn btn-secondary btn-icon nav-burger"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, lineHeight: 1 }}>
            {menuOpen ? "✕" : "≡"}
          </span>
        </button>
      </nav>
      <div
        ref={drawerRef}
        className="nav-drawer"
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          padding: "8px 24px 18px",
          borderTop: "1px solid var(--color-divider)",
        }}
      >
        {NAV_LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMenuOpen(false)}
            style={{ padding: "11px 0", textDecoration: "none", color: "inherit", fontSize: 15 }}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{ padding: "11px 0", textDecoration: "none", color: "var(--color-accent)", fontSize: 15 }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
