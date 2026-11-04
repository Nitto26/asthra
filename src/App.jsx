import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';

// Lazy-load offscreen sections to keep initial loading instantaneous (<1.5s)
const AboutSection = lazy(() => import('./sections/AboutSection'));
const SocialDriveSection = lazy(() => import('./sections/SocialDriveSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

// Lazy load modals so forms & canvas-confetti are loaded on-demand only
const RegisterModal = lazy(() => import('./components/RegisterModal'));
const DonateModal = lazy(() => import('./components/DonateModal'));

const PRE_RELEASE_SECTIONS = ['hero', 'about', 'social-drive', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
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

    PRE_RELEASE_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation between available sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (registerModalOpen || donateModalOpen) {
        if (e.key === 'Escape') {
          setRegisterModalOpen(false);
          setDonateModalOpen(false);
        }
        return;
      }

      const currentIndex = PRE_RELEASE_SECTIONS.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < PRE_RELEASE_SECTIONS.length - 1) {
          e.preventDefault();
          scrollToSection(PRE_RELEASE_SECTIONS[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(PRE_RELEASE_SECTIONS[currentIndex - 1]);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(PRE_RELEASE_SECTIONS[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(PRE_RELEASE_SECTIONS[PRE_RELEASE_SECTIONS.length - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, registerModalOpen, donateModalOpen]);

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

  return (
    <div className="app-container">
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed Navigation Bar with Golden Archer Logo & Brand Wordmark */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenRegister={() => setRegisterModalOpen(true)}
        links={PRE_RELEASE_SECTIONS}
      />

      {/* Full-Screen Cinematic Pre-Release Sections */}
      <main>
        {/* 01 HERO TEASER */}
        <HeroSection onExplore={() => scrollToSection('about')} />

        {/* 02 ABOUT FESTIVAL */}
        {mountRest ? (
          <Suspense fallback={null}>
            <AboutSection onScrollNext={() => scrollToSection('social-drive')} />
            <SocialDriveSection
              onOpenDonate={handleOpenDonate}
              onScrollNext={() => scrollToSection('contact')}
            />
            <ContactSection />
          </Suspense>
        ) : (
          <div className="min-h-[100svh]" />
        )}
      </main>

      {/* Interactive Modals (Loaded On-Demand) */}
      <Suspense fallback={null}>
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


