import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectLink = {
  href: string;
  label: string;
  /** Force the new-tab treatment. Defaults to true for anything that is not an
   *  in-app path, so GitHub and live dashboards open in a new tab and case
   *  studies navigate normally. */
  external?: boolean;
};

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The card's visual, as a node rather than an image URL. This portfolio mixes
   * real screenshots with terminal-style panels, and a stock photo standing in
   * for a project that has no screenshot would misrepresent the work.
   */
  media: React.ReactNode;
  title: string;
  description: string;
  links?: ProjectLink[];
  /** Status pill, rendered with the title. */
  badge?: React.ReactNode;
}

/**
 * Project card: media, title, description, links. Content that belongs to the
 * app rather than the card shell (outcome lines, tag rows) comes through
 * `children`.
 */
export function ProjectCard({
  className,
  media,
  title,
  description,
  links = [],
  badge,
  children,
  ...props
}: ProjectCardProps) {
  const cta =
    "group/button inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors duration-150 hover:underline";

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-card text-card-foreground shadow-[var(--shadow-sm)]",
        // transform + box-shadow only, short, ease-out — and the movement is
        // dropped outright when the visitor asks for reduced motion.
        "transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-md)] motion-safe:hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      <div className="aspect-video overflow-hidden">
        <div className="h-full w-full transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04]">
          {media}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-primary">
            {title}
          </h3>
          {badge}
        </div>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {children}

        {links.length > 0 && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
            {links.map((link) => {
              const external = link.external ?? !link.href.startsWith("/");
              const arrow = (
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1"
                />
              );
              return external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cta}
                >
                  {link.label}
                  {arrow}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={cta}>
                  {link.label}
                  {arrow}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
