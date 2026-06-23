interface ArticleBodyProps {
  children: React.ReactNode;
}

export default function ArticleBody({ children }: ArticleBodyProps) {
  return <div className="field-guide-body">{children}</div>;
}
