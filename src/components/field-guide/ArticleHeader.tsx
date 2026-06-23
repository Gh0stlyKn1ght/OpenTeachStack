import ArticleMeta from "./ArticleMeta";

interface ArticleHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: {
    label: string;
    value: string;
  }[];
}

export default function ArticleHeader({
  eyebrow,
  title,
  subtitle,
  meta = [],
}: ArticleHeaderProps) {
  return (
    <header className="field-guide-header">
      <p className="field-guide-eyebrow">{eyebrow}</p>
      <h1 className="field-guide-title">{title}</h1>
      {subtitle ? <p className="field-guide-subtitle">{subtitle}</p> : null}
      <ArticleMeta items={meta} />
    </header>
  );
}
