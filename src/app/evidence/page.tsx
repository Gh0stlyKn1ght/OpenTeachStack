import type { Metadata } from "next";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import EvidencePanel from "@/components/book/EvidencePanel";
import StandardsAssessmentMatrix from "@/components/book/StandardsAssessmentMatrix";
import SourcePanel from "@/components/book/SourcePanel";

export const metadata: Metadata = {
  title: "Evidence — Teaching Teachers",
  description:
    "Evidence and source-backed rationale for the Teaching Teachers pathway.",
};

export default function EvidencePage() {
  return (
    <BookShell
      notes={[
        { label: "Rule", value: "No invented data" },
        { label: "Links", value: "Source bank", href: "/library/source-bank" },
        { label: "Skills", value: "Transfer map", href: "/skills" },
      ]}
      skills={["source checking", "AI verification", "cyber safety"]}
    >
      <BookChapterHeader
        eyebrow="Evidence Layer"
        title="Why this pathway matters."
        subtitle="This page is the place for source-backed rationale, charts, and data. The first version avoids fake numbers and points every claim back to source maintenance."
      />

      <SourcePanel />

      <section>
        <h2>Evidence Topics</h2>
        <EvidencePanel />
      </section>

      <section>
        <h2>Course-to-Skill Coverage</h2>
        <CourseSkillMatrix />
      </section>

      <section>
        <h2>OTS-101 Standards-to-Assessment Traceability</h2>
        <StandardsAssessmentMatrix />
      </section>
    </BookShell>
  );
}
