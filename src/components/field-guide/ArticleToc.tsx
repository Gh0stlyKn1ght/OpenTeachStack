interface ArticleTocItem {
  href: string;
  label: string;
}

interface ArticleTocProps {
  items: ArticleTocItem[];
}

export default function ArticleToc({ items }: ArticleTocProps) {
  if (items.length === 0) return null;

  return (
    <nav className="field-guide-toc" aria-label="On this page">
      <p>On this page</p>
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
