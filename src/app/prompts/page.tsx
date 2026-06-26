import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PromptLibraryClient from "@/components/prompts/PromptLibraryClient";
import {
  getPromptArtifacts,
  getPromptCategories,
  getPromptCourses,
  getPromptTags,
  TEACHER_PROMPTS,
} from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Prompt Library — OpenTeachStack",
  description:
    "Teacher-facing prompt library for planning, lesson building, verification, assessment, Workspace systems, safety, publishing, and capstone artifacts.",
};

export default function PromptsPage() {
  return (
    <FieldGuidePage
      eyebrow="Prompt Library"
      title="Prompts teachers can copy, verify, revise, and save."
      subtitle="These prompts are starting points for course artifacts, not final answers. Use them to plan curriculum, build classroom materials, check AI output, and document decisions across the OpenTeachStack pathway."
      breadcrumbs={[{ label: "Knowledge Base", href: "/kb" }]}
      meta={[
        { label: "Prompts", value: String(TEACHER_PROMPTS.length) },
        { label: "Categories", value: String(getPromptCategories().length) },
        { label: "Mode", value: "Teacher artifact support" },
      ]}
    >
      <ArticleBody>
        <section className="prose-academic mb-8">
          <h2>Before You Copy</h2>
          <p>
            Prompt output is a draft. Before students, families, colleagues, or
            the public see it, check the facts, revise the language, confirm
            source and copyright status, and make sure the result fits your
            classroom.
          </p>
          <ul>
            <li>Do not paste student-identifiable information.</li>
            <li>Do not paste private school data, credentials, or private links.</li>
            <li>Verify AI output before students see it.</li>
            <li>Check copyright, licensing, accessibility, and district policy.</li>
          </ul>
        </section>

        <PromptLibraryClient
          prompts={TEACHER_PROMPTS}
          categories={getPromptCategories()}
          courses={getPromptCourses()}
          artifacts={getPromptArtifacts()}
          tags={getPromptTags()}
        />

        <aside className="mt-10 border-t border-border pt-6">
          <p className="text-sm leading-relaxed text-foreground/55">
            Need a full course instead of a prompt? Start at{" "}
            <Link href="/book/ots-101">OTS-101</Link> or return to the{" "}
            <Link href="/kb">Knowledge Base</Link>.
          </p>
        </aside>
      </ArticleBody>
    </FieldGuidePage>
  );
}
