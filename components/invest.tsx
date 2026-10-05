import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { iconMap } from "@/lib/icon-map";
import { Reveal } from "./reveal";

export async function Invest() {
  const { invest } = await getSiteContent();
  return (
    <section id="invest" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">
          <FormattedText html={invest.eyebrow} />
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          <FormattedText html={invest.title} />
        </h2>
        <FormattedText
          as="div"
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          html={invest.body}
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {invest.cards.map((card, i) => {
          const Icon = iconMap[card.icon] ?? iconMap.gem;
          return (
            <Reveal key={card.title} delay={(i % 3) * 0.08} className="bg-surface p-8">
              <Icon className="text-gold" size={22} strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-xl text-foreground">
                <FormattedText html={card.title} />
              </h3>
              <FormattedText
                as="div"
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
                html={card.body}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
