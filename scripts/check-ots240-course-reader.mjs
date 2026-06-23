import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-240",
  label: "OTS-240",
  minContentLength: 500,
  forbiddenFragments: [
    "This is the course-owned source file for",
    "Section Purpose",
    "Authoring Status",
    "Authoring Checklist",
    "Migration status: scaffolded",
  ],
  routeForbiddenFragments: [
    "getCourseSectionContent",
    "Course-section fallback",
    "The goal is",
    "Source and Template References",
    "This section uses",
  ],
});
