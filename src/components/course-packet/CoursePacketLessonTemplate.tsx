import { MDXRemote } from "next-mdx-remote/rsc";
import CoursePacketLearningShell from "./CoursePacketLearningShell";
import type {
  CoursePacketChapterView,
  CoursePacketSectionView,
  CoursePacketView,
} from "./types";
import type { CourseLessonItem } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import { coursePacketMdxComponents } from "./mdxComponents";

interface CoursePacketLessonTemplateProps {
  course: CoursePacketView;
  chapter: CoursePacketChapterView;
  section: CoursePacketSectionView;
  lesson?: CourseLessonItem;
  previous?: { href: string; section: CoursePacketSectionView };
  next?: { href: string; section: CoursePacketSectionView };
  unavailableMessage?: string;
}

export default function CoursePacketLessonTemplate({
  course,
  chapter,
  section,
  lesson,
  previous,
  next,
  unavailableMessage,
}: CoursePacketLessonTemplateProps) {
  const migrationStatus = lesson?.frontmatter.migrationStatus;
  const isReleaseReady =
    migrationStatus === "authored" || migrationStatus === "reviewed";

  return (
    <CoursePacketLearningShell
      course={course}
      eyebrow={`${course.code} / Chapter ${chapter.number} / Section ${section.number}`}
      title={section.title}
      subtitle={chapter.problem}
      activeChapterSlug={chapter.slug}
      activeSectionSlug={section.slug}
      meta={[
        { label: "Chapter", value: chapter.number },
        { label: "Type", value: section.type },
        { label: "Duration", value: section.duration },
        { label: "Source", value: lesson ? "Course-owned MDX" : "Unavailable" },
      ]}
      previous={
        previous
          ? {
              href: previous.href,
              label: "Previous section",
              title: `${previous.section.number}. ${previous.section.title}`,
            }
          : undefined
      }
      next={
        next
          ? {
              href: next.href,
              label: "Next section",
              title: `${next.section.number}. ${next.section.title}`,
            }
          : undefined
      }
    >
      <section className="course-packet-lesson-frame">
        <div className="course-packet-lesson-labels">
          <span>{section.type}</span>
          <span>{migrationStatus ?? "not authored"}</span>
          {section.artifact ? <span>{section.artifact}</span> : null}
        </div>

        {!lesson ? (
          <div className="course-packet-status-note">
            {unavailableMessage ??
              "This lesson is intentionally unavailable because no authored lesson MDX exists yet."}
          </div>
        ) : !isReleaseReady ? (
          <div className="course-packet-status-note">
            This lesson is in teacher review. It still needs classroom-specific
            revision before it should be treated as release-ready course
            content.
          </div>
        ) : null}

        {lesson ? (
          <div className="prose-academic">
            <MDXRemote
              source={lesson.content}
              options={mdxOptions}
              components={coursePacketMdxComponents}
            />
          </div>
        ) : null}
      </section>
    </CoursePacketLearningShell>
  );
}
