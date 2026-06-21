export default function ChapterProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="my-8">
      <div className="mb-2 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
        <span>
          Chapter {current} of {total}
        </span>
        <span>{percentage}% path position</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-alt">
        <div
          className="h-1.5 rounded-full bg-accent"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
