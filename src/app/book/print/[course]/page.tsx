import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BuildTask from "@/components/BuildTask";
import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
import PrintPageButton from "@/components/PrintPageButton";
import RealityCheck from "@/components/RealityCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import VideoEmbed from "@/components/VideoEmbed";
import {
  BOOK_CHAPTERS,
  BOOK_COURSE_CODE,
  BOOK_COURSE_PATH,
  getAllBookSectionRecords,
} from "@/lib/book";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
  CYBER_COURSE_PATH,
  getAllCyberSectionRecords,
} from "@/lib/cyberSafety";
import {
  COURSE_STRUCTURES,
  getAllCourseSectionRecords,
  getCourseStructure,
} from "@/lib/courseStructures";
import { mdxOptions } from "@/lib/mdx";
import { COURSE_THESIS } from "@/lib/metadata";

type CoursePrintPageProps = {
  params: Promise<{ course: string }>;
};

const mdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
};

type PrintableSection = {
  number: string;
  title: string;
  type: string;
  duration: string;
};

type PrintableChapter = {
  number: string;
  title: string;
  slug: string;
  problem: string;
  sections: PrintableSection[];
};

type PrintableRecord = {
  href: string;
  chapter: PrintableChapter;
  section: PrintableSection;
  sectionSlug: string;
};

type PrintableCourse = {
  code: string;
  slug: string;
  title: string;
  level: string;
  coursePath: string;
  prerequisite: string;
  thesis: string;
  finalArtifact: string;
  chapters: PrintableChapter[];
  records: PrintableRecord[];
};

function getPrintableCourse(courseSlug: string): PrintableCourse | undefined {
  if (courseSlug === "ots-101") {
    const chapters = BOOK_CHAPTERS.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      slug: chapter.slug,
      problem: chapter.problem,
      sections: chapter.sections,
    }));

    return {
      code: BOOK_COURSE_CODE,
      slug: courseSlug,
      title: "Foundations for Teacher TechOps",
      level: "Foundation",
      coursePath: BOOK_COURSE_PATH,
      prerequisite: "None",
      thesis: COURSE_THESIS,
      finalArtifact: "Verified mini-unit system",
      chapters,
      records: getAllBookSectionRecords().map((record) => ({
        href: record.href,
        chapter: chapters.find((chapter) => chapter.slug === record.chapter.slug)!,
        section: record.section,
        sectionSlug: record.sectionSlug,
      })),
    };
  }

  if (courseSlug === "ots-280") {
    const chapters = CYBER_BOOK_CHAPTERS.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      slug: chapter.slug,
      problem: chapter.problem,
      sections: chapter.sections,
    }));

    return {
      code: CYBER_COURSE_CODE,
      slug: courseSlug,
      title: CYBER_COURSE_PATH,
      level: "Intermediate",
      coursePath: CYBER_COURSE_PATH,
      prerequisite: "OTS-101",
      thesis:
        "Identity, privacy, accounts, and website safety for teachers who are becoming more visible online.",
      finalArtifact: "Incident response plan",
      chapters,
      records: getAllCyberSectionRecords().map((record) => ({
        href: record.href,
        chapter: chapters.find((chapter) => chapter.slug === record.chapter.slug)!,
        section: record.section,
        sectionSlug: record.sectionSlug,
      })),
    };
  }

  const course = getCourseStructure(courseSlug);

  if (!course) {
    return undefined;
  }

  return {
    code: course.code,
    slug: course.slug,
    title: course.title,
    level: course.level,
    coursePath: course.coursePath,
    prerequisite: course.prerequisite,
    thesis: course.thesis,
    finalArtifact: course.finalArtifact,
    chapters: course.chapters,
    records: getAllCourseSectionRecords(course),
  };
}

export function generateStaticParams() {
  return [
    { course: "ots-101" },
    ...COURSE_STRUCTURES.map((course) => ({ course: course.slug })),
    { course: "ots-280" },
  ];
}

export async function generateMetadata({
  params,
}: CoursePrintPageProps): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getPrintableCourse(courseSlug);

  if (!course) {
    return { title: "Course Not Found — Teaching Teachers" };
  }

  return {
    title: `${course.code} Full Course PDF — Teaching Teachers`,
    description: `Printable full-course book export for ${course.title}.`,
  };
}

export default async function CoursePrintPage({ params }: CoursePrintPageProps) {
  const { course: courseSlug } = await params;
  const course = getPrintableCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const records = course.records
    .map((record) => ({
      ...record,
      lesson: getCourseLessonBySlugs(
        course.slug,
        record.chapter.slug,
        record.sectionSlug,
      ),
    }))
    .filter((record) => record.lesson?.frontmatter.migrationStatus === "authored");

  return (
    <main className="full-course-print mx-auto w-[min(100%-2rem,72rem)] py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Full Course Print Export
          </p>
          <h1 className="m-0 max-w-4xl font-heading text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            {course.code}: {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/62 sm:text-lg">
            {course.thesis}
          </p>
        </div>
        <div className="flex flex-wrap gap-3" data-print-hide>
          <Link href={`/book/${course.slug}`} className="book-action-secondary">
            Back to course
          </Link>
          <PrintPageButton label="Print Full Book / PDF" />
        </div>
      </div>

      <section className="book-spread">
        <div>
          <h2>Course Overview</h2>
          <p>{course.thesis}</p>
          <p>
            Final artifact: <strong>{course.finalArtifact}</strong>
          </p>
        </div>
        <div className="book-callout">
          <p className="book-kicker">Course details</p>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45">
                Level
              </dt>
              <dd className="m-0">{course.level}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45">
                Path
              </dt>
              <dd className="m-0">{course.coursePath}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45">
                Prerequisite
              </dt>
              <dd className="m-0">{course.prerequisite}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="full-course-toc">
        <h2>Table of Contents</h2>
        <ol>
          {course.chapters.map((chapter) => (
            <li key={chapter.slug}>
              <strong>
                {chapter.number}. {chapter.title}
              </strong>
              <ol>
                {chapter.sections.map((section) => (
                  <li key={section.number}>
                    {section.number} {section.title}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>

      {course.chapters.map((chapter) => {
        const chapterRecords = records.filter(
          (record) => record.chapter.slug === chapter.slug,
        );

        return (
          <section key={chapter.slug} className="full-course-chapter">
            <header>
              <p className="book-kicker">Chapter {chapter.number}</p>
              <h2>{chapter.title}</h2>
              <p>{chapter.problem}</p>
            </header>

            {chapterRecords.map((record) => (
              <article key={record.href} className="full-course-section">
                <header>
                  <p className="book-kicker">
                    Section {record.section.number} · {record.section.type} ·{" "}
                    {record.section.duration}
                  </p>
                  <h3>{record.section.title}</h3>
                </header>
                <div className="prose-academic">
                  <MDXRemote
                    source={record.lesson?.content ?? ""}
                    options={mdxOptions}
                    components={mdxComponents}
                  />
                </div>
              </article>
            ))}
          </section>
        );
      })}
    </main>
  );
}

