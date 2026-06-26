import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import { AcademicHeader } from "@/components/AcademicHeader";
import { Footer } from "@/components/Footer";
import { createPageMetadata, rootMetadataBase } from "@/lib/siteMetadata";
import "./globals.css";

const headingFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: rootMetadataBase,
  ...createPageMetadata({
    title: "OpenTeachStack — Curriculum Systems for Educators",
    description: "A field guide for educators entering the tech world.",
    path: "/",
  }),
  keywords: [
    "teacher technology",
    "curriculum development",
    "open source education",
    "OpenTeachStack",
    "curriculum systems",
    "AI for teachers",
    "standards alignment",
    "OER",
    "education technology",
  ],
  authors: [{ name: "OpenTeachStack" }],
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
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Script
          id="openteachstack-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
try {
  var storedTheme = localStorage.getItem("openteachstack-theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (error) {}
            `,
          }}
        />
        <AcademicHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

