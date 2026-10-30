import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';
import { sound } from '../utils/sound';
import { Mail, Phone, MapPin, Copy, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [copiedField, setCopiedField] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [bgLoaded, setBgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setBgLoaded(true);
    }
  }, []);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    sound.playClick();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setFormSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#FFF4D0', '#F5D77F', '#E52828']
    });
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
      setFormOpen(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="snap-section relative flex flex-col justify-between min-h-[100svh] overflow-hidden py-14 sm:py-16 md:py-20 w-full"
      style={{
        backgroundColor: '#050505',
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      {/* Background: Grand Stone Archway with Golden Archer Statue */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Color theme matching ambient texture (active before image fades in) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 78% 45%, rgba(245, 215, 127, 0.16) 0%, rgba(212, 175, 55, 0.05) 40%, rgba(5, 5, 5, 0.95) 75%, #050505 100%)',
          }}
          aria-hidden="true"
        />

        <img
          ref={imgRef}
          src="/assets/contact-bg.webp"
          alt="Golden Archer Cathedral Monument"
          width="1672"
          height="941"
          loading="lazy"
          decoding="async"
          onLoad={() => setBgLoaded(true)}
          className={`w-full h-full object-cover object-[76%_center] sm:object-right-center filter brightness-105 contrast-105 saturate-110 transition-opacity duration-1000 ease-in-out ${
            bgLoaded ? 'opacity-85 sm:opacity-95' : 'opacity-0'
          }`}
        />
        {/* Soft left gradient for text readability without washing out the glowing archer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-[#050505]/40 pointer-events-none" />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center gap-6 sm:gap-8 md:gap-10 px-3 sm:px-6 lg:px-12 my-auto py-6 sm:py-8">
        {/* Top Section Tag & Headline */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.35em] text-[#E6E3DB] uppercase">
              CONTACT
            </span>
            <span className="w-10 sm:w-12 h-[1.5px] bg-[#D4AF37]/80" />
          </div>

          {/* Headline */}
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F7F4] mt-2.5 select-none leading-[1.05]">
            <span>LET’S </span>
            <span>BUILD A </span>
            <span className="gold-text font-serif-display font-medium">BRIGHTER </span>
            <span>TOMORROW</span>
          </h2>

          {/* Subline with Horizontal Accent */}
          <div className="mt-3 sm:mt-4 flex flex-col items-start gap-1.5">
            <p className="text-[9px] sm:text-xs font-sans font-medium tracking-[0.25em] text-[#A6A195] uppercase">
              {siteConfig.contact.subline}
            </p>
            <span className="w-12 h-[1.5px] bg-[#D4AF37]/80" />
          </div>
        </div>

        {/* Contact Information Stack */}
        <div className="relative z-20 flex flex-col gap-3 sm:gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.3em] text-[#E6E3DB] uppercase">
              OR GET IN TOUCH
            </span>
            <span className="w-8 h-[1px] bg-white/30" />
          </div>

          {/* EMAIL Item */}
          <div
            onClick={() => handleCopy(siteConfig.contact.email, 'email')}
            className="group flex items-center gap-4 py-1.5 sm:py-2 cursor-pointer text-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/60 bg-[#161410] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#F5D77F] transition-transform">
              <Mail size={17} className="text-[#F5D77F]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase">
                EMAIL
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#F8F7F4] group-hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                {siteConfig.contact.email}
                {copiedField === 'email' ? (
                  <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>
                ) : (
                  <Copy size={11} className="text-white/30 group-hover:text-white/60" />
                )}
              </span>
            </div>
          </div>

          {/* PHONE Item */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
            className="group flex items-center gap-4 py-1.5 sm:py-2 text-decoration-none text-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/60 bg-[#161410] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#F5D77F] transition-transform">
              <Phone size={17} className="text-[#F5D77F]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase">
                PHONE
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#F8F7F4] group-hover:text-[#F5D77F] transition-colors">
                {siteConfig.contact.phoneDisplay}
              </span>
            </div>
          </a>

          {/* LOCATION Item */}
          <a
            href="https://maps.google.com/?q=St+Thomas+College+Autonomous+Thrissur"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 py-1.5 sm:py-2 text-decoration-none text-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/60 bg-[#161410] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#F5D77F] transition-transform mt-0.5">
              <MapPin size={17} className="text-[#F5D77F]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-widest text-[#A6A195] uppercase">
                LOCATION
              </span>
              <span className="text-xs sm:text-sm text-[#F8F7F4] group-hover:text-[#F5D77F] transition-colors leading-relaxed">
                St. Thomas College (Autonomous)<br />
                Thrissur, Kerala
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setFormOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/50 bg-[#0C0C0E] p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xs font-sans font-semibold tracking-[0.2em] text-[#F5D77F] uppercase mb-4">
              SEND QUICK INQUIRY
            </h3>

            {formSubmitted ? (
              <div className="py-6 flex flex-col items-center text-center gap-2 text-emerald-400">
                <CheckCircle2 size={32} />
                <span className="font-sans font-semibold text-sm text-[#F8F7F4]">Message Received!</span>
                <p className="text-xs text-[#A6A195]">Our coordinators will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-[#F8F7F4] placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-[#F8F7F4] placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Your Message / Inquiry"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 text-xs text-[#F8F7F4] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
                <div className="flex items-center justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="btn-gold-outline !py-2 !px-4 text-xs"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn-gold-solid !py-2 !px-5 text-xs"
                  >
                    <Send size={12} /> SEND
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
