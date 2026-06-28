export const COURSE_CODE = "OTS-101";
export const COURSE_TITLE = "AI Course Content Foundations for Teachers";
export const COURSE_SUBTITLE =
  "Use AI to build student-facing lessons, assignments, rubrics, verification checks, and publishable course packets.";
export const COURSE_THESIS =
  "OpenTeachStack helps teachers create student-facing course content with AI while keeping teacher judgment, verification, safety, accessibility, and revision in the loop.";
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
    id: "curriculum-vs-course-content",
    number: "01",
    title: "Curriculum vs Course Content",
    description:
      "Separate curriculum, student-facing course content, instructional materials, platforms, and the course content system teachers actually maintain.",
    slug: "01-curriculum-vs-course-content",
    essentialQuestion:
      "What are teachers actually building when they use AI for course work?",
    buildArtifact: "Course content inventory",
    evidence:
      "A labeled inventory that separates learning plan, student-facing content, instructional materials, platform links, and revision needs.",
    templateSlugs: [
      "course-content-inventory",
      "curriculum-course-content-map",
      "course-truth-audit",
    ],
  },
  {
    id: "standards-goals-to-lessons",
    number: "02",
    title: "From Standards or Goals to Lessons",
    description:
      "Turn standards, district goals, or messy teaching ideas into student-friendly outcomes and a teachable lesson sequence.",
    slug: "02-standards-goals-to-lessons",
    essentialQuestion:
      "How do you move from a goal or standard to content students can use?",
    buildArtifact: "Learning target and lesson map",
    evidence:
      "A learning target map that shows target, student-facing language, lesson sequence, evidence, and AI support notes.",
    templateSlugs: ["learning-target-lesson-map"],
  },
  {
    id: "prompting-without-garbage",
    number: "03",
    title: "Prompting AI Without Generic Garbage",
    description:
      "Prompt AI with source, context, task, format, examples, non-examples, and checks so output can be revised into teacher voice.",
    slug: "03-prompting-without-garbage",
    essentialQuestion:
      "How do teachers keep AI output from turning into generic lesson filler?",
    buildArtifact: "Reusable course-content prompt",
    evidence:
      "One reusable prompt with source material, classroom context, output format, verification rules, and teacher revision notes.",
    templateSlugs: ["ai-course-content-prompt"],
  },
  {
    id: "verify-ai-before-students",
    number: "04",
    title: "Verifying AI Before Students See It",
    description:
      "Check AI output for accuracy, source quality, age fit, bias, privacy, copyright, accessibility, and classroom use.",
    slug: "04-verify-ai-before-students",
    essentialQuestion:
      "What must be true before AI-assisted content reaches students?",
    buildArtifact: "AI output verification checklist",
    evidence:
      "A documented verification pass showing accepted, revised, rejected, and still-uncertain content decisions.",
    templateSlugs: ["ai-output-verification-checklist"],
  },
  {
    id: "student-facing-lessons",
    number: "05",
    title: "Building Real Student-Facing Lessons",
    description:
      "Build lesson pages with clear directions, examples, checks, submission expectations, and enough context for students to start.",
    slug: "05-student-facing-lessons",
    essentialQuestion:
      "Can students use the lesson without the teacher re-explaining the page?",
    buildArtifact: "Student-facing lesson page",
    evidence:
      "One student-facing lesson page with target, directions, example, check for understanding, submission expectation, and accessibility pass.",
    templateSlugs: ["student-facing-lesson-page"],
  },
  {
    id: "assignments-labs-rubrics-feedback",
    number: "06",
    title: "Assignments, Labs, Rubrics, and Feedback",
    description:
      "Turn lessons into assessable tasks, practice labs, rubrics, feedback routines, and evidence students can act on.",
    slug: "06-assignments-labs-rubrics-feedback",
    essentialQuestion:
      "Does the assessment prove the target instead of just collecting work?",
    buildArtifact: "Assignment and rubric packet",
    evidence:
      "One assignment or lab with rubric criteria, feedback routine, student submission instructions, and revision opportunity.",
    templateSlugs: ["assignment-rubric-packet"],
  },
  {
    id: "organizing-course-content-system",
    number: "07",
    title: "Organizing the Course Content System",
    description:
      "Organize folders, files, names, versions, links, templates, archives, and revision logs so the course can survive reuse.",
    slug: "07-organizing-course-content-system",
    essentialQuestion:
      "Could another teacher find, understand, and update the course materials?",
    buildArtifact: "Course content folder map",
    evidence:
      "A folder and naming map with live/draft/archive rules, link ownership, version notes, and revision log location.",
    templateSlugs: ["course-content-folder-map", "revision-log"],
  },
  {
    id: "safety-accessibility-copyright-source-quality",
    number: "08",
    title: "Safety, Accessibility, Copyright, and Source Quality",
    description:
      "Review student privacy, fake classroom data, source quality, copyright, licenses, accessibility, and media/document usability.",
    slug: "08-safety-accessibility-copyright-source-quality",
    essentialQuestion:
      "What must be fixed before teacher-built content is shared?",
    buildArtifact: "Content safety review",
    evidence:
      "A safety review that identifies privacy, accessibility, copyright, source, and classroom-use decisions before release.",
    templateSlugs: ["content-safety-review"],
  },
  {
    id: "publishing-to-platform",
    number: "09",
    title: "Publishing to a Platform",
    description:
      "Move course content into an LMS, Teachable, Google Classroom, website, or course hub without confusing the platform for the course.",
    slug: "09-publishing-to-platform",
    essentialQuestion:
      "Can students find the right next action in the published space?",
    buildArtifact: "Publishing checklist",
    evidence:
      "A publishing checklist that separates public, classroom-only, teacher-only, and draft materials with navigation and link checks.",
    templateSlugs: ["publishing-checklist"],
  },
  {
    id: "mini-course-content-packet",
    number: "10",
    title: "Capstone: Build a Mini Course Content Packet",
    description:
      "Assemble a small course content packet with lessons, assignment, rubric, sources, verification, publishing notes, and revision evidence.",
    slug: "10-mini-course-content-packet",
    essentialQuestion:
      "Is this mini course packet teachable, verifiable, safe, and reusable?",
    buildArtifact: "Mini course content packet",
    evidence:
      "A complete mini course content packet with verified student-facing content, assessment, safety review, publishing checklist, and revision log.",
    templateSlugs: ["mini-course-content-packet"],
  },
];

