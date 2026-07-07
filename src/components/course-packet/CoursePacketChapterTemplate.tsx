import Link from "next/link";
import CoursePacketLearningShell from "./CoursePacketLearningShell";
import type { CoursePacketChapterView, CoursePacketView } from "./types";

interface CoursePacketChapterTemplateProps {
  course: CoursePacketView;
  chapter: CoursePacketChapterView;
  chapterIndex: number;
  previous?: CoursePacketChapterView;
  next?: CoursePacketChapterView;
}

export default function CoursePacketChapterTemplate({
  course,
  chapter,
  chapterIndex,
  previous,
  next,
}: CoursePacketChapterTemplateProps) {
  const position = Math.round(((chapterIndex + 1) / course.chapters.length) * 100);

  return (
    <CoursePacketLearningShell
      course={course}
      eyebrow={`${course.code} / Chapter ${chapter.number}`}
      title={chapter.title}
      subtitle={chapter.problem}
      activeChapterSlug={chapter.slug}
      meta={[
        { label: "Duration", value: chapter.duration },
        { label: "Artifact", value: chapter.buildArtifact },
      ]}
      previous={
        previous
          ? {
              href: previous.href,
              label: "Previous chapter",
              title: `${previous.number}. ${previous.title}`,
            }
          : undefined
      }
      next={
        next
          ? {
              href: next.href,
              label: "Next chapter",
              title: `${next.number}. ${next.title}`,
            }
          : undefined
      }
    >
      <section className="course-packet-progress" aria-label="Course progress">
        <div>
          <span>
            Chapter {chapterIndex + 1} of {course.chapters.length}
          </span>
          <strong>{position}% path position</strong>
        </div>
        <div>
          <span style={{ width: `${position}%` }} />
        </div>
      </section>

      <section className="course-packet-grid">
        <div className="course-packet-panel course-packet-panel-primary">
          <span>Teacher Problem</span>
          <h2>{chapter.problem}</h2>
        </div>
        <div className="course-packet-panel">
          <span>Build Target</span>
          <h2>{chapter.buildArtifact}</h2>
          <p>{chapter.essentialQuestion}</p>
        </div>
      </section>

      <section>
        <div className="course-packet-section-heading">
          <span>Lesson Sequence</span>
          <h2>Chapter sections</h2>
        </div>
        <ol className="course-packet-section-map">
          {chapter.sections.map((section) => (
            <li key={section.number}>
              <Link href={section.href}>
                <span>{section.number}</span>
                <strong>{section.title}</strong>
                <small>
                  {section.type} · {section.duration}
                </small>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </CoursePacketLearningShell>
  );
}
