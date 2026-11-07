import React, { useEffect } from 'react';
import { X, Trophy, MapPin, Clock, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { siteConfig } from '../data/config';

export default function RegistrationNoticeModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const isRed = event.accentColor === 'red';
  const rawLink = event.registrationLink || siteConfig.registrationLink || "##";
  const isLinkReady = rawLink && rawLink !== "##" && !rawLink.startsWith("#");

  const handleRegisterClick = () => {
    sound.playClick();
    if (isLinkReady) {
      if (rawLink.startsWith('http://') || rawLink.startsWith('https://')) {
        window.open(rawLink, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = rawLink;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none animate-fadeIn box-border"
      style={{
        backgroundColor: 'rgba(2, 2, 4, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full pointer-events-none opacity-25"
        style={{
          background: isRed
            ? 'radial-gradient(circle, rgba(255, 77, 77, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        className="relative w-[calc(100vw-2rem)] max-w-[440px] sm:max-w-[460px] m-auto rounded-3xl border border-[#D4AF37]/40 bg-[#09080B] text-center shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
        style={{
          padding: '24px 22px 20px 22px',
          boxShadow: isRed
            ? '0 0 45px rgba(255, 77, 77, 0.18)'
            : '0 0 45px rgba(212, 175, 55, 0.18)',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-[#E6E3DB] hover:text-white transition-all flex items-center justify-center cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={15} />
        </button>

        {/* 1. Header Tag (Centered with comfortable spacing from border) */}
        <div className="w-full text-center pr-6 pl-2 mb-3">
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-[#F5D77F] uppercase inline-block">
            EVENT {event.num || event.id} · {event.category?.split('·')[0]?.trim() || "COMPETITION"}
          </span>
        </div>

        {/* 2. Event Poster Image */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-md mb-4">
          <img
            src={event.image}
            alt={event.name}
            width="800"
            height="450"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center block"
          />
        </div>

        {/* 3. Event Name (Centered with word & letter spacing) */}
        <h2 className="font-serif-display text-xl sm:text-2xl font-bold tracking-wide text-white text-center leading-tight mb-2.5 px-2">
          {event.nameDisplay || event.name}
        </h2>

        {/* 4. Details: Price Pool · Place (Venue) · Time (Centered row with balanced spacing) */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-white/90 font-medium flex-wrap mb-4 px-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <Trophy size={13} className="text-[#F5D77F] shrink-0" />
            <span>{event.prizeDisplay ? `₹ ${event.prizeDisplay} Pool` : event.prizePool}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <MapPin size={13} className="text-[#F5D77F] shrink-0" />
            <span>{event.venueDisplay || event.venue}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Clock size={13} className="text-[#F5D77F] shrink-0" />
            <span>{event.timeDisplay || event.time}</span>
          </div>
        </div>

        {/* 5. Horizontal Divider Line (Generous vertical breathing space) */}
        <div className="w-full h-px bg-white/15 my-3" />

        {/* 6. Registration Notice: Centered with comfortable line and word spacing */}
        <div className="text-center flex flex-col items-center px-2 mb-3">
          <h3 className="font-serif-display text-base sm:text-lg font-bold tracking-wide text-white uppercase leading-snug mb-1.5">
            {isLinkReady ? 'Online Registration is Live' : 'Registration is not started'}
          </h3>

          <p className="font-sans text-xs sm:text-[13px] text-[#A6A195] leading-relaxed max-w-sm mx-auto">
            {isLinkReady
              ? 'Click below to submit your registration entry on the official portal.'
              : 'Online registrations for this competition have not started yet. The registration portal will open soon.'}
          </p>
        </div>

        {/* 7. Action Button (shown only when registration link is live) */}
        {isLinkReady && (
          <div className="w-full mt-2 mb-3 px-2">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-full h-[42px] px-5 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-black font-sans text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
            >
              <span>REGISTER NOW</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* 8. Footer College Mark (Centered with healthy top and bottom clearance) */}
        <div className="w-full mt-2 pt-2.5 text-center border-t border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-[#A6A195]/60 uppercase block text-center">
            ST. THOMAS COLLEGE (AUTONOMOUS) · THRISSUR
          </span>
        </div>
      </div>
    </div>
  );
}
