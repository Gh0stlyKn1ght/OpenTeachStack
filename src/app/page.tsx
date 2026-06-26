import type { Metadata } from "next";
import Link from "next/link";
import { PATHWAY_COURSES } from "@/lib/metadata";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "OpenTeachStack — Course Pathway for Educators",
  description:
    "OpenTeachStack is a course pathway and field guide for educators entering the tech world.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto w-[min(100%-1.5rem,78rem)] py-10">
      <section className="border-b border-border pb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Course Pathway
        </p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="max-w-5xl font-heading text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl">
              OpenTeachStack Pathway
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/68">
              A sequenced field guide for educators entering the tech world.
              Start with foundations, then move into the teacher technology
              system you need next.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/58">
              Start with OTS-101. Use the Knowledge Base when you need prompts,
              templates, source checks, safety guidance, or quick workflows.
            </p>
            <p className="mt-4 max-w-3xl rounded-sm border border-accent/30 bg-surface-alt/35 px-4 py-3 text-sm leading-relaxed text-foreground/66">
              Video walkthroughs and additional supporting content are coming
              soon. The course book and Knowledge Base are the current source
              of truth while the media layer is built out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/book/ots-101" className="book-action">
              Start OTS-101
            </Link>
            <Link href="/kb" className="book-action-secondary">
              Open Knowledge Base
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10" aria-labelledby="course-pathway-heading">
        <div className="mb-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Courses
          </p>
          <h2
            id="course-pathway-heading"
            className="m-0 font-heading text-3xl font-bold text-foreground"
          >
            Choose your next teacher technology system.
          </h2>
        </div>

        <ol className="border-y border-border">
          {PATHWAY_COURSES.map((course, index) => {
            const sequence = String(index + 1).padStart(2, "0");
            const isFirstCourse = course.code === "OTS-101";
            const isComingSoon = course.status === "Coming Soon";

            return (
              <li key={course.code} className="list-none">
                <article className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[4rem_minmax(0,1fr)]">
                  <div className="font-mono text-lg font-semibold text-accent sm:pt-1">
                    {sequence}
                  </div>
                  <div className="border-l border-border pl-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-sm font-semibold text-accent">
                        {course.code}
                      </span>
                      <h3 className="m-0 font-heading text-xl font-bold text-foreground">
                        {course.title}
                      </h3>
                    </div>
                    <p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-foreground/66">
                      {course.purpose}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground/58">
                      <span>Level: {course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span>Status: {course.status}</span>
                    </div>
                    <p className="mb-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
                      <span className="font-mono uppercase tracking-wider text-foreground/38">
                        Outcome:
                      </span>{" "}
                      {course.majorArtifacts.join(", ")}
                    </p>
                    {isComingSoon ? (
                      <span className="book-action-secondary cursor-not-allowed opacity-55">
                        Coming soon
                      </span>
                    ) : (
                      <Link href="/book/ots-101" className="book-action">
                        {isFirstCourse ? "Start here" : "Open course"}
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        className="border-t border-border py-8"
        aria-labelledby="support-heading"
      >
        <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:items-start">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Support
            </p>
            <h2
              id="support-heading"
              className="m-0 font-heading text-2xl font-bold text-foreground"
            >
              Field manual modes
            </h2>
          </div>
          <ul className="grid gap-3 p-0 sm:grid-cols-2">
            <li className="list-none border-l-2 border-accent pl-4">
              <Link
                href="/kb"
                className="font-semibold text-link no-underline hover:underline"
              >
                Knowledge Base
              </Link>
              <p className="mb-0 mt-1 text-sm text-foreground/58">
                Find prompts, templates, source checks, safety guidance,
                examples, tools, and reusable workflows.
              </p>
            </li>
            <li className="list-none border-l-2 border-accent pl-4">
              <Link
                href="/kb/source-bank"
                className="font-semibold text-link no-underline hover:underline"
              >
                Source Bank
              </Link>
              <p className="mb-0 mt-1 text-sm text-foreground/58">
                Use verified sources, official docs, and resource notes before
                placing links or claims in front of students.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}


