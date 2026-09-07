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

function saveGalleryImages(images: any[]) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'gallery.json');
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write gallery.json:', err);
  }
}

export async function GET() {
  try {
    const images = getGalleryImages();
    return NextResponse.json({ success: true, data: images });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Error loading gallery' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, alt, category } = body;

    if (!image) {
      return NextResponse.json({ success: false, message: 'Image URL is required' }, { status: 400 });
    }

    const current = getGalleryImages();
    const newItem = {
      id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      image: image.trim(),
      alt: (alt || 'Alzair Premium Dates & Creations').trim(),
      category: (category || 'Products').trim(),
      created_at: new Date().toISOString(),
    };

    const updated = [newItem, ...current];
    saveGalleryImages(updated);

    return NextResponse.json({ success: true, message: 'Gallery image added successfully', data: newItem });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to add image' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, image, alt, category } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    const current = getGalleryImages();
    const updated = current.map((item) =>
      item.id === id
        ? {
            ...item,
            ...(image ? { image: image.trim() } : {}),
            ...(alt !== undefined ? { alt: alt.trim() } : {}),
            ...(category ? { category: category.trim() } : {}),
            updated_at: new Date().toISOString(),
          }
        : item
    );

    saveGalleryImages(updated);
    return NextResponse.json({ success: true, message: 'Gallery image updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    const current = getGalleryImages();
    const updated = current.filter((item) => item.id !== id);
    saveGalleryImages(updated);

    return NextResponse.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete image' }, { status: 500 });
  }
}
