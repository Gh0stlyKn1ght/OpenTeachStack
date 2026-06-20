import { type ReactNode } from 'react';
import PreviousNext from './PreviousNext';

interface NavLink {
  title: string;
  href: string;
}

interface FieldNoteFrontmatter {
  title: string;
  author?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

interface FieldNoteLayoutProps {
  frontmatter: FieldNoteFrontmatter;
  children: ReactNode;
  previous?: NavLink;
  next?: NavLink;
}

export default function FieldNoteLayout({
  frontmatter,
  children,
  previous,
  next,
}: FieldNoteLayoutProps) {
  const { title, author, date, readingTime, tags } = frontmatter;

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate">
          Field Note
        </p>
        <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {title}
        </h1>

        {/* Author / date line */}
        {(author || date || readingTime) && (
          <div className="mt-4 flex items-center gap-3 text-sm text-slate font-sans">
            {author && <span>{author}</span>}
            {author && (date || readingTime) && (
              <span className="text-border" aria-hidden="true">&middot;</span>
            )}
            {date && (
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {date && readingTime && (
              <span className="text-border" aria-hidden="true">&middot;</span>
            )}
            {readingTime && <span>{readingTime}</span>}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-surface-alt px-2 py-0.5 text-[0.65rem] font-mono text-slate"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <hr className="mt-6 border-border" />
      </header>

      {/* Essay content */}
      <div className="prose-academic">{children}</div>

      {/* Navigation */}
      <PreviousNext previous={previous} next={next} />
    </article>
  );
}
