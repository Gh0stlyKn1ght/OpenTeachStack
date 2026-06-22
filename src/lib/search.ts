import {
  BOOK_CHAPTERS,
  getSectionHref as getBookSectionHref,
} from "./book";
import {
  COURSE_STRUCTURES,
  getChapterHref,
  getSectionHref,
  type CourseStructure,
} from "./courseStructures";
import { CYBER_BOOK_CHAPTERS } from "./cyberSafety";
import { sourceBankResources } from "./sourceBank";
import { FOUNDATION_TEMPLATES } from "./templates";

export interface SearchRecord {
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  keywords: string[];
}

export function getOts101SearchRecords(): SearchRecord[] {
  return BOOK_CHAPTERS.flatMap((chapter) => [
    {
      title: chapter.title,
      href: chapter.href,
      eyebrow: "OTS-101 Chapter",
      description: chapter.description,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        chapter.problem,
        ...chapter.transferableSkills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: getBookSectionHref(chapter, section),
      eyebrow: `OTS-101 ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getCyberSearchRecords(): SearchRecord[] {
  return CYBER_BOOK_CHAPTERS.flatMap((chapter) => [
    {
      title: chapter.title,
      href: chapter.href,
      eyebrow: "OTS-280 Chapter",
      description: chapter.description,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        chapter.safetyCheck,
        ...chapter.transferableSkills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: `${chapter.href}/${section.number.replace(".", "-")}`,
      eyebrow: `OTS-280 ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getCourseStructureSearchRecords(
  course: CourseStructure,
): SearchRecord[] {
  return course.chapters.flatMap((chapter) => [
    {
      title: chapter.title,
      href: getChapterHref(course, chapter),
      eyebrow: `${course.code} Chapter`,
      description: chapter.problem,
      keywords: [
        chapter.number,
        chapter.buildArtifact,
        chapter.essentialQuestion,
        ...chapter.skills,
      ],
    },
    ...chapter.sections.map((section) => ({
      title: section.title,
      href: getSectionHref(course, chapter, section),
      eyebrow: `${course.code} ${section.number}`,
      description: section.artifact ?? chapter.buildArtifact,
      keywords: [
        section.number,
        section.type,
        section.duration,
        section.artifact ?? "",
        chapter.title,
        chapter.essentialQuestion,
      ],
    })),
  ]);
}

export function getKnowledgeBaseSearchRecords(): SearchRecord[] {
  const knowledgeBaseRecords: SearchRecord[] = [
    {
      title: "What This Knowledge Base Is",
      href: "/kb/start-here/what-this-knowledge-base-is",
      eyebrow: "Start Here",
      description: "Orient to the Teaching Teachers knowledge base.",
      keywords: ["start", "help", "knowledge base", "workflow"],
    },
    {
      title: "Prompt Anatomy",
      href: "/kb/ai-prompting/prompt-anatomy",
      eyebrow: "AI & Prompting",
      description: "Break prompts into role, task, context, constraints, and output.",
      keywords: ["prompt", "AI", "prompting", "teacher voice"],
    },
    {
      title: "Verify AI Output",
      href: "/kb/ai-prompting/verify-ai-output",
      eyebrow: "AI & Prompting",
      description: "Check AI-assisted work before students see it.",
      keywords: ["verify", "AI", "sources", "hallucination"],
    },
    {
      title: "Build a One-Day Lesson Site",
      href: "/kb/lesson-building/build-a-one-day-lesson-site",
      eyebrow: "Lesson Building",
      description: "Build a small lesson site from source, prompt, verify, and teach.",
      keywords: ["lesson", "site", "workflow", "build"],
    },
    {
      title: "Turn Standards Into Learning Targets",
      href: "/kb/standards-curriculum/turn-standards-into-learning-targets",
      eyebrow: "Standards & Curriculum",
      description: "Convert standards into teachable targets and evidence.",
      keywords: ["standards", "targets", "alignment", "assessment"],
    },
    {
      title: "Organize a Course Folder",
      href: "/kb/google-workspace/organize-a-course-folder",
      eyebrow: "Google Workspace",
      description: "Create a reusable folder pattern for course materials.",
      keywords: ["Drive", "Google", "folders", "archive"],
    },
    {
      title: "Audit a Teacher Website",
      href: "/kb/cyber-safety/audit-a-teacher-website",
      eyebrow: "Cyber Safety",
      description: "Review a public teacher site for privacy and safety risks.",
      keywords: ["audit", "website", "privacy", "cyber"],
    },
    {
      title: "Avoid Username Reuse",
      href: "/kb/cyber-safety/avoid-username-reuse",
      eyebrow: "Cyber Safety",
      description: "Separate public, school, and personal identity signals.",
      keywords: ["username", "identity", "privacy", "public profile"],
    },
    {
      title: "Public Profile Audit",
      href: "/kb/cyber-safety/public-profile-audit",
      eyebrow: "Cyber Safety",
      description: "Check a public profile for location and contact exposure.",
      keywords: ["profile", "doxxing", "privacy", "audit"],
    },
    {
      title: "VPN, Wi-Fi, and Location Privacy",
      href: "/kb/cyber-safety/vpn-wifi-location-privacy",
      eyebrow: "Cyber Safety",
      description: "Understand what VPNs can and cannot protect.",
      keywords: ["VPN", "Wi-Fi", "privacy", "location"],
    },
    {
      title: "Free Tools for Teachers and Students",
      href: "/kb/tools-platforms/free-tools-for-teachers-and-students",
      eyebrow: "Tools & Platforms",
      description: "Evaluate free tools before adding them to a class workflow.",
      keywords: ["tools", "platforms", "free", "privacy"],
    },
    {
      title: "Use Codex Without Overwriting Content",
      href: "/kb/ai-coding-agents/use-codex-without-overwriting-content",
      eyebrow: "AI Coding Agents",
      description: "Use coding agents with scoped prompts and review habits.",
      keywords: ["Codex", "agent", "diff", "content safety"],
    },
    {
      title: "Template Library",
      href: "/kb/library/template-library",
      eyebrow: "Library",
      description: "Find reusable artifacts for OTS-101.",
      keywords: ["templates", "artifacts", "capstone"],
    },
    {
      title: "Prompt Library",
      href: "/kb/library/prompt-library",
      eyebrow: "Library",
      description: "Find reusable teacher prompts.",
      keywords: ["prompts", "AI", "library"],
    },
    {
      title: "Troubleshooting",
      href: "/kb/troubleshooting",
      eyebrow: "Troubleshooting",
      description: "Find fixes for common workflow problems.",
      keywords: ["troubleshooting", "fix", "help"],
    },
  ];

  return [
    ...knowledgeBaseRecords,
    ...FOUNDATION_TEMPLATES.map((template) => ({
      title: template.title,
      href: `/templates/${template.slug}`,
      eyebrow: "Template",
      description: template.purpose,
      keywords: [
        template.module,
        template.format,
        template.skillMeasured,
        template.evidenceOfCompletion,
        ...template.tags,
      ],
    })),
    ...sourceBankResources.map((resource) => ({
      title: resource.name,
      href: "/library/source-bank",
      eyebrow: resource.category,
      description: resource.bestUse,
      keywords: [
        resource.cost,
        resource.accountRequired,
        resource.teacherSetupNote,
        resource.privacyNote,
        ...resource.audience,
        ...resource.tags,
      ],
    })),
  ];
}

export function getSiteSearchRecords(): SearchRecord[] {
  return [
    ...getOts101SearchRecords(),
    ...COURSE_STRUCTURES.flatMap(getCourseStructureSearchRecords),
    ...getCyberSearchRecords(),
    ...getKnowledgeBaseSearchRecords(),
  ];
}
