import Link from "next/link";
import { MODULES } from "@/lib/metadata";

export default function BuildBox({ moduleId }: { moduleId?: string }) {
  const courseModule = MODULES.find((item) => item.id === moduleId);

  if (!courseModule) return null;

  return (
    <section className="my-8 rounded-xl border border-green/30 bg-green/10 p-5">
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-green">
        You will build
      </p>
      <h2 className="mb-2 border-none font-heading text-xl font-bold text-foreground">
        {courseModule.buildArtifact}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-slate">{courseModule.evidence}</p>
      <div className="flex flex-wrap gap-2">
        {courseModule.templateSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/templates/${slug}`}
            className="rounded-sm border border-border bg-surface px-2 py-1 font-mono text-xs text-slate no-underline transition-colors hover:border-green/50 hover:text-green"
          >
            {slug.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </section>
  );
}

