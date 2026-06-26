import Link from "next/link";
import BookSearchInput from "@/components/book/BookSearchInput";
import { getKnowledgeBaseSearchRecords } from "@/lib/search";
import { getKnowledgeBaseCategories } from "@/lib/knowledgeBase";

const relatedResources = [
  ["Pathway", "/pathway"],
  ["Prompts", "/kb/prompts"],
  ["Templates", "/kb/templates"],
  ["Source Bank", "/kb/source-bank"],
  ["Build Notes", "/build-notes"],
];

export default async function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchRecords = getKnowledgeBaseSearchRecords();
  const categories = getKnowledgeBaseCategories();

  return (
    <main className="field-guide-page">
      <div className="field-guide-shell field-guide-shell-with-sidebar kb-docs-shell">
        <aside
          className="field-guide-sidebar kb-docs-sidebar"
          aria-label="Knowledge Base categories"
        >
          <Link href="/kb" className="kb-docs-title">
            Knowledge Base
          </Link>
          <BookSearchInput
            records={searchRecords}
            label="Search"
            placeholder="Prompt, checklist, workflow..."
          />
          <details className="kb-docs-mobile-nav">
            <summary>Categories</summary>
            <nav>
              {categories.map((category) => (
                <Link key={category.href} href={category.href}>
                  {category.label}
                </Link>
              ))}
            </nav>
          </details>
          <nav className="kb-docs-category-list">
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                {category.label}
              </Link>
            ))}
          </nav>
          <div className="kb-docs-related" aria-label="Related resources">
            <p className="kb-docs-kicker">Related Resources</p>
            <nav className="kb-docs-related-list">
              {relatedResources.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <article className="field-guide-article kb-docs-content">
          {children}
        </article>
      </div>
    </main>
  );
}
