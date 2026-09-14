import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';

/**
 * Hyper-Realistic Dark Astronomy Scene with Sleek 24K Metallic Gold Ring
 * Featuring Dynamic Orbital Circumferential Light Sweep & Realistic Pinpoint Stars.
 * 
 * Key Features:
 * 1. REALISTIC ASTRONOMICAL PINPOINT STARFIELD:
 *    - 3,200 fine, sharp pinpoint stars with astronomical magnitude distribution
 *    - True stellar spectral temperatures (pure diamond white, champagne gold, icy blue, amber)
 *    - Individual per-star scintillation (natural multi-frequency twinkling)
 *    - Occasional realistic shooting star meteors
 * 
 * 2. HYPER-REALISTIC SHINY GOLDEN RING WITH MOVING CIRCUMFERENCE SHINE:
 *    - 3D-beveled 24K polished gold ring shader with anisotropic metallic sheen
 *    - A brilliant specular shine / photon pulse that smoothly sweeps DOWN along the circumference
 *    - Trailing golden comet luminescence following the moving glint
 *    - Orbiting micro-glint starburst flare synchronized with the shader sweep
 *    - Toned-down, deep, moody, dark golden corona filaments
 *    - Interactive Solar CME magnetic pulse on click with celestial sub-bass chime
 */
