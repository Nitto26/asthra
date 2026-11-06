import React, { useEffect } from 'react';
import { X, Clock, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/sound';

export default function RegistrationNoticeModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
      style={{
        backgroundColor: 'rgba(2, 2, 3, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.08) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main Alternative Card Container */}
      <div
        className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/50 bg-[#09080A] p-7 sm:p-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.22)] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] text-[#E6E3DB] hover:text-[#F5D77F] transition-all flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5D77F] mb-5">
          <Clock size={13} className="text-[#F5D77F]" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            REGISTRATION STATUS
          </span>
        </div>

        {/* Event Name Tag */}
        <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
          {event.name || "ASTHRA ’26 COMPETITIONS"}
        </span>

        {/* Primary Requested Message */}
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          Registration is not started
        </h2>

        {/* Informative Subtext */}
        <p className="font-sans text-xs sm:text-sm text-[#DCD8CF] mt-3.5 max-w-sm leading-relaxed">
          Online registrations for this event will be enabled shortly. Please check back soon or follow our official announcements.
        </p>

        {/* Return Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/25 to-[#F5D77F]/10 hover:from-[#D4AF37]/40 hover:to-[#F5D77F]/25 text-[#F5D77F] hover:text-white font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer active:scale-95"
        >
          <ArrowLeft size={14} />
          RETURN TO FESTIVAL
        </button>

        {/* Footer subtle college mark */}
        <span className="mt-6 text-[9.5px] font-mono tracking-widest text-[#A6A195]/60 uppercase">
          ST. THOMAS COLLEGE (AUTONOMOUS) · THRISSUR
        </span>
      </div>
    </div>
  );
}
