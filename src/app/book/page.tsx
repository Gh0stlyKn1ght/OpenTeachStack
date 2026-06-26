import type { Metadata } from "next";
import Link from "next/link";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { BOOK_COURSE_CODE, BOOK_COURSE_PATH, METHOD_STEPS } from "@/lib/book";
import { COURSE_STRUCTURES } from "@/lib/courseStructures";
import { COURSE_SUBTITLE, COURSE_THESIS } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Course Book — OpenTeachStack",
  description:
    "Enter the OpenTeachStack course book: a field-manual interface for educator technology, AI, sources, and curriculum systems.",
};

export default function BookPage() {
  const dedicatedCourseSlugs = new Set(["ots-101", "ots-280"]);
  const pathwayCourses = COURSE_STRUCTURES.filter(
    (course) => !dedicatedCourseSlugs.has(course.slug),
  );

  return (
    <FieldGuidePage
      eyebrow="OpenTeachStack Book Mode"
      title="A course book for teachers becoming builders."
      subtitle={COURSE_THESIS}
      meta={[
        { label: "Mode", value: "Field manual" },
        { label: "Course path", value: BOOK_COURSE_PATH },
        { label: "Start", value: BOOK_COURSE_CODE },
        { label: "Evidence", value: "Why it matters" },
      ]}
    >
      <ArticleBody>
        <section className="book-spread">
          <div>
            <h2>The Field Manual</h2>
            <p>
              OpenTeachStack is organized as a digital course book, not a
              locked dashboard. The goal is to help educators understand the
              system behind modern teaching work: sources, AI, standards,
              verification, digital tools, delivery, and revision.
            </p>
            <p>{COURSE_SUBTITLE}</p>
          </div>
          <div className="book-callout">
            <p className="book-kicker">Signature method</p>
            <ol className="space-y-2">
              {METHOD_STEPS.map((step) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <h2>Enter {BOOK_COURSE_CODE}</h2>
          <p>
            Start with the active rebuild course. It teaches teachers how to
            use AI to create student-facing course content without publishing
            fake lessons, unsafe materials, or unverified resources.
          </p>
          <Link href="/book/ots-101" className="book-action">
            Open the OTS-101 course book
          </Link>
        </section>

        <section>
          <h2>Course Books</h2>
          <p>
            OTS-101 is the only active course rebuild. Every other pathway
            course is marked Coming Soon until OTS-101 proves the content
            model with real, teacher-useful lessons.
          </p>
          <div className="divide-y divide-border border-y border-border">
            <Link
              href="/book/ots-101"
              className="grid gap-3 py-4 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[6rem_1fr_8rem]"
            >
              <span className="font-mono text-sm text-accent">OTS-101</span>
              <span>
                <strong className="block text-foreground">
                  AI Course Content Foundations for Teachers
                </strong>
                <span className="mt-1 block text-sm text-foreground/55">
                  Course content modeling, AI prompting, verification,
                  student-facing lesson design, publishing, and revision.
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                Draft
              </span>
            </Link>
            {pathwayCourses.map((course) => (
              <div
                key={course.slug}
                className="grid gap-3 py-4 md:grid-cols-[6rem_1fr_8rem]"
              >
                <span className="font-mono text-sm text-accent">
                  {course.code}
                </span>
                <span>
                  <strong className="block text-foreground">
                    {course.title}
                  </strong>
                  <span className="mt-1 block text-sm text-foreground/55">
                    {course.thesis}
                  </span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                  Coming Soon
                </span>
              </div>
            ))}
            <div className="grid gap-3 py-4 md:grid-cols-[6rem_1fr_8rem]">
              <span className="font-mono text-sm text-accent">OTS-280</span>
              <span>
                <strong className="block text-foreground">
                  Cyber Safety for Educators
                </strong>
                <span className="mt-1 block text-sm text-foreground/55">
                  Threat modeling, account hygiene, identity separation,
                  phishing, device hardening, website audits, and incident
                  response.
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                Coming Soon
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2>The Transferable Skills Map</h2>
          <TransferableSkillsMap />
        </section>

        <section>
          <h2>Pathway Coverage</h2>
          <CourseSkillMatrix />
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}

