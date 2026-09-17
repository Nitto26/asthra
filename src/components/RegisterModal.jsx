import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/config';

export default function RegisterModal({ isOpen, onClose }) {
  const [passType, setPassType] = useState('all-access');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '3rd Year',
    department: 'Mathematics'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF4D0', '#F5D77F', '#E52828', '#FFFFFF']
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
        className="relative w-full max-w-xl my-auto rounded-3xl border border-[#D4AF37]/50 bg-[#0A0A0C] text-left shadow-2xl p-6 sm:p-9 md:p-10"
        style={{
          boxShadow: '0 0 45px rgba(212, 175, 55, 0.28)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#E6E3DB] hover:text-white transition-all focus:outline-none cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs font-semibold text-[#D4AF37]">
            ASTHRA ’26 OFFICIAL ENTRY
          </span>
          <span className="w-6 h-[1px] bg-[#D4AF37]/60" />
        </div>

        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F8F7F4] tracking-wide">
          Festival Delegate Pass
        </h2>
        <p className="text-xs text-[#A6A195] font-sans mt-1">
          Join 1,000+ mathematics enthusiasts for 3 days of competitions, workshops, and keynote reflections at St. Thomas College.
        </p>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-white">Delegate Pass Issued!</h3>
            <p className="text-xs text-[#A6A195] max-w-md">
              Welcome to ASTHRA ’26, <strong className="text-white">{formData.name}</strong>. Your QR entry badge and festival schedule have been sent to <strong className="text-[#F5D77F]">{formData.email}</strong>.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-black/50 border border-[#D4AF37]/30 text-left w-full max-w-sm font-mono text-xs text-[#E6E3DB] space-y-1">
              <div><span className="text-[#A6A195]">DELEGATE ID:</span> AST-2026-{(Math.random() * 90000 + 10000).toFixed(0)}</div>
              <div><span className="text-[#A6A195]">PASS TIER:</span> {passType.toUpperCase()}</div>
              <div><span className="text-[#A6A195]">VENUE:</span> Jubilee Complex, STC Thrissur</div>
            </div>
            <button
              onClick={onClose}
              className="mt-4 btn-gold-solid !py-2.5 !px-8 text-xs"
            >
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {/* Pass Tier Selector */}
            <div>
              <label className="text-[10px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase block mb-2">
                SELECT PASS CATEGORY
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPassType('all-access')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    passType === 'all-access'
                      ? 'border-[#D4AF37] bg-[#1A1812] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-white">ALL ACCESS PASS</span>
                    <span className="text-xs font-serif-display text-[#F5D77F] font-bold">FREE</span>
                  </div>
                  <span className="text-[10px] text-[#A6A195] block mt-1">All events, quizzes & keynotes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPassType('workshop-delegate')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    passType === 'workshop-delegate'
                      ? 'border-[#D4AF37] bg-[#1A1812] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-white">WORKSHOP TRACK</span>
                    <span className="text-xs font-serif-display text-[#F5D77F] font-bold">CERTIFIED</span>
                  </div>
                  <span className="text-[10px] text-[#A6A195] block mt-1">Includes kit & lab sessions</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">FULL NAME *</label>
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
                <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">EMAIL ADDRESS *</label>
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
                <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">PHONE NUMBER *</label>
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
                <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">COLLEGE / INSTITUTION *</label>
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

            <div className="flex items-center gap-2 text-[10px] text-[#A6A195] mt-2">
              <ShieldCheck size={14} className="text-[#F5D77F]" />
              <span>Instant digital delegate confirmation issued immediately</span>
            </div>

            <button
              type="submit"
              className="mt-3 h-12 rounded-xl font-sans font-bold text-xs tracking-[0.2em] uppercase bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] hover:brightness-110 text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all w-full"
            >
              <span>GENERATE DELEGATE PASS</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
