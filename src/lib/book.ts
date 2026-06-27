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
  "curriculum-vs-course-content":
    "Teachers are asked to make course content with AI before anyone names what counts as curriculum, content, material, or platform.",
  "standards-goals-to-lessons":
    "AI cannot rescue a lesson when the teacher has not named the learning target and evidence students must produce.",
  "prompting-without-garbage":
    "Generic prompts create generic lessons because the model has no classroom context, examples, constraints, or verification rules.",
  "verify-ai-before-students":
    "AI output can sound classroom-ready while inventing details, missing policy boundaries, or creating unsafe student-facing material.",
  "student-facing-lessons":
    "Students need usable directions, examples, checks, and submission expectations, not a polished page that still requires a live explanation.",
  "assignments-labs-rubrics-feedback":
    "Assessment falls apart when assignments, labs, rubrics, and feedback do not match the target students are supposed to prove.",
  "organizing-course-content-system":
    "Course content gets lost when files, links, versions, templates, and archives do not follow a shared system.",
  "safety-accessibility-copyright-source-quality":
    "Teacher-built content must be checked for privacy, accessibility, copyright, source quality, and classroom fit before release.",
  "publishing-to-platform":
    "A platform can host content, but it does not decide what should be public, private, student-facing, or teacher-only.",
  "mini-course-content-packet":
    "A mini course packet is only ready when the lessons, assignment, rubric, sources, safety review, publishing notes, and revision log hold together.",
};

export const CHAPTER_SKILLS: Record<string, string[]> = {
  "curriculum-vs-course-content": ["content modeling", "AI boundaries", "course inventory"],
  "standards-goals-to-lessons": ["learning targets", "sequence planning", "student-facing language"],
  "prompting-without-garbage": ["prompt design", "example use", "teacher revision"],
  "verify-ai-before-students": ["source checking", "privacy review", "professional judgment"],
  "student-facing-lessons": ["lesson writing", "directions", "student usability"],
  "assignments-labs-rubrics-feedback": ["assessment design", "rubrics", "feedback routines"],
  "organizing-course-content-system": ["file systems", "versioning", "maintenance"],
  "safety-accessibility-copyright-source-quality": ["accessibility", "copyright", "source quality"],
  "publishing-to-platform": ["publishing", "navigation", "release checks"],
  "mini-course-content-packet": ["packet assembly", "verification", "revision"],
};

