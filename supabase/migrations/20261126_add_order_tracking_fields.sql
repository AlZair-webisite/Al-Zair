ALTER TABLE public.orders
    ADD COLUMN IF NOT EXISTS tracking_url TEXT,
    ADD COLUMN IF NOT EXISTS shipping_partner TEXT;
