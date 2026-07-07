import fs from "node:fs";
import path from "node:path";

const files = [
  "scripts/author-ots201-course-lessons.mjs",
  "scripts/author-ots220-course-lessons.mjs",
  "scripts/author-ots240-course-lessons.mjs",
  "scripts/author-ots260-course-lessons.mjs",
  "scripts/author-ots280-course-lessons.mjs",
  "scripts/author-ots301-course-lessons.mjs",
  "scripts/author-ots320-course-lessons.mjs",
  "scripts/author-ots399-course-lessons.mjs",
];

const richContentLogic = `  let richContent = "";
  if (section.lessonType === "concept") {
    richContent = \`\\n### Strategy Comparison\\n\\n<ComparisonBlock\\n  title="Curriculum Strategy Comparison"\\n  intro="Evaluating standard vs optimized workflows for \${section.title}."\\n  leftTitle="Before: Ad-hoc/Manual"\\n  rightTitle="After: Structured/Systems-Driven"\\n  leftItems={[\\n    "Manual setup and redundant repetition",\\n    "Isolated files without standard conventions",\\n    "High maintenance overhead and fragile paths"\\n  ]}\\n  rightItems={[\\n    "Automated, template-based creation",\\n    "Centralized metadata and versioned layouts",\\n    "Low cognitive load and scalable structure"\\n  ]}\\n  takeaways={[\\n    "Focus on building structures that require less daily maintenance.",\\n    "Centralize resources so that updates cascade automatically."\\n  ]}\\n/>\\n\\n### Core Concepts\\n\\n<FrameworkBlock label="System Framework" title="Architectural Pillars" intro="Key structural concepts for this chapter.">\\n  <ConceptCard title="Visibility" tone="blue">\\n    Ensure all resources are easily discoverable and explicitly linked.\\n  </ConceptCard>\\n  <ConceptCard title="Portability" tone="purple">\\n    Minimize platform-specific lock-in and keep content in structured formats.\\n  </ConceptCard>\\n  <ConceptCard title="Reliability" tone="green">\\n    Perform automated validations and maintain clean, auditable change logs.\\n  </ConceptCard>\\n</FrameworkBlock>\\n\`;
  } else if (section.lessonType === "workflow" || section.lessonType === "artifact-build") {
    richContent = \`\\n### Process Flow Diagram\\n\\n\`\`\`mermaid\\nflowchart TD\\n    Start[Analyze Needs] --> Define[Define System Structure]\\n    Define --> Develop[Draft Content & Scaffolds]\\n    Develop --> Verify[Validate Constraints & Safety]\\n    Verify --> Release[Publish & Lock Ready Artifacts]\\n    Release --> Maintain[Iterate & Maintain Routines]\\n\`\`\`\\n\\n<WorkflowBlock\\n  title="Actionable Steps for \${section.title}"\\n  intro="Follow these sequential steps to complete the required task safely."\\n  steps={[\\n    "Analyze constraints and define the boundary for this lesson step.",\\n    "Initialize file structures or templates using standardized schemas.",\\n    "Draft content with plain-language, classroom-pressure aware details.",\\n    "Perform required quality checks, verifying accessibility and safety rules.",\\n    "Finalize the artifact and establish a routine for reviews."\\n  ]}\\n  takeaways={[\\n    "Always run verification checks locally before pushing or sharing changes.",\\n    "Maintain a clear separation between student data and course logic."\\n  ]}\\n/>\\n\`;
  } else {
    richContent = \`\\n### Progress Checklist\\n\\n<ChecklistBlock\\n  title="Completion & Integrity Gate"\\n  intro="Verify that all steps for \${section.title} satisfy quality and safety standards."\\n  items={[\\n    "Structure complies with the course packet layout specification.",\\n    "No placeholder text or draft-era language is present in user-facing content.",\\n    "Access notes and text alternatives are attached for all media assets.",\\n    "All official references are verified and source bank links are correct."\\n  ]}\\n  takeaway="Ensure the lesson meets all curriculum criteria before moving forward."\\n/>\\n\`;
  }

  return \`# \${section.title}`;

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("let richContent =")) {
    console.log(`Already enriched: ${file}`);
    continue;
  }

  // 1. Insert richContent definition logic before return
  content = content.replace(/return\s+`#\s+\\$\{section\.title\}/, richContentLogic);

  // 2. Insert template variable right before '## Do This'
  content = content.replace(/## Do This/, "\\\${richContent}\\n\\n## Do This");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Enriched script: ${file}`);
}
