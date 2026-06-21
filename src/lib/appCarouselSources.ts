export interface AppCarouselSource {
  name: string;
  category: string;
  appUrl: string;
  icon: string;
  color: string;
  mark?: "github";
}

export const appCarouselSources: AppCarouselSource[] = [
  {
    name: "Google Drive",
    category: "File System",
    appUrl: "https://drive.google.com",
    icon: "D",
    color: "#4285F4",
  },
  {
    name: "Google Docs",
    category: "Writing",
    appUrl: "https://docs.google.com/document",
    icon: "Doc",
    color: "#4285F4",
  },
  {
    name: "Google Sheets",
    category: "Data",
    appUrl: "https://sheets.google.com",
    icon: "+",
    color: "#0F9D58",
  },
  {
    name: "Google Forms",
    category: "Assessment",
    appUrl: "https://forms.google.com",
    icon: "F",
    color: "#673AB7",
  },
  {
    name: "Google Slides",
    category: "Presentation",
    appUrl: "https://slides.google.com",
    icon: "S",
    color: "#F4B400",
  },
  {
    name: "Google Classroom",
    category: "Delivery",
    appUrl: "https://classroom.google.com",
    icon: "GC",
    color: "#1A73E8",
  },
  {
    name: "Google AI Studio",
    category: "AI Lab",
    appUrl: "https://aistudio.google.com",
    icon: "AI",
    color: "#8E75B2",
  },
  {
    name: "Apps Script",
    category: "Automation",
    appUrl: "https://script.google.com",
    icon: "{}",
    color: "#0F9D58",
  },
  {
    name: "ChatGPT",
    category: "AI Assistant",
    appUrl: "https://chatgpt.com",
    icon: "O",
    color: "#10A37F",
  },
  {
    name: "Claude",
    category: "AI Assistant",
    appUrl: "https://claude.ai",
    icon: "C",
    color: "#bb9af7",
  },
  {
    name: "GitHub",
    category: "Version Control",
    appUrl: "https://github.com",
    icon: "",
    color: "#181717",
    mark: "github",
  },
  {
    name: "VS Code",
    category: "Editor",
    appUrl: "https://code.visualstudio.com",
    icon: "<>",
    color: "#007ACC",
  },
  {
    name: "Markdown",
    category: "Content",
    appUrl: "https://commonmark.org",
    icon: "M",
    color: "#34548a",
  },
  {
    name: "Mermaid",
    category: "Diagrams",
    appUrl: "https://mermaid.js.org",
    icon: "M",
    color: "#f7768e",
  },
  {
    name: "Canva",
    category: "Design",
    appUrl: "https://www.canva.com",
    icon: "C",
    color: "#00C4CC",
  },
  {
    name: "YouTube",
    category: "Video Source",
    appUrl: "https://www.youtube.com",
    icon: "YT",
    color: "#FF0000",
  },
  {
    name: "OBS Studio",
    category: "Recording",
    appUrl: "https://obsproject.com",
    icon: "O",
    color: "#302E31",
  },
  {
    name: "MDN Web Docs",
    category: "Web Reference",
    appUrl: "https://developer.mozilla.org",
    icon: "MDN",
    color: "#0f0f14",
  },
  {
    name: "Next.js",
    category: "Course Sites",
    appUrl: "https://nextjs.org",
    icon: "N",
    color: "#0f0f14",
  },
  {
    name: "Vercel",
    category: "Publishing",
    appUrl: "https://vercel.com",
    icon: "V",
    color: "#0f0f14",
  },
];
