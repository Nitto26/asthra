import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { BookOpen, Users, Sprout, HeartHandshake, ChevronDown } from 'lucide-react';

export default function SocialDriveSection({ onOpenDonate, onScrollNext }) {
  const [raisedCount, setRaisedCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const sectionRef = useRef(null);

  const targetAmount = siteConfig.socialDrive.totalRaised;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          setHasCounted(true);
          const duration = 1800;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(easeProgress * targetAmount);
            setRaisedCount(current);

            if (frame >= totalFrames) {
              clearInterval(timer);
              setRaisedCount(targetAmount);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasCounted, targetAmount]);

  const formatRupee = (num) => {
    return num.toLocaleString('en-IN');
  };

  const getTierIcon = (id) => {
    switch (id) {
      case 'edu':
        return <BookOpen size={20} className="text-[#F5D77F]" />;
      case 'opp':
        return <Users size={20} className="text-[#F5D77F]" />;
      case 'com':
        return <Sprout size={20} className="text-[#F5D77F]" />;
      default:
        return <HeartHandshake size={20} className="text-[#F5D77F]" />;
    }
  };

  return (
    <section
      id="social-drive"
      ref={sectionRef}
      className="snap-section relative flex flex-col justify-between min-h-[100svh] overflow-hidden py-14 sm:py-16 md:py-20 w-full"
      style={{
        backgroundColor: '#070707',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      {/* Background Image: Hands reaching in celestial god-ray beam */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/social-bg.webp"
          alt="Hands Reaching Light"
          loading="lazy"
          className="w-full h-full object-cover object-[70%_center] sm:object-center opacity-45 sm:opacity-55 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent" />
      </div>

      <div className="relative z-20 w-full max-w-[1700px] mx-auto flex-1 flex flex-col justify-between px-2 sm:px-6 lg:px-12">
        {/* Top Section Tag matching Reference 4 */}
        <div className="flex flex-col items-start pt-2 sm:pt-4">
          <div className="flex items-center gap-3">
            <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
              {siteConfig.socialDrive.badge}
            </span>
            <span className="w-10 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          </div>

          {/* Headline */}
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F7F4] mt-2 select-none leading-tight">
            <span>NUMBERS</span>
            <br />
            <span>CAN CHANGE </span>
            <span className="gold-text font-serif-display font-medium">LIVES.</span>
          </h2>
        </div>

        {/* Centerpiece: Raised Card & Impact Tiers matching Reference 4 */}
        <div className="my-auto py-6 sm:py-8 flex flex-col gap-4 w-full max-w-4xl mx-auto">
        {/* Raised Metrics Card */}
        <div className="w-full rounded-2xl border border-[#D4AF37]/45 bg-[#0C0C0E]/85 backdrop-blur-md p-5 sm:p-6 shadow-[0_0_24px_rgba(212,175,55,0.18)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[#A6A195] uppercase">
              TOGETHER, WE’VE RAISED
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F5D77F] tracking-tight">
                {siteConfig.socialDrive.currency} {formatRupee(raisedCount)}
              </span>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-14 bg-[#D4AF37]/35 mx-4" />

          <div className="flex flex-col md:items-end text-left md:text-right">
            <p className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.2em] text-[#E6E3DB] uppercase max-w-xs leading-relaxed">
              {siteConfig.socialDrive.impactTagline}
            </p>
            <span className="w-10 h-[1.5px] bg-[#D4AF37]/70 mt-2" />
          </div>
        </div>

        {/* YOUR IMPACT Label */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.3em] text-[#A6A195] uppercase">
            YOUR IMPACT
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
        </div>

        {/* 3 Impact Tier Cards matching Reference 4 */}
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          {siteConfig.socialDrive.impactTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => {
                sound.playSuccess();
                onOpenDonate(tier);
              }}
              className="group relative rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0C]/80 backdrop-blur-md px-5 py-3.5 flex items-center justify-between gap-4 hover:border-[#F5D77F]/90 hover:bg-[#121216]/95 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(212,175,55,0.22)]"
              role="button"
              tabIndex={0}
            >
              {/* Left: Icon + Title & Subtitle */}
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/35 bg-[#14120E] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#F5D77F] transition-transform">
                  {getTierIcon(tier.id)}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-xs sm:text-sm tracking-[0.18em] text-[#F8F7F4] uppercase group-hover:text-[#FFF4D0] transition-colors">
                    {tier.title}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-wider text-[#A6A195] uppercase">
                    {tier.subtitle}
                  </span>
                </div>
              </div>

              {/* Right: Amount + Purpose */}
              <div className="flex flex-col items-end text-right flex-shrink-0">
                <span className="font-serif-display text-sm sm:text-base font-semibold text-[#F5D77F]">
                  {tier.amount}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#A6A195] uppercase">
                  {tier.id === 'edu' ? 'BUYS BOOKS' : tier.id === 'opp' ? 'SUPPORTS A STUDENT' : 'CREATES LASTING CHANGE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Bottom Center: Scroll Indicator matching Reference 4 */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onScrollNext('contact');
            }}
            className="group flex flex-col items-center gap-1 focus:outline-none"
            aria-label="Scroll to Contact"
          >
            <span className="w-[1.5px] h-5 bg-[#D4AF37]/70 group-hover:h-7 transition-all duration-300" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.35em] text-[#A6A195] group-hover:text-[#F5D77F] uppercase mt-1">
              SCROLL
            </span>
            <ChevronDown size={14} className="text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
