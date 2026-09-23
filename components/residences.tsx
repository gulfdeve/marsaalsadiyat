import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";
import mansionsImg from "@/public/more_images/PRIVATE MANSIONS.webp";
import villasImg from "@/public/more_images/LUXURY VILLAS.jpg.jpeg";
import apartmentsImg from "@/public/more_images/WATERFRONT APARTMENTS.jpg.jpeg";
import brandedImg from "@/public/more_images/BRANDED RESIDENCES.jpg.jpeg";
import beachesImg from "@/public/more_images/BEACHES.webp";
import diningImg from "@/public/more_images/PROMENADE DINING.webp";
import marinaImg from "@/public/more_images/MARINA & YACHT CLUB.jpg.jpeg";
import parkImg from "@/public/more_images/CENTRAL PARK.webp";

const images = {
  mansions: mansionsImg,
  villas: villasImg,
  apartments: apartmentsImg,
  branded: brandedImg,
  beaches: beachesImg,
  dining: diningImg,
  marina: marinaImg,
  park: parkImg,
} as const;

export async function Residences() {
  const { residences } = await getSiteContent();
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
            {images[tile.id as keyof typeof images] ? (
              <Image
                src={images[tile.id as keyof typeof images]}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-surface" />
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
