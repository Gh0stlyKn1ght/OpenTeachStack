import {
  BOOK_CHAPTERS,
  getSectionHref as getBookSectionHref,
} from "./book";
import {
  COURSE_STRUCTURES,
  getChapterHref,
  getSectionHref,
  type CourseStructure,
} from "./courseStructures";
import { CYBER_BOOK_CHAPTERS } from "./cyberSafety";
import {
  getKnowledgeBaseSearchRecordsFromFiles,
  type KnowledgeBaseSearchRecord,
} from "./knowledgeBase";
import { sourceBankResources } from "./sourceBank";
import { FOUNDATION_TEMPLATES } from "./templates";

export interface SearchRecord {
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  keywords: string[];
}

export function getOts101SearchRecords(): SearchRecord[] {
  return BOOK_CHAPTERS.flatMap((chapter) => [
    {
      title: chapter.title,
      href: chapter.href,
      eyebrow: "OTS-101 Chapter",
      description: chapter.description,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        chapter.problem,
        ...chapter.transferableSkills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: getBookSectionHref(chapter, section),
      eyebrow: `OTS-101 ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getCyberSearchRecords(): SearchRecord[] {
  return CYBER_BOOK_CHAPTERS.flatMap((chapter) => [
    {
      title: chapter.title,
      href: chapter.href,
      eyebrow: "OTS-280 Chapter",
      description: chapter.description,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        chapter.safetyCheck,
        ...chapter.transferableSkills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: `${chapter.href}/${section.number.replace(".", "-")}`,
      eyebrow: `OTS-280 ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getCourseStructureSearchRecords(
  course: CourseStructure,
): SearchRecord[] {
  return course.chapters.flatMap((chapter) => [
    {
      title: chapter.title,
      href: getChapterHref(course, chapter),
      eyebrow: `${course.code} Chapter`,
      description: chapter.problem,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        ...chapter.skills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: getSectionHref(course, chapter, section),
      eyebrow: `${course.code} ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getKnowledgeBaseSearchRecords(): SearchRecord[] {
  const knowledgeBaseRecords: KnowledgeBaseSearchRecord[] =
    getKnowledgeBaseSearchRecordsFromFiles();

  // Keep static template/source resources in search for discoverability,
  // but derive all KB entries from file-system metadata.

  return [
    ...knowledgeBaseRecords,
    ...FOUNDATION_TEMPLATES.map((template) => ({
      title: template.title,
      href: `/templates/${template.slug}`,
      eyebrow: "Template",
      description: template.purpose,
      keywords: [
        template.module,
        template.format,
        template.skillMeasured,
        template.evidenceOfCompletion,
        ...template.tags,
      ],
    })),
    ...sourceBankResources.map((resource) => ({
      title: resource.name,
      href: "/kb/source-bank",
      eyebrow: resource.category,
      description: resource.bestUse,
      keywords: [
        resource.cost,
        resource.accountRequired,
        resource.teacherSetupNote,
        resource.privacyNote,
        ...resource.audience,
        ...resource.tags,
      ],
    })),
  ];
}

export function getSiteSearchRecords(): SearchRecord[] {
  return [
    ...getOts101SearchRecords(),
    ...COURSE_STRUCTURES.flatMap(getCourseStructureSearchRecords),
    ...getCyberSearchRecords(),
    ...getKnowledgeBaseSearchRecords(),
  ];
}
