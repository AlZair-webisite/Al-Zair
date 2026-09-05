import { ExternalLink, MapPin } from 'lucide-react';

export function ContactMap() {
  const mapAddress = 'Madanpur Khadar, New Delhi, Delhi 110076';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-[#f5f0e7] px-5 pb-20 pt-4 text-[#171513]">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-2xl border border-[#dccbb4] bg-white shadow-[0_12px_36px_rgba(72,53,35,0.08)]">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebdcca] bg-[#ede5d8]/70 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b89047] text-[#171513]">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1a1714] font-sans">
                  Our Location
                </h3>
                <p className="text-xs text-[#5e5850] font-sans">
                  Madanpur Khadar, New Delhi - 110076
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#171513] px-4 py-2 text-[11px] font-semibold tracking-wide text-white transition hover:bg-[#a9823b]"
            >
              <span>Get Directions</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="relative h-[380px] sm:h-[450px] w-full">
            <iframe
              title="Syab Dates Location Map"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] contrast-[105%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
