import React, { useState } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { ArrowRight } from 'lucide-react';

export default function EventsSection({ onSelectEvent }) {
  const [hoveredEventId, setHoveredEventId] = useState(null);

  const handleCardClick = (event) => {
    sound.playClick();
    onSelectEvent(event);
  };

  return (
    <section
      id="events"
      className="snap-section relative flex flex-col justify-between min-h-[100svh] overflow-hidden py-14 sm:py-16 md:py-20 w-full"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #110E0E 0%, #070707 65%, #030303 100%)',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      <div className="relative z-20 w-full max-w-[1700px] mx-auto flex-1 flex flex-col justify-between px-2 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-start pt-2 sm:pt-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
              EVENTS SCHEDULE
            </span>
            <span className="w-10 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F7F4] mt-2 select-none leading-tight">
            <span>A WEEK OF </span>
            <span className="gold-text font-serif-display font-medium">IDEAS</span>
          </h2>

          {/* Subtitle with Crimson Red Accent Underline */}
          <div className="mt-2.5 flex flex-col items-start gap-1.5">
            <p className="text-[9.5px] sm:text-xs font-sans font-medium tracking-[0.25em] text-[#A6A195] uppercase">
              THINK · SOLVE · COMPETE · EXPLORE
            </p>
            <span className="w-12 sm:w-14 h-[2px] bg-[#E52828] shadow-[0_0_10px_rgba(229,40,40,0.85)]" />
          </div>
        </div>

        {/* Events Grid (2 columns on large desktop, 1 column on mobile/tablet) */}
        <div className="my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
          {siteConfig.events.map((evt) => {
            const isRed = evt.accentColor === 'red';

            return (
              <div
                key={evt.id}
                onClick={() => handleCardClick(evt)}
                onMouseEnter={() => {
                  setHoveredEventId(evt.id);
                  sound.playClick();
                }}
                onMouseLeave={() => setHoveredEventId(null)}
                className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isRed
                    ? 'border-[#E52828]/70 shadow-[0_0_18px_rgba(229,40,40,0.22)] bg-[#140606]/85 hover:border-[#FF4D4D] hover:shadow-[0_0_28px_rgba(229,40,40,0.45)]'
                    : 'border-[#D4AF37]/35 shadow-[0_0_12px_rgba(212,175,55,0.1)] bg-[#0C0C0E]/85 hover:border-[#F5D77F]/80 hover:shadow-[0_0_24px_rgba(212,175,55,0.3)]'
                }`}
                style={{
                  backdropFilter: 'blur(12px)',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(evt);
                  }
                }}
              >
                {/* Card Background Photography Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center opacity-25 sm:opacity-30 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isRed
                        ? 'bg-gradient-to-r from-[#110404] via-[#110404]/90 to-[#2E0707]/40'
                        : 'bg-gradient-to-r from-[#08080A] via-[#08080A]/90 to-[#1C180E]/40'
                    }`}
                  />
                </div>

                {/* Card Content Row */}
                <div className="relative z-10 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
                  {/* Left: Time + Number + Details */}
                  <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 min-w-0 flex-1">
                    {/* Time */}
                    <div className="flex flex-col items-start flex-shrink-0 w-14 sm:w-18">
                      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#F8F7F4]">
                        {evt.time.split(' ')[0]}
                      </span>
                      <span className="text-[8.5px] sm:text-[9.5px] font-sans font-medium tracking-widest text-[#A6A195]">
                        {evt.time.split(' ')[1]}
                      </span>
                      <span className="w-4 sm:w-5 h-[1px] bg-white/20 mt-1" />
                    </div>

                    {/* Number */}
                    <div className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-light text-white/35 group-hover:text-[#F5D77F]/90 transition-colors flex-shrink-0">
                      {evt.num}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col min-w-0 text-left flex-1">
                      <h3 className="font-serif-display text-base sm:text-lg md:text-xl font-bold tracking-wide text-[#F8F7F4] group-hover:text-[#FFF4D0] transition-colors truncate">
                        {evt.name}
                      </h3>

                      <span className={`text-[8.5px] sm:text-[10px] font-sans font-semibold tracking-[0.2em] uppercase ${
                        isRed ? 'text-[#FF6B6B]' : 'text-[#D4AF37]'
                      }`}>
                        {evt.category}
                      </span>

                      <p className="hidden sm:block text-[11px] md:text-xs text-[#A6A195] font-sans mt-0.5 truncate max-w-sm md:max-w-md">
                        {evt.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow Action */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isRed
                          ? 'border-[#E52828]/60 text-[#FF4D4D] group-hover:bg-[#E52828] group-hover:text-white group-hover:border-[#E52828]'
                          : 'border-[#D4AF37]/50 text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37]'
                      } group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]`}
                    >
                      <ArrowRight size={15} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="pb-2 text-center text-[10px] font-mono tracking-widest text-[#787369]">
          CLICK ANY EVENT FOR SCHEDULE & REGISTRATION
        </div>
      </div>
    </section>
  );
}
