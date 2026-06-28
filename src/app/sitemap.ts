import type { MetadataRoute } from "next";
import { BOOK_CHAPTERS } from "@/lib/book";
import { getAllContent } from "@/lib/content";
import {
  COURSE_STRUCTURES,
  getAllCourseSectionRecords,
} from "@/lib/courseStructures";
import { CYBER_BOOK_CHAPTERS } from "@/lib/cyberSafety";
import { MODULES, PATHWAY_COURSES, SITE_URL } from "@/lib/metadata";
import { TEACHER_PROMPTS } from "@/lib/prompts";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";

const lastModified = new Date();

function entry(
  path: string,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    entry("/", 1, "weekly"),
    entry("/about", 0.8),
    entry("/apps-script", 0.7),
    entry("/book", 0.9, "weekly"),
    entry("/course", 0.7),
    entry("/course/audit", 0.5),
    entry("/course/release", 0.5),
    entry("/courses", 0.8),
    entry("/courses/ots-280", 0.8),
    entry("/evidence", 0.6),
    entry("/examples", 0.6),
    entry("/examples/robotics-mini-unit", 0.7),
    entry("/field-notes", 0.7),
    entry("/kb", 0.9, "weekly"),
    entry("/kb/source-bank", 0.8, "weekly"),
    entry("/labs", 0.7),
    entry("/lessons", 0.7),
    entry("/library", 0.5),
    entry("/library/source-bank", 0.7),
    entry("/license", 0.4, "yearly"),
    entry("/open-source", 0.5, "yearly"),
    entry("/pathway", 0.9, "weekly"),
    entry("/prompts", 0.8),
    entry("/resources", 0.8),
    entry("/safety", 0.8),
    entry("/skills", 0.7),
    entry("/sources", 0.7),
    entry("/start", 0.9),
    entry("/syllabus", 0.7),
    entry("/templates", 0.8),
  ];

  const kbRoutes = [
    "/kb/ai-coding-agents/use-codex-without-overwriting-content",
    "/kb/ai-prompting/prompt-anatomy",
    "/kb/ai-prompting/verify-ai-output",
    "/kb/course-websites/embed-youtube-video",
    "/kb/course-websites/html-css-lesson-pages",
    "/kb/cyber-safety/audit-a-teacher-website",
    "/kb/cyber-safety/avoid-username-reuse",
    "/kb/cyber-safety/public-profile-audit",
    "/kb/cyber-safety/vpn-wifi-location-privacy",
    "/kb/examples",
    "/kb/field-notes",
    "/kb/google-workspace/organize-a-course-folder",
    "/kb/lesson-building/build-a-one-day-lesson-site",
    "/kb/playbooks/audit-a-teacher-website",
    "/kb/playbooks/build-a-one-day-lesson-site",
    "/kb/playbooks/source-prompt-build-verify-teach-archive-improve",
    "/kb/playbooks/use-codex-without-overwriting-content",
    "/kb/prompts",
    "/kb/resources",
    "/kb/safety",
    "/kb/standards-curriculum/turn-standards-into-learning-targets",
    "/kb/start-here/what-this-knowledge-base-is",
    "/kb/templates",
    "/kb/tools-platforms",
    "/kb/tools-platforms/free-tools-for-teachers-and-students",
  ].map((path) => entry(path, 0.6));

  const pathwayCourseRoutes = PATHWAY_COURSES.map((course) =>
    entry(`/book/${course.code.toLowerCase()}`, 0.85),
  );

  const ots101ChapterRoutes = BOOK_CHAPTERS.flatMap((chapter) => [
    entry(`/book/ots-101/${chapter.slug}`, 0.8),
    ...chapter.sections.map((section) =>
      entry(
        `/book/ots-101/${chapter.slug}/${section.number.replace(".", "-")}`,
        0.7,
      ),
    ),
  ]);

  const ots280ChapterRoutes = CYBER_BOOK_CHAPTERS.flatMap((chapter) => [
    entry(`/book/ots-280/${chapter.slug}`, 0.8),
    ...chapter.sections.map((section) =>
      entry(
        `/book/ots-280/${chapter.slug}/${section.number.replace(".", "-")}`,
        0.7,
      ),
    ),
  ]);

  const courseStructureRoutes = COURSE_STRUCTURES.flatMap((course) => [
    entry(`/book/${course.slug}`, 0.85),
    ...course.chapters.map((chapter) =>
      entry(`/book/${course.slug}/${chapter.slug}`, 0.8),
    ),
    ...getAllCourseSectionRecords(course).map((record) =>
      entry(record.href, 0.7),
    ),
  ]);

  const legacyCourseRoutes = MODULES.map((module) =>
    entry(`/course/${module.slug}`, 0.4, "yearly"),
  );

  const contentRoutes = [
    ...getAllContent("lessons").map((item) =>
      entry(`/lessons/${item.slug}`, 0.5),
    ),
    ...getAllContent("labs").map((item) => entry(`/labs/${item.slug}`, 0.5)),
    ...getAllContent("field-notes").map((item) =>
      entry(`/field-notes/${item.slug}`, 0.6),
    ),
  ];

  const promptRoutes = TEACHER_PROMPTS.map((prompt) =>
    entry(`/prompts/${prompt.slug}`, 0.6),
  );

  const templateRoutes = FOUNDATION_TEMPLATES.map((template) =>
    entry(`/templates/${template.slug}`, 0.6),
  );

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const item of [
    ...staticRoutes,
    ...kbRoutes,
    ...pathwayCourseRoutes,
    ...ots101ChapterRoutes,
    ...ots280ChapterRoutes,
    ...courseStructureRoutes,
    ...legacyCourseRoutes,
    ...contentRoutes,
    ...promptRoutes,
    ...templateRoutes,
  ]) {
    byUrl.set(item.url, item);
  }

  return Array.from(byUrl.values()).sort((left, right) =>
    left.url.localeCompare(right.url),
  );
}
