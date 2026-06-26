import type { Metadata } from "next";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import GitHubIcon from "@/components/GitHubIcon";
import { REPOSITORY_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Resource Library — OpenTeachStack",
  description:
    "A lightweight index of official documentation, tools, templates, prompts, and source lists for OpenTeachStack.",
};

const resourceHubs = [
  {
    title: "Source Bank",
    href: "/kb/source-bank",
    desc: "Verified free and education-friendly tools, course platforms, learning resources, account notes, and safety cautions.",
    badge: "Bank",
  },
  {
    title: "Official Sources",
    href: "/sources",
    desc: "The source-of-truth documentation audit for apps, platforms, APIs, AI tools, and pathway courses.",
    badge: "Docs",
  },
  {
    title: "Prompt Library",
    href: "/prompts",
    desc: "Reusable prompts for standards, lessons, rubrics, verification, teacher voice, and cyber safety.",
    badge: "Prompts",
  },
  {
    title: "Template Library",
    href: "/templates",
    desc: "Blank and example artifacts for audits, mini-units, source checks, assessments, and delivery plans.",
    badge: "Templates",
  },
  {
    title: "Safety Guide",
    href: "/safety",
    desc: "Privacy, AI verification, copyright, accessibility, and classroom-readiness rules.",
    badge: "Safety",
  },
  {
    title: "Examples",
    href: "/examples",
    desc: "Finished-enough model artifacts, including the sample robotics mini-unit.",
    badge: "Models",
  },
  {
    title: "Field Notes",
    href: "/field-notes",
    desc: "Practical notes from building curriculum systems under real classroom pressure.",
    badge: "Notes",
  },
  {
    title: "Build Notes",
    href: "/blog",
    desc: "Reviewed build logs and mistake notes from creating OpenTeachStack. AI drafts stay hidden until human review.",
    badge: "Blog",
  },
  {
    title: "JC's Blog",
    href: "/blog",
    desc: "Founder essays, teacher-builder reflections, and the human side of OpenTeachStack.",
    badge: "Author",
  },
];

const officialFirstRules = [
  "Use official documentation for software behavior before relying on tutorials.",
  "Treat AI output as a draft, not a source.",
  "Keep source links attached to prompts, lesson notes, and templates.",
  "Verify licensing, accessibility, privacy, and standards claims before teaching.",
];

export default function ResourcesPage() {
  return (
    <FieldGuidePage
      eyebrow="Resource Library"
      title="Start with sources. Build with reusable tools."
      subtitle="A lightweight index for official documentation, prompts, templates, safety guidance, examples, and field notes without crowding the teacher workflow."
      meta={[
        { label: "Hubs", value: String(resourceHubs.length) },
        { label: "Rule", value: "Official sources first" },
      ]}
    >
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        {resourceHubs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="m-0 font-heading text-xl font-bold text-foreground">
                {item.title}
              </h2>
              <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/50">
                {item.badge}
              </span>
            </div>
            <p className="m-0 text-sm leading-relaxed text-slate">
              {item.desc}
            </p>
          </Link>
        ))}
      </section>

      <section className="mb-12 grid gap-6 rounded-md border border-border bg-surface-alt/30 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
            Official-first resource rule
          </h2>
          <ul className="space-y-2 pl-0">
            {officialFirstRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/kb/resources"
          className="inline-flex rounded-md bg-[var(--color-text)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
        >
          Open Sources
        </Link>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Project Repository
        </h2>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate">
          The public repository contains the source code, course content,
          templates, roadmap, and project documentation.
        </p>
        <a
          href={REPOSITORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-link no-underline hover:underline"
        >
          <GitHubIcon className="h-4 w-4" title="" />
          Open repository
        </a>
      </section>
    </FieldGuidePage>
  );
}




