import Link from "next/link";
import GitHubIcon from "./GitHubIcon";
import LinkedInIcon from "./LinkedInIcon";
import { AUTHOR, REPOSITORY_URL } from "@/lib/metadata";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Start", href: "/book/ots-101" },
      { label: "Pathway", href: "/pathway" },
      { label: "Knowledge Base", href: "/kb" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Knowledge Base",
    links: [
      { label: "Library", href: "/kb/library" },
      { label: "Prompts", href: "/kb/prompts" },
      { label: "Templates", href: "/kb/templates" },
      { label: "Source Bank", href: "/kb/source-bank" },
      { label: "Safety", href: "/kb/safety" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: REPOSITORY_URL },
      { label: "LinkedIn", href: AUTHOR.linkedinUrl },
      { label: "License", href: "/license" },
      { label: "Privacy/Safety", href: "/kb/safety" },
      { label: "Contact", href: "/about" },
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
                        {link.href.includes("linkedin.com") && (
                          <LinkedInIcon className="h-3.5 w-3.5" title="" />
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
              &copy; {year} OpenTeachStack &middot; openteachstack.dev
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
            <div className="flex items-center gap-2">
              <a
                href={REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OpenTeachStack on GitHub"
                title="OpenTeachStack on GitHub"
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-foreground/50 no-underline transition-colors hover:border-accent hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" title="" />
              </a>
              <a
                href={AUTHOR.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JC Nevarez on LinkedIn"
                title="JC Nevarez on LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-foreground/50 no-underline transition-colors hover:border-accent hover:text-foreground"
              >
                <LinkedInIcon className="h-4 w-4" title="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

