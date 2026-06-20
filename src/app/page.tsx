"use client";

import Link from "next/link";
import Image from "next/image";
import ModuleIndex from "@/components/ModuleIndex";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import StatsBar from "@/components/StatsBar";
import AnimatedSection from "@/components/AnimatedSection";
import BeforeAfterGrid from "@/components/BeforeAfterGrid";
import LearnerJourney from "@/components/LearnerJourney";
import PathwayCard from "@/components/PathwayCard";
import { PATHWAY_COURSES, REPOSITORY_URL } from "@/lib/metadata";

const badges = [
  {
    alt: "License: MIT",
    src: "https://img.shields.io/badge/Code-MIT-blue?style=flat-square",
    href: "/license",
  },
  {
    alt: "Content: CC BY-NC-SA 4.0",
    src: "https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square",
    href: "/license",
  },
  {
    alt: "Built with Next.js",
    src: "https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=flat-square&logo=next.js",
    href: "https://nextjs.org",
  },
  {
    alt: "TypeScript",
    src: "https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white",
    href: "https://www.typescriptlang.org",
  },
  {
    alt: "Tailwind CSS",
    src: "https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white",
    href: "https://tailwindcss.com",
  },
  {
    alt: "MDX",
    src: "https://img.shields.io/badge/Content-MDX-FCB32C?style=flat-square&logo=mdx&logoColor=black",
    href: "https://mdxjs.com",
  },
  {
    alt: "PRs Welcome",
    src: "https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=github",
    href: `${REPOSITORY_URL}/pulls`,
  },
  {
    alt: "GitHub repository",
    src: "https://img.shields.io/badge/GitHub-OpenTeachStack-181717?style=flat-square&logo=github",
    href: REPOSITORY_URL,
  },
  {
    alt: "Modules",
    src: "https://img.shields.io/badge/OTS--101-10%20Modules-0969DA?style=flat-square",
    href: "/course",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Badges ────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface-alt/30 py-5">
        <div className="mx-auto max-w-4xl px-6 flex flex-wrap justify-center gap-2">
          {badges.map((b) => (
            <a
              key={b.alt}
              href={b.href}
              target={b.href.startsWith("http") ? "_blank" : undefined}
              rel={b.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex no-underline"
            >
              <Image
                src={b.src}
                alt={b.alt}
                width={120}
                height={20}
                className="h-5 w-auto rounded-none border-none"
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>

      <StatsBar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <AnimatedSection>
          <div className="mb-8 max-w-2xl">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-accent">
              Pathway
            </span>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
              Start approachable. Grow technical.
            </h2>
            <p className="text-sm leading-relaxed text-slate">
              Open TeachStack begins with no-code curriculum systems and grows
              toward automation, open publishing, AI agents, and course
              infrastructure when teachers are ready.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {PATHWAY_COURSES.map((course) => (
              <PathwayCard key={course.code} course={course} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <BeforeAfterGrid />
      <LearnerJourney />

      {/* ── What This Is ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <AnimatedSection>
          <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
            About
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            What Open TeachStack Is
          </h2>
          <div className="prose-academic">
            <p>
              Open TeachStack is a free, open-source pathway for educators
              building curriculum systems with AI, automation, open resources,
              Google Workspace, and modern publishing workflows. OTS-101 is the
              focused foundations course. It is not a platform. It is not an
              LMS. It is a field guide.
            </p>
            <p>The course teaches you to:</p>
            <ul className="space-y-2">
              <li>
                <strong>Prompt</strong> — Write structured prompts that produce
                lesson plans, rubrics, quizzes, and differentiation supports
              </li>
              <li>
                <strong>Align</strong> — Build courses from state standards
                without blindly copying them into lessons
              </li>
              <li>
                <strong>Verify</strong> — Check AI output for accuracy,
                privacy, copyright, accessibility, and standards alignment
              </li>
              <li>
                <strong>Evaluate</strong> — Curate trustworthy resources, OER,
                and Creative Commons materials without fake attribution
              </li>
              <li>
                <strong>Deliver</strong> — Turn well-designed lessons into
                well-delivered experiences with slides, video, and routines
              </li>
              <li>
                <strong>Plan</strong> — Build a mini-unit system with artifacts
                you can teach, revise, and share locally
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </section>

      <hr className="mx-auto max-w-3xl border-t border-border" />

      {/* ── About the Author ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <AnimatedSection>
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
            <div className="overflow-hidden rounded-md border border-border bg-surface">
              <Image
                src="/aboutme.jpg"
                alt="Black and white portrait of JC Nevarez"
                width={1024}
                height={1536}
                className="aspect-[4/5] h-auto w-full object-cover object-[50%_38%]"
              />
            </div>

            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-accent">
                About JC Nevarez
              </span>
              <h2 className="mb-5 font-serif text-3xl font-bold text-foreground">
                Built from classroom pressure, not conference theory.
              </h2>
              <div className="prose-academic">
                <p>
                  I am a computer science, robotics, engineering, and
                  cybersecurity educator in New Jersey, focused on helping
                  teachers build practical curriculum systems with AI,
                  automation, open resources, and modern digital tools.
                </p>
                <p>
                  I created <strong>Open TeachStack</strong> because teachers
                  are expected to design, organize, deliver, and update modern
                  curriculum without being taught the technical workflows behind
                  that work. This project is my attempt to make those workflows
                  clear, practical, and usable.
                </p>
                <p>
                  My goal is simple: help teachers stop depending on scattered
                  files and disconnected platforms, and start building
                  curriculum systems they can actually control.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-5 inline-flex text-sm font-semibold text-link no-underline hover:underline"
              >
                Read the full author story &rarr;
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <hr className="mx-auto max-w-3xl border-t border-border" />

      {/* ── Who It's For ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <AnimatedSection>
          <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
            Audience
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Who This Is For
          </h2>
          <div className="prose-academic">
            <p>
              This course is for educators who want practical control over their
              curriculum infrastructure — not another tool recommendation list.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Classroom teachers",
              "CTE / career-tech teachers",
              "STEM and robotics teachers",
              "Computer science teachers",
              "Department leads and curriculum directors",
              "Club advisors and program coordinators",
              "Teacher-creators building public resources",
              "Educators overwhelmed by AI tools who want clarity",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-foreground/80 text-[0.95rem] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 border border-border rounded-lg bg-surface-alt/30">
            <p className="text-sm text-foreground/60 leading-relaxed m-0">
              <strong className="text-foreground">Prerequisites:</strong> A
              Google account, basic computer literacy, and willingness to build.
              No coding experience required. Apps Script, GitHub, domains,
              course sites, and AI coding agents move into later pathway
              courses.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <hr className="mx-auto max-w-3xl border-t border-border" />

      {/* ── Course Philosophy ─────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <AnimatedSection>
          <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            How This Course Works
          </h2>
          <div className="space-y-6">
            {[
              {
                label: "Resources before lectures",
                text: "Each module opens with the tools, documents, and references teachers will actually use. Instruction follows from the resource.",
              },
              {
                label: "Standards as the starting point",
                text: "Curriculum design begins with state standards, not blank pages. AI accelerates the work, but the standards set the direction.",
              },
              {
                label: "Build, don't subscribe",
                text: "Teachers build systems they own — prompt libraries, resource trackers, verification checklists, and revision logs — rather than renting access to platforms.",
              },
              {
                label: "AI as a tool, not a replacement",
                text: "AI generates drafts. Teachers review, revise, and verify. Every AI output is checked before it reaches students.",
              },
              {
                label: "Open by default",
                text: "All course materials are openly licensed. Fork it, remix it, teach with it, improve it.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 border-l-2 border-accent/30 pl-5 py-1"
              >
                <div>
                  <h3 className="font-sans font-semibold text-foreground text-[0.95rem] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed m-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Product Carousel ──────────────────────────────────────── */}
      <ProductCarousel />

      {/* ── What You Will Build ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <AnimatedSection>
          <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
            Outcomes
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
            What You Will Build
          </h2>
          <p className="text-foreground/60 mb-8">
            By the end of OTS-101, you will have assembled a foundations-level
            mini-unit system. Specific deliverables:
          </p>

          <ol className="space-y-4 list-none p-0">
            {[
              "A teacher workflow audit that names your current planning bottlenecks",
              "A standards unpacking sheet and mini-unit map for a real topic you teach",
              "A reusable lesson template and 3 to 5 lesson sequence",
              "A prompt library tested against your teacher voice and quality expectations",
              "A resource evaluation sheet with licensing, accessibility, and alignment notes",
              "An assessment or quiz draft plus a rubric tied to learning targets",
              "An AI verification checklist covering hallucinations, bias, citations, and standards claims",
              "A delivery plan with student-facing directions, pacing, feedback loops, and revision notes",
              "A reflection and revision log showing what you changed and why",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent font-mono text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80 text-[0.95rem] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </section>

      <hr className="mx-auto max-w-3xl border-t border-border" />

      {/* ── Course Modules ────────────────────────────────────────── */}
      <AnimatedSection>
        <ModuleIndex />
      </AnimatedSection>

      <hr className="mx-auto max-w-3xl border-t border-border" />

      {/* ── Quick Links ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <AnimatedSection>
          <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
            Explore
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            Key Sections
          </h2>

          <div className="divide-y divide-border border-y border-border">
            {[
              {
                href: "/prompts",
                title: "Prompt Library",
                desc: "Reusable prompt templates for planning, assessment, verification, and teacher voice preservation",
                badge: "14 templates",
              },
              {
                href: "/pathway",
                title: "Pathway Overview",
                desc: "See where Apps Script, GitHub, AI media, course sites, and coding agents belong after OTS-101",
                badge: "8 courses",
              },
              {
                href: "/safety",
                title: "AI Safety Guide",
                desc: "Non-negotiable rules for using AI tools in curriculum work — student data, verification, citations",
                badge: "essential",
              },
              {
                href: "/resources",
                title: "Resource Library",
                desc: "Curated tools, official source links, documentation, and references organized by course and topic",
                badge: "curated",
              },
              {
                href: "/sources",
                title: "Official Sources",
                desc: "Software documentation inventory for the apps, tools, APIs, and publishing platforms taught in the pathway",
                badge: "docs",
              },
              {
                href: "/field-notes",
                title: "Field Notes",
                desc: "Essays on building curriculum systems — ownership, Google Sheets, tool evaluation, digital infrastructure",
                badge: "essays",
              },
              {
                href: "/syllabus",
                title: "Full Syllabus",
                desc: "Foundations course description, outcomes, prerequisites, pacing guides, and mini-unit capstone",
                badge: "OTS-101",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between py-5 no-underline hover:bg-surface-alt/30 -mx-4 px-4 rounded-lg transition-colors"
              >
                <div className="min-w-0 mr-4">
                  <h3 className="font-sans font-semibold text-foreground group-hover:text-link transition-colors text-[0.95rem] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed m-0 truncate sm:whitespace-normal">
                    {item.desc}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-mono text-foreground/35 border border-border rounded-full px-3 py-1 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                  {item.badge}
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Open Source ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface-alt/20">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <AnimatedSection>
            <span className="inline-block text-xs font-mono text-accent uppercase tracking-[0.15em] mb-3">
              Open Source
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Built in the Open
            </h2>

            <div className="prose-academic mb-8">
              <p>
                Open TeachStack is an open-source project. The code is MIT
                licensed. The content is CC BY-NC-SA 4.0. You are free to use,
                adapt, and share everything for non-commercial educational
                purposes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {badges
                .filter((badge) =>
                  ["License: MIT", "Content: CC BY-NC-SA 4.0", "PRs Welcome", "GitHub repository"].includes(
                    badge.alt,
                  ),
                )
                .map((badge) => (
                  <a
                    key={`open-source-${badge.alt}`}
                    href={badge.href}
                    target={badge.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      badge.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex no-underline"
                  >
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={140}
                      height={20}
                      className="h-5 w-auto rounded-none border-none"
                      unoptimized
                    />
                  </a>
                ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://openteachstack.dev"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg no-underline bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                openteachstack.dev
              </a>
              <Link
                href="/contribute"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg no-underline border border-border text-foreground/70 hover:border-accent hover:text-accent transition-colors"
              >
                How to Contribute
              </Link>
              <Link
                href="/license"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg no-underline border border-border text-foreground/70 hover:border-accent hover:text-accent transition-colors"
              >
                License Details
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
