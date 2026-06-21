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
    slug: "teacher-workflow-audit",
    title: "Teacher Workflow Audit",
    format: "Google Doc",
    module: "Module 01",
    purpose:
      "Identify the planning, resource, AI, and delivery problems your curriculum system needs to solve.",
    skillMeasured: "Systems thinking and honest workflow diagnosis.",
    beginnerVersion:
      "List current tools, repeated tasks, pain points, and one workflow to improve.",
    advancedVersion:
      "Map the workflow from source discovery through delivery, feedback, revision, and archiving.",
    evidenceOfCompletion:
      "A completed audit with at least three pain points and one priority workflow.",
    tags: ["workflow", "module-01", "capstone"],
    sections: [
      {
        title: "Current Workflow",
        fields: [
          "Course or unit",
          "Where materials currently live",
          "Tools used weekly",
          "Repeated tasks",
          "Where work gets lost or duplicated",
        ],
        example: [
          "Intro Robotics",
          "Drive folders, Classroom posts, local downloads",
          "Docs, Slides, Sheets, Forms, ChatGPT",
          "Rewriting directions and recreating rubrics",
          "Old resources are hard to find after each quarter",
        ],
      },
      {
        title: "Priority Problem",
        fields: ["Problem", "Why it matters", "What better would look like"],
        example: [
          "Resource links are scattered",
          "Students and co-teachers lose track of the correct version",
          "A single resource sheet with source, license, and lesson alignment",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "standards-unpacking-sheet",
    title: "Standards Unpacking Sheet",
    format: "Google Sheet",
    module: "Module 04",
    purpose:
      "Turn real standards into teachable learning targets and assessment evidence.",
    skillMeasured: "Standards interpretation and alignment judgment.",
    beginnerVersion:
      "Unpack three standards into learning targets and one evidence task each.",
    advancedVersion:
      "Add prerequisite skills, vocabulary, cognitive demand, and lesson mapping.",
    evidenceOfCompletion:
      "Standards are linked to specific targets, tasks, and lessons.",
    tags: ["standards", "alignment", "module-04"],
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
    slug: "mini-unit-map",
    title: "Mini-Unit Map",
    format: "Google Sheet",
    module: "Module 05",
    purpose:
      "Plan a coherent 3 to 5 lesson sequence before writing full materials.",
    skillMeasured: "Unit architecture, sequencing, and scope control.",
    beginnerVersion:
      "Map three lessons with targets, activities, resources, and checks.",
    advancedVersion:
      "Add pacing options, differentiation, assessment timing, and revision checkpoints.",
    evidenceOfCompletion:
      "The unit has a clear sequence, target progression, and assessment plan.",
    tags: ["mini-unit", "planning", "capstone"],
    sections: [
      {
        title: "Unit Overview",
        fields: [
          "Mini-unit title",
          "Audience",
          "Duration",
          "Essential question",
          "Final evidence of learning",
        ],
        example: [
          "Robot Sensors and Decisions",
          "Grade 8 robotics",
          "4 lessons",
          "How does a robot decide what to do next?",
          "Students build and explain a sensor-based decision routine.",
        ],
      },
      {
        title: "Lesson Sequence",
        fields: [
          "Lesson",
          "Learning target",
          "Main activity",
          "Resource",
          "Check for understanding",
        ],
        example: [
          "Lesson 1",
          "I can explain sensor input and output.",
          "Sensor demo and observation chart",
          "Robot kit guide",
          "Exit ticket: input/output example",
        ],
      },
      sharedSafetySection,
    ],
  },
  {
    slug: "lesson-template",
    title: "Lesson Template",
    format: "Google Doc",
    module: "Module 05",
    purpose:
      "Create a repeatable lesson structure that preserves teacher voice while keeping materials consistent.",
    skillMeasured: "Lesson design and instructional clarity.",
    beginnerVersion:
      "Write one complete lesson using target, instruction, activity, check, and reflection.",
    advancedVersion:
      "Add differentiation, accessibility notes, extension paths, and revision history.",
    evidenceOfCompletion:
      "A complete lesson another teacher could follow without a meeting.",
    tags: ["lesson", "architecture", "module-05"],
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
    slug: "prompt-library",
    title: "Prompt Library",
    format: "Google Sheet",
    module: "Module 02",
    purpose:
      "Track useful prompts, revisions, quality notes, and reuse decisions.",
    skillMeasured: "Prompt design, iteration, verification, and voice preservation.",
    beginnerVersion:
      "Save five prompts with purpose, context, output, and revision notes.",
    advancedVersion:
      "Categorize prompts by task, variables, quality score, and safety checks.",
    evidenceOfCompletion:
      "Prompts are reusable because they include context, constraints, and verification notes.",
    tags: ["AI", "prompts", "module-02"],
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
    slug: "resource-evaluation-sheet",
    title: "Resource Evaluation Sheet",
    format: "Google Sheet",
    module: "Module 06",
    purpose:
      "Evaluate resources before putting them into a lesson or mini-unit.",
    skillMeasured: "Source judgment, licensing awareness, and alignment checking.",
    beginnerVersion:
      "Evaluate five resources for credibility, license, usefulness, and alignment.",
    advancedVersion:
      "Add accessibility, bias/representation, replacement options, and classroom-use notes.",
    evidenceOfCompletion:
      "Every selected resource has a reason, a source link, and a use decision.",
    tags: ["OER", "sources", "module-06"],
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
    module: "Module 03",
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
    slug: "assessment-rubric-template",
    title: "Assessment/Rubric Template",
    format: "Google Doc",
    module: "Module 08",
    purpose:
      "Design assessment evidence and rubric criteria that match learning targets.",
    skillMeasured: "Assessment validity and feedback clarity.",
    beginnerVersion:
      "Create one assessment task and a three-criteria rubric.",
    advancedVersion:
      "Add performance levels, exemplars, revision opportunities, and peer-review notes.",
    evidenceOfCompletion:
      "The assessment measures the target and the rubric names observable evidence.",
    tags: ["assessment", "rubric", "module-08"],
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
    slug: "one-day-lesson-site-planner",
    title: "One-Day Lesson Site Planner",
    format: "Google Doc",
    module: "Module 09",
    purpose:
      "Turn trusted sources into a simple teachable HTML/CSS lesson page for the next class period.",
    skillMeasured:
      "Fast, source-based delivery planning without losing verification, accessibility, or teacher judgment.",
    beginnerVersion:
      "Plan one page with an objective, sources, vocabulary, visual needs, student task, and exit ticket.",
    advancedVersion:
      "Add media attribution, source notes, accessibility checks, revision notes, and a post-class improvement plan.",
    evidenceOfCompletion:
      "A source-backed one-day lesson site plan that can be built, taught, verified, and archived.",
    tags: ["delivery", "lesson-site", "sources", "module-09"],
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
          "Teaching Teachers Source Bank item",
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
    slug: "delivery-plan",
    title: "Delivery Plan",
    format: "Google Doc",
    module: "Module 09",
    purpose:
      "Prepare a mini-unit for classroom use with directions, pacing, feedback, and backup routines.",
    skillMeasured: "Classroom implementation planning.",
    beginnerVersion:
      "Write student-facing directions, timing, and one check for understanding.",
    advancedVersion:
      "Add differentiation, technology backup, feedback loops, and revision triggers.",
    evidenceOfCompletion:
      "The mini-unit can be taught without hidden instructions living only in the teacher's head.",
    tags: ["delivery", "classroom", "module-09"],
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
    slug: "reflection-revision-log",
    title: "Reflection and Revision Log",
    format: "Google Sheet",
    module: "Module 10",
    purpose:
      "Document what changed during drafting, review, verification, and delivery planning.",
    skillMeasured: "Reflective practice and curriculum ownership.",
    beginnerVersion:
      "Record five revisions with reason, evidence, and next action.",
    advancedVersion:
      "Track peer feedback, student feedback, source updates, and future version plans.",
    evidenceOfCompletion:
      "The teacher can show how the mini-unit improved over time.",
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

export function getFoundationTemplate(slug: string) {
  return FOUNDATION_TEMPLATES.find((template) => template.slug === slug);
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

**Teaching Teachers module:** ${template.module}
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

