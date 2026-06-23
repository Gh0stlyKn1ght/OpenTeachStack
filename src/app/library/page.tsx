import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";

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
    desc: "A released safety track for identity hygiene, account protection, website audits, public repos, and incident response.",
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
    <FieldGuidePage
      eyebrow="Library"
      title="The support shelf for the pathway."
      subtitle="Prompts, templates, safety checks, field notes, sources, and licensing matter. They just should not all fight for space in the top nav."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Items", value: String(libraryItems.length) },
        { label: "Mode", value: "Artifact shelf" },
        { label: "Primary source", value: "Source Bank" },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      <div className="grid gap-4 md:grid-cols-2">
        {libraryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
          >
            <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
              {item.title}
            </h2>
            <p className="m-0 text-sm leading-relaxed text-slate">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}


