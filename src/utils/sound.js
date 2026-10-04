/**
 * Lightweight Web Audio API Synthesizer
 * Zero external audio files required, purely procedural, low-latency, ultra-clean.
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.isEnabled = true;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(freq = 528, type = 'sine', duration = 0.8, volume = 0.08) {
    if (!this.isEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio policy safe
    }
  }

  playSolarPulse() {
    if (!this.isEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Deep celestial hum
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(108, this.ctx.currentTime);
      oscLow.frequency.exponentialRampToValueAtTime(54, this.ctx.currentTime + 1.2);
      gainLow.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gainLow.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      oscLow.connect(gainLow);
      gainLow.connect(this.ctx.destination);
      oscLow.start();
      oscLow.stop(this.ctx.currentTime + 1.2);

      // Shimmering harmonic overtone
      this.playChime(864, 'sine', 0.9, 0.06);
      setTimeout(() => this.playChime(1152, 'sine', 1.1, 0.04), 80);
    } catch (e) {}
  }

  playClick() {
    this.playChime(880, 'triangle', 0.12, 0.05);
  }

  playSuccess() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq, 'sine', 0.8, 0.06), idx * 100);
    });
  }
}

export const sound = new SoundFX();
