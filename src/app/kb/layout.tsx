import Link from "next/link";
import BookSearchInput from "@/components/book/BookSearchInput";
import { getKnowledgeBaseSearchRecords } from "@/lib/search";

const categories = [
  ["Start Here", "/kb/start-here/what-this-knowledge-base-is"],
  ["AI & Prompting", "/kb/ai-prompting/prompt-anatomy"],
  ["Lesson Building", "/kb/lesson-building/build-a-one-day-lesson-site"],
  ["Standards & Curriculum", "/kb/standards-curriculum/turn-standards-into-learning-targets"],
  ["Google Workspace", "/kb/google-workspace/organize-a-course-folder"],
  ["Cyber Safety", "/kb/cyber-safety/avoid-username-reuse"],
  ["Course Websites", "/kb/course-websites/embed-youtube-video"],
  ["Open Resources", "/kb/open-resources"],
  ["Tools & Platforms", "/kb/tools-platforms/free-tools-for-teachers-and-students"],
  ["AI Coding Agents", "/kb/ai-coding-agents/use-codex-without-overwriting-content"],
  ["Troubleshooting", "/kb/troubleshooting"],
  ["Playbooks", "/kb/playbooks/source-prompt-build-verify-teach-archive-improve"],
];

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
            {categories.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
        <nav className="kb-docs-category-list">
          {categories.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
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
