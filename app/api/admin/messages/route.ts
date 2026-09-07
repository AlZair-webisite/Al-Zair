import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

function getLocalInquiries(): any[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'inquiries.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading local inquiries:', e);
  }
  return [];
}

function saveLocalInquiries(inquiries: any[]) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'inquiries.json');
    fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing local inquiries:', e);
  }
}

export async function GET() {
  try {
    let dbInquiries: any[] = [];
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        dbInquiries = data;
      }
    } catch (err: any) {
      console.warn('Supabase get inquiries note:', err?.message);
    }

    const localInquiries = getLocalInquiries();

    // Merge Supabase and local data without duplicates
    const seenIds = new Set<string>();
    const merged: any[] = [];

    for (const item of [...dbInquiries, ...localInquiries]) {
      const key = item.id || `${item.email}_${item.created_at}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        merged.push(item);
      }
    }

    // Sort by created_at DESC
    merged.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

    return NextResponse.json({
      success: true,
      data: merged,
      unreadCount: merged.filter((m) => m.status === 'unread').length,
    });
  } catch (err: any) {
    console.error('Admin messages GET error:', err);
    const local = getLocalInquiries();
    return NextResponse.json({
      success: true,
      data: local,
      unreadCount: local.filter((m) => m.status === 'unread').length,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status are required' }, { status: 400 });
    }

    // 1. Update in Supabase
    try {
      await supabaseAdmin.from('contact_inquiries').update({ status }).eq('id', id);
    } catch (e) {}

    // 2. Update in local inquiries.json
    const local = getLocalInquiries();
    const updated = local.map((m) => (m.id === id ? { ...m, status } : m));
    saveLocalInquiries(updated);

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    // 1. Delete from Supabase
    try {
      await supabaseAdmin.from('contact_inquiries').delete().eq('id', id);
    } catch (e) {}

    // 2. Delete from local inquiries.json
    const local = getLocalInquiries();
    const filtered = local.filter((m) => m.id !== id);
    saveLocalInquiries(filtered);

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to delete inquiry' }, { status: 500 });
  }
}
