import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/config';

export default function DonateModal({ isOpen, initialTier, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(initialTier?.amountValue || 1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const effectiveAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setSubmitted(true);
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF4D0', '#F5D77F', '#E52828']
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
        className="relative w-full max-w-lg my-auto rounded-3xl border border-[#D4AF37]/50 bg-[#0A0A0C] text-left shadow-2xl p-6 sm:p-9 md:p-10"
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
            ASTHRA SOCIAL INITIATIVE
          </span>
          <span className="w-6 h-[1px] bg-[#D4AF37]/60" />
        </div>

        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F8F7F4] tracking-wide">
          Contribute to the Cause
        </h2>
        <p className="text-xs text-[#A6A195] font-sans mt-1">
          100% of festival contributions directly provide learning resources and STEM mentorship kits for rural students.
        </p>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-white">Thank You for Your Generosity!</h3>
            <p className="text-xs text-[#A6A195] max-w-md">
              Your contribution of <strong className="text-[#F5D77F]">₹ {effectiveAmount.toLocaleString('en-IN')}</strong> will illuminate a young student's mathematical journey. A tax-exemption receipt has been forwarded to {donorEmail || 'your email'}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 btn-gold-solid !py-2.5 !px-8 text-xs"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {/* Preset Tier Buttons */}
            <div>
              <label className="text-[10px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase block mb-2">
                SELECT CONTRIBUTION TIER
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                      sound.playClick();
                    }}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'border-[#D4AF37] bg-[#1C1910] text-[#F5D77F] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'border-white/10 bg-black/40 text-white hover:border-white/25'
                    }`}
                  >
                    <span className="font-serif-display text-base font-bold block">₹ {amt.toLocaleString('en-IN')}</span>
                    <span className="text-[8px] text-[#A6A195] uppercase block mt-0.5">
                      {amt === 500 ? 'Books' : amt === 1000 ? 'Scholarship' : 'STEM Lab'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Option */}
            <div>
              <label className="text-[10px] font-mono text-[#A6A195] block mb-1">OR CUSTOM AMOUNT (₹)</label>
              <input
                type="number"
                min="100"
                placeholder="Enter custom amount in INR"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Donor Details */}
              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    YOUR NAME (OR ANONYMOUS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul K."
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-mono tracking-wider text-[#A6A195] block mb-1.5 uppercase">
                    EMAIL ADDRESS (FOR 80G RECEIPT) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[10px] text-[#A6A195] pt-1">
                <ShieldCheck size={14} className="text-[#F5D77F]" />
                <span>100% directly channeled to STC Mathematical Scholarship Fund.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 mt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 px-6 rounded-xl border border-white/20 text-[#A6A195] hover:text-white hover:border-white/40 font-sans text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="h-11 px-7 rounded-xl font-sans font-bold text-xs tracking-[0.18em] uppercase bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] hover:brightness-110 text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>CONTRIBUTE ₹{effectiveAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
          </form>
        )}
      </div>
    </div>
  );
}
