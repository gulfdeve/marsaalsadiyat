import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./reveal";
import { RegisterForm } from "./register-form";
import heroImg from "@/public/images/hero.jpg";

export async function RegisterSection() {
  const { registerForm } = await getSiteContent();
  return (
    <section id="register" className="relative min-h-[600px] overflow-hidden py-24 sm:py-32">
      <Image
        src={heroImg}
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-gold">{registerForm.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {registerForm.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {registerForm.body}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <RegisterForm />
        </Reveal>
      </div>
    </section>
  );
}
