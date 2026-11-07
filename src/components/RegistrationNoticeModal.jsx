import React, { useEffect } from 'react';
import { X, Trophy, MapPin, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none animate-fadeIn"
      style={{
        backgroundColor: 'rgba(2, 2, 4, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,560px)] h-[min(90vw,560px)] rounded-full pointer-events-none opacity-25"
        style={{
          background: isRed
            ? 'radial-gradient(circle, rgba(255, 77, 77, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main Modal Dialog Container */}
      <div
        className="relative w-full max-w-lg my-auto rounded-[28px] sm:rounded-[32px] border border-[#D4AF37]/35 bg-[#09080B] text-left shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 overflow-hidden"
        style={{
          boxShadow: isRed
            ? '0 0 50px rgba(255, 77, 77, 0.16)'
            : '0 0 50px rgba(212, 175, 55, 0.16)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold tracking-widest text-[#F5D77F] bg-[#14120C] px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
              EVENT {event.num || event.id}
            </span>
            <span className="font-sans text-[11px] font-semibold tracking-wider text-[#A6A195] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {event.category?.split('·')[0]?.trim() || "COMPETITION"}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[#E6E3DB] hover:text-white transition-all flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Poster Banner with Integrated Meta */}
        <div className="my-5 rounded-2xl overflow-hidden h-36 sm:h-44 relative border border-white/10 shadow-lg bg-black">
          <img
            src={event.image}
            alt={event.name}
            width="800"
            height="450"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {/* Overlaid Event Title & Key Meta */}
          <div className="absolute inset-x-4 bottom-3 flex flex-col gap-1 text-white">
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {event.nameDisplay || event.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Trophy size={13} className="text-[#F5D77F]" />
                {event.prizeDisplay ? `₹ ${event.prizeDisplay} Pool` : event.prizePool}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-[#F5D77F]" />
                {event.venueDisplay || event.venue}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-[#F5D77F]" />
                {event.timeDisplay || event.time}
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated "Registration is not started" Status Card */}
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#14120A]/90 to-[#0A0A0C]/95 p-5 text-center shadow-[0_0_25px_rgba(212,175,55,0.08)] mb-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5D77F] mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D77F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              STATUS · {isLinkReady ? 'REGISTRATION LIVE' : 'NOT STARTED'}
            </span>
          </div>

          {/* Primary Status Heading */}
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold tracking-wide text-white leading-tight">
            {isLinkReady ? 'Online Registration is Live' : 'Registration is not started'}
          </h3>

          <p className="font-sans text-xs sm:text-[13px] text-[#DCD8CF] mt-2 max-w-sm mx-auto leading-relaxed">
            {isLinkReady
              ? 'Click below to submit your registration entry on the official portal.'
              : 'Online registrations for this competition have not started yet. The registration portal will open soon.'}
          </p>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center gap-3">
          {isLinkReady ? (
            <button
              onClick={handleRegisterClick}
              className="flex-1 py-3 px-5 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-black font-sans text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
            >
              <span>REGISTER NOW</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              disabled
              className="flex-1 py-3 px-4 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F5D77F] font-sans text-xs font-bold tracking-widest uppercase cursor-not-allowed opacity-80"
            >
              REGISTRATION OPENS SOON
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="py-3 px-5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shrink-0 active:scale-95"
          >
            CLOSE
          </button>
        </div>

        {/* Footer College Mark */}
        <div className="mt-4 pt-3 border-t border-white/5 text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#A6A195]/60 uppercase">
            ST. THOMAS COLLEGE (AUTONOMOUS) · THRISSUR
          </span>
        </div>
      </div>
    </div>
  );
}
