import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-301",
  label: "OTS-301",
  minContentLength: 450,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Course-owned source file",
    "Section Purpose",
    "Authoring Status",
    "Authoring Checklist",
    "Migration status: scaffolded",
  ],
  routeForbiddenFragments: [
    "getCourseSectionContent",
    "Course-section fallback",
    "This is the course section body",
    "Source and Template References",
    "This section uses",
  ],
});
