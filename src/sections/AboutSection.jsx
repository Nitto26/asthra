import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-section relative flex flex-col justify-center overflow-hidden min-h-[100svh] w-full select-none"
      style={{
        backgroundColor: '#020202',
      }}
    >
      {/* =========================================================================
          BACKGROUND IMAGE LAYER & CINEMATIC GRADIENT MASKS
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/about-bg.webp"
          alt="About Section Background"
          width="941"
          height="1672"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08] saturate-[1.05]"
        />
        {/* Full-coverage atmospheric dark gradients for maximum text legibility & contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/85 to-[#020202]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/90 via-[#020202]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />
      </div>

      {/* =========================================================================
          CONTENT WRAPPER: Gracefully Centered & Spread Across Viewport
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-6 sm:px-10 md:px-12 flex flex-col justify-center min-h-[100svh] py-20 sm:py-24 text-left">
        
        {/* Section Pill / Number Tag */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="font-mono text-xs font-semibold text-[#D4AF37]">02</span>
          <span className="w-10 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.3em] text-[#E6E3DB] uppercase">
            ABOUT FESTIVAL
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col items-start mb-6 sm:mb-8">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F8F7F4] leading-[1.2] filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            About <span className="gold-text font-serif-display font-semibold">ASTHRA 2k26</span>
          </h2>
          <span className="w-20 sm:w-28 h-[2px] bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-transparent mt-3" />
        </div>

        {/* Editorial Body: Outfit Font with Generous Line-Height & Spacing */}
        <div className="space-y-5 sm:space-y-6 font-editorial text-[#E6E3DB] filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#F8F7F4] font-normal leading-[1.9] sm:leading-[2.0] tracking-[0.02em]">
            <strong className="text-[#F5D77F] font-semibold">ASTHRA 2k26</strong>, the fourth edition of the departmental fest, is organized by the <strong className="text-white font-medium">Department of Mathematics, St. Thomas College (Autonomous), Thrissur</strong>. Blending mathematical excellence with culture, creativity, and entertainment.
          </p>

          <p className="text-[13.5px] sm:text-[15px] md:text-[16.5px] text-[#D4D0C5] font-light leading-[1.95] sm:leading-[2.05] tracking-[0.02em]">
            Founded as an educational institution in 1889, St. Thomas College is the oldest Catholic college in Kerala. The Department of Mathematics, established in 1926, consistently maintains academic distinction with research and dedicated programmes that foster talent, imagination, and analytical rigor.
          </p>
        </div>

        {/* Bottom Accent Quote & Thank You */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs sm:text-[13px] md:text-sm font-sans font-medium uppercase tracking-[0.18em] text-[#F5D77F] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]">
              Come join us as we create joy and unforgettable moments.
            </p>
            <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#A6A195] uppercase mt-1">
              Thank you.
            </p>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[#8C877B] uppercase tracking-[0.2em] self-start sm:self-auto">
            STC · Thrissur
          </span>
        </div>

      </div>
    </section>
  );
}
