export type CourseSectionType =
  | "overview"
  | "section"
  | "workshop"
  | "artifact"
  | "checkpoint"
  | "studio";

export interface CourseSection {
  number: string;
  title: string;
  type: CourseSectionType;
  duration: string;
  artifact?: string;
}

export interface CourseChapter {
  number: string;
  title: string;
  slug: string;
  problem: string;
  essentialQuestion: string;
  buildArtifact: string;
  skills: string[];
  sections: CourseSection[];
}

export interface CourseStructure {
  code: string;
  slug: string;
  title: string;
  level: string;
  status: string;
  coursePath: string;
  prerequisite: string;
  thesis: string;
  finalArtifact: string;
  chapters: CourseChapter[];
}

export interface CourseSectionRecord {
  course: CourseStructure;
  chapter: CourseChapter;
  section: CourseSection;
  sectionSlug: string;
  href: string;
  index: number;
}

export interface CourseSectionContent {
  coreIdea: string[];
  doThis: string[];
  evidence: string[];
  verification: string[];
  reflection?: string;
}

interface CourseChapterContentGuide {
  coreFocus: string;
  sectionFrame: string;
  doThis: string[];
  evidence: string[];
  verification: string[];
  artifactAction: string;
  checkpointAction: string;
  reflection: string;
}

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

