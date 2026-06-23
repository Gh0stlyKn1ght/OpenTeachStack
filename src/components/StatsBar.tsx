import { MODULES } from "@/lib/metadata";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";
import { sourceBankResources } from "@/lib/sourceBank";

const ACTIVE_LESSON_COUNT = 17;

interface StatProps {
  value: number;
  suffix: string;
  label: string;
}

function Stat({ value, suffix, label }: StatProps) {
  return (
    <div className="text-center">
      <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-2">
        {value}
        {suffix}
      </div>
      <div className="text-sm text-foreground/50 font-sans uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface-alt/50 py-16">
      <div className="mx-auto max-w-4xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <Stat value={MODULES.length} suffix="" label="Modules" />
        <Stat value={ACTIVE_LESSON_COUNT} suffix="" label="Lessons" />
        <Stat value={sourceBankResources.length} suffix="" label="Verified Links" />
        <Stat value={FOUNDATION_TEMPLATES.length} suffix="" label="Templates" />
      </div>
    </section>
  );
}

