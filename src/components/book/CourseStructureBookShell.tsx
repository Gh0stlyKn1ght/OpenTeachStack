import BookCanvas from "./BookCanvas";
import CourseStructureSidebar from "./CourseStructureSidebar";
import MarginNotes from "./MarginNotes";
import ReadingProgress from "../ReadingProgress";
import type { CourseStructure } from "@/lib/courseStructures";

interface CourseStructureBookShellProps {
  course: CourseStructure;
  activeChapterSlug?: string;
  activeSectionSlug?: string;
  children: React.ReactNode;
  notes: {
    label: string;
    value: string;
    href?: string;
  }[];
  skills?: string[];
}

export default function CourseStructureBookShell({
  course,
  activeChapterSlug,
  activeSectionSlug,
  children,
  notes,
  skills,
}: CourseStructureBookShellProps) {
  return (
    <div className="book-shell">
      <ReadingProgress />
      <CourseStructureSidebar
        course={course}
        activeChapterSlug={activeChapterSlug}
        activeSectionSlug={activeSectionSlug}
      />
      <BookCanvas>{children}</BookCanvas>
      <MarginNotes notes={notes} skills={skills} />
    </div>
  );
}
