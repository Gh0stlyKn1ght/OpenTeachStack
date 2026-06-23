import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-260",
  label: "OTS-260",
  minContentLength: 700,
  forbiddenFragments: [
    "This is the course-owned source file",
    "Use this file for the permanent lesson body",
    "Migration status: scaffolded",
    "This section takes one part of",
  ],
  routeForbiddenFragments: [
    "getCourseSectionContent",
    "ArtifactCard",
    "Core Idea",
    "Do This",
    "Evidence of Completion",
    "Verification Check",
  ],
});
