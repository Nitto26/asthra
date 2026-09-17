import React from 'react';
import { sound } from '../utils/sound';

export default function AboutSection({ onScrollNext }) {
  return (
    <section
      id="about"
      className="snap-section relative flex flex-col justify-center overflow-hidden min-h-[100svh] w-full select-none py-12 sm:py-16"
      style={{
        backgroundColor: '#020202'
      }}
    >
      {/* =========================================================================
          BACKGROUND IMAGE LAYER
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/WhatsApp Image 2026-09-16 at 7.54.49 PM.jpeg"
          alt="About Section Background"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] saturate-[1.05] opacity-90"
        />
        {/* Gradient for Text Contrast & Section Transitions */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-20 flex items-center justify-between pt-2">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#D4AF37]">02</span>
            <span className="w-10 h-[1.5px] bg-[#D4AF37]/80" />
          </div>
          <span className="text-[11px] font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase mt-1">
            ABOUT FESTIVAL
          </span>
        </div>
      </div>

      {/* =========================================================================
          MAIN TEXT CONTENT: Seamless Typography Directly over Image
          ========================================================================= */}
      <div className="relative z-20 my-auto py-6 max-w-3xl text-left">
        {/* Title */}
        <div className="flex flex-col items-start mb-5 sm:mb-6">
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F8F7F4] leading-tight filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
            About <span className="gold-text font-serif-display font-semibold">Asthra 2025</span>
          </h2>
          <span className="w-20 h-[2px] bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-transparent mt-3" />
        </div>

        {/* Formatted Content with Rich Contrast & Spacing */}
        <div className="space-y-4 text-xs sm:text-sm md:text-base font-sans text-[#E6E3DB] leading-relaxed tracking-wide filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          <p className="text-[#F8F7F4] font-medium leading-relaxed">
            <strong className="text-[#F5D77F] font-semibold">St. Thomas College, Thrissur</strong>, is the oldest Catholic College in Kerala and is the first College to have been established by diocesan clergy in India and is older than all the Universities in Kerala. It was founded as an educational institution in 1889.
          </p>
          
          <p className="leading-relaxed text-[#DCD8CF]">
            The Department of Mathematics started in the year 1926 and presently offers research in Mathematics along with two UG and one PG courses in Mathematics. The department consistently maintains a high level of academic excellence and intends to produce highly qualified and motivated Mathematicians.
          </p>

          <p className="leading-relaxed text-[#DCD8CF]">
            The Mathematics Department in STC holds the record for having the largest number of students within the department. With over <span className="text-[#F5D77F] font-semibold">10+ professors</span> and <span className="text-[#F5D77F] font-semibold">300 students</span>, we clearly have a lot of strength. And with that strength comes a lot of talent and capabilities. When it comes to creativity and imagination, we clearly don’t fall short.
          </p>

          <p className="leading-relaxed text-[#F8F7F4]">
            So We, The Department of Mathematics, St. Thomas College (Autonomous) Thrissur are proud to present our first ever grand fest <strong className="text-[#F5D77F] font-semibold">'Asthra 2024'</strong> on <span className="text-[#F5D77F] font-semibold">December 5th and 6th</span>. The fest will be a colourful combination of maths, culture, and entertainment and will surely be a one-of-a-kind experience.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-t border-white/20 mt-4">
            <p className="text-xs sm:text-sm md:text-base font-serif-title tracking-wider text-[#F5D77F] italic">
              Come join us as we create joy and unforgettable moments.
            </p>
            <span className="font-mono text-xs text-[#A6A195] uppercase tracking-widest">
              Thank you.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
