import { PrivacyContent } from '@/components/legal/PrivacyContent';
import { PrivacyHero } from '@/components/legal/PrivacyHero';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Privacy Policy | Syab Dates Dry Fruits',
  description: 'Read the Privacy Policy for Syab Dates Dry Fruits regarding the collection, use, and protection of your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <PrivacyHero />
      <PrivacyContent />
      <Footer />
    </main>
  );
}
