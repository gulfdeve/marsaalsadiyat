"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "motion/react";

interface StatCounterProps {
  value: number;
  decimals: number;
  prefix?: string;
}

// Counts up from 0 to `value` once it scrolls into view. Isolated from Reveal
// because it needs its own useInView trigger tied to the animated number, not
// a wrapper transform.
export function StatCounter({ value, decimals, prefix = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, value, reduceMotion]);

  return (
    <motion.span ref={ref} className="font-serif text-4xl text-foreground sm:text-5xl">
      {prefix}
      {display.toFixed(decimals)}
    </motion.span>
  );
}
