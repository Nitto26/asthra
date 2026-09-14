import React from 'react';
import { ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';
import { siteConfig } from '../data/config';
import EclipseCanvas from '../components/EclipseCanvas';

export default function HeroSection({ onExplore }) {
  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col justify-between items-center text-center overflow-hidden min-h-[100svh] w-full select-none"
      style={{
        backgroundColor: '#030303',
        padding: '0 2rem'
      }}
    >
      {/* 3D WebGL Solar Eclipse Canvas with Photorealistic Corona & Golden Diamond Ring */}
      <EclipseCanvas />

      {/* Atmospheric Ambient Radiant Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-12 opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 215, 127, 0.25) 0%, rgba(212, 175, 55, 0.08) 50%, rgba(0, 0, 0, 0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top Spacer for Nav */}
      <div className="w-full pt-12" />

      {/* =========================================================================
          CENTER EDITORIAL TYPOGRAPHY & SIDE WINGS
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto my-auto flex items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Left Side Wing: IDEAS / PEOPLE / MATHEMATICS */}
        <div className="hidden md:flex flex-col items-start text-left w-44">
          <div className="text-[10px] lg:text-[11px] font-sans font-medium tracking-[0.28em] text-[#A6A195] leading-relaxed uppercase">
            <p className="text-[#E6E3DB]">IDEAS</p>
            <p className="text-[#E6E3DB]">PEOPLE</p>
            <p className="text-[#F5D77F] font-semibold">MATHEMATICS</p>
          </div>
          <span className="w-10 h-[1.5px] bg-[#D4AF37]/80 mt-3" />
        </div>

        {/* Center Main Headline: ASTHRA ’26 + MATHEMATICS FEST */}
        <div className="flex flex-col items-center justify-center flex-1 mx-auto max-w-5xl py-6 sm:py-10">
          {/* Top subtle date pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-black/60 backdrop-blur-md mb-4 sm:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52828] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-[#F5D77F] uppercase">
              {siteConfig.dates}
            </span>
          </div>

          <h1 className="relative font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[128px] font-normal tracking-[0.06em] select-none flex items-baseline justify-center leading-none filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            {/* First 'A' with signature swooping flourish leg */}
            <span className="text-[#F5D77F] font-serif-display inline-block relative mr-0.5 sm:mr-1">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-[#FFF4D0] via-[#F5D77F] to-[#D4AF37]">
                A
              </span>
              {/* Swoosh Tail SVG matching Reference */}
              <svg
                className="absolute -bottom-2 sm:-bottom-3.5 -left-6 sm:-left-12 md:-left-16 w-16 sm:w-28 md:w-36 h-6 sm:h-8 pointer-events-none"
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
            <span className="text-[#F8F7F4] tracking-[0.14em]">
              STHR
            </span>

            {/* Second 'A' in radiant gold */}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFF4D0] via-[#F5D77F] to-[#D4AF37] font-serif-display inline-block">
              A
            </span>

            {/* '26 in gold serif script */}
            <span className="font-serif-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#9A7B1C] ml-2 sm:ml-4 tracking-normal drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              ’26
            </span>
          </h1>

          {/* Subtitle: MATHEMATICS FEST */}
          <div className="mt-5 sm:mt-7 w-full flex flex-col items-center justify-center gap-2">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-sans font-semibold tracking-[0.45em] sm:tracking-[0.52em] text-[#F8F7F4] uppercase text-center">
              MATHEMATICS FEST
            </p>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#A6A195] uppercase">
              {siteConfig.college} · {siteConfig.department}
            </p>
          </div>
        </div>

        {/* Right Side Wing: A / BRIGHTER / TOMORROW */}
        <div className="hidden md:flex flex-col items-end text-right w-44">
          <div className="text-[10px] lg:text-[11px] font-sans font-medium tracking-[0.28em] text-[#A6A195] leading-relaxed uppercase">
            <p className="text-[#E6E3DB]">A</p>
            <p className="text-[#E6E3DB]">BRIGHTER</p>
            <p className="text-[#F5D77F] font-semibold">TOMORROW</p>
          </div>
          <span className="w-10 h-[1.5px] bg-[#D4AF37]/80 mt-3" />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM CENTER: EXPLORE INDICATOR
          ========================================================================= */}
      <div className="relative z-20 pb-8 sm:pb-10 flex flex-col items-center">
        <button
          onClick={() => {
            sound.playExplore();
            onExplore('about');
          }}
          className="explore-indicator focus:outline-none group cursor-pointer"
          aria-label="Explore About ASTHRA"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#A6A195] group-hover:text-[#F5D77F] transition-colors uppercase font-semibold">
            EXPLORE FESTIVAL
          </span>
          <div className="explore-circle group-hover:border-[#F5D77F] border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_25px_rgba(245,215,127,0.4)]">
            <ChevronDown size={18} className="text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
}
