export type GalleryVideoVariant = 'desktop' | 'mobile';

export interface GalleryVideo {
  variant: GalleryVideoVariant;
  url: string;
  fileId: string | null;
  fileName: string;
  isDefault: boolean;
  updatedAt?: string;
}

export const DEFAULT_GALLERY_VIDEOS: GalleryVideo[] = [
  {
    variant: 'desktop',
    url: '/videos/WhatsApp%20Video%202026-11-26%20at%2012.42.41%20PM.mp4',
    fileId: null,
    fileName: 'WhatsApp Video 2026-11-26 at 12.42.41 PM.mp4',
    isDefault: true,
  },
  {
    variant: 'mobile',
    url: '/videos/WhatsApp%20Video%202026-11-26%20at%2012.42.42%20PM.mp4',
    fileId: null,
    fileName: 'WhatsApp Video 2026-11-26 at 12.42.42 PM.mp4',
    isDefault: true,
  },
];
