import Link from "next/link";

interface ArticleFooterNavLink {
  href: string;
  label: string;
  title: string;
}

interface ArticleFooterNavProps {
  previous?: ArticleFooterNavLink;
  next?: ArticleFooterNavLink;
}

export default function ArticleFooterNav({
  previous,
  next,
}: ArticleFooterNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className="field-guide-footer-nav" aria-label="Article navigation">
      {previous ? (
        <Link href={previous.href}>
          <span>{previous.label}</span>
          <strong>{previous.title}</strong>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href}>
          <span>{next.label}</span>
          <strong>{next.title}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
