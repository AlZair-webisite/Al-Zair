'use client';

import { AlertCircle, Check, Loader2, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_GALLERY_VIDEOS,
  GalleryVideo,
  GalleryVideoVariant,
} from '@/data/galleryVideos';

const VIDEO_LIMIT_BYTES = 100 * 1024 * 1024;
const VIDEO_SLOTS: {
  variant: GalleryVideoVariant;
  title: string;
  description: string;
  aspectClass: string;
}[] = [
  {
    variant: 'desktop',
    title: 'Desktop video',
    description: 'Landscape version shown on wider screens.',
    aspectClass: 'aspect-video max-w-xl',
  },
  {
    variant: 'mobile',
    title: 'Mobile video',
    description: 'Portrait version shown on phones and smaller screens.',
    aspectClass: 'aspect-[9/16] max-w-[190px]',
  },
];

interface ApiResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface ImageKitAuth {
  publicKey: string;
  token: string;
  expire: number;
  signature: string;
}

interface ImageKitUpload {
  fileId: string;
  url: string;
  name: string;
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export function GalleryVideoManager() {
  const [videos, setVideos] = useState<GalleryVideo[]>(DEFAULT_GALLERY_VIDEOS);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [uploadingVariant, setUploadingVariant] = useState<GalleryVideoVariant | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/gallery-videos', { cache: 'no-store' });
      const result = await readJson<ApiResult<GalleryVideo[]>>(response);
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'Could not load gallery videos. Check the Supabase table setup.');
      }
      setVideos(result.data);
      setReady(true);
    } catch (loadError) {
      setReady(false);
      setError(loadError instanceof Error ? loadError.message : 'Could not load gallery videos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadVideos();
  }, [loadVideos]);

  const handleUpload = async (
    variant: GalleryVideoVariant,
    file: File,
  ) => {
    setError('');
    setNotice('');

    if (!file.type.startsWith('video/')) {
      setError('Choose a video file such as MP4, MOV, or WEBM.');
      return;
    }

    if (file.size > VIDEO_LIMIT_BYTES) {
      setError('The video must be smaller than 100 MB.');
      return;
    }

    setUploadingVariant(variant);

    try {
      const authResponse = await fetch('/api/admin/gallery-videos/upload-auth', {
        cache: 'no-store',
      });
      const authResult = await readJson<ApiResult<ImageKitAuth>>(authResponse);
      if (!authResponse.ok || !authResult.success || !authResult.data) {
        throw new Error(authResult.message || 'Could not prepare the ImageKit upload.');
      }

      const uploadForm = new FormData();
      uploadForm.set('file', file);
      uploadForm.set('fileName', file.name);
      uploadForm.set('publicKey', authResult.data.publicKey);
      uploadForm.set('token', authResult.data.token);
      uploadForm.set('expire', String(authResult.data.expire));
      uploadForm.set('signature', authResult.data.signature);
      uploadForm.set('folder', '/alzair/gallery-videos');
      uploadForm.set('useUniqueFileName', 'true');

      const imageKitResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: uploadForm,
      });
      const imageKitResult = await readJson<
        ImageKitUpload & { message?: string; help?: string }
      >(imageKitResponse);

      if (!imageKitResponse.ok || !imageKitResult.fileId || !imageKitResult.url) {
        throw new Error(imageKitResult.message || imageKitResult.help || 'ImageKit upload failed.');
      }

      const saveResponse = await fetch('/api/admin/gallery-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant,
          url: imageKitResult.url,
          fileId: imageKitResult.fileId,
          fileName: imageKitResult.name || file.name,
        }),
      });
      const saveResult = await readJson<ApiResult<GalleryVideo>>(saveResponse);
      if (!saveResponse.ok || !saveResult.success || !saveResult.data) {
        throw new Error(saveResult.message || 'The video uploaded, but its URL could not be saved to Supabase.');
      }

      const savedVideo = saveResult.data;
      setVideos((current) =>
        current.map((video) => (video.variant === variant ? savedVideo : video)),
      );
      setNotice(`${variant === 'desktop' ? 'Desktop' : 'Mobile'} video updated.`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Video upload failed.');
    } finally {
      setUploadingVariant(null);
    }
  };

  return (
    <section
      aria-labelledby="gallery-video-manager-heading"
      className="space-y-4 rounded-2xl border border-white/10 bg-[#14120e] p-4 sm:p-5"
    >
      <div>
        <h2 id="gallery-video-manager-heading" className="text-base font-bold text-white">
          Gallery videos
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-white/60">
          Replace the desktop or mobile clip. Uploads go directly to ImageKit, and their URLs are
          saved in Supabase.
        </p>
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <p role="status" className="flex items-center gap-2 text-xs text-emerald-300">
          <Check size={15} />
          {notice}
        </p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-6 text-xs text-white/60" role="status">
          <Loader2 size={16} className="animate-spin text-[#c49a4a]" />
          Loading saved video URLs…
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {VIDEO_SLOTS.map((slot) => {
            const video = videos.find((item) => item.variant === slot.variant);
            if (!video) return null;

            const isUploading = uploadingVariant === slot.variant;
            const inputId = `gallery-video-${slot.variant}-upload`;

            return (
              <article
                key={slot.variant}
                className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3 sm:p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{slot.title}</h3>
                    <p className="mt-1 text-xs text-white/55">{slot.description}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      video.isDefault
                        ? 'bg-white/10 text-white/70'
                        : 'bg-emerald-500/15 text-emerald-300'
                    }`}
                  >
                    {video.isDefault ? 'Original clip' : 'Saved in Supabase'}
                  </span>
                </div>

                <div className={`mx-auto mt-4 w-full overflow-hidden rounded-lg bg-black ${slot.aspectClass}`}>
                  <video
                    key={video.url}
                    src={video.url}
                    aria-label={`${slot.title} preview`}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                </div>

                <p className="mt-3 truncate text-xs text-white/75" title={video.fileName}>
                  {video.fileName}
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block truncate text-[11px] text-[#d6b15e] underline underline-offset-2"
                  title={video.url}
                >
                  {video.url}
                </a>

                <div className="mt-4">
                  <input
                    id={inputId}
                    type="file"
                    accept="video/*"
                    disabled={!ready || uploadingVariant !== null}
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      event.currentTarget.value = '';
                      if (file) void handleUpload(slot.variant, file);
                    }}
                    className="sr-only"
                  />
                  <label
                    htmlFor={inputId}
                    aria-disabled={!ready || uploadingVariant !== null}
                    className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#c49a4a] px-4 py-2.5 text-xs font-bold text-[#12100d] transition hover:bg-[#d6b15e] focus-within:ring-2 focus-within:ring-[#d6b15e] focus-within:ring-offset-2 focus-within:ring-offset-[#14120e] ${
                      !ready || uploadingVariant !== null ? 'pointer-events-none opacity-60' : ''
                    }`}
                  >
                    {isUploading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <UploadCloud size={15} />
                    )}
                    {isUploading ? 'Uploading and saving…' : 'Upload / replace'}
                  </label>
                  <p className="mt-2 text-[11px] text-white/45">MP4, MOV, or WEBM · up to 100 MB</p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && (
        <button
          type="button"
          onClick={() => void loadVideos()}
          className="min-h-11 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b15e]"
        >
          Refresh video URLs
        </button>
      )}
    </section>
  );
}
