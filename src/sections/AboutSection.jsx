import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-section relative flex flex-col justify-between overflow-hidden min-h-[100svh] w-full select-none"
      style={{
        backgroundColor: '#020202',
      }}
    >
      {/* =========================================================================
          BACKGROUND IMAGE LAYER & CINEMATIC GRADIENT MASKS
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/about-bg.png"
          alt="About Section Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top filter brightness-[1.05] contrast-[1.02] saturate-[1.08]"
        />
        {/* Soft top vignette for navbar/tag clarity */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020202]/60 via-[#020202]/20 to-transparent pointer-events-none" />
        {/* Soft bottom gradient to keep text legible while showing the imagery */}
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#020202] via-[#020202]/75 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          TOP HEADER TAG (In-flow at top of section)
          ========================================================================= */}
      <div className="relative z-20 flex flex-col items-start text-left pointer-events-none">
        <span className="font-mono text-xs sm:text-sm font-semibold text-[#D4AF37]">
          02
        </span>
        <span className="text-[10.5px] sm:text-xs font-sans font-semibold tracking-[0.32em] text-[#E6E3DB] uppercase mt-0.5">
          ABOUT FESTIVAL
        </span>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL TYPOGRAPHY (In-flow at bottom of section)
          ========================================================================= */}
      <div className="relative z-20 max-w-xl text-left pb-2 sm:pb-4 md:pb-6">
        {/* Title: "About" on Line 1, "ASTHRA 2k26" on Line 2 */}
        <h2 className="leading-[0.95] filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] mb-3.5 sm:mb-4.5">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F8F7F4] tracking-tight font-serif-display">
            About
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal gold-text font-serif-display tracking-tight mt-1 sm:mt-1.5">
            ASTHRA <span className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal">2k26</span>
          </span>
        </h2>

        {/* Formatted Content with Rich Contrast & Exact Hierarchy */}
        <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-base font-sans text-[#E6E3DB] leading-relaxed filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] max-w-lg">
          <p className="leading-relaxed">
            <strong className="text-[#F5D77F] font-bold">ASTHRA 2k26</strong>, the fourth edition of the departmental fest, is organized by the <strong className="text-[#FFFFFF] font-bold">Department of Mathematics, St. Thomas College (Autonomous), Thrissur.</strong>
          </p>
          <p className="leading-relaxed text-[#E6E3DB]/95 font-normal">
            Blending mathematical excellence with culture, creativity, and entertainment.
          </p>
        </div>
      </div>
    </section>
  );
}
