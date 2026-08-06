import { Landmark } from "lucide-react";
import { amenities } from "@/lib/content";
import { Reveal } from "./reveal";

export function Amenities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">{amenities.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {amenities.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{amenities.body}</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-4">
        {amenities.items.map((item, i) => (
          <Reveal key={item} delay={(i % 4) * 0.06} className="bg-surface p-8">
            <Landmark className="text-gold" size={20} strokeWidth={1.5} />
            <p className="mt-6 font-serif text-lg text-foreground">{item}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
