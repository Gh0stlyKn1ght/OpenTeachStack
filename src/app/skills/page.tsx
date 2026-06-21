import type { Metadata } from "next";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import CourseSkillMatrix from "@/components/book/CourseSkillMatrix";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";

export const metadata: Metadata = {
  title: "Transferable Skills — Teaching Teachers",
  description:
    "A map of transferable educator technology skills across the Teaching Teachers pathway.",
};

export default function SkillsPage() {
  return (
    <BookShell
      notes={[
        { label: "View", value: "Skills map" },
        { label: "Course", value: "OTS-101", href: "/book/ots-101" },
        { label: "Evidence", value: "Rationale", href: "/evidence" },
      ]}
      skills={["AI literacy", "automation thinking", "web publishing"]}
    >
      <BookChapterHeader
        eyebrow="Transferable Skills Map"
        title="The tools change. The habits transfer."
        subtitle="Teaching Teachers connects course work to durable skills: source evaluation, documentation, AI literacy, automation thinking, cyber safety, and web publishing."
      />

      <section>
        <h2>Skill Network</h2>
        <TransferableSkillsMap />
      </section>

      <section>
        <h2>Course Matrix</h2>
        <CourseSkillMatrix />
      </section>
    </BookShell>
  );
}
