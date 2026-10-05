import { Landmark } from "lucide-react";
import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";

export async function Amenities() {
  const { amenities } = await getSiteContent();
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">
          <FormattedText html={amenities.eyebrow} />
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          <FormattedText html={amenities.title} />
        </h2>
        <FormattedText
          as="div"
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          html={amenities.body}
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-4">
        {amenities.items.map((item, i) => (
          <Reveal key={item} delay={(i % 4) * 0.06} className="bg-surface p-8">
            <Landmark className="text-gold" size={20} strokeWidth={1.5} />
            <p className="mt-6 font-serif text-lg text-foreground">
              <FormattedText html={item} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
