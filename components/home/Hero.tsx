import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/data/products';

export function Hero() {
  return (
    <section id="home" className="hero-texture relative overflow-hidden bg-[#0d0d0b] text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(145,95,35,0.22),transparent_45%)]" />

      <div className="relative mx-auto flex max-w-[1280px] flex-col justify-between px-5 pt-28 sm:pt-32 lg:flex-row lg:items-center lg:px-8 lg:pt-24 lg:pb-8">
        {/* Left Content */}
        <div className="z-10 max-w-[580px] pb-4 sm:pb-6 lg:max-w-[560px] lg:pb-0">
          <h1 className="font-serif text-[38px] leading-[1.05] tracking-[-0.025em] sm:text-[52px] md:text-[58px] lg:text-[64px] xl:text-[72px]">
            <span className="block whitespace-nowrap text-[#c49a4a]">Nature&apos;s Finest</span>
            <span className="block whitespace-nowrap text-white">Gift For You</span>
          </h1>

          {/* Decorative Divider */}
          <div className="my-4 sm:my-5 flex items-center gap-3">
            <span className="h-px w-16 bg-[#c49a4a]/70" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#c49a4a]" />
            <span className="h-px w-16 bg-[#c49a4a]/70" />
          </div>

          <p className="max-w-[400px] text-xs leading-6 text-white/75 sm:text-[14px] sm:leading-7">
            Indulge in the richness of premium quality dates. Pure, wholesome and naturally delicious.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <a
              href="#products"
              className="inline-flex items-center gap-3 rounded-full bg-[#b89047] px-7 py-3.5 text-[10px] font-bold tracking-[.18em] text-[#171513] transition hover:bg-[#a67e35]"
            >
              SHOP NOW <ArrowRight size={13} />
            </a>
            <a
              href="#products"
              className="inline-flex items-center rounded-full border border-[#c49a4a]/70 px-7 py-3.5 text-[10px] font-bold tracking-[.14em] text-[#f5f0e7] transition hover:bg-[#c49a4a] hover:text-[#171513]"
            >
              EXPLORE PRODUCTS
            </a>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="relative mx-auto mt-3 flex aspect-[1.5] w-full max-w-[440px] items-center justify-center sm:max-w-[500px] lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-[480px] lg:w-[52%] lg:max-w-none xl:h-[520px] xl:w-[54%]">
          <div className="pointer-events-none absolute bottom-4 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-full bg-[#c49a4a]/25 blur-3xl" />
          <Image
            src={images.hero}
            alt="Syab Dates - Premium Halasi Dates"
            fill
            className="object-contain object-center drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:scale-[1.02]"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 700px"
          />
        </div>
      </div>
    </section>
  );
}
