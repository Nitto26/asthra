import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventsSection({ onSelectEvent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const events = siteConfig.events;
  const total = events.length;

  const nextSlide = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleCardClick = (idx, event) => {
    sound.playClick();
    if (idx === activeIndex) {
      const link = event?.registrationLink || siteConfig.registrationLink || "##";
      if (link && link !== "##" && !link.startsWith("#")) {
        if (link.startsWith("http://") || link.startsWith("https://")) {
          window.open(link, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = link;
        }
      } else {
        // Show alternative page showing "Registration is not started"
        if (onSelectEvent) onSelectEvent(event);
      }
    } else {
      setActiveIndex(idx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      nextSlide();
    } else if (diffX < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentEvent = events[activeIndex] || events[0];
  const isCurrentRed = currentEvent?.accentColor === 'red';

  return (
    <section
      id="events"
      className="snap-section relative flex flex-col justify-between items-center min-h-[100svh] overflow-hidden py-8 sm:py-12 md:py-14 w-full select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #110D0D 0%, #080808 55%, #020202 100%)',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Background Glow tied to active event */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full pointer-events-none z-0 opacity-20 blur-[150px] transition-all duration-700"
        style={{
          background: isCurrentRed
            ? 'radial-gradient(circle, rgba(229, 40, 40, 0.4) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(245, 215, 127, 0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          TOP HEADER
          ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2 sm:mt-1">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
            03 · EVENTS SHOWCASE
          </span>
          <span className="w-8 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
        </div>

        <h2 className="font-serif-display text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F8F7F4] mt-2 select-none leading-tight">
          <span>A WEEK OF </span>
          <span className="gold-text font-serif-display font-medium">IDEAS</span>
        </h2>
      </div>

      {/* =========================================================================
          3D COVERFLOW MOTION POSTER CAROUSEL
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center my-auto py-2 sm:py-3">

        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[58vh] sm:h-[64vh] md:h-[66vh] min-h-[420px] max-h-[660px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {events.map((evt, idx) => {
            // Calculate relative offset handling circular wrap
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const isRed = evt.accentColor === 'red';

            // Transform Styles based on 3D Coverflow positioning
            let transform = '';
            let zIndex = 10;
            let opacity = 0;

            if (isCenter) {
              transform = 'translateX(0%) scale(1.0) rotateY(0deg) translateZ(40px)';
              zIndex = 30;
              opacity = 1;
            } else if (isLeft) {
              transform = 'translateX(-56%) scale(0.92) rotateY(10deg) translateZ(-60px)';
              zIndex = 10;
              opacity = 0.95;
            } else if (isRight) {
              transform = 'translateX(56%) scale(0.92) rotateY(-10deg) translateZ(-60px)';
              zIndex = 10;
              opacity = 0.95;
            } else if (offset < 0) {
              transform = 'translateX(-112%) scale(0.78) rotateY(18deg) translateZ(-140px)';
              zIndex = 5;
              opacity = 0.25;
            } else {
              transform = 'translateX(112%) scale(0.78) rotateY(-18deg) translateZ(-140px)';
              zIndex = 5;
              opacity = 0.25;
            }

            return (
              <div
                key={evt.id}
                onClick={() => handleCardClick(idx, evt)}
                className={`absolute w-[74vw] sm:w-[330px] md:w-[380px] lg:w-[410px] max-w-[430px] aspect-[3/4] max-h-[60vh] sm:max-h-[65vh] rounded-[22px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] select-none border ${
                  isCenter
                    ? isRed
                      ? 'border-[#FF4D4D] shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-2 ring-[#FF4D4D]/60'
                      : 'border-[#F5D77F] shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-2 ring-[#F5D77F]/60'
                    : 'border-white/30 shadow-[0_16px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
                }`}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  willChange: 'transform, opacity',
                  backgroundColor: '#0c0c10',
                }}
              >
                {/* Poster Background Image Only */}
                <div className="absolute inset-0 z-0">
                  <picture className="w-full h-full block">
                    {evt.imageWebp && <source srcSet={evt.imageWebp} type="image/webp" />}
                    <img
                      src={evt.image}
                      alt={evt.name}
                      width="1086"
                      height="1448"
                      loading={isCenter ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={isCenter ? 'high' : 'low'}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                    />
                  </picture>

                  {/* Subtle darkening veil for side cards so center card pops */}
                  {!isCenter && (
                    <div
                      className="absolute inset-0 bg-black/45 z-10 pointer-events-none transition-opacity duration-500 ease-out"
                      aria-hidden="true"
                    />
                  )}

                  {/* Small vibrant accent and soft vignette on the bottom corners of each card */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: isRed
                        ? 'radial-gradient(circle at 0% 100%, rgba(255, 77, 77, 0.35) 0%, transparent 26%), radial-gradient(circle at 100% 100%, rgba(255, 77, 77, 0.35) 0%, transparent 26%), linear-gradient(to top, rgba(0, 0, 0, 0.42) 0%, transparent 14%)'
                        : 'radial-gradient(circle at 0% 100%, rgba(245, 215, 127, 0.35) 0%, transparent 26%), radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.35) 0%, transparent 26%), linear-gradient(to top, rgba(0, 0, 0, 0.42) 0%, transparent 14%)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls (Arrows) */}
        <div className="relative z-20 flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-5">
          <button
            onClick={prevSlide}
            aria-label="Previous Event"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Event"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
