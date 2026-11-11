import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { HeartHandshake, Phone, ExternalLink } from 'lucide-react';

const bgImages = [
  '/assets/social.webp',
  '/assets/social1.webp',
  '/assets/socail3.webp'
];

export default function SocialDriveSection({ onOpenDonate, onScrollNext }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);

  // Check if any images are already cached/complete on mount
  useEffect(() => {
    bgImages.forEach((src, idx) => {
      if (imgRefs.current[idx]?.complete) {
        setLoadedImages((prev) => ({ ...prev, [src]: true }));
      }
    });
  }, []);

  // Monitor section visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Automatic looping background image cross-fade (only when in viewport)
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isVisible]);

  const { socialDrive } = siteConfig;

  return (
    <section
      ref={sectionRef}
      id="social-drive"
      className="snap-section relative flex flex-col justify-center min-h-[100svh] overflow-hidden py-12 sm:py-16 md:py-20 w-full select-none"
      style={{
        backgroundColor: '#070707',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      {/* Dynamic Looping Cross-Fade Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Color theme matching ambient texture (active before images fade in) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(245, 215, 127, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, rgba(7, 7, 7, 0.95) 75%, #070707 100%)',
          }}
          aria-hidden="true"
        />

        {bgImages.map((src, idx) => {
          const isCurrent = idx === currentBgIndex;
          const isLoaded = !!loadedImages[src];

          return (
            <img
              key={src}
              ref={(el) => (imgRefs.current[idx] = el)}
              src={src}
              alt={`Social Drive Background ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [src]: true }))}
              width="820"
              height="1600"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out filter brightness-[0.88] contrast-[1.05] saturate-[1.05] ${isCurrent && isLoaded ? 'opacity-70' : 'opacity-0'
                }`}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/30 to-[#070707]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center px-3 sm:px-6 lg:px-12 my-auto py-4 sm:py-6">

        {/* Responsive Grid: Split 2 columns on desktop, clean vertical flow on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center w-full">

          {/* =========================================================================
              LEFT COLUMN: Header, Title & Narrative (lg:col-span-7)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Section Tag */}
            <div className="flex flex-col items-start mb-4 sm:mb-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#D4AF37]">03</span>
                <span className="w-10 sm:w-14 h-[1.5px] bg-[#D4AF37]/80" />
              </div>
              <span className="text-[10.5px] sm:text-xs font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase mt-1">
                {socialDrive.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-serif-display editorial-title text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F8F7F4] filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] mb-4 sm:mb-5"
              style={{ lineHeight: 1.18 }}
            >
              Social Impact <span className="gold-text font-serif-display font-medium">Initiative</span>
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-transparent mb-5 sm:mb-7" />

            {/* Narrative Content */}
            <div className="text-xs sm:text-sm md:text-base font-sans text-[#E6E3DB] tracking-wide filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-2xl mb-6 sm:mb-8">
              <p
                className="text-[#F8F7F4] font-normal editorial-body"
                style={{ lineHeight: '1.9' }}
              >
                We believe in the power of mathematics to transform lives. Our social drive initiative aims to create a positive impact in the community by supporting differently-abled individuals.
              </p>
            </div>

            {/* Donate Now Action Button */}
            <div className="mb-6 sm:mb-8">
              <a
                href="https://ast26-reg.vercel.app/charity"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="btn-gold-solid group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-sans font-bold tracking-[0.15em] text-[#0A0A0C] uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(245,215,127,0.6)] hover:-translate-y-0.5 cursor-pointer select-none"
              >
                <HeartHandshake size={16} className="text-[#0A0A0C] group-hover:scale-110 transition-transform" />
                <span>DONATE NOW</span>
                <ExternalLink size={14} className="text-[#0A0A0C]/75 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Drive Enquiry Contact */}
            <div className="pt-4 sm:pt-5 border-t border-[#D4AF37]/25 flex flex-wrap items-center gap-2 sm:gap-3 text-left">
              <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-[#A6A195] uppercase">
                Social drive for more enquiries:
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#F8F7F4]">
                Chriswin
              </span>
              <span className="text-[#D4AF37]">•</span>
              <a
                href="tel:+919037373309"
                className="font-mono text-xs sm:text-sm text-[#F5D77F] hover:text-[#FFF4D0] transition-colors inline-flex items-center gap-1.5"
              >
                <Phone size={13} className="text-[#D4AF37]" />
                <span>+91 90373 73309</span>
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: 2x2 Metric Cards (lg:col-span-5)
              ========================================================================= */}
          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full">
              {socialDrive.metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="group relative rounded-2xl border border-[#D4AF37]/35 bg-[#0A0A0C]/85 backdrop-blur-md p-5 sm:p-6 md:p-7 flex flex-col items-center justify-center text-center shadow-md hover:border-[#F5D77F]/90 hover:bg-[#121216]/95 hover:shadow-[0_0_28px_rgba(212,175,55,0.25)] hover:-translate-y-1 transition-all duration-300 min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
                >
                  <div className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold gold-text filter drop-shadow-[0_0_14px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
                    {metric.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-sans font-semibold tracking-wider text-[#E6E3DB] uppercase mt-2.5 sm:mt-3 group-hover:text-[#FFF4D0] transition-colors leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
