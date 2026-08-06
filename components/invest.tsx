import { invest } from "@/lib/content";
import { iconMap } from "@/lib/icon-map";
import { Reveal } from "./reveal";

export function Invest() {
  return (
    <section id="invest" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">{invest.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {invest.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{invest.body}</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {invest.cards.map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <Reveal key={card.title} delay={(i % 3) * 0.08} className="bg-surface p-8">
              <Icon className="text-gold" size={22} strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-xl text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
