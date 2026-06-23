import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-320",
  label: "OTS-320",
  minContentLength: 700,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Use this file for the permanent lesson body",
    "Migration status: scaffolded",
    "Migration Status",
    "Section Purpose",
  ],
  routeForbiddenFragments: [
    "getCourseSectionContent",
    "Course-section fallback",
    "This section uses",
    "Source and Template References",
  ],
});
