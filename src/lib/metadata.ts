export const COURSE_CODE = "OTS-101";
export const COURSE_TITLE = "Teaching Teachers Foundations";
export const COURSE_SUBTITLE =
  "Prompting, Standards, Resource Literacy, and Curriculum Systems for Educators";
export const COURSE_THESIS =
  "OpenTeachStack is an open-source pathway for educators building practical, future-ready curriculum systems. OTS-101 is the required foundations course.";
export const SITE_URL = "https://openteachstack.dev";
export const REPOSITORY_URL =
  "https://github.com/Gh0stlyKn1ght/OpenTeachStack";

export interface AuthorInfo {
  name: string;
  linkedinUrl: string;
  role: string;
  projects: {
    name: string;
    url: string;
    description: string;
  }[];
}

export const AUTHOR: AuthorInfo = {
  name: "JC Nevarez",
  linkedinUrl: "https://www.linkedin.com/in/gh0stly/",
  role: "Course Author & Developer",
  projects: [
    {
      name: "Robotnix",
      url: "https://robotnix.dev",
      description: "Robotics, engineering, and classroom build systems.",
    },
    {
      name: "Team 2180",
      url: "https://team2180.dev",
      description: "Team 2180 robotics program resources and public work.",
    },
  ],
};

export interface LicenseInfo {
  code: {
    name: string;
    spdx: string;
    url: string;
  };
  content: {
    name: string;
    spdx: string;
    url: string;
  };
}

