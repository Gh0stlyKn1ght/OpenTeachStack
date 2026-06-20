import { type CSSProperties, type ReactNode } from 'react';

interface RealityCheckProps {
  children: ReactNode;
}

export default function RealityCheck({ children }: RealityCheckProps) {
  return (
    <aside
      className="callout my-8 p-5 pl-6"
      style={{ "--callout-color": "var(--color-orange)" } as CSSProperties}
    >
      <p className="callout-label mb-2">
        Reality Check
      </p>
      <div className="text-sm leading-relaxed text-foreground/85 font-sans">
        {children}
      </div>
    </aside>
  );
}
