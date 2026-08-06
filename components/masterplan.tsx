"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { masterplan } from "@/lib/content";
import { iconMap } from "@/lib/icon-map";
import { Reveal } from "./reveal";
import masterplanImg from "@/public/marsa-al-saadiyat-g1.avif";

export function Masterplan() {
  const [active, setActive] = useState<string | null>(null);
  const activeHotspot = masterplan.hotspots.find((h) => h.id === active);

  return (
    <section id="masterplan" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">{masterplan.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {masterplan.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{masterplan.body}</p>
      </Reveal>

      <Reveal className="mt-16 overflow-hidden rounded-luxe border border-border-hairline">
        <div className="relative grid grid-cols-1 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
            {masterplan.legend.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <Icon size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                  <span className="text-[11px] tracking-[0.1em] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative h-[52vh] min-h-[420px] w-full">
            <Image
              src={masterplanImg}
              alt="Masterplan of the waterfront island development"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />

            {masterplan.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                aria-label={hotspot.title}
                onClick={() => setActive(active === hotspot.id ? null : hotspot.id)}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-background/70 text-gold backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold motion-safe:animate-pulse"
              >
                <Plus size={16} />
              </button>
            ))}

            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    left: `${Math.min(activeHotspot.x + 6, 70)}%`,
                    top: `${Math.min(activeHotspot.y + 6, 70)}%`,
                  }}
                  className="absolute z-10 w-64 rounded-luxe border border-gold/40 bg-background/95 p-4 shadow-luxe backdrop-blur-sm"
                >
                  <h3 className="font-serif text-lg text-foreground">{activeHotspot.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {activeHotspot.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
