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

      {/* 1. Modal Container (0px horizontal padding for full-width banner) */}
      <div
        className="modal-container relative w-full max-w-[460px] sm:max-w-[480px] my-auto rounded-[22px] sm:rounded-[24px] border border-[#D4AF37]/35 bg-[#09080B] text-left shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
        style={{
          boxShadow: isRed
            ? '0 0 50px rgba(255, 77, 77, 0.16)'
            : '0 0 50px rgba(212, 175, 55, 0.16)',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 2. Header (14px horizontal padding, ~38px height) */}
        <div className="modal-header flex items-center justify-between px-3.5 h-[38px] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#F5D77F] bg-[#14120C] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-sm leading-none flex items-center">
              EVENT {event.num || event.id}
            </span>
            <span className="font-sans text-[10px] font-semibold tracking-wider text-[#A6A195] uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 leading-none flex items-center">
              {event.category?.split('·')[0]?.trim() || "COMPETITION"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[#E6E3DB] hover:text-white transition-all flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* 3. Event Banner (~175px height, edge-to-edge with 16px internal padding for content) */}
        <div className="event-banner relative w-full h-[175px] overflow-hidden bg-black shrink-0 border-b border-white/10">
          <img
            src={event.image}
            alt={event.name}
            width="800"
            height="450"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

          {/* Banner Content (16px horizontal padding) */}
          <div className="event-banner-content absolute inset-x-0 bottom-0 px-4 py-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            <h2 className="event-title font-serif-display text-lg sm:text-xl font-bold tracking-wide text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] truncate">
              {event.nameDisplay || event.name}
            </h2>
            <div className="event-meta flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/90 font-medium">
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <Trophy size={12} className="text-[#F5D77F] shrink-0" />
                <span>{event.prizeDisplay ? `₹ ${event.prizeDisplay} Pool` : event.prizePool}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <MapPin size={12} className="text-[#F5D77F] shrink-0" />
                <span>{event.venueDisplay || event.venue}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <Clock size={12} className="text-[#F5D77F] shrink-0" />
                <span>{event.timeDisplay || event.time}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4. Lower Content Container (16px horizontal padding) */}
        <div className="px-4 pt-3.5 pb-2 flex flex-col">
          {/* Registration Status Section (12-14px vertical padding, 6-8px internal gaps) */}
          <div className="registration-status w-full rounded-xl sm:rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#14120A]/90 to-[#0A0A0C]/95 py-3 px-4 text-center shadow-[0_0_20px_rgba(212,175,55,0.06)] flex flex-col items-center gap-1.5 sm:gap-2 box-border">
            <div className="status-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D77F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase">
                STATUS · {isLinkReady ? 'REGISTRATION LIVE' : 'NOT STARTED'}
              </span>
            </div>

            <h3 className="registration-heading font-serif-display text-base sm:text-lg font-bold tracking-wide text-white leading-tight uppercase mt-0.5">
              {isLinkReady ? 'Online Registration is Live' : 'REGISTRATION IS NOT STARTED'}
            </h3>

            <p className="registration-description font-sans text-xs text-[#DCD8CF] leading-relaxed max-w-sm mx-auto">
              {isLinkReady
                ? 'Click below to submit your registration entry on the official portal.'
                : 'Online registrations for this competition have not started yet.'}
            </p>

            {!isLinkReady && (
              <p className="registration-supporting-text font-sans text-xs text-[#A6A195] leading-relaxed">
                The registration portal will open soon.
              </p>
            )}
          </div>

          {/* 5. Modal Action Buttons (12-16px top spacing) */}
          <div className="modal-actions flex items-center gap-2.5 sm:gap-3 w-full mt-3.5 sm:mt-4">
            {isLinkReady ? (
              <button
                type="button"
                onClick={handleRegisterClick}
                className="registration-button flex-1 h-[40px] sm:h-[42px] px-5 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-black font-sans text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
              >
                <span>REGISTER NOW</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="registration-button flex-1 h-[40px] sm:h-[42px] px-4 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F5D77F] font-sans text-xs font-bold tracking-widest uppercase cursor-not-allowed flex items-center justify-center select-none"
              >
                REGISTRATION OPENS SOON
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="close-button shrink-0 h-[40px] sm:h-[42px] px-5 sm:px-6 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center active:scale-95"
            >
              CLOSE
            </button>
          </div>

          {/* 6. Footer (10-12px top spacing, 8px bottom padding) */}
          <div className="modal-footer w-full mt-3 sm:mt-3.5 pb-2 text-center">
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest text-[#A6A195]/60 uppercase block text-center">
              ST. THOMAS COLLEGE (AUTONOMOUS) · THRISSUR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
