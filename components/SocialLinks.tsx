import { links } from "@/lib/data/links";
import { GitHubIcon, LinkedInIcon, SubstackIcon, GlobeIcon } from "./icons";

export function SocialLinks() {
  const items = [
    { href: links.github, label: "GitHub", icon: <GitHubIcon /> },
    { href: links.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: links.substack, label: "Substack", icon: <SubstackIcon /> },
    { href: links.doi, label: "Published paper (DOI)", icon: <GlobeIcon /> },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      {items.map((it) => (
        <a
          key={it.label}
          className="icon-social"
          href={it.href}
          target="_blank"
          rel="noreferrer"
          aria-label={it.label}
          title={it.label}
        >
          {it.icon}
        </a>
      ))}
    </div>
  );
}
