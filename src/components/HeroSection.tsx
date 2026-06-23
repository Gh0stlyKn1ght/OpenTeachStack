import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[86svh] flex items-center overflow-hidden">
      <Image
        src="/images/teaching-teachers-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-[62%_center] md:object-center"
      />
      <div className="absolute inset-0 z-[1] bg-background/72 md:bg-background/52" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-background via-background/82 to-background/20" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-background/10 via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
        <div className="hero-reveal">
          <span className="inline-block text-xs font-mono font-medium tracking-[0.2em] uppercase text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm bg-background/70">
            Source &middot; Prompt &middot; Build &middot; Verify &middot; Teach
          </span>
        </div>

        <h1 className="hero-reveal hero-reveal-delay-1 mb-6 font-heading text-5xl font-extrabold leading-[1.1] tracking-normal text-foreground sm:text-6xl md:text-7xl">
          Teaching{" "}
          <span className="relative">
            <span className="relative z-10">Teachers</span>
            <span className="hero-underline absolute bottom-1 left-0 z-0 h-3 bg-accent/20" />
          </span>
        </h1>

        <p
          className="hero-reveal hero-reveal-delay-2 text-xl sm:text-2xl text-foreground/80 leading-relaxed max-w-2xl mb-4"
        >
          A field guide for educators entering the tech world.
        </p>

        <p
          className="hero-reveal hero-reveal-delay-3 text-base text-foreground/65 max-w-xl mb-10 leading-relaxed"
        >
          Most teachers are handed platforms, files, templates, logins, and
          expectations. They are not handed a system. Teaching Teachers teaches
          you how to build one without becoming a developer on day one.
        </p>

        <div
          className="hero-reveal hero-reveal-delay-4 flex flex-wrap items-center gap-4 mb-12"
        >
          <Link
            href="/start"
            className="group relative inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline overflow-hidden transition-all duration-300 bg-foreground text-background hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Start Here</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </Link>

          <Link
            href="/book/ots-101"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline border border-border text-foreground/70 hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
          >
            Start OTS-101
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg no-underline border border-border bg-surface/70 text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple hover:text-purple"
          >
            Explore Templates
          </Link>
        </div>

        <div
          className="hero-reveal hero-reveal-delay-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-foreground/45 uppercase tracking-wider"
        >
          <span>10 Chapters</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>Self-Paced</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>CC BY-NC-SA 4.0</span>
          <span className="hidden sm:inline text-foreground/15">|</span>
          <span>Pathway Model</span>
        </div>
        </div>
      </div>

      <div
        className="hero-reveal hero-reveal-delay-5 absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="hero-bounce">
          <svg
            className="w-6 h-6 text-foreground/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


