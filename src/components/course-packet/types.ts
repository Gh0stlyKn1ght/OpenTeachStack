export interface CoursePacketSectionView {
  number: string;
  title: string;
  type: string;
  duration: string;
  slug: string;
  href: string;
  artifact?: string;
}

export interface CoursePacketChapterView {
  number: string;
  title: string;
  slug: string;
  href: string;
  summary: string;
  problem: string;
  essentialQuestion: string;
  buildArtifact: string;
  duration: string;
  difficulty?: string;
  sections: CoursePacketSectionView[];
}

export interface CoursePacketView {
  code: string;
  slug: string;
  title: string;
  subtitle: string;
  thesis: string;
  coursePath: string;
  level: string;
  status: string;
  prerequisite?: string;
  finalArtifact: string;
  chapters: CoursePacketChapterView[];
}