export const CHAPTER_SECTIONS: Record<string, ChapterSection[]> = {
  "curriculum-vs-course-content": [
    { number: "01.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "01.1", title: "What Counts as Curriculum?", type: "section", duration: "15 minutes" },
    { number: "01.2", title: "What Counts as Student-Facing Course Content?", type: "section", duration: "15 minutes" },
    { number: "01.3", title: "Why a Folder Full of Files Is Not a Course", type: "section", duration: "15 minutes" },
    { number: "01.4", title: "Build Artifact: Course Content Inventory", type: "artifact", duration: "30 minutes", artifact: "Course content inventory" },
    { number: "01.5", title: "Checkpoint: Is This Content Teachable?", type: "checkpoint", duration: "10 minutes" },
  ],
  "standards-goals-to-lessons": [
    { number: "02.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "02.1", title: "Start With the Learning Target, Not the Tool", type: "section", duration: "15 minutes" },
    { number: "02.2", title: "Turn Standards Into Student-Friendly Outcomes", type: "section", duration: "20 minutes" },
    { number: "02.3", title: "Turn a Messy Idea Into a Teachable Sequence", type: "section", duration: "20 minutes" },
    { number: "02.4", title: "Build Artifact: Learning Target and Lesson Map", type: "artifact", duration: "35 minutes", artifact: "Learning target and lesson map" },
    { number: "02.5", title: "Checkpoint: Can a Student Understand What They Are Doing?", type: "checkpoint", duration: "10 minutes" },
  ],
  "prompting-without-garbage": [
    { number: "03.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "03.1", title: "Why Generic Prompts Create Fake Lessons", type: "section", duration: "15 minutes" },
    { number: "03.2", title: "The Source-Context-Task-Format-Check Prompt Pattern", type: "section", duration: "20 minutes" },
    { number: "03.3", title: "Giving AI Examples and Non-Examples", type: "section", duration: "20 minutes" },
    { number: "03.4", title: "Build Artifact: Reusable Course-Content Prompt", type: "artifact", duration: "35 minutes", artifact: "Reusable course-content prompt" },
    { number: "03.5", title: "Checkpoint: Does the Output Sound Like Your Course?", type: "checkpoint", duration: "10 minutes" },
  ],
  "verify-ai-before-students": [
    { number: "04.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "04.1", title: "AI Drafts Are Not Teacher Approval", type: "section", duration: "15 minutes" },
    { number: "04.2", title: "Check Claims, Links, and Tool Instructions", type: "section", duration: "20 minutes" },
    { number: "04.3", title: "Protect Student Privacy Before Prompting or Publishing", type: "section", duration: "20 minutes" },
    { number: "04.4", title: "Build Artifact: AI Draft Verification Checklist", type: "artifact", duration: "30 minutes", artifact: "AI output verification checklist" },
    { number: "04.5", title: "Checkpoint: Publish, Revise, or Discard?", type: "checkpoint", duration: "10 minutes" },
  ],
  "student-facing-lessons": [
    { number: "05.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "05.1", title: "Teacher Notes Are Not Student Directions", type: "section", duration: "20 minutes" },
    { number: "05.2", title: "Write Directions Students Can Act On", type: "section", duration: "20 minutes" },
    { number: "05.3", title: "Use Examples, Non-Examples, and Success Checks", type: "section", duration: "15 minutes" },
    { number: "05.4", title: "Build Artifact: Student-Facing Lesson Draft", type: "artifact", duration: "40 minutes", artifact: "Student-facing lesson page" },
    { number: "05.5", title: "Checkpoint: Could a Student Complete This Alone?", type: "checkpoint", duration: "10 minutes" },
  ],
  "assignments-labs-rubrics-feedback": [
    { number: "06.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "06.1", title: "An Activity Is Not Automatically Evidence", type: "section", duration: "20 minutes" },
    { number: "06.2", title: "Design Assignments and Labs That Prove the Target", type: "section", duration: "20 minutes" },
    { number: "06.3", title: "Build a Small Rubric With Observable Criteria", type: "section", duration: "20 minutes" },
    { number: "06.4", title: "Build Artifact: Assignment and Feedback Packet", type: "artifact", duration: "40 minutes", artifact: "Assignment and rubric packet" },
    { number: "06.5", title: "Checkpoint: Does the Packet Measure the Target?", type: "checkpoint", duration: "10 minutes" },
  ],
  "organizing-course-content-system": [
    { number: "07.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "07.1", title: "Source of Truth Is Not the Same as Platform Export", type: "section", duration: "15 minutes" },
    { number: "07.2", title: "Design Folders That Show Status", type: "section", duration: "20 minutes" },
    { number: "07.3", title: "Name Files So Future You Knows What Happened", type: "section", duration: "20 minutes" },
    { number: "07.4", title: "Build Artifact: Course Content System Map", type: "artifact", duration: "35 minutes", artifact: "Course content folder map" },
    { number: "07.5", title: "Checkpoint: Could Another Teacher Find the Right Version?", type: "checkpoint", duration: "10 minutes" },
  ],
  "safety-accessibility-copyright-source-quality": [
    { number: "08.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "08.1", title: "Safety Starts Before Students See the Page", type: "section", duration: "20 minutes" },
    { number: "08.2", title: "Accessibility Is Part of the Lesson Design", type: "section", duration: "20 minutes" },
    { number: "08.3", title: "Use Sources and Media Responsibly", type: "section", duration: "20 minutes" },
    { number: "08.4", title: "Build Artifact: Course Content Safety and Access Checklist", type: "artifact", duration: "35 minutes", artifact: "Content safety review" },
    { number: "08.5", title: "Checkpoint: Is This Safe and Accessible Enough to Publish?", type: "checkpoint", duration: "10 minutes" },
  ],
  "publishing-to-platform": [
    { number: "09.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "09.1", title: "What Breaks When Content Moves Platforms", type: "section", duration: "20 minutes" },
    { number: "09.2", title: "Prepare Content for the Platform", type: "section", duration: "20 minutes" },
    { number: "09.3", title: "Check the Student View", type: "section", duration: "20 minutes" },
    { number: "09.4", title: "Build Artifact: Platform Publishing Checklist", type: "artifact", duration: "35 minutes", artifact: "Publishing checklist" },
    { number: "09.5", title: "Checkpoint: Is the Platform Copy Ready to Release?", type: "checkpoint", duration: "10 minutes" },
  ],
  "mini-course-content-packet": [
    { number: "10.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "10.1", title: "What Belongs in the Mini-Course Packet", type: "section", duration: "15 minutes" },
    { number: "10.2", title: "Assemble the Packet in a Clean Order", type: "section", duration: "20 minutes" },
    { number: "10.3", title: "Run the Final Course Content Review", type: "checkpoint", duration: "20 minutes" },
    { number: "10.4", title: "Build Artifact: Mini-Course Content Packet", type: "artifact", duration: "45 minutes", artifact: "Mini-course content packet" },
    { number: "10.5", title: "Checkpoint: What Is Ready, and What Needs Revision?", type: "checkpoint", duration: "10 minutes" },
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
    relatedPath: "/kb/source-bank",
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
    relatedPath: "/kb/source-bank",
  },
  {
    title: "Cyber safety",
    claim:
      "Public-facing educators need account hygiene, identity separation, profile review, and safe publishing routines.",
    sourceNote:
      "Use official security guidance and the OpenTeachStack cyber safety materials as the local baseline.",
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
        url: "/book/ots-101/02-standards-goals-to-lessons",
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
    evidenceRoute: "/book/ots-101/10-mini-course-content-packet",
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
