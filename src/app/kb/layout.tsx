import Link from "next/link";
import BookSearchInput from "@/components/book/BookSearchInput";
import { getKnowledgeBaseSearchRecords } from "@/lib/search";
import { getKnowledgeBaseCategories } from "@/lib/knowledgeBase";

const relatedResources = [
  ["Courses", "/courses"],
  ["Library", "/library"],
  ["Prompts", "/prompts"],
  ["Templates", "/templates"],
  ["Source Bank", "/library/source-bank"],
];

export default async function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchRecords = getKnowledgeBaseSearchRecords();
  const categories = getKnowledgeBaseCategories();

  return (
    <div className="kb-docs-shell">
      <aside className="kb-docs-sidebar" aria-label="Knowledge Base categories">
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
      </aside>
      <article className="kb-docs-content">{children}</article>
      <aside className="kb-docs-related" aria-label="Related resources">
        <p className="kb-docs-kicker">Related Resources</p>
        <nav>
          {relatedResources.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
