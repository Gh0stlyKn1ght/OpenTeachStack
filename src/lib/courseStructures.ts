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
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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

export function getCourseChapter(courseSlug: string, chapterSlug: string) {
  const course = getCourseStructure(courseSlug);
  const chapter = course?.chapters.find((item) => item.slug === chapterSlug);

  return course && chapter ? { course, chapter } : undefined;
}
