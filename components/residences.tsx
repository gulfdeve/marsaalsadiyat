import Image from "next/image";
import { residences } from "@/lib/content";
import { Reveal } from "./reveal";
import heroImg from "@/public/images/hero.jpg";
import lifestyleImg from "@/public/images/lifestyle.jpg";
import nightImg from "@/public/images/night.jpg";

const images = { hero: heroImg, lifestyle: lifestyleImg, night: nightImg } as const;

export function Residences() {
  return (
    <section id="residences" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">{residences.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {residences.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{residences.body}</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {residences.tiles.map((tile, i) => (
          <Reveal
            key={tile.id}
            delay={(i % 4) * 0.06}
            className={`group relative overflow-hidden rounded-luxe ${
              tile.span === "tall" ? "sm:row-span-2 aspect-[3/4]" : "aspect-square"
            }`}
          >
            {tile.image ? (
              <Image
                src={images[tile.image as keyof typeof images]}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-background" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-medium tracking-[0.15em] text-foreground">
              {tile.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
