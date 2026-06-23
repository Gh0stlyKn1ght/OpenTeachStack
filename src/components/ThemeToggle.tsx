"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "teaching-teachers-theme";

function getPreferredTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  if (document.documentElement.classList.contains("dark")) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hasMounted, setHasMounted] = useState(false);
  const label = !hasMounted
    ? "Theme settings loading"
    : theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode";
  const title = !hasMounted
    ? "Theme"
    : theme === "dark"
      ? "Light mode"
      : "Dark mode";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(getPreferredTheme());
      setHasMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [hasMounted, theme]);

  function toggleTheme() {
    const currentTheme = hasMounted
      ? theme
      : document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setHasMounted(true);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground"
      aria-label={label}
      title={title}
    >
      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6.6 6.6 0 0 0 8.9 8.9A9 9 0 1 1 12 3Z" />
        </svg>
      )}
    </button>
  );
}