export const COURSE_STRUCTURES: CourseStructure[] = [
  {
    code: "OTS-201",
    slug: "ots-201",
    title: "Google Workspace Systems for Teachers",
    level: "Beginner/Intermediate",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-101 or equivalent planning workflow",
    thesis:
      "Turn Drive, Docs, Sheets, Forms, Slides, and Calendar into a teacher-owned operating system before adding automation.",
    finalArtifact: "Google Workspace command center",
    chapters: [
      chapter("01", "Workspace System Mindset", "workspace-system-mindset", "Google tools become chaotic when every file is treated as separate.", "What makes familiar Google tools behave like one curriculum system?", "Workspace workflow audit", ["workflow design", "documentation"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Tool Collection vs Workspace System"),
        section("01.2", "Teacher Workflows Google Can Support"),
        section("01.3", "Naming, Ownership, and Maintenance"),
        section("01.4", "Build Task: Workspace Workflow Audit", "artifact", "35 minutes", "Workspace workflow audit"),
        section("01.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "Drive Architecture", "drive-architecture", "Drive folders collapse when units, years, drafts, and shared files are not intentionally separated.", "How should a teacher design Drive so curriculum can be found and reused?", "Drive architecture map", ["file systems", "organization"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Folders by Course, Unit, and Year"),
        section("02.2", "Shared Drives and Permissions"),
        section("02.3", "Archive and Version Patterns"),
        section("02.4", "Build Task: Drive Architecture Map", "artifact", "40 minutes", "Drive architecture map"),
        section("02.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Docs and Slides as Reusable Delivery Systems", "docs-slides-delivery", "Teachers lose time rebuilding directions and slides that should be reusable.", "How can Docs and Slides become reusable delivery materials?", "Reusable Docs/Slides template set", ["template design", "delivery planning"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Docs as Directions and Lesson Templates"),
        section("03.2", "Slides as Delivery Structure"),
        section("03.3", "Accessibility and Student-Facing Language"),
        section("03.4", "Build Task: Reusable Delivery Template", "artifact", "40 minutes", "Reusable delivery template"),
        section("03.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Sheets as Curriculum Trackers", "sheets-curriculum-trackers", "Curriculum decisions get lost when planning data lives only in documents.", "How can Sheets track standards, lessons, resources, and assessments?", "Curriculum tracker sheet", ["data organization", "tracking"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Rows, Columns, and Teacher Decisions"),
        section("04.2", "Tracking Standards and Lessons"),
        section("04.3", "Tracking Resources and Assessment Evidence"),
        section("04.4", "Build Task: Curriculum Tracker", "artifact", "45 minutes", "Curriculum tracker sheet"),
        section("04.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Forms and Calendar for Classroom Operations", "forms-calendar-operations", "Checks, signups, deadlines, and routines become scattered across announcements and memory.", "How can Forms and Calendar support repeatable classroom operations?", "Operations workflow map", ["classroom operations", "feedback loops"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "Forms as Checks for Understanding"),
        section("05.2", "Forms as Intake and Reflection"),
        section("05.3", "Calendar as Pacing and Maintenance"),
        section("05.4", "Build Task: Operations Workflow Map", "artifact", "35 minutes", "Operations workflow map"),
        section("05.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Workspace Command Center", "workspace-command-center", "A system is only useful if the teacher can operate it during real classroom pressure.", "Can you assemble Google Workspace into one usable command center?", "Workspace command center", ["systems thinking", "handoff documentation"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Command Center Requirements"),
        section("06.2", "Maintenance Checklist"),
        section("06.3", "Peer Review and Revision"),
        section("06.4", "Final Build: Workspace Command Center", "studio", "60 minutes", "Workspace command center"),
        section("06.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-220",
    slug: "ots-220",
    title: "Apps Script for Teacher Automation",
    level: "Intermediate",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "Comfort with Google Sheets and willingness to read small scripts",
    thesis:
      "Use Apps Script to automate repeated Google Workspace tasks while keeping scripts readable, reversible, and safe.",
    finalArtifact: "Teacher automation toolkit",
    chapters: [
      chapter("01", "Automation Mindset", "automation-mindset", "Teachers often automate before defining the workflow they are trying to improve.", "What tasks are safe and useful to automate?", "Automation candidate list", ["automation thinking", "workflow analysis"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Repeated Tasks vs Bad Processes"),
        section("01.2", "Safety Boundaries for Teacher Automation"),
        section("01.3", "Build Task: Automation Candidate List", "artifact", "35 minutes", "Automation candidate list"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "Apps Script Basics", "apps-script-basics", "Scripts feel intimidating when teachers do not understand where code lives or how it runs.", "How does Apps Script connect to Google Workspace?", "First script notes", ["scripting basics", "debugging"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Script Editor and Bound Scripts"),
        section("02.2", "Functions, Logs, and Errors"),
        section("02.3", "Permissions and Authorization"),
        section("02.4", "Workshop: First Custom Menu", "workshop", "45 minutes", "Custom menu script"),
        section("02.5", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Folder and File Generators", "folder-file-generators", "Creating repeated folders and files by hand wastes time and creates inconsistent structures.", "How can scripts create predictable curriculum folders and files?", "Folder generator", ["file automation", "template systems"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "DriveApp Concepts"),
        section("03.2", "Naming and Idempotency"),
        section("03.3", "Workshop: Generate Unit Folders", "workshop", "50 minutes", "Folder generator"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Docs from Sheet Rows", "docs-from-sheet-rows", "Teachers repeat document creation when rows of planning data could drive drafts.", "How can sheet rows become useful Docs?", "Doc generator", ["data-driven documents", "templating"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Sheet Data as Source"),
        section("04.2", "Document Templates and Placeholders"),
        section("04.3", "Workshop: Generate Docs from Rows", "workshop", "55 minutes", "Doc generator"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Forms, Email, and Reminders", "forms-email-reminders", "Automation can help communication, but careless emails and forms create privacy risks.", "How can teachers automate communication safely?", "Reminder workflow", ["communication automation", "privacy"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "Forms and Responses"),
        section("05.2", "Email Safety and Rate Limits"),
        section("05.3", "Workshop: Reminder Emails from Sheet Data", "workshop", "50 minutes", "Reminder email script"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Teacher Automation Toolkit", "teacher-automation-toolkit", "A useful automation toolkit needs documentation, checks, and safe rollback.", "Can you package automations another teacher could understand?", "Automation toolkit", ["documentation", "review habits"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Script Review Checklist"),
        section("06.2", "Documentation and Handoff"),
        section("06.3", "Final Build: Automation Toolkit", "studio", "60 minutes", "Automation toolkit"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-240",
    slug: "ots-240",
    title: "Open Resources and GitHub for Educators",
    level: "Intermediate",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-101 resource evaluation and licensing basics",
    thesis:
      "Help teachers publish, version, cite, remix, and contribute curriculum materials in the open without losing safety or ownership.",
    finalArtifact: "Open curriculum repository",
    chapters: [
      chapter("01", "Open Resource Mindset", "open-resource-mindset", "Teachers share resources constantly, but sharing without license and source clarity creates confusion.", "What makes a resource reusable and trustworthy?", "Open resource decision log", ["licensing", "source evaluation"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Free, Open, and Allowed"),
        section("01.2", "License and Terms Decisions"),
        section("01.3", "Build Task: Open Resource Decision Log", "artifact", "35 minutes", "Open resource decision log"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "GitHub Foundations for Teachers", "github-foundations", "GitHub looks like a coding tool, but teachers can use it for versioned curriculum.", "What does GitHub add to teacher-owned curriculum?", "Repository orientation notes", ["version control", "repository literacy"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Repos, Files, Commits, and Branches"),
        section("02.2", "README as Teacher Documentation"),
        section("02.3", "Workshop: Create a Curriculum Repo", "workshop", "45 minutes", "Curriculum repo"),
        section("02.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Writing Useful READMEs", "writing-readmes", "Curriculum repositories fail when users cannot understand what the material is or how to use it.", "How do you write documentation another teacher can trust?", "Course README", ["documentation", "audience awareness"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Purpose, Audience, and Scope"),
        section("03.2", "Setup, Use, and License Notes"),
        section("03.3", "Build Task: Course README", "artifact", "40 minutes", "Course README"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Contribution and Review Workflows", "contribution-review", "Open work needs review habits so improvements do not damage the curriculum.", "How can teachers accept changes safely?", "Contribution checklist", ["collaboration", "review"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Issues, Pull Requests, and Review"),
        section("04.2", "Contribution Guidelines"),
        section("04.3", "Workshop: Review a Small Change", "workshop", "40 minutes", "Review log"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Publishing and Attribution", "publishing-attribution", "A public resource must credit sources and explain what others can reuse.", "How do you publish open curriculum with attribution?", "Attribution and license file", ["attribution", "publishing"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "Source Notes and Attribution"),
        section("05.2", "Choosing a License"),
        section("05.3", "Build Task: Attribution and License File", "artifact", "35 minutes", "Attribution and license file"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Open Curriculum Repository", "open-curriculum-repository", "A finished open repo needs structure, docs, license, source notes, and contribution rules.", "Can you publish a maintainable open curriculum repo?", "Open curriculum repository", ["open publishing", "maintenance"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Repository Release Checklist"),
        section("06.2", "Maintenance Plan"),
        section("06.3", "Final Build: Open Curriculum Repository", "studio", "60 minutes", "Open curriculum repository"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-260",
    slug: "ots-260",
    title: "AI Media and Lesson Delivery",
    level: "Intermediate",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-101 delivery plan",
    thesis:
      "Use images, diagrams, slides, short video, and AI media workflows to improve lesson delivery while keeping accessibility and verification first.",
    finalArtifact: "Accessible lesson media packet",
    chapters: [
      chapter("01", "Media With Purpose", "media-with-purpose", "Decorative media can make lessons heavier without making them clearer.", "When does media actually help learning?", "Media purpose map", ["media literacy", "instructional design"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Media as Explanation, Not Decoration"),
        section("01.2", "Accessibility Before Polish"),
        section("01.3", "Build Task: Media Purpose Map", "artifact", "30 minutes", "Media purpose map"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "AI Image Workflows", "ai-image-workflows", "AI images can support curriculum, but they can also mislead, stereotype, or distract.", "How can teachers generate and verify useful visuals?", "Image prompt and review log", ["AI media", "visual verification"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Prompting for Curriculum Images"),
        section("02.2", "Bias, Accuracy, and Source Notes"),
        section("02.3", "Workshop: Generate and Review a Visual", "workshop", "45 minutes", "Image prompt and review log"),
        section("02.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Diagrams and Visual Explanations", "diagrams-visual-explanations", "Some ideas need structure, not stock imagery.", "How do diagrams make processes easier to teach?", "Diagram set", ["diagramming", "systems explanation"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Flowcharts, Timelines, and Systems Maps"),
        section("03.2", "Mermaid and Simple Diagram Tools"),
        section("03.3", "Build Task: Diagram Set", "artifact", "40 minutes", "Diagram set"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Slides and Delivery Routines", "slides-delivery-routines", "Slides fail when they become speaker notes instead of classroom flow.", "How can slides support timing, tasks, and feedback?", "Delivery deck", ["presentation design", "classroom flow"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Slide Roles in a Lesson"),
        section("04.2", "Student-Facing Directions"),
        section("04.3", "Workshop: Build a Delivery Deck", "workshop", "45 minutes", "Delivery deck"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Short Video and Screen Recording", "short-video-screen-recording", "Video can help absent or stuck students, but only when it is focused and accessible.", "How do teachers create useful short videos?", "Short video plan", ["video planning", "accessibility"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "When Video Helps"),
        section("05.2", "Scripts, Captions, and Transcripts"),
        section("05.3", "Build Task: Short Video Plan", "artifact", "35 minutes", "Short video plan"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Accessible Lesson Media Packet", "accessible-media-packet", "A media packet needs alt text, captions, source notes, and delivery context.", "Can you ship media that is useful and accessible?", "Accessible lesson media packet", ["accessibility", "media production"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Media Packet Checklist"),
        section("06.2", "Peer Review and Revision"),
        section("06.3", "Final Build: Accessible Media Packet", "studio", "60 minutes", "Accessible lesson media packet"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-301",
    slug: "ots-301",
    title: "Teacher Course Sites",
    level: "Advanced",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-101 plus comfort with files and web publishing concepts",
    thesis:
      "Design, publish, and maintain a teacher-owned course hub with domains, hosting, accessibility, and source hygiene.",
    finalArtifact: "Published course hub",
    chapters: [
      chapter("01", "Course Site Strategy", "course-site-strategy", "Teachers often jump into platforms before deciding what the site must do.", "What should a teacher-owned course site actually provide?", "Course site plan", ["web strategy", "information architecture"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Audience and Use Cases"),
        section("01.2", "Platform Choices"),
        section("01.3", "Build Task: Course Site Plan", "artifact", "35 minutes", "Course site plan"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "Web Basics for Teachers", "web-basics", "Publishing feels mysterious when domains, DNS, hosting, and static files blur together.", "What web concepts does a teacher need to publish safely?", "Web concepts map", ["web literacy", "publishing"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "HTML, CSS, and Static Sites"),
        section("02.2", "Domains, DNS, and Hosting"),
        section("02.3", "Build Task: Web Concepts Map", "artifact", "35 minutes", "Web concepts map"),
        section("02.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Course Hub Structure", "course-hub-structure", "A course site becomes hard to use when navigation, lessons, resources, and updates are not planned.", "How should a course hub be structured?", "Course hub sitemap", ["navigation design", "documentation"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Homepage, Course Pages, and Resource Pages"),
        section("03.2", "Source and Update Notes"),
        section("03.3", "Build Task: Course Hub Sitemap", "artifact", "40 minutes", "Course hub sitemap"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Accessibility and Safety", "accessibility-safety", "Public course sites need accessibility, privacy, and maintenance checks before sharing.", "What must be checked before a teacher site goes public?", "Publishing safety checklist", ["accessibility", "privacy"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Readable Pages and Links"),
        section("04.2", "Student Privacy and Public Files"),
        section("04.3", "Build Task: Publishing Safety Checklist", "artifact", "35 minutes", "Publishing safety checklist"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Deployment and Maintenance", "deployment-maintenance", "Launching is easier than maintaining; teachers need update routines.", "How do you deploy and maintain a course site responsibly?", "Maintenance plan", ["deployment", "maintenance"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "GitHub Pages, Vercel, and Static Hosting"),
        section("05.2", "Update Rhythm and Broken Link Checks"),
        section("05.3", "Build Task: Maintenance Plan", "artifact", "35 minutes", "Maintenance plan"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Published Course Hub", "published-course-hub", "A useful course hub must be small, navigable, accessible, and maintainable.", "Can you publish a course hub you can keep alive?", "Published course hub", ["web publishing", "release practice"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Release Checklist"),
        section("06.2", "Peer Review and Revision"),
        section("06.3", "Final Build: Published Course Hub", "studio", "60 minutes", "Published course hub"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-320",
    slug: "ots-320",
    title: "AI Coding Agents for Educators",
    level: "Advanced",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-240 or equivalent version-control basics",
    thesis:
      "Use AI coding agents to build and revise teacher-owned tools with prompts, diffs, tests, and review habits.",
    finalArtifact: "Reviewed agent-built classroom tool",
    chapters: [
      chapter("01", "Agent Safety Mindset", "agent-safety-mindset", "AI coding agents can change many files quickly, so teachers need review habits before speed.", "How do you keep control while using coding agents?", "Agent safety checklist", ["AI literacy", "code review"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "What Agents Can and Cannot Own"),
        section("01.2", "Prompt Boundaries and Scope"),
        section("01.3", "Build Task: Agent Safety Checklist", "artifact", "35 minutes", "Agent safety checklist"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "Repo and Branch Workflow", "repo-branch-workflow", "Agent work needs version control so changes can be inspected and reversed.", "How should teachers structure agent-assisted repo work?", "Branch workflow notes", ["version control", "workflow design"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Branches, Commits, and Diffs"),
        section("02.2", "Small Tasks and Checkpoints"),
        section("02.3", "Workshop: Review a Diff", "workshop", "40 minutes", "Diff review log"),
        section("02.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Prompting Coding Agents", "prompting-coding-agents", "Weak prompts create broad, risky changes that are hard to review.", "How do you direct an agent toward safe, scoped work?", "Safe agent prompt", ["prompting", "task design"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Context, Constraints, and Acceptance Criteria"),
        section("03.2", "Protecting Authored Content"),
        section("03.3", "Build Task: Safe Agent Prompt", "artifact", "35 minutes", "Safe agent prompt"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Testing and Verification", "testing-verification", "Generated code is not done until it is tested and inspected.", "How do teachers verify agent output?", "Test checklist", ["testing", "verification"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Lint, Build, and Route Checks"),
        section("04.2", "Manual QA and Accessibility Checks"),
        section("04.3", "Build Task: Test Checklist", "artifact", "35 minutes", "Test checklist"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Building Teacher Tools", "building-teacher-tools", "Teacher tools should solve small recurring problems instead of becoming giant apps.", "What makes an agent-built tool worth keeping?", "Small classroom tool", ["tool design", "iteration"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "Choosing the Right Tool Scope"),
        section("05.2", "Workshop: Build a Small Tool"),
        section("05.3", "Review and Revise the Tool", "workshop", "45 minutes", "Small classroom tool"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Reviewed Agent Build", "reviewed-agent-build", "A final agent build needs prompts, diffs, tests, and teacher approval evidence.", "Can you ship a small agent-assisted tool responsibly?", "Reviewed agent-built classroom tool", ["release practice", "review habits"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Prompt and Diff Portfolio"),
        section("06.2", "Testing Evidence"),
        section("06.3", "Final Build: Reviewed Agent Tool", "studio", "60 minutes", "Reviewed agent-built classroom tool"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
  {
    code: "OTS-399",
    slug: "ots-399",
    title: "Capstone Studio",
    level: "Advanced",
    status: "Draft outline",
    coursePath: "Modern Teacher Systems",
    prerequisite: "OTS-101 and at least two intermediate or advanced pathway courses",
    thesis:
      "Assemble the pathway into a publishable, maintainable curriculum system with evidence, automation, open resources, and delivery artifacts.",
    finalArtifact: "Published curriculum system",
    chapters: [
      chapter("01", "Capstone Scope", "capstone-scope", "Capstones fail when they try to prove every possible skill at once.", "What is the right-sized final curriculum system?", "Capstone proposal", ["project scoping", "planning"], [
        section("01.0", "Chapter Overview", "overview", "10 minutes"),
        section("01.1", "Choosing a Real Teaching Need"),
        section("01.2", "Pathway Evidence Requirements"),
        section("01.3", "Build Task: Capstone Proposal", "artifact", "40 minutes", "Capstone proposal"),
        section("01.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("02", "Curriculum System Assembly", "curriculum-system-assembly", "A final system must connect lessons, resources, assessment, delivery, and revision.", "How do you assemble the curriculum pieces into one system?", "System map", ["systems design", "curriculum architecture"], [
        section("02.0", "Chapter Overview", "overview", "10 minutes"),
        section("02.1", "Required Curriculum Components"),
        section("02.2", "Artifact Links and Handoff Notes"),
        section("02.3", "Build Task: System Map", "artifact", "40 minutes", "System map"),
        section("02.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("03", "Automation and Tool Evidence", "automation-tool-evidence", "Tools and automations need evidence that they help the course rather than distract from it.", "How do you document technical systems clearly?", "Technical evidence log", ["documentation", "automation review"], [
        section("03.0", "Chapter Overview", "overview", "10 minutes"),
        section("03.1", "Tool Purpose and Boundaries"),
        section("03.2", "Automation Evidence"),
        section("03.3", "Build Task: Technical Evidence Log", "artifact", "35 minutes", "Technical evidence log"),
        section("03.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("04", "Publishing and Safety Review", "publishing-safety-review", "Publishing multiplies the importance of source, privacy, accessibility, and maintenance checks.", "What must be true before the final system is shared?", "Release safety review", ["release review", "accessibility"], [
        section("04.0", "Chapter Overview", "overview", "10 minutes"),
        section("04.1", "Source and License Review"),
        section("04.2", "Privacy and Accessibility Review"),
        section("04.3", "Build Task: Release Safety Review", "artifact", "40 minutes", "Release safety review"),
        section("04.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("05", "Presentation and Peer Review", "presentation-peer-review", "A strong capstone should be explainable to other teachers.", "How do you present the system and use feedback?", "Presentation and peer review log", ["presentation", "feedback"], [
        section("05.0", "Chapter Overview", "overview", "10 minutes"),
        section("05.1", "Explaining the System"),
        section("05.2", "Peer Review Protocol"),
        section("05.3", "Build Task: Presentation and Review Log", "artifact", "40 minutes", "Presentation and peer review log"),
        section("05.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
      chapter("06", "Published Curriculum System", "published-curriculum-system", "The final artifact should be useful, maintainable, and backed by evidence.", "Can you publish a complete teacher-owned curriculum system?", "Published curriculum system", ["portfolio assembly", "release practice"], [
        section("06.0", "Chapter Overview", "overview", "10 minutes"),
        section("06.1", "Final Release Checklist"),
        section("06.2", "Maintenance and Revision Plan"),
        section("06.3", "Final Build: Published Curriculum System", "studio", "75 minutes", "Published curriculum system"),
        section("06.4", "Chapter Checkpoint", "checkpoint", "10 minutes"),
      ]),
    ],
  },
];

export function getCourseStructure(slug: string) {
  return COURSE_STRUCTURES.find((course) => course.slug === slug);
}

export function getChapterHref(course: CourseStructure, chapter: CourseChapter) {
  return `/book/${course.slug}/${chapter.slug}`;
}

export function getSectionSlug(section: CourseSection) {
  return section.number.replace(".", "-");
}

export function getSectionHref(
  course: CourseStructure,
  chapter: CourseChapter,
  section: CourseSection,
) {
  return `${getChapterHref(course, chapter)}/${getSectionSlug(section)}`;
}

export function getAllCourseSectionRecords(course: CourseStructure) {
  let index = 0;
  return course.chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      course,
      chapter,
      section,
      sectionSlug: getSectionSlug(section),
      href: getSectionHref(course, chapter, section),
      index: index++,
    })),
  );
}

export function getCourseSectionRecord(
  courseSlug: string,
  chapterSlug: string,
  sectionSlug: string,
): CourseSectionRecord | undefined {
  const course = getCourseStructure(courseSlug);
  if (!course) return undefined;

  return getAllCourseSectionRecords(course).find(
    (record) =>
      record.chapter.slug === chapterSlug && record.sectionSlug === sectionSlug,
  );
}

export function getAdjacentCourseSections(record: CourseSectionRecord) {
  const records = getAllCourseSectionRecords(record.course);

  return {
    previous: records[record.index - 1],
    next: records[record.index + 1],
  };
}

const COURSE_CHAPTER_CONTENT_GUIDES: Record<string, CourseChapterContentGuide> = {
  "ots-260/01-media-with-purpose": {
    coreFocus:
      "Media should earn its place in a lesson by reducing confusion, focusing attention, or giving students a better way to revisit the idea later.",
    sectionFrame:
      "Decide what the media is for before choosing a format: orient students, explain a process, compare examples, demonstrate a tool, or support review.",
    doThis: [
      "Choose one real lesson moment where students commonly need a clearer explanation or reference.",
      "Name the job the media must do and the learner action it should support.",
      "Reject at least one decorative or unnecessary media idea so the lesson stays lighter.",
      "Draft the first row of a media purpose map with purpose, audience, format, access need, and source note.",
    ],
    evidence: [
      "A media purpose map exists for one lesson moment.",
      "The media choice is tied to a learning purpose rather than style alone.",
      "The map names at least one accessibility or delivery constraint.",
      "The teacher has a revision note for removing or simplifying media that does not help.",
    ],
    verification: [
      "Confirm the media does not include student-identifiable information.",
      "Check that required information is still available as text, not only as an image or video.",
      "Make sure the media supports the lesson objective and does not add an unrelated task.",
      "Record how the media will be maintained if the lesson changes.",
    ],
    artifactAction:
      "Build the media purpose map for one lesson and mark which media item is essential, optional, or unnecessary.",
    checkpointAction:
      "Review the media purpose map and remove anything that decorates the lesson without clarifying it.",
    reflection:
      "What changed when you judged the media by student use instead of visual polish?",
  },
  "ots-260/02-ai-image-workflows": {
    coreFocus:
      "AI images can help teachers make consistent visual supports, but every generated image still needs teacher review for accuracy, bias, context, and classroom fit.",
    sectionFrame:
      "Use a repeatable prompt, review, and source-note workflow so generated visuals are treated as drafts rather than unquestioned lesson evidence.",
    doThis: [
      "Write a prompt that states the learning purpose, style, audience, aspect ratio, and exclusions.",
      "Generate or select one candidate visual, then inspect it for inaccurate details, stereotypes, text artifacts, and distracting elements.",
      "Write a source note that names the tool, purpose, date, and review decision.",
      "Decide whether the visual belongs in a slide, lesson page, handout, or teacher-only planning note.",
    ],
    evidence: [
      "An image prompt and review log exists.",
      "The log includes keep, revise, or discard decisions for the visual.",
      "The review checks bias, accuracy, classroom fit, and accessibility alternatives.",
      "The source note explains that the visual was generated or edited with AI when used.",
    ],
    verification: [
      "Do not use generated images as factual diagrams unless each factual detail is verified.",
      "Avoid generating real students, real staff, real incidents, or sensitive scenarios.",
      "Keep important instructional text outside the generated image.",
      "Check current platform terms before publishing or sharing beyond classroom use.",
    ],
    artifactAction:
      "Complete the image prompt and review log for one classroom visual, including a keep, revise, or discard decision.",
    checkpointAction:
      "Audit the visual for accuracy, bias, student privacy, text artifacts, and whether a text alternative is ready.",
    reflection:
      "What did the review process catch that the original prompt did not prevent?",
  },
  "ots-260/03-diagrams-visual-explanations": {
    coreFocus:
      "Some lesson ideas need structure more than atmosphere. Diagrams should show relationships, sequence, or decisions that students can follow and reuse.",
    sectionFrame:
      "Choose a diagram type that matches the thinking students need to do: flowchart, timeline, comparison map, system map, or labeled process.",
    doThis: [
      "Pick one confusing process, workflow, or concept from a lesson.",
      "Sketch the structure in words before choosing a visual tool.",
      "Build a simple diagram with only the labels students need to act.",
      "Write a short text explanation that gives the same essential information as the diagram.",
    ],
    evidence: [
      "A diagram set or draft diagram exists for one lesson concept.",
      "The diagram labels are concise and aligned to the lesson vocabulary.",
      "A text alternative or explanation is included.",
      "The diagram source or construction method is documented.",
    ],
    verification: [
      "Check every factual relationship against a trusted source or teacher-created answer key.",
      "Confirm arrows, ordering, and labels do not imply false relationships.",
      "Test that the diagram remains readable when projected and on a phone-sized screen.",
      "Avoid color-only meaning; use labels, shapes, or position as well.",
    ],
    artifactAction:
      "Create a diagram set for one lesson idea and include a text explanation for each required diagram.",
    checkpointAction:
      "Review the diagram for factual accuracy, label clarity, contrast, and mobile readability.",
    reflection:
      "Where did a diagram clarify something that a paragraph or decorative image would not?",
  },
  "ots-260/04-slides-delivery-routines": {
    coreFocus:
      "Slides work best as classroom signposts: they pace the lesson, clarify transitions, and keep student-facing directions visible.",
    sectionFrame:
      "Build the deck around teacher moves and student actions rather than turning slides into long speaker notes.",
    doThis: [
      "List the lesson transitions where students need visible directions or timing support.",
      "Assign each slide a role: launch, model, practice, pause, check, transition, or close.",
      "Draft student-facing directions in short, readable language.",
      "Add presenter notes only for teacher reminders that do not need to be on screen.",
    ],
    evidence: [
      "A delivery deck outline or deck draft exists.",
      "Slides have clear roles and readable student-facing directions.",
      "The deck avoids long paragraphs and tiny screenshots.",
      "The teacher has noted where checks for understanding happen.",
    ],
    verification: [
      "Project the deck or preview at classroom distance before use.",
      "Check that slide text is readable on a mobile device.",
      "Make sure color, layout, and image choices support accessibility.",
      "Confirm borrowed visuals have source notes and permitted use.",
    ],
    artifactAction:
      "Build or revise a delivery deck for one lesson using slide roles, student-facing directions, and teacher notes.",
    checkpointAction:
      "Run the deck through the projector/mobile readability pass and simplify any overloaded slide.",
    reflection:
      "Which slide made classroom flow easier instead of just making the lesson look more finished?",
  },
  "ots-260/05-short-video-screen-recording": {
    coreFocus:
      "Short video is useful when students need to replay a focused explanation, demonstration, or missed direction without waiting for the teacher.",
    sectionFrame:
      "Plan the recording before opening the tool: audience, one task, script beats, privacy cleanup, captions, transcript, and where the video will live.",
    doThis: [
      "Choose one video purpose: absent-student recap, tool demonstration, process walkthrough, or review explanation.",
      "Write a short script or beat list with a clear start, demonstration, and close.",
      "Clean the recording environment so no private tabs, student names, grades, messages, or files are visible.",
      "Plan captions, transcript, storage location, and fallback directions.",
    ],
    evidence: [
      "A short video or screen-recording plan exists.",
      "The plan includes script beats, recording setup, accessibility supports, and publishing location.",
      "Privacy cleanup steps are listed before recording.",
      "Students have a non-video fallback path for the same essential directions.",
    ],
    verification: [
      "Keep the recording focused enough to rewatch quickly.",
      "Verify captions or transcripts before assigning the video.",
      "Check audio clarity and screen readability.",
      "Confirm the platform privacy setting matches the intended audience.",
    ],
    artifactAction:
      "Create a short video plan that includes script beats, privacy cleanup, captions or transcript, and delivery location.",
    checkpointAction:
      "Review the plan for focus, privacy, accessibility, and whether students can complete the task without watching the video.",
    reflection:
      "What information belongs in the video, and what should stay as written directions?",
  },
  "ots-260/06-accessible-media-packet": {
    coreFocus:
      "A finished media packet is not a pile of assets. It is a small, maintainable set of visuals, slides, diagrams, videos, source notes, and alternatives that help a lesson run.",
    sectionFrame:
      "Assemble only the media that supports the lesson, then attach accessibility, source, privacy, and revision evidence before calling it ready.",
    doThis: [
      "Collect the purpose map, visual style guide, image review log, diagram set, delivery deck, and short video plan.",
      "Add alt text, captions, transcripts, source notes, and license or terms notes where needed.",
      "Run a privacy review for every example, screenshot, recording, and public asset.",
      "Ask a peer or future-you review question: what should be removed, clarified, or replaced before teaching?",
    ],
    evidence: [
      "An accessible lesson media packet exists for one lesson.",
      "Required media has alt text, captions, transcripts, or text alternatives.",
      "Borrowed or generated media has source notes.",
      "A revision note records what changed after review.",
    ],
    verification: [
      "Confirm no private student, staff, grade, message, file, or location information is exposed.",
      "Check all required media on projector and mobile views.",
      "Verify that sources, licenses, and platform terms are documented or queued.",
      "Make sure the packet can be reused or revised without rebuilding from scratch.",
    ],
    artifactAction:
      "Assemble the accessible lesson media packet and attach the accessibility checklist, source notes, and revision evidence.",
    checkpointAction:
      "Run the final packet through privacy, accessibility, readability, and source checks before teaching or publishing.",
    reflection:
      "What part of the packet would be easiest for another teacher to reuse, and what still needs clearer handoff notes?",
  },
  "ots-301/01-course-site-strategy": {
    coreFocus:
      "A teacher course site should solve a clear access problem before it becomes a publishing project. Start with audience, use cases, and the smallest hub that would actually help students, families, or colleagues.",
    sectionFrame:
      "Define what the site must help people find or do, then leave out anything that adds maintenance without improving course access.",
    doThis: [
      "Name the primary audience for the site: students, families, substitute teachers, colleagues, or public readers.",
      "List the top three actions that audience should be able to complete without asking you for a link.",
      "Decide what belongs on the public site and what must stay inside district-approved private systems.",
      "Draft the course site plan with purpose, audience, pages, update owner, privacy boundary, and launch condition.",
    ],
    evidence: [
      "A course site plan exists for one real course or unit.",
      "The plan names audience, use cases, public/private boundaries, and maintenance owner.",
      "The scope is small enough to launch and maintain.",
      "The plan rejects at least one page, embed, or feature that would create unnecessary risk.",
    ],
    verification: [
      "Do not plan to publish rosters, grades, student work, private schedules, or private document links.",
      "Use placeholder student examples unless policy and consent explicitly allow otherwise.",
      "Confirm the site has a clear reason to exist beyond replacing an LMS.",
      "Record what will be updated, archived, or removed at the end of the course.",
    ],
    artifactAction:
      "Build the course site plan and mark each proposed page as public, private, or not needed.",
    checkpointAction:
      "Review the plan for audience clarity, small scope, privacy boundaries, and future maintenance.",
    reflection:
      "What would a visitor need from this site in the first sixty seconds?",
  },
  "ots-301/02-web-basics": {
    coreFocus:
      "Teachers do not need to become web developers to publish responsibly, but they do need enough web literacy to understand files, links, domains, DNS, hosting, HTTPS, and static pages.",
    sectionFrame:
      "Use a simple concept map so publishing decisions are visible: content files become pages, hosting serves them, DNS points a name to them, and HTTPS protects the connection.",
    doThis: [
      "Map the difference between a page, file, folder, link, domain, DNS record, host, and deployment.",
      "Use reserved placeholder domains such as example.edu, example.org, or example.com when drafting examples.",
      "Identify which parts of the publishing stack the teacher controls and which parts belong to the host or registrar.",
      "Write one plain-language explanation of how a visitor reaches the course site.",
    ],
    evidence: [
      "A web concepts map exists.",
      "Domain and DNS examples use safe placeholder domains.",
      "The map distinguishes files, hosting, DNS, domain registration, and HTTPS.",
      "The teacher can explain what to check when a course site link fails.",
    ],
    verification: [
      "Do not use real school domains, student names, private URLs, or guessed DNS records in examples.",
      "Check current host and registrar documentation before giving step-by-step setup directions.",
      "Confirm HTTPS is part of the launch expectation.",
      "Record which account owns the domain and what renewal risk exists.",
    ],
    artifactAction:
      "Build the web concepts map using placeholder domains and plain-language definitions.",
    checkpointAction:
      "Audit the map for unsafe real-domain examples, missing HTTPS language, and unclear ownership notes.",
    reflection:
      "Which web concept most affects whether a teacher can maintain the site later?",
  },
  "ots-301/03-course-hub-structure": {
    coreFocus:
      "A course hub works when visitors can predict where things live. Navigation, source notes, update paths, and archive rules matter as much as the homepage.",
    sectionFrame:
      "Plan the hub as a small information architecture: homepage, course page, lessons, resources, source notes, updates, and archived material.",
    doThis: [
      "Draft a sitemap with only the pages required for one course or unit.",
      "Give each page a purpose, owner, update rhythm, and privacy status.",
      "Mark where source notes, licenses, downloads, and revision dates will appear.",
      "Decide what old material will be archived, redirected, or removed.",
    ],
    evidence: [
      "A course hub sitemap exists.",
      "Each page has a purpose, audience, source-note location, and update owner.",
      "Navigation is shallow enough for a visitor to scan quickly.",
      "The sitemap includes an archive or revision plan.",
    ],
    verification: [
      "Avoid linking to private Drive files, unpublished drafts, or permission-gated student materials.",
      "Check that every page title would make sense out of context.",
      "Confirm source and update notes are visible enough to maintain trust.",
      "Make sure the structure can survive a semester without constant rebuilding.",
    ],
    artifactAction:
      "Complete the course hub sitemap template and identify the first pages to build.",
    checkpointAction:
      "Review the sitemap for navigation depth, private-link risk, missing source notes, and unclear update paths.",
    reflection:
      "What page or link would become confusing first if no one updated this site for a month?",
  },
  "ots-301/04-accessibility-safety": {
    coreFocus:
      "Publishing course material makes accessibility and safety public obligations. Readability, links, embeds, files, privacy, and contact paths all need review before sharing.",
    sectionFrame:
      "Treat every public page as a release candidate: check what visitors can read, click, download, submit, and infer.",
    doThis: [
      "Run a page-by-page review for headings, link labels, keyboard access, contrast, mobile readability, and alternative text.",
      "Check every image, file, embed, form, analytics tool, and contact method for privacy risk.",
      "Replace real student examples with fictional or placeholder examples unless approved policy says otherwise.",
      "Write a publishing safety checklist that can be reused before future updates.",
    ],
    evidence: [
      "A publishing safety checklist exists.",
      "The checklist covers privacy, accessibility, embeds, public files, contact paths, and source notes.",
      "Unsafe examples are removed, replaced, or marked private.",
      "The review records at least one concrete revision.",
    ],
    verification: [
      "Do not expose student names, faces, locations, schedules, grades, messages, or private files.",
      "Check mobile and keyboard usability before launch.",
      "Verify that forms, analytics, comments, and embeds are intentional privacy decisions.",
      "Confirm that public downloads do not contain hidden private metadata.",
    ],
    artifactAction:
      "Create the publishing safety checklist and use it to review one course hub draft.",
    checkpointAction:
      "Run the privacy, accessibility, public-file, and embed review before any public launch.",
    reflection:
      "What would a cautious reviewer remove or make private before this site goes live?",
  },
  "ots-301/05-deployment-maintenance": {
    coreFocus:
      "A course site is not finished at launch. Deployment choices need ownership, rollback, broken-link checks, domain renewal notes, and a realistic update rhythm.",
    sectionFrame:
      "Choose a publishing path only after naming who owns the repo, host, domain, deployment settings, and maintenance calendar.",
    doThis: [
      "Compare the deployment responsibilities for GitHub Pages, Vercel, Cloudflare Pages, or the chosen host.",
      "Write down build command, output directory, domain owner, renewal date, HTTPS status, and rollback path.",
      "Schedule link checks and content review points for the course calendar.",
      "Create a maintenance plan that explains what happens when pages, sources, or assignments change.",
    ],
    evidence: [
      "A deployment and maintenance plan exists.",
      "The plan names hosting path, domain/DNS owner, HTTPS status, rollback path, and update rhythm.",
      "Broken-link checks are scheduled or queued.",
      "Official host documentation is attached or queued for setup behavior.",
    ],
    verification: [
      "Check official hosting docs before changing deployment settings.",
      "Use safe placeholder domains in examples and real domain details only in private operational notes.",
      "Confirm who receives renewal, billing, and security notifications.",
      "Record how to roll back or unpublish if something unsafe is found.",
    ],
    artifactAction:
      "Build the deployment and maintenance plan with hosting, domain, DNS, HTTPS, update, and rollback notes.",
    checkpointAction:
      "Review the plan for ownership gaps, missing renewal notes, missing HTTPS checks, and no rollback path.",
    reflection:
      "What maintenance task would fail first if the original builder was unavailable?",
  },
  "ots-301/06-published-course-hub": {
    coreFocus:
      "A publishable course hub is small, navigable, accessible, source-aware, and maintainable. The release evidence matters as much as the site itself.",
    sectionFrame:
      "Assemble the site plan, concept map, sitemap, safety checklist, deployment notes, and live or local verification before calling the hub ready.",
    doThis: [
      "Collect the course site plan, web concepts map, sitemap, publishing safety checklist, and maintenance plan.",
      "Verify the hub locally or live across homepage, course page, resource page, and update/source notes.",
      "Run privacy, accessibility, mobile, HTTPS, source-note, and broken-link checks.",
      "Write a release review note with what passed, what changed, and what remains queued.",
    ],
    evidence: [
      "A live or locally verified course hub exists.",
      "The release packet includes plan, sitemap, safety checklist, maintenance notes, and review evidence.",
      "Representative routes or pages return successfully.",
      "The hub has a release note and next maintenance date.",
    ],
    verification: [
      "Confirm no private or student-identifiable data is public.",
      "Check representative pages on desktop and mobile.",
      "Verify links, downloads, source notes, HTTPS, and navigation.",
      "Document any known limitation before sharing the hub.",
    ],
    artifactAction:
      "Assemble and verify the published course hub packet with release evidence and maintenance notes.",
    checkpointAction:
      "Run final live-site privacy, accessibility, source, link, HTTPS, and mobile checks.",
    reflection:
      "What evidence proves this course hub can be trusted and maintained after launch?",
  },
  "ots-320/01-agent-safety-mindset": {
    coreFocus:
      "AI coding agents are useful only when the teacher can define the work, protect private data, review the change, and stop before the task exceeds their ability to verify it.",
    sectionFrame:
      "Treat every agent task as a bounded classroom-tool experiment with a named purpose, fake data, review plan, and rollback path.",
    doThis: [
      "Choose one small teacher workflow that could benefit from code or site changes without touching student records.",
      "Write the safe boundary for the agent: allowed files, forbidden data, expected output, and stop conditions.",
      "Identify what the teacher must review personally before any generated work is kept.",
      "Draft the agent safety checklist with task scope, data rules, review owner, test plan, and rollback note.",
    ],
    evidence: [
      "An agent safety checklist exists for one realistic teacher task.",
      "The checklist states what data must not be shared with an agent.",
      "The task is small enough for the teacher to inspect and explain.",
      "A stop condition is written for risky areas such as authentication, permissions, grades, rosters, or private files.",
    ],
    verification: [
      "Use fake data while planning and testing.",
      "Do not paste student names, grades, IDs, emails, private messages, or hidden answer keys into an agent prompt.",
      "Keep the agent away from production systems until the teacher has reviewed the diff and tests.",
      "Stop and ask for expert help when a change affects access control, security, payment, student data, or district-managed systems.",
    ],
    artifactAction:
      "Build the agent safety checklist for one proposed classroom-tool task and mark the task as safe, needs support, or not appropriate for an agent.",
    checkpointAction:
      "Review the checklist and reject any task that depends on sensitive data, unreviewable code, or changes the teacher cannot roll back.",
    reflection:
      "What part of the proposed agent task still needs teacher judgment even if the agent writes useful code?",
  },
  "ots-320/02-repo-branch-workflow": {
    coreFocus:
      "Branches, copies, commits, and diffs protect teacher-authored content from accidental overwrite. The workflow matters more than the agent tool.",
    sectionFrame:
      "Use version-control habits to create a reviewable trail: start clean, isolate the change, inspect the diff, test the result, and keep or reject it deliberately.",
    doThis: [
      "Name the safe working copy, branch, or backup path before asking an agent to edit.",
      "Record the baseline: what files or routes should remain unchanged?",
      "After the agent works, inspect the diff for changed files, deleted content, generated filler, and unrelated edits.",
      "Write branch workflow notes that explain how the teacher would keep, revise, or discard the change.",
    ],
    evidence: [
      "Branch workflow notes or a copy workflow exists.",
      "A diff review log records changed files, accepted edits, rejected edits, and follow-up tests.",
      "The workflow separates authored content from agent-generated drafts.",
      "The teacher can explain how to return to the previous working version.",
    ],
    verification: [
      "Do not accept broad rewrites without reviewing file-by-file diffs.",
      "Check that the agent did not delete course content, source notes, templates, or accessibility text.",
      "Use commits, branches, or copies so mistakes can be reversed.",
      "Keep unrelated generated churn out of the final change.",
    ],
    artifactAction:
      "Complete the diff review log for one agent-generated change, including files changed, teacher decision, tests, and rollback note.",
    checkpointAction:
      "Review the branch workflow for clean starting state, narrow scope, readable diff, and a believable rollback path.",
    reflection:
      "Which part of the diff would you need to understand before trusting this change with your own course materials?",
  },
  "ots-320/03-prompting-coding-agents": {
    coreFocus:
      "A safe coding-agent prompt is a scoped work order. It tells the agent what to change, what to preserve, what evidence to produce, and when to stop.",
    sectionFrame:
      "Prompts should include task, context, allowed files, forbidden edits, fake-data rules, acceptance criteria, verification commands, and reporting expectations.",
    doThis: [
      "Pick a small classroom-tool task such as fixing copy, adding a checklist, creating a template, or improving one route.",
      "Write the agent prompt with explicit allowed files and forbidden areas.",
      "Add acceptance criteria that a teacher can check without trusting the agent's confidence.",
      "Require the agent to summarize changed files, tests run, skipped checks, and remaining risks.",
    ],
    evidence: [
      "A safe agent prompt exists.",
      "The prompt includes scope, constraints, fake-data rules, acceptance criteria, and verification commands.",
      "The prompt tells the agent to preserve authored course content and avoid unrelated refactors.",
      "The teacher can use the prompt again with a different small task.",
    ],
    verification: [
      "Do not ask an agent to make vague improvements across the whole repo.",
      "Name protected files or content areas when overwrites would be costly.",
      "Require visible evidence such as route probes, lint/build output, screenshots, or file references.",
      "Keep prompts free of student-identifiable information and private credentials.",
    ],
    artifactAction:
      "Draft the safe agent prompt for one classroom-tool improvement and include acceptance criteria plus verification commands.",
    checkpointAction:
      "Audit the prompt for vague scope, missing forbidden edits, missing fake-data instructions, and no proof requirement.",
    reflection:
      "What instruction would prevent the agent from making a technically successful but teacher-hostile change?",
  },
  "ots-320/04-testing-verification": {
    coreFocus:
      "Agent output is not done when the code compiles. Teachers need a verification routine that uses fake data, checks routes, reads the UI, and records what was tested.",
    sectionFrame:
      "Build a test checklist before using the generated tool: fake-data scenarios, expected behavior, edge cases, lint/build checks, route probes, and manual review.",
    doThis: [
      "Create a fake-data set that resembles the workflow without exposing real students, grades, emails, or private files.",
      "List the expected result for each test before running the tool.",
      "Run the smallest useful checks: lint, build, route probe, generated file inspection, or manual UI review.",
      "Write a verification note that distinguishes passed checks from skipped or queued checks.",
    ],
    evidence: [
      "A test checklist exists for the agent-built change.",
      "The checklist uses fake data and names expected outcomes.",
      "Automated and manual checks are recorded separately.",
      "Known risks or skipped checks are documented before classroom use.",
    ],
    verification: [
      "Never test with live student data just because fake data is inconvenient.",
      "Check error states, empty states, and accidental duplicate output.",
      "Confirm the tool does not save private data in the repo, browser console, logs, screenshots, or public files.",
      "Run lint/build or the project's equivalent checks before calling the change ready.",
    ],
    artifactAction:
      "Build the test checklist and run it against one agent-generated classroom-tool change using only fake data.",
    checkpointAction:
      "Review the verification note and block classroom use if privacy, data handling, route checks, or build checks are unresolved.",
    reflection:
      "Which test would catch the most harmful failure before a student or colleague sees the tool?",
  },
  "ots-320/05-building-teacher-tools": {
    coreFocus:
      "The best first agent-built teacher tool is small, local, reversible, and easy to inspect. It should solve one classroom workflow rather than become a platform.",
    sectionFrame:
      "Build a limited tool such as a checklist page, template generator, lesson formatter, rubric helper, or small Apps Script draft with fake inputs and clear handoff notes.",
    doThis: [
      "Choose one teacher-owned workflow and define the smallest tool that would improve it.",
      "Write the input, output, privacy boundary, and success criteria before asking an agent to build.",
      "Keep the tool self-contained so the teacher can inspect files, copy it, or remove it.",
      "Attach user-facing instructions, fake test examples, and a maintenance note.",
    ],
    evidence: [
      "A small classroom tool, script draft, or course-site improvement exists.",
      "The tool uses fake examples or teacher-created sample data.",
      "The build includes prompt evidence, changed files, test notes, and teacher approval.",
      "The tool solves one workflow without requiring a new account, hidden service, or private-data dependency.",
    ],
    verification: [
      "Check that examples do not resemble real student records.",
      "Read generated text and code for invented claims, unsafe collection, or brittle assumptions.",
      "Run representative tool paths with fake inputs.",
      "Confirm the teacher can remove, revise, or archive the tool without breaking the course.",
    ],
    artifactAction:
      "Build or specify the small classroom tool and attach fake-data examples, instructions, verification notes, and maintenance guidance.",
    checkpointAction:
      "Review the tool for scope creep, hidden data collection, missing instructions, weak tests, and unclear ownership.",
    reflection:
      "What did the tool make easier, and what should remain a teacher decision rather than an automated one?",
  },
  "ots-320/06-reviewed-agent-build": {
    coreFocus:
      "A reviewed agent build is a package of evidence, not just a working result. The teacher keeps the prompt, diff, tests, revisions, source notes, and approval decision together.",
    sectionFrame:
      "Assemble the final build as a release packet so another teacher can see what was requested, changed, tested, rejected, accepted, and still needs caution.",
    doThis: [
      "Collect the safety checklist, branch workflow notes, safe prompt, diff review log, fake-data tests, and tool instructions.",
      "Record what the agent changed and what the teacher changed after review.",
      "Attach official documentation references or queue any platform behavior that still needs confirmation.",
      "Write a final approval note that says ready, ready with limits, or not ready.",
    ],
    evidence: [
      "A reviewed agent-built classroom tool packet exists.",
      "The packet includes prompt, diff, test, revision, source, privacy, and approval evidence.",
      "Representative routes or tool paths have been checked.",
      "The final note states what the teacher trusts, what remains queued, and how to roll back.",
    ],
    verification: [
      "Do not publish or share the tool until privacy and safety checks are complete.",
      "Confirm all examples use fake or teacher-created data.",
      "Verify official docs for platform behavior, especially Codex, Claude Code, VS Code, GitHub, and Apps Script.",
      "Keep the final package small enough to review before reuse.",
    ],
    artifactAction:
      "Assemble the reviewed agent build packet and mark the final tool ready, ready with limits, or not ready.",
    checkpointAction:
      "Run the final packet through prompt, diff, fake-data, lint/build, route, source, privacy, and rollback checks.",
    reflection:
      "What evidence would convince a cautious colleague that this agent-built tool is safe enough to reuse?",
  },
  "ots-399/01-capstone-scope": {
    coreFocus:
      "The capstone starts by choosing a right-sized curriculum system that can be taught, reviewed, maintained, and explained without becoming a giant portfolio dump.",
    sectionFrame:
      "Define the teaching need, audience, scope, evidence requirements, privacy boundary, and release condition before assembling artifacts.",
    doThis: [
      "Choose one course, unit, mini-unit, site, automation workflow, or resource system that solves a real teaching need.",
      "Name the audience, classroom context, source requirements, publishing boundary, and maintenance owner.",
      "Decide what evidence must exist for the capstone to be reviewable.",
      "Draft the capstone proposal with scope, final artifact, included evidence, excluded work, and risk notes.",
    ],
    evidence: [
      "A capstone proposal exists.",
      "The proposal names purpose, audience, scope, deliverables, review evidence, and exclusions.",
      "The project is small enough to inspect and revise.",
      "Privacy, accessibility, source, and maintenance risks are named before build work begins.",
    ],
    verification: [
      "Do not include student-identifiable information, private school files, hidden answer keys, live credentials, or internal links.",
      "Reject project scope that cannot be reviewed within the capstone window.",
      "Confirm borrowed or generated materials will have source, license, prompt, verification, and revision notes.",
      "Record what will remain private even if the final system is published.",
    ],
    artifactAction:
      "Complete the capstone proposal and mark every planned artifact as required, optional, private, or excluded.",
    checkpointAction:
      "Review the proposal for oversized scope, missing evidence, unclear audience, and unresolved privacy boundaries.",
    reflection:
      "What is the smallest complete version of this capstone that would still help another teacher understand and trust the system?",
  },
  "ots-399/02-curriculum-system-assembly": {
    coreFocus:
      "A curriculum system is more than finished lessons. It connects sources, learning targets, lessons, assessments, delivery materials, templates, revision notes, and maintenance routines.",
    sectionFrame:
      "Assemble the system map so reviewers can see how each artifact supports the teaching need and where future updates belong.",
    doThis: [
      "List every artifact that belongs in the capstone system.",
      "Group artifacts by purpose: source, plan, teach, assess, automate, publish, review, archive, and improve.",
      "Create an artifact index with owner, status, route or file path, source note, privacy status, and review need.",
      "Draw or outline the curriculum system map showing how the artifacts fit together.",
    ],
    evidence: [
      "A curriculum system map exists.",
      "An artifact index lists the major files, pages, templates, tools, source notes, and review status.",
      "Each artifact has a purpose and a place in the system.",
      "The assembly avoids loose files that are not tied to the capstone purpose.",
    ],
    verification: [
      "Check that every public-facing artifact has a privacy status.",
      "Confirm source notes are attached or queued for borrowed materials.",
      "Remove duplicate, stale, or decorative artifacts that make the system harder to review.",
      "Make sure another teacher could find the teaching path without asking for hidden context.",
    ],
    artifactAction:
      "Build the curriculum system map and artifact index for the selected capstone system.",
    checkpointAction:
      "Review the map for missing source notes, orphaned artifacts, unclear routes, and private material in public locations.",
    reflection:
      "Which artifact most clearly shows that this is a system rather than a pile of course materials?",
  },
  "ots-399/03-automation-tool-evidence": {
    coreFocus:
      "Technical work counts only when the teacher can explain what the tool does, why it helps, what data it uses, how it was tested, and how it can be removed or revised.",
    sectionFrame:
      "Document tools, scripts, media workflows, repos, course sites, and agent-built changes as evidence with inputs, outputs, tests, privacy boundaries, and maintenance notes.",
    doThis: [
      "Identify every technical component in the capstone: automation, script, website, template, prompt, media workflow, repository, or agent-built tool.",
      "For each component, record purpose, input, output, owner, data type, verification command or review path, and rollback or maintenance note.",
      "Attach fake-data tests or route probes when a component handles generated output or user-facing pages.",
      "Mark any technical claim that still needs official documentation or expert review.",
    ],
    evidence: [
      "A technical evidence log exists.",
      "The log explains what each tool does and how it was verified.",
      "Fake-data or non-sensitive examples are used for testing.",
      "Known limitations and queued documentation checks are visible.",
    ],
    verification: [
      "Do not test with real student data, private credentials, rosters, grades, or private files.",
      "Confirm automations and agent-built changes are reviewable and reversible.",
      "Run project checks such as lint, build, route probes, or tool-specific tests when relevant.",
      "Document failures, skipped checks, and manual review needs before release.",
    ],
    artifactAction:
      "Complete the technical evidence log for every automation, tool, site, repo, prompt, or agent-assisted component in the capstone.",
    checkpointAction:
      "Review the log for missing fake-data tests, unexplained tools, private-data risk, unsupported claims, and no rollback plan.",
    reflection:
      "What technical evidence would let another teacher trust the tool without trusting the person who built it?",
  },
  "ots-399/04-publishing-safety-review": {
    coreFocus:
      "Publishing makes curriculum easier to share and easier to expose. The capstone needs a release safety review before any site, repository, download, or public packet is shared.",
    sectionFrame:
      "Check sources, licenses, privacy, accessibility, links, downloads, embeds, public repository files, and maintenance notes as one release gate.",
    doThis: [
      "List every public or shareable surface: routes, pages, repository files, downloads, forms, embeds, images, videos, and templates.",
      "Run privacy, accessibility, source, license, link, and download checks on each surface.",
      "Replace unsafe examples with fictional placeholders or keep them private.",
      "Write the release safety review with pass, revise, queue, or block decisions.",
    ],
    evidence: [
      "A publishing safety review exists.",
      "The review includes privacy, accessibility, source, license, public-link, and maintenance checks.",
      "Unsafe public material is removed, replaced, or marked private.",
      "Queued items are visible before release.",
    ],
    verification: [
      "Do not publish student names, faces, grades, locations, schedules, private messages, private Drive links, or hidden assessment material.",
      "Check headings, link labels, mobile readability, keyboard access, contrast, and text alternatives.",
      "Verify that source, license, and terms notes are attached or queued.",
      "Confirm downloads and repository files do not contain private metadata or credentials.",
    ],
    artifactAction:
      "Complete the release safety review and mark every public/shareable surface as pass, revise, queue, block, or private.",
    checkpointAction:
      "Block release if privacy, accessibility, source, license, link, or download checks remain unresolved.",
    reflection:
      "What would a cautious reviewer remove before this capstone became public?",
  },
  "ots-399/05-presentation-peer-review": {
    coreFocus:
      "The capstone presentation is a review routine. The teacher explains the system, shows evidence, receives critique, and records revisions before final release.",
    sectionFrame:
      "Present the teaching need, system map, artifact index, source trail, technical evidence, safety review, and maintenance plan in a way another educator can inspect.",
    doThis: [
      "Prepare a short walkthrough of the capstone purpose, audience, artifact path, and review evidence.",
      "Choose the exact artifacts or routes a peer should inspect.",
      "Use the peer review protocol to collect feedback on clarity, source trust, accessibility, privacy, usefulness, and maintenance.",
      "Write a revision log that separates accepted changes, rejected suggestions, and queued follow-up.",
    ],
    evidence: [
      "A presentation and peer review log exists.",
      "A peer or self-review protocol was used with specific review questions.",
      "Feedback led to at least one recorded revision or justified no-change decision.",
      "The presenter can explain how the system will be maintained after release.",
    ],
    verification: [
      "Do not reveal private examples while presenting the capstone.",
      "Show evidence paths rather than asking reviewers to trust summaries.",
      "Ask reviewers to check both teaching usefulness and safety concerns.",
      "Record unresolved critique before final release.",
    ],
    artifactAction:
      "Complete the presentation and peer review log with reviewer questions, findings, decisions, and revision notes.",
    checkpointAction:
      "Review whether the presentation proves usability, source trust, privacy, accessibility, and maintainability.",
    reflection:
      "Which peer review comment most improved the capstone before release?",
  },
  "ots-399/06-published-curriculum-system": {
    coreFocus:
      "A finished capstone is a release-ready curriculum system with a proposal, artifact index, system map, technical evidence, safety review, peer review, release checklist, and maintenance plan.",
    sectionFrame:
      "Assemble the final packet so the capstone can be taught, shared, archived, migrated, or improved without losing its evidence trail.",
    doThis: [
      "Collect the proposal, system map, artifact index, technical evidence log, safety review, peer review log, source notes, and maintenance plan.",
      "Run the final release checklist across routes, files, templates, sources, privacy, accessibility, technical evidence, and revision notes.",
      "Write a release note naming what is ready, what is private, what is queued, and what should be reviewed next.",
      "Store the final package where the course can migrate or be archived without hunting through global folders.",
    ],
    evidence: [
      "A published or release-ready curriculum system exists.",
      "The final packet includes proposal, artifact index, system map, technical evidence, safety review, peer review, release checklist, and maintenance plan.",
      "Representative routes, files, or tool paths have been checked.",
      "A full pathway traceability check shows which prior course artifacts support the capstone.",
    ],
    verification: [
      "Run lint, build, route probes, link checks, or equivalent project checks when relevant.",
      "Confirm all public artifacts passed privacy, accessibility, source, and license review.",
      "Check that course-owned folders contain the docs, templates, references, and artifacts needed for migration.",
      "Document known limitations instead of hiding them in the release note.",
    ],
    artifactAction:
      "Assemble the final capstone release packet and complete the final release checklist.",
    checkpointAction:
      "Run the final release gate and do not call the capstone complete until evidence, privacy, accessibility, source, route, and maintenance checks are visible.",
    reflection:
      "What proof shows this curriculum system can be trusted, reused, and maintained by someone other than the original builder?",
  },
};

export function getCourseSectionContent(
  record: CourseSectionRecord,
): CourseSectionContent {
  const guide =
    COURSE_CHAPTER_CONTENT_GUIDES[
      `${record.course.slug}/${record.chapter.slug}`
    ];

  if (guide) {
    const isArtifact =
      record.section.type === "artifact" || record.section.type === "studio";
    const isCheckpoint = record.section.type === "checkpoint";
    const leadAction = isArtifact
      ? guide.artifactAction
      : isCheckpoint
        ? guide.checkpointAction
        : `Focus on ${record.section.title}. ${guide.sectionFrame}`;

    return {
      coreIdea: [
        guide.coreFocus,
        `${record.section.title} is one part of ${record.chapter.title}. ${guide.sectionFrame}`,
      ],
      doThis: [leadAction, ...guide.doThis],
      evidence: guide.evidence,
      verification: guide.verification,
      reflection: guide.reflection,
    };
  }

  return {
    coreIdea: [
      `This section turns one part of ${record.chapter.title} into a concrete teacher workflow. The goal is to build one useful artifact, decision, or verification habit that supports the full course outcome.`,
      `For this section, focus on ${record.section.title} and connect it to a real classroom workflow or course system.`,
    ],
    doThis: [
      "Name the teacher problem this section helps you solve.",
      "Connect the idea to one real course, unit, tool, source, or workflow.",
      "Write down the decision you made and the evidence you used.",
      "Save the artifact or note where it can be reused in the final build.",
    ],
    evidence: [
      "A note, checklist, map, draft, or artifact exists.",
      "The work names at least one classroom constraint or source when relevant.",
      "Any AI-assisted output has been reviewed by the teacher before reuse.",
      "The result is small enough to revise after use.",
    ],
    verification: [
      "Do not include student-identifiable information.",
      "Check official documentation when software behavior matters.",
      "Separate teacher judgment from AI-generated draft language.",
      "Record one revision note before moving on.",
    ],
  };
}

export function getCourseChapter(courseSlug: string, chapterSlug: string) {
  const course = getCourseStructure(courseSlug);
  const chapter = course?.chapters.find((item) => item.slug === chapterSlug);

  return course && chapter ? { course, chapter } : undefined;
}
