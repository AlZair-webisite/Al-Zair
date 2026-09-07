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
    <section id="about" className="grid bg-[#0d0d0b] text-white lg:grid-cols-2 font-sans">
      <div className="hero-texture flex flex-col justify-center px-8 py-16 sm:px-16 lg:px-[12%] lg:py-20">
        <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[.25em] text-[#c49a4a]">Why Choose Us?</p>
        <h2 className="mt-3 max-w-[440px] font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
          Experience Purity<br />In Every Bite
        </h2>
        <div className="mt-9 space-y-6">
          {reasons.map(([title, copy], index) => (
            <div key={title} className="flex items-start gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c49a4a] text-xs font-bold text-[#d6b15e]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-[#e4c274]">{title}</h3>
                <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-white/75">{copy}</p>
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
