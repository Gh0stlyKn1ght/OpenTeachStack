import type { Metadata } from "next";
import Link from "next/link";
import { CYBER_SAFETY_MODULES } from "@/lib/cyberSafety";

export const metadata: Metadata = {
  title: "OTS-280 Cyber Safety for Educators — Teaching Teachers",
  description:
    "Future Teaching Teachers pathway course on identity, privacy, accounts, and website safety for teachers.",
};

const artifacts = [
  "Teacher personal risk map",
  "Account inventory",
  "Password manager / MFA checklist",
  "Username and identity separation map",
  "Public profile audit",
  "Phishing response checklist",
  "VPN/Wi-Fi safety checklist",
  "Device/browser hardening checklist",
  "Teacher website security audit",
  "GitHub/repo exposure checklist",
  "Domain/privacy checklist",
  "Incident response mini-plan",
];

export default function CyberSafetyCoursePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          OTS-280 Future Pathway Course
        </p>
        <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          Cyber Safety for Educators
        </h1>
        <p className="mb-4 text-lg leading-relaxed text-foreground/65">
          Identity, Privacy, Accounts, and Website Safety for Teachers
        </p>
        <p className="max-w-2xl leading-relaxed text-slate">
          You are a teacher in a public-facing job. You deserve basic digital
          self-defense. This course is not about paranoia or hacker cosplay. It
          is basic maintenance for being an educator online.
        </p>
      </header>

      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
          Where This Fits
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-slate">
          OTS-280 belongs after AI Media and Lesson Delivery and before Teacher
          Course Sites, AI Coding Agents, public GitHub publishing, public
          teacher portfolios, and teacher-creator workflows.
        </p>
        <p className="m-0 text-sm leading-relaxed text-slate">
          It is not required for OTS-101. It is a safety track for teachers who
          are publishing, sharing, building public sites, or becoming more
          visible online.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
          Required Artifacts
        </h2>
        <ul className="grid gap-2 pl-0 sm:grid-cols-2">
          {artifacts.map((artifact) => (
            <li key={artifact} className="flex gap-3 text-sm text-slate">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{artifact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
          Course Modules
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {CYBER_SAFETY_MODULES.map((module) => (
            <article key={module.number} className="py-6">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-accent">
                  {module.number}
                </span>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {module.title}
                </h3>
              </div>
              <dl className="grid gap-4 text-sm sm:grid-cols-[170px_1fr]">
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Essential Question
                </dt>
                <dd className="text-foreground/70">{module.essentialQuestion}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Outcomes
                </dt>
                <dd className="text-foreground/70">
                  {module.learningOutcomes.join(" ")}
                </dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Vocabulary
                </dt>
                <dd className="text-foreground/70">
                  {module.keyVocabulary.join(", ")}
                </dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Teacher Note
                </dt>
                <dd className="text-foreground/70">{module.explanation}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Build Artifact
                </dt>
                <dd className="text-foreground/70">{module.buildArtifact}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Safety Check
                </dt>
                <dd className="text-foreground/70">{module.safetyCheck}</dd>
                <dt className="font-mono uppercase tracking-wider text-foreground/35">
                  Reflection
                </dt>
                <dd className="text-foreground/70">{module.reflectionPrompt}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-md border border-border bg-surface-alt/40 p-5">
        <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
          Related Library Items
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/prompts#teacher-website-security-audit"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Website Audit Prompt
          </Link>
          <Link
            href="/sources"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Official Sources
          </Link>
          <Link
            href="/field-notes/teachers-need-digital-self-defense"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Field Note
          </Link>
        </div>
      </section>
    </div>
  );
}

