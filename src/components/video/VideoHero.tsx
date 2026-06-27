export default function VideoHero({
  videoCount,
  approvedCount,
}: {
  videoCount: number;
  approvedCount: number;
}) {
  return (
    <section className="border-b border-border bg-surface-alt/35">
      <div className="mx-auto grid w-[min(100%-2rem,76rem)] gap-8 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="m-0 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent">
            Video Library
          </p>
          <h1 className="m-0 mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-none text-heading md:text-6xl">
            Learn tech teaching through curated video.
          </h1>
          <p className="m-0 mt-5 max-w-2xl text-lg leading-relaxed text-foreground/68">
            Curated videos for educators building confidence with AI, CS,
            cybersecurity, robotics, and modern classroom technology.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#video-grid"
              className="rounded-sm bg-[var(--color-text)] px-5 py-3 text-sm font-bold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
            >
              Browse videos
            </a>
            <a
              href="https://github.com/Gh0stlyKn1ght/OpenTeachStack/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border bg-surface px-5 py-3 text-sm font-bold text-foreground no-underline transition-colors hover:border-accent/50"
            >
              Suggest a video
            </a>
          </div>
        </div>

        <dl className="grid min-w-48 grid-cols-2 gap-3 border border-border bg-surface p-4">
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45">
              Videos
            </dt>
            <dd className="m-0 font-heading text-3xl font-bold text-foreground">
              {videoCount}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/45">
              Approved
            </dt>
            <dd className="m-0 font-heading text-3xl font-bold text-foreground">
              {approvedCount}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
