interface DownloadCardProps {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
}

export default function DownloadCard({
  title,
  description,
  fileUrl,
  fileType,
}: DownloadCardProps) {
  return (
    <div className="my-4 flex items-start gap-4 rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      {/* Download icon */}
      <div className="mt-0.5 flex-shrink-0 text-slate" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <a
            href={fileUrl}
            className="font-heading font-semibold text-foreground hover:text-link transition-colors text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
          <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-slate">
            {fileType}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate font-sans">
          {description}
        </p>
      </div>
    </div>
  );
}

