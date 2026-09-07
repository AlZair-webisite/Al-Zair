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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const cleanEmail = (email || '').trim().toLowerCase();

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const localList = getLocalSubscribers();
    const alreadySubscribedLocal = localList.some(
      (s) => (s.email || '').toLowerCase() === cleanEmail
    );

    const newSubscriber = {
      email: cleanEmail,
      created_at: new Date().toISOString(),
    };

    // 1. Save to Supabase newsletter_subscribers
    let savedInDb = false;
    try {
      const { data, error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .upsert([{ email: cleanEmail }], { onConflict: 'email' })
        .select()
        .single();

      if (!error && data) {
        savedInDb = true;
      }
    } catch (dbErr: any) {
      console.warn('Supabase newsletter insert note:', dbErr?.message);
    }

    // 2. Save to local JSON if not already present
    if (!alreadySubscribedLocal) {
      const entry = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...newSubscriber,
      };
      const updated = [entry, ...localList];
      saveLocalSubscribers(updated);
    }

    return NextResponse.json({
      success: true,
      message: alreadySubscribedLocal
        ? "You're already subscribed to our newsletter!"
        : 'Thank you for subscribing to Alzair newsletter!',
      alreadySubscribed: alreadySubscribedLocal,
    });
  } catch (err: any) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
