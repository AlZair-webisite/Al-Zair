export type ProductCategory = {
  name: string;
  image: string;
  alt: string;
};

export const images = {
  logo: '/images/logo.png',
  hero: '/images/hero-image.png',
  leave: '/images/leave.png',
  footer: '/images/footer.jpg',
  categoryDates: '/images/dates.jpg',
  categoryDatesLaddu: '/images/dates-ladu.jpg',
  categoryStuffedDates: '/images/suffed-dates.jpeg',
  categoryDateBites: '/images/date-bites.jpg',
  categoryGiftPacks: '/images/gift-packs.jpg',
  bowl: 'https://images.pexels.com/photos/15807109/pexels-photo-15807109.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  macroDates: 'https://images.pexels.com/photos/20106286/pexels-photo-20106286.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  dates: '/images/dates.jpg',
  stuffed: '/images/suffed-dates.jpeg',
  bites: '/images/date-bites.jpg',
  gift: '/images/gift-packs.jpg',
  truffles: 'https://images.pexels.com/photos/31325605/pexels-photo-31325605.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  stuffedCream: 'https://images.pexels.com/photos/8996217/pexels-photo-8996217.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  teaTray: 'https://images.pexels.com/photos/30709483/pexels-photo-30709483.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  giftBoxAssorted: 'https://images.pexels.com/photos/6363145/pexels-photo-6363145.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
};

export const categories: ProductCategory[] = [
  { name: 'Dates', image: images.categoryDates, alt: 'Premium dates in a bowl' },
  { name: 'Dates Laddu', image: images.categoryDatesLaddu, alt: 'Dates laddu stack' },
  { name: 'Stuffed Dates', image: images.categoryStuffedDates, alt: 'Stuffed dates presentation' },
  { name: 'Date Bites', image: images.categoryDateBites, alt: 'Date bites pyramid' },
  { name: 'Gift Packs', image: images.categoryGiftPacks, alt: 'Syab Dates luxury gift pack' },
];

export const galleryImages = [
  { image: images.categoryDates, alt: 'Glossy Medjool dates in bowl', category: 'Dates' },
  { image: images.hero, alt: 'Syab Dates Halasi presentation', category: 'Packaging' },
  { image: images.categoryDatesLaddu, alt: 'Dates laddu pyramid', category: 'Products' },
  { image: images.categoryStuffedDates, alt: 'Stuffed dates close-up', category: 'Dates' },
  { image: images.categoryDateBites, alt: 'Date bites pyramid', category: 'Products' },
  { image: images.categoryGiftPacks, alt: 'Syab Dates luxury gift pack', category: 'Gift Packs' },
  { image: images.footer, alt: 'Handwoven basket of premium dates', category: 'Packaging' },
  { image: images.truffles, alt: 'Date truffles on marble', category: 'Products' },
  { image: images.macroDates, alt: 'Premium Medjool dates', category: 'Dates' },
  { image: images.teaTray, alt: 'Traditional Arabic tea and dates', category: 'Packaging' },
  { image: images.stuffedCream, alt: 'Stuffed dates with coconut', category: 'Products' },
  { image: images.giftBoxAssorted, alt: 'Luxury assorted date box', category: 'Gift Packs' },
  { image: images.bowl, alt: 'Silver bowl filled with fresh dates', category: 'Dates' },
];
