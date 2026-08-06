import Image from "next/image";
import { MapPin } from "lucide-react";
import { connectivity } from "@/lib/content";
import { Reveal } from "./reveal";
import masterplanImg from "@/public/images/masterplan.jpg";

export function Connectivity() {
  return (
    <section id="connectivity" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-gold">{connectivity.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              {connectivity.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {connectivity.body}
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline">
            {connectivity.places.map((place, i) => (
              <Reveal
                key={place.name}
                delay={i * 0.05}
                className="flex items-center gap-3 bg-surface px-5 py-4"
              >
                <MapPin size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                <span className="flex-1 text-sm text-foreground">{place.name}</span>
                <span className="text-[10px] tracking-[0.15em] text-gold">{place.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="relative aspect-square overflow-hidden rounded-luxe lg:aspect-auto">
          <Image
            src={masterplanImg}
            alt="Map of the island location"
            fill
            className="object-cover opacity-80 blur-xl"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
