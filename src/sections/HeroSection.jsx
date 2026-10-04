import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { siteConfig } from '../data/config';
import EclipseCanvas from '../components/EclipseCanvas';

const TARGET_DATE = new Date('2026-11-27T00:00:00').getTime();

export default function HeroSection() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      return { isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { isPast: false, days, hours, minutes, seconds };
  }

  // Update live countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 5-second alternating loop: ASTHRA '26 <-> LIVE COUNTDOWN
  // Stops completely once Nov 27, 2026 arrives (stays fixed on ASTHRA '26)
  useEffect(() => {
    if (timeLeft.isPast) {
      setShowCountdown(false);
      return;
    }

    const interval = setInterval(() => {
      setShowCountdown((prev) => !prev);
    }, 5500);

    return () => clearInterval(interval);
  }, [timeLeft.isPast]);

  return (
    <section
      id="hero"
      className="snap-section relative w-full h-[100svh] min-h-[580px] overflow-hidden select-none bg-[#030303] flex items-center justify-center"
    >
      {/* 3D WebGL Solar Eclipse Canvas with Photorealistic Corona & Golden Diamond Ring */}
      <EclipseCanvas />

      {/* Atmospheric Ambient Radiant Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] rounded-full pointer-events-none z-10 opacity-25 blur-[100px] sm:blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 215, 127, 0.25) 0%, rgba(212, 175, 55, 0.08) 50%, rgba(0, 0, 0, 0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          LEFT SIDE WING (Only on Wide Screens, Fully Decoupled from Center)
          ========================================================================= */}
      <div className="hidden xl:flex absolute left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-20 flex-col items-start text-left w-36 pointer-events-auto">
        <div className="text-[10px] lg:text-[11px] font-sans font-medium tracking-[0.28em] indent-[0.28em] text-[#A6A195] leading-relaxed uppercase">
          <p className="text-[#E6E3DB]">IDEAS</p>
          <p className="text-[#E6E3DB]">PEOPLE</p>
          <p className="text-[#F5D77F] font-semibold">MATHEMATICS</p>
        </div>
        <span className="w-10 h-[1.5px] bg-[#D4AF37]/80 mt-3" />
      </div>

      {/* =========================================================================
          CENTER EDITORIAL TYPOGRAPHY (ASTHRA '26 / LIVE COUNTDOWN CROSS-FADE)
          ========================================================================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-5xl px-3 sm:px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        
        {/* Layer 1: ASTHRA ’26 */}
        <h1
          className={`relative font-serif-display text-[clamp(2.9rem,12.5vw,7.5rem)] sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] font-normal tracking-[0.05em] indent-[0.05em] select-none flex items-baseline justify-center leading-none filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] transition-all duration-[2500ms] ease-in-out ${
            !showCountdown
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-95 blur-md pointer-events-none'
          }`}
        >
          {/* First 'A' with signature swooping flourish leg */}
          <span className="text-[#F5D77F] font-serif-display inline-block relative mr-0.5 sm:mr-1">
            <span className="relative z-10 gold-text font-serif-display">
              A
            </span>
            {/* Swoosh Tail SVG */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3.5 -left-3.5 sm:-left-8 md:-left-12 w-12 sm:w-22 md:w-32 h-4 sm:h-8 pointer-events-none"
              viewBox="0 0 140 28"
              fill="none"
            >
              <path
                d="M 130 4 C 85 4, 25 16, 0 26"
                stroke="url(#goldSwooshGrad)"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="goldSwooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#F5D77F" />
                  <stop offset="100%" stopColor="#FFF4D0" />
                </linearGradient>
              </defs>
            </svg>
          </span>

          {/* STHR in luminous silver-white */}
          <span className="text-[#F8F7F4] tracking-[0.1em] indent-[0.1em]">
            STHR
          </span>

          {/* Second 'A' in radiant gold */}
          <span className="gold-text font-serif-display inline-block">
            A
          </span>

          {/* '26 in gold serif script */}
          <span className="font-serif-title text-[clamp(1.85rem,7.8vw,5.5rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gold-text ml-1.5 sm:ml-3 tracking-normal drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            ’26
          </span>
        </h1>

        {/* Layer 2: LIVE COUNTDOWN TO NOV 27, 2026 (Spanning Grand across Eclipse) */}
        {!timeLeft.isPast && (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center whitespace-nowrap transition-all duration-[2500ms] ease-in-out ${
              showCountdown
                ? 'opacity-100 scale-100 blur-0 pointer-events-auto'
                : 'opacity-0 scale-105 blur-md pointer-events-none'
            }`}
          >
            {/* Grand Countdown Numbers Row (Optimized & Grand on Mobile & Desktop) */}
            <div className="font-serif-display text-[clamp(3.1rem,13.2vw,7.6rem)] sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] font-normal tracking-[0.01em] select-none flex items-start justify-center leading-none filter drop-shadow-[0_4px_35px_rgba(0,0,0,0.98)]">
              
              {/* Days (Left - Outside Eclipse in Gold) */}
              <div className="flex flex-col items-center">
                <span className="gold-text font-serif-display font-bold drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] md:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] indent-[0.2em] sm:indent-[0.25em] text-[#A6A195] uppercase mt-2.5 sm:mt-3.5 md:mt-4">
                  DAYS
                </span>
              </div>

              {/* Separator */}
              <span className="font-serif-display text-[#D4AF37]/75 mx-0.5 sm:mx-2 md:mx-3 -mt-1 sm:-mt-2 select-none">
                :
              </span>

              {/* Hours (Inside Eclipse in Gold) */}
              <div className="flex flex-col items-center">
                <span className="gold-text font-serif-display font-bold drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] md:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] indent-[0.2em] sm:indent-[0.25em] text-[#A6A195] uppercase mt-2.5 sm:mt-3.5 md:mt-4">
                  HOURS
                </span>
              </div>

              {/* Separator */}
              <span className="font-serif-display text-[#D4AF37]/75 mx-0.5 sm:mx-2 md:mx-3 -mt-1 sm:-mt-2 select-none">
                :
              </span>

              {/* Minutes (Inside Eclipse in Gold) */}
              <div className="flex flex-col items-center">
                <span className="gold-text font-serif-display font-bold drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] md:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] indent-[0.2em] sm:indent-[0.25em] text-[#A6A195] uppercase mt-2.5 sm:mt-3.5 md:mt-4">
                  MINS
                </span>
              </div>

              {/* Separator */}
              <span className="font-serif-display text-[#D4AF37]/75 mx-0.5 sm:mx-2 md:mx-3 -mt-1 sm:-mt-2 select-none">
                :
              </span>

              {/* Seconds (Right - Outside Eclipse in Radiant Luminous White) */}
              <div className="flex flex-col items-center">
                <span className="text-[#F8F7F4] font-serif-display font-bold drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] md:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] indent-[0.2em] sm:indent-[0.25em] text-[#A6A195] uppercase mt-2.5 sm:mt-3.5 md:mt-4">
                  SECS
                </span>
              </div>
            </div>

            {/* Date Tag Bar Below (With prominent, generous separation from clock) */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mt-10 sm:mt-14 md:mt-18 lg:mt-20 opacity-95">
              <span className="w-12 sm:w-20 md:w-24 h-[1.5px] bg-[#D4AF37]/80" />
              <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.35em] indent-[0.35em] text-[#F5D77F] uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                NOVEMBER 27, 2026
              </span>
              <span className="w-12 sm:w-20 md:w-24 h-[1.5px] bg-[#D4AF37]/80" />
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          RIGHT SIDE WING (Only on Wide Screens, Fully Decoupled from Center)
          ========================================================================= */}
      <div className="hidden xl:flex absolute right-8 2xl:right-14 top-1/2 -translate-y-1/2 z-20 flex-col items-end text-right w-36 pointer-events-auto">
        <div className="text-[10px] lg:text-[11px] font-sans font-medium tracking-[0.28em] indent-[0.28em] text-[#A6A195] leading-relaxed uppercase">
          <p className="text-[#E6E3DB]">A</p>
          <p className="text-[#E6E3DB]">BRIGHTER</p>
          <p className="text-[#F5D77F] font-semibold">TOMORROW</p>
        </div>
        <span className="w-10 h-[1.5px] bg-[#D4AF37]/80 mt-3" />
      </div>
    </section>
  );
}
