import Link from "next/link";
import SkillBadge from "./SkillBadge";

interface MarginNote {
  label: string;
  value: string;
  href?: string;
}

interface MarginNotesProps {
  title?: string;
  notes: MarginNote[];
  skills?: string[];
}

export default function MarginNotes({
  title = "Margin Notes",
  notes,
  skills = [],
}: MarginNotesProps) {
  return (
    <aside className="book-notes">
      <div className="book-notes-inner">
        <h2 className="m-0 border-none font-mono text-[0.72rem] uppercase tracking-widest text-foreground/45">
          {title}
        </h2>

        <dl className="mt-4 divide-y divide-border border-y border-border">
          {notes.map((note) => (
            <div key={note.label} className="py-3">
              <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/38">
                {note.label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground/76">
                {note.href ? (
                  <Link href={note.href} className="no-underline hover:underline">
                    {note.value}
                  </Link>
                ) : (
                  note.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {skills.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/38">
              Transferable skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
