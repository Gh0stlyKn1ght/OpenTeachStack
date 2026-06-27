export type SourceAudience =
  | "Students"
  | "Teachers"
  | "Schools"
  | "Advanced students";

export type SourceCost =
  | "Free"
  | "Freemium"
  | "Education verification"
  | "Free with account"
  | "Varies";

export type AccountRequirement = "Yes" | "No" | "Optional";

export type VerificationStatus =
  | "verified-active"
  | "verified-active-redirect"
  | "verified-js-app-not-404"
  | "verified-active-shell-not-404"
  | "verified-rate-limited-not-404"
  | "fetch-blocked-403-not-404"
  | "verified-retired-redirect"
  | "direct-unverified";

export type SourceCategory =
  | "Student Developer Tools"
  | "Teacher Training Platforms"
  | "Coding and Computer Science Curriculum"
  | "Cybersecurity Education"
  | "AI and Prompting Tools"
  | "Open Educational Resources"
  | "Web Development Resources"
  | "Data Science and Python"
  | "Robotics, Electronics, and STEM"
  | "Google Workspace and Productivity"
  | "Safety, Privacy, and Website Audit Resources"
  | "Retired or Replaced Resources";

export interface SourceBankResource {
  id: string;
  name: string;
  officialUrl: string;
  category: SourceCategory;
  audience: SourceAudience[];
  cost: SourceCost;
  accountRequired: AccountRequirement;
  bestUse: string;
  teacherSetupNote: string;
  privacyNote: string;
  verificationStatus: VerificationStatus;
  reviewedAt: string;
  tags: string[];
  note?: string;
}

export const sourceBankCategories: SourceCategory[] = [
  "Student Developer Tools",
  "Teacher Training Platforms",
  "Coding and Computer Science Curriculum",
  "Cybersecurity Education",
  "AI and Prompting Tools",
  "Open Educational Resources",
  "Web Development Resources",
  "Data Science and Python",
  "Robotics, Electronics, and STEM",
  "Google Workspace and Productivity",
  "Safety, Privacy, and Website Audit Resources",
  "Retired or Replaced Resources",
];

export const verificationLabels: Record<VerificationStatus, string> = {
  "verified-active": "Verified active",
  "verified-active-redirect": "Verified redirect",
  "verified-js-app-not-404": "JS app, not 404",
  "verified-active-shell-not-404": "App shell, not 404",
  "verified-rate-limited-not-404": "Rate limited, not 404",
  "fetch-blocked-403-not-404": "Fetch blocked, not 404",
  "verified-retired-redirect": "Retired notice verified",
  "direct-unverified": "Direct link, needs verification",
};

