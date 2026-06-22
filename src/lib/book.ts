import { MODULES, PATHWAY_COURSES } from "./metadata";
import { officialDocSources } from "./officialSources";

export interface SkillNode {
  skill: string;
  courses: string[];
  description: string;
}

export interface EvidenceTopic {
  title: string;
  claim: string;
  sourceNote: string;
  evidenceSource?: { label: string; url: string }[];
  lastVerified: string;
  metricLabel?: string;
  metricValue?: string;
  relatedPath: string;
}

export interface StandardsAssessmentTraceRow {
  module: string;
  standards: string;
  assessmentArtifact: string;
  evidenceRoute: string;
  sourceReference: string;
}

export interface ChapterSection {
  number: string;
  title: string;
  type:
    | "overview"
    | "section"
    | "workshop"
    | "artifact"
    | "checkpoint"
    | "studio";
  duration: string;
  artifact?: string;
}

export interface BookSectionRecord {
  chapter: (typeof BOOK_CHAPTERS)[number];
  section: ChapterSection;
  sectionSlug: string;
  href: string;
  relatedLessonSlug?: string;
  index: number;
}

export const BOOK_COURSE_CODE = "OTS-101";
export const BOOK_COURSE_PATH = "Modern Teacher Systems";

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

export const CHAPTER_SECTIONS: Record<string, ChapterSection[]> = {
  "teacher-builder-mindset": [
    { number: "01.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "01.1", title: "Why Teachers Need Systems", type: "section", duration: "15 minutes" },
    { number: "01.2", title: "Tools vs Workflows vs Systems", type: "section", duration: "15 minutes" },
    { number: "01.3", title: "The Scattered Files Problem", type: "section", duration: "15 minutes" },
    { number: "01.4", title: "Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve", type: "section", duration: "20 minutes" },
    { number: "01.5", title: "Build Task: Teacher Workflow Audit", type: "artifact", duration: "30 minutes", artifact: "Teacher workflow audit" },
    { number: "01.6", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  prompting: [
    { number: "02.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "02.1", title: "What Prompting Actually Is", type: "section", duration: "15 minutes" },
    { number: "02.2", title: "Prompt Anatomy", type: "section", duration: "20 minutes" },
    { number: "02.3", title: "Bad Prompts vs Useful Prompts", type: "section", duration: "20 minutes" },
    { number: "02.4", title: "Prompting for Lesson Plans", type: "section", duration: "20 minutes" },
    { number: "02.5", title: "Prompting for Rubrics and Quizzes", type: "section", duration: "20 minutes" },
    { number: "02.6", title: "Prompting for Student-Facing Directions", type: "section", duration: "20 minutes" },
    { number: "02.7", title: "Prompt Revision and Teacher Voice", type: "section", duration: "20 minutes" },
    { number: "02.8", title: "Build Task: Prompt Library", type: "artifact", duration: "35 minutes", artifact: "Reusable prompt library" },
    { number: "02.9", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "ai-literacy-verification": [
    { number: "03.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "03.1", title: "AI Can Draft, But It Cannot Own the Lesson", type: "section", duration: "15 minutes" },
    { number: "03.2", title: "Hallucinations and Fake Confidence", type: "section", duration: "20 minutes" },
    { number: "03.3", title: "Citation and Source Verification", type: "section", duration: "20 minutes" },
    { number: "03.4", title: "Bias and Representation Checks", type: "section", duration: "20 minutes" },
    { number: "03.5", title: "Student Privacy and AI Tools", type: "section", duration: "20 minutes" },
    { number: "03.6", title: "What Not to Paste Into AI", type: "section", duration: "15 minutes" },
    { number: "03.7", title: "Build Task: AI Verification Checklist", type: "artifact", duration: "30 minutes", artifact: "AI verification checklist" },
    { number: "03.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "standards-targets": [
    { number: "04.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "04.1", title: "Standards Are Not Lessons", type: "section", duration: "15 minutes" },
    { number: "04.2", title: "Finding the Right Standards", type: "section", duration: "20 minutes" },
    { number: "04.3", title: "Unpacking Verbs and Nouns", type: "section", duration: "20 minutes" },
    { number: "04.4", title: "Turning Standards Into Learning Targets", type: "section", duration: "20 minutes" },
    { number: "04.5", title: "Matching Evidence to Targets", type: "section", duration: "20 minutes" },
    { number: "04.6", title: "Avoiding Fake Alignment", type: "section", duration: "15 minutes" },
    { number: "04.7", title: "Build Task: Standards Unpacking Sheet", type: "artifact", duration: "35 minutes", artifact: "Standards unpacking sheet" },
    { number: "04.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "course-unit-architecture": [
    { number: "05.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "05.1", title: "Course vs Unit vs Lesson vs Activity", type: "section", duration: "15 minutes" },
    { number: "05.2", title: "Essential Questions", type: "section", duration: "15 minutes" },
    { number: "05.3", title: "Lesson Sequence", type: "section", duration: "20 minutes" },
    { number: "05.4", title: "Examples and Non-Examples", type: "section", duration: "20 minutes" },
    { number: "05.5", title: "Checks for Understanding", type: "section", duration: "15 minutes" },
    { number: "05.6", title: "Mini-Unit Mapping", type: "section", duration: "25 minutes" },
    { number: "05.7", title: "Build Task: 3-5 Lesson Mini-Unit", type: "artifact", duration: "45 minutes", artifact: "Mini-unit map and lesson template" },
    { number: "05.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "open-resources": [
    { number: "06.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "06.1", title: "Official Sources First", type: "section", duration: "15 minutes" },
    { number: "06.2", title: "OER and Creative Commons", type: "section", duration: "20 minutes" },
    { number: "06.3", title: "Free vs Open vs Allowed", type: "section", duration: "20 minutes" },
    { number: "06.4", title: "YouTube, Images, and Attribution", type: "section", duration: "20 minutes" },
    { number: "06.5", title: "Evaluating Source Quality", type: "section", duration: "20 minutes" },
    { number: "06.6", title: "Building a Source Bank", type: "section", duration: "20 minutes" },
    { number: "06.7", title: "Build Task: Resource Evaluation Sheet", type: "artifact", duration: "35 minutes", artifact: "Resource evaluation sheet" },
    { number: "06.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "google-workspace-planning": [
    { number: "07.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "07.1", title: "Google Drive Is Not a System by Itself", type: "section", duration: "15 minutes" },
    { number: "07.2", title: "Folder Architecture", type: "section", duration: "20 minutes" },
    { number: "07.3", title: "Docs as Lesson Templates", type: "section", duration: "15 minutes" },
    { number: "07.4", title: "Sheets as Curriculum Trackers", type: "section", duration: "20 minutes" },
    { number: "07.5", title: "Forms as Checks for Understanding", type: "section", duration: "20 minutes" },
    { number: "07.6", title: "Slides as Delivery Tools", type: "section", duration: "15 minutes" },
    { number: "07.7", title: "Build Task: Workspace Planning Map", type: "artifact", duration: "35 minutes", artifact: "Workspace planning map" },
    { number: "07.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "assessment-feedback": [
    { number: "08.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "08.1", title: "Activities Are Not Always Assessments", type: "section", duration: "15 minutes" },
    { number: "08.2", title: "Evidence of Learning", type: "section", duration: "20 minutes" },
    { number: "08.3", title: "Formative Checks", type: "section", duration: "15 minutes" },
    { number: "08.4", title: "Rubrics With Observable Criteria", type: "section", duration: "20 minutes" },
    { number: "08.5", title: "Feedback Loops", type: "section", duration: "15 minutes" },
    { number: "08.6", title: "Revision Opportunities", type: "section", duration: "15 minutes" },
    { number: "08.7", title: "Build Task: Assessment + Rubric Draft", type: "artifact", duration: "40 minutes", artifact: "Assessment and rubric draft" },
    { number: "08.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "delivery-planning": [
    { number: "09.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "09.1", title: "A Good Lesson Still Needs Delivery", type: "section", duration: "15 minutes" },
    { number: "09.2", title: "Student-Facing Directions", type: "section", duration: "20 minutes" },
    { number: "09.3", title: "Timing and Classroom Flow", type: "section", duration: "20 minutes" },
    { number: "09.4", title: "Videos, Images, and Embedded Resources", type: "section", duration: "20 minutes" },
    { number: "09.5", title: "The One-Day Lesson Site Workflow", type: "workshop", duration: "30 minutes", artifact: "One-day lesson site plan" },
    { number: "09.6", title: "Backup Plans When Tech Fails", type: "section", duration: "15 minutes" },
    { number: "09.7", title: "Build Task: Delivery Plan", type: "artifact", duration: "35 minutes", artifact: "Delivery plan" },
    { number: "09.8", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "mini-unit-capstone": [
    { number: "10.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "10.1", title: "Assemble the Mini-Unit", type: "studio", duration: "30 minutes" },
    { number: "10.2", title: "Verify Standards and Sources", type: "studio", duration: "25 minutes" },
    { number: "10.3", title: "Check Privacy, Copyright, and Accessibility", type: "studio", duration: "25 minutes" },
    { number: "10.4", title: "Peer Review", type: "studio", duration: "30 minutes" },
    { number: "10.5", title: "Revision Log", type: "studio", duration: "20 minutes", artifact: "Reflection and revision log" },
    { number: "10.6", title: "Present the Mini-Unit", type: "studio", duration: "20 minutes" },
    { number: "10.7", title: "Final Reflection", type: "checkpoint", duration: "20 minutes" },
    { number: "10.8", title: "Capstone Submission Checklist", type: "checkpoint", duration: "15 minutes" },
  ],
};

export const SECTION_RELATED_LESSONS: Record<string, string> = {
  "01.0": "what-teaching-teachers-is",
  "01.1": "the-teacher-as-builder",
  "01.2": "choosing-a-teacher-app-stack",
  "02.0": "prompting-for-teachers",
  "02.1": "prompting-for-teachers",
  "02.2": "prompting-for-teachers",
  "02.8": "prompting-for-teachers",
  "03.0": "ai-as-curriculum-assistant",
  "03.1": "ai-as-curriculum-assistant",
  "03.7": "ai-as-curriculum-assistant",
  "04.0": "building-courses-from-standards",
  "04.1": "building-courses-from-standards",
  "04.7": "building-courses-from-standards",
  "05.0": "course-architecture",
  "05.1": "course-architecture",
  "05.7": "course-architecture",
  "06.0": "resource-discovery-and-evaluation",
  "06.1": "resource-discovery-and-evaluation",
  "06.2": "creative-commons-for-teachers",
  "06.3": "open-source-vs-free",
  "06.7": "resource-discovery-and-evaluation",
  "07.0": "google-drive-folder-architecture",
  "07.2": "google-drive-folder-architecture",
  "07.4": "google-sheets-as-curriculum-database",
  "07.5": "google-forms-as-quizzes",
  "08.0": "assessment-rubrics-and-feedback",
  "08.4": "assessment-rubrics-and-feedback",
  "08.7": "assessment-rubrics-and-feedback",
  "09.0": "delivery-planning-foundations",
  "09.5": "one-day-lesson-site-workflow",
  "09.7": "delivery-planning-foundations",
  "10.0": "capstone-build-your-mini-course",
  "10.1": "capstone-build-your-mini-course",
  "10.8": "capstone-build-your-mini-course",
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

const OTS_101_SOURCES = officialDocSources.find((course) => course.course === "OTS-101")?.sources ?? [];
const OTS_201_SOURCES = officialDocSources.find((course) => course.course === "OTS-201")?.sources ?? [];
export const EVIDENCE_LAST_VERIFIED = "2026-06-22";

export const EVIDENCE_TOPICS: EvidenceTopic[] = [
  {
    title: "Teacher workflow load",
    claim:
      "Teaching work includes repeated planning, assessment, communication, source review, and file-management tasks that benefit from reusable systems.",
    sourceNote:
      "Use the source bank for official documentation and research-backed references before adding quantitative claims.",
    evidenceSource: [
      ...OTS_101_SOURCES.slice(0, 3),
      ...OTS_201_SOURCES.slice(0, 2),
    ],
    lastVerified: EVIDENCE_LAST_VERIFIED,
    metricLabel: "Source-backed references",
    metricValue: `${Math.max(OTS_101_SOURCES.length, 1)}`,
    relatedPath: "/library/source-bank",
  },
  {
    title: "AI literacy",
    claim:
      "Educators need practical AI habits: prompt design, verification, privacy review, and documented revision decisions.",
    sourceNote:
      "Ground claims in official AI guidance and classroom policy sources; avoid invented adoption statistics.",
    evidenceSource: OTS_101_SOURCES.slice(0, 2).map((source) => ({
      label: source.label,
      url: source.url,
    })),
    lastVerified: EVIDENCE_LAST_VERIFIED,
    metricLabel: "AI references linked",
    metricValue: "3",
    relatedPath: "/library/source-bank",
  },
  {
    title: "Cyber safety",
    claim:
      "Public-facing educators need account hygiene, identity separation, profile review, and safe publishing routines.",
    sourceNote:
      "Use official security guidance and the Teaching Teachers cyber safety materials as the local baseline.",
    evidenceSource: [
      { label: "NIST Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-4/sp800-63b.html" },
      {
        label: "FTC anti-phishing guidance",
        url: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams",
      },
    ],
    lastVerified: EVIDENCE_LAST_VERIFIED,
    metricLabel: "Safety source links",
    metricValue: "2",
    relatedPath: "/safety",
  },
  {
    title: "Transferable digital skills",
    claim:
      "Prompting, documentation, source evaluation, accessibility, automation logic, and web publishing transfer beyond one platform.",
    sourceNote:
      "Treat this as a skills map, not a labor-market claim, until external data is cited.",
    evidenceSource: [
      {
        label: "Standards-to-targets chapter",
        url: "/book/ots-101/04-standards-to-learning-targets",
      },
      {
        label: "Assessment rubric template",
        url: "/templates/assessment-rubric-template",
      },
    ],
    lastVerified: EVIDENCE_LAST_VERIFIED,
    metricLabel: "Pathway courses tracked",
    metricValue: "9",
    relatedPath: "/skills",
  },
];

export const OTS_101_STANDARDS_ASSESSMENT_MATRIX: StandardsAssessmentTraceRow[] = [
  {
    module: "04 — Standards to Learning Targets",
    standards:
      "Standard intent is translated into measurable learner outcomes and aligned lesson evidence.",
    assessmentArtifact: "Standards unpacking sheet",
    evidenceRoute: "/templates/standards-unpacking-sheet",
    sourceReference:
      "Use official standard references from the source bank + OTS-101 chapter route",
  },
  {
    module: "08 — Assessment, Rubrics, and Feedback",
    standards:
      "Learning targets from earlier modules are scored with observable criteria and feedback loops.",
    assessmentArtifact: "Assessment and rubric draft",
    evidenceRoute: "/templates/assessment-rubric-template",
    sourceReference:
      "Use official sources and prompt/verification notes from OTS-101 section bodies.",
  },
  {
    module: "09 — Delivery Planning",
    standards:
      "Standards-aligned lessons map to student-facing workflows, pacing, and backup plans.",
    assessmentArtifact: "Delivery plan",
    evidenceRoute: "/templates/delivery-plan",
    sourceReference:
      "Link chapter 09 outcomes to chapter 10 capstone artifact validation steps.",
  },
  {
    module: "10 — Mini-Unit Capstone",
    standards:
      "Mini-unit evidence shows standards, artifacts, and assessment evidence are connected before release.",
    assessmentArtifact: "Verified mini-unit capstone",
    evidenceRoute: "/book/ots-101/10-mini-unit-capstone",
    sourceReference: "Course-level evidence matrix + source bank verification notes.",
  },
];

export const BOOK_CHAPTERS = MODULES.map((module) => ({
  ...module,
  href: `/book/ots-101/${module.slug}`,
  sections: CHAPTER_SECTIONS[module.id] ?? [],
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

export function getSectionSlug(section: ChapterSection) {
  return section.number.replace(".", "-");
}

export function getSectionHref(
  chapter: (typeof BOOK_CHAPTERS)[number],
  section: ChapterSection,
) {
  return `${chapter.href}/${getSectionSlug(section)}`;
}

export function getAllBookSectionRecords(): BookSectionRecord[] {
  let index = 0;

  return BOOK_CHAPTERS.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      chapter,
      section,
      sectionSlug: getSectionSlug(section),
      href: getSectionHref(chapter, section),
      relatedLessonSlug: SECTION_RELATED_LESSONS[section.number],
      index: index++,
    })),
  );
}

export function getSectionBySlugs(chapterSlug: string, sectionSlug: string) {
  return getAllBookSectionRecords().find(
    (record) =>
      record.chapter.slug === chapterSlug && record.sectionSlug === sectionSlug,
  );
}

export function getAdjacentBookSections(record: BookSectionRecord) {
  const records = getAllBookSectionRecords();

  return {
    previous: records[record.index - 1],
    next: records[record.index + 1],
  };
}

export function getSectionPracticePrompt(record: BookSectionRecord) {
  const { chapter, section } = record;

  if (section.type === "artifact" || section.type === "studio") {
    return `Build or revise the ${section.artifact ?? chapter.buildArtifact}. Keep the result small enough to use in a real classroom, but complete enough that another teacher could understand your decisions.`;
  }

  if (section.type === "checkpoint") {
    return `Review the chapter artifact and write one revision note that explains what you would keep, change, or verify before using it with students.`;
  }

  if (section.type === "workshop") {
    return `Run the workflow once with a real topic, source, or classroom need. Save the output and one note about what still needs teacher judgment.`;
  }

  if (section.type === "overview") {
    return `Skim the chapter path, name the teacher problem this chapter solves, and identify the artifact you will build by the end.`;
  }

  return `Apply this section to one real course, unit, lesson, or recurring workflow. Write down the decision you made and the evidence you used.`;
}
