import type { Metadata } from "next";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import CyberSafetyBookShell from "@/components/book/CyberSafetyBookShell";
import CyberSafetyTOC from "@/components/book/CyberSafetyTOC";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
  CYBER_COURSE_PATH,
} from "@/lib/cyberSafety";

export const metadata: Metadata = {
  title: `${CYBER_COURSE_CODE} Course Book — Teaching Teachers`,
  description:
    "OTS-280 book-style table of contents for Cyber Safety for Educators.",
};

export default function Ots280BookPage() {
  const firstChapter = CYBER_BOOK_CHAPTERS[0];

  return (
    <CyberSafetyBookShell
      notes={[
        { label: "Course path", value: CYBER_COURSE_PATH },
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Level", value: "Intermediate" },
        { label: "Prerequisite", value: "OTS-101", href: "/book/ots-101" },
        { label: "Final artifact", value: "Incident response plan" },
        { label: "Field note", value: "Digital self-defense", href: "/field-notes/teachers-need-digital-self-defense" },
      ]}
      skills={["risk assessment", "account management", "privacy", "incident handling"]}
    >
      <BookChapterHeader
        eyebrow={`${CYBER_COURSE_CODE} Course Book`}
        title="Cyber Safety for Educators"
        subtitle="Identity, privacy, accounts, and website safety for teachers who are becoming more visible online."
      />

      <section className="book-spread">
        <div>
          <h2>Course Thesis</h2>
          <p>
            You are a teacher in a public-facing job. You deserve basic digital
            self-defense. This course is not about paranoia or hacker cosplay.
            It is basic maintenance for being an educator online.
          </p>
          <p>
            {CYBER_COURSE_CODE} covers threat modeling, account hygiene, identity
            separation, phishing, social media risk, network safety, device
            hardening, website audits, repo exposure, and incident response.
          </p>
        </div>
        <ArtifactCard
          title="Complete cyber safety portfolio"
          description="Ten practical artifacts: risk map, MFA checklist, identity map, phishing checklist, profile audit, connection checklist, device checklist, website audit, repo check, and incident response plan."
        />
      </section>

      <section>
        <h2>Where This Fits</h2>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-foreground/58">
          OTS-280 belongs after AI Media and Lesson Delivery and before Teacher
          Course Sites, AI Coding Agents, public GitHub publishing, and
          teacher-creator workflows. It is not required for OTS-101 — it is a
          safety track for teachers who are publishing, sharing, or becoming
          more visible online.
        </p>
      </section>

      <section>
        <h2>Chapter Table of Contents</h2>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-foreground/58">
          Each chapter tackles one practical safety topic. You read the
          sections, build an artifact, and complete a checkpoint before moving
          on.
        </p>
        <CyberSafetyTOC />
      </section>

      <section>
        <h2>What You Will Build</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CYBER_BOOK_CHAPTERS.slice(0, 6).map((chapter) => (
            <ArtifactCard
              key={chapter.slug}
              title={chapter.buildArtifact}
              description={chapter.evidence}
            />
          ))}
        </div>
      </section>

      <section>
        <Link href={firstChapter.href} className="book-action">
          Start chapter {firstChapter.number}: {firstChapter.title}
        </Link>
      </section>
    </CyberSafetyBookShell>
  );
}
