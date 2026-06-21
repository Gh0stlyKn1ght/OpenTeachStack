import PrintChapterButton from "./PrintChapterButton";

interface BookChapterHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  chapterNumber?: string;
}

export default function BookChapterHeader({
  eyebrow,
  title,
  subtitle,
  chapterNumber,
}: BookChapterHeaderProps) {
  return (
    <header className="book-chapter-header">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
        <h1 className="m-0 max-w-4xl font-serif text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/62 sm:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="flex items-start gap-3">
        {chapterNumber && (
          <span className="hidden font-serif text-7xl font-black leading-none text-accent/18 sm:block">
            {chapterNumber}
          </span>
        )}
        <PrintChapterButton />
      </div>
    </header>
  );
}
