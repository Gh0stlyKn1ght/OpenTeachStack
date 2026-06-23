import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-220",
  label: "OTS-220",
  minContentLength: 500,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Use this file for the permanent lesson body",
    "Migration status: scaffolded",
    "Authoring Status",
    "Section Purpose",
    "Authoring Checklist",
  ],
  routeForbiddenFragments: [
    "getCourseSectionContent",
    "Course-section fallback",
    "The goal is not to make",
    "Source and Template References",
    "This section uses",
  ],
});
