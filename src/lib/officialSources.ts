export interface OfficialSource {
  label: string;
  url: string;
  use: string;
}

export interface CourseSourceGroup {
  course: string;
  title: string;
  sources: OfficialSource[];
}

export interface AppSource {
  name: string;
  category: string;
  appUrl: string;
  documentationUrl: string;
  documentationLabel: string;
  course: string;
  use: string;
  icon: string;
  color: string;
  mark?: "github";
}

export const officialDocSources: CourseSourceGroup[] = [
  {
    course: "OTS-101",
    title: "Teaching Teachers Foundations",
    sources: [
      {
        label: "OpenAI Prompt Engineering Guide",
        url: "https://developers.openai.com/api/docs/guides/prompt-engineering",
        use: "Prompting, verification, and AI workflow references.",
      },
      {
        label: "Anthropic Prompt Engineering Overview",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        use: "Prompt structure and Claude-specific prompting references.",
      },
      {
        label: "Google AI Studio Quickstart",
        url: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart",
        use: "Official Google source for AI Studio prompt testing, run settings, safety settings, and code export workflows.",
      },
      {
        label: "Gemini Prompt Design Strategies",
        url: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        use: "Google prompt design guidance for Gemini models.",
      },
      {
        label: "Google Workspace for Developers",
        url: "https://developers.google.com/workspace",
        use: "Official source for Workspace app capabilities and documentation paths.",
      },
      {
        label: "Creative Commons Licenses",
        url: "https://creativecommons.org/cc-licenses/",
        use: "Licensing and attribution reference for open-resource work.",
      },
      {
        label: "Next Generation Science Standards",
        url: "https://www.nextgenscience.org/",
        use: "Official NGSS standards and assessment-design references.",
      },
    ],
  },
  {
    course: "OTS-201",
    title: "Google Workspace Systems for Teachers",
    sources: [
      {
        label: "Google Workspace for Developers",
        url: "https://developers.google.com/workspace",
        use: "Docs, Drive, Forms, Sheets, Slides, Calendar, Classroom, and related APIs.",
      },
      {
        label: "Google Drive API Documentation",
        url: "https://developers.google.com/workspace/drive/api/guides/about-sdk",
        use: "Drive organization, permissions, shared drives, and file-management references.",
      },
      {
        label: "Google Docs API Documentation",
        url: "https://developers.google.com/workspace/docs/api/how-tos/overview",
        use: "Document structure, generated lesson docs, and template workflows.",
      },
      {
        label: "Google Sheets API Documentation",
        url: "https://developers.google.com/workspace/sheets/api/guides/concepts",
        use: "Spreadsheet structure, data, and command-center references.",
      },
      {
        label: "Google Forms API Documentation",
        url: "https://developers.google.com/workspace/forms/api/guides",
        use: "Forms, quizzes, response collection, and grading workflows.",
      },
      {
        label: "Google Slides API Documentation",
        url: "https://developers.google.com/workspace/slides/api/guides/overview",
        use: "Slide-deck generation, presentation structure, and visual delivery references.",
      },
      {
        label: "Google Classroom Documentation",
        url: "https://developers.google.com/workspace/classroom",
        use: "Classroom coursework, roster, assignment, and delivery-system references.",
      },
    ],
  },
  {
    course: "OTS-220",
    title: "Apps Script for Teacher Automation",
    sources: [
      {
        label: "Google Apps Script Documentation",
        url: "https://developers.google.com/apps-script",
        use: "Primary source for Apps Script guides, reference, samples, and support.",
      },
      {
        label: "Apps Script Samples",
        url: "https://developers.google.com/apps-script/samples",
        use: "Official sample projects and starter patterns.",
      },
      {
        label: "Apps Script Reference",
        url: "https://developers.google.com/apps-script/reference",
        use: "Class and service reference for scripts.",
      },
    ],
  },
  {
    course: "OTS-240",
    title: "Open Resources & GitHub for Educators",
    sources: [
      {
        label: "GitHub Docs",
        url: "https://docs.github.com/en",
        use: "Repositories, commits, branches, issues, pull requests, and account workflows.",
      },
      {
        label: "GitHub Pages Documentation",
        url: "https://docs.github.com/en/pages",
        use: "Static publishing, Pages setup, HTTPS, and custom-domain guidance.",
      },
      {
        label: "GitHub Markdown Syntax",
        url: "https://docs.github.com/en/get-started/writing-on-github",
        use: "Markdown writing, READMEs, issues, pull requests, and repository docs.",
      },
      {
        label: "Creative Commons Licenses",
        url: "https://creativecommons.org/cc-licenses/",
        use: "Open licensing and attribution decisions.",
      },
    ],
  },
  {
    course: "OTS-260",
    title: "AI Media & Lesson Delivery",
    sources: [
      {
        label: "OpenAI Images and Vision Guide",
        url: "https://developers.openai.com/api/docs/guides/images-vision",
        use: "Image generation and image-understanding reference.",
      },
      {
        label: "OBS Knowledge Base",
        url: "https://obsproject.com/kb/",
        use: "Screen recording, scenes, sources, audio, and troubleshooting.",
      },
      {
        label: "Canva Help Center",
        url: "https://www.canva.com/help/",
        use: "Canva feature and export guidance; verify current terms in Canva itself.",
      },
      {
        label: "YouTube Help",
        url: "https://support.google.com/youtube/",
        use: "Publishing, captions, privacy, classroom video delivery, and account guidance.",
      },
      {
        label: "Unsplash License Help",
        url: "https://help.unsplash.com/en/collections/1463188-unsplash-license",
        use: "Photo license and attribution questions.",
      },
    ],
  },
  {
    course: "OTS-280",
    title: "Cyber Safety for Educators",
    sources: [
      {
        label: "FTC Phishing Guidance",
        url: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams",
        use: "Recognizing phishing, protecting accounts, responding to suspicious messages, and reporting scams.",
      },
      {
        label: "NIST Small Business Cybersecurity Corner",
        url: "https://www.nist.gov/itl/smallbusinesscyber",
        use: "Plain-language cybersecurity planning references that transfer well to teacher and small-program workflows.",
      },
      {
        label: "NIST Digital Identity Guidelines",
        url: "https://pages.nist.gov/800-63-4/sp800-63b.html",
        use: "Authenticator, password, MFA, and account-security reference for deeper course notes.",
      },
      {
        label: "GitHub Secret Scanning Documentation",
        url: "https://docs.github.com/en/code-security/how-tos/secure-your-secrets",
        use: "Secret exposure and public repository safety checks for teachers using GitHub.",
      },
    ],
  },
  {
    course: "OTS-301",
    title: "Teacher Course Sites",
    sources: [
      {
        label: "MDN Web Docs",
        url: "https://developer.mozilla.org/en-US/docs/Web",
        use: "HTML, CSS, JavaScript, accessibility, and web-platform reference.",
      },
      {
        label: "CommonMark Markdown Reference",
        url: "https://commonmark.org/help/",
        use: "Plain Markdown syntax for lessons, READMEs, prompts, and course docs.",
      },
      {
        label: "Mermaid Documentation",
        url: "https://mermaid.js.org/intro/",
        use: "Diagram syntax and rendering reference for MDX course diagrams.",
      },
      {
        label: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        use: "Next.js App Router, routing, rendering, deployment, and framework behavior.",
      },
      {
        label: "Docusaurus Documentation",
        url: "https://docusaurus.io/docs",
        use: "Documentation-site setup, Markdown/MDX, versioning, and deployment.",
      },
      {
        label: "Cloudflare Pages Documentation",
        url: "https://developers.cloudflare.com/pages/",
        use: "Static hosting, Git integration, custom domains, redirects, and deployment.",
      },
      {
        label: "Vercel Documentation",
        url: "https://vercel.com/docs",
        use: "Deployment, supported frameworks, domains, builds, previews, and platform behavior.",
      },
    ],
  },
  {
    course: "OTS-320",
    title: "AI Coding Agents for Educators",
    sources: [
      {
        label: "OpenAI Codex Documentation",
        url: "https://developers.openai.com/codex",
        use: "Codex app, CLI, IDE, agent workflows, configuration, and safety references.",
      },
      {
        label: "Claude Code Documentation",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        use: "Claude Code setup, workflows, and terminal-agent usage.",
      },
      {
        label: "VS Code Documentation",
        url: "https://code.visualstudio.com/docs",
        use: "Editor setup, extensions, source control, terminal, and accessibility references.",
      },
      {
        label: "GitHub Docs",
        url: "https://docs.github.com/en",
        use: "Branches, commits, pull requests, and review workflows used to protect authored content.",
      },
    ],
  },
  {
    course: "OTS-399",
    title: "Capstone Studio",
    sources: [
      {
        label: "Teaching Teachers Pathway Sources",
        url: "/resources",
        use: "Use the official docs from each completed pathway course; do not rely on AI output as a source.",
      },
    ],
  },
];

