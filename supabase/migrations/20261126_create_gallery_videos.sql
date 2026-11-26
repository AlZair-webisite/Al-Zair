CREATE TABLE IF NOT EXISTS public.gallery_videos (
    variant TEXT PRIMARY KEY CHECK (variant IN ('desktop', 'mobile')),
    url TEXT NOT NULL,
    file_id TEXT,
    file_name TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view gallery videos" ON public.gallery_videos;
CREATE POLICY "Public can view gallery videos"
    ON public.gallery_videos FOR SELECT USING (true);

INSERT INTO public.gallery_videos (variant, url, file_name)
VALUES
    ('desktop', '/videos/WhatsApp%20Video%202026-11-26%20at%2012.42.41%20PM.mp4', 'WhatsApp Video 2026-11-26 at 12.42.41 PM.mp4'),
    ('mobile', '/videos/WhatsApp%20Video%202026-11-26%20at%2012.42.42%20PM.mp4', 'WhatsApp Video 2026-11-26 at 12.42.42 PM.mp4')
ON CONFLICT (variant) DO NOTHING;
