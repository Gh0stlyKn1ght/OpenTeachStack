import { type CSSProperties, type ReactNode } from 'react';

interface TeacherNoteProps {
  children: ReactNode;
}

export default function TeacherNote({ children }: TeacherNoteProps) {
  return (
    <aside
      className="callout my-8 p-5 pl-6"
      style={{ "--callout-color": "var(--color-amber)" } as CSSProperties}
    >
      <p className="callout-label mb-2">
        Teacher Note
      </p>
      <div className="text-sm leading-relaxed text-foreground/85 font-sans">
        {children}
      </div>
    </aside>
  );
}
