import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";
import { siteHost } from "@/lib/site";

export const alt =
  "Shua.dev - Joshua Klyne P. Pudadera. Research, verification and technical writing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time rather than committed as a PNG, so the card can't
// drift from lib/data/profile.
//
// Fonts are vendored (assets/fonts, OFL) and read from disk rather than fetched.
// Three constraints forced this: next/og ships no default font in Next 16 (with
// none, Satori dies on "Input buffer contains unsupported image format"),
// Google's css2 endpoint serves woff2 which Satori cannot parse, and Satori
// cannot read *variable* fonts either — the version google/fonts distributes
// throws "Cannot read properties of undefined (reading '256')". These are the
// static instances from the upstream project. Local files also keep the build
// offline and deterministic.
export default async function Image() {
  const dir = join(process.cwd(), "assets/fonts");
  const [regular, bold] = await Promise.all([
    readFile(join(dir, "SpaceGrotesk-Regular.ttf")),
    readFile(join(dir, "SpaceGrotesk-Bold.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#161826",
          backgroundImage:
            "radial-gradient(900px 600px at 8% 0%, rgba(145,132,217,0.22), transparent 60%), radial-gradient(700px 500px at 100% 30%, rgba(145,132,217,0.12), transparent 62%)",
          padding: "72px 80px",
          color: "#e9e9ed",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 13,
              border: "2px solid rgba(145,132,217,0.55)",
              backgroundColor: "rgba(145,132,217,0.12)",
              color: "#9184d9",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {">_"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#cfd3e5" }}>shua</div>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#9184d9", marginBottom: 18 }}>
            $ whoami
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 22,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.4,
              color: "#b2b6ca",
              maxWidth: 900,
            }}
          >
            Research, verification and technical writing. Claims checked against primary
            sources before they ship.
          </div>
        </div>

        {/* footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(233,233,237,0.16)",
            paddingTop: 26,
            fontSize: 24,
            color: "#75798c",
          }}
        >
          <div style={{ display: "flex" }}>{siteHost}</div>
          <div style={{ display: "flex", color: "#9184d9" }}>
            Published first-author researcher
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: regular, weight: 400 as const, style: "normal" as const },
        { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
      ],
    },
  );
}
