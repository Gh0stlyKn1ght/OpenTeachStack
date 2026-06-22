import { type ReactNode } from 'react';
import BuildBox from './BuildBox';
import LessonHero from './LessonHero';
import OutcomeList from './OutcomeList';
import PreviousNext from './PreviousNext';
import ReadingProgress from './ReadingProgress';

interface NavLink {
  title: string;
  href: string;
}

interface LessonFrontmatter {
  title: string;
  module?: string;
  duration?: string;
  level?: string;
  outcomes?: string[];
}

interface LessonLayoutProps {
  frontmatter: LessonFrontmatter;
  children: ReactNode;
  previous?: NavLink;
  next?: NavLink;
  imageSrc?: string;
  imageAlt?: string;
}

export default function LessonLayout({
  frontmatter,
  children,
  previous,
  next,
  imageSrc,
  imageAlt,
}: LessonLayoutProps) {
  const { title, module: moduleName, duration, level, outcomes } = frontmatter;

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <ReadingProgress />

      <LessonHero
        title={title}
        moduleId={moduleName}
        duration={duration}
        level={level}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />

      <BuildBox moduleId={moduleName} />

      {/* Learning Outcomes */}
      {outcomes && outcomes.length > 0 && <OutcomeList outcomes={outcomes} />}

      {/* Main content */}
      <div className="prose-academic">{children}</div>

      {/* Navigation */}
      <PreviousNext previous={previous} next={next} />
    </article>
  );
}
