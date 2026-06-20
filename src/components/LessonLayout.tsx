import { type ReactNode } from 'react';
import BuildBox from './BuildBox';
import LessonHero from './LessonHero';
import OutcomeList from './OutcomeList';
import PreviousNext from './PreviousNext';

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
}

export default function LessonLayout({
  frontmatter,
  children,
  previous,
  next,
}: LessonLayoutProps) {
  const { title, module: moduleName, duration, level, outcomes } = frontmatter;

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <LessonHero
        title={title}
        moduleId={moduleName}
        duration={duration}
        level={level}
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
