import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { ArrowRight, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenRegister }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#040404]/94 backdrop-blur-xl pt-4 pb-4 sm:pt-4 sm:pb-4 border-b border-[#D4AF37]/20 shadow-[0_12px_40px_rgba(0,0,0,0.9)]'
            : 'bg-transparent pt-6 sm:pt-8 lg:pt-9 pb-4'
        }`}
        style={{
          paddingTop: isScrolled ? 'max(1rem, env(safe-area-inset-top))' : 'max(1.75rem, env(safe-area-inset-top))',
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        <div className="relative w-full max-w-[1750px] mx-auto flex items-center justify-between px-2 sm:px-6">
          
          {/* =========================================================================
              LEFT: Brand Logo (Complete Emblem + Typography Graphic)
              ========================================================================= */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center group text-decoration-none focus:outline-none z-10"
            aria-label="ASTHRA '26 Home"
          >
            <div className="h-9 sm:h-11 md:h-12 w-auto relative flex items-center transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-[#D4AF37]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/assets/logo.png"
                alt="ASTHRA '26 Logo"
                className="h-full w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.45)]"
              />
            </div>
          </a>

          {/* =========================================================================
              CENTER: Desktop Navigation Links (Vertically Centered Pill & Type)
              ========================================================================= */}
          <nav
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-8 xl:gap-11 px-8 py-3 rounded-full border border-white/[0.09] bg-black/55 backdrop-blur-xl shadow-[0_6px_30px_rgba(0,0,0,0.65)]"
            aria-label="Main Navigation"
          >
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative flex flex-col items-center py-1 text-xs sm:text-[13px] font-sans tracking-[0.24em] uppercase transition-all duration-200 focus:outline-none cursor-pointer group ${
                    isActive
                      ? 'text-[#F5D77F] font-bold'
                      : 'text-[#A6A195] hover:text-[#F8F7F4] font-medium'
                  }`}
                >
                  <span className="group-hover:translate-y-[-1px] transition-transform duration-200">
                    {link.label}
                  </span>
                  
                  {/* Active Indicator Underline & Dot */}
                  {isActive ? (
                    <span className="absolute -bottom-2 w-2 h-2 rounded-full bg-[#E52828] shadow-[0_0_12px_rgba(229,40,40,1)] animate-pulse" />
                  ) : (
                    <span className="absolute -bottom-2 w-0 h-[2px] bg-[#D4AF37]/70 group-hover:w-4 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* =========================================================================
              RIGHT: Action Cluster (Larger CTA + Larger Mobile Hamburger)
              ========================================================================= */}
          <div className="flex items-center gap-3 sm:gap-5 z-10">
            {/* REGISTER NOW Button (Desktop & Tablet) */}
            <button
              onClick={() => {
                sound.playSuccess();
                onOpenRegister();
              }}
              className="hidden sm:inline-flex items-center gap-2.5 h-11 sm:h-12 px-7 sm:px-8 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#17140C] via-[#211A0C] to-[#17140C] text-[#F5D77F] hover:bg-[#D4AF37] hover:text-black font-sans text-xs sm:text-[12px] font-bold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.22)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] cursor-pointer group"
            >
              <span>REGISTER NOW</span>
              <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
            </button>

            {/* Hamburger Icon (Mobile / Tablet drawer trigger) */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex lg:hidden items-center justify-center rounded-full border border-white/15 text-[#F8F7F4] hover:text-[#F5D77F] hover:border-[#D4AF37]/50 bg-black/50 backdrop-blur-md focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[1.8px] bg-current transition-transform duration-300 origin-left ${
                    mobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-[1.8px] bg-current transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-[1.8px] bg-current transition-transform duration-300 origin-left ${
                    mobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE FULLSCREEN MENU DRAWER
          ========================================================================= */}
      <div
        className={`fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-3xl transition-all duration-300 flex flex-col px-6 sm:px-12 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* Top Spacer to prevent any overlap with the fixed top header */}
        <div className="h-28 sm:h-32 shrink-0" />

        {/* Menu Links (Centered in the remaining screen space) */}
        <div className="flex-1 flex flex-col justify-center gap-2.5 sm:gap-3.5 max-w-md mx-auto w-full py-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between text-left py-3 px-4 rounded-xl group transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37]/15 text-[#F5D77F] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'text-[#E6E3DB] hover:bg-white/5 hover:text-[#F5D77F]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#D4AF37]/70 group-hover:text-[#D4AF37]">
                    {link.num}
                  </span>
                  <span className="font-serif-display text-xl sm:text-2xl font-normal tracking-wide">
                    {link.label}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className={`text-[#D4AF37] transition-all duration-200 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom CTA with Generous Padding */}
        <div className="shrink-0 pt-4 pb-4 sm:pb-6 max-w-md mx-auto w-full">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              sound.playSuccess();
              onOpenRegister();
            }}
            className="w-full h-12 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-black font-sans font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] cursor-pointer transition-all"
          >
            <Sparkles size={14} />
            <span>REGISTER FOR FESTIVAL</span>
          </button>
        </div>
      </div>
    </>
  );
}