export const sourceBankResources: SourceBankResource[] = [
  {
    id: "vscode-education",
    name: "VS Code for Education",
    officialUrl: "https://vscodeedu.com/",
    category: "Student Developer Tools",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Browser-based coding lessons and classroom-friendly VS Code experiences.",
    teacherSetupNote:
      "Use for beginner-friendly coding activities before asking students to install desktop tools.",
    privacyNote:
      "Check account requirements, age terms, and district policy before assigning to students.",
    verificationStatus: "verified-js-app-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "coding", "microsoft", "web-dev"],
  },
  {
    id: "github-education",
    name: "GitHub Education",
    officialUrl: "https://education.github.com/",
    category: "Student Developer Tools",
    audience: ["Students", "Teachers", "Schools"],
    cost: "Education verification",
    accountRequired: "Yes",
    bestUse:
      "Student Developer Pack, teacher verification, Codespaces, Copilot Student, learning paths, and GitHub community.",
    teacherSetupNote:
      "Use as the main entry point for verified education benefits and GitHub learning support.",
    privacyNote:
      "Review public profile, repository visibility, organization settings, and student account policy.",
    verificationStatus: "verified-rate-limited-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "github", "coding", "verification"],
  },
  {
    id: "github-student-developer-pack",
    name: "GitHub Student Developer Pack",
    officialUrl: "https://education.github.com/pack",
    category: "Student Developer Tools",
    audience: ["Students"],
    cost: "Education verification",
    accountRequired: "Yes",
    bestUse:
      "Free and education-discounted developer tools for verified students.",
    teacherSetupNote:
      "Point eligible students here after explaining account safety and public profile basics.",
    privacyNote:
      "Students should avoid posting personal information, secrets, screenshots, or school-private data.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "github", "developer-tools", "verification"],
  },
  {
    id: "github-skills",
    name: "GitHub Skills",
    officialUrl: "https://skills.github.com/",
    category: "Student Developer Tools",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Yes",
    bestUse:
      "Interactive GitHub lessons for repository, Markdown, branch, issue, and pull request workflows.",
    teacherSetupNote:
      "Use before classroom GitHub projects so learners practice in guided repositories first.",
    privacyNote:
      "Use school-safe usernames and avoid personal details in public repository work.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "github", "coding"],
  },
  {
    id: "github-classroom",
    name: "GitHub Classroom",
    officialUrl: "https://classroom.github.com/",
    category: "Student Developer Tools",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Yes",
    bestUse:
      "Assignment distribution, feedback, autograding, and private student coding work.",
    teacherSetupNote:
      "Document because teachers may encounter it, but note GitHub's transition toward partner solutions.",
    privacyNote:
      "Use private assignments where appropriate and review repo exposure before publishing student work.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "github", "classroom"],
    note: "GitHub Classroom is active, but GitHub notes a transition toward partner solutions.",
  },
  {
    id: "microsoft-learn-educator-center",
    name: "Microsoft Learn Educator Center",
    officialUrl: "https://learn.microsoft.com/en-us/training/educator-center/",
    category: "Teacher Training Platforms",
    audience: ["Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Teacher professional development for AI, cybersecurity, STEM, coding, esports, accessibility, and Microsoft tools.",
    teacherSetupNote:
      "Use as a teacher PD source before building Microsoft-centered lessons or safety modules.",
    privacyNote:
      "Check sign-in requirements before using completion badges or training records with school accounts.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "microsoft", "ai", "cybersecurity", "training"],
  },
  {
    id: "microsoft-makecode",
    name: "Microsoft MakeCode",
    officialUrl: "https://www.microsoft.com/en-us/makecode",
    category: "Robotics, Electronics, and STEM",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "Blocks, JavaScript, and Python projects for micro:bit, Arcade, robotics, and electronics-style learning.",
    teacherSetupNote:
      "Use for low-floor STEM projects where students can move from blocks to text coding.",
    privacyNote:
      "Review sharing/export options before asking students to publish projects.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "microsoft", "robotics", "coding"],
  },
  {
    id: "google-applied-digital-skills",
    name: "Google Applied Digital Skills",
    officialUrl: "https://applieddigitalskills.withgoogle.com/",
    category: "Google Workspace and Productivity",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Practical digital skills lessons across Google Workspace, online safety, computer science, careers, study skills, and information literacy.",
    teacherSetupNote:
      "Use as a ready-made lesson bank for practical technology and information literacy units.",
    privacyNote:
      "Check whether students need Google accounts and follow district Google Workspace policy.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "google", "digital-skills"],
  },
  {
    id: "google-education-learning-center",
    name: "Google for Education Learning Center",
    officialUrl: "https://edu.google.com/intl/ALL_us/learning-center/",
    category: "Teacher Training Platforms",
    audience: ["Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Google Workspace training, AI training, educator certification prep, and Google tool support.",
    teacherSetupNote:
      "Use for teacher training before designing Google Workspace workflows or teaching tool-specific lessons.",
    privacyNote:
      "Use district-approved Google accounts and review data handling before student deployment.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "google", "workspace", "training"],
  },
  {
    id: "raspberry-pi-foundation-teach",
    name: "Raspberry Pi Foundation Teach",
    officialUrl: "https://www.raspberrypi.org/teach/",
    category: "Coding and Computer Science Curriculum",
    audience: ["Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "Computing curriculum, teacher training, Code Club, Code Classroom, Experience CS, Experience AI, and classroom projects.",
    teacherSetupNote:
      "Use as a primary CS curriculum source, especially where teachers need lesson structure and training.",
    privacyNote:
      "Check account and classroom-management requirements for any connected platform features.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "cs-curriculum", "robotics", "ai"],
  },
  {
    id: "raspberry-pi-code-classroom",
    name: "Raspberry Pi Code Classroom",
    officialUrl: "https://classroom.raspberrypi.org/",
    category: "Coding and Computer Science Curriculum",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Structured coding lessons and classroom-friendly computer science activities.",
    teacherSetupNote:
      "Preview lessons and account flow before assigning student activities.",
    privacyNote:
      "Check student account requirements, age terms, and district approval.",
    verificationStatus: "verified-js-app-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "cs-curriculum", "coding"],
  },
  {
    id: "experience-cs",
    name: "Experience CS",
    officialUrl: "https://experience-cs.org/",
    category: "Coding and Computer Science Curriculum",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "Computer science curriculum and classroom resources that Google points educators toward after CS First retirement.",
    teacherSetupNote:
      "Use as the active replacement direction when teachers ask about CS First.",
    privacyNote:
      "Review lesson platform/account requirements before assigning student-facing work.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "cs-curriculum"],
  },
  {
    id: "experience-ai",
    name: "Experience AI",
    officialUrl: "https://experience-ai.org/",
    category: "AI and Prompting Tools",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "AI literacy curriculum and classroom resources for introducing artificial intelligence responsibly.",
    teacherSetupNote:
      "Use as a curriculum-aligned AI literacy source before creating AI activities from scratch.",
    privacyNote:
      "Avoid student-identifiable examples in AI activities and check district AI policy.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "ai", "curriculum"],
  },
  {
    id: "code-org-teach",
    name: "Code.org Teach",
    officialUrl: "https://code.org/educate",
    category: "Coding and Computer Science Curriculum",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "K-12 computer science curriculum, Hour of Code, AI education resources, and teacher supports.",
    teacherSetupNote:
      "Use for structured K-12 CS sequences and beginner-friendly classroom activities.",
    privacyNote:
      "Review student account requirements, section settings, and district policy.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "coding", "cs-curriculum", "ai"],
  },
  {
    id: "scratch-educators",
    name: "Scratch Educators",
    officialUrl: "https://scratch.mit.edu/educators/",
    category: "Coding and Computer Science Curriculum",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Creative coding, block-based projects, beginner CS activities, and classroom project ideas.",
    teacherSetupNote:
      "Use for early coding experiences and creative computing projects.",
    privacyNote:
      "Review account, sharing, commenting, and community moderation settings before student use.",
    verificationStatus: "verified-js-app-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "coding", "creative-coding"],
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    officialUrl: "https://www.khanacademy.org/",
    category: "Teacher Training Platforms",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Free lessons, exercises, teacher tools, and practice across math, science, computing, humanities, and more.",
    teacherSetupNote:
      "Use for supplemental practice, review, and teacher-managed assignments.",
    privacyNote:
      "Review class setup, student accounts, and data-sharing terms before assigning.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "course-platform"],
  },
  {
    id: "khanmigo-teachers",
    name: "Khanmigo for Teachers",
    officialUrl: "https://www.khanmigo.ai/teachers",
    category: "AI and Prompting Tools",
    audience: ["Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Teacher AI support for planning, lesson help, explanations, and classroom workflow support.",
    teacherSetupNote:
      "Use for teacher planning only until student data, district policy, and account expectations are clear.",
    privacyNote:
      "Do not paste student-identifiable information into AI tools.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "ai", "planning"],
  },
  {
    id: "cyber-org",
    name: "CYBER.ORG",
    officialUrl: "https://www.cyber.org/",
    category: "Cybersecurity Education",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "K-12 cybersecurity curriculum, standards, cyber safety videos, professional development, career profiles, and range resources.",
    teacherSetupNote:
      "Use as a primary source for teacher-facing cybersecurity lessons and OTS-280 planning.",
    privacyNote:
      "Use defensive classroom activities only and check account requirements for labs or ranges.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "cybersecurity", "safety"],
  },
  {
    id: "picoctf-cylab",
    name: "picoCTF / CyLab Security Academy",
    officialUrl: "https://picoctf.org/",
    category: "Cybersecurity Education",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Beginner cybersecurity learning and CTF-style practice backed by Carnegie Mellon.",
    teacherSetupNote:
      "Use for guided, ethical cyber practice after establishing safety norms and scope. picoCTF has moved to the CyLab Security Academy at cylabacademy.org; send students there to log in.",
    privacyNote:
      "Keep activities authorized, defensive, and classroom-contained.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-27",
    tags: ["students", "teachers", "cybersecurity"],
    note: "picoCTF.org now redirects to the CyLab Security Academy (cylabacademy.org). Accounts created before May 8, 2026 carry over; a future picoCTF.com is planned.",
  },
  {
    id: "cisco-networking-academy",
    name: "Cisco Networking Academy",
    officialUrl: "https://www.netacad.com/",
    category: "Cybersecurity Education",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Networking, cybersecurity, Python, IT, and career-aligned technical training.",
    teacherSetupNote:
      "Use for career-aligned cyber, networking, and IT modules.",
    privacyNote:
      "Review account, classroom, and learner data requirements before rostering students.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "cybersecurity", "networking", "python"],
  },
  {
    id: "mit-opencourseware",
    name: "MIT OpenCourseWare",
    officialUrl: "https://ocw.mit.edu/",
    category: "Open Educational Resources",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "No",
    bestUse:
      "University-level course materials, lecture notes, exams, videos, and educator references.",
    teacherSetupNote:
      "Use as an advanced source bank and adapt materials to student level and course goals.",
    privacyNote:
      "Check license and attribution requirements before remixing content.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "oer", "courseware"],
  },
  {
    id: "openstax",
    name: "OpenStax",
    officialUrl: "https://openstax.org/",
    category: "Open Educational Resources",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "Free textbooks and open learning materials across many subjects.",
    teacherSetupNote:
      "Use for textbook-aligned references and open readings.",
    privacyNote:
      "Check license and attribution notes before adapting material.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "oer", "textbooks"],
  },
  {
    id: "libretexts",
    name: "LibreTexts",
    officialUrl: "https://libretexts.org/",
    category: "Open Educational Resources",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "Optional",
    bestUse:
      "Open textbooks and remixable course materials.",
    teacherSetupNote:
      "Use for open readings, remixable course references, and higher-ed-aligned content.",
    privacyNote:
      "Verify license details for each page or book before reuse.",
    verificationStatus: "verified-active",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "oer", "textbooks"],
  },
  {
    id: "mdn-learn",
    name: "MDN Learn Web Development",
    officialUrl: "https://developer.mozilla.org/en-US/docs/Learn",
    category: "Web Development Resources",
    audience: ["Students", "Teachers"],
    cost: "Free",
    accountRequired: "No",
    bestUse:
      "HTML, CSS, JavaScript, accessibility, and web standards learning.",
    teacherSetupNote:
      "Use as the official-ish web literacy and reference foundation for web lessons.",
    privacyNote:
      "No student account is needed for reading, but check any linked interactive tools separately.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "web-dev", "coding"],
  },
  {
    id: "freecodecamp",
    name: "freeCodeCamp",
    officialUrl: "https://www.freecodecamp.org/",
    category: "Web Development Resources",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Optional",
    bestUse:
      "Web development, Python, data, certifications, and coding practice.",
    teacherSetupNote:
      "Use for independent practice or enrichment, not as a substitute for teacher-designed pacing.",
    privacyNote:
      "Check student account and public profile settings before assigning logged-in progress.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "web-dev", "python", "data"],
  },
  {
    id: "kaggle-learn",
    name: "Kaggle Learn",
    officialUrl: "https://www.kaggle.com/learn",
    category: "Data Science and Python",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Python, pandas, machine learning, and data science mini-courses.",
    teacherSetupNote:
      "Use for short data science modules after students understand notebook/account expectations.",
    privacyNote:
      "Do not upload student data or sensitive datasets to notebooks or public competitions.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "data", "python", "ai"],
  },
  {
    id: "google-colab",
    name: "Google Colab",
    officialUrl: "https://colab.google/",
    category: "Data Science and Python",
    audience: ["Students", "Teachers"],
    cost: "Freemium",
    accountRequired: "Yes",
    bestUse:
      "Python notebooks, data science, machine learning experiments, and shareable code labs.",
    teacherSetupNote:
      "Use for notebook-based Python when browser access matters more than local setup.",
    privacyNote:
      "Do not upload student-identifiable data, API keys, secrets, or private files into notebooks.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "google", "python", "data", "ai"],
  },
  {
    id: "google-ai-studio",
    name: "Google AI Studio",
    officialUrl: "https://aistudio.google.com/",
    category: "AI and Prompting Tools",
    audience: ["Teachers", "Advanced students"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Gemini experimentation, prompt testing, model settings, safety settings, and AI demos.",
    teacherSetupNote:
      "Use for teacher prompt testing and advanced AI workflow demos after privacy expectations are explicit.",
    privacyNote:
      "Do not paste student-identifiable information, private files, grades, IEP/504 details, or secrets.",
    verificationStatus: "verified-active-redirect",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "advanced-students", "google", "ai", "prompting"],
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    officialUrl: "https://notebooklm.google/",
    category: "AI and Prompting Tools",
    audience: ["Students", "Teachers"],
    cost: "Free with account",
    accountRequired: "Yes",
    bestUse:
      "Source-grounded research notebooks, summaries, study guides, and teacher planning from provided sources.",
    teacherSetupNote:
      "Use only after selecting safe source documents and explaining source-grounded limitations.",
    privacyNote:
      "Do not upload student records, private district documents, copyrighted content without permission, or sensitive files.",
    verificationStatus: "verified-active-shell-not-404",
    reviewedAt: "2026-06-20",
    tags: ["students", "teachers", "google", "ai", "research"],
  },
  {
    id: "cisa-resources",
    name: "CISA Resources",
    officialUrl: "https://www.cisa.gov/resources-tools/resources",
    category: "Safety, Privacy, and Website Audit Resources",
    audience: ["Teachers", "Schools"],
    cost: "Free",
    accountRequired: "No",
    bestUse:
      "Cyber safety, public-sector guidance, awareness materials, and school safety references.",
    teacherSetupNote:
      "Use as a safe official foundation for cyber safety, public website review, and incident-preparedness lessons.",
    privacyNote:
      "Keep classroom use defensive and follow district incident-reporting procedures.",
    verificationStatus: "fetch-blocked-403-not-404",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "schools", "cybersecurity", "safety"],
  },
  {
    id: "google-cs-first-retired",
    name: "Google CS First retired notice",
    officialUrl: "https://support.google.com/csfirst/answer/15848549",
    category: "Retired or Replaced Resources",
    audience: ["Teachers"],
    cost: "Free",
    accountRequired: "No",
    bestUse:
      "Historical reference when teachers ask where CS First went.",
    teacherSetupNote:
      "Do not list CS First as active curriculum. Point educators toward Experience CS instead.",
    privacyNote:
      "Use only as a retired-resource note; do not assign new CS First work.",
    verificationStatus: "verified-retired-redirect",
    reviewedAt: "2026-06-20",
    tags: ["teachers", "google", "retired", "cs-curriculum"],
    note: "Google CS First was turned down June 30, 2025; point users to Experience CS instead.",
  },
];

export function getSourceBankByCategory() {
  return sourceBankCategories
    .map((category) => ({
      category,
      resources: sourceBankResources.filter(
        (resource) => resource.category === category,
      ),
    }))
    .filter((group) => group.resources.length > 0);
}