export const LICENSE: LicenseInfo = {
  code: {
    name: "MIT License",
    spdx: "MIT",
    url: "https://opensource.org/licenses/MIT",
  },
  content: {
    name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
    spdx: "CC-BY-NC-SA-4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
};

export interface CourseModule {
  id: string;
  number: string;
  title: string;
  description: string;
  slug: string;
  essentialQuestion: string;
  buildArtifact: string;
  evidence: string;
  templateSlugs: string[];
}

export const MODULES: CourseModule[] = [
  {
    id: "teacher-builder-mindset",
    number: "01",
    title: "Teacher Builder Mindset",
    description:
      "What OpenTeachStack is, why teachers need practical system ownership, and how to build workflows instead of collecting tools.",
    slug: "01-teacher-builder-mindset",
    essentialQuestion:
      "What separates a teacher who collects tools from a teacher who builds systems?",
    buildArtifact: "Teacher workflow audit",
    evidence:
      "A short diagnosis of current tools, repeated tasks, pain points, and one workflow worth improving.",
    templateSlugs: ["teacher-workflow-audit"],
  },
  {
    id: "prompting",
    number: "02",
    title: "Prompting for Teachers",
    description:
      "Prompting as a professional workflow skill for lessons, rubrics, quizzes, differentiation, and teacher voice preservation.",
    slug: "02-prompting",
    essentialQuestion:
      "How do you give AI the right instructions to get curriculum-quality output?",
    buildArtifact: "Reusable prompt library",
    evidence:
      "Five useful prompts with purpose, context, output notes, revision decisions, and reuse guidance.",
    templateSlugs: ["prompt-library"],
  },
  {
    id: "ai-literacy-verification",
    number: "03",
    title: "AI Literacy and Verification",
    description:
      "Using AI as a curriculum assistant while checking accuracy, bias, standards claims, citations, privacy, and teacher voice.",
    slug: "03-ai-literacy-verification",
    essentialQuestion:
      "How do you use AI without handing it professional judgment?",
    buildArtifact: "AI verification checklist",
    evidence:
      "A documented review of one AI-assisted artifact showing what was accepted, changed, rejected, and why.",
    templateSlugs: ["ai-verification-checklist"],
  },
  {
    id: "standards-targets",
    number: "04",
    title: "Standards to Learning Targets",
    description:
      "Reading, unpacking, and aligning state standards to specific learning targets, assessments, and unit decisions.",
    slug: "04-standards-to-learning-targets",
    essentialQuestion:
      "How do you turn a standards document into teachable learning targets?",
    buildArtifact: "Standards unpacking sheet",
    evidence:
      "Three standards or outcomes unpacked into verbs, learning targets, assessment evidence, and lesson connections.",
    templateSlugs: ["standards-unpacking-sheet"],
  },
  {
    id: "course-unit-architecture",
    number: "05",
    title: "Course and Unit Architecture",
    description:
      "Designing coherent units and lesson sequences with essential questions, objectives, practice, assessment, and reflection.",
    slug: "05-course-and-unit-architecture",
    essentialQuestion:
      "What structure turns a pile of lesson ideas into a coherent unit?",
    buildArtifact: "Mini-unit map and lesson template",
    evidence:
      "A 3 to 5 lesson sequence plus one reusable lesson structure for the first lesson in the mini-unit.",
    templateSlugs: ["mini-unit-map", "lesson-template"],
  },
  {
    id: "open-resources",
    number: "06",
    title: "Resource Discovery and Open Resources",
    description:
      "Finding, evaluating, citing, and remixing trustworthy resources, OER, Creative Commons works, and official documentation.",
    slug: "06-resource-discovery-open-resources",
    essentialQuestion:
      "How do you find resources worth trusting, adapting, and sharing?",
    buildArtifact: "Resource evaluation sheet",
    evidence:
      "At least five reviewed resources with source links, license or terms notes, credibility judgment, and use decision.",
    templateSlugs: ["resource-evaluation-sheet"],
  },
  {
    id: "google-workspace-planning",
    number: "07",
    title: "Google Workspace Planning Systems",
    description:
      "Using Drive, Docs, Sheets, Forms, Slides, and Calendar as a practical planning system before introducing automation.",
    slug: "07-google-workspace-planning-systems",
    essentialQuestion:
      "How can familiar Google tools become curriculum infrastructure?",
    buildArtifact: "Workspace planning map",
    evidence:
      "A Drive, Docs, Sheets, Forms, or Slides organization plan that shows where the mini-unit artifacts will live.",
    templateSlugs: ["mini-unit-map", "lesson-template", "resource-evaluation-sheet"],
  },
  {
    id: "assessment-feedback",
    number: "08",
    title: "Assessment, Rubrics, and Feedback",
    description:
      "Designing valid checks for understanding, rubrics, feedback loops, and assessment evidence aligned to learning targets.",
    slug: "08-assessment-rubrics-feedback",
    essentialQuestion:
      "How do you know students learned what the unit claims to teach?",
    buildArtifact: "Assessment and rubric draft",
    evidence:
      "One assessment task tied to a learning target, with observable rubric criteria and a feedback opportunity.",
    templateSlugs: ["assessment-rubric-template"],
  },
  {
    id: "delivery-planning",
    number: "09",
    title: "Delivery Planning",
    description:
      "Turning a designed mini-unit into classroom routines, student-facing directions, pacing plans, and feedback cycles.",
    slug: "09-delivery-planning",
    essentialQuestion:
      "How do you make the curriculum usable in a real classroom?",
    buildArtifact: "Delivery plan",
    evidence:
      "Student-facing directions, pacing, materials, one check for understanding, one feedback moment, one backup plan, and one source-backed one-day lesson workflow.",
    templateSlugs: ["delivery-plan", "one-day-lesson-site-planner"],
  },
  {
    id: "mini-unit-capstone",
    number: "10",
    title: "Mini-Unit Capstone",
    description:
      "Build a practical mini-unit system with standards, lessons, resources, assessment, verification, and revision evidence.",
    slug: "10-mini-unit-capstone",
    essentialQuestion:
      "Can you build a small curriculum system that is coherent, verifiable, and ready to teach?",
    buildArtifact: "Verified mini-unit capstone",
    evidence:
      "A complete mini-unit package with source checks, assessment evidence, delivery planning, and revision history.",
    templateSlugs: [
      "teacher-workflow-audit",
      "standards-unpacking-sheet",
      "mini-unit-map",
      "lesson-template",
      "prompt-library",
      "resource-evaluation-sheet",
      "ai-verification-checklist",
      "assessment-rubric-template",
      "delivery-plan",
      "one-day-lesson-site-planner",
      "reflection-revision-log",
    ],
  },
];

export interface PathwayCourse {
  code: string;
  title: string;
  level: string;
  status: "Released";
  purpose: string;
  prerequisites: string;
  majorArtifacts: string[];
}

export const PATHWAY_COURSES: PathwayCourse[] = [
  {
    code: "OTS-101",
    title: "Teaching Teachers Foundations",
    level: "Beginner",
    status: "Released",
    purpose:
      "Teach the core mindset, prompting, standards workflow, resource literacy, planning systems, assessment, and delivery habits.",
    prerequisites: "Basic Google Workspace familiarity.",
    majorArtifacts: [
      "Teacher workflow audit",
      "Mini-unit map",
      "Prompt library",
      "AI verification checklist",
      "Mini-unit capstone",
    ],
  },
  {
    code: "OTS-201",
    title: "Google Workspace Systems for Teachers",
    level: "Beginner/Intermediate",
    status: "Released",
    purpose:
      "Turn Drive, Docs, Sheets, Forms, Slides, and Calendar into durable classroom operating systems.",
    prerequisites: "OTS-101 or equivalent planning workflow.",
    majorArtifacts: [
      "Drive architecture",
      "Command center",
      "Forms quiz",
      "Delivery deck",
    ],
  },
  {
    code: "OTS-220",
    title: "Apps Script for Teacher Automation",
    level: "Intermediate",
    status: "Released",
    purpose:
      "Build safe Google Workspace automations for folders, documents, quizzes, and reminders.",
    prerequisites:
      "Comfort with Google Sheets and willingness to read small scripts.",
    majorArtifacts: [
      "Custom menu",
      "Folder generator",
      "Doc generator",
      "Quiz builder",
    ],
  },
  {
    code: "OTS-240",
    title: "Open Resources & GitHub for Educators",
    level: "Intermediate",
    status: "Released",
    purpose:
      "Teach OER publishing, licensing decisions, GitHub basics, and open-source contribution workflows.",
    prerequisites: "OTS-101 resource evaluation and licensing basics.",
    majorArtifacts: [
      "Licensed resource bank",
      "README",
      "GitHub repository",
      "Contribution checklist",
    ],
  },
  {
    code: "OTS-260",
    title: "AI Media & Lesson Delivery",
    level: "Intermediate",
    status: "Released",
    purpose:
      "Create accessible visuals, slide systems, diagrams, short videos, and delivery routines.",
    prerequisites: "OTS-101 delivery plan.",
    majorArtifacts: [
      "Image prompt log",
      "Slide deck",
      "Video plan",
      "Accessibility notes",
    ],
  },
  {
    code: "OTS-280",
    title: "Cyber Safety for Educators",
    level: "Intermediate",
    status: "Released",
    purpose:
      "Teach identity hygiene, account safety, public profile audits, website safety, repo exposure checks, and basic incident response for public-facing educators.",
    prerequisites: "OTS-101 or equivalent comfort with basic digital workflows.",
    majorArtifacts: [
      "Personal risk map",
      "MFA checklist",
      "Identity separation map",
      "Website security audit",
      "Incident response plan",
    ],
  },
  {
    code: "OTS-301",
    title: "Teacher Course Sites",
    level: "Advanced",
    status: "Released",
    purpose:
      "Compare Google Sites, static HTML, GitHub Pages, Docusaurus, Next.js, domains, DNS, and hosting.",
    prerequisites: "OTS-101 plus comfort with files and web publishing concepts.",
    majorArtifacts: [
      "Site plan",
      "Static course hub",
      "Publishing checklist",
      "Maintenance plan",
    ],
  },
  {
    code: "OTS-320",
    title: "AI Coding Agents for Educators",
    level: "Advanced",
    status: "Released",
    purpose:
      "Use Codex, Claude Code, and similar tools safely with version control, diffs, test plans, and content protection.",
    prerequisites: "OTS-240 or equivalent version-control basics.",
    majorArtifacts: [
      "Safe agent prompt",
      "Diff review log",
      "Branch workflow",
      "Test checklist",
    ],
  },
  {
    code: "OTS-399",
    title: "Capstone Studio",
    level: "Advanced",
    status: "Released",
    purpose:
      "Assemble the full pathway into a publishable curriculum system with automation, open resources, and delivery evidence.",
    prerequisites: "OTS-101 and at least two intermediate/advanced pathway courses.",
    majorArtifacts: [
      "Published mini-course",
      "Automation evidence",
      "Repository",
      "Presentation",
    ],
  },
];

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Start", href: "/book/ots-101" },
  { label: "Pathway", href: "/pathway" },
  { label: "Knowledge Base", href: "/kb" },
  { label: "About", href: "/about" },
];
