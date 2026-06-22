import BookCanvas from "./BookCanvas";
import BookSidebar from "./BookSidebar";
import MarginNotes from "./MarginNotes";
import ReadingProgress from "../ReadingProgress";

interface BookShellProps {
  activeSlug?: string;
  activeSectionSlug?: string;
  children: React.ReactNode;
  notes: {
    label: string;
    value: string;
    href?: string;
  }[];
  skills?: string[];
}

export default function BookShell({
  activeSlug,
  activeSectionSlug,
  children,
  notes,
  skills,
}: BookShellProps) {
  return (
    <div className="book-shell">
      <ReadingProgress />
      <BookSidebar
        activeSlug={activeSlug}
        activeSectionSlug={activeSectionSlug}
      />
      <BookCanvas>{children}</BookCanvas>
      <MarginNotes notes={notes} skills={skills} />
    </div>
  );
}
