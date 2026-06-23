import { type ReactNode } from 'react';

interface ReflectionPromptProps {
  children: ReactNode;
}

export default function ReflectionPrompt({ children }: ReflectionPromptProps) {
  return (
    <aside className="my-8 rounded-md border-l-4 border-accent bg-surface-alt/50 p-5 pl-6">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        Reflection
      </p>
      <div className="text-sm leading-relaxed text-foreground/85 font-sans">
        {children}
      </div>
    </aside>
  );
}

