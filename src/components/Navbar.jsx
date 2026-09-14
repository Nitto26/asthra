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
            ? 'bg-[#040404]/94 backdrop-blur-xl py-4 sm:py-5 border-b border-[#D4AF37]/20 shadow-[0_12px_40px_rgba(0,0,0,0.9)]'
            : 'bg-transparent py-6 sm:py-8'
        }`}
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        <div className="relative w-full max-w-[1750px] mx-auto flex items-center justify-between px-2 sm:px-6">
          
          {/* =========================================================================
              LEFT: Brand Logo & Typography (Significantly Larger)
              ========================================================================= */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-3.5 sm:gap-4 group text-decoration-none focus:outline-none z-10"
            aria-label="ASTHRA '26 Home"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/15 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/assets/logo.svg"
                alt="ASTHRA Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="font-serif-title font-bold text-lg sm:text-2xl tracking-wider text-[#F8F7F4] group-hover:text-[#F5D77F] transition-colors leading-tight">
                  ASTHRA
                </span>
                <span className="font-serif-title text-sm sm:text-lg font-semibold text-[#D4AF37] leading-tight">
                  ’26
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-sans font-semibold tracking-[0.3em] text-[#A6A195] group-hover:text-[#D4AF37] uppercase leading-tight mt-0.5 sm:mt-1 transition-colors">
                MATHEMATICS FEST
              </span>
            </div>
          </a>

          {/* =========================================================================
              CENTER: Desktop Navigation Links (Larger Pill & Type)
              ========================================================================= */}
          <nav
            className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8 xl:gap-11 px-8 py-3 rounded-full border border-white/[0.09] bg-black/55 backdrop-blur-xl shadow-[0_6px_30px_rgba(0,0,0,0.65)]"
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
        className={`fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-3xl transition-all duration-400 flex flex-col justify-between px-6 sm:px-12 pt-24 pb-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* Top Header inside Drawer with Close Button */}
        <div className="flex items-center justify-between max-w-lg mx-auto w-full pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E52828] animate-pulse" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              NAVIGATION MENU
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#A6A195] hover:text-[#F8F7F4] focus:outline-none cursor-pointer"
            aria-label="Close menu"
          >
            <X size={15} />
          </button>
        </div>

        {/* Menu Links */}
        <div className="relative z-10 flex flex-col gap-4 sm:gap-5 my-auto max-w-lg mx-auto w-full py-4">
          {siteConfig.navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-baseline justify-between text-left py-2.5 px-3 rounded-lg group transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37]/10 text-[#F5D77F]'
                    : 'text-[#E6E3DB] hover:bg-white/5 hover:text-[#F5D77F]'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#D4AF37]/70 group-hover:text-[#D4AF37]">
                    {link.num}
                  </span>
                  <span className="font-serif-display text-2xl sm:text-3xl font-normal tracking-wide">
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

        {/* Drawer Bottom CTA and Info */}
        <div className="relative z-10 pt-5 border-t border-white/10 flex flex-col gap-3.5 max-w-lg mx-auto w-full">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              sound.playSuccess();
              onOpenRegister();
            }}
            className="w-full h-11 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-black font-sans font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <Sparkles size={14} />
            <span>REGISTER FOR FESTIVAL</span>
          </button>
          
          <div className="text-center text-[10px] font-mono tracking-widest text-[#787369]">
            {siteConfig.dates} · {siteConfig.college}
          </div>
        </div>
      </div>
    </>
  );
}

