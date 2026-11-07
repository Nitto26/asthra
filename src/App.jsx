import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import { siteConfig } from './data/config';

// Lazy-load offscreen sections to keep initial loading instantaneous (<1.5s)
const AboutSection = lazy(() => import('./sections/AboutSection'));
const EventsSection = lazy(() => import('./sections/EventsSection'));
const SocialDriveSection = lazy(() => import('./sections/SocialDriveSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

// Lazy load modals so forms & notices are loaded on-demand only
const RegistrationNoticeModal = lazy(() => import('./components/RegistrationNoticeModal'));
const DonateModal = lazy(() => import('./components/DonateModal'));

const SECTIONS = ['hero', 'about', 'events', 'social-drive', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateTier, setDonateTier] = useState(null);
  const [mountRest, setMountRest] = useState(false);

  // Defer offscreen sections until idle or on first touch/scroll to eliminate main-thread TBT
  useEffect(() => {
    const trigger = () => setMountRest(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(trigger, { timeout: 1200 });
      window.addEventListener('scroll', trigger, { once: true, passive: true });
      window.addEventListener('touchstart', trigger, { once: true, passive: true });
      return () => {
        cancelIdleCallback(id);
        window.removeEventListener('scroll', trigger);
        window.removeEventListener('touchstart', trigger);
      };
    } else {
      const id = setTimeout(trigger, 800);
      window.addEventListener('scroll', trigger, { once: true, passive: true });
      window.addEventListener('touchstart', trigger, { once: true, passive: true });
      return () => {
        clearTimeout(id);
        window.removeEventListener('scroll', trigger);
        window.removeEventListener('touchstart', trigger);
      };
    }
  }, []);

  // Monitor active section with a single unified IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation between available sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (selectedEvent || donateModalOpen) {
        if (e.key === 'Escape') {
          setSelectedEvent(null);
          setDonateModalOpen(false);
        }
        return;
      }

      const currentIndex = SECTIONS.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SECTIONS.length - 1) {
          e.preventDefault();
          scrollToSection(SECTIONS[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(SECTIONS[currentIndex - 1]);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(SECTIONS[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(SECTIONS[SECTIONS.length - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, selectedEvent, donateModalOpen]);

  const scrollToSection = (id) => {
    if (!mountRest) {
      setMountRest(true);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDonate = (tier = null) => {
    setDonateTier(tier);
    setDonateModalOpen(true);
  };

  const handleOpenRegister = () => {
    const link = siteConfig.registrationLink || "##";
    if (link && link !== "##" && !link.startsWith("#")) {
      if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link;
      }
    } else {
      setSelectedEvent({
        id: "GENERAL",
        num: "01",
        name: "ASTHRA ’26 FESTIVAL",
        nameDisplay: "ASTHRA ’26 EVENTS",
        category: "ALL EVENTS & WORKSHOPS",
        prizeDisplay: "50K+",
        prizePool: "₹ 50K+ Pool",
        venue: "St. Thomas College Campus",
        venueDisplay: "College Campus",
        time: "Nov 27-28, 2026",
        timeDisplay: "Full Festival",
        image: "/assets/about-bg.webp",
      });
    }
  };

  return (
    <div className="app-container">
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed Navigation Bar with Golden Archer Logo & Brand Wordmark */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenRegister={handleOpenRegister}
        links={SECTIONS}
      />

      {/* Full-Screen Cinematic Sections */}
      <main>
        {/* 01 HERO TEASER */}
        <HeroSection
          onExplore={() => scrollToSection('about')}
          onRegister={handleOpenRegister}
        />

        {/* OFFSCREEN SECTIONS */}
        {mountRest ? (
          <Suspense fallback={null}>
            {/* 02 ABOUT FESTIVAL */}
            <AboutSection onScrollNext={() => scrollToSection('events')} />

            {/* 03 EVENTS SHOWCASE */}
            <EventsSection onSelectEvent={(evt) => setSelectedEvent(evt)} />

            {/* 04 SOCIAL DRIVE */}
            <SocialDriveSection
              onOpenDonate={handleOpenDonate}
              onScrollNext={() => scrollToSection('contact')}
            />

            {/* 05 CONTACT */}
            <ContactSection />
          </Suspense>
        ) : (
          <div className="min-h-[100svh]" />
        )}
      </main>

      {/* Interactive Modals (Loaded On-Demand) */}
      <Suspense fallback={null}>
        {selectedEvent && (
          <RegistrationNoticeModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}

        {donateModalOpen && (
          <DonateModal
            isOpen={donateModalOpen}
            initialTier={donateTier}
            onClose={() => {
              setDonateModalOpen(false);
              setDonateTier(null);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
