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
