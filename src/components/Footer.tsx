import Link from "next/link";
import GitHubIcon from "./GitHubIcon";
import { REPOSITORY_URL } from "@/lib/metadata";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Course", href: "/course" },
      { label: "Pathway", href: "/pathway" },
      { label: "Syllabus", href: "/syllabus" },
      { label: "Field Notes", href: "/field-notes" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Prompt Library", href: "/prompts" },
      { label: "Resources", href: "/resources" },
      { label: "Course Audit", href: "/course/audit" },
      { label: "Safety Guide", href: "/safety" },
    ],
  },
  {
    title: "Open Source",
    links: [
      { label: "Website", href: "https://openteachstack.dev" },
      { label: "GitHub", href: REPOSITORY_URL },
      { label: "Contribute", href: "/open-source" },
      { label: "License", href: "/license" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Column grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground/40 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground no-underline transition-colors"
                      >
                        {link.href.includes("github.com") && (
                          <GitHubIcon className="h-3.5 w-3.5" title="" />
                        )}
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/60 hover:text-foreground no-underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-foreground/40">
              &copy; {year} Open TeachStack &middot; OTS-101
            </p>
            <p className="text-xs text-foreground/40">
              Code{" "}
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground no-underline transition-colors"
              >
                MIT
              </a>
              {" "}&middot; Content{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground no-underline transition-colors"
              >
                CC BY-NC-SA 4.0
              </a>
            </p>
            <p className="text-xs text-foreground/40">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground no-underline transition-colors"
              >
                Next.js
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
