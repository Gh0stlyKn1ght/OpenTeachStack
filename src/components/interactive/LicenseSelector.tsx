"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { animate } from "animejs";

type Answer = "yes" | "no" | "share-alike";

export default function LicenseSelector() {
  const [commercial, setCommercial] = useState<Answer | null>(null);
  const [modify, setModify] = useState<Answer | null>(null);
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setCommercial(null);
    setModify(null);
    setStep(1);
  };

  useEffect(() => {
    if (step === 3 && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
      );

      const badges = resultRef.current.querySelectorAll(".license-badge");
      if (badges.length > 0) {
        animate(badges, {
          translateY: [15, 0],
          opacity: [0, 1],
          delay: (_, i) => (i || 0) * 120,
          duration: 400,
          easing: "easeOutCubic",
        });
      }
    } else if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelector(`.step-${step}`),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [step]);

  const getRecommendation = () => {
    if (commercial === "yes" && modify === "yes") {
      return {
        name: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
        code: "CC BY 4.0",
        description: "Allows anyone to share, reuse, modify, and build upon your curriculum for any purpose, including commercially. Ideal for maximum reach.",
        link: "https://creativecommons.org/licenses/by/4.0/",
      };
    }
    if (commercial === "no" && modify === "yes") {
      return {
        name: "Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)",
        code: "CC BY-NC 4.0",
        description: "Allows sharing and modification, but strictly for non-commercial educational use. Prevents commercial entities from selling your classroom work.",
        link: "https://creativecommons.org/licenses/by-nc/4.0/",
      };
    }
    if (commercial === "no" && modify === "share-alike") {
      return {
        name: "Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)",
        code: "CC BY-NC-SA 4.0",
        description: "Open TeachStack content license. Allows non-commercial reuse and modifications, but requires others to release their changes under the same license.",
        link: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      };
    }
    if (commercial === "yes" && modify === "share-alike") {
      return {
        name: "Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
        code: "CC BY-SA 4.0",
        description: "Allows commercial use and modifications, but forces any derivative works to use the same license. Wikipedia's license of choice.",
        link: "https://creativecommons.org/licenses/by-sa/4.0/",
      };
    }
    return {
      name: "Attribution-NonCommercial-NoDerivatives 4.0 (CC BY-NC-ND 4.0)",
      code: "CC BY-NC-ND 4.0",
      description: "Allows others to download and share your work, but they cannot change it in any way or use it commercially. Best for static guides.",
      link: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    };
  };

  const rec = getRecommendation();

  return (
    <div
      ref={containerRef}
      className="my-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900"
    >
      <div className="border-b border-stone-100 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 dark:border-stone-800">
        <span className="text-xs font-semibold tracking-wider text-emerald-100 uppercase">Interactive Builder</span>
        <h3 className="m-0 text-lg font-bold text-white">Educator License Selector</h3>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="step-1">
            <h4 className="mt-0 text-base font-semibold text-stone-800 dark:text-stone-200">1. Commercial Use Policy</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Should commercial platforms or other entities be allowed to sell or monetize your curriculum material?
            </p>
            <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
              <button
                onClick={() => {
                  setCommercial("yes");
                  setStep(2);
                }}
                className="flex flex-col items-start p-4 text-left transition border rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 border-stone-200 dark:border-stone-800 dark:hover:bg-emerald-950/20"
              >
                <strong className="text-stone-800 dark:text-stone-200">Yes, allow commercial use</strong>
                <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">Max reuse: content can be featured on commercial resource networks.</span>
              </button>
              <button
                onClick={() => {
                  setCommercial("no");
                  setStep(2);
                }}
                className="flex flex-col items-start p-4 text-left transition border rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 border-stone-200 dark:border-stone-800 dark:hover:bg-emerald-950/20"
              >
                <strong className="text-stone-800 dark:text-stone-200">No, non-commercial only</strong>
                <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">Protective: limits distribution strictly to free and teacher-to-teacher networks.</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <h4 className="mt-0 text-base font-semibold text-stone-800 dark:text-stone-200">2. Derivative Works and Sharing</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Can other educators adapt, rearrange, or modify your lesson files to fit their class rules?
            </p>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <button
                onClick={() => {
                  setModify("yes");
                  setStep(3);
                }}
                className="flex flex-col items-start p-4 text-left transition border rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 border-stone-200 dark:border-stone-800 dark:hover:bg-emerald-950/20"
              >
                <strong className="text-stone-800 dark:text-stone-200">Yes, fully modify</strong>
                <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">Teachers can adapt, translate, remix, and share modified lessons.</span>
              </button>
              <button
                onClick={() => {
                  setModify("share-alike");
                  setStep(3);
                }}
                className="flex flex-col items-start p-4 text-left transition border rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 border-stone-200 dark:border-stone-800 dark:hover:bg-emerald-950/20"
              >
                <strong className="text-stone-800 dark:text-stone-200">Yes, as long as they share under the same license (Copyleft)</strong>
                <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">Remixes must stay open source. Excellent for community hubs.</span>
              </button>
              <button
                onClick={() => {
                  setModify("no");
                  setStep(3);
                }}
                className="flex flex-col items-start p-4 text-left transition border rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 border-stone-200 dark:border-stone-800 dark:hover:bg-emerald-950/20"
              >
                <strong className="text-stone-800 dark:text-stone-200">No, keep verbatim only</strong>
                <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">Allows sharing copies but forbids modifications, remixes, or partial extracts.</span>
              </button>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              ← Back to Step 1
            </button>
          </div>
        )}

        {step === 3 && (
          <div ref={resultRef} className="step-3 opacity-0">
            <h4 className="mt-0 text-base font-semibold text-emerald-600 dark:text-emerald-400">Recommended Curriculum License</h4>
            <div className="p-5 mt-3 border border-emerald-100 bg-emerald-50/20 rounded-2xl dark:border-emerald-950/30">
              <div className="flex items-center gap-3">
                <span className="license-badge flex h-10 w-24 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white shadow-sm shadow-emerald-400/20">
                  {rec.code}
                </span>
                <strong className="text-stone-800 dark:text-stone-200">{rec.name}</strong>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {rec.description}
              </p>
              <a
                href={rec.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Read Official CC License Deed →
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={reset}
                className="rounded-lg bg-stone-100 px-4 py-2 text-xs font-bold text-stone-700 transition hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
              >
                Reset Selector
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
