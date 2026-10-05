import Image from "next/image";
import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { plainTextFromHtml } from "@/lib/formatted-html";
import { Reveal } from "./reveal";
import mansionsImg from "@/public/more_images/private-mansions.webp";
import villasImg from "@/public/more_images/luxury-villas.jpg";
import apartmentsImg from "@/public/more_images/waterfront-apartments.jpg";
import brandedImg from "@/public/more_images/branded-residences.jpg";
import beachesImg from "@/public/more_images/beaches.webp";
import diningImg from "@/public/more_images/promenade-dining.webp";
import marinaImg from "@/public/more_images/marina-yacht-club.jpg";
import parkImg from "@/public/more_images/central-park.webp";

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
        <p className="text-xs tracking-[0.3em] text-gold">
          <FormattedText html={residences.eyebrow} />
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          <FormattedText html={residences.title} />
        </h2>
        <FormattedText
          as="div"
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          html={residences.body}
        />
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
                alt={plainTextFromHtml(tile.label)}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-surface" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-medium tracking-[0.15em] text-foreground">
              <FormattedText html={tile.label} />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
