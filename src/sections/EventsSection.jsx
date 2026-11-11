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

  // Touch swipe support (distinguish horizontal swipe from vertical page scroll)
  const touchStartY = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentEvent = events[activeIndex] || events[0];
  const isCurrentRed = currentEvent?.accentColor === 'red';

  return (
    <section
      id="events"
      className="snap-section relative flex flex-col justify-center items-center min-h-[100svh] overflow-hidden w-full select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #110D0D 0%, #080808 55%, #020202 100%)',
        justifyContent: 'center',
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        touchAction: 'pan-y',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Background Glow (Static GPU-accelerated opacity crossfade, zero repaint) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[850px] h-[520px] rounded-full pointer-events-none z-0 blur-[120px] transition-opacity duration-700 ease-out ${
          isCurrentRed ? 'opacity-0' : 'opacity-20'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(245, 215, 127, 0.15) 50%, transparent 70%)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[850px] h-[520px] rounded-full pointer-events-none z-0 blur-[120px] transition-opacity duration-700 ease-out ${
          isCurrentRed ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(229, 40, 40, 0.45) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 70%)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
        aria-hidden="true"
      />

      {/* Unified Vertically Centered Showcase Composition (Balanced spacing matching Image 2) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-auto gap-4 sm:gap-5 md:gap-6 pb-14 sm:pb-16 md:pb-20">

        {/* =========================================================================
            TOP HEADER
            ========================================================================= */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-11 h-[1.5px] bg-[#D4AF37]/80" />
            <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
              03 · EVENTS SHOWCASE
            </span>
            <span className="w-8 sm:w-11 h-[1.5px] bg-[#D4AF37]/80" />
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-[#F8F7F4] mt-2 select-none leading-tight">
            <span>A WEEK OF </span>
            <span className="gold-text font-serif-display font-medium">IDEAS</span>
          </h2>
        </div>

        {/* =========================================================================
            3D COVERFLOW MOTION POSTER CAROUSEL (Proportional Sizing matching Reference Image 2)
            ========================================================================= */}
        <div className="relative w-full flex flex-col items-center justify-center">

          {/* 3D Perspective Stage */}
          <div
            className="relative w-full h-[410px] sm:h-[450px] md:h-[485px] lg:h-[505px] flex items-center justify-center transform-gpu"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {events.map((evt, idx) => {
              // Calculate relative offset handling continuous circular wrap
              let offset = (idx - activeIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset === -2;
              const isFarRight = offset === 2;

              const isRed = evt.accentColor === 'red';

              // GPU-composited 3D Transform Styles
              let transform = '';
              let zIndex = 5;
              let opacity = 0;
              let pointerEvents = 'none';

              if (isCenter) {
                transform = 'translate3d(0%, 0, 35px) scale(1.0) rotateY(0deg)';
                zIndex = 30;
                opacity = 1;
                pointerEvents = 'auto';
              } else if (isLeft) {
                transform = 'translate3d(-55%, 0, -45px) scale(0.90) rotateY(12deg)';
                zIndex = 15;
                opacity = 0.95;
                pointerEvents = 'auto';
              } else if (isRight) {
                transform = 'translate3d(55%, 0, -45px) scale(0.90) rotateY(-12deg)';
                zIndex = 15;
                opacity = 0.95;
                pointerEvents = 'auto';
              } else if (isFarLeft) {
                transform = 'translate3d(-108%, 0, -110px) scale(0.78) rotateY(18deg)';
                zIndex = 8;
                opacity = 0.38;
                pointerEvents = 'auto';
              } else if (isFarRight) {
                transform = 'translate3d(108%, 0, -110px) scale(0.78) rotateY(-18deg)';
                zIndex = 8;
                opacity = 0.38;
                pointerEvents = 'auto';
              } else {
                transform = offset < 0
                  ? 'translate3d(-145%, 0, -160px) scale(0.65) rotateY(22deg)'
                  : 'translate3d(145%, 0, -160px) scale(0.65) rotateY(-22deg)';
                zIndex = 1;
                opacity = 0;
                pointerEvents = 'none';
              }

              return (
                <div
                  key={evt.id}
                  onClick={() => handleCardClick(idx, evt)}
                  className={`absolute w-[72vw] sm:w-[305px] md:w-[330px] lg:w-[345px] max-w-[355px] min-w-[240px] aspect-[3/4.15] max-h-[455px] sm:max-h-[485px] rounded-[22px] sm:rounded-[26px] md:rounded-[28px] overflow-hidden cursor-pointer select-none border ${
                    isCenter
                      ? isRed
                        ? 'border-[#FF4D4D] shadow-[0_18px_45px_rgba(0,0,0,0.95),0_0_20px_rgba(255,77,77,0.25)]'
                        : 'border-[#D4AF37] shadow-[0_18px_45px_rgba(0,0,0,0.95),0_0_20px_rgba(212,175,55,0.25)]'
                      : 'border-white/20 shadow-[0_14px_35px_rgba(0,0,0,0.85)]'
                  }`}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    pointerEvents,
                    willChange: 'transform, opacity',
                    transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    backgroundColor: '#0c0c10',
                  }}
                >
                  {/* Poster Background Image with Inherited Rounded Clipping */}
                  <div className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.name}
                      width="1086"
                      height="1448"
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center rounded-[inherit]"
                    />

                    {/* Subtle darkening veil for side cards so center card pops */}
                    {!isCenter && (
                      <div
                        className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition-opacity duration-500 ease-out rounded-[inherit]"
                        aria-hidden="true"
                      />
                    )}

                    {/* Top-Left Card Number (Visible on cards: 1, 2, 3...) */}
                    <div className="absolute top-3.5 left-4 sm:top-4 sm:left-4.5 z-20 pointer-events-none">
                      <span className="font-sans font-bold text-sm sm:text-base text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Top-Right 'Click to Register' (Visible on active center card) */}
                    {isCenter && (
                      <div className="absolute top-3.5 right-4 sm:top-4 sm:right-4.5 z-20 pointer-events-none">
                        <span className="font-sans text-[11px] sm:text-xs font-semibold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          Click to Register
                        </span>
                      </div>
                    )}

                    {/* Bottom Black Vignette & Dot Texture */}
                    <div className="absolute inset-x-0 bottom-0 h-36 sm:h-42 md:h-46 pointer-events-none z-10 rounded-b-[inherit] overflow-hidden">
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

                    {/* Bottom Details Overlay with Clean Grid & Prominent Vertical Divider */}
                    {isCenter && (
                      <div className="absolute inset-x-4 sm:inset-x-5 bottom-3.5 sm:bottom-4 z-20 grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-3.5 pointer-events-none">
                        {/* LEFT COLUMN: Price Pool with visible vertical divider */}
                        <div className="flex flex-col items-start shrink-0 pr-3 sm:pr-3.5 border-r border-white/65">
                          <span className="font-sans text-[9px] sm:text-[10px] font-semibold text-white/80 uppercase tracking-wider leading-none">
                            Price Pool
                          </span>
                          <span className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                            {evt.prizeDisplay || "3K"}
                          </span>
                        </div>

                        {/* RIGHT COLUMN: Event Name, Venue, Time */}
                        <div className="flex flex-col justify-center gap-1 min-w-0 text-left">
                          {/* Row 1: Trophy + Event Name */}
                          <div className="flex items-center gap-1.5 min-w-0 text-white font-semibold text-xs sm:text-[13px] leading-tight">
                            <Trophy size={13} className="text-white shrink-0" strokeWidth={2} />
                            <span className="truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                              {evt.nameDisplay || evt.name}
                            </span>
                          </div>

                          {/* Row 2: MapPin + Venue */}
                          <div className="flex items-center gap-1.5 min-w-0 text-white/90 font-medium text-[10.5px] sm:text-[11.5px] leading-tight">
                            <MapPin size={12} className="text-white/85 shrink-0" strokeWidth={2} />
                            <span className="truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                              {evt.venueDisplay || evt.venue}
                            </span>
                          </div>

                          {/* Row 3: Clock + Time */}
                          <div className="flex items-center gap-1.5 min-w-0 text-white/90 font-medium text-[10.5px] sm:text-[11.5px] leading-tight">
                            <Clock size={12} className="text-white/85 shrink-0" strokeWidth={2} />
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

        </div>

      </div>

      {/* Carousel Navigation Controls (Positioned just above the event section bottom) */}
      <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3.5 sm:gap-4 pointer-events-auto">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Event"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Event"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
