import Link from "next/link";
import CoursePacketLearningShell from "./CoursePacketLearningShell";
import type { CoursePacketView } from "./types";

interface CoursePacketOverviewTemplateProps {
  course: CoursePacketView;
}

export default function CoursePacketOverviewTemplate({
  course,
}: CoursePacketOverviewTemplateProps) {
  const firstChapter = course.chapters[0];

  return (
    <CoursePacketLearningShell
      course={course}
      eyebrow="CourseOS Learning Packet"
      title={course.title}
      subtitle={course.thesis}
      showSidebar={false}
      next={
        firstChapter
          ? {
              href: firstChapter.href,
              label: "Start packet",
              title: `${firstChapter.number}. ${firstChapter.title}`,
            }
          : undefined
      }
    >
      <section className="course-packet-grid">
        <div className="course-packet-panel course-packet-panel-primary">
          <span>Teacher Problem</span>
          <h2>What this course helps you build</h2>
          <p>{course.subtitle}</p>
        </div>
        <div className="course-packet-panel">
          <span>Final Artifact</span>
          <h2>{course.finalArtifact}</h2>
          <p>
            Each chapter should move the teacher toward a reusable artifact,
            not just another page to read.
          </p>
        </div>
      </section>

      <section>
        <div className="course-packet-section-heading">
          <span>Packet Map</span>
          <h2>Chapters and build targets</h2>
        </div>
        <ol className="course-packet-chapter-map">
          {course.chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={chapter.href}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.buildArtifact}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="course-packet-panel">
        <span>CourseOS Boundary</span>
        <h2>Routes are not proof of course readiness</h2>
        <p>
          This template shows the learning path, build artifacts, and review
          state from course-owned packet data. It does not mark a course live
          just because files or routes exist.
        </p>
      </section>
    </CoursePacketLearningShell>
  );
}
