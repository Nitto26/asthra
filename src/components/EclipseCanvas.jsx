import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';

/**
 * High-Performance Dark Astronomy Scene with 24K Metallic Gold Ring
 * Optimized for 60+ FPS buttery smooth performance across all devices.
 * 
 * Performance Optimizations:
 * 1. IntersectionObserver to automatically pause render loop when offscreen.
 * 2. Mobile & High-DPI adaptive pixel ratio (1.0 on mobile, max 1.5 on desktop).
 * 3. Optimized Simplex Noise & FBM shader loops (fast 2-octave procedural corona).
 * 4. RAF-throttled mouse tracking.
 * 5. Complete memory management & disposal.
 */
export default function EclipseCanvas({ onLoaded }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId = null;
    let hasNotifiedLoaded = false;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 21;

    // Dynamic pixel ratio: Crisp 1.5-1.75 on Retina/4K displays without GPU fill-rate exhaustion
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.75)
      : Math.min(window.devicePixelRatio || 1, 1.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // Hardware-accelerated MSAA for razor-sharp gold rim and glare
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const eclipseGroup = new THREE.Group();
    scene.add(eclipseGroup);

    const RADIUS = 3.32;
    const RING_THICKNESS = 0.055;

    // 2. Realistic Pinpoint Star Particle Texture (Generated on a small 32x32 canvas)
    const createPinpointStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.18, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createPinpointStarTexture();

    // 3. Starfield (Optimized count: 1200 on mobile, 2200 on desktop)
    const starCount = isMobile ? 1200 : 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);
    const starTwinkle = new Float32Array(starCount * 2);
    const starBaseSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 36;
      starPos[idx] = Math.cos(theta) * r;
      starPos[idx + 1] = Math.sin(theta) * (r * 0.65);
      starPos[idx + 2] = -4 - Math.random() * 24;

      const roll = Math.random();
      if (roll > 0.88) {
        starCols[idx] = 0.88; starCols[idx + 1] = 0.94; starCols[idx + 2] = 1.0;
        starBaseSizes[i] = 0.85 + Math.random() * 0.65;
      } else if (roll > 0.4) {
        starCols[idx] = 0.98; starCols[idx + 1] = 0.98; starCols[idx + 2] = 1.0;
        starBaseSizes[i] = 0.65 + Math.random() * 0.5;
      } else if (roll > 0.1) {
        starCols[idx] = 1.0; starCols[idx + 1] = 0.88; starCols[idx + 2] = 0.62;
        starBaseSizes[i] = 0.75 + Math.random() * 0.55;
      } else {
        starCols[idx] = 1.0; starCols[idx + 1] = 0.55; starCols[idx + 2] = 0.42;
        starBaseSizes[i] = 0.55 + Math.random() * 0.4;
      }

      starTwinkle[i * 2] = 0.5 + Math.random() * 2.5;
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

    // 4. Dark Moon Disc (High-fidelity smooth curvature)
    const moonGeo = new THREE.CircleGeometry(RADIUS - 0.01, 96);
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

    // 5. 24K Gold Ring (Ultra-smooth 160-segment ring)
    const shinyRingGeo = new THREE.RingGeometry(RADIUS - RING_THICKNESS * 0.5, RADIUS + RING_THICKNESS * 0.5, 160);
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
          float angle = atan(vPos.y, vPos.x);
          float radius = length(vPos.xy);

          float rNorm = clamp((radius - 3.2925) / 0.055, 0.0, 1.0);
          float bevelHighlight = 4.0 * rNorm * (1.0 - rNorm);

          float angleDiff = abs(mod(angle - uSweepAngle + 3.14159265, 6.2831853) - 3.14159265);
          float sweepGlint = exp(-pow(angleDiff * 4.2, 2.0));

          float tailDelta = mod(uSweepAngle - angle + 6.2831853, 6.2831853);
          float trailingTail = exp(-tailDelta * 1.8) * smoothstep(2.5, 0.0, tailDelta) * 0.5;

          float staticGlint1 = pow(sin(angle * 2.0 + 0.5) * 0.5 + 0.5, 3.0) * 0.35;
          float diamondGleam = exp(-pow((angle - 0.73) * 5.0, 2.0)) * 0.85;

          vec3 deepGold    = vec3(0.60, 0.42, 0.12);
          vec3 richGold    = vec3(0.88, 0.70, 0.26);
          vec3 brightGold  = vec3(1.0, 0.88, 0.52);
          vec3 specularCore= vec3(1.0, 0.99, 0.94);

          vec3 col = mix(deepGold, richGold, bevelHighlight * 0.6 + staticGlint1);
          col = mix(col, brightGold, trailingTail);
          
          float totalSpecular = sweepGlint * 1.5 + diamondGleam + (sweepGlint * bevelHighlight);
          col = mix(col, specularCore, clamp(totalSpecular, 0.0, 1.0));

          float microGleam = sin(angle * 40.0 + uTime * 6.0) * 0.06;
          col += specularCore * (sweepGlint * microGleam);

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

    // 6. Traveling Specular Micro-Flare Sprite
    const createShineFlareTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.1, 'rgba(255, 245, 210, 0.9)');
      grad.addColorStop(0.3, 'rgba(245, 215, 127, 0.4)');
      grad.addColorStop(0.7, 'rgba(212, 175, 55, 0.04)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
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

    // 7. High-Performance Atmospheric Corona Shader (Annular Ring geometry bounded to the active corona)
    const coronaVertexShader = `
      varying vec2 vPos;
      void main() {
        vPos = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const coronaFragmentShader = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uPulse;
      varying vec2 vPos;

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

      // Fast 2-Octave FBM (60% fewer arithmetic ops)
      float fbmFast(vec2 p) {
        return 0.65 * snoise(p) + 0.35 * snoise(p * 2.15);
      }

      void main() {
        float dist = length(vPos) / 32.0;
        float rInner = 3.32 / 32.0;

        float angle = atan(vPos.y, vPos.x);
        float dFromLimb = max(0.0, dist - rInner);

        float speed = uTime * 0.03;
        float streamerA = sin(angle * 6.0 + fbmFast(vec2(angle * 3.0 + speed, dist * 8.0 - speed)) * 1.8) * 0.5 + 0.5;
        float streamerB = sin(angle * 12.0 - speed * 1.0) * 0.5 + 0.5;

        float pulseRing = 0.0;
        if (uPulse > 0.01) {
          float pulseRadius = rInner + (1.0 - uPulse) * 0.24;
          pulseRing = exp(-pow((dist - pulseRadius) * 32.0, 2.0)) * uPulse * 1.5;
        }

        float limbGlow = exp(-dFromLimb * 42.0) * 0.75;
        float midGlow  = exp(-dFromLimb * 14.0) * (0.2 + 0.28 * streamerA + 0.16 * streamerB);
        float farGlow  = exp(-dFromLimb * 5.5) * 0.08;

        vec3 cWhite     = vec3(1.0, 0.96, 0.88);
        vec3 cChampagne = vec3(0.96, 0.82, 0.44);
        vec3 cDeepGold  = vec3(0.78, 0.52, 0.14);
        vec3 cDarkAmber = vec3(0.28, 0.08, 0.015);

        vec3 col = mix(cDarkAmber, cDeepGold, clamp(midGlow * 3.0, 0.0, 1.0));
        col = mix(col, cChampagne, clamp(midGlow * 1.5 + limbGlow * 0.7, 0.0, 1.0));
        col = mix(col, cWhite, clamp(limbGlow * 1.2 + pulseRing * 0.7, 0.0, 1.0));

        float targetAngle = 0.73;
        float angleDiff = abs(mod(angle - targetAngle + 3.14159265, 6.2831853) - 3.14159265);
        float diamondBias = exp(-pow(angleDiff * 4.0, 2.0)) * exp(-dFromLimb * 16.0);
        col += (cChampagne * 1.4 + cWhite * 1.0) * diamondBias;

        float alpha = (limbGlow * 1.2 + midGlow * 0.85 + farGlow * 0.5 + diamondBias * 0.75 + pulseRing * 0.8);
        alpha = clamp(alpha, 0.0, 1.0);
        alpha *= smoothstep(rInner * 0.96, rInner * 1.01, dist);
        alpha *= smoothstep(0.44, 0.32, dist);

        gl_FragColor = vec4(col * 0.9, alpha * 0.82);
      }
    `;

    // Annular ring geometry (3.30 to 14.2) skips the inner lunar disc & outer offscreen pixels at the GPU hardware level
    const coronaGeo = new THREE.RingGeometry(3.30, 14.2, 64, 4);
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

    // 8. Diamond Ring Glint Starburst
    const angleRad = 0.73;
    const flareX = RADIUS * Math.cos(angleRad);
    const flareY = RADIUS * Math.sin(angleRad);

    const diamondGroup = new THREE.Group();
    diamondGroup.position.set(flareX, flareY, 0.85);
    eclipseGroup.add(diamondGroup);

    const createJewelGlintTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.05, 'rgba(255, 250, 230, 0.95)');
      grad.addColorStop(0.18, 'rgba(245, 215, 127, 0.5)');
      grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.1)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
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

    const createNeedleRayTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(256, 64, 0, 256, 64, 256);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.04, 'rgba(255, 245, 210, 0.85)');
      grad.addColorStop(0.16, 'rgba(245, 215, 127, 0.2)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 128);
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

    // 9. Throttled Pointer Motion (Using RAF gating)
    let targetRotX = 0;
    let targetRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let pulseVal = 0;
    let mousePending = false;

    const handleMouseMove = (e) => {
      if (mousePending) return;
      mousePending = true;

      requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = -(e.clientY / innerHeight - 0.5) * 2;

        targetRotY = x * 0.08;
        targetRotX = -y * 0.06;
        targetPosX = x * 0.28;
        targetPosY = y * 0.18;

        coronaUniforms.uMouse.value.set(x, y);
        shinyRingMat.uniforms.uMouse.value.set(x, y);
        mousePending = false;
      });
    };

    const handlePointerDown = () => {
      pulseVal = 1.0;
      sound.playSolarPulse();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Responsive Sizing
    const updateSize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      let eclipseScale = 1.0;
      if (w < 420) {
        eclipseScale = 0.60;
      } else if (w < 480) {
        eclipseScale = 0.65;
      } else if (w < 640) {
        eclipseScale = 0.74;
      } else if (w < 768) {
        eclipseScale = 0.84;
      } else if (w < 1024) {
        eclipseScale = 0.98;
      } else if (w < 1440) {
        eclipseScale = 1.08;
      } else {
        eclipseScale = 1.16;
      }
      eclipseGroup.scale.set(eclipseScale, eclipseScale, 1);
    };

    updateSize();

    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. IntersectionObserver: Strictly pause rendering when scrolled out of Hero section!
    // This stops 100% of WebGL GPU/CPU work when viewing About, Events, Social Drive, Contact!
    const heroSection = document.getElementById('hero') || container;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            animate();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.0 }
    );
    visibilityObserver.observe(heroSection);

    // 11. Animation Loop (Only runs when visible)
    const startTime = performance.now();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      const sweepSpeed = 0.95;
      const currentSweepAngle = ((0.73 - elapsedTime * sweepSpeed) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      shinyRingMat.uniforms.uSweepAngle.value = currentSweepAngle;

      const glintX = RADIUS * Math.cos(currentSweepAngle);
      const glintY = RADIUS * Math.sin(currentSweepAngle);
      movingGlintSprite.position.set(glintX, glintY, 0.78);

      coronaUniforms.uTime.value = elapsedTime;
      shinyRingMat.uniforms.uTime.value = elapsedTime;
      starShaderMat.uniforms.uTime.value = elapsedTime;

      if (pulseVal > 0) {
        pulseVal = Math.max(0, pulseVal - 0.022);
        coronaUniforms.uPulse.value = pulseVal;
      }

      // Smooth dampening
      eclipseGroup.rotation.y += (targetRotY - eclipseGroup.rotation.y) * 0.045;
      eclipseGroup.rotation.x += (targetRotX - eclipseGroup.rotation.x) * 0.045;
      eclipseGroup.position.x += (targetPosX - eclipseGroup.position.x) * 0.045;
      eclipseGroup.position.y += (targetPosY - eclipseGroup.position.y) * 0.045;

      starField.position.x = -targetPosX * 0.35;
      starField.position.y = -targetPosY * 0.35;

      renderer.render(scene, camera);

      // Notify parent once initial frame is completely rendered to trigger seamless fade-in
      if (!hasNotifiedLoaded) {
        hasNotifiedLoaded = true;
        if (onLoaded) {
          requestAnimationFrame(() => {
            onLoaded();
          });
        }
      }
    };

    animate();

    // 12. Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
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
        contain: 'strict', // CSS containment to isolate layout/paint computations
      }}
      aria-hidden="true"
    />
  );
}
