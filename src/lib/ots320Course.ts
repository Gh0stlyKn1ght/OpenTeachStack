import type {
  CourseChapter,
  CourseSection,
  CourseSectionType,
  CourseStructure,
} from "@/lib/courseStructures";

function section(
  number: string,
  title: string,
  type: CourseSectionType = "section",
  duration = "20 minutes",
  artifact?: string,
): CourseSection {
  return { number, title, type, duration, artifact };
}

function chapter(
  number: string,
  title: string,
  slug: string,
  problem: string,
  essentialQuestion: string,
  buildArtifact: string,
  skills: string[],
  sections: CourseSection[],
): CourseChapter {
  return {
    number,
    title,
    slug: `${number}-${slug}`,
    problem,
    essentialQuestion,
    buildArtifact,
    skills,
    sections,
  };
}

export const OTS320_COURSE: CourseStructure = {
  code: "OTS-320",
  slug: "ots-320",
  title: "Command Line AI for Teacher Builders",
  level: "Intermediate/Advanced",
  status: "Draft",
  coursePath: "Modern Teacher Systems",
  prerequisite:
    "OTS-000 or equivalent terminal and file literacy; OTS-101 recommended",
  thesis:
    "Use command-line AI agents as inspectable repository tools: control context and permissions, direct work with technical specifications, verify changes with Git and tests, and keep human review in charge.",
  finalArtifact: "Reviewed agent-assisted teacher tool plus evidence dossier",
  chapters: [
    chapter(
      "01",
      "When AI Enters the Terminal",
      "when-ai-enters-the-terminal",
      "Chat-based AI can suggest work. Terminal agents can read files, change repositories, run tools, and request access, which changes what the user must understand and verify.",
      "What changes when AI moves from answering questions to acting inside a repository?",
      "Agent action and evidence map",
      ["agent literacy", "terminal reasoning", "evidence"],
      [
        section("01.0", "Chapter Overview", "overview", "15 minutes"),
        section("01.1", "From Chat Answers to Repository Actions", "section", "20 minutes"),
        section("01.2", "Read, Write, Execute, Network", "section", "25 minutes"),
        section("01.3", "Lab: Inspect Before You Change", "workshop", "30 minutes", "Inspection evidence log"),
        section("01.4", "Evidence Checkpoint: Prove What Happened", "checkpoint", "20 minutes", "Agent action and evidence map"),
      ],
    ),
    chapter(
      "02",
      "Context, Instructions, and Permissions",
      "context-instructions-permissions",
      "An agent can only make sensible decisions when the user understands what directory, repository instructions, files, and permissions are shaping the session.",
      "How do you control what an agent can see, interpret, and do before it begins changing work?",
      "Bounded agent session plan",
      ["repository context", "project instructions", "least privilege"],
      [
        section("02.0", "Chapter Overview", "overview", "15 minutes"),
        section("02.1", "Working Directory and Repository Context", "section", "20 minutes"),
        section("02.2", "Project Instructions and Scope", "section", "25 minutes"),
        section("02.3", "Lab: Build a Permission Boundary", "workshop", "30 minutes", "Permission boundary record"),
        section("02.4", "Checkpoint: Least Access Needed", "checkpoint", "15 minutes", "Bounded agent session plan"),
      ],
    ),
    chapter(
      "03",
      "Codex CLI",
      "codex-cli",
      "A provider-specific CLI becomes useful only when the teacher can connect its commands and permission controls to the stable repository concepts learned first.",
      "How do you operate Codex CLI while keeping repository scope, permissions, evidence, and review visible?",
      "Codex inspection and review record",
      ["Codex CLI", "approvals", "review"],
      [
        section("03.0", "Chapter Overview", "overview", "15 minutes"),
        section("03.1", "Starting Codex in a Repository", "section", "20 minutes"),
        section("03.2", "Permissions, Status, and Review", "section", "25 minutes"),
        section("03.3", "Lab: Inspect a Repository with Codex", "workshop", "35 minutes", "Codex evidence record"),
        section("03.4", "Checkpoint: What Codex Actually Did", "checkpoint", "15 minutes", "Codex inspection and review record"),
      ],
    ),
    chapter(
      "04",
      "Claude Code",
      "claude-code",
      "Claude Code exposes its own session and permission model, so durable agent habits must be translated without assuming every provider works the same way.",
      "How do you use Claude Code deliberately while distinguishing shared agent concepts from Anthropic-specific behavior?",
      "Claude Code inspection and permission record",
      ["Claude Code", "plan mode", "sessions"],
      [
        section("04.0", "Chapter Overview", "overview", "15 minutes"),
        section("04.1", "Starting Claude Code in a Repository", "section", "20 minutes"),
        section("04.2", "Plan Mode, Permissions, and Sessions", "section", "25 minutes"),
        section("04.3", "Lab: Inspect a Repository with Claude Code", "workshop", "35 minutes", "Claude evidence record"),
        section("04.4", "Checkpoint: What Claude Code Actually Did", "checkpoint", "15 minutes", "Claude Code inspection and permission record"),
      ],
    ),
    chapter(
      "05",
      "Antigravity CLI",
      "antigravity-cli",
      "Antigravity CLI adds its own workspace trust, model, tool-permission, skill, and MCP conventions to the same underlying problem of controlled agent access.",
      "How do you operate agy without confusing provider-specific controls with universal agent behavior?",
      "AGY inspection and trust record",
      ["Antigravity CLI", "workspace trust", "tool permissions"],
      [
        section("05.0", "Chapter Overview", "overview", "15 minutes"),
        section("05.1", "Starting agy and Establishing Workspace Trust", "section", "20 minutes"),
        section("05.2", "Models, Help, and Tool Permissions", "section", "25 minutes"),
        section("05.3", "Lab: Inspect a Repository with AGY", "workshop", "35 minutes", "AGY evidence record"),
        section("05.4", "Checkpoint: What AGY Actually Did", "checkpoint", "15 minutes", "AGY inspection and trust record"),
      ],
    ),
    chapter(
      "06",
      "Same Task, Three Agents",
      "same-task-three-agents",
      "Provider interfaces can make similar workflows look more different or more equivalent than they really are.",
      "What stays conceptually stable when the same bounded repository task is attempted with Codex, Claude Code, and AGY?",
      "Cross-agent comparison matrix",
      ["comparison", "provider literacy", "evidence"],
      [
        section("06.0", "Chapter Overview", "overview", "15 minutes"),
        section("06.1", "Same Repository, Same Task, Same Evidence Standard", "section", "20 minutes"),
        section("06.2", "Equivalent Concepts vs Provider-Specific Behavior", "comparison", "25 minutes"),
        section("06.3", "Lab: Run the Comparison", "workshop", "40 minutes", "Cross-agent evidence matrix"),
        section("06.4", "Checkpoint: Compare Without Ranking by Vibes", "checkpoint", "15 minutes", "Cross-agent comparison matrix"),
      ],
    ),
    chapter(
      "07",
      "Prompts as Technical Specifications",
      "prompts-as-technical-specifications",
      "A vague request gives an agent too much room to invent scope, touch unrelated files, or decide what success means.",
      "How do you turn a teacher need into a bounded technical instruction an agent can execute and a human can verify?",
      "Agent task specification",
      ["task design", "acceptance criteria", "constraints"],
      [
        section("07.0", "Chapter Overview", "overview", "15 minutes"),
        section("07.1", "Context, Scope, and Acceptance Criteria", "section", "25 minutes"),
        section("07.2", "Constraints, Protected Areas, and Stop Conditions", "section", "25 minutes"),
        section("07.3", "Build Task: Write a Technical Agent Specification", "artifact", "35 minutes", "Agent task specification"),
        section("07.4", "Checkpoint: Could Another Human Review This Task?", "checkpoint", "15 minutes", "Specification review"),
      ],
    ),
    chapter(
      "08",
      "Git, Diffs, Verification, and Rollback",
      "git-diffs-verification-rollback",
      "Agent work is difficult to trust when there is no clean starting point, inspectable diff, verification result, or rollback path.",
      "How do you turn Git and tests into evidence instead of treating the agent's summary as proof?",
      "Verified change dossier",
      ["Git", "diff review", "testing", "rollback"],
      [
        section("08.0", "Chapter Overview", "overview", "15 minutes"),
        section("08.1", "Checkpoint Before Change", "section", "20 minutes"),
        section("08.2", "Diff, Test, Review, Revert", "workflow", "25 minutes"),
        section("08.3", "Lab: Review and Roll Back an Agent Change", "workshop", "40 minutes", "Change evidence log"),
        section("08.4", "Checkpoint: Ship, Revise, or Revert", "checkpoint", "15 minutes", "Verified change dossier"),
      ],
    ),
    chapter(
      "09",
      "Project Instructions and Agent Skills",
      "project-instructions-agent-skills",
      "Repeated agent work becomes inconsistent when project rules and reusable procedures live only in someone's memory or chat history.",
      "How do project instructions and Agent Skills make repeatable workflows explicit without hiding authority from the human reviewer?",
      "Reusable project skill",
      ["AGENTS.md", "Agent Skills", "SKILL.md"],
      [
        section("09.0", "Chapter Overview", "overview", "15 minutes"),
        section("09.1", "Project Instructions as Repository Context", "section", "25 minutes"),
        section("09.2", "Agent Skills and Progressive Disclosure", "section", "25 minutes"),
        section("09.3", "Build Task: Create a Small Project Skill", "artifact", "40 minutes", "Reusable project skill"),
        section("09.4", "Checkpoint: Instruction or Skill?", "checkpoint", "15 minutes", "Skill decision record"),
      ],
    ),
    chapter(
      "10",
      "MCP and External Tool Trust",
      "mcp-external-tool-trust",
      "Connecting an agent to an external tool expands the action surface beyond the local repository and can introduce new data, authorization, and destructive-operation risks.",
      "What must you verify before an agent is allowed to use an MCP-connected external capability?",
      "MCP trust-boundary review",
      ["MCP", "authorization", "external tools"],
      [
        section("10.0", "Chapter Overview", "overview", "15 minutes"),
        section("10.1", "MCP Clients, Servers, Tools, and Data", "section", "25 minutes"),
        section("10.2", "Authorization, Secrets, and Destructive Operations", "safety", "25 minutes"),
        section("10.3", "Lab: Audit an MCP Tool Boundary", "workshop", "35 minutes", "MCP trust review"),
        section("10.4", "Checkpoint: Should This Tool Be Connected?", "checkpoint", "15 minutes", "MCP trust-boundary review"),
      ],
    ),
    chapter(
      "11",
      "Capstone: Reviewed Agent-Assisted Build",
      "capstone-reviewed-agent-assisted-build",
      "A working app is not enough evidence that an agent-assisted build was scoped, controlled, tested, understood, and reviewed responsibly.",
      "Can you build a useful teacher tool and prove how the work was bounded, changed, verified, and approved?",
      "Teacher tool plus evidence dossier",
      ["capstone", "review", "evidence", "release decision"],
      [
        section("11.0", "Chapter Overview", "overview", "15 minutes"),
        section("11.1", "Choose a Small Teacher Problem and Define Acceptance Criteria", "section", "25 minutes"),
        section("11.2", "Build the Evidence Dossier", "section", "25 minutes"),
        section("11.3", "Studio: Build, Inspect, Verify, and Revise", "studio", "75 minutes", "Agent-assisted teacher tool"),
        section("11.4", "Final Review: Defend the Build", "checkpoint", "30 minutes", "Teacher tool plus evidence dossier"),
      ],
    ),
  ],
};

export function getOts320Chapter(chapterSlug: string): CourseChapter | undefined {
  return OTS320_COURSE.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getAllOts320SectionRecords() {
  let index = 0;
  return OTS320_COURSE.chapters.flatMap((chapter) =>
    chapter.sections.map((courseSection) => {
      const sectionSlug = courseSection.number.replace(".", "-");
      return {
        course: OTS320_COURSE,
        chapter,
        section: courseSection,
        sectionSlug,
        href: `/book/ots-320/${chapter.slug}/${sectionSlug}`,
        index: index++,
      };
    }),
  );
}

export function getOts320SectionRecord(chapterSlug: string, sectionSlug: string) {
  return getAllOts320SectionRecords().find(
    (record) =>
      record.chapter.slug === chapterSlug && record.sectionSlug === sectionSlug,
  );
}
