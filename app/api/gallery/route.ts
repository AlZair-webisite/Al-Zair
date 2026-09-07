import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getGalleryImages(): any[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'gallery.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read gallery.json:', err);
  }
  return [];
}

export async function GET() {
  try {
    const images = getGalleryImages();
    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to load gallery' },
      { status: 500 }
    );
  }
}
