import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library — Teaching Teachers",
  description:
    "Teaching Teachers library hub for prompts, templates, safety, field notes, official sources, licensing, and the one-day lesson workflow.",
};

const libraryItems = [
  {
    title: "Source Bank",
    href: "/library/source-bank",
    desc: "Verified free tools, course platforms, official links, account notes, privacy cautions, and teacher setup guidance.",
  },
  {
    title: "Prompt Library",
    href: "/prompts",
    desc: "Reusable prompts for planning, standards, rubrics, verification, and teacher voice.",
  },
  {
    title: "Template Library",
    href: "/templates",
    desc: "Blank and example artifacts teachers can use while building a mini-unit system.",
  },
  {
    title: "Safety Guide",
    href: "/safety",
    desc: "Privacy, copyright, AI verification, source checks, accessibility, and classroom readiness.",
  },
  {
    title: "OTS-280 Cyber Safety",
    href: "/courses/ots-280",
    desc: "A future safety track for identity hygiene, account protection, website audits, public repos, and incident response.",
  },
  {
    title: "Field Notes",
    href: "/field-notes",
    desc: "The human side of the project: what worked, what broke, and what was built under pressure.",
  },
  {
    title: "Examples",
    href: "/examples",
    desc: "Finished-enough sample artifacts, including a complete robotics mini-unit package.",
  },
  {
    title: "Official Sources",
    href: "/sources",
    desc: "Official documentation and source links for software, apps, AI tools, and pathway courses.",
  },
  {
    title: "Resource Library",
    href: "/resources",
    desc: "Curated tools, source links, documentation, OER, and supporting resources.",
  },
  {
    title: "One-Day Lesson Site Workflow",
    href: "/lessons/one-day-lesson-site-workflow",
    desc: "Module 09 workflow for source-backed lesson building when tomorrow's lesson has to exist tonight.",
  },
  {
    title: "Open Source and Licensing",
    href: "/open-source",
    desc: "How the project is licensed, how to contribute, and how reuse works.",
  },
];

export default function LibraryPage() {
  return (
    <div className="mx-auto w-[min(100%-1.5rem,96rem)] px-3 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Library
        </p>
        <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          The support shelf for the pathway.
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          Prompts, templates, safety checks, field notes, sources, and licensing
          matter. They just should not all fight for space in the top nav.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {libraryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
          >
            <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
              {item.title}
            </h2>
            <p className="m-0 text-sm leading-relaxed text-slate">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

