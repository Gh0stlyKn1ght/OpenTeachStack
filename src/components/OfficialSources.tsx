import GitHubIcon from "./GitHubIcon";
import { appSources, officialDocSources } from "@/lib/officialSources";
import type { ReactNode } from "react";

function isExternal(url: string) {
  return url.startsWith("http");
}

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = isExternal(href);
  const isGitHub = href.includes("github.com");

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-link no-underline hover:underline"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {isGitHub && <GitHubIcon className="h-4 w-4" title="" />}
      {children}
    </a>
  );
}

export function OfficialCourseSources() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {officialDocSources.map((course) => (
        <article key={course.course} className="py-5">
          <div className="mb-3 flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-sm font-semibold text-accent">
              {course.course}
            </span>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {course.title}
            </h3>
          </div>
          <ul className="space-y-3">
            {course.sources.map((source) => (
              <li key={`${course.course}-${source.label}`}>
                <SourceLink href={source.url}>{source.label}</SourceLink>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  {source.use}
                </p>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function SoftwareSourceInventory() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {appSources.map((app) => (
        <article
          key={app.name}
          className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.75fr)]"
        >
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="font-serif text-base font-bold text-foreground">
                {app.name}
              </span>
              <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 font-mono text-[0.65rem] uppercase text-slate">
                {app.course}
              </span>
              <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase text-foreground/50">
                {app.category}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate">{app.use}</p>
          </div>

          <div className="flex flex-wrap items-start gap-x-4 gap-y-2 sm:justify-end">
            <SourceLink href={app.appUrl}>Open app</SourceLink>
            <SourceLink href={app.documentationUrl}>
              {app.documentationLabel}
            </SourceLink>
          </div>
        </article>
      ))}
    </div>
  );
}
