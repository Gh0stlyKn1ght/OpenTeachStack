import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import { COURSE_TITLE } from "@/lib/metadata";
import FieldNoteLayout from "@/components/FieldNoteLayout";
import TableOfContents from "@/components/TableOfContents";
import MermaidBlock from "@/components/MermaidBlock";
import MDXPre from "@/components/MDXPre";
import VideoEmbed from "@/components/VideoEmbed";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import RealityCheck from "@/components/RealityCheck";
import BuildTask from "@/components/BuildTask";
import {
  AICourseContentWorkflowVisual,
  ChecklistBlock,
  ComparisonBlock,
  ConceptCard,
  CourseTruthStackVisual,
  FakeCourseTrapVisual,
  FrameworkBlock,
  SourceTruthExportVisual,
  TakeawayStrip,
  TiredTeacherTestVisual,
  WorkflowBlock,
} from "@/components/InstructionalBlocks";
const mdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
  FrameworkBlock,
  ConceptCard,
  TakeawayStrip,
  ComparisonBlock,
  WorkflowBlock,
  ChecklistBlock,
  FakeCourseTrapVisual,
  SourceTruthExportVisual,
  CourseTruthStackVisual,
  AICourseContentWorkflowVisual,
  TiredTeacherTestVisual,
};

interface FieldNotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const fieldNotes = getAllContent("field-notes");
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: FieldNotePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = getContentBySlug("field-notes", slug);
    return {
      title: `${frontmatter.title} — ${COURSE_TITLE}`,
      description: frontmatter.summary,
    };
  } catch {
    return { title: `Field Note Not Found — ${COURSE_TITLE}` };
  }
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params;

  let fieldNote;
  try {
    fieldNote = getContentBySlug("field-notes", slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readingTime } = fieldNote;

  // Calculate previous/next
  const allFieldNotes = getAllContent("field-notes");
  const currentIndex = allFieldNotes.findIndex((n) => n.slug === slug);

  const previous =
    currentIndex > 0
      ? {
          title: allFieldNotes[currentIndex - 1].frontmatter.title,
          href: `/field-notes/${allFieldNotes[currentIndex - 1].slug}`,
        }
      : undefined;

  const next =
    currentIndex < allFieldNotes.length - 1
      ? {
          title: allFieldNotes[currentIndex + 1].frontmatter.title,
          href: `/field-notes/${allFieldNotes[currentIndex + 1].slug}`,
        }
      : undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
      <FieldNoteLayout
        frontmatter={{
          title: frontmatter.title,
          author: frontmatter.author,
          date: frontmatter.date,
          readingTime: readingTime.text,
          tags: frontmatter.tags,
        }}
        previous={previous}
        next={next}
      >
        <MDXRemote
          source={content}
          options={mdxOptions}
          components={mdxComponents}
        />
      </FieldNoteLayout>

      <aside className="hidden lg:block">
        <TableOfContents />
      </aside>
    </div>
  );
}

