import Image from "next/image";
import { COURSE_CODE, MODULES } from "@/lib/metadata";
import TechConfidenceBadge from "./TechConfidenceBadge";

interface LessonHeroProps {
  title: string;
  moduleId?: string;
  duration?: string;
  level?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function LessonHero({
  title,
  moduleId,
  duration,
  level,
  imageSrc,
  imageAlt = "",
}: LessonHeroProps) {
  const courseModule = MODULES.find((item) => item.id === moduleId);

  return (
    <header className="mb-8 overflow-hidden rounded-xl border border-border bg-surface">
      {imageSrc && (
        <div className="relative aspect-[16/9] border-b border-border bg-background">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 672px, calc(100vw - 48px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      )}
      <div className="relative p-6 sm:p-8">
        {!imageSrc && (
          <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        )}
        <div className="relative">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {COURSE_CODE}
            {courseModule ? ` · Module ${courseModule.number} · ${courseModule.title}` : ""}
          </p>
          <h1 className="mb-4 font-heading text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {courseModule && (
            <p className="mb-5 max-w-2xl text-sm leading-relaxed text-slate">
              {courseModule.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {duration && (
              <span className="rounded-md border border-border bg-background/70 px-3 py-2 font-mono text-xs text-slate">
                {duration}
              </span>
            )}
            {level && (
              <span className="rounded-md border border-border bg-background/70 px-3 py-2 font-mono text-xs uppercase tracking-wider text-slate">
                {level}
              </span>
            )}
            <TechConfidenceBadge moduleId={moduleId} />
          </div>
        </div>
      </div>
    </header>
  );
}

