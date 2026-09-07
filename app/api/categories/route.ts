import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { defaultHomepageContent } from '@/data/homepageContent';

export const dynamic = 'force-dynamic';

const fallbackCategories = [
  'Dates',
  'Dates Laddu',
  'Stuffed Dates',
  'Date Bites',
  'Gift Packs',
];

export async function GET() {
  try {
    const categoriesSet = new Set<string>(fallbackCategories);
    let categoryCards: { id: string; name: string; image: string; link: string }[] =
      defaultHomepageContent.featured_products;

    // 1. Check Supabase homepage_content
    try {
      const { data } = await supabaseAdmin
        .from('homepage_content')
        .select('featured_products')
        .eq('id', 'main_homepage')
        .single();

      if (data?.featured_products && Array.isArray(data.featured_products) && data.featured_products.length > 0) {
        categoryCards = data.featured_products;
        // Keep order of categories as configured by admin
        categoriesSet.clear();
        data.featured_products.forEach((c: any) => {
          if (c.name && c.name.trim()) categoriesSet.add(c.name.trim());
        });
      }
    } catch {}

    // 2. Check local homepageContent.json if Supabase didn't have custom items
    if (categoriesSet.size === fallbackCategories.length) {
      try {
        const filePath = path.join(process.cwd(), 'data', 'homepageContent.json');
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(raw);
          if (parsed.featured_products && Array.isArray(parsed.featured_products) && parsed.featured_products.length > 0) {
            categoryCards = parsed.featured_products;
            categoriesSet.clear();
            parsed.featured_products.forEach((c: any) => {
              if (c.name && c.name.trim()) categoriesSet.add(c.name.trim());
            });
          }
        }
      } catch {}
    }

    // 3. Also grab any unique category from products table
    try {
      const { data: prodData } = await supabaseAdmin
        .from('products')
        .select('category');
      if (prodData && Array.isArray(prodData)) {
        prodData.forEach((p: any) => {
          if (p.category && p.category.trim()) categoriesSet.add(p.category.trim());
        });
      }
    } catch {}

    const categoriesArray = Array.from(categoriesSet);

    return NextResponse.json({
      success: true,
      data: categoriesArray,
      categoriesWithMeta: categoryCards,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      data: fallbackCategories,
      categoriesWithMeta: defaultHomepageContent.featured_products,
    });
  }
}
