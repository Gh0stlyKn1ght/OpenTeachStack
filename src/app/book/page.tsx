import type { Metadata } from "next";
import Link from "next/link";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import { BOOK_COURSE_CODE, BOOK_COURSE_PATH, METHOD_STEPS } from "@/lib/book";
import { COURSE_STRUCTURES } from "@/lib/courseStructures";
import { COURSE_SUBTITLE, COURSE_THESIS } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Course Book — Teaching Teachers",
  description:
    "Enter the Teaching Teachers course book: a field-manual interface for educator technology, AI, sources, and curriculum systems.",
};

export default function BookPage() {
  return (
    <BookShell
      notes={[
        { label: "Mode", value: "Field manual" },
        { label: "Course path", value: BOOK_COURSE_PATH },
        { label: "Start", value: BOOK_COURSE_CODE, href: "/book/ots-101" },
        { label: "Evidence", value: "Why it matters", href: "/evidence" },
      ]}
      skills={["AI literacy", "source evaluation", "documentation"]}
    >
      <BookChapterHeader
        eyebrow="Teaching Teachers Book Mode"
        title="A course book for teachers becoming builders."
        subtitle={COURSE_THESIS}
      />

      <section className="book-spread">
        <div>
          <h2>The Field Manual</h2>
          <p>
            Teaching Teachers is organized as a digital course book, not a
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
          Start with the foundations course. It turns scattered teacher work
          into a repeatable curriculum workflow and ends with a verified
          mini-unit system.
        </p>
        <Link href="/book/ots-101" className="book-action">
          Open the OTS-101 course book
        </Link>
      </section>

      <section>
        <h2>Course Books</h2>
        <div className="divide-y divide-border border-y border-border">
          <Link
            href="/book/ots-101"
            className="grid gap-3 py-4 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[6rem_1fr_8rem]"
          >
            <span className="font-mono text-sm text-accent">OTS-101</span>
            <span>
              <strong className="block text-foreground">
                Teaching Teachers Foundations
              </strong>
              <span className="mt-1 block text-sm text-foreground/55">
                Prompting, standards, source verification, assessment,
                delivery, and mini-unit systems.
              </span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
              Build first
            </span>
          </Link>
          {COURSE_STRUCTURES.map((course) => (
            <Link
              key={course.slug}
              href={`/book/${course.slug}`}
              className="grid gap-3 py-4 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[6rem_1fr_8rem]"
            >
              <span className="font-mono text-sm text-accent">
                {course.code}
              </span>
              <span>
                <strong className="block text-foreground">{course.title}</strong>
                <span className="mt-1 block text-sm text-foreground/55">
                  {course.thesis}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                {course.status}
              </span>
            </Link>
          ))}
          <Link
            href="/book/ots-280"
            className="grid gap-3 py-4 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[6rem_1fr_8rem]"
          >
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
              Future
            </span>
          </Link>
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
    </BookShell>
  );
}
