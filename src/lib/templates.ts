export type TemplateFormat = "Google Doc" | "Google Sheet";

export interface TemplateSection {
  title: string;
  prompt?: string;
  fields?: string[];
  example?: string[];
}

export interface FoundationTemplate {
  slug: string;
  title: string;
  format: TemplateFormat;
  module: string;
  purpose: string;
  skillMeasured: string;
  beginnerVersion: string;
  advancedVersion: string;
  evidenceOfCompletion: string;
  tags: string[];
  sections: TemplateSection[];
}

const sharedSafetySection: TemplateSection = {
  title: "Safety and Quality Check",
  fields: [
    "Privacy check",
    "Copyright/licensing check",
    "AI verification check",
    "Standards alignment check",
    "Accessibility check",
    "Revision log entry",
  ],
  example: [
    "No student-identifiable data included",
    "All borrowed sources linked and license noted",
    "AI-generated claims checked against source material",
    "Each activity maps to at least one learning target",
    "Directions use readable language and descriptive links",
    "Revision note explains what changed and why",
  ],
};

export const FOUNDATION_TEMPLATES: FoundationTemplate[] = [
  {
    slug: "course-content-inventory",
    title: "Course Content Inventory",
    format: "Google Doc",
    module: "Chapter 01",
    purpose:
      "Separate curriculum decisions, student-facing content, instructional materials, platform exports, and revision needs.",
    skillMeasured: "Course-content modeling and honest inventory.",
    beginnerVersion:
      "List current course pieces, audience, location, status, AI support needed, and verification needs.",
    advancedVersion:
      "Add OTS-000 context only where tools, access, source, platform, or safety boundaries affect the artifact.",
    evidenceOfCompletion:
      "A completed inventory with clear keep, revise, rebuild, or block decisions.",
    tags: ["inventory", "chapter-01", "capstone"],
    sections: [
      {
        title: "Current Workflow",
        fields: [
          "Course piece",
          "Category",
          "Audience",
          "Platform or location",
          "Status",
        ],
        example: [
          "Robot startup checklist",
          "Student-facing content",
          "Students",
          "Google Classroom export",
          "Revise before students",
        ],
      },
      {
        title: "Revision Decision",
        fields: ["Item", "Decision", "Why it matters"],
        example: [
          "Old safety slide",
          "Rebuild",
          "It gives teacher notes but not student-ready directions",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "learning-target-lesson-map",
    title: "Learning Target and Lesson Map",
    format: "Google Sheet",
    module: "Chapter 02",
    purpose:
      "Turn standards, goals, or course problems into student-friendly targets, practice paths, and evidence checks.",
    skillMeasured: "Standards interpretation and alignment judgment.",
    beginnerVersion:
      "Map three goals or standards into learning targets and one evidence task each.",
    advancedVersion:
      "Add prerequisite skills, vocabulary, cognitive demand, and lesson mapping.",
    evidenceOfCompletion:
      "Targets are linked to practice, evidence, teacher verification, and revision triggers.",
    tags: ["targets", "alignment", "chapter-02"],
    sections: [
      {
        title: "Blank Sheet Columns",
        fields: [
          "Standard source",
          "Standard code",
          "Standard text",
          "Important verbs",
          "Learning target",
          "Assessment evidence",
          "Lesson connection",
        ],
        example: [
          "NJ Computer Science Standards",
          "8.1.8.AP.4",
          "Decompose problems and subproblems into parts...",
          "Decompose",
          "I can break a robot navigation problem into smaller steps.",
          "Students annotate a route plan before coding.",
          "Lesson 2: Path planning",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "course-content-map",
    title: "Course Content Map",
    format: "Google Sheet",
    module: "Chapter 07",
    purpose:
      "Show where source drafts, student-ready content, platform exports, archives, and revision notes live.",
    skillMeasured: "Course-content organization, status visibility, and source-of-truth discipline.",
    beginnerVersion:
      "Map source, draft, student-ready, export, and archive locations.",
    advancedVersion:
      "Add naming rules, review status, OTS-000/local context, and revision-log locations.",
    evidenceOfCompletion:
      "Another teacher can find the current packet pieces without guessing.",
    tags: ["organization", "source-of-truth", "capstone"],
    sections: [
      {
        title: "Packet Locations",
        fields: [
          "Folder or location",
          "Purpose",
          "Audience",
          "Status shown",
          "Naming rule",
        ],
        example: [
          "Course source folder",
          "Approved drafts and review notes",
          "Teacher/reviewer",
          "Draft / reviewed / blocked",
          "unit-topic-artifact-status",
        ],
      },
      {
        title: "Review Trail",
        fields: [
          "Artifact",
          "Source location",
          "Student-view location",
          "Review status",
          "Revision trigger",
        ],
        example: [
          "Student-facing lesson",
          "source/robotics-safety",
          "Classroom draft",
          "Needs student-view check",
          "Revise after access test",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "student-facing-lesson-draft",
    title: "Student-Facing Lesson Draft",
    format: "Google Doc",
    module: "Chapter 05",
    purpose:
      "Create a lesson page students can start, follow, and check without a private teacher explanation.",
    skillMeasured: "Student-facing clarity and instructional usability.",
    beginnerVersion:
      "Write one lesson using target, directions, examples, practice, check, and stuck-point support.",
    advancedVersion:
      "Add differentiation, accessibility notes, extension paths, and revision history.",
    evidenceOfCompletion:
      "A complete lesson a student can begin and another teacher can review.",
    tags: ["lesson", "student-facing", "chapter-05"],
    sections: [
      {
        title: "Lesson Header",
        fields: [
          "Lesson title",
          "Learning target",
          "Estimated time",
          "Materials",
          "Prerequisites",
        ],
        example: [
          "Sensor Decisions",
          "I can write an if/then decision for a robot sensor.",
          "45 minutes",
          "Robot kit, laptop, sensor guide",
          "Students have tested basic motor movement.",
        ],
      },
      {
        title: "Lesson Body",
        fields: [
          "Opening question",
          "Direct instruction",
          "Guided practice",
          "Independent practice",
          "Check for understanding",
          "Reflection",
        ],
        example: [
          "What information does the robot need before it moves?",
          "Explain sensor input using a simple obstacle example.",
          "Class traces one if/then routine together.",
          "Pairs modify a routine for a new obstacle.",
          "Students explain one decision in plain language.",
          "What made the robot decision predictable or unpredictable?",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "reusable-course-content-prompt",
    title: "Reusable Course-Content Prompt",
    format: "Google Sheet",
    module: "Chapter 03",
    purpose:
      "Save a bounded prompt that uses source context, task constraints, format requirements, and verification rules.",
    skillMeasured: "Prompt design, iteration, verification, and voice preservation.",
    beginnerVersion:
      "Save one reusable course-content prompt with variables, constraints, and review notes.",
    advancedVersion:
      "Categorize prompts by task, variables, quality score, and safety checks.",
    evidenceOfCompletion:
      "The prompt can draft useful course content without pretending the AI has verified it.",
    tags: ["AI", "prompts", "chapter-03"],
    sections: [
      {
        title: "Prompt Log Columns",
        fields: [
          "Prompt name",
          "Purpose",
          "Full prompt",
          "Variables to replace",
          "Output reviewed",
          "Teacher revision notes",
          "Reuse decision",
        ],
        example: [
          "Rubric draft from target",
          "Draft observable rubric criteria",
          "You are helping me draft a rubric...",
          "[grade], [target], [task]",
          "Yes",
          "Removed vague effort language and added observable evidence.",
          "Reuse with revisions",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "source-resource-review",
    title: "Source and Resource Review",
    format: "Google Sheet",
    module: "Chapter 08",
    purpose:
      "Evaluate sources, media, licensing, access, and classroom fit before putting material into student-facing content.",
    skillMeasured: "Source judgment, licensing awareness, and alignment checking.",
    beginnerVersion:
      "Evaluate five resources for credibility, license, usefulness, and alignment.",
    advancedVersion:
      "Add accessibility, bias/representation, replacement options, and classroom-use notes.",
    evidenceOfCompletion:
      "Every selected resource has a reason, a source link, and a use decision.",
    tags: ["sources", "safety", "chapter-08"],
    sections: [
      {
        title: "Evaluation Columns",
        fields: [
          "Resource title",
          "URL or source",
          "Source Bank status",
          "Creator/publisher",
          "License or terms",
          "Audience",
          "Cost/account notes",
          "Privacy or age note",
          "Why this source is credible",
          "How it supports the target",
          "Use decision",
        ],
        example: [
          "Ultrasonic sensor guide",
          "Official kit documentation",
          "Not in Source Bank; direct link needs verification",
          "Robot kit publisher",
          "Classroom use permitted by district purchase",
          "Students and teachers",
          "District purchase; no separate student account",
          "Use district-approved accounts and do not upload student data",
          "Primary documentation for the hardware students use",
          "Supports Lesson 1 sensor vocabulary",
          "Use with teacher summary",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "ai-verification-checklist",
    title: "AI Verification Checklist",
    format: "Google Doc",
    module: "Chapter 04",
    purpose:
      "Check AI-assisted curriculum before it reaches students or colleagues.",
    skillMeasured: "AI literacy, verification habits, and professional judgment.",
    beginnerVersion:
      "Run the checklist on one AI-generated lesson, rubric, or quiz.",
    advancedVersion:
      "Document source checks, rejected output, revised language, and policy constraints.",
    evidenceOfCompletion:
      "The teacher can explain what was accepted, changed, rejected, and why.",
    tags: ["AI", "verification", "safety"],
    sections: [
      {
        title: "Verification Questions",
        fields: [
          "What did AI help draft?",
          "What facts or claims need checking?",
          "What source did you check against?",
          "What language does not sound like you?",
          "What could be biased, misleading, or inaccessible?",
          "What did you reject?",
        ],
        example: [
          "A quiz and short rubric",
          "Answer key, standards claim, and vocabulary definitions",
          "State standard page and kit documentation",
          "The rubric used generic 'excellent' language",
          "One example assumed all students had home internet",
          "Rejected two questions that measured trivia instead of target",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "assignment-rubric-packet",
    title: "Assignment/Rubric Packet",
    format: "Google Doc",
    module: "Chapter 06",
    purpose:
      "Design assessment evidence and rubric criteria that match learning targets.",
    skillMeasured: "Assessment validity and feedback clarity.",
    beginnerVersion:
      "Create one assessment task and a three-criteria rubric.",
    advancedVersion:
      "Add performance levels, exemplars, revision opportunities, and peer-review notes.",
    evidenceOfCompletion:
      "The assessment measures the target and the rubric names observable evidence.",
    tags: ["assessment", "rubric", "chapter-06"],
    sections: [
      {
        title: "Assessment Plan",
        fields: [
          "Learning target",
          "Assessment task",
          "Evidence students produce",
          "Success criteria",
          "Feedback opportunity",
        ],
        example: [
          "I can write an if/then robot decision.",
          "Students program and explain a sensor response.",
          "Working routine plus written explanation",
          "Condition is clear, action matches condition, explanation is accurate",
          "Teacher checkpoint before final run",
        ],
      },
      {
        title: "Rubric Criteria",
        fields: ["Criterion", "Strong evidence", "Developing evidence", "Needs revision"],
        example: [
          "Decision logic",
          "Condition and action are accurate and testable",
          "Condition is present but action is inconsistent",
          "Routine does not use a clear condition",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "publishing-checklist",
    title: "Publishing Checklist",
    format: "Google Doc",
    module: "Chapter 09",
    purpose:
      "Check student-view access, source/export boundaries, platform copy, and blocked items before release.",
    skillMeasured:
      "Publishing judgment without confusing upload status for instructional readiness.",
    beginnerVersion:
      "Check one platform copy with links, directions, source notes, access, and blocked items.",
    advancedVersion:
      "Add media attribution, source notes, accessibility checks, revision notes, and a post-class improvement plan.",
    evidenceOfCompletion:
      "A student-view publishing note that says ready, revise, or blocked with evidence.",
    tags: ["publishing", "student-view", "chapter-09"],
    sections: [
      {
        title: "Learning Need",
        fields: [
          "Course and grade",
          "Topic",
          "Class length",
          "Learning objective",
          "Standards or skills connection",
          "One thing students should leave able to do",
        ],
        example: [
          "Intro Robotics, grade 8",
          "What Is a Robot?",
          "45 minutes",
          "Students will classify systems as robots or non-robots using sense-think-act reasoning.",
          "Engineering design and computational thinking vocabulary",
          "Explain why a device does or does not qualify as a robot.",
        ],
      },
      {
        title: "Trusted Source Bank",
        fields: [
          "Official documentation",
          "OpenTeachStack Source Bank item",
          "State standards",
          "University or OER source",
          "Video source",
          "Image or diagram source",
          "Copyright or license notes",
        ],
        example: [
          "Robot kit documentation or manufacturer guide",
          "Raspberry Pi Foundation Teach or Microsoft MakeCode, if it fits the lesson",
          "NJ computer science / design thinking standard link",
          "NASA robotics education page or university robotics explainer",
          "Short YouTube video placeholder to verify before class",
          "Teacher-created sense-think-act diagram",
          "Use only allowed images; add source notes below the page.",
        ],
      },
      {
        title: "Page Structure",
        fields: [
          "Hook",
          "Vocabulary",
          "Short explanation",
          "Visual or diagram",
          "Examples and non-examples",
          "Student task",
          "Exit ticket",
        ],
        example: [
          "Is an automatic door a robot?",
          "Robot, sensor, input, output, controller, actuator",
          "A robot senses information, processes it, and acts in the world.",
          "Sense -> Think -> Act diagram",
          "Robot vacuum / remote-control car / automatic door / toaster",
          "Students classify 8 systems and defend two decisions.",
          "Name one system and explain the sense-think-act chain.",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "course-content-folder-map",
    title: "Course Content Folder Map",
    format: "Google Doc",
    module: "Chapter 07",
    purpose:
      "Make source, draft, review, export, archive, and revision locations visible before the packet spreads across platforms.",
    skillMeasured: "Course-content organization and review handoff.",
    beginnerVersion:
      "Name each packet location, purpose, status, naming rule, and archive rule.",
    advancedVersion:
      "Add local/OTS-000 context where access, source, tools, or safety boundaries affect the packet.",
    evidenceOfCompletion:
      "The packet can be reviewed and updated without hidden locations or mystery versions.",
    tags: ["organization", "handoff", "chapter-07"],
    sections: [
      {
        title: "Delivery Notes",
        fields: [
          "Lesson sequence",
          "Student-facing directions",
          "Timing",
          "Materials",
          "Check for understanding",
          "Backup plan",
        ],
        example: [
          "Lesson 1: sensor input, Lesson 2: decision routine",
          "Open the sensor guide, test the sensor, record two observations...",
          "10 min demo, 25 min build, 10 min exit ticket",
          "Robot kit, laptops, printed observation chart",
          "Explain one sensor decision in plain language",
          "Use printed pseudocode cards if robots are unavailable",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "packet-review-log",
    title: "Mini Course Content Packet Review Log",
    format: "Google Sheet",
    module: "Chapter 10",
    purpose:
      "Document what changed while assembling, reviewing, publishing, blocking, or revising the Mini Course Content Packet.",
    skillMeasured: "Reflective practice and curriculum ownership.",
    beginnerVersion:
      "Record five revisions with reason, evidence, and next action.",
    advancedVersion:
      "Track peer feedback, student feedback, source updates, and future version plans.",
    evidenceOfCompletion:
      "The teacher can show how the packet improved over time.",
    tags: ["revision", "reflection", "capstone"],
    sections: [
      {
        title: "Revision Log Columns",
        fields: [
          "Date",
          "Artifact changed",
          "Trigger",
          "What changed",
          "Why it changed",
          "Next action",
        ],
        example: [
          "2026-06-20",
          "Rubric",
          "AI verification check",
          "Replaced vague criteria with observable behavior",
          "Students need to know what evidence counts",
          "Peer review before final capstone",
        ],
      },
      sharedSafetySection,
    ],
  },
];

export const TEMPLATE_SLUG_ALIASES: Record<string, string> = {
  "teacher-workflow-audit": "course-content-inventory",
  "standards-unpacking-sheet": "learning-target-lesson-map",
  "mini-unit-map": "course-content-map",
  "lesson-template": "student-facing-lesson-draft",
  "prompt-library": "reusable-course-content-prompt",
  "resource-evaluation-sheet": "source-resource-review",
  "assessment-rubric-template": "assignment-rubric-packet",
  "one-day-lesson-site-planner": "publishing-checklist",
  "delivery-plan": "course-content-folder-map",
  "reflection-revision-log": "packet-review-log",
};

export function getFoundationTemplate(slug: string) {
  const canonicalSlug = TEMPLATE_SLUG_ALIASES[slug] ?? slug;
  return FOUNDATION_TEMPLATES.find((template) => template.slug === canonicalSlug);
}

function renderFieldList(fields: string[], values?: string[]) {
  return fields
    .map((field, index) => {
      const value = values?.[index] ?? "";
      return `- **${field}:** ${value}`;
    })
    .join("\n");
}

export function renderTemplateMarkdown(template: FoundationTemplate) {
  const blankSections = template.sections
    .map((section) => {
      const prompt = section.prompt ? `\n${section.prompt}\n` : "";
      const fields = section.fields
        ? renderFieldList(section.fields)
        : "- Add your notes here.";

      return `## ${section.title}${prompt}\n${fields}`;
    })
    .join("\n\n");

  const exampleSections = template.sections
    .map((section) => {
      const prompt = section.prompt ? `\n${section.prompt}\n` : "";
      const fields =
        section.fields && section.example
          ? renderFieldList(section.fields, section.example)
          : "- Example pending.";

      return `## ${section.title}${prompt}\n${fields}`;
    })
    .join("\n\n");

  return `# ${template.title}

**OpenTeachStack module:** ${template.module}
**Suggested format:** ${template.format}
**Purpose:** ${template.purpose}
**Skill measured:** ${template.skillMeasured}
**Beginner version:** ${template.beginnerVersion}
**Advanced version:** ${template.advancedVersion}
**Evidence of completion:** ${template.evidenceOfCompletion}

---

# Blank Version

${blankSections}

---

# Example Version

${exampleSections}

---

## Use Notes

- Copy this Markdown into a Google Doc, Google Sheet, local Markdown file, or curriculum planning system.
- Replace the blank fields with your own course, unit, lesson, resource, or assessment details.
- Keep the safety and quality check attached to the artifact before sharing with students or colleagues.
- Document meaningful revisions so the template becomes part of a reusable curriculum system.
`;
}

