import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { defaultHomepageContent } from '@/data/homepageContent';
import { allProducts } from '@/data/catalog';

export const dynamic = 'force-dynamic';

export async function POST() {
  const logs: string[] = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oadpkwwcwndocanqnltd.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    // Read full SQL schema
    const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql');
    let sqlContent = '';
    if (fs.existsSync(schemaPath)) {
      sqlContent = fs.readFileSync(schemaPath, 'utf-8');
    }

    // 1. Attempt running SQL via Supabase SQL endpoint
    try {
      const endpoints = [
        `${supabaseUrl}/pg/query`,
        `https://api.supabase.com/v1/projects/oadpkwwcwndocanqnltd/database/query`,
      ];

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${serviceRoleKey}`,
              apikey: serviceRoleKey,
            },
            body: JSON.stringify({ query: sqlContent }),
          });
          if (res.ok) {
            logs.push(`Executed full schema.sql via ${endpoint}`);
            break;
          }
        } catch {}
      }
    } catch (e: any) {
      logs.push(`Direct SQL API attempt note: ${e?.message}`);
    }

    // 2. Automated Auto-Seeding & Table Verification
    // A. Seed Homepage Content Table
    try {
      const { error: homeErr } = await supabaseAdmin
        .from('homepage_content')
        .upsert(
          {
            id: 'main_homepage',
            hero: defaultHomepageContent.hero,
            featured_products: defaultHomepageContent.featured_products,
            testimonials: defaultHomepageContent.testimonials,
            home_gallery: defaultHomepageContent.home_gallery,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (!homeErr) {
        logs.push('Verified and synced homepage_content table successfully in Supabase.');
      } else {
        logs.push(`homepage_content note: ${homeErr.message}`);
      }
    } catch (err: any) {
      logs.push(`homepage_content sync: ${err?.message}`);
    }

    // B. Seed Products Table
    try {
      const productsPayload = allProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        product_type: p.productType,
        price: p.price,
        original_price: p.originalPrice || null,
        discount: p.discount || null,
        rating: p.rating,
        reviews: p.reviews,
        image: p.image,
        in_stock: p.inStock,
        weight: p.weight || '500g',
        is_new: p.isNew || false,
        sales_count: p.salesCount || 0,
      }));

      const { error: prodErr } = await supabaseAdmin
        .from('products')
        .upsert(productsPayload, { onConflict: 'id' });

      if (!prodErr) {
        logs.push(`Verified and synced ${allProducts.length} catalog products in Supabase.`);
      } else {
        logs.push(`products sync note: ${prodErr.message}`);
      }
    } catch (err: any) {
      logs.push(`products sync: ${err?.message}`);
    }

    // C. Seed Admins Table
    try {
      const { error: adminErr } = await supabaseAdmin
        .from('admins')
        .upsert(
          {
            email: 'admin@alzair.com',
            password: 'admin@alzair2024',
            full_name: 'Super Admin',
            role: 'super_admin',
          },
          { onConflict: 'email' }
        );

      if (!adminErr) {
        logs.push('Verified and synced admin account in Supabase.');
      } else {
        logs.push(`admin sync note: ${adminErr.message}`);
      }
    } catch (err: any) {
      logs.push(`admin sync: ${err?.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Automatic database initialization and schema sync completed!',
      logs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Database initialization error', logs },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
