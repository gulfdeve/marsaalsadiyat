"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { story } from "@/lib/content";
import { Reveal } from "./reveal";
import nightImg from "@/public/images/night.jpg";

export function StoryVideo() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <section id="story" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <Image
        src={nightImg}
        alt="Cinematic film of the waterfront destination"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      <Reveal className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-gold">{story.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
          {story.title}
        </h2>
        <button
          ref={triggerRef}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold transition-transform hover:scale-110"
        >
          <Play size={22} fill="currentColor" />
        </button>
        <p className="mt-4 text-xs tracking-[0.2em] text-white/70">{story.videoLabel}</p>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={story.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
            onClick={close}
            onKeyDown={(e) => e.key === "Escape" && close()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-3xl rounded-luxe border border-border-hairline bg-surface"
            >
              <button
                onClick={close}
                aria-label="Close video"
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center text-foreground"
              >
                <X size={22} />
              </button>
              <div className="flex h-full w-full items-center justify-center text-xs tracking-[0.2em] text-muted-foreground">
                {story.videoLabel}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
