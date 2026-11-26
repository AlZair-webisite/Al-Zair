import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { GalleryVideoVariant } from '@/data/galleryVideos';
import { supabaseAdmin } from '@/lib/supabase/admin';
export { GET } from '@/app/api/gallery-videos/route';

export const dynamic = 'force-dynamic';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isGalleryVideoVariant(value: unknown): value is GalleryVideoVariant {
  return value === 'desktop' || value === 'mobile';
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)) {
      return NextResponse.json({ success: false, message: 'Invalid video details' }, { status: 400 });
    }

    const { variant, url, fileId, fileName } = body;
    if (
      !isGalleryVideoVariant(variant) ||
      typeof url !== 'string' ||
      typeof fileId !== 'string' ||
      typeof fileName !== 'string' ||
      !fileId.trim() ||
      !fileName.trim() ||
      fileName.length > 255
    ) {
      return NextResponse.json(
        { success: false, message: 'A valid video variant and ImageKit upload are required' },
        { status: 400 },
      );
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ success: false, message: 'The video URL is invalid' }, { status: 400 });
    }

    if (parsedUrl.protocol !== 'https:' || url.length > 2048 || fileId.length > 255) {
      return NextResponse.json(
        { success: false, message: 'The video must use a valid secure ImageKit URL' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('gallery_videos')
      .upsert(
        {
          variant,
          url: parsedUrl.toString(),
          file_id: fileId.trim(),
          file_name: fileName.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'variant' },
      )
      .select('variant, url, file_id, file_name, updated_at')
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    revalidatePath('/gallery');
    return NextResponse.json({
      success: true,
      data: {
        variant: data.variant,
        url: data.url,
        fileId: data.file_id,
        fileName: data.file_name,
        isDefault: false,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save gallery video',
      },
      { status: 500 },
    );
  }
}
