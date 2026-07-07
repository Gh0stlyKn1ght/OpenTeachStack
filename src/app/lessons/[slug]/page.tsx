import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import { COURSE_TITLE } from "@/lib/metadata";
import LessonLayout from "@/components/LessonLayout";
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
import { lessonVisuals } from "@/lib/visualAssets";

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

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lessons = getAllContent("lessons");
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = getContentBySlug("lessons", slug);
    return {
      title: `${frontmatter.title} — ${COURSE_TITLE}`,
      description: frontmatter.summary,
    };
  } catch {
    return { title: `Lesson Not Found — ${COURSE_TITLE}` };
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  let lesson;
  try {
    lesson = getContentBySlug("lessons", slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = lesson;
  const visual = lessonVisuals[slug];

  // Calculate previous/next
  const allLessons = getAllContent("lessons");
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);

  const previous =
    currentIndex > 0
      ? {
          title: allLessons[currentIndex - 1].frontmatter.title,
          href: `/lessons/${allLessons[currentIndex - 1].slug}`,
        }
      : undefined;

  const next =
    currentIndex < allLessons.length - 1
      ? {
          title: allLessons[currentIndex + 1].frontmatter.title,
          href: `/lessons/${allLessons[currentIndex + 1].slug}`,
        }
      : undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
      <LessonLayout
        frontmatter={{
          title: frontmatter.title,
          module: frontmatter.module,
          duration: frontmatter.duration,
          level: frontmatter.level,
          outcomes: frontmatter.outcomes,
        }}
        previous={previous}
        next={next}
        imageSrc={visual?.src}
        imageAlt={visual?.alt}
      >
        <MDXRemote
          source={content}
          options={mdxOptions}
          components={mdxComponents}
        />
      </LessonLayout>

      <aside className="hidden lg:block">
        <TableOfContents />
      </aside>
    </div>
  );
}

