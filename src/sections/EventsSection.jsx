import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { ChevronLeft, ChevronRight, Trophy, MapPin, Clock } from 'lucide-react';

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
        // Show alternative modal showing "Registration is not started"
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
      className="snap-section relative flex flex-col justify-center items-center min-h-[100svh] overflow-hidden py-6 sm:py-8 md:py-10 w-full select-none"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[450px] rounded-full pointer-events-none z-0 opacity-20 blur-[140px] transition-all duration-700"
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
      <div className="relative z-20 flex flex-col items-center text-center mb-4 sm:mb-6 md:mb-7">
        <div className="flex items-center justify-center gap-3">
          <span className="w-7 sm:w-10 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="text-[9.5px] sm:text-[11px] font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
            03 · EVENTS SHOWCASE
          </span>
          <span className="w-7 sm:w-10 h-[1.5px] bg-[#D4AF37]/80" />
        </div>

        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#F8F7F4] mt-1.5 select-none leading-tight">
          <span>A WEEK OF </span>
          <span className="gold-text font-serif-display font-medium">IDEAS</span>
        </h2>
      </div>

      {/* =========================================================================
          3D COVERFLOW MOTION POSTER CAROUSEL (Compact Sizing matching Reference IMAGE 1)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">

        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[360px] sm:h-[390px] md:h-[415px] flex items-center justify-center"
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

            // Transform Styles matching Reference Image 1 exactly
            let transform = '';
            let zIndex = 10;
            let opacity = 0;

            if (isCenter) {
              transform = 'translateX(0%) scale(1.0) rotateY(0deg) translateZ(35px)';
              zIndex = 30;
              opacity = 1;
            } else if (isLeft) {
              transform = 'translateX(-54%) scale(0.88) rotateY(12deg) translateZ(-45px)';
              zIndex = 15;
              opacity = 0.95;
            } else if (isRight) {
              transform = 'translateX(54%) scale(0.88) rotateY(-12deg) translateZ(-45px)';
              zIndex = 15;
              opacity = 0.95;
            } else if (offset < 0) {
              transform = 'translateX(-106%) scale(0.76) rotateY(18deg) translateZ(-110px)';
              zIndex = 5;
              opacity = 0.35;
            } else {
              transform = 'translateX(106%) scale(0.76) rotateY(-18deg) translateZ(-110px)';
              zIndex = 5;
              opacity = 0.35;
            }

            return (
              <div
                key={evt.id}
                onClick={() => handleCardClick(idx, evt)}
                className={`absolute w-[220px] sm:w-[245px] md:w-[260px] lg:w-[270px] max-w-[280px] aspect-[3/4.15] max-h-[385px] sm:max-h-[405px] rounded-[20px] sm:rounded-[22px] md:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] select-none ${
                  isCenter
                    ? isRed
                      ? 'border border-[#FF4D4D] shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_18px_rgba(255,77,77,0.25)]'
                      : 'border border-[#D4AF37] shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_18px_rgba(212,175,55,0.25)]'
                    : 'border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.85)]'
                }`}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  willChange: 'transform, opacity',
                  backgroundColor: '#0c0c10',
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  isolation: 'isolate',
                }}
              >
                {/* Poster Background Image with Inherited Rounded Clipping */}
                <div className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.name}
                    width="1086"
                    height="1448"
                    loading={isCenter ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isCenter ? 'high' : 'low'}
                    className="w-full h-full object-cover object-center rounded-[inherit] transform transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle darkening veil for side cards so center card pops */}
                  {!isCenter && (
                    <div
                      className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition-opacity duration-500 ease-out rounded-[inherit]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Top-Left Card Number (Visible on cards: 1, 2, 3...) */}
                  <div className="absolute top-3 left-3.5 sm:top-3.5 sm:left-4 z-20 pointer-events-none">
                    <span className="font-sans font-bold text-xs sm:text-sm text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Top-Right 'Click to Register' (Visible on active center card) */}
                  {isCenter && (
                    <div className="absolute top-3 right-3.5 sm:top-3.5 sm:right-4 z-20 pointer-events-none">
                      <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        Click to Register
                      </span>
                    </div>
                  )}

                  {/* Bottom Black Vignette & Dot Texture */}
                  <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 pointer-events-none z-10 rounded-b-[inherit] overflow-hidden">
                    {/* Deep Pure Black Gradient Fade */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.9) 45%, rgba(0, 0, 0, 0.35) 80%, transparent 100%)',
                      }}
                    />

                    {/* Dotted Texture Pattern Masked at the Bottom */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.45) 1.1px, transparent 1.1px)',
                        backgroundSize: '7px 7px',
                        maskImage: 'linear-gradient(to top, black 35%, transparent 95%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 35%, transparent 95%)',
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Bottom Details Overlay (Exact Placement, Sizing & Hierarchy matching Reference Image 1) */}
                  {isCenter && (
                    <div className="absolute inset-x-3.5 sm:inset-x-4 bottom-3 sm:bottom-3.5 z-20 flex items-center justify-between pointer-events-none">
                      {/* Left: Price Pool */}
                      <div className="flex flex-col items-start shrink-0">
                        <span className="font-sans text-[8.5px] sm:text-[9.5px] font-semibold text-white/75 uppercase tracking-wider leading-none">
                          Price Pool
                        </span>
                        <span className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-none mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          {evt.prizeDisplay || "3K"}
                        </span>
                      </div>

                      {/* Thin Vertical Divider */}
                      <div className="w-px h-8 sm:h-9 bg-white/20 mx-2.5 sm:mx-3 shrink-0" />

                      {/* Right: Event Name, Venue, Time */}
                      <div className="flex flex-col justify-center gap-0.5 sm:gap-1 min-w-0 flex-1 text-left">
                        {/* Row 1: Trophy + Event Name */}
                        <div className="flex items-center gap-1.5 min-w-0 text-white font-semibold text-[10.5px] sm:text-[11.5px] leading-tight">
                          <Trophy size={12} className="text-white shrink-0" strokeWidth={2} />
                          <span className="truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                            {evt.nameDisplay || evt.name}
                          </span>
                        </div>

                        {/* Row 2: MapPin + Venue */}
                        <div className="flex items-center gap-1.5 min-w-0 text-white/90 font-medium text-[9.5px] sm:text-[10px] leading-tight">
                          <MapPin size={11} className="text-white/85 shrink-0" strokeWidth={2} />
                          <span className="truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                            {evt.venueDisplay || evt.venue}
                          </span>
                        </div>

                        {/* Row 3: Clock + Time */}
                        <div className="flex items-center gap-1.5 min-w-0 text-white/90 font-medium text-[9.5px] sm:text-[10px] leading-tight">
                          <Clock size={11} className="text-white/85 shrink-0" strokeWidth={2} />
                          <span className="truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                            {evt.timeDisplay || evt.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls (Arrows) */}
        <div className="relative z-20 flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 md:mt-5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Event"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Event"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
          >
            <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
