import type { Metadata } from "next";
import Link from "next/link";
import { PATHWAY_COURSES } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Courses — Teaching Teachers",
  description:
    "Teaching Teachers course index, starting with OTS-101 Foundations and continuing into specialized pathway courses.",
};

const ots101Links = [
  { label: "Book", href: "/book/ots-101" },
  { label: "Syllabus", href: "/syllabus" },
  { label: "Chapters", href: "/book/ots-101" },
  { label: "Knowledge Base", href: "/kb" },
  { label: "Prompt Anatomy", href: "/kb/ai-prompting/prompt-anatomy" },
  { label: "Verify AI Output", href: "/kb/ai-prompting/verify-ai-output" },
  { label: "One-Day Lesson Site", href: "/kb/lesson-building/build-a-one-day-lesson-site" },
  { label: "Templates", href: "/templates" },
  { label: "Prompts", href: "/prompts" },
  { label: "Safety Checks", href: "/safety" },
  { label: "Capstone", href: "/lessons/capstone-build-your-mini-course" },
  { label: "Release Packet", href: "/course/release" },
  { label: "Example", href: "/examples/robotics-mini-unit" },
];

export default function CoursesPage() {
  const [foundations, ...futureCourses] = PATHWAY_COURSES;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Courses
        </p>
        <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          Start with OTS-101. Let the technical tracks wait their turn.
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          Teaching Teachers is a pathway, but the first move is simple: build a
          usable mini-unit system before you chase code, domains, GitHub, or
          automation.
        </p>
      </header>

      <section className="mb-12 rounded-md border border-border bg-surface p-5">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-semibold text-accent">
            {foundations.code}
          </span>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {foundations.title}
          </h2>
          <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-foreground/55">
            {foundations.status}
          </span>
        </div>
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-slate">
          {foundations.purpose} You leave with practical artifacts: a workflow
          audit, prompt library, source checks, mini-unit map, assessment draft,
          delivery plan, and revision log.
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {ots101Links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/book/ots-101"
          className="inline-flex rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background no-underline transition-opacity hover:opacity-90"
        >
          Open OTS-101 Foundations
        </Link>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
          Later Pathway Courses
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {futureCourses.map((course) => {
            const courseHref =
              course.code === "OTS-280"
                ? "/book/ots-280"
                : `/book/${course.code.toLowerCase()}`;

            return (
            <article key={course.code} className="py-5">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-accent">
                  {course.code}
                </span>
                <Link
                  href={courseHref}
                  className="font-serif text-lg font-bold text-foreground no-underline hover:text-link"
                >
                  {course.title}
                </Link>
                <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-foreground/55">
                  {course.status}
                </span>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-slate">
                {course.purpose}
              </p>
              <p className="m-0 text-xs leading-relaxed text-foreground/45">
                Prerequisite: {course.prerequisites}
              </p>
            </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
