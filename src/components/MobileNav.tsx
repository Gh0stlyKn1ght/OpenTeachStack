"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GitHubIcon from "./GitHubIcon";

export default function MobileNav({
  navLinks,
  repositoryUrl,
}: {
  navLinks: { label: string; href: string }[];
  repositoryUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls={menuId}
        aria-expanded={open}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id={menuId}
          className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background shadow-sm lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block rounded-sm border border-transparent px-3 py-3 text-sm font-semibold text-foreground/70 no-underline transition-colors hover:border-border hover:bg-surface-alt/45 hover:text-foreground aria-[current=page]:border-accent/35 aria-[current=page]:bg-accent/10 aria-[current=page]:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3">
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-sm border border-border px-3 py-3 text-sm font-semibold text-foreground/70 no-underline transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" title="" />
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
