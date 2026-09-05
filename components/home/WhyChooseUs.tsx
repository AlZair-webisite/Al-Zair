import Image from 'next/image';
import { images } from '@/data/products';

const reasons = [
  ['Handpicked Premium Dates', 'Carefully selected for the best quality'],
  ['Hygienically Processed', 'Cleaned and packed with utmost care'],
  ['Trusted Quality', 'Loved by thousands of happy customers'],
  ['Freshness Guaranteed', 'Sealed to preserve natural taste and nutrients'],
];

export function WhyChooseUs() {
  return (
    <section id="about" className="grid bg-[#0d0d0b] text-white lg:grid-cols-2">
      <div className="hero-texture flex flex-col justify-center px-8 py-16 sm:px-16 lg:px-[13%] lg:py-20">
        <p className="text-[9px] font-semibold uppercase tracking-[.24em] text-[#a9823b]">Why Choose Us?</p>
        <h2 className="mt-3 max-w-[390px] font-serif text-4xl leading-[1.03] sm:text-5xl">Experience Purity<br />In Every Bite</h2>
        <div className="mt-9 space-y-5">
          {reasons.map(([title, copy], index) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#a9823b] text-[10px] text-[#c49a4a]">0{index + 1}</span>
              <div>
                <h3 className="text-xs font-semibold text-[#c49a4a]">{title}</h3>
                <p className="mt-1 text-[10px] text-white/55">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[370px] lg:min-h-[590px]">
        <Image src={images.bowl} alt="Dates in an ornate bowl" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </section>
  );
}
