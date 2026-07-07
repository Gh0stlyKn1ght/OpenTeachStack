"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { animate } from "animejs";

interface LessonAnimatedEntryProps {
  children: React.ReactNode;
  lessonType?: string;
}

/**
 * Wraps the lesson body with GSAP entrance animations and
 * Anime.js progress-step reveal for Do This numbered lists.
 *
 * - GSAP: staggers the prose sections on mount
 * - Anime.js: animates numbered Do This steps in sequentially
 */
export default function LessonAnimatedEntry({
  children,
  lessonType,
}: LessonAnimatedEntryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // --- GSAP: stagger-fade each top-level prose section on mount ---
    const sections = wrapper.querySelectorAll(
      "h2, .instructional-block, .takeaway-strip, blockquote, table, pre"
    );

    if (sections.length > 0) {
      gsap.fromTo(
        sections,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "transform",
        }
      );
    }

    // --- Anime.js: reveal numbered Do This steps sequentially ---
    const isProcess =
      lessonType === "artifact-build" || lessonType === "workflow";

    if (isProcess) {
      // Find the "Do This" heading and grab the OL directly after it
      const headings = Array.from(wrapper.querySelectorAll("h2"));
      const doThisHeading = headings.find((h) =>
        h.textContent?.trim().toLowerCase().startsWith("do this")
      );

      if (doThisHeading) {
        let sibling = doThisHeading.nextElementSibling;
        while (sibling && sibling.tagName !== "OL") {
          sibling = sibling.nextElementSibling;
        }
        const steps = sibling?.querySelectorAll("li");
        if (steps && steps.length > 0) {
          // Start hidden
          steps.forEach((s) => {
            (s as HTMLElement).style.opacity = "0";
            (s as HTMLElement).style.transform = "translateX(-12px)";
          });

          // Small delay to let GSAP finish first
          setTimeout(() => {
            steps.forEach((step, i) => {
              animate(step as HTMLElement, {
                opacity: [0, 1],
                translateX: [-12, 0],
                delay: 320 + i * 90,
                duration: 360,
                easing: "easeOutQuart",
              });
            });
          }, 200);
        }
      }
    }
  }, [lessonType]);

  return (
    <div ref={wrapperRef} className="lesson-animated-entry">
      {children}
    </div>
  );
}
