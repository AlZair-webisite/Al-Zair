import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { allProducts, getProductById } from '@/data/catalog';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | Syab Dates',
    };
  }

  return {
    title: `${product.name} | Syab Dates Dry Fruits`,
    description:
      product.shortDescription ||
      `Buy premium ${product.name} at best price with 100% natural quality guaranteed from Syab Dates.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-[#f7f2ea]">
      <Header />
      <ProductDetailView product={product} />
      <Footer />
    </main>
  );
}
