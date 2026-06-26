import type { Metadata } from "next";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { PATHWAY_COURSES } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Pathway — OpenTeachStack",
  description:
    "OpenTeachStack pathway overview, including released courses in foundations, Google Workspace, Apps Script, GitHub, media, cyber safety, course sites, coding agents, and capstone studio.",
};

export default function PathwayPage() {
  return (
    <FieldGuidePage
      eyebrow="OpenTeachStack Pathway"
      title="One foundations course, then specialized tracks."
      subtitle="OpenTeachStack is an open-source pathway for educators building curriculum systems with AI, automation, open resources, Google Workspace, and modern publishing workflows."
      meta={[
        { label: "Start", value: "OTS-101 Foundations" },
        { label: "Tracks", value: String(PATHWAY_COURSES.length) },
      ]}
    >
      <section className="mb-12 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Start Here
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-foreground/60">
          OTS-101 keeps the first step small: a verified mini-unit system with
          sources, prompts, assessment, delivery, and revision evidence. Apps
          Script, GitHub, domains, AI coding agents, and live publishing are
          released as specialized tracks, but they are not required foundations
          outcomes.
        </p>
        <Link
          href="/book/ots-101"
          className="inline-flex rounded-md bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
        >
          View OTS-101 Foundations
        </Link>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          Pathway Courses
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {PATHWAY_COURSES.map((course) => (
            <article key={course.code} className="py-6">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-accent">
                  {course.code}
                </span>
                {course.status === "Coming Soon" ? (
                  <span className="font-heading text-xl font-bold text-foreground/70">
                    {course.title}
                  </span>
                ) : (
                  <Link
                    href={
                      course.code === "OTS-101"
                        ? "/book/ots-101"
                        : course.code === "OTS-280"
                          ? "/book/ots-280"
                          : `/book/${course.code.toLowerCase()}`
                    }
                    className="font-heading text-xl font-bold text-foreground no-underline hover:text-link"
                  >
                    {course.title}
                  </Link>
                )}
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
    </FieldGuidePage>
  );
}


