import Image from "next/image";
import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";
import lifestyleImg from "@/public/images/lifestyle.jpg";

export async function Lifestyle() {
  const { lifestyle } = await getSiteContent();
  return (
    <section id="lifestyle" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-luxe">
            <Image
              src={lifestyleImg}
              alt="Interior of a waterfront residence at dusk"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-gold">
              <FormattedText html={lifestyle.eyebrow} />
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              <FormattedText html={lifestyle.title} />
            </h2>
            <FormattedText
              as="div"
              className="mt-6 text-base leading-relaxed text-muted-foreground"
              html={lifestyle.body}
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-2">
            {lifestyle.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08} className="bg-surface p-6">
                <h3 className="font-serif text-xl text-foreground">
                  <FormattedText html={card.title} />
                </h3>
                <FormattedText
                  as="div"
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  html={card.body}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
