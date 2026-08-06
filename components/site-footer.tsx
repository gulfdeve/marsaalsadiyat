import { Share2, AtSign, Link2 } from "lucide-react";
import { footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <span className="font-serif text-xl tracking-[0.25em] text-foreground">
          {footer.brand}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs tracking-[0.1em] text-muted-foreground">
          <a href={`mailto:${footer.email}`} className="hover:text-gold">
            {footer.email}
          </a>
          <a href={footer.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            WhatsApp
          </a>
          <a href="#" className="hover:text-gold">
            Privacy Policy
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="Social link" className="text-muted-foreground hover:text-gold">
            <Share2 size={18} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Social link" className="text-muted-foreground hover:text-gold">
            <AtSign size={18} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Social link" className="text-muted-foreground hover:text-gold">
            <Link2 size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
