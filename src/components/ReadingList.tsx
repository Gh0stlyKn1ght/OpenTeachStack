interface ReadingItem {
  title: string;
  author?: string;
  url?: string;
  description?: string;
}

interface ReadingListProps {
  items: ReadingItem[];
}

export default function ReadingList({ items }: ReadingListProps) {
  return (
    <section className="my-8">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
        Reading List
      </h3>
      <ol className="list-none space-y-4 pl-0">
        {items.map((item, index) => (
          <li key={index} className="pl-8 relative text-sm leading-relaxed text-foreground/80">
            <span className="absolute left-0 top-0 font-mono text-xs text-slate tabular-nums">
              [{index + 1}]
            </span>
            <span className="font-sans">
              {item.author && (
                <span>{item.author}. </span>
              )}
              {item.url ? (
                <a
                  href={item.url}
                  className="text-link underline decoration-link/30 hover:decoration-link/60 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <em>{item.title}</em>
                </a>
              ) : (
                <em>{item.title}</em>
              )}
              .
              {item.description && (
                <span className="block mt-1 text-slate text-xs not-italic">
                  {item.description}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