export default function EclipseCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 21;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15; // Dark, rich celestial exposure
    container.appendChild(renderer.domElement);

    const eclipseGroup = new THREE.Group();
    scene.add(eclipseGroup);

    const RADIUS = 3.32;
    const RING_THICKNESS = 0.055;

    // 2. Realistic Pinpoint Star Particle Texture
    const createPinpointStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
      grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createPinpointStarTexture();

    // 3. Realistic Astronomical Starfield (3,200 Pinpoint Stars)
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);
    const starTwinkle = new Float32Array(starCount * 2);
    const starBaseSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 38;
      starPos[idx] = Math.cos(theta) * r;
      starPos[idx + 1] = Math.sin(theta) * (r * 0.65);
      starPos[idx + 2] = -4 - Math.random() * 26;

      const roll = Math.random();
      if (roll > 0.88) {
        // Icy blue-white (O/B type)
        starCols[idx] = 0.88; starCols[idx + 1] = 0.94; starCols[idx + 2] = 1.0;
        starBaseSizes[i] = 0.9 + Math.random() * 0.7;
      } else if (roll > 0.4) {
        // Pure diamond white (A/F type)
        starCols[idx] = 0.98; starCols[idx + 1] = 0.98; starCols[idx + 2] = 1.0;
        starBaseSizes[i] = 0.65 + Math.random() * 0.55;
      } else if (roll > 0.1) {
        // Warm champagne gold (G/K type)
        starCols[idx] = 1.0; starCols[idx + 1] = 0.88; starCols[idx + 2] = 0.62;
        starBaseSizes[i] = 0.75 + Math.random() * 0.6;
      } else {
        // Subtle amber giant (M type)
        starCols[idx] = 1.0; starCols[idx + 1] = 0.55; starCols[idx + 2] = 0.42;
        starBaseSizes[i] = 0.55 + Math.random() * 0.45;
      }

      starTwinkle[i * 2] = 0.5 + Math.random() * 3.0;
      starTwinkle[i * 2 + 1] = Math.random() * Math.PI * 2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));
    starGeo.setAttribute('aTwinkle', new THREE.BufferAttribute(starTwinkle, 2));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(starBaseSizes, 1));

    const starShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMap: { value: starTexture },
      },
      vertexShader: `
        attribute vec3 color;
        attribute vec2 aTwinkle;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;

        void main() {
          vColor = color;
          float t = sin(uTime * aTwinkle.x + aTwinkle.y) * 0.5 + 0.5;
          vAlpha = 0.25 + 0.75 * pow(t, 2.0);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (1.2 + 0.8 * t) * (180.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(vColor, tex.a * vAlpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starShaderMat);
    scene.add(starField);

    // 4. Subtle Meteor / Shooting Star System
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);

    const createMeteor = () => {
      const startX = (Math.random() - 0.5) * 32 - 4;
      const startY = 14 + Math.random() * 5;
      const startZ = -3 - Math.random() * 8;

      const meteorGeo = new THREE.BufferGeometry();
      const positions = new Float32Array([
        startX, startY, startZ,
        startX - 3.8, startY - 2.6, startZ
      ]);
      const colors = new Float32Array([
        1.0, 0.98, 0.9,
        0.85, 0.65, 0.2
      ]);

      meteorGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      meteorGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const meteorMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(meteorGeo, meteorMat);
      line.userData = {
        vx: 0.42 + Math.random() * 0.2,
        vy: -0.28 - Math.random() * 0.15,
        life: 1.0,
        decay: 0.018 + Math.random() * 0.01,
      };
      meteorGroup.add(line);
    };

    let meteorSpawnTimer = 0;

    // 5. Deep Velvet Dark Moon Disc
    const moonGeo = new THREE.CircleGeometry(RADIUS - 0.01, 128);
    const moonMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec2 p = vUv - 0.5;
          float r = length(p) * 2.0;
          if (r > 1.0) discard;
          
          vec3 darkColor = vec3(0.008, 0.007, 0.006);
          float rim = smoothstep(0.95, 1.0, r) * 0.02;
          gl_FragColor = vec4(darkColor + vec3(0.05, 0.04, 0.02) * rim, 1.0);
        }
      `,
      depthWrite: true,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.z = 0.5;
    eclipseGroup.add(moon);

    // 6. HYPER-REALISTIC SHINY GOLDEN RING SHADER WITH MOVING CIRCUMFERENCE SHINE
    const shinyRingGeo = new THREE.RingGeometry(RADIUS - RING_THICKNESS * 0.5, RADIUS + RING_THICKNESS * 0.5, 240);
    const shinyRingMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSweepAngle: { value: 0.73 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uSweepAngle;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
          // Angle around the ring: -PI to +PI
          float angle = atan(vPos.y, vPos.x);
          float radius = length(vPos.xy);

          // Normalized radial cross-section for 3D metallic tube/bevel curvature [0.0 at inner/outer edge -> 1.0 at crest]
          float rNorm = (radius - 3.2925) / 0.055;
          rNorm = clamp(rNorm, 0.0, 1.0);
          float bevelHighlight = 4.0 * rNorm * (1.0 - rNorm); // Parabolic 3D specular highlight

          // 1. PRIMARY ORBITAL SHINE PULSE: Sweeps smoothly DOWN along the circumference
          // Angular distance from the traveling glint
          float angleDiff = abs(mod(angle - uSweepAngle + 3.14159265, 6.2831853) - 3.14159265);
          float sweepGlint = exp(-pow(angleDiff * 4.2, 2.0));

          // Trailing comet luminous tail behind the traveling pulse
          float tailDelta = mod(uSweepAngle - angle + 6.2831853, 6.2831853);
          float trailingTail = exp(-tailDelta * 1.8) * smoothstep(2.5, 0.0, tailDelta) * 0.5;

          // 2. Secondary subtle ambient specular reflections around the ring
          float staticGlint1 = pow(sin(angle * 2.0 + 0.5) * 0.5 + 0.5, 3.0) * 0.35;
          float staticGlint2 = pow(cos(angle * 4.0 - 1.2) * 0.5 + 0.5, 4.0) * 0.25;

          // 3. Mouse cursor interactive specular reflection
          float mouseAngle = atan(uMouse.y, uMouse.x);
          float cursorSpec = exp(-pow(abs(angle - mouseAngle) * 3.2, 2.0)) * 0.5;

          // 4. Fixed brilliant Diamond Ring focal point glint at ~0.73 rad (top-right)
          float diamondGleam = exp(-pow((angle - 0.73) * 5.0, 2.0)) * 0.85;

          // 24K Polished Metallic Gold Color Gradient
          vec3 deepGold    = vec3(0.60, 0.42, 0.12);
          vec3 richGold    = vec3(0.88, 0.70, 0.26);
          vec3 brightGold  = vec3(1.0, 0.88, 0.52);
          vec3 specularCore= vec3(1.0, 0.99, 0.94);

          // Composite metallic luster
          vec3 col = mix(deepGold, richGold, bevelHighlight * 0.6 + staticGlint1 + staticGlint2);
          col = mix(col, brightGold, trailingTail + cursorSpec);
          
          // Intense specular highlight on the moving shine pulse + diamond flare
          float totalSpecular = sweepGlint * 1.5 + diamondGleam + (sweepGlint * bevelHighlight);
          col = mix(col, specularCore, clamp(totalSpecular, 0.0, 1.0));

          // Shimmering micro-scintillation along the shine
          float microGleam = sin(angle * 40.0 + uTime * 6.0) * 0.06;
          col += specularCore * (sweepGlint * microGleam);

          // Alpha & bevel edge sharpness
          float alpha = 0.92 + 0.08 * bevelHighlight;

          gl_FragColor = vec4(col * (1.15 + sweepGlint * 0.4), alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const shinyRing = new THREE.Mesh(shinyRingGeo, shinyRingMat);
    shinyRing.position.z = 0.7;
    eclipseGroup.add(shinyRing);

    // 7. TRAVELING SPECULAR MICRO-FLARE (Glint Sprite that physically orbits along the ring)
    const createShineFlareTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.08, 'rgba(255, 245, 210, 0.9)');
      grad.addColorStop(0.25, 'rgba(245, 215, 127, 0.4)');
      grad.addColorStop(0.6, 'rgba(212, 175, 55, 0.05)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(canvas);
    };

    const movingFlareTex = createShineFlareTexture();
    const movingFlareMat = new THREE.SpriteMaterial({
      map: movingFlareTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    });
    const movingGlintSprite = new THREE.Sprite(movingFlareMat);
    movingGlintSprite.scale.set(1.6, 1.6, 1);
    eclipseGroup.add(movingGlintSprite);

    // 8. SUBTLE, MOODY, DARK GOLDEN ATMOSPHERIC CORONA (Toned Down, Ethereal & Non-Blinding)
    const coronaVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const coronaFragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uPulse; // Interactive CME Pulse
      varying vec2 vUv;

      // 2D Simplex Noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float f = 0.0;
        float w = 0.5;
        for (int i = 0; i < 4; i++) {
          f += w * snoise(p);
          p *= 2.15;
          w *= 0.48;
        }
        return f;
      }

      void main() {
        vec2 uv = vUv - 0.5;
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);

        // Plane is 32x32 units. Radius 3.32 => rInner in UV = 3.32 / 32 = 0.1037
        float rInner = 0.1037;
        if (dist < rInner * 0.95) {
          discard;
        }

        float mouseAngle = atan(uMouse.y, uMouse.x);
        float mouseDist = length(uMouse);
        float mouseInfluence = exp(-pow(abs(angle - mouseAngle) * 2.5, 2.0)) * mouseDist * 0.5;

        float dFromLimb = max(0.0, dist - rInner);

        // Moody Atmospheric Streamer Filaments
        float speed = uTime * 0.03;
        float streamerA = sin(angle * 6.0 + mouseInfluence * 1.2 + fbm(vec2(angle * 3.0 + speed, dist * 8.0 - speed)) * 1.8) * 0.5 + 0.5;
        float streamerB = sin(angle * 12.0 - speed * 1.0 + fbm(vec2(angle * 5.0, dist * 14.0)) * 1.4) * 0.5 + 0.5;
        float fineRays   = fbm(vec2(angle * 22.0 + speed * 0.4, dist * 22.0 - speed * 1.5)) * 0.5 + 0.5;

        // Interactive CME Shockwave Pulse on Click
        float pulseRing = 0.0;
        if (uPulse > 0.01) {
          float pulseRadius = rInner + (1.0 - uPulse) * 0.24;
          pulseRing = exp(-pow((dist - pulseRadius) * 32.0, 2.0)) * uPulse * 1.5;
        }

        // Toned-Down Exponential Radiance Falloff
        float limbGlow = exp(-dFromLimb * 42.0) * 0.75;
        float midGlow  = exp(-dFromLimb * 14.0) * (0.2 + 0.25 * streamerA + 0.15 * streamerB + 0.1 * fineRays + mouseInfluence * 0.25);
        float farGlow  = exp(-dFromLimb * 5.5) * 0.08;

        // Dark Velvet Luxury Gold Color Palette
        vec3 cWhite     = vec3(1.0, 0.96, 0.88);
        vec3 cChampagne = vec3(0.96, 0.82, 0.44);
        vec3 cDeepGold  = vec3(0.78, 0.52, 0.14);
        vec3 cDarkAmber = vec3(0.28, 0.08, 0.015);

        vec3 col = mix(cDarkAmber, cDeepGold, clamp(midGlow * 3.0, 0.0, 1.0));
        col = mix(col, cChampagne, clamp(midGlow * 1.5 + limbGlow * 0.7, 0.0, 1.0));
        col = mix(col, cWhite, clamp(limbGlow * 1.2 + pulseRing * 0.7, 0.0, 1.0));

        // Diamond Ring highlight at ~42 deg (0.73 rad)
        float targetAngle = 0.73;
        float angleDiff = abs(mod(angle - targetAngle + 3.14159265, 6.2831853) - 3.14159265);
        float diamondBias = exp(-pow(angleDiff * 4.0, 2.0)) * exp(-dFromLimb * 16.0);
        col += (cChampagne * 1.4 + cWhite * 1.0) * diamondBias;

        float alpha = (limbGlow * 1.2 + midGlow * 0.85 + farGlow * 0.5 + diamondBias * 0.75 + pulseRing * 0.8);
        alpha = clamp(alpha, 0.0, 1.0);

        // Smooth inner rim feathering & outer fade
        alpha *= smoothstep(rInner * 0.95, rInner * 1.01, dist);
        alpha *= smoothstep(0.45, 0.32, dist);

        gl_FragColor = vec4(col * 0.9, alpha * 0.82);
      }
    `;

    const coronaGeo = new THREE.PlaneGeometry(32, 32);
    const coronaUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPulse: { value: 0 },
    };
    const coronaMat = new THREE.ShaderMaterial({
      vertexShader: coronaVertexShader,
      fragmentShader: coronaFragmentShader,
      uniforms: coronaUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    corona.position.z = 0.1;
    eclipseGroup.add(corona);

    // 9. CRISP DIAMOND RING JEWEL STARBURST GLINT (Fine & Delicate)
    const angleRad = 0.73;
    const flareX = RADIUS * Math.cos(angleRad);
    const flareY = RADIUS * Math.sin(angleRad);

    const diamondGroup = new THREE.Group();
    diamondGroup.position.set(flareX, flareY, 0.85);
    eclipseGroup.add(diamondGroup);

    // Brilliant Jewel Glint Texture
    const createJewelGlintTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.04, 'rgba(255, 250, 230, 0.95)');
      grad.addColorStop(0.14, 'rgba(245, 215, 127, 0.55)');
      grad.addColorStop(0.32, 'rgba(212, 175, 55, 0.15)');
      grad.addColorStop(0.65, 'rgba(180, 100, 20, 0.02)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      return new THREE.CanvasTexture(canvas);
    };

    const diamondTex = createJewelGlintTexture();
    const diamondSpriteMat = new THREE.SpriteMaterial({
      map: diamondTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.95,
    });
    const diamondSprite = new THREE.Sprite(diamondSpriteMat);
    diamondSprite.scale.set(3.4, 3.4, 1);
    diamondGroup.add(diamondSprite);

    // Fine Crystal Needle Ray Texture
    const createNeedleRayTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(512, 128, 0, 512, 128, 512);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.03, 'rgba(255, 245, 210, 0.85)');
      grad.addColorStop(0.14, 'rgba(245, 215, 127, 0.22)');
      grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.04)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 256);
      return new THREE.CanvasTexture(canvas);
    };

    const rayTex = createNeedleRayTexture();
    const raySpriteMat = new THREE.SpriteMaterial({
      map: rayTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.75,
    });

    const hRay = new THREE.Sprite(raySpriteMat);
    hRay.scale.set(13, 0.35, 1);
    diamondGroup.add(hRay);

    const vRay = new THREE.Sprite(raySpriteMat);
    vRay.scale.set(0.3, 5.5, 1);
    diamondGroup.add(vRay);

    // 10. Interactive Pointer State & Mouse Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let pulseVal = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = -(e.clientY / innerHeight - 0.5) * 2;

      targetRotY = x * 0.1;
      targetRotX = -y * 0.08;
      targetPosX = x * 0.32;
      targetPosY = y * 0.22;

      coronaUniforms.uMouse.value.set(x, y);
      shinyRingMat.uniforms.uMouse.value.set(x, y);

      // Diamond flare proximity boost
      const distToFlare = Math.hypot(x - 0.55, y - 0.45);
      const flareBoost = Math.max(0, 1.0 - distToFlare * 1.6);
      diamondSprite.scale.set(3.4 * (1.0 + flareBoost * 0.5), 3.4 * (1.0 + flareBoost * 0.5), 1);
      hRay.scale.set(13 * (1.0 + flareBoost * 0.7), 0.35 * (1.0 + flareBoost * 0.35), 1);
    };

    const handlePointerDown = () => {
      pulseVal = 1.0;
      sound.playSolarPulse();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Dynamic downward circumference sweep animation (smooth, elegant orbit)
      const sweepSpeed = 0.95; // Radians per second
      // Starts at 0.73 (Diamond Ring), sweeps down clockwise
      const currentSweepAngle = ((0.73 - elapsedTime * sweepSpeed) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      shinyRingMat.uniforms.uSweepAngle.value = currentSweepAngle;

      // Position the micro-glint flare sprite precisely on the moving shine position along the ring
      const glintX = RADIUS * Math.cos(currentSweepAngle);
      const glintY = RADIUS * Math.sin(currentSweepAngle);
      movingGlintSprite.position.set(glintX, glintY, 0.78);

      // Dynamic shimmer on the moving glint
      const glintPulse = 0.85 + 0.3 * Math.sin(elapsedTime * 6.0);
      movingGlintSprite.scale.set(1.5 * glintPulse, 1.5 * glintPulse, 1);

      coronaUniforms.uTime.value = elapsedTime;
      shinyRingMat.uniforms.uTime.value = elapsedTime;
      starShaderMat.uniforms.uTime.value = elapsedTime;

      // Decay interactive CME Pulse smoothly
      if (pulseVal > 0) {
        pulseVal = Math.max(0, pulseVal - 0.022);
        coronaUniforms.uPulse.value = pulseVal;
      }

      // Smooth inertia parallax on eclipse
      eclipseGroup.rotation.y += (targetRotY - eclipseGroup.rotation.y) * 0.045;
      eclipseGroup.rotation.x += (targetRotX - eclipseGroup.rotation.x) * 0.045;
      eclipseGroup.position.x += (targetPosX - eclipseGroup.position.x) * 0.045;
      eclipseGroup.position.y += (targetPosY - eclipseGroup.position.y) * 0.045;

      // Parallax on Starfield
      starField.position.x = -targetPosX * 0.35;
      starField.position.y = -targetPosY * 0.35;

      // Diamond flare breathing shimmer
      const shimmer = 1.0 + Math.sin(elapsedTime * 3.5) * 0.04 + Math.sin(elapsedTime * 7.5) * 0.015;
      diamondSprite.scale.set(3.4 * shimmer, 3.4 * shimmer, 1);

      // Shooting star meteors
      meteorSpawnTimer += 0.016;
      if (meteorSpawnTimer > 4.0 && Math.random() < 0.035) {
        createMeteor();
        meteorSpawnTimer = 0;
      }

      for (let i = meteorGroup.children.length - 1; i >= 0; i--) {
        const meteor = meteorGroup.children[i];
        const pos = meteor.geometry.attributes.position.array;
        pos[0] += meteor.userData.vx;
        pos[1] += meteor.userData.vy;
        pos[3] += meteor.userData.vx;
        pos[4] += meteor.userData.vy;
        meteor.geometry.attributes.position.needsUpdate = true;

        meteor.userData.life -= meteor.userData.decay;
        meteor.material.opacity = meteor.userData.life;

        if (meteor.userData.life <= 0) {
          meteorGroup.remove(meteor);
          meteor.geometry.dispose();
          meteor.material.dispose();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      shinyRingGeo.dispose();
      shinyRingMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      diamondSpriteMat.dispose();
      diamondTex.dispose();
      raySpriteMat.dispose();
      rayTex.dispose();
      movingFlareTex.dispose();
      movingFlareMat.dispose();
      starGeo.dispose();
      starShaderMat.dispose();
      starTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-10 overflow-hidden cursor-crosshair"
      style={{
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
}
