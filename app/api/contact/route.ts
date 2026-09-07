import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

function saveToLocalJson(inquiry: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'inquiries.json');
    let list: any[] = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      list = JSON.parse(raw);
    }
    // Prepend new inquiry
    list.unshift(inquiry);
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save inquiry to local JSON:', err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, name, email, phone, subject, message } = body;

    const senderName = (full_name || name || '').trim();
    const senderEmail = (email || '').trim();
    const senderPhone = (phone || '').trim();
    const senderSubject = (subject || 'General Inquiry').trim();
    const senderMessage = (message || '').trim();

    if (!senderName || !senderEmail || !senderMessage) {
      return NextResponse.json(
        { success: false, error: 'Full name, email address, and message are required.' },
        { status: 400 }
      );
    }

    const newInquiry = {
      full_name: senderName,
      email: senderEmail,
      phone: senderPhone || null,
      subject: senderSubject || 'General Inquiry',
      message: senderMessage,
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    // 1. Attempt saving to Supabase
    let savedData = null;
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_inquiries')
        .insert([newInquiry])
        .select()
        .single();

      if (!error && data) {
        savedData = data;
      } else {
        console.warn('Supabase inquiry insert note:', error?.message);
      }
    } catch (dbErr: any) {
      console.warn('Supabase inquiry insert error:', dbErr?.message);
    }

    // 2. Always persist to local inquiries.json (with unique id if not from Supabase)
    const recordToSave = savedData || {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...newInquiry,
    };
    saveToLocalJson(recordToSave);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: recordToSave,
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
