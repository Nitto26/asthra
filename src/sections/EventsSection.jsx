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
    if (idx === activeIndex) {
      sound.playClick();
      onSelectEvent(event);
    } else {
      sound.playClick();
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
                className={`absolute w-[74vw] sm:w-[320px] md:w-[380px] lg:w-[410px] max-w-[440px] h-[52vh] sm:h-[58vh] md:h-[62vh] min-h-[380px] max-h-[600px] rounded-[22px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] select-none border ${
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
                {/* Poster Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={evt.image}
                    alt={evt.name}
                    width="400"
                    height="600"
                    loading={isCenter ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isCenter ? 'high' : 'low'}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  />
                  {/* Darkening veil for side cards */}
                  {!isCenter && (
                    <div
                      className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition-opacity duration-500 ease-out"
                      aria-hidden="true"
                    />
                  )}
                  {/* Vignette overlays for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent z-10" />
                </div>

                {/* Top Poster Meta */}
                <div className="relative z-20 p-4 sm:p-5 md:p-6 flex items-center justify-between w-full">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#F5D77F] bg-[#0c0c10]/90 px-3 py-1.5 rounded-full border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                    {evt.num}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-white/90 uppercase bg-[#0c0c10]/90 px-3 py-1.5 rounded-full border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                    {evt.time} {evt.timePeriod && `· ${evt.timePeriod}`}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 z-10 px-4 sm:px-6 pt-4 pb-6 sm:pb-7 md:pb-8 flex flex-col items-center text-center">
                  <span
                    className={`text-[9.5px] sm:text-xs font-sans font-bold tracking-[0.25em] uppercase mb-1.5 ${
                      isRed ? 'text-[#FF7A7A]' : 'text-[#F5D77F]'
                    }`}
                  >
                    {evt.category}
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-white leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)] max-w-full">
                    {evt.name}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#DCD8CF] font-sans mt-1.5 line-clamp-2 max-w-xs sm:max-w-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {evt.tagline}
                  </p>

                  {/* Tap indicator on active center card */}
                  {isCenter && (
                    <span className="mt-3.5 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#F5D77F]/90 uppercase bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
                      TAP TO VIEW DETAILS &amp; REGISTER
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls (Arrows + 7 Dot Indicators) */}
        <div className="relative z-20 flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-5">
          <button
            onClick={prevSlide}
            aria-label="Previous Event"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>

          {/* 7 Indicator Dots */}
          <div className="flex items-center gap-2">
            {events.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => {
                  sound.playClick();
                  setActiveIndex(idx);
                }}
                aria-label={`Go to event ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 sm:w-8 h-2 bg-gradient-to-r from-[#F5D77F] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Event"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-lg"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
