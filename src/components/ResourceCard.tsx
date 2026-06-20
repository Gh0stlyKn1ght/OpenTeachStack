import GitHubIcon from "./GitHubIcon";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  type: 'Tool' | 'Article' | 'Repository' | 'Course';
  license?: string;
}

const typeBadgeClasses: Record<ResourceCardProps['type'], string> = {
  Tool: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Article: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Repository: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  Course: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function ResourceCard({
  title,
  description,
  url,
  type,
  license,
}: ResourceCardProps) {
  const isGitHubUrl = url.includes("github.com");

  return (
    <div className="my-4 rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="flex items-baseline gap-2 flex-wrap mb-2">
        <a
          href={url}
          className="inline-flex items-center gap-2 font-serif font-semibold text-sm text-foreground hover:text-link transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isGitHubUrl && <GitHubIcon className="h-4 w-4" title="" />}
          {title}
        </a>
        <span
          className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider ${typeBadgeClasses[type]}`}
        >
          {type}
        </span>
        {license && (
          <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 text-[0.65rem] font-mono text-slate">
            {license}
          </span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-slate font-sans">
        {description}
      </p>
    </div>
  );
}
