import React from 'react';
import { sound } from '../utils/sound';
import { siteConfig } from '../data/config';
import EclipseCanvas from '../components/EclipseCanvas';

export default function HeroSection() {
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
          CENTER EDITORIAL TYPOGRAPHY (ASTHRA '26 Main Title)
          ========================================================================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-5xl px-3 sm:px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        
        {/* Main Title: ASTHRA ’26 (Spans across the Eclipse circle: 'AS' and ''26' extend outside) */}
        <h1 className="relative font-serif-display text-[clamp(2.9rem,12.5vw,7.5rem)] sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] font-normal tracking-[0.05em] indent-[0.05em] select-none flex items-baseline justify-center leading-none filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          {/* First 'A' with signature swooping flourish leg */}
          <span className="text-[#F5D77F] font-serif-display inline-block relative mr-0.5 sm:mr-1">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-[#FFF4D0] via-[#F5D77F] to-[#D4AF37]">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFF4D0] via-[#F5D77F] to-[#D4AF37] font-serif-display inline-block">
            A
          </span>

          {/* '26 in gold serif script */}
          <span className="font-serif-title text-[clamp(1.85rem,7.8vw,5.5rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#9A7B1C] ml-1.5 sm:ml-3 tracking-normal drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            ’26
          </span>
        </h1>
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
