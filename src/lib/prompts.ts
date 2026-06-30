import prompts from "./prompts.json";

export const PROMPT_CATEGORIES = [
  "Curriculum Planning",
  "Lesson Building",
  "Standards Alignment",
  "Assessment and Rubrics",
  "AI Verification",
  "Differentiation and Accessibility",
  "Google Workspace Systems",
  "Source and OER Review",
  "Course Site Publishing",
  "Cyber Safety for Educators",
  "Apps Script / Automation Planning",
  "Reflection and Revision",
  "Capstone / Portfolio",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export type OtsCourseCode =
  | "OTS-101"
  | "OTS-201"
  | "OTS-220"
  | "OTS-240"
  | "OTS-260"
  | "OTS-280"
  | "OTS-301"
  | "OTS-320"
  | "OTS-399";

export interface TeacherPrompt {
  title: string;
  slug: string;
  category: PromptCategory;
  relatedCourses: OtsCourseCode[];
  relatedArtifacts: string[];
  useCase: string;
  teacherContextNeeded: string[];
  prompt: string;
  expectedOutput: string;
  verificationChecklist: string[];
  revisionStep: string;
  safetyPrivacyNote: string;
  tags: string[];
}

export const TEACHER_PROMPTS = prompts as TeacherPrompt[];

export const PROMPT_SLUG_ALIASES: Record<string, string> = {
  "build-mini-unit-map": "build-learning-target-lesson-map",
};

export function getPromptBySlug(slug: string) {
  const canonicalSlug = PROMPT_SLUG_ALIASES[slug] ?? slug;
  return TEACHER_PROMPTS.find((prompt) => prompt.slug === canonicalSlug);
}

export function getPromptCategories() {
  return [...new Set(TEACHER_PROMPTS.map((prompt) => prompt.category))].sort();
}

export function getPromptCourses() {
  return [...new Set(TEACHER_PROMPTS.flatMap((prompt) => prompt.relatedCourses))].sort();
}

export function getPromptArtifacts() {
  return [...new Set(TEACHER_PROMPTS.flatMap((prompt) => prompt.relatedArtifacts))].sort();
}

export function getPromptTags() {
  return [...new Set(TEACHER_PROMPTS.flatMap((prompt) => prompt.tags))].sort();
}
