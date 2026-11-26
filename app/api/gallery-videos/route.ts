import { NextResponse } from 'next/server';
import { DEFAULT_GALLERY_VIDEOS, GalleryVideoVariant } from '@/data/galleryVideos';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('gallery_videos')
      .select('variant, url, file_id, file_name, updated_at');

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const savedVideos = new Map(
      (data || []).map((video) => [video.variant as GalleryVideoVariant, video]),
    );
    const videos = DEFAULT_GALLERY_VIDEOS.map((defaultVideo) => {
      const savedVideo = savedVideos.get(defaultVideo.variant);
      if (!savedVideo) return defaultVideo;

      return {
        ...defaultVideo,
        url: savedVideo.url,
        fileId: savedVideo.file_id,
        fileName: savedVideo.file_name,
        isDefault: !savedVideo.file_id,
        updatedAt: savedVideo.updated_at,
      };
    });

    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load gallery videos',
      },
      { status: 500 },
    );
  }
}
