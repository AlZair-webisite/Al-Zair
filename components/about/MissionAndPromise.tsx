import { Award, Heart, Leaf, Package, ShieldCheck } from 'lucide-react';

const promises = [
  {
    icon: Award,
    title: 'Premium Quality',
    desc: 'Only the finest dates make it to our collection.',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    desc: 'No additives, no preservatives, no compromise.',
  },
  {
    icon: Package,
    title: 'Hygienic Packaging',
    desc: 'Carefully packed to retain freshness and quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Freshness Guaranteed',
    desc: 'Sealed to preserve natural taste and nutrients.',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    desc: 'Loved by thousands of happy customers.',
  },
];

export function MissionAndPromise() {
  return (
    <>
      {/* Mission Banner (Dark Section) */}
      <section className="hero-texture relative bg-[#0d0d0b] px-5 py-20 text-white text-center">
        <div className="mx-auto max-w-[900px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#a9823b]">
            Our Mission
          </p>
          <blockquote className="mt-5 text-xl sm:text-2xl lg:text-[28px] font-sans font-normal leading-relaxed text-white/95">
            &ldquo;To bring premium quality dates and dry-fruit products to every family while preserving freshness, nutrition and authentic taste.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* The Syab Promise (Light Section) */}
      <section className="bg-[#f5f0e7] px-5 py-20 text-[#171513]">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#a9823b]">
            Why Syab Dates
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#1a1714] font-sans">
            The Syab Promise
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {promises.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center justify-start rounded-xl border border-[#e4d9c7] bg-white p-7 text-center shadow-[0_4px_18px_rgba(72,53,35,0.05)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(72,53,35,0.12)] hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf7f0] text-[#a9823b]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#1a1714] font-sans">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5e5850] font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
