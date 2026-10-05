import { MapPin } from "lucide-react";
import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";

export async function Connectivity() {
  const { connectivity } = await getSiteContent();
  return (
    <section id="connectivity" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-gold">
              <FormattedText html={connectivity.eyebrow} />
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              <FormattedText html={connectivity.title} />
            </h2>
            <FormattedText
              as="div"
              className="mt-6 text-base leading-relaxed text-muted-foreground"
              html={connectivity.body}
            />
          </Reveal>

          <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline">
            {connectivity.places.map((place, i) => (
              <Reveal
                key={place.name}
                delay={i * 0.05}
                className="flex items-center gap-3 bg-surface px-5 py-4"
              >
                <MapPin size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                <span className="flex-1 text-sm text-foreground">
                  <FormattedText html={place.name} />
                </span>
                <span className="text-[10px] tracking-[0.15em] text-gold">
                  <FormattedText html={place.tag} />
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="relative aspect-square overflow-hidden rounded-luxe lg:aspect-auto">
          <iframe
            title="Map of Saadiyat Island"
            src="https://maps.google.com/maps?q=24.5302924,54.4451578&z=13&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
