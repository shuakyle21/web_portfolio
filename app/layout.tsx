import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import { profile } from "@/lib/data/profile";
import { links } from "@/lib/data/links";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shua.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shua.dev — Research, Verification & Technical Writing",
    template: "%s — Shua.dev",
  },
  description:
    "Published first-author researcher and AI-assisted technical writer. " +
    "Claims verified against primary sources before they ship.",
  keywords: [
    "developer portfolio",
    "technical writer portfolio",
    "AI research portfolio",
    "claude code portfolio",
    "fact-checking",
    "verification",
  ],
  openGraph: { type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: siteUrl },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  jobTitle: "Researcher, Technical Writer & Backend AI Intern",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Banga",
    addressRegion: "South Cotabato",
    addressCountry: "PH",
  },
  sameAs: [links.github, links.linkedin, links.substack, links.doi],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
