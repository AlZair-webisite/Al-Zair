import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeaturedProductItem, defaultHomepageContent } from '@/data/homepageContent';
import { images } from '@/data/products';

interface ProductCategoriesProps {
  items?: FeaturedProductItem[];
}

export function ProductCategories({ items }: ProductCategoriesProps) {
  const categoriesList = items && items.length > 0 ? items : defaultHomepageContent.featured_products;

  return (
    <section id="products" className="relative overflow-hidden bg-[#f6f1e8] px-5 py-16 sm:py-20 lg:py-24 font-sans">
      {/* Top Left Leaf Decoration */}
      <div className="pointer-events-none absolute -left-10 -top-10 z-0 w-48 select-none sm:-left-14 sm:-top-14 sm:w-64 md:w-80 lg:-left-20 lg:-top-20 lg:w-[420px] xl:-left-24 xl:-top-24 xl:w-[480px]">
        <Image
          src={images.leave}
          alt=""
          width={600}
          height={325}
          className="h-auto w-full rotate-[165deg] opacity-95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          priority
        />
      </div>

      {/* Bottom Right Leaf Decoration */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 z-0 w-48 select-none sm:-bottom-14 sm:-right-14 sm:w-64 md:w-80 lg:-bottom-20 lg:-right-20 lg:w-[420px] xl:-bottom-24 xl:-right-24 xl:w-[480px]">
        <Image
          src={images.leave}
          alt=""
          width={600}
          height={325}
          className="h-auto w-full -rotate-[15deg] opacity-95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] text-center">
        <SectionHeading eyebrow="Our Products" title="A Treat For Every Taste" />

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4 xl:gap-6">
          {categoriesList.map((category) => (
            <Link
              key={category.id || category.name}
              href={category.link || `/products?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[150px] overflow-hidden rounded-full border-2 border-[#c49a4a]/60 bg-[#0d0d0b] shadow-[0_8px_22px_rgba(72,53,35,0.12)] transition-all duration-500 group-hover:border-[#c49a4a] group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(184,144,71,0.3)] sm:max-w-[165px] lg:max-w-[185px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 185px"
                />
              </div>
              <h3 className="mt-4 text-sm sm:text-base lg:text-[17px] font-semibold tracking-wide text-[#231f1c] transition-colors duration-300 group-hover:text-[#a9823b]">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <Link
            href="/products"
            className="inline-flex rounded-full bg-[#b89047] px-8 py-3.5 text-xs sm:text-[12.5px] font-bold tracking-[.16em] text-[#171513] shadow-[0_4px_14px_rgba(184,144,71,0.25)] transition duration-300 hover:bg-[#a67e35] hover:shadow-[0_6px_20px_rgba(184,144,71,0.35)] font-sans"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
