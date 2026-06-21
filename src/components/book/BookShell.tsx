import BookCanvas from "./BookCanvas";
import BookSidebar from "./BookSidebar";
import MarginNotes from "./MarginNotes";

interface BookShellProps {
  activeSlug?: string;
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
  children,
  notes,
  skills,
}: BookShellProps) {
  return (
    <div className="book-shell">
      <BookSidebar activeSlug={activeSlug} />
      <BookCanvas>{children}</BookCanvas>
      <MarginNotes notes={notes} skills={skills} />
    </div>
  );
}
