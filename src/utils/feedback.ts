// Sound and Haptic feedback helper for mobile touch interaction

export const playBeep = (freq = 600, duration = 0.05) => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // AudioContext may be blocked before first user gesture
  }
};

export const triggerHaptic = (pattern: number | number[] = 30) => {
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Ignore unsupported devices
  }
};

export const playCountFeedback = (isTargetMet = false) => {
  if (isTargetMet) {
    playBeep(880, 0.15);
    triggerHaptic([50, 50, 100]);
  } else {
    playBeep(520, 0.04);
    triggerHaptic(25);
  }
};
