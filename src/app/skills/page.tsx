import type { Metadata } from "next";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "Transferable Skills — OpenTeachStack",
  description:
    "A map of transferable educator technology skills across the OpenTeachStack pathway.",
};

export default function SkillsPage() {
  return (
    <FieldGuidePage
      eyebrow="Transferable Skills Map"
      title="The tools change. The habits transfer."
      subtitle="OpenTeachStack connects course work to durable skills: source evaluation, documentation, AI literacy, automation thinking, cyber safety, and web publishing."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "View", value: "Skills map" },
        { label: "Course", value: "OTS-101" },
        { label: "Evidence", value: "Rationale" },
      ]}
    >
      <ArticleBody>
        <section>
          <h2>Skill Network</h2>
          <TransferableSkillsMap />
        </section>

        <section>
          <h2>Course Matrix</h2>
          <CourseSkillMatrix />
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}
