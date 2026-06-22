import BookCanvas from "./BookCanvas";
import CyberSafetySidebar from "./CyberSafetySidebar";
import MarginNotes from "./MarginNotes";
import ReadingProgress from "../ReadingProgress";

interface CyberSafetyBookShellProps {
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

export default function CyberSafetyBookShell({
  activeSlug,
  activeSectionSlug,
  children,
  notes,
  skills,
}: CyberSafetyBookShellProps) {
  return (
    <div className="book-shell">
      <ReadingProgress />
      <CyberSafetySidebar
        activeSlug={activeSlug}
        activeSectionSlug={activeSectionSlug}
      />
      <BookCanvas>{children}</BookCanvas>
      <MarginNotes notes={notes} skills={skills} />
    </div>
  );
}
