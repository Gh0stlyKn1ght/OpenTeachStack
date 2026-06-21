import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";
import { AcademicHeader } from "@/components/AcademicHeader";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Teaching Teachers — Curriculum Systems for Educators",
  description: "Willing to learn for the future.",
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
  openGraph: {
    title: "Teaching Teachers — Curriculum Systems for Educators",
    description: "Willing to learn for the future.",
    url: SITE_URL,
    siteName: "Teaching Teachers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teaching Teachers",
    description: "Willing to learn for the future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${atkinson.variable} ${jetbrainsMono.variable} h-full antialiased`}
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

