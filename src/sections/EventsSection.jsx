import React, { useState } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { ArrowRight, MapPin, Trophy, Users } from 'lucide-react';

export default function EventsSection({ onSelectEvent }) {
  const [hoveredEventId, setHoveredEventId] = useState(null);

  const handleCardClick = (event) => {
    sound.playClick();
    onSelectEvent(event);
  };

  return (
    <section
      id="events"
      className="snap-section relative flex flex-col justify-start items-center min-h-[100svh] overflow-y-auto py-16 sm:py-20 md:py-24 w-full select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 10%, #130F0F 0%, #080808 55%, #020202 100%)',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      {/* Ambient background glow accents */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none z-0 opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(229, 40, 40, 0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center px-3 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-7 sm:mb-9 md:mb-11">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
            <span className="text-[10.5px] sm:text-xs font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
              03 · EVENTS SCHEDULE
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F8F7F4] mt-2.5 select-none leading-tight">
            <span>A WEEK OF </span>
            <span className="gold-text font-serif-display font-medium">IDEAS</span>
          </h2>

          {/* Subtitle with Crimson Red Accent Underline */}
          <div className="mt-2.5 flex flex-col items-center gap-1.5">
            <p className="text-[9.5px] sm:text-xs md:text-sm font-sans font-medium tracking-[0.25em] text-[#A6A195] uppercase">
              THINK · SOLVE · COMPETE · EXPLORE
            </p>
            <span className="w-12 sm:w-16 h-[2px] bg-[#E52828] shadow-[0_0_10px_rgba(229,40,40,0.8)]" />
          </div>
        </div>

        {/* =========================================================================
            EVENTS VERTICAL STACK (Single Column, Centered, Even Spacing, Compact Sizing)
            ========================================================================= */}
        <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-4.5 w-full items-center">
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
                className={`group relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isRed
                    ? 'border-[#E52828]/45 shadow-[0_3px_20px_rgba(229,40,40,0.15)] bg-[#140606]/90 hover:border-[#FF4D4D] hover:shadow-[0_6px_28px_rgba(229,40,40,0.35)]'
                    : 'border-[#D4AF37]/30 shadow-[0_3px_20px_rgba(212,175,55,0.1)] bg-[#0C0C0E]/90 hover:border-[#F5D77F] hover:shadow-[0_6px_28px_rgba(245,215,127,0.3)]'
                } hover:-translate-y-0.5`}
                style={{
                  backdropFilter: 'blur(16px)',
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
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={evt.image}
                    alt={evt.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center opacity-20 sm:opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-35"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isRed
                        ? 'bg-gradient-to-r from-[#110404] via-[#110404]/92 to-[#2E0707]/50'
                        : 'bg-gradient-to-r from-[#08080A] via-[#08080A]/92 to-[#1C180E]/50'
                    }`}
                  />
                </div>

                {/* Card Main Row: Equal 4-sided padding */}
                <div className="relative z-10 p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-5 md:gap-6">
                  
                  {/* Left: Time + Number + Details */}
                  <div className="flex items-center gap-3.5 sm:gap-5 md:gap-7 min-w-0 flex-1">
                    
                    {/* Time Pillar */}
                    <div className="flex flex-col items-start flex-shrink-0 w-14 sm:w-20 md:w-22">
                      <span className="font-mono text-xs sm:text-base md:text-lg font-bold tracking-wider text-[#F8F7F4]">
                        {evt.time.split(' ')[0]}
                      </span>
                      <span className="text-[8.5px] sm:text-[10.5px] font-sans font-semibold tracking-wider text-[#A6A195] uppercase mt-0.5">
                        {evt.time.split(' ')[1]} {evt.timePeriod && `· ${evt.timePeriod}`}
                      </span>
                      <span className="w-5 sm:w-6 h-[1.5px] bg-[#D4AF37]/50 mt-1.5" />
                    </div>

                    {/* Grand Number */}
                    <div className="font-serif-display text-2xl sm:text-4xl md:text-5xl font-light text-white/30 group-hover:text-[#F5D77F] transition-colors flex-shrink-0 w-8 sm:w-12 md:w-14 text-center">
                      {evt.num}
                    </div>

                    {/* Event Title & Metadata Details */}
                    <div className="flex flex-col min-w-0 text-left flex-1 py-0.5">
                      {/* Category Badge */}
                      <span className={`text-[8.5px] sm:text-[10px] font-sans font-bold tracking-[0.22em] uppercase mb-0.5 ${
                        isRed ? 'text-[#FF6B6B]' : 'text-[#F5D77F]'
                      }`}>
                        {evt.category}
                      </span>

                      {/* Event Name */}
                      <h3 className="font-serif-display text-base sm:text-2xl md:text-[26px] font-bold tracking-wide text-[#F8F7F4] group-hover:text-[#FFF4D0] transition-colors leading-snug">
                        {evt.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-[11px] sm:text-xs md:text-sm text-[#B8B3A8] font-sans mt-0.5 leading-snug truncate">
                        {evt.tagline}
                      </p>

                      {/* Extra Meta Badges (Venue, Team, Prize) */}
                      <div className="hidden sm:flex items-center gap-3.5 sm:gap-5 mt-2 text-[10px] md:text-[11px] font-mono text-[#A6A195]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} className="text-[#D4AF37]" />
                          <span>{evt.venue.split(',')[0]}</span>
                        </span>
                        {evt.prizePool && evt.prizePool !== '—' && (
                          <span className="inline-flex items-center gap-1.5 text-[#F5D77F] font-semibold">
                            <Trophy size={12} className="text-[#D4AF37]" />
                            <span>{evt.prizePool}</span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={12} className="text-[#D4AF37]" />
                          <span>{evt.teamSize}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Circular Action Button */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isRed
                          ? 'border-[#E52828]/70 text-[#FF4D4D] group-hover:bg-[#E52828] group-hover:text-white group-hover:border-[#E52828] shadow-[0_0_12px_rgba(229,40,40,0.3)]'
                          : 'border-[#D4AF37]/60 text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      } group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.45)]`}
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
        <div className="pt-8 pb-3 text-center text-[9.5px] sm:text-xs font-mono tracking-widest text-[#787369]">
          CLICK ANY EVENT FOR ROUND DETAILS, TIMELINE & REGISTRATION
        </div>
      </div>
    </section>
  );
}
