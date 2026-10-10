import React from 'react';

/**
 * ConstellationOverlay — Organic Asymmetrical Celestial Sky Chart
 * Features naturally angled, rotated constellations drifting through the cosmos
 * with an organic astronomical tilt and fluid cosmic light sweep.
 */
export default function ConstellationOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-12 overflow-hidden select-none block lg:hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 850"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Luminous Star Node Halos */}
          <radialGradient id="starGlowGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#FFF4D0" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#F5D77F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="starGlowWhite" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#D4E4F7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A0B8D6" stopOpacity="0" />
          </radialGradient>

          {/* Smooth Diagonal Luminous Sweep Mask */}
          <linearGradient id="cosmicSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0">
              <animate 
                attributeName="offset" 
                values="-0.6; 1.4" 
                dur="7s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.15">
              <animate 
                attributeName="offset" 
                values="-0.35; 1.65" 
                dur="7s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1.0">
              <animate 
                attributeName="offset" 
                values="-0.1; 1.9" 
                dur="7s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.15">
              <animate 
                attributeName="offset" 
                values="0.15; 2.15" 
                dur="7s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0">
              <animate 
                attributeName="offset" 
                values="0.4; 2.4" 
                dur="7s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>

          <mask id="sweepMask">
            <rect x="0" y="0" width="400" height="850" fill="url(#cosmicSweepGradient)" />
          </mask>

          {/* Asymmetrical Natural Constellations Geometry */}
          <g id="organicConstellations">
            {/* Natural Organic Orbital Arcs */}
            <g opacity="0.35">
              <ellipse 
                cx="185" 
                cy="440" 
                rx="175" 
                ry="125" 
                transform="rotate(38 185 440)"
                fill="none" 
                stroke="#F5D77F" 
                strokeWidth="0.6" 
                strokeDasharray="4 7"
              />
              <ellipse 
                cx="215" 
                cy="410" 
                rx="205" 
                ry="105" 
                transform="rotate(-26 215 410)"
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="0.55" 
                strokeDasharray="2 6"
              />
              <path 
                d="M 20,290 A 240,240 0 0,1 380,180" 
                fill="none" 
                stroke="#F5D77F" 
                strokeWidth="0.5" 
                strokeOpacity="0.25" 
                strokeDasharray="3 8"
              />
            </g>

            {/* =========================================================================
                ORGANIC UPPER CONSTELLATION (Naturally tilted & offset to the upper-right)
                ========================================================================= */}
            <g transform="translate(18, -15) rotate(-14 200 170)">
              {/* Dipper Bowl */}
              <polygon
                points="255,115 285,175 225,200 200,140"
                fill="none"
                stroke="#F5D77F"
                strokeWidth="0.85"
              />

              {/* Dipper Curved Handle */}
              <polyline
                points="200,140 145,145 95,175 40,220"
                fill="none"
                stroke="#F5D77F"
                strokeWidth="0.85"
              />

              {/* Natural Pointer Ray */}
              <line
                x1="285"
                y1="175"
                x2="235"
                y2="45"
                stroke="#F5D77F"
                strokeWidth="0.65"
                strokeDasharray="2 4"
                strokeOpacity="0.55"
              />

              {/* Star Nodes */}
              <circle cx="40" cy="220" r="4.5" fill="url(#starGlowWhite)" />
              <circle cx="40" cy="220" r="1.6" fill="#FFFFFF" />

              <circle cx="95" cy="175" r="5" fill="url(#starGlowGold)" />
              <circle cx="95" cy="175" r="1.8" fill="#FFFFFF" />

              <circle cx="145" cy="145" r="5.5" fill="url(#starGlowWhite)" />
              <circle cx="145" cy="145" r="2" fill="#FFFFFF" />

              <circle cx="200" cy="140" r="4.5" fill="url(#starGlowGold)" />
              <circle cx="200" cy="140" r="1.6" fill="#FFFFFF" />

              <circle cx="225" cy="200" r="4.8" fill="url(#starGlowGold)" />
              <circle cx="225" cy="200" r="1.7" fill="#FFFFFF" />

              <circle cx="285" cy="175" r="5.2" fill="url(#starGlowWhite)" />
              <circle cx="285" cy="175" r="1.9" fill="#FFFFFF" />

              <circle cx="255" cy="115" r="5.5" fill="url(#starGlowGold)" />
              <circle cx="255" cy="115" r="2" fill="#FFFFFF" />

              <circle cx="235" cy="45" r="4" fill="url(#starGlowWhite)" />
              <circle cx="235" cy="45" r="1.4" fill="#FFFFFF" />
            </g>

            {/* =========================================================================
                ORGANIC LOWER CONSTELLATION (Naturally angled & drifting across the lower sky)
                ========================================================================= */}
            <g transform="translate(-15, 10) rotate(22 200 680)">
              {/* Main Cross Spine */}
              <line
                x1="210"
                y1="595"
                x2="190"
                y2="755"
                stroke="#F5D77F"
                strokeWidth="0.9"
              />

              {/* Wings */}
              <line
                x1="85"
                y1="670"
                x2="315"
                y2="645"
                stroke="#F5D77F"
                strokeWidth="0.9"
              />

              {/* Natural Diamond Asterism Chords */}
              <polyline
                points="85,670 210,595 315,645 190,755 85,670"
                fill="none"
                stroke="#F5D77F"
                strokeWidth="0.65"
                strokeOpacity="0.45"
                strokeDasharray="3 5"
              />

              {/* Star Nodes */}
              {/* Head Star (Deneb) */}
              <circle cx="210" cy="595" r="6" fill="url(#starGlowWhite)" />
              <circle cx="210" cy="595" r="2.2" fill="#FFFFFF" />

              {/* Center Star (Sadr) */}
              <circle cx="200" cy="660" r="5.5" fill="url(#starGlowGold)" />
              <circle cx="200" cy="660" r="2" fill="#FFFFFF" />

              {/* Left Wingtip Star */}
              <circle cx="85" cy="670" r="5" fill="url(#starGlowWhite)" />
              <circle cx="85" cy="670" r="1.8" fill="#FFFFFF" />

              {/* Right Wingtip Star */}
              <circle cx="315" cy="645" r="5" fill="url(#starGlowGold)" />
              <circle cx="315" cy="645" r="1.8" fill="#FFFFFF" />

              {/* Beak Star (Albireo) */}
              <circle cx="190" cy="755" r="5.5" fill="url(#starGlowGold)" />
              <circle cx="190" cy="755" r="1.9" fill="#FFFFFF" />
            </g>

            {/* Random Natural Background Star Nodes */}
            <circle cx="330" cy="80" r="1.3" fill="#FFFFFF" opacity="0.6" />
            <circle cx="65" cy="110" r="1.2" fill="#FFFFFF" opacity="0.55" />
            <circle cx="370" cy="260" r="1.4" fill="#FFFFFF" opacity="0.7" />
            <circle cx="25" cy="710" r="1.2" fill="#FFFFFF" opacity="0.55" />
            <circle cx="365" cy="780" r="1.4" fill="#FFFFFF" opacity="0.75" />
            <circle cx="160" cy="800" r="1.2" fill="#FFFFFF" opacity="0.6" />
          </g>
        </defs>

        {/* Layer 1: Ambient Faint Base Constellations (Natural deep night sky) */}
        <use href="#organicConstellations" opacity="0.18" />

        {/* Layer 2: Illuminated Constellations Masked by the Smooth Light Sweep */}
        <g mask="url(#sweepMask)" opacity="0.95" filter="drop-shadow(0 0 5px rgba(245, 215, 127, 0.55))">
          <use href="#organicConstellations" />
        </g>
      </svg>
    </div>
  );
}
