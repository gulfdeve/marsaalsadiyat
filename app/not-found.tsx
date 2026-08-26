import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-background transition-transform hover:scale-105"
      >
        RETURN HOME
      </Link>
    </main>
  );
}
