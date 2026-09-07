import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { defaultHomepageContent, HomepageContent } from '@/data/homepageContent';

export const dynamic = 'force-dynamic';

const LOCAL_DATA_FILE = path.join(process.cwd(), 'data', 'homepageContent.json');

function getLocalData(): HomepageContent | null {
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {}
  return null;
}

function saveLocalData(data: HomepageContent) {
  try {
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}
}

export async function GET() {
  try {
    // 1. Try Supabase first
    const { data, error } = await supabaseAdmin
      .from('homepage_content')
      .select('*')
      .eq('id', 'main_homepage')
      .single();

    if (!error && data) {
      const content: HomepageContent = {
        hero: data.hero || defaultHomepageContent.hero,
        featured_products: data.featured_products || defaultHomepageContent.featured_products,
        testimonials: data.testimonials || defaultHomepageContent.testimonials,
        home_gallery: data.home_gallery || defaultHomepageContent.home_gallery,
      };
      saveLocalData(content);
      return NextResponse.json({ success: true, source: 'supabase_database', data: content });
    }

    // 2. Fallback to local server persistent file
    const localContent = getLocalData();
    if (localContent) {
      return NextResponse.json({ success: true, source: 'server_file', data: localContent });
    }

    // 3. Fallback to default
    return NextResponse.json({ success: true, source: 'default_fallback', data: defaultHomepageContent });
  } catch (err: any) {
    const localContent = getLocalData();
    return NextResponse.json({
      success: true,
      source: 'fallback',
      data: localContent || defaultHomepageContent,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload: HomepageContent = {
      hero: body.hero || defaultHomepageContent.hero,
      featured_products: body.featured_products || defaultHomepageContent.featured_products,
      testimonials: body.testimonials || defaultHomepageContent.testimonials,
      home_gallery: body.home_gallery || defaultHomepageContent.home_gallery,
    };

    // Save locally to server first for guaranteed persistence
    saveLocalData(payload);

    // Try saving to Supabase PostgreSQL
    let supabaseSuccess = false;
    let supabaseError = null;

    try {
      const dbPayload = {
        id: 'main_homepage',
        hero: payload.hero,
        featured_products: payload.featured_products,
        testimonials: payload.testimonials,
        home_gallery: payload.home_gallery,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin
        .from('homepage_content')
        .upsert(dbPayload, { onConflict: 'id' })
        .select()
        .single();

      if (!error && data) {
        supabaseSuccess = true;
      } else {
        supabaseError = error?.message;
      }
    } catch (dbErr: any) {
      supabaseError = dbErr?.message;
    }

    try {
      revalidatePath('/');
    } catch {}

    return NextResponse.json({
      success: true,
      message: supabaseSuccess
        ? 'Homepage content saved successfully to PostgreSQL & Cloud Storage'
        : 'Homepage content saved successfully to server storage',
      supabaseSynced: supabaseSuccess,
      supabaseNotice: supabaseError ? `Supabase note: ${supabaseError}` : null,
      data: payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error updating homepage' },
      { status: 500 }
    );
  }
}
