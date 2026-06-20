import { type ReactNode } from 'react';

interface CitationProps {
  author?: string;
  title?: string;
  year?: string;
  url?: string;
  inline?: boolean;
}

export default function Citation({
  author,
  title,
  year,
  url,
  inline = false,
}: CitationProps) {
  const Wrapper = inline ? 'span' : 'p';

  const parts: ReactNode[] = [];

  if (author) {
    parts.push(
      <span key="author" className="font-sans">
        {author}
      </span>
    );
  }

  if (year) {
    parts.push(
      <span key="year" className="font-sans">
        {parts.length > 0 ? ' ' : ''}({year}).
      </span>
    );
  }

  if (title) {
    const titleContent = url ? (
      <a
        key="title"
        href={url}
        className="text-link underline decoration-link/30 hover:decoration-link/60 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <em>{title}</em>
      </a>
    ) : (
      <em key="title">{title}</em>
    );

    parts.push(
      <span key="title-wrap">
        {parts.length > 0 ? ' ' : ''}
        {titleContent}
        {!url ? '.' : '.'}
      </span>
    );
  }

  if (url && !title) {
    parts.push(
      <span key="url">
        {parts.length > 0 ? ' ' : ''}
        <a
          href={url}
          className="text-link underline decoration-link/30 hover:decoration-link/60 transition-colors font-mono text-sm break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </span>
    );
  }

  return (
    <Wrapper
      className={`text-foreground/80 text-sm leading-relaxed ${
        inline ? '' : 'my-2 pl-8 -indent-4'
      }`}
    >
      {parts}
    </Wrapper>
  );
}
