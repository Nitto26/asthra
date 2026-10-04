import React, { useState } from 'react';
import { X, Trophy, Users, MapPin, Phone, Calendar, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function EventModal({ event, onClose, onOpenGeneralRegister }) {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamName: ''
  });

  if (!event) return null;

  const isRed = event.accentColor === 'red';

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setRegistered(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: isRed ? ['#E52828', '#FF6B6B', '#D4AF37', '#FFFFFF'] : ['#D4AF37', '#FFF4D0', '#F5D77F', '#FFFFFF']
    });
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(3, 3, 3, 0.92)',
        backdropFilter: 'blur(16px)',
        padding: 'max(2rem, 5svh) 1rem max(2rem, 5svh) 1rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl my-auto rounded-3xl border ${isRed ? 'border-[#E52828]/60 bg-[#0E0606]' : 'border-[#D4AF37]/50 bg-[#0A0A0C]'
          } text-left shadow-2xl p-6 sm:p-9 md:p-10`}
        style={{
          boxShadow: isRed ? '0 0 45px rgba(229, 40, 40, 0.3)' : '0 0 45px rgba(212, 175, 55, 0.28)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#E6E3DB] hover:text-white transition-all focus:outline-none cursor-pointer z-20"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Modal Top Category & Time Header */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 pt-1">
          <span className="font-mono text-xs font-semibold tracking-wider text-[#D4AF37]">
            EVENT {event.num} · {event.time}
          </span>
          <span className={`text-[9.5px] sm:text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full ${isRed ? 'bg-[#E52828]/20 text-[#FF6B6B] border border-[#E52828]/40' : 'bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/40'
            }`}>
            {event.category}
          </span>
        </div>

        {/* Event Main Title */}
        <h2 className="font-serif-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#F8F7F4] tracking-wide leading-tight">
          {event.name}
        </h2>

        <p className="text-xs sm:text-sm text-[#A6A195] font-sans mt-2 leading-relaxed">
          {event.tagline}
        </p>

        {/* Image Banner */}
        <div className="my-6 rounded-2xl overflow-hidden h-44 sm:h-56 relative border border-white/10 shadow-lg">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-white/95 font-mono">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#F5D77F]" /> {event.venue}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#F5D77F]" /> {event.teamSize}</span>
          </div>
        </div>

        {/* Meta Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-7">
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[9.5px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase block mb-1">PRIZE POOL</span>
            <span className="font-serif-display text-base sm:text-lg font-bold text-[#F5D77F]">{event.prizePool}</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[9.5px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase block mb-1">TEAM FORMAT</span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#F8F7F4]">{event.teamSize}</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[9.5px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase block mb-1">COORDINATOR</span>
            <span className="font-sans text-xs sm:text-sm text-[#E6E3DB] truncate block">{event.coordinators}</span>
          </div>
        </div>

        {/* Overview Description */}
        <div className="mb-7">
          <h4 className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
            OVERVIEW
          </h4>
          <p className="text-xs sm:text-sm text-[#E6E3DB] leading-relaxed">
            {event.fullDescription}
          </p>
        </div>

        {/* Rounds / Schedule Structure */}
        {event.rounds && event.rounds.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              ROUNDS & STRUCTURE
            </h4>
            <div className="space-y-2.5">
              {event.rounds.map((rnd, i) => (
                <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                  <span className="font-semibold text-[#F8F7F4] block mb-1 text-xs sm:text-sm">{rnd.round}</span>
                  <span className="text-[#A6A195] leading-relaxed">{rnd.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            REGISTER NOW OPTION / FORM (Beautifully Padded & Formatted)
            ========================================================================= */}
        <div className="p-5 sm:p-7 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#13110A]/90 to-[#070708]/95 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
          {registered ? (
            <div className="py-6 sm:py-8 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">Registration Confirmed!</h3>
              <p className="text-xs sm:text-sm text-[#A6A195] max-w-md">
                You are registered for <span className="text-[#F5D77F] font-semibold">{event.name}</span>. An official entry pass has been sent to <span className="text-white font-medium">{formData.email || 'your email'}</span>.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 btn-gold-solid !py-2.5 !px-8 text-xs font-bold"
              >
                DONE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#F5D77F]" />
                  <h4 className="text-xs sm:text-[13px] font-sans font-bold tracking-[0.2em] text-[#F5D77F] uppercase">
                    REGISTER FOR THIS EVENT
                  </h4>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#A6A195]">FREE ENTRY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    PARTICIPANT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Raman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. anand@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    WHATSAPP / MOBILE *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    COLLEGE / INSTITUTION *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Thomas College Thrissur"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-end gap-3 pt-3 mt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 px-6 rounded-xl border border-white/20 text-[#A6A195] hover:text-white hover:border-white/40 font-sans text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  type="submit"
                  className={
                    isRed
                      ? 'h-11 px-7 rounded-xl font-sans font-bold text-xs tracking-[0.18em] uppercase bg-[#E52828] hover:bg-[#FF4D4D] text-white shadow-[0_0_20px_rgba(229,40,40,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all'
                      : 'h-11 px-7 rounded-xl font-sans font-bold text-xs tracking-[0.18em] uppercase bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] hover:brightness-110 text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all'
                  }
                >
                  <span>CONFIRM REGISTRATION</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

