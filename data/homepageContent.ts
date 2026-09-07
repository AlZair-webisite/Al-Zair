export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  image: string;
}

export interface FeaturedProductItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  initials: string;
  rating?: number;
}

export interface HomeGalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface HomepageContent {
  hero: HeroContent;
  featured_products: FeaturedProductItem[];
  testimonials: TestimonialItem[];
  home_gallery: HomeGalleryItem[];
}

export const defaultHomepageContent: HomepageContent = {
  hero: {
    eyebrow: "Nature's Finest",
    title: "Gift For You",
    description:
      'Indulge in the richness of premium quality dates. Pure, wholesome and naturally delicious.',
    button1Text: 'SHOP NOW',
    button1Link: '/products',
    button2Text: 'EXPLORE PRODUCTS',
    button2Link: '/products',
    image: '/images/hero-image.png',
  },
  featured_products: [
    { id: '1', name: 'Dates', image: '/images/dates.jpg', link: '/products?category=Dates' },
    { id: '2', name: 'Dates Laddu', image: '/images/dates-ladu.jpg', link: '/products?category=Dates%20Laddu' },
    { id: '3', name: 'Stuffed Dates', image: '/images/suffed-dates.jpeg', link: '/products?category=Stuffed%20Dates' },
    { id: '4', name: 'Date Bites', image: '/images/date-bites.jpg', link: '/products?category=Date%20Bites' },
    { id: '5', name: 'Gift Packs', image: '/images/hero-image.png', link: '/products?category=Gift%20Packs' },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Ayesha Khan',
      quote:
        'The quality of dates is exceptional. Fresh, soft and so delicious! Will definitely order again.',
      initials: 'AK',
      rating: 5,
    },
    {
      id: '2',
      name: 'Rizwan Ali',
      quote:
        "Best dates laddu I've ever had. Perfect taste and very healthy. Highly recommended!",
      initials: 'RA',
      rating: 5,
    },
    {
      id: '3',
      name: 'Sara Ahmed',
      quote:
        'Premium quality and hygienic packing. You can truly taste the difference in every single date.',
      initials: 'SA',
      rating: 5,
    },
    {
      id: '4',
      name: 'Fatima Zahra',
      quote:
        'Luxury packaging and authentic Arabian taste. Perfect for gifting on festivals and celebrations.',
      initials: 'FZ',
      rating: 5,
    },
    {
      id: '5',
      name: 'Mohammad Tariq',
      quote:
        'The stuffed dates are out of this world. Crunchy nuts and juicy sweet dates.',
      initials: 'MT',
      rating: 5,
    },
    {
      id: '6',
      name: 'Zainab Noor',
      quote:
        'Ordered gift packs for the whole family. Beautiful presentation and supreme freshness!',
      initials: 'ZN',
      rating: 5,
    },
  ],
  home_gallery: [
    {
      id: '1',
      image:
        'https://images.pexels.com/photos/15807109/pexels-photo-15807109.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
      alt: 'Syab Premium Dates',
    },
    {
      id: '2',
      image: '/images/suffed-dates.jpeg',
      alt: 'Stuffed Dates with Almonds & Pistachio',
    },
    {
      id: '3',
      image: '/images/dates-ladu.jpg',
      alt: 'Handcrafted Nutty Date Laddu',
    },
    {
      id: '4',
      image: '/images/date-bites.jpg',
      alt: 'Artisanal Chocolate Date Bites',
    },
    {
      id: '5',
      image: '/images/hero-image.png',
      alt: 'Luxury Dates Gift Hamper',
    },
    {
      id: '6',
      image: '/images/dates.jpg',
      alt: 'Syab Fresh Golden Dates',
    },
  ],
};
