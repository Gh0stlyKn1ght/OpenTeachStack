"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { animate } from "animejs";

export default function ThreatProfileEstimator() {
  const [profileSize, setProfileSize] = useState(2); // 1 = Private, 2 = School-level, 3 = Public/Shared
  const [deviceSharing, setDeviceSharing] = useState(2); // 1 = Isolated, 2 = School-owned/Shared, 3 = Family-shared
  const [studentContact, setStudentContact] = useState(2); // 1 = Low (Adult Ed), 2 = Standard (Secondary), 3 = High/Public

  const gaugeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Exposure calculation
  const score = profileSize * 1.2 + deviceSharing * 1.5 + studentContact * 1.3;
  // Maximum possible score: 3*1.2 + 3*1.5 + 3*1.3 = 3.6 + 4.5 + 3.9 = 12.0
  // Minimum possible score: 1.2 + 1.5 + 1.3 = 4.0
  const maxScore = 12;
  const percentage = (score / maxScore) * 100;

  let label = "Low Exposure Risk";
  let colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  let gaugeColor = "#10b981"; // Emerald
  let actions = [
    "Verify your multi-factor authentication (MFA) recovery codes are saved in a offline location.",
    "Perform a quick browser extension inventory and delete unused extensions.",
    "Keep personal logins completely isolated from your school-issued browser profile."
  ];

  if (score >= 9.5) {
    label = "Critical Exposure Risk";
    colorClass = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    gaugeColor = "#f43f5e"; // Rose
    actions = [
      "Review account recovery phone numbers on all Google Workspace profiles; isolate personal emails.",
      "Run full audits on active GitHub tokens, Vercel keys, and third-party script integrations.",
      "Check school board policies regarding public curriculum hubs and Student Data Privacy constraints."
    ];
  } else if (score >= 7.0) {
    label = "Moderate Exposure Risk";
    colorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    gaugeColor = "#f59e0b"; // Amber
    actions = [
      "Separate public educator identities (like GitHub, Twitter/X) from school domain emails.",
      "Enforce screen-lock schedules on all devices used to grade or build curriculum.",
      "Avoid uploading lesson screenshots showing any school internal schedules or names."
    ];
  }

  useEffect(() => {
    // 1. Rotate Needle using Anime.js
    const degrees = (percentage / 100) * 180 - 90; // -90 to +90 degrees
    const needle = gaugeRef.current?.querySelector(".gauge-needle");
    if (needle) {
      animate(needle, {
        rotate: degrees,
        duration: 600,
        easing: "easeOutElastic(1, .8)",
      });
    }

    // 2. Fade/Slide Actions using GSAP
    if (cardsRef.current) {
      const items = cardsRef.current.querySelectorAll(".action-card");
      gsap.killTweensOf(items);
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [percentage, score]);

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-100 bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-4 dark:border-stone-800">
        <span className="text-xs font-semibold tracking-wider text-indigo-100 uppercase">Interactive Modeler</span>
        <h3 className="m-0 text-lg font-bold text-white">Teacher Threat Profile Estimator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 p-6 gap-6">
        {/* Controls */}
        <div className="md:col-span-3 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              1. Digital Profile Scope
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { val: 1, name: "Private", desc: "Local / School-only" },
                { val: 2, name: "Shared", desc: "Curriculum Hub" },
                { val: 3, name: "Public", desc: "Sizable Audience" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setProfileSize(opt.val)}
                  className={`p-3 text-center border rounded-xl transition ${
                    profileSize === opt.val
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 font-bold"
                      : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <div className="text-xs">{opt.name}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              2. Device Compartmentalization
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { val: 1, name: "Dedicated", desc: "Isolate browser" },
                { val: 2, name: "Standard", desc: "School-issued" },
                { val: 3, name: "Shared", desc: "Family browser" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setDeviceSharing(opt.val)}
                  className={`p-3 text-center border rounded-xl transition ${
                    deviceSharing === opt.val
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 font-bold"
                      : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <div className="text-xs">{opt.name}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              3. Classroom Contact Surface
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { val: 1, name: "Minimal", desc: "Isolated groups" },
                { val: 2, name: "Secondary", desc: "Active students" },
                { val: 3, name: "Broad", desc: "High student tech" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setStudentContact(opt.val)}
                  className={`p-3 text-center border rounded-xl transition ${
                    studentContact === opt.val
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 font-bold"
                      : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <div className="text-xs">{opt.name}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gauge & Actions Output */}
        <div className="md:col-span-2 flex flex-col items-center justify-between border-t md:border-t-0 md:border-l border-stone-100 dark:border-stone-800 pt-6 md:pt-0 md:pl-6">
          <div ref={gaugeRef} className="relative flex flex-col items-center justify-center w-full">
            <svg viewBox="0 0 100 55" className="w-40 h-auto">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeLinecap="round"
                className="dark:stroke-stone-800"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke={gaugeColor}
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * percentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <g className="gauge-needle origin-[50px_50px] transition-transform duration-300">
                <line x1="50" y1="50" x2="50" y2="15" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="50" cy="50" r="4" fill="#4f46e5" />
              </g>
            </svg>
            <div className={`mt-3 text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${colorClass}`}>
              {label}
            </div>
          </div>

          <div ref={cardsRef} className="w-full mt-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mt-0">Required Action Items</h4>
            {actions.map((act, index) => (
              <div
                key={index}
                className="action-card flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-sm shadow-indigo-400/20">
                  {index + 1}
                </span>
                <p className="m-0 leading-relaxed">{act}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
