import Image from "next/image";
import { FormattedText } from "@/components/formatted-text";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";
import nightImg from "@/public/images/night.jpg";

export async function FinalCta() {
  const { finalCta } = await getSiteContent();
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-24">
      <Image src={nightImg} alt="" fill aria-hidden className="object-cover" sizes="100vw" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
          <FormattedText html={finalCta.title} />
        </h2>
        <FormattedText
          as="div"
          className="mt-4 text-base leading-relaxed text-white/80"
          html={finalCta.body}
        />
        <a
          href="#register"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-background transition-transform hover:scale-105"
        >
          REGISTER YOUR INTEREST
        </a>
      </Reveal>
    </section>
  );
}
