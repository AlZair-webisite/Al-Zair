export function SectionHeading({
  eyebrow,
  title,
  fontFamily = 'sans',
}: {
  eyebrow: string;
  title: string;
  fontFamily?: 'serif' | 'sans';
}) {
  return (
    <div className="text-center">
      <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[.25em] text-[#a9823b]">{eyebrow}</p>
      <h2
        className={`mt-2 ${
          fontFamily === 'sans'
            ? 'font-sans font-semibold tracking-tight text-3xl sm:text-4xl lg:text-[42px]'
            : 'font-serif text-3xl sm:text-4xl lg:text-5xl'
        } leading-tight text-[#1a1714]`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 flex w-32 sm:w-40 items-center justify-center gap-2">
        <span className="h-px flex-1 bg-[#a9823b]/50" />
        <span className="h-1.5 w-1.5 rotate-45 border border-[#a9823b]" />
        <span className="h-px flex-1 bg-[#a9823b]/50" />
      </div>
    </div>
  );
}
