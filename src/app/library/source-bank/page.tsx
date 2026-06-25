import type { Metadata } from "next";
import Image from "next/image";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import GitHubIcon from "@/components/GitHubIcon";
import {
  getSourceBankByCategory,
  sourceBankResources,
  verificationLabels,
  type VerificationStatus,
} from "@/lib/sourceBank";
import { createPageMetadata } from "@/lib/siteMetadata";
import { pageVisuals } from "@/lib/visualAssets";

export const metadata: Metadata = createPageMetadata({
  title: "Free Tools, Course Platforms, and Learning Resources — OpenTeachStack",
  description:
    "A verified source bank of free and education-friendly tools, platforms, curricula, and official links for teachers and students.",
  path: "/kb/source-bank",
  image: {
    url: pageVisuals.sourceBank.src,
    alt: pageVisuals.sourceBank.alt,
  },
});

const statusTone: Record<VerificationStatus, string> = {
  "verified-active": "border-green/30 bg-green/10 text-green",
  "verified-active-redirect": "border-blue/30 bg-blue/10 text-blue",
  "verified-js-app-not-404": "border-cyan/30 bg-cyan/10 text-cyan",
  "verified-active-shell-not-404": "border-cyan/30 bg-cyan/10 text-cyan",
  "verified-rate-limited-not-404": "border-amber/40 bg-amber/10 text-amber",
  "fetch-blocked-403-not-404": "border-amber/40 bg-amber/10 text-amber",
  "verified-retired-redirect": "border-orange/40 bg-orange/10 text-orange",
  "direct-unverified": "border-pink/40 bg-pink/10 text-pink",
};

function isGitHubUrl(url: string) {
  return url.includes("github.com");
}

export default function SourceBankPage() {
  const grouped = getSourceBankByCategory();

  return (
    <FieldGuidePage
      eyebrow="The Source Bank"
      title="Free tools, course platforms, and learning resources."
      subtitle="OpenTeachStack keeps a source bank instead of handing teachers random links. Use official sources first, check what is free, check what needs accounts, and read the privacy and age requirements before assigning platforms."
      breadcrumbs={[{ label: "Knowledge Base Library", href: "/kb/library" }]}
      meta={[
        { label: "Resources", value: String(sourceBankResources.length) },
        { label: "Source rule", value: "Official links first" },
        { label: "Safety rule", value: "Check privacy and age terms" },
      ]}
      sidebar={
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface">
          <Image
            src={pageVisuals.sourceBank.src}
            alt={pageVisuals.sourceBank.alt}
            fill
            priority
            sizes="(min-width: 1024px) 360px, calc(100vw - 48px)"
            className="object-cover"
          />
        </div>
      }
    >
      <ArticleBody>
      <section className="grid gap-4 rounded-md border border-border bg-surface-alt/30 p-5 md:grid-cols-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground/40">
            Resources
          </p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {sourceBankResources.length}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground/40">
            Source Rule
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Official links first. AI output is never the source.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground/40">
            Safety Rule
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Check district policy, age terms, privacy, accessibility, and
            account requirements before assigning any platform.
          </p>
        </div>
      </section>

      <nav className="rounded-md border border-border bg-surface p-5">
        <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {grouped.map((group) => (
            <a
              key={group.category}
              href={`#${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-foreground/60 no-underline transition-colors hover:border-accent hover:text-accent"
            >
              {group.category}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-14">
        {grouped.map((group) => (
          <section
            key={group.category}
            id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="scroll-mt-24"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {group.resources.length} resources
                </p>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {group.category}
                </h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {group.resources.map((resource) => (
                <article
                  key={resource.id}
                  className="rounded-md border border-border bg-surface p-5"
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <a
                        href={resource.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-heading text-xl font-bold text-foreground no-underline transition-colors hover:text-link"
                      >
                        {isGitHubUrl(resource.officialUrl) && (
                          <GitHubIcon className="h-4 w-4" title="" />
                        )}
                        {resource.name}
                      </a>
                      <p className="mt-1 font-mono text-xs text-foreground/40">
                        {resource.officialUrl}
                      </p>
                    </div>
                    <span
                      className={`rounded-sm border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider ${statusTone[resource.verificationStatus]}`}
                    >
                      {verificationLabels[resource.verificationStatus]}
                    </span>
                  </div>

                  <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/35">
                        Audience
                      </dt>
                      <dd className="mt-1 text-slate">
                        {resource.audience.join(", ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/35">
                        Cost
                      </dt>
                      <dd className="mt-1 text-slate">{resource.cost}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/35">
                        Account
                      </dt>
                      <dd className="mt-1 text-slate">
                        {resource.accountRequired}
                      </dd>
                    </div>
                  </dl>

                  <div className="space-y-3 text-sm leading-relaxed text-slate">
                    <p>
                      <strong className="text-foreground">Best use:</strong>{" "}
                      {resource.bestUse}
                    </p>
                    <p>
                      <strong className="text-foreground">
                        Teacher setup:
                      </strong>{" "}
                      {resource.teacherSetupNote}
                    </p>
                    <p>
                      <strong className="text-foreground">
                        Privacy / age note:
                      </strong>{" "}
                      {resource.privacyNote}
                    </p>
                    {resource.note && (
                      <p>
                        <strong className="text-foreground">Note:</strong>{" "}
                        {resource.note}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}


