interface ArticleCalloutProps {
  title?: string;
  children: React.ReactNode;
}

export default function ArticleCallout({ title, children }: ArticleCalloutProps) {
  return (
    <aside className="field-guide-callout">
      {title ? <p className="field-guide-callout-title">{title}</p> : null}
      {children}
    </aside>
  );
}
