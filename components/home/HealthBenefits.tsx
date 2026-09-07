import Image from 'next/image';
import { Bone, HeartPulse, Lightbulb, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

function StomachIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 2v3.5c0 1.5-1 2.5-2.5 3.5C6.5 10.5 5 12.5 5 15.5c0 3.5 2.8 5.5 6 5.5s6-2 6-5.5c0-2-1-3.5-2-4.5-1-1-1.5-2-1.5-3.5V2" />
      <path d="M8.5 14c1 1.2 2.2 1.6 4 1.2" />
    </svg>
  );
}

const benefits = [
  ['Boosts Energy', 'Instant energy booster', Lightbulb],
  ['Improves Digestion', 'High in fiber, aids healthy digestion', StomachIcon],
  ['Strengthens Bones', 'Rich in calcium and essential minerals', Bone],
  ['Heart Healthy', 'Supports heart health naturally', HeartPulse],
  ['Boosts Immunity', 'Packed with antioxidants and nutrients', ShieldCheck],
] as const;

export function HealthBenefits() {
  return (
    <section className="relative overflow-hidden bg-[#fbf7f0] px-5 py-16 sm:py-20 lg:py-24">
      {/* Left Side Kajures */}
      <div className="pointer-events-none absolute -left-6 top-1/2 z-0 w-28 -translate-y-1/2 select-none sm:-left-8 sm:w-36 md:w-44 lg:-left-8 lg:w-52 xl:w-56">
        <Image
          src="/images/left-side.png"
          alt=""
          width={545}
          height={724}
          className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
          priority
        />
      </div>

      {/* Right Side Kajures */}
      <div className="pointer-events-none absolute -right-6 top-1/2 z-0 w-28 -translate-y-1/2 select-none sm:-right-8 sm:w-36 md:w-44 lg:-right-8 lg:w-52 xl:w-56">
        <Image
          src="/images/right-side.png"
          alt=""
          width={531}
          height={724}
          className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] text-center">
        <SectionHeading
          eyebrow="Health Benefits"
          title="Small Fruit, Big Benefits"
          fontFamily="sans"
        />

        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {benefits.map(([title, copy, Icon]) => (
            <div key={title} className="flex flex-col items-center">
              <Icon size={36} className="mx-auto text-[#b89047]" />
              <h3 className="mt-4 font-sans text-sm font-semibold tracking-tight text-[#171513] sm:text-[15px]">
                {title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-[160px] font-sans text-xs leading-relaxed text-[#5e5a52] sm:text-[13px]">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
