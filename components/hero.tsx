"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Play } from "lucide-react";
import { hero } from "@/lib/content";
import heroImg from "@/public/TOP PAGE.webp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 150]);

  return (
    <section ref={ref} className="relative flex h-screen min-h-[720px] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Aerial view of the waterfront destination at golden hour"
          fill
          priority
          className="scale-105 object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] text-gold"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.1rem]"
        >
          {hero.titleLead}
          <br />
          {hero.titleLine2}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#register"
            className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-background transition-transform hover:scale-105"
          >
            REGISTER INTEREST
          </a>
          <a
            href="#story"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <Play size={14} fill="currentColor" /> WATCH VIDEO
          </a>
        </motion.div>

        <motion.a
          href="#vision"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: reduceMotion ? 0 : [0, 8, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          className="mt-16 flex flex-col items-center gap-2 text-xs tracking-[0.2em] text-white/70"
        >
          SCROLL
          <span aria-hidden>⌄</span>
        </motion.a>
      </div>
    </section>
  );
}
