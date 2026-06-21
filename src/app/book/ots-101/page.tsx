import type { Metadata } from "next";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import CourseTOC from "@/components/book/CourseTOC";
import EvidencePanel from "@/components/book/EvidencePanel";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import { BOOK_CHAPTERS } from "@/lib/book";
import { COURSE_CODE, COURSE_SUBTITLE, COURSE_THESIS, COURSE_TITLE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "OTS-101 Course Book — Teaching Teachers",
  description:
    "Book-style table of contents for OTS-101 Teaching Teachers Foundations.",
};

export default function Ots101BookPage() {
  const firstChapter = BOOK_CHAPTERS[0];

  return (
    <BookShell
      notes={[
        { label: "Course", value: COURSE_CODE },
        { label: "Level", value: "Beginner" },
        { label: "Final artifact", value: "Verified mini-unit system" },
        { label: "Source bank", value: "Verified links", href: "/library/source-bank" },
      ]}
      skills={["prompting", "standards", "resource literacy", "assessment"]}
    >
      <BookChapterHeader
        eyebrow={`${COURSE_CODE} Course Book`}
        title={COURSE_TITLE}
        subtitle={COURSE_THESIS}
      />

      <section className="book-spread">
        <div>
          <h2>Course Thesis</h2>
          <p>{COURSE_SUBTITLE}</p>
          <p>
            OTS-101 is the starting point for teachers who want more control
            over curriculum systems, AI use, sources, templates, assessment,
            delivery, and revision.
          </p>
        </div>
        <ArtifactCard
          title="Verified mini-unit system"
          description="The course finishes with a compact curriculum package: standards, sources, prompts, assessment, delivery plan, and revision evidence."
        />
      </section>

      <section>
        <h2>Chapter Table of Contents</h2>
        <CourseTOC />
      </section>

      <section>
        <h2>What You Will Build</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {BOOK_CHAPTERS.slice(0, 6).map((chapter) => (
            <ArtifactCard
              key={chapter.slug}
              title={chapter.buildArtifact}
              description={chapter.evidence}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Why This Matters</h2>
        <EvidencePanel />
      </section>

      <section>
        <h2>Transferable Skills</h2>
        <TransferableSkillsMap />
      </section>

      <section>
        <Link href={firstChapter.href} className="book-action">
          Start chapter {firstChapter.number}: {firstChapter.title}
        </Link>
      </section>
    </BookShell>
  );
}
