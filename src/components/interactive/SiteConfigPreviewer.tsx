"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function SiteConfigPreviewer() {
  const [repoName, setRepoName] = useState("my-curriculum-hub");
  const [customDomain, setCustomDomain] = useState("curriculum.myschool.org");
  const [hostPlatform, setHostPlatform] = useState<"github-pages" | "vercel">("github-pages");

  const terminalRef = useRef<HTMLPreElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const getDnsConfig = () => {
    if (hostPlatform === "github-pages") {
      return {
        type: "CNAME",
        host: customDomain.includes(".") ? customDomain.split(".")[0] : "www",
        value: `gh0stlykn1ght.github.io.`,
        ttl: "3600 (1 Hour)",
      };
    }
    return {
      type: "CNAME",
      host: customDomain.includes(".") ? customDomain.split(".")[0] : "www",
      value: "cname.vercel-dns.com.",
      ttl: "60 (Immediate)",
    };
  };

  const getJsonConfig = () => {
    if (hostPlatform === "github-pages") {
      return `{
  "repository": "https://github.com/your-username/${repoName}",
  "cname": "${customDomain}",
  "branch": "gh-pages",
  "build_command": "npm run build",
  "out_dir": "out"
}`;
    }
    return `{
  "projectId": "prj_${repoName.substring(0, 8)}",
  "domain": "${customDomain}",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}`;
  };

  const dns = getDnsConfig();
  const jsonStr = getJsonConfig();

  useEffect(() => {
    // 1. Simulate Terminal Typing using Anime.js
    const term = terminalRef.current;
    if (term) {
      term.textContent = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < jsonStr.length) {
          term.textContent += jsonStr.charAt(i);
          i += 3; // Type 3 chars at a time to keep it snappy
        } else {
          term.textContent = jsonStr; // Ensure clean termination
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [jsonStr]);

  useEffect(() => {
    // 2. Animate DNS details entrance using GSAP
    const elements = tableRef.current?.querySelectorAll(".animate-item");
    if (elements && elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [hostPlatform, customDomain]);

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-100 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 dark:border-stone-800">
        <span className="text-xs font-semibold tracking-wider text-amber-100 uppercase">Interactive Builder</span>
        <h3 className="m-0 text-lg font-bold text-white">Static Site & DNS Previewer</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mt-0">Configuration Settings</h4>
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400">GitHub Repository Name</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
              className="w-full p-2 mt-1.5 border border-stone-250 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 dark:border-stone-700 text-stone-800 dark:text-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400">Custom Domain Name</label>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value.toLowerCase().trim())}
              className="w-full p-2 mt-1.5 border border-stone-250 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 dark:border-stone-700 text-stone-800 dark:text-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400">Hosting Provider</label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setHostPlatform("github-pages")}
                className={`flex-1 p-3 text-center border rounded-xl transition text-xs ${
                  hostPlatform === "github-pages"
                    ? "border-amber-500 bg-amber-50/50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 font-bold"
                    : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}
              >
                GitHub Pages
              </button>
              <button
                onClick={() => setHostPlatform("vercel")}
                className={`flex-1 p-3 text-center border rounded-xl transition text-xs ${
                  hostPlatform === "vercel"
                    ? "border-amber-500 bg-amber-50/50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 font-bold"
                    : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                }`}
              >
                Vercel
              </button>
            </div>
          </div>
        </div>

        {/* Live Output Preview */}
        <div ref={tableRef} className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mt-0">DNS Record Requirement</h4>
          <div className="animate-item p-4 rounded-xl border border-stone-150 bg-stone-50 dark:bg-stone-900 dark:border-stone-800 space-y-2">
            <div className="grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <div>Type</div>
              <div>Host</div>
              <div className="col-span-2">Points To</div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono text-stone-800 dark:text-stone-200">
              <div className="text-amber-600 dark:text-amber-400 font-bold">{dns.type}</div>
              <div>{dns.host}</div>
              <div className="col-span-2 break-all">{dns.value}</div>
            </div>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Config Schema (Simulated Build)</h4>
          <div className="animate-item relative rounded-xl border border-stone-800 bg-stone-950 p-4 font-mono text-[11px] text-emerald-400 shadow-inner">
            <div className="absolute top-2 right-2 text-[9px] font-bold text-stone-600 uppercase tracking-widest">
              Live Terminal Output
            </div>
            <pre ref={terminalRef} className="m-0 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {jsonStr}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
