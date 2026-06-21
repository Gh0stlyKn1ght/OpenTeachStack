import Link from "next/link";
import GitHubIcon from "./GitHubIcon";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS, REPOSITORY_URL } from "@/lib/metadata";

export function AcademicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/86 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Site title */}
        <Link
          href="/"
          className="group no-underline"
        >
          <span className="block font-serif text-lg font-bold tracking-normal text-foreground transition-colors group-hover:text-accent">
            Teaching Teachers
          </span>
          <span className="hidden text-[0.68rem] font-mono uppercase tracking-widest text-foreground/40 sm:block">
            Willing to learn for the future.
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-[0.8125rem] font-sans text-foreground/65 no-underline transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:text-foreground hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Mobile menu toggle */}
        <div className="flex items-center gap-3">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Teaching Teachers on GitHub"
            title="Teaching Teachers on GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/65 no-underline transition-colors hover:border-accent hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" title="" />
          </a>
          <ThemeToggle />
          <MobileNav navLinks={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}

