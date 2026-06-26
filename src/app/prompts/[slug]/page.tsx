import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";
import { getPromptBySlug, TEACHER_PROMPTS } from "@/lib/prompts";

interface PromptDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TEACHER_PROMPTS.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({
  params,
}: PromptDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found — OpenTeachStack",
    };
  }

  return {
    title: `${prompt.title} — Prompt Library`,
    description: prompt.useCase,
  };
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) notFound();

  return (
    <FieldGuidePage
      eyebrow={prompt.category}
      title={prompt.title}
      subtitle={prompt.useCase}
      breadcrumbs={[
        { label: "Knowledge Base", href: "/kb" },
        { label: "Prompt Library", href: "/prompts" },
      ]}
      meta={[
        { label: "Course", value: prompt.relatedCourses.join(", ") },
        { label: "Artifact", value: prompt.relatedArtifacts.join(", ") },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2>Teacher Context Needed</h2>
            <ul>
              {prompt.teacherContextNeeded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Expected Output</h2>
            <p>{prompt.expectedOutput}</p>
          </div>
        </section>

        <section>
          <h2>Copy-Ready Prompt</h2>
          <div className="overflow-x-auto rounded-md border border-border bg-surface-alt/50">
            <pre className="whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed text-foreground/80">
              {prompt.prompt}
            </pre>
          </div>
        </section>

        <section>
          <h2>Verification Checklist</h2>
          <ul>
            {prompt.verificationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Revision Step</h2>
          <p>{prompt.revisionStep}</p>
        </section>

        <section>
          <h2>Safety and Privacy Warning</h2>
          <p>{prompt.safetyPrivacyNote}</p>
        </section>

        <section>
          <h2>Related Course Sections</h2>
          <p>
            Start from the related course book, then attach the prompt output to
            the listed artifact after teacher review.
          </p>
          <ul>
            {prompt.relatedCourses.map((course) => (
              <li key={course}>
                <Link href={`/book/${course.toLowerCase()}`}>{course}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Tags</h2>
          <p>{prompt.tags.join(", ")}</p>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}
