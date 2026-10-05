import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { iconMap } from "@/lib/icon-map";
import { Reveal } from "./reveal";
import { StatCounter } from "./stat-counter";

export async function Vision() {
  const { vision } = await getSiteContent();
  return (
    <section id="vision" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold">
          <FormattedText html={vision.eyebrow} />
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          <FormattedText html={vision.title} />
        </h2>
        <FormattedText
          as="div"
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          html={vision.body}
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-luxe border border-border-hairline bg-border-hairline sm:grid-cols-2 lg:grid-cols-5">
        {vision.stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] ?? iconMap.gem;
          return (
            <Reveal
              key={stat.caption}
              delay={i * 0.08}
              className="flex flex-col gap-6 bg-surface p-8"
            >
              <Icon className="text-gold" size={22} strokeWidth={1.5} />
              <div className="flex items-baseline gap-1">
                <StatCounter value={stat.value} decimals={stat.decimals} prefix={stat.prefix} />
                <span className="text-sm text-gold">{stat.unit}</span>
              </div>
              <p className="text-xs tracking-[0.15em] text-muted-foreground">
                <FormattedText html={stat.caption} />
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
