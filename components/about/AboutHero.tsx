export function AboutHero() {
  return (
    <section className="hero-texture relative overflow-hidden bg-[#0d0d0b] px-5 pt-36 pb-20 sm:pt-44 sm:pb-28 text-white text-center">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(145,95,35,0.18),transparent_55%)]" />

      <div className="relative mx-auto max-w-[900px] z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#a9823b]">
          Our Story
        </p>

        <h1 className="mt-4 font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
          About Syab Dates
        </h1>

        {/* Decorative Divider */}
        <div className="mx-auto my-6 flex w-36 sm:w-44 items-center justify-center gap-2">
          <span className="h-px flex-1 bg-[#a9823b]/50" />
          <span className="h-1.5 w-1.5 rotate-45 border border-[#a9823b]" />
          <span className="h-px flex-1 bg-[#a9823b]/50" />
        </div>

        <p className="mx-auto max-w-[620px] text-sm sm:text-base text-white/70 leading-relaxed font-sans">
          Bringing nature&apos;s finest dates and dry-fruit creations to your table.
        </p>
      </div>
    </section>
  );
}
