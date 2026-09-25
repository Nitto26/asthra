import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import { siteConfig } from './data/config';

// Lazy-load offscreen sections to make the initial page payload tiny (<40kB JS)
const AboutSection = lazy(() => import('./sections/AboutSection'));
const EventsSection = lazy(() => import('./sections/EventsSection'));
const SocialDriveSection = lazy(() => import('./sections/SocialDriveSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

// Lazy load modals so forms & canvas-confetti are not in the critical initial bundle
const EventModal = lazy(() => import('./components/EventModal'));
const RegisterModal = lazy(() => import('./components/RegisterModal'));
const DonateModal = lazy(() => import('./components/DonateModal'));

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateTier, setDonateTier] = useState(null);

  // Monitor active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = siteConfig.navLinks.map((l) => l.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.45 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Keyboard navigation between sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (selectedEvent || registerModalOpen || donateModalOpen) {
        if (e.key === 'Escape') {
          setSelectedEvent(null);
          setRegisterModalOpen(false);
          setDonateModalOpen(false);
        }
        return;
      }

      const sectionIds = siteConfig.navLinks.map((l) => l.id);
      const currentIndex = sectionIds.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < sectionIds.length - 1) {
          e.preventDefault();
          scrollToSection(sectionIds[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(sectionIds[currentIndex - 1]);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(sectionIds[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sectionIds[sectionIds.length - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, selectedEvent, registerModalOpen, donateModalOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDonate = (tier = null) => {
    setDonateTier(tier);
    setDonateModalOpen(true);
  };

  return (
    <div className="app-container">
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      {/* Full-Screen Cinematic Sections */}
      <main>
        {/* 01 HERO */}
        <HeroSection onExplore={scrollToSection} />

        {/* 02 - 05 Offscreen Sections (Lazy loaded on demand) */}
        <Suspense fallback={null}>
          <AboutSection onScrollNext={scrollToSection} />
          <EventsSection onSelectEvent={setSelectedEvent} />
          <SocialDriveSection
            onOpenDonate={handleOpenDonate}
            onScrollNext={scrollToSection}
          />
          <ContactSection />
        </Suspense>
      </main>

      {/* Interactive Modals (Lazy Loaded & Rendered On-Demand Only) */}
      <Suspense fallback={null}>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onOpenGeneralRegister={() => {
              setSelectedEvent(null);
              setRegisterModalOpen(true);
            }}
          />
        )}

        {registerModalOpen && (
          <RegisterModal
            isOpen={registerModalOpen}
            onClose={() => setRegisterModalOpen(false)}
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
