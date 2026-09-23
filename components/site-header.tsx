"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useSiteContent } from "@/components/site-content-provider";

export function SiteHeader() {
  const { nav, footer } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const onLight = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gold"
      />
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-border-hairline bg-background/80 px-4 py-2 shadow-luxe backdrop-blur-md sm:px-6"
              : "border-transparent bg-transparent px-2 py-3"
          }`}
        >
          <a
            href="#"
            className={`font-serif text-xl tracking-[0.25em] transition-colors ${onLight ? "text-foreground" : "text-white"}`}
          >
            {footer.brand}
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs tracking-[0.15em] transition-colors hover:text-gold ${
                  scrolled ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#register"
            className="hidden rounded-full bg-gold px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-background transition-transform hover:scale-105 sm:inline-block"
          >
            REGISTER INTEREST
          </a>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center transition-colors lg:hidden ${
              onLight ? "text-foreground" : "text-white"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-8 pt-16"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-[0.15em] text-background"
              >
                REGISTER INTEREST
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
