import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";

export const metadata: Metadata = {
  title: "Examples — Teaching Teachers",
  description:
    "Example Teaching Teachers artifacts and mini-units that show what finished work can look like.",
};

export default function ExamplesPage() {
  return (
    <FieldGuidePage
      eyebrow="Examples"
      title="Proof beats explanation."
      subtitle="Templates help. Examples convince. These samples show what an OTS-101 mini-unit package can look like when it is small, sourced, teachable, and ready to improve."
      breadcrumbs={[{ label: "Library", href: "/library" }]}
      meta={[
        { label: "Course", value: "OTS-101" },
        { label: "Artifact", value: "Mini-unit package" },
        { label: "Mode", value: "Example shelf" },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      <Link
        href="/examples/robotics-mini-unit"
        className="block rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Sample Mini-Unit
        </p>
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Intro Robotics: What Is a Robot?
        </h2>
        <p className="m-0 text-sm leading-relaxed text-slate">
          A complete example package with standards thinking, mini-unit map,
          lesson structure, prompt notes, source checks, assessment, delivery,
          and revision log.
        </p>
      </Link>
      </ArticleBody>
    </FieldGuidePage>
  );
}


