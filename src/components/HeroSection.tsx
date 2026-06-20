"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[82svh] flex items-center overflow-hidden">
      <div className="hero-grid absolute inset-0 z-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-mono font-medium tracking-[0.2em] uppercase text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm bg-background/50">
            AI Literacy &middot; Standards &middot; Automation &middot; Open Resources
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-normal text-foreground leading-[1.1] mb-6"
        >
          Open{" "}
          <span className="relative">
            <span className="relative z-10">TeachStack</span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-1 left-0 h-3 bg-accent/20 z-0"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-4"
        >
          Open-source systems for modern teaching.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-foreground/50 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A learning pathway for educators who want to design better
          curriculum, use AI responsibly, automate repetitive work, and build
          teaching systems they actually control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-12"
        >
          <Link
            href="/course"
            className="group relative inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline overflow-hidden transition-all duration-300 bg-foreground text-background hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Start OTS-101</span>
            <motion.span
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="/pathway"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline border border-border text-foreground/70 hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
          >
            View Pathway
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline border border-border bg-surface/70 text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple hover:text-purple"
          >
            Explore Templates
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-mono text-foreground/35 uppercase tracking-wider"
        >
          <span>10 Modules</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>Self-Paced</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>CC BY-NC-SA 4.0</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>Pathway Model</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-foreground/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
