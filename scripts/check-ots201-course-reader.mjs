import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-201",
  label: "OTS-201",
  minContentLength: 500,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Use this file for the permanent lesson body",
    "Migration status: scaffolded",
    "Authoring Status",
    "This section is scaffolded",
    "Add source notes",
  ],
  routeForbiddenFragments: [
    "This section uses the existing authored lesson body instead of the generic",
    "getCourseSectionContent",
    "Course-section fallback",
    "Core Idea",
    "Do This",
  ],
});
