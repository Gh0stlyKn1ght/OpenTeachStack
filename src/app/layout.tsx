import type { Metadata } from "next";
import { AcademicHeader } from "@/components/AcademicHeader";
import { Footer } from "@/components/Footer";
import { createPageMetadata, rootMetadataBase } from "@/lib/siteMetadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: rootMetadataBase,
  ...createPageMetadata({
    title: "Teaching Teachers — Curriculum Systems for Educators",
    description: "A field guide for educators entering the tech world.",
    path: "/",
  }),
  keywords: [
    "teacher technology",
    "curriculum development",
    "open source education",
    "teaching teachers",
    "curriculum systems",
    "AI for teachers",
    "standards alignment",
    "OER",
    "education technology",
  ],
  authors: [{ name: "Teaching Teachers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var storedTheme = localStorage.getItem("teaching-teachers-theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (error) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AcademicHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

