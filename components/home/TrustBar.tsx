import { Leaf, PackageCheck, Sparkles, Wheat } from 'lucide-react';

const items = [
  ['Premium Quality', 'Finest quality dates sourced with care', Sparkles],
  ['100% Natural', 'No additives, no preservatives, just pure goodness', Leaf],
  ['Rich In Nutrients', 'Packed with energy, fiber and antioxidants', Wheat],
  ['Hygienic Packing', 'Carefully packed to retain freshness', PackageCheck],
] as const;

export function TrustBar() {
  return (
    <section className="border-b border-[#d3cabb] bg-[#f5f0e7] font-sans" aria-label="Why shop with us">
      <div className="mx-auto grid max-w-[1240px] divide-y divide-[#d3cabb] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
        {items.map(([title, copy, Icon]) => (
          <div key={title} className="flex items-center gap-4 px-4 py-6 sm:px-5 lg:py-7">
            <Icon size={28} strokeWidth={1.4} className="shrink-0 text-[#a9823b]" />
            <div>
              <h2 className="text-xs sm:text-[13px] md:text-[13.5px] font-bold uppercase tracking-[.14em] text-[#1a1714]">
                {title}
              </h2>
              <p className="mt-1 max-w-[210px] text-xs sm:text-[13px] leading-snug text-[#5e5a52]">
                {copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
