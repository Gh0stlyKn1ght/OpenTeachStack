interface ArticleQuoteProps {
  children: React.ReactNode;
}

export default function ArticleQuote({ children }: ArticleQuoteProps) {
  return <blockquote className="field-guide-quote">{children}</blockquote>;
}
