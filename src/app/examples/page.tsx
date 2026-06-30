import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "Examples — OpenTeachStack",
  description:
    "Example OpenTeachStack artifacts and Mini Course Content Packets that show what finished work can look like.",
};

export default function ExamplesPage() {
  return (
    <FieldGuidePage
      eyebrow="Examples"
      title="Proof beats explanation."
      subtitle="Templates help. Examples convince. These samples show what an OTS-101 Mini Course Content Packet can look like when it is small, sourced, teachable, honest about OTS-000 context, and ready to improve."
      breadcrumbs={[{ label: "Knowledge Base", href: "/kb" }]}
      meta={[
        { label: "Course", value: "OTS-101" },
        { label: "Artifact", value: "Mini Course Content Packet" },
        { label: "Mode", value: "Example shelf" },
      ]}
    >
      <ArticleBody>
        <Link
          href="/examples/robotics-course-content-packet"
          className="block rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            Sample Mini Course Content Packet
          </p>
          <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
            Intro Robotics: What Is a Robot?
          </h2>
          <p className="m-0 text-sm leading-relaxed text-slate">
            A review-ready example package with target mapping, student-facing
            lesson structure, prompt notes, source checks, assessment,
            publishing status, and revision log.
          </p>
        </Link>
      </ArticleBody>
    </FieldGuidePage>
  );
}