export const appSources: AppSource[] = [
  {
    name: "Google Drive",
    category: "File System",
    appUrl: "https://drive.google.com",
    documentationUrl: "https://developers.google.com/workspace/drive/api/guides/about-sdk",
    documentationLabel: "Drive API docs",
    course: "OTS-201",
    use: "File organization, folder architecture, permissions, shared drives, and resource storage.",
    icon: "D",
    color: "#4285F4",
  },
  {
    name: "Google Docs",
    category: "Writing",
    appUrl: "https://docs.google.com/document",
    documentationUrl: "https://developers.google.com/workspace/docs/api/how-tos/overview",
    documentationLabel: "Docs API docs",
    course: "OTS-201",
    use: "Lesson documents, templates, generated handouts, and curriculum drafting.",
    icon: "Doc",
    color: "#4285F4",
  },
  {
    name: "Google Sheets",
    category: "Data",
    appUrl: "https://sheets.google.com",
    documentationUrl: "https://developers.google.com/workspace/sheets/api/guides/concepts",
    documentationLabel: "Sheets API docs",
    course: "OTS-201",
    use: "Command centers, resource trackers, standards maps, rubrics, and automation data.",
    icon: "+",
    color: "#0F9D58",
  },
  {
    name: "Google Forms",
    category: "Assessment",
    appUrl: "https://forms.google.com",
    documentationUrl: "https://developers.google.com/workspace/forms/api/guides",
    documentationLabel: "Forms API docs",
    course: "OTS-201",
    use: "Quizzes, exit tickets, feedback forms, surveys, and response workflows.",
    icon: "F",
    color: "#673AB7",
  },
  {
    name: "Google Slides",
    category: "Presentation",
    appUrl: "https://slides.google.com",
    documentationUrl: "https://developers.google.com/workspace/slides/api/guides/overview",
    documentationLabel: "Slides API docs",
    course: "OTS-201",
    use: "Delivery decks, generated slide structures, and visual lesson materials.",
    icon: "S",
    color: "#F4B400",
  },
  {
    name: "Google Classroom",
    category: "Delivery",
    appUrl: "https://classroom.google.com",
    documentationUrl: "https://developers.google.com/workspace/classroom",
    documentationLabel: "Classroom docs",
    course: "OTS-201",
    use: "Course delivery, assignments, rosters, and student-facing workflow references.",
    icon: "GC",
    color: "#1A73E8",
  },
  {
    name: "Google AI Studio",
    category: "AI Lab",
    appUrl: "https://aistudio.google.com",
    documentationUrl: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart",
    documentationLabel: "AI Studio quickstart",
    course: "OTS-101",
    use: "Prompt testing, model settings, safety settings, and Gemini workflow exploration.",
    icon: "AI",
    color: "#8E75B2",
  },
  {
    name: "Apps Script",
    category: "Automation",
    appUrl: "https://script.google.com",
    documentationUrl: "https://developers.google.com/apps-script",
    documentationLabel: "Apps Script docs",
    course: "OTS-220",
    use: "Workspace automation, custom menus, generated docs, quiz builders, and triggers.",
    icon: "{}",
    color: "#0F9D58",
  },
  {
    name: "ChatGPT",
    category: "AI Assistant",
    appUrl: "https://chatgpt.com",
    documentationUrl: "https://help.openai.com/en/collections/3742473-chatgpt",
    documentationLabel: "ChatGPT Help Center",
    course: "OTS-101",
    use: "Prompt drafting, lesson generation, verification support, and teacher workflow experiments.",
    icon: "O",
    color: "#10A37F",
  },
  {
    name: "Claude",
    category: "AI Assistant",
    appUrl: "https://claude.ai",
    documentationUrl: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
    documentationLabel: "Claude prompt docs",
    course: "OTS-101",
    use: "Long-form drafting, prompt iteration, rubrics, revision, and source-aware curriculum writing.",
    icon: "C",
    color: "#bb9af7",
  },
  {
    name: "GitHub",
    category: "Version Control",
    appUrl: "https://github.com",
    documentationUrl: "https://docs.github.com/en",
    documentationLabel: "GitHub Docs",
    course: "OTS-240",
    use: "Repositories, commits, pull requests, issues, open-source publishing, and course backup.",
    icon: "",
    color: "#181717",
    mark: "github",
  },
  {
    name: "VS Code",
    category: "Editor",
    appUrl: "https://code.visualstudio.com",
    documentationUrl: "https://code.visualstudio.com/docs",
    documentationLabel: "VS Code docs",
    course: "OTS-320",
    use: "Editing course files, terminal workflows, extensions, source control, and AI-agent review.",
    icon: "<>",
    color: "#007ACC",
  },
  {
    name: "Markdown",
    category: "Content",
    appUrl: "https://commonmark.org",
    documentationUrl: "https://commonmark.org/help/",
    documentationLabel: "CommonMark help",
    course: "OTS-301",
    use: "Plain-text lesson writing, READMEs, prompts, tables, lists, and durable curriculum docs.",
    icon: "M",
    color: "#34548a",
  },
  {
    name: "Mermaid",
    category: "Diagrams",
    appUrl: "https://mermaid.js.org",
    documentationUrl: "https://mermaid.js.org/intro/",
    documentationLabel: "Mermaid docs",
    course: "OTS-301",
    use: "Flowcharts, system diagrams, sequence diagrams, and source-controlled visuals.",
    icon: "M",
    color: "#f7768e",
  },
  {
    name: "Canva",
    category: "Design",
    appUrl: "https://www.canva.com",
    documentationUrl: "https://www.canva.com/help/",
    documentationLabel: "Canva Help Center",
    course: "OTS-260",
    use: "Slide visuals, classroom graphics, exports, brand kits, and media workflow references.",
    icon: "C",
    color: "#00C4CC",
  },
  {
    name: "YouTube",
    category: "Video Source",
    appUrl: "https://www.youtube.com",
    documentationUrl: "https://support.google.com/youtube/",
    documentationLabel: "YouTube Help",
    course: "OTS-260",
    use: "Video publishing, privacy, captions, playlists, embedding, and lesson delivery references.",
    icon: "YT",
    color: "#FF0000",
  },
  {
    name: "OBS Studio",
    category: "Recording",
    appUrl: "https://obsproject.com",
    documentationUrl: "https://obsproject.com/kb/",
    documentationLabel: "OBS Knowledge Base",
    course: "OTS-260",
    use: "Screen recording, scenes, sources, microphone setup, and classroom video production.",
    icon: "O",
    color: "#302E31",
  },
  {
    name: "MDN Web Docs",
    category: "Web Reference",
    appUrl: "https://developer.mozilla.org",
    documentationUrl: "https://developer.mozilla.org/en-US/docs/Web",
    documentationLabel: "MDN Web docs",
    course: "OTS-301",
    use: "HTML, CSS, JavaScript, web APIs, accessibility, and web literacy references.",
    icon: "MDN",
    color: "#0f0f14",
  },
  {
    name: "Next.js",
    category: "Course Sites",
    appUrl: "https://nextjs.org",
    documentationUrl: "https://nextjs.org/docs",
    documentationLabel: "Next.js docs",
    course: "OTS-301",
    use: "App Router course sites, MDX publishing, routing, rendering, and deployment behavior.",
    icon: "N",
    color: "#0f0f14",
  },
  {
    name: "Vercel",
    category: "Publishing",
    appUrl: "https://vercel.com",
    documentationUrl: "https://vercel.com/docs",
    documentationLabel: "Vercel docs",
    course: "OTS-301",
    use: "Deployments, previews, domains, build settings, and site publishing operations.",
    icon: "V",
    color: "#0f0f14",
  },
];

