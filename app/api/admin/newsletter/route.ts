import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

function getLocalSubscribers(): any[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'newsletter.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read newsletter.json:', err);
  }
  return [];
}

function saveLocalSubscribers(list: any[]) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'newsletter.json');
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write newsletter.json:', err);
  }
}

export async function GET() {
  try {
    let dbList: any[] = [];
    try {
      const { data, error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        dbList = data;
      }
    } catch (e: any) {
      console.warn('Supabase get subscribers error:', e?.message);
    }

    const localList = getLocalSubscribers();

    // Merge without duplicates by email
    const seenEmails = new Set<string>();
    const merged: any[] = [];

    for (const item of [...dbList, ...localList]) {
      const emailKey = (item.email || '').toLowerCase().trim();
      if (emailKey && !seenEmails.has(emailKey)) {
        seenEmails.add(emailKey);
        merged.push(item);
      }
    }

    // Sort newest first
    merged.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

    return NextResponse.json({
      success: true,
      data: merged,
      totalCount: merged.length,
    });
  } catch (err: any) {
    const fallback = getLocalSubscribers();
    return NextResponse.json({
      success: true,
      data: fallback,
      totalCount: fallback.length,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json(
        { success: false, message: 'Subscriber ID or email is required' },
        { status: 400 }
      );
    }

    // 1. Delete from Supabase
    try {
      if (id) {
        await supabaseAdmin.from('newsletter_subscribers').delete().eq('id', id);
      } else if (email) {
        await supabaseAdmin.from('newsletter_subscribers').delete().eq('email', email);
      }
    } catch (e) {}

    // 2. Delete from local JSON
    const local = getLocalSubscribers();
    const updated = local.filter((item) => {
      if (id && item.id === id) return false;
      if (email && (item.email || '').toLowerCase() === email.toLowerCase()) return false;
      return true;
    });

    saveLocalSubscribers(updated);

    return NextResponse.json({
      success: true,
      message: 'Subscriber removed successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to remove subscriber' },
      { status: 500 }
    );
  }
}