export interface PathwayCourse {
  code: string;
  title: string;
  level: string;
  status: "Live" | "Draft" | "Coming Soon";
  purpose: string;
  prerequisites: string;
  majorArtifacts: string[];
}

export const PATHWAY_COURSES: PathwayCourse[] = [
  {
    code: "OTS-000",
    title: "Teacher Tech Stack Orientation",
    level: "Beginner",
    status: "Coming Soon",
    purpose:
      "Give teachers a plain-language on-ramp to the software, vocabulary, files, workflows, AI tools, and safety habits behind modern curriculum projects before they enter the deeper pathway.",
    prerequisites: "Basic computer and web browser comfort.",
    majorArtifacts: [
      "Builder workstation checklist",
      "Tool vocabulary map",
      "VS Code navigation notes",
      "Software safety checklist",
      "Teacher Builder Starter Kit",
    ],
  },
  {
    code: "OTS-101",
    title: "AI Course Content Foundations for Teachers",
    level: "Beginner",
    status: "Draft",
    purpose:
      "Teach teachers how to use AI to create student-facing lessons, assignments, rubrics, verification routines, and small course content packets.",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
    status: "Coming Soon",
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
  { label: "Blog", href: "/blog" },
  { label: "Build Notes", href: "/build-notes" },
  { label: "About", href: "/about" },
];


