import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-399",
  label: "OTS-399",
  minContentLength: 700,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Use this file for the permanent lesson body",
    "Migration status: scaffolded",
    "Authoring Status",
    "Section Purpose",
    "Authoring Checklist",
  ],
  routeForbiddenFragments: [
    "Course-section fallback",
    "getCourseSectionContent",
    "This section uses",
    "Source and Template References",
  ],
});
