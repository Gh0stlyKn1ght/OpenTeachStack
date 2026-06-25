import type { Metadata } from "next";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import EvidencePanel from "@/components/book/EvidencePanel";
import StandardsAssessmentMatrix from "@/components/book/StandardsAssessmentMatrix";
import SourcePanel from "@/components/book/SourcePanel";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "Evidence — OpenTeachStack",
  description:
    "Evidence and source-backed rationale for the OpenTeachStack pathway.",
};

export default function EvidencePage() {
  return (
    <FieldGuidePage
      eyebrow="Evidence Layer"
      title="Why this pathway matters."
      subtitle="Source-backed rationale, charts, and data for the pathway. The first version avoids fake numbers and points every claim back to source maintenance."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Rule", value: "No invented data" },
        { label: "Links", value: "Source bank" },
        { label: "Skills", value: "Transfer map" },
      ]}
    >
      <ArticleBody>
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
      </ArticleBody>
    </FieldGuidePage>
  );
}
