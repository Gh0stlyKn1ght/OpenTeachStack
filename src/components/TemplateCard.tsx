interface TemplateCardProps {
  title: string;
  description: string;
  downloadUrl?: string;
  viewUrl?: string;
  format: 'Google Sheet' | 'Google Doc' | 'Google Slides' | 'PDF' | string;
  status?: "Available" | "Draft" | "Coming in v1" | "Planned";
  tags?: string[];
}

export default function TemplateCard({
  title,
  description,
  downloadUrl,
  viewUrl,
  format,
  status = "Coming in v1",
  tags,
}: TemplateCardProps) {
  return (
    <div className="my-4 rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap mb-2">
            <span className="font-heading font-semibold text-sm text-foreground">
              {title}
            </span>
            <span className="rounded-sm bg-accent/15 px-1.5 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-accent">
              {format}
            </span>
            <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-slate">
              {status}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate font-sans mb-2">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-surface-alt px-1.5 py-0.5 text-[0.6rem] font-mono text-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {viewUrl || downloadUrl ? (
          <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
            {viewUrl && (
              <a
                href={viewUrl}
                className="rounded-sm border border-border px-2 py-1 text-xs font-mono uppercase tracking-wider text-slate no-underline transition-colors hover:border-accent/40 hover:text-link"
                aria-label={`View ${title}`}
              >
                View
              </a>
            )}
            {downloadUrl && (
              <a
                href={downloadUrl}
                className="rounded-sm border border-border px-2 py-1 text-xs font-mono uppercase tracking-wider text-slate no-underline transition-colors hover:border-accent/40 hover:text-link"
                aria-label={`Download ${title}`}
              >
                MD
              </a>
            )}
          </div>
        ) : (
          <span className="flex-shrink-0 mt-0.5 text-xs font-mono uppercase tracking-wider text-foreground/35">
            Planned
          </span>
        )}
      </div>
    </div>
  );
}

