'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ResponsiveVideoProps {
  poster: string;
  desktopSrc: string;
  mobileSrc: string;
}

export function ResponsiveVideo({ poster, desktopSrc, mobileSrc }: ResponsiveVideoProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const userStartedRef = useRef(false);
  const [source, setSource] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const startPlayback = useCallback((video: HTMLVideoElement) => {
    void video.play().then(
      () => setPlaybackError(false),
      (error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setPlaybackError(true);
        }
      },
    );
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMediaPreferences = () => {
      setSource(desktopQuery.matches ? desktopSrc : mobileSrc);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updateMediaPreferences();
    desktopQuery.addEventListener('change', updateMediaPreferences);
    reducedMotionQuery.addEventListener('change', updateMediaPreferences);

    return () => {
      desktopQuery.removeEventListener('change', updateMediaPreferences);
      reducedMotionQuery.removeEventListener('change', updateMediaPreferences);
    };
  }, [desktopSrc, mobileSrc]);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video || !source) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }

        if (userPausedRef.current || (prefersReducedMotion && !userStartedRef.current)) {
          video.pause();
          return;
        }

        startPlayback(video);
      },
      { threshold: 0.1 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [prefersReducedMotion, source, startPlayback]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      userStartedRef.current = true;
      startPlayback(video);
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <div ref={stageRef} className="absolute inset-0">
      <video
        ref={videoRef}
        src={source || undefined}
        poster={poster}
        aria-label="Alzair premium dates and gift packaging showcase"
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setPlaybackError(true)}
      />

      {playbackError && (
        <p
          role="status"
          className="absolute left-3 top-3 rounded bg-black/85 px-3 py-2 text-xs text-white"
        >
          Video playback is unavailable.
        </p>
      )}

      <div className="absolute bottom-3 right-3 z-10 flex gap-2">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/85 text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b15e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          type="button"
          onClick={() => setIsMuted((muted) => !muted)}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          aria-pressed={!isMuted}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/85 text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b15e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
