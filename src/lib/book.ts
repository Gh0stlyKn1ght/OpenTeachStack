import { MODULES, PATHWAY_COURSES } from "./metadata";

export interface SkillNode {
  skill: string;
  courses: string[];
  description: string;
}

export interface EvidenceTopic {
  title: string;
  claim: string;
  sourceNote: string;
  relatedPath: string;
}

export const METHOD_STEPS = [
  "Source",
  "Prompt",
  "Build",
  "Verify",
  "Teach",
  "Archive",
  "Improve",
];

export const CHAPTER_PROBLEMS: Record<string, string> = {
  "teacher-builder-mindset":
    "Teachers are handed tools and expectations without a practical operating system for curriculum work.",
  prompting:
    "AI output gets messy when the teacher does not define role, context, sources, constraints, and revision rules.",
  "ai-literacy-verification":
    "AI can sound correct while inventing details, flattening teacher voice, or skipping privacy and source checks.",
  "standards-targets":
    "Standards documents are often treated as decoration instead of being translated into teachable targets.",
  "course-unit-architecture":
    "Lesson ideas become hard to teach when they are not connected by a coherent unit structure.",
  "open-resources":
    "Useful resources are scattered across the web, but teachers still need credibility, license, and citation decisions.",
  "google-workspace-planning":
    "Drive folders, Docs, Sheets, Forms, and Slides turn chaotic when they are not planned as one system.",
  "assessment-feedback":
    "Assessments lose power when they do not clearly connect to learning targets and feedback moments.",
  "delivery-planning":
    "Even strong curriculum fails when student directions, pacing, materials, and backup plans are not ready.",
  "mini-unit-capstone":
    "A useful mini-unit needs alignment, sources, assessment, delivery, verification, and revision evidence in one package.",
};

export const CHAPTER_SKILLS: Record<string, string[]> = {
  "teacher-builder-mindset": [
    "systems thinking",
    "workflow audit",
    "documentation",
  ],
  prompting: ["AI literacy", "communication", "task design"],
  "ai-literacy-verification": [
    "source checking",
    "risk review",
    "professional judgment",
  ],
  "standards-targets": [
    "curriculum alignment",
    "assessment design",
    "compliance literacy",
  ],
  "course-unit-architecture": [
    "instructional design",
    "sequence planning",
    "artifact design",
  ],
  "open-resources": [
    "information literacy",
    "copyright awareness",
    "resource evaluation",
  ],
  "google-workspace-planning": [
    "data organization",
    "workflow design",
    "digital file systems",
  ],
  "assessment-feedback": [
    "rubric design",
    "feedback loops",
    "evidence gathering",
  ],
  "delivery-planning": [
    "classroom operations",
    "student directions",
    "contingency planning",
  ],
  "mini-unit-capstone": [
    "portfolio assembly",
    "revision habits",
    "publishable curriculum",
  ],
};

export const TRANSFERABLE_SKILLS: SkillNode[] = [
  {
    skill: "AI literacy",
    courses: ["OTS-101", "OTS-260", "OTS-320"],
    description:
      "Prompt, critique, verify, and revise AI-assisted work without surrendering teacher judgment.",
  },
  {
    skill: "Source evaluation",
    courses: ["OTS-101", "OTS-240", "OTS-301"],
    description:
      "Check credibility, licensing, official documentation, and reuse decisions before teaching from a source.",
  },
  {
    skill: "Automation thinking",
    courses: ["OTS-201", "OTS-220", "OTS-320"],
    description:
      "Recognize repeated teacher tasks and design safer workflows before introducing scripts or agents.",
  },
  {
    skill: "Cyber safety",
    courses: ["OTS-101", "OTS-280", "OTS-301"],
    description:
      "Protect identity, accounts, public websites, repositories, and classroom-facing resources.",
  },
  {
    skill: "Documentation",
    courses: ["OTS-101", "OTS-240", "OTS-399"],
    description:
      "Leave behind readable instructions, source notes, revision history, and handoff-ready curriculum artifacts.",
  },
  {
    skill: "Web publishing",
    courses: ["OTS-240", "OTS-301", "OTS-399"],
    description:
      "Move from private files to maintainable public course hubs with accessibility and citation habits.",
  },
];

export const EVIDENCE_TOPICS: EvidenceTopic[] = [
  {
    title: "Teacher workflow load",
    claim:
      "Teaching work includes repeated planning, assessment, communication, source review, and file-management tasks that benefit from reusable systems.",
    sourceNote:
      "Use the source bank for official documentation and research-backed references before adding quantitative claims.",
    relatedPath: "/library/source-bank",
  },
  {
    title: "AI literacy",
    claim:
      "Educators need practical AI habits: prompt design, verification, privacy review, and documented revision decisions.",
    sourceNote:
      "Ground claims in official AI guidance and classroom policy sources; avoid invented adoption statistics.",
    relatedPath: "/sources",
  },
  {
    title: "Cyber safety",
    claim:
      "Public-facing educators need account hygiene, identity separation, profile review, and safe publishing routines.",
    sourceNote:
      "Use official security guidance and the Teaching Teachers cyber safety materials as the local baseline.",
    relatedPath: "/safety",
  },
  {
    title: "Transferable digital skills",
    claim:
      "Prompting, documentation, source evaluation, accessibility, automation logic, and web publishing transfer beyond one platform.",
    sourceNote:
      "Treat this as a skills map, not a labor-market claim, until external data is cited.",
    relatedPath: "/skills",
  },
];

export const BOOK_CHAPTERS = MODULES.map((module) => ({
  ...module,
  href: `/book/ots-101/${module.slug}`,
  sourceHref: `/course/${module.slug}`,
  problem:
    CHAPTER_PROBLEMS[module.id] ??
    "This chapter turns a recurring teacher workflow problem into a reusable artifact.",
  transferableSkills: CHAPTER_SKILLS[module.id] ?? ["curriculum systems"],
  duration: "1 week",
  difficulty: module.number === "10" ? "Capstone" : "Foundation",
}));

export const COURSE_SKILL_MATRIX = PATHWAY_COURSES.map((course) => ({
  code: course.code,
  title: course.title,
  skills: TRANSFERABLE_SKILLS.filter((skill) =>
    skill.courses.includes(course.code),
  ).map((skill) => skill.skill),
  artifacts: course.majorArtifacts.slice(0, 3),
}));

export function getChapterBySlug(slug: string) {
  return BOOK_CHAPTERS.find((chapter) => chapter.slug === slug);
}
