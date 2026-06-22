import type { ChapterSection } from "./book";

export interface CyberSafetyModule {
  number: string;
  title: string;
  essentialQuestion: string;
  learningOutcomes: string[];
  keyVocabulary: string[];
  explanation: string;
  buildArtifact: string;
  safetyCheck: string;
  reflectionPrompt: string;
}

export const CYBER_SAFETY_MODULES: CyberSafetyModule[] = [
  {
    number: "01",
    title: "Teacher Threat Model",
    essentialQuestion:
      "What risks actually matter for your public-facing teaching life?",
    learningOutcomes: [
      "Identify personal, professional, and public-facing risk areas.",
      "Separate realistic risks from fear-based noise.",
      "Create a teacher personal risk map.",
    ],
    keyVocabulary: ["threat model", "asset", "exposure", "risk", "impact"],
    explanation:
      "This is not paranoia. A threat model is a plain-language map of what you are trying to protect and what could realistically go wrong.",
    buildArtifact: "Teacher personal risk map",
    safetyCheck:
      "Do not publish the full risk map. Keep sensitive details private or stored in a secure personal location.",
    reflectionPrompt:
      "What is one risk you can reduce this week without changing your whole digital life?",
  },
  {
    number: "02",
    title: "Account Hygiene and MFA",
    essentialQuestion:
      "How do you make account compromise less likely and less damaging?",
    learningOutcomes: [
      "Create an account inventory.",
      "Identify password reuse and weak recovery settings.",
      "Turn on MFA for priority accounts.",
    ],
    keyVocabulary: ["password manager", "MFA", "passkey", "recovery email", "account inventory"],
    explanation:
      "Most account safety is boring maintenance: unique passwords, MFA, updated recovery options, and knowing which accounts matter most.",
    buildArtifact: "Password manager and MFA checklist",
    safetyCheck:
      "Never paste live passwords, recovery codes, or MFA backup codes into AI tools or shared documents.",
    reflectionPrompt:
      "Which three accounts would cause the most damage if someone else got in?",
  },
  {
    number: "03",
    title: "Usernames and Identity Separation",
    essentialQuestion:
      "Where should your personal, school, and public educator identities stay separate?",
    learningOutcomes: [
      "Map repeated usernames, avatars, and bios.",
      "Decide which identities should stay connected.",
      "Create a public/private identity separation plan.",
    ],
    keyVocabulary: ["username reuse", "identity separation", "public profile", "handle", "alias"],
    explanation:
      "Using the same username everywhere makes your life easy to connect. Sometimes that is fine. Sometimes it gives strangers too much of the map.",
    buildArtifact: "Public/private identity map",
    safetyCheck:
      "Do not use identity separation to evade district policy. Use approved accounts where school policy requires them.",
    reflectionPrompt:
      "Which account connects more of your life than you meant it to?",
  },
  {
    number: "04",
    title: "Email, Phishing, and Impersonation",
    essentialQuestion:
      "How do you recognize and respond to suspicious messages without panic?",
    learningOutcomes: [
      "Recognize common phishing patterns.",
      "Build a calm response checklist.",
      "Know when to report suspicious messages.",
    ],
    keyVocabulary: ["phishing", "spoofing", "impersonation", "malware", "reporting"],
    explanation:
      "Phishing works because teachers are busy, helpful, and overloaded. The fix is not shame. The fix is a response routine.",
    buildArtifact: "Phishing response checklist",
    safetyCheck:
      "Do not click links, open attachments, or reply to suspicious messages while trying to investigate them.",
    reflectionPrompt:
      "What is your first safe step when an urgent-looking message asks you to act?",
  },
  {
    number: "05",
    title: "Social Media and Doxxing Risk",
    essentialQuestion:
      "What public profile details create unnecessary risk for a teacher?",
    learningOutcomes: [
      "Audit public profiles for personal exposure.",
      "Reduce location and routine clues.",
      "Choose safer public contact patterns.",
    ],
    keyVocabulary: ["doxxing", "public profile", "metadata", "location clue", "contact alias"],
    explanation:
      "Teachers are public-facing professionals. You deserve boundaries between your classroom presence and your private life.",
    buildArtifact: "Public profile audit",
    safetyCheck:
      "Do not share student images, names, routines, or identifiable work without the proper permissions and district approval.",
    reflectionPrompt:
      "What is one public detail you would remove if a stranger were reading your profile?",
  },
  {
    number: "06",
    title: "VPNs, Wi-Fi, and Location Privacy",
    essentialQuestion:
      "What can a VPN help with, and what can it not protect?",
    learningOutcomes: [
      "Explain what VPNs do and do not do.",
      "Choose safer habits on public Wi-Fi.",
      "Create a connection safety checklist.",
    ],
    keyVocabulary: ["VPN", "public Wi-Fi", "HTTPS", "network privacy", "location privacy"],
    explanation:
      "VPNs can improve privacy on networks, but they do not make you invisible. They are one tool, not a force field.",
    buildArtifact: "Connection safety checklist",
    safetyCheck:
      "Do not use VPN guidance to bypass school policy, filters, monitoring rules, or legal requirements.",
    reflectionPrompt:
      "When are you most likely to use an unsafe network because you are in a hurry?",
  },
  {
    number: "07",
    title: "Browser, Device, and File Safety",
    essentialQuestion:
      "How do you keep everyday devices and files from leaking more than intended?",
    learningOutcomes: [
      "Review browser extensions and permissions.",
      "Check device update and lock settings.",
      "Inspect files and images for sensitive metadata.",
    ],
    keyVocabulary: ["browser extension", "permissions", "updates", "EXIF metadata", "file sharing"],
    explanation:
      "Most teacher security problems are not dramatic. They are old downloads, over-permissioned extensions, unlocked devices, and screenshots with private info.",
    buildArtifact: "Device and browser hardening checklist",
    safetyCheck:
      "Do not upload private files or student screenshots to random online scanners or AI tools.",
    reflectionPrompt:
      "Which device or browser account needs cleanup before you publish more work?",
  },
  {
    number: "08",
    title: "Website Safety for Teacher Sites",
    essentialQuestion:
      "What should you check before sharing a public teacher website?",
    learningOutcomes: [
      "Audit a website for personal and student exposure.",
      "Check forms, downloads, embeds, and contact methods.",
      "Create a repeatable website safety review.",
    ],
    keyVocabulary: ["HTTPS", "embed", "security header", "analytics", "public contact"],
    explanation:
      "A teacher website should help people learn, not leak private details. The audit is maintenance before publishing.",
    buildArtifact: "Teacher website security audit",
    safetyCheck:
      "Do not publish class rosters, private schedules, student data, API keys, or screenshots containing private information.",
    reflectionPrompt:
      "What is the most useful part of your site, and what is the riskiest part?",
  },
  {
    number: "09",
    title: "GitHub, Domains, and Public Repos",
    essentialQuestion:
      "What changes when your curriculum work becomes public and version-controlled?",
    learningOutcomes: [
      "Check public repos for secrets and private information.",
      "Review README and commit-history exposure risks.",
      "Understand domain/contact privacy basics.",
    ],
    keyVocabulary: ["public repo", "secret scanning", ".env file", "WHOIS", "domain privacy"],
    explanation:
      "GitHub and domains are powerful, but public means public. Before you share, check what the repo or domain reveals.",
    buildArtifact: "Public repo and domain exposure check",
    safetyCheck:
      "If a real secret was exposed, rotate it. Deleting the visible file is not enough.",
    reflectionPrompt:
      "What would you remove from a repo before showing it to students, parents, or the public?",
  },
  {
    number: "10",
    title: "Incident Response for Teachers",
    essentialQuestion:
      "What should you do first if something goes wrong?",
    learningOutcomes: [
      "Create a calm incident response mini-plan.",
      "Identify who to contact for different types of issues.",
      "Document what happened without making it worse.",
    ],
    keyVocabulary: ["incident response", "documentation", "escalation", "account recovery", "reporting"],
    explanation:
      "When something happens, panic makes cleanup harder. A mini-plan tells you what to do, who to contact, and what not to touch.",
    buildArtifact: "What to do if something happens plan",
    safetyCheck:
      "Report serious threats to school administration, IT/security, and appropriate authorities. Do not try to handle danger alone.",
    reflectionPrompt:
      "Who are your first three contacts if an account, site, or public profile becomes unsafe?",
  },
];

