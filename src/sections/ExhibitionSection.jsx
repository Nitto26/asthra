import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, Eye } from 'lucide-react';

export default function ExhibitionSection({ onScrollNext }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Ensure muted and autoplay properties are enforced on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    const handleReady = () => setVideoLoaded(true);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('playing', handleReady);

    video.play().catch(() => {});

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('playing', handleReady);
    };
  }, []);

  // Pause video when out of viewport to save CPU/GPU cycles, resume on enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exhibition"
      className="snap-section relative w-full h-[100svh] min-h-[100svh] overflow-hidden select-none bg-[#020202]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100svh',
        height: '100svh',
        paddingTop: 'max(72px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      {/* =========================================================================
          BACKGROUND MEDIA (Ambient Texture Fallback + Smooth Fade-In Video)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Color theme matching ambient texture (renders immediately before video fades in) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 50%, rgba(245, 215, 127, 0.16) 0%, rgba(212, 175, 55, 0.06) 40%, rgba(5, 5, 5, 0.92) 75%, #020202 100%)',
          }}
          aria-hidden="true"
        />

        {/* Subtle geometric dot grid texture matching site design */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(245, 215, 127, 0.35) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Cinematic Background Video with Smooth Fade-In */}
        <video
          ref={videoRef}
          src="/assets/1110.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover object-center filter brightness-[0.90] contrast-[1.04] saturate-[1.05] transition-opacity duration-1000 ease-in-out ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Atmospheric Gradients: Light and transparent so the video is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/70 via-transparent to-[#020202]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/65 via-[#020202]/20 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT (Left-Justified / Left-Aligned Editorial Layout)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-start text-left px-3 sm:px-6 lg:px-8">
        
        {/* ── Section Badge / Tag ── */}
        <div className="flex flex-col items-start mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#D4AF37]">
              04
            </span>
            <span className="w-10 sm:w-14 h-[1.5px] bg-[#D4AF37]/80" />
          </div>
          <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-[#E6E3DB] uppercase mt-1.5">
            EXPLORE THE WORLD OF MATHEMATICS
          </span>
        </div>

        {/* ── Headline ── */}
        <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F7F4] leading-[1.12] sm:leading-[1.15] filter drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)] mb-4 sm:mb-6 select-none text-left">
          <span>MATHEMATICS </span>
          <span className="gold-text font-serif-display font-medium">
            BEYOND NUMBERS
          </span>
        </h2>

        {/* ── Gold Accent Line ── */}
        <div className="w-20 sm:w-28 h-[2px] bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-transparent mb-5 sm:mb-7" />

        {/* ── Narrative Description ── */}
        <div className="max-w-2xl sm:max-w-3xl text-left mb-6 sm:mb-8">
          <p className="font-sans text-[13.5px] sm:text-base md:text-lg text-[#F8F7F4] font-normal leading-[1.8] sm:leading-[1.9] tracking-wide filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] text-left">
            Discover the beauty of mathematics through creativity, curiosity and innovation. Our exhibition brings mathematical concepts to life through interactive models, fascinating puzzles and real-world applications, revealing how mathematics shapes the world around us.
          </p>
        </div>

        {/* ── Feature Highlights ── */}
        <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3.5">
          {[
            { icon: Sparkles, label: 'Interactive Models' },
            { icon: Compass, label: 'Fascinating Puzzles' },
            { icon: Eye, label: 'Real-World Applications' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D4AF37]/35 bg-[#0A0A0C]/80 backdrop-blur-md text-xs sm:text-sm font-sans font-medium text-[#F5D77F] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <Icon size={14} className="text-[#D4AF37] shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
