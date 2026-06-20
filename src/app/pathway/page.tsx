import type { Metadata } from "next";
import Link from "next/link";
import { PATHWAY_COURSES } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Pathway — Open TeachStack",
  description:
    "Open TeachStack pathway overview, including OTS-101 Foundations and future courses in Google Workspace, Apps Script, GitHub, media, course sites, coding agents, and capstone studio.",
};

export default function PathwayPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 max-w-3xl">
        <span className="mb-4 inline-block rounded border border-accent/30 px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-accent">
          Open TeachStack Pathway
        </span>
        <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          One foundations course, then specialized tracks.
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          Open TeachStack is an open-source pathway for educators building
          curriculum systems with AI, automation, open resources, Google
          Workspace, and modern publishing workflows. OTS-101 is the required
          beginner course. Everything more technical moves into later pathway
          courses.
        </p>
      </header>

      <section className="mb-12 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
          Start Here
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-foreground/60">
          The first release should make OTS-101 smaller, clearer, and more
          shippable. Apps Script, GitHub, domains, AI coding agents, and live
          publishing remain part of the larger vision, but they are not
          required foundations outcomes.
        </p>
        <Link
          href="/course"
          className="inline-flex rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background no-underline transition-opacity hover:opacity-90"
        >
          View OTS-101 Foundations
        </Link>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
          Pathway Courses
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {PATHWAY_COURSES.map((course) => (
            <article key={course.code} className="py-6">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-accent">
                  {course.code}
                </span>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {course.title}
                </h3>
                <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-foreground/55">
                  {course.status}
                </span>
              </div>
              <dl className="grid gap-4 text-sm sm:grid-cols-[160px_1fr]">
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Level
                </dt>
                <dd className="text-foreground/70">{course.level}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Purpose
                </dt>
                <dd className="text-foreground/70">{course.purpose}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Prerequisites
                </dt>
                <dd className="text-foreground/70">{course.prerequisites}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Major Artifacts
                </dt>
                <dd className="text-foreground/70">
                  {course.majorArtifacts.join(", ")}
                </dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