export const CYBER_COURSE_CODE = "OTS-280";
export const CYBER_COURSE_PATH = "Cyber Safety for Educators";

export const CYBER_CHAPTER_PROBLEMS: Record<string, string> = {
  "teacher-threat-model":
    "Teachers face real risks online but lack a practical framework for separating realistic threats from fear-based noise.",
  "account-hygiene-mfa":
    "Most account compromises happen because of reused passwords, missing MFA, and outdated recovery settings — not sophisticated hacking.",
  "usernames-identity-separation":
    "Repeated usernames and linked profiles let strangers map a teacher's personal, school, and public lives together.",
  "email-phishing-impersonation":
    "Phishing succeeds against teachers because they are busy, helpful, and trained to respond quickly to authority.",
  "social-media-doxxing":
    "Public profiles often reveal location, routines, and personal details that create unnecessary risk for a teacher.",
  "vpns-wifi-location":
    "Teachers use public Wi-Fi at conferences, coffee shops, and hotels without understanding what is and is not protected.",
  "browser-device-file-safety":
    "Old downloads, over-permissioned extensions, unlocked devices, and screenshots with private info cause most teacher security problems.",
  "website-safety":
    "Teacher websites can leak personal details, student data, or embedded tracking without the teacher realizing it.",
  "github-domains-repos":
    "Public repos and domain registrations reveal information that teachers do not intend to share.",
  "incident-response":
    "When something goes wrong, teachers without a plan panic and often make the situation worse by deleting evidence or not reporting.",
};

export const CYBER_CHAPTER_SKILLS: Record<string, string[]> = {
  "teacher-threat-model": ["risk assessment", "privacy awareness", "documentation"],
  "account-hygiene-mfa": ["account management", "authentication", "credential hygiene"],
  "usernames-identity-separation": ["identity management", "privacy", "digital footprint"],
  "email-phishing-impersonation": ["threat recognition", "communication safety", "reporting"],
  "social-media-doxxing": ["profile auditing", "privacy settings", "boundary setting"],
  "vpns-wifi-location": ["network safety", "connection hygiene", "location privacy"],
  "browser-device-file-safety": ["device hardening", "extension review", "metadata awareness"],
  "website-safety": ["web safety audit", "publishing hygiene", "data protection"],
  "github-domains-repos": ["repo safety", "secret scanning", "domain privacy"],
  "incident-response": ["incident handling", "escalation", "documentation"],
};

