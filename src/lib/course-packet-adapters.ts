import {
  BOOK_CHAPTERS,
  BOOK_COURSE_CODE,
  BOOK_COURSE_PATH,
  getSectionHref as getOts101SectionHref,
  getSectionSlug as getOts101SectionSlug,
} from "@/lib/book";
import type { CourseStructure } from "@/lib/courseStructures";
import {
  getChapterHref,
  getSectionHref,
  getSectionSlug,
} from "@/lib/courseStructures";
import { COURSE_SUBTITLE, COURSE_THESIS, COURSE_TITLE } from "@/lib/metadata";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
  CYBER_COURSE_PATH,
} from "@/lib/cyberSafety";
import type {
  CoursePacketChapterView,
  CoursePacketSectionView,
  CoursePacketView,
} from "@/components/course-packet/types";

export function ots101PacketView(): CoursePacketView {
  return {
    code: BOOK_COURSE_CODE,
    slug: "ots-101",
    title: COURSE_TITLE,
    subtitle: COURSE_SUBTITLE,
    thesis: COURSE_THESIS,
    coursePath: BOOK_COURSE_PATH,
    level: "Beginner after OTS-000",
    status: "Draft sequel",
    prerequisite: "OTS-000",
    finalArtifact: "Mini course content packet",
    chapters: BOOK_CHAPTERS.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      slug: chapter.slug,
      href: chapter.href,
      summary: chapter.description,
      problem: chapter.problem,
      essentialQuestion: chapter.evidence,
      buildArtifact: chapter.buildArtifact,
      duration: chapter.duration,
      difficulty: chapter.difficulty,
      sections: chapter.sections.map((section) => ({
        number: section.number,
        title: section.title,
        type: section.type,
        duration: section.duration,
        slug: getOts101SectionSlug(section),
        href: getOts101SectionHref(chapter, section),
        artifact: section.artifact,
      })),
    })),
  };
}

export function courseStructurePacketView(course: CourseStructure): CoursePacketView {
  return {
    code: course.code,
    slug: course.slug,
    title: course.title,
    subtitle: course.thesis,
    thesis: course.thesis,
    coursePath: course.coursePath,
    level: course.level,
    status: course.status,
    prerequisite: course.prerequisite,
    finalArtifact: course.finalArtifact,
    chapters: course.chapters.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      slug: chapter.slug,
      href: getChapterHref(course, chapter),
      summary: chapter.problem,
      problem: chapter.problem,
      essentialQuestion: chapter.essentialQuestion,
      buildArtifact: chapter.buildArtifact,
      duration: "1 week",
      sections: chapter.sections.map((section) => ({
        number: section.number,
        title: section.title,
        type: section.type,
        duration: section.duration,
        slug: getSectionSlug(section),
        href: getSectionHref(course, chapter, section),
        artifact: section.artifact,
      })),
    })),
  };
}

export function cyberSafetyPacketView(): CoursePacketView {
  return {
    code: CYBER_COURSE_CODE,
    slug: "ots-280",
    title: "Cyber Safety for Educators",
    subtitle:
      "A draft cyber safety course for teachers working in public, connected, AI-supported spaces.",
    thesis:
      "Teachers need calm, practical safety routines before they publish public sites, reuse accounts everywhere, paste information into AI tools, or invite the internet into their classroom workflow.",
    coursePath: CYBER_COURSE_PATH,
    level: "Beginner",
    status: "Draft",
    prerequisite: "OTS-101 recommended",
    finalArtifact: "Teacher cyber safety plan",
    chapters: CYBER_BOOK_CHAPTERS.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      slug: chapter.slug,
      href: chapter.href,
      summary: chapter.description,
      problem: chapter.problem,
      essentialQuestion: chapter.essentialQuestion,
      buildArtifact: chapter.buildArtifact,
      duration: chapter.duration,
      difficulty: chapter.difficulty,
      sections: chapter.sections.map((section) => {
        const sectionSlug = section.number.replace(".", "-");

        return {
          number: section.number,
          title: section.title,
          type: section.type,
          duration: section.duration,
          slug: sectionSlug,
          href: `${chapter.href}/${sectionSlug}`,
          artifact: section.artifact,
        };
      }),
    })),
  };
}

export function findPacketChapter(
  course: CoursePacketView,
  chapterSlug: string,
): CoursePacketChapterView | undefined {
  return course.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function findPacketSection(
  chapter: CoursePacketChapterView,
  sectionSlug: string,
): CoursePacketSectionView | undefined {
  return chapter.sections.find((section) => section.slug === sectionSlug);
}

export function flattenPacketSections(course: CoursePacketView) {
  let index = 0;
  return course.chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      course,
      chapter,
      section,
      href: section.href,
      index: index++,
    })),
  );
}
