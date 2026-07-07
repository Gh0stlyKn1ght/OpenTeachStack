import type { Metadata } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import ArticleBody from "@/components/field-guide/ArticleBody";
import AuditDashboard from "./AuditDashboard";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Course Audit — OpenTeachStack",
  description:
    "An honest review of OpenTeachStack courses for duplication, empty placeholders, and AI boilerplate, including grades and remediation phases.",
  path: "/audit",
});

export default function AuditPage() {
  const root = process.cwd();
  const healthFilePath = join(root, "content", "course-health.json");

  let courses = [];
  try {
    if (existsSync(healthFilePath)) {
      const rawData = readFileSync(healthFilePath, "utf8");
      const healthData = JSON.parse(rawData);
      courses = healthData.courses || [];
    }
  } catch (error) {
    console.error("Failed to load course-health.json", error);
  }

  // Fallback if the file is missing or unparsed
  if (courses.length === 0) {
    courses = [
      { code: "OTS-000", slug: "ots-000", title: "Teacher Tech Stack Orientation", status: "draft", lessonCountActual: 84, lessonCountExpected: 84, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-101", slug: "ots-101", title: "AI Course Content Foundations for Teachers", status: "draft", lessonCountActual: 60, lessonCountExpected: 60, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-201", slug: "ots-201", title: "Google Workspace Systems for Teachers", status: "draft", lessonCountActual: 0, lessonCountExpected: 36, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-220", slug: "ots-220", title: "Apps Script for Teacher Automation", status: "draft", lessonCountActual: 0, lessonCountExpected: 31, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-240", slug: "ots-240", title: "Open Resources and GitHub for Educators", status: "draft", lessonCountActual: 0, lessonCountExpected: 30, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-260", slug: "ots-260", title: "AI Media and Lesson Delivery", status: "draft", lessonCountActual: 0, lessonCountExpected: 30, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-280", slug: "ots-280", title: "Cyber Safety for Educators", status: "draft", lessonCountActual: 0, lessonCountExpected: 63, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-301", slug: "ots-301", title: "Teacher Course Sites", status: "draft", lessonCountActual: 0, lessonCountExpected: 30, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-320", slug: "ots-320", title: "AI Coding Agents for Educators", status: "draft", lessonCountActual: 0, lessonCountExpected: 30, releaseReady: false, lockStatus: "not-locked" },
      { code: "OTS-399", slug: "ots-399", title: "Capstone Studio", status: "draft", lessonCountActual: 0, lessonCountExpected: 30, releaseReady: false, lockStatus: "not-locked" },
    ];
  }

  return (
    <FieldGuidePage
      eyebrow="OpenTeachStack Quality Audit"
      title="An honest view of content duplication, empty shells, and AI bloat."
      subtitle="OpenTeachStack's target audience is classroom educators. We maintain content integrity by refusing generic placeholders, validating layout rules, and locking courses only after human review."
      meta={[
        { label: "Audit Date", value: "2026-07-07" },
        { label: "Target Audience", value: "Educators" },
        { label: "Verification Status", value: "Passing local gates" },
      ]}
    >
      <ArticleBody>
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Audit Overview
          </h2>
          <p className="text-base text-foreground/75 leading-relaxed">
            Many ed-tech platforms ship fake lessons with empty generic templates just to check a route completeness box.
            OpenTeachStack is built differently: a course is marked active only when its lessons teach a real educator under practical classroom pressure.
            This dashboard checks our repository health, tracks actual lesson counts against expected counts, and presents the grades and phases required to unlock the full pathway.
          </p>
        </section>

        <AuditDashboard initialCourses={courses} />
      </ArticleBody>
    </FieldGuidePage>
  );
}
