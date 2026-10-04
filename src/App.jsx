import React from 'react';
import HeroSection from './sections/HeroSection';

export default function App() {
  return (
    <div className="app-container">
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Pre-Release Cinematic Hero Teaser */}
      <main className="w-full h-full">
        <HeroSection />
      </main>
    </div>
  );
}

