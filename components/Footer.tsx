export function Footer({
  left = "© 2026 Joshua Klyne P. Pudadera · Banga, South Cotabato",
  right = { href: "#top", label: "back to top ↑" },
}: {
  left?: string;
  right?: { href: string; label: string };
}) {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--color-divider)",
        background: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "26px 24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--color-neutral-600)",
        }}
      >
        <span>{left}</span>
        <a href={right.href} style={{ textDecoration: "none" }}>
          {right.label}
        </a>
      </div>
    </footer>
  );
}