export const CYBER_CHAPTER_SECTIONS: Record<string, ChapterSection[]> = {
  "teacher-threat-model": [
    { number: "01.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "01.1", title: "What Is a Threat Model?", type: "section", duration: "15 minutes" },
    { number: "01.2", title: "Teacher Risk Categories", type: "section", duration: "15 minutes" },
    { number: "01.3", title: "Realistic vs Fear-Based Risks", type: "section", duration: "15 minutes" },
    { number: "01.4", title: "Build Task: Personal Risk Map", type: "artifact", duration: "30 minutes", artifact: "Teacher personal risk map" },
    { number: "01.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "account-hygiene-mfa": [
    { number: "02.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "02.1", title: "The Account Inventory", type: "section", duration: "15 minutes" },
    { number: "02.2", title: "Password Reuse and Weak Recovery", type: "section", duration: "15 minutes" },
    { number: "02.3", title: "Password Managers", type: "section", duration: "15 minutes" },
    { number: "02.4", title: "Multi-Factor Authentication", type: "section", duration: "20 minutes" },
    { number: "02.5", title: "Build Task: Password Manager and MFA Checklist", type: "artifact", duration: "30 minutes", artifact: "Password manager and MFA checklist" },
    { number: "02.6", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "usernames-identity-separation": [
    { number: "03.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "03.1", title: "Username Reuse and Discoverability", type: "section", duration: "15 minutes" },
    { number: "03.2", title: "Personal, School, and Public Identities", type: "section", duration: "15 minutes" },
    { number: "03.3", title: "When Separation Matters", type: "section", duration: "15 minutes" },
    { number: "03.4", title: "Build Task: Identity Separation Map", type: "artifact", duration: "30 minutes", artifact: "Public/private identity map" },
    { number: "03.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "email-phishing-impersonation": [
    { number: "04.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "04.1", title: "How Phishing Works on Teachers", type: "section", duration: "15 minutes" },
    { number: "04.2", title: "Recognizing Common Patterns", type: "section", duration: "20 minutes" },
    { number: "04.3", title: "Building a Response Routine", type: "section", duration: "15 minutes" },
    { number: "04.4", title: "When and How to Report", type: "section", duration: "15 minutes" },
    { number: "04.5", title: "Build Task: Phishing Response Checklist", type: "artifact", duration: "30 minutes", artifact: "Phishing response checklist" },
    { number: "04.6", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "social-media-doxxing": [
    { number: "05.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "05.1", title: "What Doxxing Means for Teachers", type: "section", duration: "15 minutes" },
    { number: "05.2", title: "Auditing Public Profiles", type: "section", duration: "20 minutes" },
    { number: "05.3", title: "Location and Routine Clues", type: "section", duration: "15 minutes" },
    { number: "05.4", title: "Safer Public Contact Patterns", type: "section", duration: "15 minutes" },
    { number: "05.5", title: "Build Task: Public Profile Audit", type: "artifact", duration: "30 minutes", artifact: "Public profile audit" },
    { number: "05.6", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "vpns-wifi-location": [
    { number: "06.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "06.1", title: "What VPNs Do and Do Not Do", type: "section", duration: "15 minutes" },
    { number: "06.2", title: "Public Wi-Fi Risks", type: "section", duration: "15 minutes" },
    { number: "06.3", title: "HTTPS and Connection Safety", type: "section", duration: "15 minutes" },
    { number: "06.4", title: "Build Task: Connection Safety Checklist", type: "artifact", duration: "25 minutes", artifact: "Connection safety checklist" },
    { number: "06.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "browser-device-file-safety": [
    { number: "07.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "07.1", title: "Browser Extensions and Permissions", type: "section", duration: "15 minutes" },
    { number: "07.2", title: "Device Updates and Lock Settings", type: "section", duration: "15 minutes" },
    { number: "07.3", title: "File Metadata and Screenshot Safety", type: "section", duration: "15 minutes" },
    { number: "07.4", title: "Build Task: Device and Browser Hardening Checklist", type: "artifact", duration: "30 minutes", artifact: "Device and browser hardening checklist" },
    { number: "07.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "website-safety": [
    { number: "08.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "08.1", title: "Personal and Student Exposure Risks", type: "section", duration: "15 minutes" },
    { number: "08.2", title: "Forms, Downloads, and Embeds", type: "section", duration: "20 minutes" },
    { number: "08.3", title: "Contact Methods and Analytics", type: "section", duration: "15 minutes" },
    { number: "08.4", title: "Build Task: Website Security Audit", type: "artifact", duration: "30 minutes", artifact: "Teacher website security audit" },
    { number: "08.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "github-domains-repos": [
    { number: "09.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "09.1", title: "Secrets in Public Repos", type: "section", duration: "15 minutes" },
    { number: "09.2", title: "README and Commit History Exposure", type: "section", duration: "20 minutes" },
    { number: "09.3", title: "Domain Privacy and WHOIS", type: "section", duration: "15 minutes" },
    { number: "09.4", title: "Build Task: Repo and Domain Exposure Check", type: "artifact", duration: "30 minutes", artifact: "Public repo and domain exposure check" },
    { number: "09.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
  "incident-response": [
    { number: "10.0", title: "Chapter Overview", type: "overview", duration: "10 minutes" },
    { number: "10.1", title: "What Counts as an Incident", type: "section", duration: "15 minutes" },
    { number: "10.2", title: "Who to Contact", type: "section", duration: "15 minutes" },
    { number: "10.3", title: "Documenting Without Making It Worse", type: "section", duration: "15 minutes" },
    { number: "10.4", title: "Build Task: Incident Response Plan", type: "artifact", duration: "30 minutes", artifact: "What to do if something happens plan" },
    { number: "10.5", title: "Chapter Checkpoint", type: "checkpoint", duration: "10 minutes" },
  ],
};

export interface CyberBookChapter {
  id: string;
  number: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  essentialQuestion: string;
  buildArtifact: string;
  evidence: string;
  safetyCheck: string;
  reflectionPrompt: string;
  sections: ChapterSection[];
  problem: string;
  transferableSkills: string[];
  duration: string;
  difficulty: string;
}

const CYBER_MODULE_IDS: string[] = [
  "teacher-threat-model",
  "account-hygiene-mfa",
  "usernames-identity-separation",
  "email-phishing-impersonation",
  "social-media-doxxing",
  "vpns-wifi-location",
  "browser-device-file-safety",
  "website-safety",
  "github-domains-repos",
  "incident-response",
];

export const CYBER_BOOK_CHAPTERS: CyberBookChapter[] = CYBER_SAFETY_MODULES.map(
  (module, index) => {
    const id = CYBER_MODULE_IDS[index];
    const slug = `${module.number}-${id}`;
    return {
      id,
      number: module.number,
      title: module.title,
      slug,
      href: `/book/ots-280/${slug}`,
      description: module.explanation,
      essentialQuestion: module.essentialQuestion,
      buildArtifact: module.buildArtifact,
      evidence: module.learningOutcomes.join(" "),
      safetyCheck: module.safetyCheck,
      reflectionPrompt: module.reflectionPrompt,
      sections: CYBER_CHAPTER_SECTIONS[id] ?? [],
      problem: CYBER_CHAPTER_PROBLEMS[id] ?? "This chapter addresses a practical cyber safety concern for public-facing educators.",
      transferableSkills: CYBER_CHAPTER_SKILLS[id] ?? ["cyber safety"],
      duration: "1 week",
      difficulty: module.number === "10" ? "Capstone" : "Foundation",
    };
  },
);

export interface CyberSectionRecord {
  chapter: CyberBookChapter;
  section: ChapterSection;
  sectionSlug: string;
  href: string;
  index: number;
}

export interface CyberSectionContent {
  coreIdea: string[];
  doThis: string[];
  evidence: string[];
  safety: string[];
  reflection?: string;
}

const CYBER_SECTION_CONTENT: Record<string, CyberSectionContent> = {
  "01-teacher-threat-model/01-0": {
    coreIdea: [
      "Cyber safety starts with scope. A teacher does not need to defend against every possible internet danger before publishing useful work.",
      "A threat model is a plain-language map of what you care about, what is exposed, what could realistically go wrong, and which protections are worth doing first.",
      "In this chapter, the goal is calm prioritization. You will separate personal, professional, and public-facing risks so the rest of the course has a practical foundation.",
    ],
    doThis: [
      "List three things you need to protect: one account, one public profile or site, and one set of private files.",
      "Write one realistic concern for each item. Avoid movie-plot scenarios; focus on things that could actually happen to a public-facing teacher.",
      "Choose the one concern you could reduce this week with a small action.",
    ],
    evidence: [
      "A short starter list names assets, exposures, and one immediate priority.",
      "The priority is specific enough to act on without exposing private details.",
      "The list is stored privately, not posted in a public repository or shared class folder.",
    ],
    safety: [
      "Do not publish the full risk map. Keep sensitive details private or stored in a secure personal location.",
      "Use placeholders for account names, private email addresses, phone numbers, school systems, and family details.",
      "If the exercise reveals an urgent threat, involve school administration, IT, or appropriate authorities instead of treating it as a class artifact.",
    ],
  },
  "01-teacher-threat-model/01-1": {
    coreIdea: [
      "A threat model is not a prediction that something bad will happen. It is a decision tool.",
      "The model helps you answer four questions: What am I protecting? Who or what could affect it? How likely is that in my real context? What is a reasonable first protection?",
      "For teachers, this matters because school work often mixes personal identity, public communication, student materials, shared files, and many old accounts.",
    ],
    doThis: [
      "Create four private columns: Asset, Exposure, Possible Problem, First Protection.",
      "Add one row for a public-facing item, such as a teacher website, profile, YouTube channel, or GitHub repo.",
      "Add one row for a private item, such as a personal email account, password manager, recovery email, or archived folder.",
      "Write one first protection for each row that you could explain to another teacher.",
    ],
    evidence: [
      "The model contains at least two rows: one public-facing and one private.",
      "Each row uses plain teacher language rather than security jargon.",
      "Each first protection is small, realistic, and connected to the possible problem.",
    ],
    safety: [
      "Do not include live passwords, recovery codes, home addresses, private phone numbers, or student information.",
      "If you use screenshots for your own notes, crop out account names, private messages, and browser tabs.",
      "Keep the model in a private notebook, private document, or local file.",
    ],
  },
  "01-teacher-threat-model/01-2": {
    coreIdea: [
      "Teacher risk usually falls into three overlapping categories: personal life, school role, and public educator presence.",
      "Personal risks include home address clues, family details, personal accounts, and repeated usernames. Professional risks include school email, shared drives, grading systems, classroom tools, and student materials.",
      "Public-facing risks include teacher websites, social profiles, published videos, repositories, domains, conference bios, and contact forms.",
    ],
    doThis: [
      "Draw three labeled zones: Personal, School, Public.",
      "Place five digital items into the zones. Examples: personal email, district email, public profile, course site, shared Drive folder.",
      "Circle anything that crosses zones, such as a personal email on a public website or the same username across personal and professional accounts.",
      "Choose one crossed-zone item to review later in the course.",
    ],
    evidence: [
      "The map shows at least five digital items across the three zones.",
      "At least one crossed-zone item is identified for review.",
      "The map avoids details that would make the teacher easier to locate or impersonate.",
    ],
    safety: [
      "Use labels like personal email or course site instead of writing full addresses or URLs if the map will be shared for feedback.",
      "Do not include student names, class rosters, room numbers, or private schedules.",
      "Do not treat identity separation as a way around school policy; use approved school accounts where required.",
    ],
  },
  "01-teacher-threat-model/01-3": {
    coreIdea: [
      "A realistic risk is connected to your actual accounts, tools, public information, or job context. A fear-based risk is vague, extreme, or impossible to act on.",
      "Good cyber safety avoids both panic and denial. The point is not to imagine every disaster; the point is to reduce the risks that are likely enough and harmful enough to deserve attention.",
      "For most teachers, the first wins are boring: unique passwords, MFA, public-profile cleanup, private file hygiene, and safer publishing checks.",
    ],
    doThis: [
      "Write three concerns you have about your public-facing teaching life.",
      "Mark each one as realistic, unclear, or fear-based.",
      "For each realistic concern, write one small action. For each unclear concern, write one fact you need to verify.",
      "Cross out anything that is too vague to act on and rewrite it as a concrete check.",
    ],
    evidence: [
      "Concerns are sorted into realistic, unclear, or fear-based categories.",
      "At least one realistic concern has a first action.",
      "At least one unclear concern has a verification question.",
    ],
    safety: [
      "Do not investigate suspicious links, accounts, or messages by clicking through them during this exercise.",
      "Do not post fear-based claims as security advice for others.",
      "When a concern involves harassment, threats, or student safety, escalate through proper school and legal channels.",
    ],
  },
  "01-teacher-threat-model/01-4": {
    coreIdea: [
      "The personal risk map is the first durable artifact in OTS-280. It should help you decide what to fix first, what to monitor, and what belongs in later chapters.",
      "The map is for your private use. A shareable version should remove identifying details and keep only the pattern: asset, exposure, risk level, and next action.",
      "A good map is short. If it becomes a giant inventory, it will not help during a real week of teaching.",
    ],
    doThis: [
      "Build a private risk map with these fields: Asset, Zone, Exposure, Possible Problem, Risk Level, First Protection, Follow-Up Chapter.",
      "Add six to eight rows across personal, school, and public zones.",
      "Assign a simple risk level: low, medium, or high.",
      "Choose three first protections you can complete over the next two weeks.",
      "Create a shareable summary that removes private details and names only the habits you plan to improve.",
    ],
    evidence: [
      "The private map has six to eight rows and uses simple risk labels.",
      "Three first protections are marked as near-term actions.",
      "A sanitized summary exists for peer feedback or instructor review.",
      "The map points at later chapters such as MFA, identity separation, phishing, profile audits, website safety, or repo safety.",
    ],
    safety: [
      "Do not submit the private version if it contains account names, personal details, internal systems, or sensitive locations.",
      "Use a sanitized version for review.",
      "Store the private version somewhere you control and can revisit.",
    ],
    reflection:
      "Which one protection would make the largest difference with the least disruption to your teaching routine?",
  },
  "01-teacher-threat-model/01-5": {
    coreIdea: [
      "The checkpoint is where the map becomes a maintenance habit instead of a one-time worksheet.",
      "Before moving on, make sure your map is useful, private, and specific enough to guide the next chapters.",
      "You should leave Chapter 01 with a realistic picture of what matters, not a long list of anxiety.",
    ],
    doThis: [
      "Review your risk map and remove anything too private for the place it is stored.",
      "Pick one action to complete before Chapter 02.",
      "Write one sentence explaining why that action comes first.",
      "Write one question you still need answered by a later chapter.",
    ],
    evidence: [
      "The risk map has been checked for private details.",
      "One next action is selected and justified.",
      "One question is carried forward into the rest of OTS-280.",
    ],
    safety: [
      "Do not share your private map casually. Share only the sanitized summary if feedback is needed.",
      "If the map reveals an active problem, prioritize response and reporting over completing the course activity.",
      "Keep the checkpoint note practical enough to revisit in a month.",
    ],
    reflection:
      "What is one risk you can reduce this week without changing your whole digital life?",
  },
};

interface CyberChapterContentGuide {
  coreFocus: string;
  sectionFrame: string;
  doThis: string[];
  evidence: string[];
  safety: string[];
  artifactAction: string;
  checkpointAction: string;
  reflection: string;
}

const CYBER_CHAPTER_CONTENT_GUIDES: Record<string, CyberChapterContentGuide> = {
  "02-account-hygiene-mfa": {
    coreFocus:
      "Account hygiene is the maintenance layer that keeps one compromised password from becoming a school, personal, or public-identity crisis.",
    sectionFrame:
      "Use this section to turn account safety from a vague rule into one private, repeatable maintenance habit.",
    doThis: [
      "Choose one priority account category: school email, personal email, password manager, public publishing, or financial account.",
      "Record what protects the account without writing the password, backup codes, or recovery answers.",
      "Check whether the account has unique credentials, current recovery options, and MFA or passkey protection.",
      "Write one next action you can take without exposing secret information.",
    ],
    evidence: [
      "A private account-inventory note exists without passwords, codes, or recovery answers.",
      "At least one priority account has a safer next action identified.",
      "The note distinguishes account type, recovery method, MFA status, and follow-up date.",
    ],
    safety: [
      "Never paste live passwords, recovery codes, MFA backup codes, or security-question answers into AI tools or shared documents.",
      "Use placeholders such as school email or personal email instead of full account names when sharing evidence.",
      "If an account appears compromised, change credentials from a trusted device and follow school IT guidance before continuing coursework.",
    ],
    artifactAction:
      "Build the password manager and MFA checklist using account categories, not secret values. Include columns for account type, unique password confirmed, MFA enabled, recovery method checked, and follow-up date.",
    checkpointAction:
      "Review the checklist and choose the three accounts that would cause the most damage if compromised. Write the next safe maintenance step for each.",
    reflection:
      "Which three accounts would cause the most damage if someone else got in?",
  },
  "03-usernames-identity-separation": {
    coreFocus:
      "Identity separation helps teachers decide which parts of personal life, school work, and public educator work should be connected and which should stay apart.",
    sectionFrame:
      "Use this section to map discoverability, not to hide from school policy or misrepresent who you are.",
    doThis: [
      "Pick one username, profile photo, bio, or public contact method you use in more than one place.",
      "Map where it appears across personal, school, and public educator contexts.",
      "Decide whether the connection is intentional, harmless, unnecessary, or risky.",
      "Write one change that reduces unwanted discoverability without breaking legitimate school workflows.",
    ],
    evidence: [
      "A public/private identity map exists with sensitive handles or URLs redacted if shared.",
      "At least one repeated identity signal is reviewed.",
      "The review explains what should stay connected and what should be separated.",
    ],
    safety: [
      "Do not use identity separation to evade district policy, impersonate others, or avoid required school account rules.",
      "Do not publish a map that connects personal accounts, family details, location clues, or student-facing profiles.",
      "Use a sanitized summary for feedback instead of sharing live usernames and links.",
    ],
    artifactAction:
      "Build the public/private identity map with zones for personal, school, and public educator presence. Use labels and risk notes, not sensitive profile details.",
    checkpointAction:
      "Review the map and choose one repeated identity signal to keep, revise, or separate. Explain the teacher reason for that choice.",
    reflection:
      "Which account connects more of your life than you meant it to?",
  },
  "04-email-phishing-impersonation": {
    coreFocus:
      "Phishing safety is a calm response routine for suspicious messages, not a test of whether a busy teacher can spot every fake at first glance.",
    sectionFrame:
      "Use this section to build a stop-check-report routine for urgent messages, attachments, links, payment requests, and account warnings.",
    doThis: [
      "Describe one suspicious-message pattern teachers commonly receive, using a fictional example.",
      "Identify the pressure tactic: urgency, authority, fear, reward, invoice, attachment, or account problem.",
      "Write the safe first move before clicking, replying, forwarding, or downloading.",
      "Name the reporting path: district IT, email report button, platform support, or official fraud reporting.",
    ],
    evidence: [
      "A phishing response checklist exists with no real sender names, private messages, or screenshots.",
      "The checklist separates recognize, pause, verify, report, and recover steps.",
      "The reporting path is specific enough for a teacher to use during a busy day.",
    ],
    safety: [
      "Do not click suspicious links, open attachments, scan unknown QR codes, or reply while investigating.",
      "Do not paste real phishing emails with headers, student names, or private school details into AI tools.",
      "If you clicked or entered credentials, report quickly and change passwords from a trusted device.",
    ],
    artifactAction:
      "Build the phishing response checklist with lanes for suspected message, immediate stop action, verification path, report path, and recovery step.",
    checkpointAction:
      "Review the checklist against one fictional scenario and revise any step that would be hard to follow under pressure.",
    reflection:
      "What is your first safe step when an urgent-looking message asks you to act?",
  },
  "05-social-media-doxxing": {
    coreFocus:
      "Public profile safety reduces unnecessary location, routine, family, student, and contact exposure while preserving a useful educator presence.",
    sectionFrame:
      "Use this section to audit what strangers can infer from a profile without needing special tools.",
    doThis: [
      "Choose one public profile, bio, portfolio, conference page, or media account.",
      "Review visible location clues, routine clues, contact methods, family details, student references, and old posts.",
      "Mark each detail as keep, revise, remove, or verify with school policy.",
      "Write one safer public-contact pattern if the current one exposes too much.",
    ],
    evidence: [
      "A sanitized public profile audit exists without copying private posts or student images.",
      "At least one location, routine, or contact exposure is reviewed.",
      "The audit distinguishes useful professional visibility from unnecessary personal exposure.",
    ],
    safety: [
      "Do not share student names, faces, schedules, identifiable work, or classroom locations without proper permissions and district approval.",
      "Do not publish before-and-after screenshots that reveal private profile settings or personal contacts.",
      "If harassment or doxxing is active, preserve evidence and escalate rather than editing everything first.",
    ],
    artifactAction:
      "Build the public profile audit with checks for location, routine, student information, family details, contact method, old posts, and action taken.",
    checkpointAction:
      "Review the audit and choose one public detail to remove or rewrite before publishing more work.",
    reflection:
      "What is one public detail you would remove if a stranger were reading your profile?",
  },
  "06-vpns-wifi-location": {
    coreFocus:
      "Connection safety is about knowing what a network can reveal, what HTTPS protects, and what a VPN can and cannot solve.",
    sectionFrame:
      "Use this section to build habits for conferences, coffee shops, hotels, libraries, airports, and other public networks.",
    doThis: [
      "Name one place where you use public or shared Wi-Fi for teacher work.",
      "List what you should avoid doing there, such as grading, sensitive files, finance, or account recovery.",
      "Check whether the sites you rely on use HTTPS and whether your device updates automatically.",
      "Write a connection safety rule you can follow without bypassing school policy.",
    ],
    evidence: [
      "A connection safety checklist exists for one real teaching context.",
      "The checklist separates network risk, device updates, HTTPS checks, VPN limits, and policy boundaries.",
      "The action does not depend on a VPN as a magic privacy guarantee.",
    ],
    safety: [
      "Do not use VPN guidance to bypass school policy, filters, monitoring rules, or legal requirements.",
      "Do not treat a VPN as protection from phishing, malware, bad passwords, or unsafe sharing.",
      "Avoid sensitive work on public networks when a trusted network or hotspot is available.",
    ],
    artifactAction:
      "Build the connection safety checklist with sections for public Wi-Fi context, tasks to avoid, HTTPS check, device update status, VPN note, and backup plan.",
    checkpointAction:
      "Review the checklist and choose one habit that will reduce risk the next time you work away from school or home.",
    reflection:
      "When are you most likely to use an unsafe network because you are in a hurry?",
  },
  "07-browser-device-file-safety": {
    coreFocus:
      "Everyday device safety catches the ordinary leaks: over-permissioned extensions, old downloads, unlocked screens, screenshots, and file metadata.",
    sectionFrame:
      "Use this section to clean one device or browser profile before publishing more public work.",
    doThis: [
      "Choose one browser profile, laptop, tablet, or phone used for teacher work.",
      "Review extensions, app permissions, update status, lock settings, downloads, screenshots, and shared folders.",
      "Remove or flag anything you no longer recognize or need.",
      "Write one file-safety rule for screenshots, PDFs, images, or downloads before public sharing.",
    ],
    evidence: [
      "A device and browser hardening checklist exists without private screenshots or serial numbers.",
      "At least one extension, permission, update, lock, or file-sharing issue is reviewed.",
      "The checklist includes a repeat date so cleanup becomes maintenance.",
    ],
    safety: [
      "Do not upload private files, student screenshots, or sensitive images to random scanners, converters, or AI tools.",
      "Do not uninstall school-managed software without district IT guidance.",
      "If malware or account compromise is suspected, stop and escalate instead of experimenting.",
    ],
    artifactAction:
      "Build the device and browser hardening checklist with checks for updates, lock screen, extensions, permissions, downloads, screenshots, metadata, and shared folders.",
    checkpointAction:
      "Review the checklist and complete one low-risk cleanup action today. Record what changed and what still needs IT guidance.",
    reflection:
      "Which device or browser account needs cleanup before you publish more work?",
  },
  "08-website-safety": {
    coreFocus:
      "A teacher website should help people learn without leaking private files, student details, unsafe forms, or unnecessary tracking.",
    sectionFrame:
      "Use this section to inspect a public course page, club page, portfolio, resource hub, or draft site before sharing it widely.",
    doThis: [
      "Choose one website or draft page and review it as if you were a stranger.",
      "Check for student names, schedules, room numbers, private docs, form collection, embedded media, analytics, downloads, and contact details.",
      "Mark each issue as safe, revise, remove, or ask school policy.",
      "Write one publishing rule you will apply before future site updates.",
    ],
    evidence: [
      "A teacher website security audit exists for one page or site.",
      "Forms, downloads, embeds, contact methods, and private-file links are explicitly checked.",
      "Any student-data or privacy issue is removed, redacted, or escalated before public sharing.",
    ],
    safety: [
      "Do not publish class rosters, private schedules, student data, API keys, or screenshots containing private information.",
      "Do not test forms with real student data during the audit.",
      "If a public site exposed private information, preserve notes, remove exposure, and notify the appropriate school contact.",
    ],
    artifactAction:
      "Build the teacher website security audit with sections for private data, links, forms, embeds, downloads, contact, analytics, and final publish decision.",
    checkpointAction:
      "Review the audit and choose one page element to revise before the site is shared with students, families, or the public.",
    reflection:
      "What is the most useful part of your site, and what is the riskiest part?",
  },
  "09-github-domains-repos": {
    coreFocus:
      "Public repositories and domains are powerful because they are visible, versioned, and linkable. Those same features can expose secrets and private context.",
    sectionFrame:
      "Use this section to check what a public repo, commit history, domain record, or README reveals before sending the link around.",
    doThis: [
      "Choose one public or draft repository, domain, or project page.",
      "Check for secrets, .env files, private URLs, internal notes, student data, screenshots, contact exposure, and commit-history surprises.",
      "Write what should be removed, rotated, redacted, or moved to private storage.",
      "Record the official reference you used for secret scanning or domain/contact decisions.",
    ],
    evidence: [
      "A public repo and domain exposure check exists for one project.",
      "The check covers README, files, commits, screenshots, secrets, domain/contact details, and student/privacy exposure.",
      "Any real exposed secret is marked for rotation, not merely deletion.",
    ],
    safety: [
      "If a real secret was exposed, rotate it. Deleting the visible file is not enough.",
      "Do not paste live secrets, private repo contents, or sensitive commit history into AI tools.",
      "Do not publish domain/contact details that undermine personal safety or school policy.",
    ],
    artifactAction:
      "Build the public repo and domain exposure check with sections for files, README, commit history, secrets, screenshots, domain/contact exposure, and remediation.",
    checkpointAction:
      "Review the exposure check and choose one change that must happen before the repo or domain is promoted publicly.",
    reflection:
      "What would you remove from a repo before showing it to students, parents, or the public?",
  },
  "10-incident-response": {
    coreFocus:
      "Incident response gives teachers a first-hour plan so panic does not lead to lost evidence, unsafe replies, or delayed escalation.",
    sectionFrame:
      "Use this section to decide what to do first, who to contact, and what not to touch when something goes wrong.",
    doThis: [
      "Choose one scenario: account compromise, phishing click, public data exposure, harassment, lost device, or unsafe website publication.",
      "Write the first three actions that reduce harm without destroying evidence.",
      "Name the contacts: school IT, administrator, platform support, family contact, law enforcement, or official reporting path as appropriate.",
      "Write what information should be documented and what should stay private.",
    ],
    evidence: [
      "An incident response mini-plan exists for at least one realistic teacher scenario.",
      "The plan includes stop action, documentation, contacts, escalation threshold, and recovery step.",
      "The plan avoids asking a teacher to handle serious danger alone.",
    ],
    safety: [
      "Report serious threats to school administration, IT/security, and appropriate authorities. Do not try to handle danger alone.",
      "Do not delete evidence before documenting what happened and asking the right contact what to preserve.",
      "Do not confront harassers, scammers, or impersonators from a personal account.",
    ],
    artifactAction:
      "Build the incident response mini-plan with rows for scenario, first action, evidence to preserve, contact path, recovery step, and follow-up review.",
    checkpointAction:
      "Review the plan and make sure the contact path is specific enough to use under stress.",
    reflection:
      "Who are your first three contacts if an account, site, or public profile becomes unsafe?",
  },
};

function getCyberSectionSlug(section: ChapterSection) {
  return section.number.replace(".", "-");
}

function getCyberSectionHref(chapter: CyberBookChapter, section: ChapterSection) {
  return `${chapter.href}/${getCyberSectionSlug(section)}`;
}

export function getCyberChapterBySlug(slug: string) {
  return CYBER_BOOK_CHAPTERS.find((chapter) => chapter.slug === slug);
}

export function getAllCyberSectionRecords(): CyberSectionRecord[] {
  let index = 0;
  return CYBER_BOOK_CHAPTERS.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      chapter,
      section,
      sectionSlug: getCyberSectionSlug(section),
      href: getCyberSectionHref(chapter, section),
      index: index++,
    })),
  );
}

export function getCyberSectionBySlugs(chapterSlug: string, sectionSlug: string) {
  return getAllCyberSectionRecords().find(
    (record) =>
      record.chapter.slug === chapterSlug && record.sectionSlug === sectionSlug,
  );
}

export function getAdjacentCyberSections(record: CyberSectionRecord) {
  const records = getAllCyberSectionRecords();
  return {
    previous: records[record.index - 1],
    next: records[record.index + 1],
  };
}

export function getCyberSectionContent(
  record: CyberSectionRecord,
): CyberSectionContent {
  const key = `${record.chapter.slug}/${record.sectionSlug}`;
  const authoredContent = CYBER_SECTION_CONTENT[key];

  if (authoredContent) {
    return authoredContent;
  }

  const chapterGuide = CYBER_CHAPTER_CONTENT_GUIDES[record.chapter.slug];

  if (chapterGuide) {
    const isArtifact = record.section.type === "artifact" || record.section.type === "studio";
    const isCheckpoint = record.section.type === "checkpoint";
    const leadAction = isArtifact
      ? chapterGuide.artifactAction
      : isCheckpoint
        ? chapterGuide.checkpointAction
        : `Focus on ${record.section.title}. ${chapterGuide.sectionFrame}`;

    return {
      coreIdea: [
        chapterGuide.coreFocus,
        `${record.section.title} is one piece of ${record.chapter.title}. ${chapterGuide.sectionFrame}`,
      ],
      doThis: [leadAction, ...chapterGuide.doThis],
      evidence: chapterGuide.evidence,
      safety: chapterGuide.safety,
      reflection: chapterGuide.reflection,
    };
  }

  return {
    coreIdea: [
      `This section takes one part of ${record.chapter.title} and turns it into a practical safety habit. The goal is not to memorize another security rule. The goal is to make one part of your digital life safer than it was before.`,
      `For this section, focus on ${record.section.title}. Connect it to your own accounts, devices, profiles, or public presence.`,
    ],
    doThis: [
      "Name the safety problem this section helps you address.",
      "Connect the idea to one real account, device, profile, or habit.",
      "Take one concrete action or write down what you would change.",
      "Save the note or checklist item where you can revisit it.",
    ],
    evidence: [
      "A short note, checklist item, audit result, or action log exists.",
      "The work addresses a specific, real part of your digital presence.",
      "Any safety guidance has been checked against official sources.",
      "The artifact is small enough to maintain and update over time.",
    ],
    safety: [
      record.chapter.safetyCheck,
      "Do not paste live credentials into AI tools or shared documents.",
      "Verify advice against official documentation before acting on it.",
      "Record one note about what you changed and why.",
    ],
  };
}

export function getCyberSectionPracticePrompt(record: CyberSectionRecord) {
  const { chapter, section } = record;

  if (section.type === "artifact" || section.type === "studio") {
    return `Build or revise the ${section.artifact ?? chapter.buildArtifact}. Keep the result practical enough for a real teacher to use immediately.`;
  }

  if (section.type === "checkpoint") {
    return `Review the chapter artifact and write one note about what you would keep, change, or verify before relying on it.`;
  }

  if (section.type === "overview") {
    return `Read the chapter path, name the safety problem this chapter solves, and identify the artifact you will build by the end.`;
  }

  return `Apply this section to your own digital life. Write down one action you can take this week and what it protects.`;
}
