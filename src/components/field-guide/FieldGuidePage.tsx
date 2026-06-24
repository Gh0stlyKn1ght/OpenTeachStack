import Link from "next/link";
import ArticleHeader from "./ArticleHeader";

interface BreadcrumbLink {
  href: string;
  label: string;
}

interface FieldGuidePageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: {
    label: string;
    value: string;
  }[];
  breadcrumbs?: BreadcrumbLink[];
  sidebar?: React.ReactNode;
  sidebarPosition?: "left" | "right";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function FieldGuidePage({
  eyebrow,
  title,
  subtitle,
  meta = [],
  breadcrumbs = [],
  sidebar,
  sidebarPosition = "left",
  children,
  footer,
}: FieldGuidePageProps) {
  const shellClassName = sidebar
    ? `field-guide-shell field-guide-shell-with-sidebar field-guide-shell-sidebar-${sidebarPosition}`
    : "field-guide-shell";

  return (
    <main className="field-guide-page">
      <div className={shellClassName}>
        {sidebar ? <div className="field-guide-sidebar">{sidebar}</div> : null}
        <article className="field-guide-article">
          {breadcrumbs.length > 0 ? (
            <nav className="field-guide-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                {breadcrumbs.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <ArticleHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            meta={meta}
          />
          {children}
          {footer}
        </article>
      </div>
    </main>
  );
}
