import Link from "next/link";
import CoursePacketLearningShell from "./CoursePacketLearningShell";
import type { CoursePacketView } from "./types";

interface CoursePacketUnavailableTemplateProps {
  course: CoursePacketView;
  scope: "course" | "chapter" | "lesson";
}

export default function CoursePacketUnavailableTemplate({
  course,
  scope,
}: CoursePacketUnavailableTemplateProps) {
  const scopeLabel = scope === "course" ? "course" : `${scope} surface`;

  return (
    <CoursePacketLearningShell
      course={course}
      eyebrow={`${course.code} Coming Soon`}
      title={course.title}
      subtitle="This course is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
      meta={[
        { label: "Status", value: "Coming Soon" },
        { label: "Boundary", value: "Unavailable until course status is draft" },
      ]}
    >
      <section className="course-packet-grid">
        <div className="course-packet-panel course-packet-panel-primary">
          <span>CourseOS Boundary</span>
          <h2>This {scopeLabel} is closed on purpose</h2>
          <p>
            OpenTeachStack is rebuilding one real course first. It does not
            publish placeholder lesson bodies, route-shaped outlines, or
            scaffolded pages as if they were ready course content.
          </p>
        </div>
        <div className="course-packet-panel">
          <span>Next Step</span>
          <h2>Return to the active sequence</h2>
          <p>
            Finish the OTS-000 on-ramp and OTS-101 foundations sequence first.
            This course can reopen after its source-of-truth status moves into
            draft review.
          </p>
          <Link href="/book/ots-000" className="book-action-secondary mt-4">
            Return to OTS-000
          </Link>
        </div>
      </section>
    </CoursePacketLearningShell>
  );
}
