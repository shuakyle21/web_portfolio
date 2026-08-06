import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsCloud } from "@/components/SkillsCloud";
import { StackMarquee } from "@/components/StackMarquee";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Writing } from "@/components/Writing";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
        position: "relative",
        overflowX: "clip",
      }}
    >
      <div aria-hidden="true" className="bg-glow" />
      <div aria-hidden="true" className="bg-dots" />
      <Nav />
      <main
        id="main"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <span id="top" aria-hidden="true" />
        <Hero />
        <About />
        <SkillsCloud />
        <StackMarquee />
        <ProjectGrid />
        <Writing />
        <ExperienceTimeline />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
