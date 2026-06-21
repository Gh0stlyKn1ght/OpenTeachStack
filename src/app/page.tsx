import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import OneDayWorkflow from "@/components/OneDayWorkflow";
import StatsBar from "@/components/StatsBar";
import PathwayCard from "@/components/PathwayCard";
import GitHubIcon from "@/components/GitHubIcon";
import { PATHWAY_COURSES, REPOSITORY_URL } from "@/lib/metadata";

const keyLinks = [
  {
    href: "/start",
    title: "Start Here",
    desc: "A plain-language entry point for teachers who want the workflow before the technical stack.",
    badge: "Day 1",
  },
  {
    href: "/course",
    title: "OTS-101 Foundations",
    desc: "The first course: prompts, standards, sources, assessment, delivery, and a mini-unit capstone.",
    badge: "Course",
  },
  {
    href: "/library",
    title: "Library",
    desc: "Prompts, templates, field notes, official sources, examples, safety checks, and licensing.",
    badge: "Tools",
  },
  {
    href: "/course/release",
    title: "Release Packet",
    desc: "The finish line for OTS-101, including checks and a sample robotics mini-unit.",
    badge: "Ship",
  },
];

export default function HomePage() {
  const featuredCourses = PATHWAY_COURSES.slice(0, 4);

  return (
    <>
      <HeroSection />
      <StatsBar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          The Promise
        </p>
        <h2 className="mb-5 font-serif text-3xl font-bold text-foreground">
          Start with tomorrow. Build toward a system.
        </h2>
        <div className="prose-academic">
          <p>
            Teaching Teachers helps teachers turn scattered files, AI chats,
            standards, templates, and classroom pressure into a curriculum
            workflow they can actually control.
          </p>
          <p>
            The first move is simple: gather sources, draft carefully, verify
            the work, teach it, save it, and improve it after class.
          </p>
        </div>
      </section>

      <OneDayWorkflow />

      <section className="content-visibility-auto mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            Pathway
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
            Learn the workflow first. Add the technical stack when it helps.
          </h2>
          <p className="text-sm leading-relaxed text-slate">
            OTS-101 stays focused on the foundation. Later courses move into
            Google Workspace, Apps Script, open publishing, GitHub, course
            sites, cyber safety, and AI coding agents.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredCourses.map((course) => (
            <PathwayCard key={course.code} course={course} />
          ))}
        </div>

        <Link
          href="/pathway"
          className="mt-6 inline-flex text-sm font-semibold text-link no-underline hover:underline"
        >
          View the full pathway &rarr;
        </Link>
      </section>

      <ProductCarousel />

      <section className="content-visibility-auto mx-auto max-w-3xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Explore
        </p>
        <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
          Key Sections
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {keyLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 py-5 no-underline transition-colors hover:bg-surface-alt/30"
            >
              <div className="min-w-0">
                <h3 className="mb-1 font-sans text-[0.95rem] font-semibold text-foreground transition-colors group-hover:text-link">
                  {item.title}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-foreground/50">
                  {item.desc}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-foreground/35 transition-colors group-hover:border-accent/30 group-hover:text-accent">
                {item.badge}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-visibility-auto border-t border-border bg-surface-alt/20">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            Open Source
          </p>
          <h2 className="mb-5 font-serif text-3xl font-bold text-foreground">
            Built in the open.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-slate">
            Teaching Teachers is MIT licensed for code and CC BY-NC-SA 4.0 for
            content. Use it, remix it for your classroom, and improve it over
            time.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub repository"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground no-underline transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-5 w-5" title="" />
            </a>
            <Link
              href="/open-source"
              className="inline-flex items-center rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background no-underline transition-opacity hover:opacity-90"
            >
              Open Source Details
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
            >
              About the Author
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

