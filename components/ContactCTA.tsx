import { profile } from "@/lib/data/profile";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import { CopyEmailButton } from "./CopyEmailButton";
import { ContactForm } from "./ContactForm";

export function ContactCTA() {
  return (
    <section id="contact" style={{ padding: "112px 0 104px", scrollMarginTop: 90 }}>
      <h6 className="section-kicker">
        $ mail -s &quot;hello&quot; {profile.email}
      </h6>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div>
          <Reveal style={{ fontSize: "clamp(28px,4vw,38px)", marginBottom: 16 }}>
            Interested in working together?
          </Reveal>
          <p
            className="prose"
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
              maxWidth: "48ch",
              textWrap: "pretty",
            }}
          >
            Open to full-time work in research, verification and technical writing, and
            to freelance or consulting engagements where claims need checking before
            they ship. Backend AI and documentation work included.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
              margin: "22px 0 18px",
            }}
          >
            <a
              href={`mailto:${profile.email}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(15px,2.2vw,21px)",
                textDecoration: "none",
                borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 45%, transparent)",
                paddingBottom: 4,
              }}
            >
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-neutral-500)", margin: "0 0 4px" }}>
            {profile.phone}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-neutral-500)", margin: 0 }}>
            {"// replies within one business day"}
          </p>
          <div style={{ marginTop: 26 }}>
            <SocialLinks />
          </div>
        </div>
        <div className="card elev-sm" style={{ padding: 24, gap: 16 }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
