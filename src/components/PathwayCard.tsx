import Link from "next/link";
import type { CSSProperties } from "react";
import type { PathwayCourse } from "@/lib/metadata";

const accentByCode: Record<string, string> = {
  "OTS-101": "var(--color-blue)",
  "OTS-201": "var(--color-green)",
  "OTS-220": "var(--color-cyan)",
  "OTS-240": "var(--color-purple)",
  "OTS-260": "var(--color-pink)",
  "OTS-301": "var(--color-amber)",
  "OTS-320": "var(--color-orange)",
  "OTS-399": "var(--color-link)",
};

const iconByCode: Record<string, string> = {
  "OTS-101": "01",
  "OTS-201": "GW",
  "OTS-220": "AS",
  "OTS-240": "OS",
  "OTS-260": "AI",
  "OTS-301": "WEB",
  "OTS-320": "BOT",
  "OTS-399": "CAP",
};

export default function PathwayCard({ course }: { course: PathwayCourse }) {
  const accent = accentByCode[course.code] ?? "var(--color-accent)";
  const isCurrent = course.code === "OTS-101";

  return (
    <article
      className="lab-card p-5"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            {course.code}
          </p>
          <h3 className="m-0 font-serif text-xl font-bold text-foreground">
            {course.title}
          </h3>
        </div>
        <span
          className="flex h-11 min-w-11 items-center justify-center rounded-md border font-mono text-xs font-bold"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 38%, var(--color-border))`,
            color: accent,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
          }}
        >
          {iconByCode[course.code] ?? "OTS"}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-slate">{course.purpose}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55">
          {course.level}
        </span>
        <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55">
          {course.status}
        </span>
      </div>
      {isCurrent && (
        <Link
          href="/course"
          className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
        >
          Start foundations
        </Link>
      )}
    </article>
  );
}
