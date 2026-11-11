import React, { useState, useEffect, useRef } from 'react';

const leadershipList = [
  { role: 'Principal', name: 'Fr. Dr. Martin KA' },
  { role: 'HOD', name: 'Antony John E F' },
  { role: 'Faculty Coordinator', name: 'Renjith Varghese' },
  { role: 'Student Coordinator', name: 'Lalkrishna M' },
];

export default function AboutSection() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setBgLoaded(true);
    }
  }, []);

  return (
    <section
      id="about"
      className="snap-section relative flex flex-col overflow-hidden min-h-[100svh] w-full select-none"
      style={{ backgroundColor: '#020202' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Color theme matching ambient texture (renders immediately before image fades in) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 65% 45%, rgba(245, 215, 127, 0.16) 0%, rgba(212, 175, 55, 0.06) 35%, rgba(2, 2, 2, 0.9) 70%, #020202 100%)',
          }}
          aria-hidden="true"
        />
        <img
          ref={imgRef}
          src="/assets/about-bg.webp"
          alt="About Section Background"
          width="941"
          height="1672"
          loading="lazy"
          decoding="async"
          onLoad={() => setBgLoaded(true)}
          className={`w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] saturate-[1.1] transition-opacity duration-1000 ease-in-out ${
            bgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Gentle atmospheric gradients: preserves clear text readability while allowing the background image to remain clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-[#020202]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/75 via-[#020202]/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col py-10 sm:py-16">

        {/* ── Section Tag ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-sans text-xs font-bold text-[#D4AF37]">02</span>
          <span className="w-12 h-[1.5px] bg-[#D4AF37]/70" />
          <span className="text-[10.5px] font-sans font-bold tracking-[0.3em] text-[#E6E3DB] uppercase">
            About Festival
          </span>
        </div>

        {/* ── Headline ── */}
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F8F7F4] leading-[1.2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] mb-2">
          About <span className="gold-text font-serif-display font-semibold">ASTHRA 2k26</span>
        </h2>
        <span className="block w-20 sm:w-28 h-[2px] bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-transparent mb-8 sm:mb-10" />

        {/* ── Body Text ── */}
        <div className="space-y-4 mb-10 sm:mb-12">
          <p
            className="text-[14.5px] sm:text-[16px] md:text-[17px] text-[#F8F7F4] font-normal tracking-[0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] editorial-body"
            style={{ lineHeight: '1.9' }}
          >
            <strong className="text-[#F5D77F] font-semibold">ASTHRA 2k26</strong>, the fourth edition of the departmental fest, is organized by the{' '}
            <strong className="text-white font-medium">Department of Mathematics, St. Thomas College (Autonomous), Thrissur</strong>.{' '}
            Blending mathematical excellence with culture, creativity, and entertainment.
          </p>
          <p
            className="text-[13px] sm:text-[14.5px] md:text-[15.5px] text-[#C8C4B8] font-light tracking-[0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] editorial-body"
            style={{ lineHeight: '1.9' }}
          >
            Founded as an educational institution in 1889, St. Thomas College is the oldest Catholic college in Kerala. The Department of Mathematics, established in 1926, consistently maintains academic distinction with research and dedicated programmes that foster talent, imagination, and analytical rigor.
          </p>
        </div>

        {/* ── Leadership Block ── */}
        <div className="border-t border-[#D4AF37]/30 pt-7 sm:pt-8 mb-4">

          {/* Section Header */}
          <div className="mb-6">
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.28em] text-[#D4AF37] uppercase">
              Leadership &amp; Coordination
            </span>
          </div>

          {/* Leadership Cards: 2x2 on mobile, 4 in a row on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-7">
            {leadershipList.map(({ role, name }) => (
              <div
                key={role}
                className="rounded-xl border border-[#D4AF37]/25 bg-[#0f0e0b]/90 backdrop-blur-md hover:border-[#D4AF37]/60 hover:bg-[#1a180f]/95 transition-all duration-200 flex flex-col justify-between"
                style={{
                  padding: '1.25rem 1.25rem',
                  minHeight: '96px',
                }}
              >
                <span className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-[0.18em] text-[#C4A968] uppercase mb-2">
                  {role}
                </span>
                <span className="font-sans text-[13.5px] sm:text-[14px] md:text-[15px] font-semibold text-[#F8F7F4] leading-snug tracking-[0.01em]">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Instagram Handle Text (under tiles, no box/tile, with comfortable breathing room) */}
          <div className="flex items-center mb-6 sm:mb-8">
            <a
              href="https://www.instagram.com/asthrafest?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow ASTHRA on Instagram"
              className="inline-flex items-center gap-2.5 text-[#D4AF37] hover:text-[#F5D77F] transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 text-[#D4AF37] group-hover:text-[#F5D77F] group-hover:scale-110 transition-all shrink-0"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="font-sans text-[13px] sm:text-[13.5px] font-medium tracking-wide">
                @asthrafest
              </span>
            </a>
          </div>

        </div>

        {/* ── Footer Quote ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="space-y-3">
            <p className="text-[11.5px] sm:text-[12.5px] font-sans font-medium uppercase tracking-[0.18em] text-[#F5D77F] drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] leading-[1.8]">
              Come join us as we create joy and unforgettable moments.
            </p>
            <p className="text-[10.5px] font-sans tracking-[0.22em] text-[#8C877B] uppercase">
              Thank you.
            </p>
          </div>
          <span className="font-sans text-[10.5px] text-[#6E6A60] uppercase tracking-[0.22em] font-semibold shrink-0">
            STC · Thrissur
          </span>
        </div>

      </div>
    </section>
  );
}
