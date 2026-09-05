import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { images } from '@/data/products';

export function QualityAndCta() {
  return (
    <>
      {/* Quality Promise Two-Column Banner */}
      <section className="grid bg-[#0d0d0b] text-white lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]">
          <Image
            src={images.macroDates}
            alt="Premium glossy dates close-up"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Dark Story Panel */}
        <div className="hero-texture flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#a9823b]">
            Quality Promise
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-white leading-tight font-sans">
            Every Date Tells a Story of Care
          </h2>
          <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-white/75 font-sans max-w-lg">
            From the palm groves to your table, every step of our process is guided by a commitment to quality. We believe that the best things in life are natural, and we strive to deliver that purity in every pack.
          </p>
        </div>
      </section>

      {/* Experience The Taste Of Purity CTA Banner */}
      <section className="bg-[#f5f0e7] px-5 py-20 text-center text-[#171513]">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#1a1714] font-sans">
            Experience The Taste Of Purity
          </h2>

          {/* Decorative Divider */}
          <div className="mx-auto my-6 flex w-36 sm:w-44 items-center justify-center gap-2">
            <span className="h-px flex-1 bg-[#a9823b]/50" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#a9823b]" />
            <span className="h-px flex-1 bg-[#a9823b]/50" />
          </div>

          <div className="mt-8">
            <a
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full bg-[#b89047] px-8 py-3.5 text-xs font-bold tracking-widest text-[#171513] shadow-[0_4px_16px_rgba(184,144,71,0.25)] transition duration-300 hover:bg-[#a67e35] hover:shadow-[0_6px_22px_rgba(184,144,71,0.35)]"
            >
              SHOP NOW <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
