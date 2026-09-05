import Image from 'next/image';
import { images } from '@/data/products';

export function OurStory() {
  return (
    <section className="bg-[#f5f0e7] px-5 py-16 sm:py-24 text-[#171513]">
      <div className="mx-auto max-w-[1200px] grid gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center">
        {/* Left Image */}
        <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl shadow-[0_12px_32px_rgba(72,53,35,0.12)]">
          <Image
            src={images.bowl}
            alt="Handpicked premium dates in ornate bowl"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#a9823b]">
            Our Story
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#1a1714] leading-tight font-sans">
            A Journey of Purity &amp; Taste
          </h2>

          <div className="mt-6 space-y-4 text-sm sm:text-[15px] leading-relaxed text-[#4a453e] font-sans">
            <p>
              Syab Dates was born from a simple belief — that nature&apos;s gifts should be enjoyed in their purest form. We travel to the finest date-growing regions to source premium quality dates, selected with care and packed with love.
            </p>
            <p>
              Our commitment to quality begins at the source. Every batch is handpicked, carefully inspected, and processed in a hygienic environment to ensure you receive nothing but the best.
            </p>
            <p>
              We combine traditional values with modern processing techniques to bring you dates that are as nutritious as they are delicious — preserving the authentic taste that nature intended.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
