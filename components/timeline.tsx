import { timeline } from "@/lib/content";
import { Reveal } from "./reveal";

export function Timeline() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-xs tracking-[0.3em] text-gold">{timeline.eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {timeline.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {timeline.body}
        </p>
      </Reveal>

      <div className="mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto scrollbar-gold pb-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible lg:grid-cols-5">
        {timeline.phases.map((phase, i) => (
          <Reveal
            key={phase.phase}
            delay={i * 0.08}
            className="w-72 shrink-0 snap-start sm:w-auto"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
              <div className="h-px flex-1 bg-border-hairline" />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.2em] text-gold">PHASE {phase.phase}</p>
            <h3 className="mt-2 font-serif text-xl text-foreground">{phase.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
