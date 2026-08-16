import { join } from "node:path";
import { checkCourseReader } from "./lib/check-course-reader.mjs";

checkCourseReader({
  courseSlug: "ots-320",
  label: "OTS-320",
  minContentLength: 700,
  sectionRoutePath: join(
    process.cwd(),
    "src",
    "app",
    "book",
    "ots-320",
    "[chapter]",
    "[section]",
    "page.tsx",
  ),
  requiredSectionRouteFragments: [
    "getCourseLessonBySlugs",
    "CoursePacketLessonTemplate",
  ],
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