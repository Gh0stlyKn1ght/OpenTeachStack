import { type ReactNode } from 'react';
import PreviousNext from './PreviousNext';

interface NavLink {
  title: string;
  href: string;
}

interface LabFrontmatter {
  title: string;
  module?: string;
  estimatedTime?: string;
  level?: string;
  outcomes?: string[];
}

interface LabLayoutProps {
  frontmatter: LabFrontmatter;
  children: ReactNode;
  previous?: NavLink;
  next?: NavLink;
}

export default function LabLayout({
  frontmatter,
  children,
  previous,
  next,
}: LabLayoutProps) {
  const { title, module: moduleName, estimatedTime, level, outcomes } = frontmatter;

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          {moduleName && (
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {moduleName}
            </p>
          )}
          <span className="rounded-sm bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
            Lab
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {title}
        </h1>

        {/* Metadata bar */}
        <div className="mt-4 flex items-center gap-4 border-t border-b border-border py-3 text-xs font-mono text-slate">
          {estimatedTime && (
            <span className="flex items-center gap-1.5 font-semibold text-foreground/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {estimatedTime}
            </span>
          )}
          {level && (
            <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 uppercase tracking-wider">
              {level}
            </span>
          )}
        </div>
      </header>

      {/* What You'll Build */}
      {outcomes && outcomes.length > 0 && (
        <section className="my-8 rounded-md border border-border bg-surface-alt/40 p-5">
          <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-widest text-foreground/70">
            What You&apos;ll Build
          </h3>
          <ul className="list-none space-y-2 pl-0">
            {outcomes.map((outcome, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 font-sans"
              >
                <span className="flex-shrink-0 text-accent mt-0.5" aria-hidden="true">
                  &bull;
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Main content */}
      <div className="prose-academic">{children}</div>

      {/* Navigation */}
      <PreviousNext previous={previous} next={next} />
    </article>
  );
}
