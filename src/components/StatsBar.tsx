"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="font-serif text-4xl sm:text-5xl font-bold text-accent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-foreground/50 font-sans uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface-alt/50 py-16">
      <div className="mx-auto max-w-4xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <AnimatedStat value={13} suffix="" label="Modules" delay={0} />
        <AnimatedStat value={30} suffix="+" label="Lessons" delay={0.1} />
        <AnimatedStat value={16} suffix="" label="Pro Tools" delay={0.2} />
        <AnimatedStat value={14} suffix="" label="Prompt Templates" delay={0.3} />
      </div>
    </section>
  );
}
