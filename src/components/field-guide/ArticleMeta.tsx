interface ArticleMetaItem {
  label: string;
  value: string;
}

interface ArticleMetaProps {
  items: ArticleMetaItem[];
}

export default function ArticleMeta({ items }: ArticleMetaProps) {
  if (items.length === 0) return null;

  return (
    <dl className="field-guide-meta">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
