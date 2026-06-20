import { type CSSProperties, type ReactNode } from 'react';

interface BuildTaskProps {
  children: ReactNode;
  estimatedTime?: string;
  tasks?: string[];
}

export default function BuildTask({
  children,
  estimatedTime,
  tasks,
}: BuildTaskProps) {
  return (
    <section
      className="callout my-8 p-6"
      style={{ "--callout-color": "var(--color-green)" } as CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-border pb-3">
        <h4 className="callout-label">
          Build Task
        </h4>
        {estimatedTime && (
          <span className="flex-shrink-0 text-xs font-mono text-slate">
            {estimatedTime}
          </span>
        )}
      </div>

      <div className="text-sm leading-relaxed text-foreground/85 font-sans mb-4">
        {children}
      </div>

      {tasks && tasks.length > 0 && (
        <ul className="space-y-2 pl-0 list-none">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
              <span
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-border"
                aria-hidden="true"
              />
              <span className="font-sans">{task}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
