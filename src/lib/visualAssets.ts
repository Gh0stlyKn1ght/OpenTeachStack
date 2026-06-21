export interface VisualAsset {
  src: string;
  alt: string;
}

export const lessonVisuals: Record<string, VisualAsset> = {
  "what-teaching-teachers-is": {
    src: "/images/ots-101/what-teaching-teachers-is.webp",
    alt: "Illustration of scattered teaching materials being arranged into a coherent curriculum system.",
  },
  "the-teacher-as-builder": {
    src: "/images/ots-101/the-teacher-as-builder.webp",
    alt: "Illustration of a teacher-builder workspace with curriculum cards and maker tools.",
  },
  "prompting-for-teachers": {
    src: "/images/ots-101/prompting-for-teachers.webp",
    alt: "Illustration of prompts, source notes, and lesson cards forming a structured planning workflow.",
  },
  "ai-as-curriculum-assistant": {
    src: "/images/ots-101/ai-as-curriculum-assistant.webp",
    alt: "Illustration of AI draft cards being checked against sources, standards, and verification notes.",
  },
  "building-courses-from-standards": {
    src: "/images/ots-101/building-courses-from-standards.webp",
    alt: "Illustration of standards documents connected to learning targets and assessment evidence.",
  },
  "course-architecture": {
    src: "/images/ots-101/course-architecture.webp",
    alt: "Illustration of a curriculum blueprint with modules, units, lessons, and assessments.",
  },
  "resource-discovery-and-evaluation": {
    src: "/images/ots-101/resource-discovery-and-evaluation.webp",
    alt: "Illustration of source cards, license notes, and verified resource checks on a desk.",
  },
  "open-source-vs-free": {
    src: "/images/ots-101/open-source-vs-free.webp",
    alt: "Illustration comparing a closed free tool box with an open curriculum toolkit.",
  },
  "creative-commons-for-teachers": {
    src: "/images/ots-101/creative-commons-for-teachers.webp",
    alt: "Illustration of lesson materials, attribution cards, license badges, and remix arrows.",
  },
  "choosing-a-teacher-app-stack": {
    src: "/images/ots-101/choosing-a-teacher-app-stack.webp",
    alt: "Illustration of selected teacher app tiles separated from a messy pile of unused tools.",
  },
  "google-drive-folder-architecture": {
    src: "/images/ots-101/google-drive-folder-architecture.webp",
    alt: "Illustration of an organized digital folder architecture for curriculum materials.",
  },
  "google-sheets-as-curriculum-database": {
    src: "/images/ots-101/google-sheets-as-curriculum-database.webp",
    alt: "Illustration of a spreadsheet-style curriculum database with units, standards, and resources.",
  },
  "google-forms-as-quizzes": {
    src: "/images/ots-101/google-forms-as-quizzes.webp",
    alt: "Illustration of quiz cards, response patterns, answer checks, and feedback loops.",
  },
  "assessment-rubrics-and-feedback": {
    src: "/images/ots-101/assessment-rubrics-and-feedback.webp",
    alt: "Illustration of rubric cards, assessment evidence, revision arrows, and feedback loops.",
  },
  "delivery-planning-foundations": {
    src: "/images/ots-101/delivery-planning-foundations.webp",
    alt: "Illustration of lesson pacing blocks, materials, backup plans, and classroom delivery notes.",
  },
  "one-day-lesson-site-workflow": {
    src: "/images/ots-101/one-day-lesson-site-workflow.webp",
    alt: "Illustration of a one-page lesson site assembled from sources, vocabulary, tasks, and exit ticket cards.",
  },
  "capstone-build-your-mini-course": {
    src: "/images/ots-101/capstone-build-your-mini-course.webp",
    alt: "Illustration of a completed mini-unit packet with standards, resources, rubric, delivery plan, and revision log.",
  },
};

export const pageVisuals = {
  sourceBank: {
    src: "/images/ots-101/source-bank.webp",
    alt: "Illustration of a verified source bank with resource cards, status lights, and privacy notes.",
  },
  releasePacket: {
    src: "/images/ots-101/release-packet.webp",
    alt: "Illustration of an OTS-101 release packet with module cards, checklists, source evidence, and rubric materials.",
  },
} satisfies Record<string, VisualAsset>;

