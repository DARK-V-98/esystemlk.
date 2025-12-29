
"use client";
import { useRef, useCallback, useEffect } from 'react';

interface SoundOptions {
  volume?: number;
  pitch?: number;
}

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      } else {
         console.warn("Web Audio API is not supported in this browser.");
      }
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioContext();
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudioContext]);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
        initAudioContext();
    }
    return audioContextRef.current;
  }, [initAudioContext]);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', options: SoundOptions = {}) => {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency * (options.pitch || 1), ctx.currentTime);
      
      const vol = options.volume || 0.1;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio playback failed', e);
    }
  }, [getContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, 'square', { volume: 0.05 });
    setTimeout(() => playTone(600, 0.03, 'square', { volume: 0.03 }), 30);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(1200, 0.02, 'sine', { volume: 0.02 });
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(523, 0.1, 'sine', { volume: 0.08 });
    setTimeout(() => playTone(659, 0.1, 'sine', { volume: 0.08 }), 100);
    setTimeout(() => playTone(784, 0.15, 'sine', { volume: 0.1 }), 200);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(200, 0.15, 'sawtooth', { volume: 0.08 });
    setTimeout(() => playTone(150, 0.2, 'sawtooth', { volume: 0.06 }), 100);
  }, [playTone]);

  const playWarning = useCallback(() => {
    playTone(440, 0.1, 'square', { volume: 0.06 });
    setTimeout(() => playTone(440, 0.1, 'square', { volume: 0.06 }), 200);
  }, [playTone]);

  const playTyping = useCallback(() => {
    const freq = 300 + Math.random() * 200;
    playTone(freq, 0.02, 'square', { volume: 0.02 });
  }, [playTone]);

  const playSend = useCallback(() => {
    playTone(400, 0.05, 'sine', { volume: 0.08 });
    setTimeout(() => playTone(600, 0.05, 'sine', { volume: 0.08 }), 50);
    setTimeout(() => playTone(800, 0.08, 'sine', { volume: 0.1 }), 100);
    setTimeout(() => playTone(1200, 0.1, 'triangle', { volume: 0.06 }), 150);
  }, [playTone]);

  const playReceive = useCallback(() => {
    playTone(1000, 0.05, 'sine', { volume: 0.06 });
    setTimeout(() => playTone(800, 0.05, 'sine', { volume: 0.06 }), 80);
    setTimeout(() => playTone(600, 0.08, 'sine', { volume: 0.08 }), 160);
  }, [playTone]);

  const playStartup = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;
    
    // Deep bass rumble
    const playBass = (delay: number, duration: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 2, ctx.currentTime + delay + duration);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Layered engine startup
    playBass(0, 2.5, 40);
    playBass(0.1, 2.3, 60);
    playBass(0.2, 2.1, 80);
    playBass(0.4, 1.8, 120);
    playBass(0.6, 1.5, 200);
    playBass(0.8, 1.2, 300);
    playBass(1.0, 1.0, 400);
    playBass(1.2, 0.8, 600);

    // High-pitched confirmation sequence
    setTimeout(() => {
      playTone(800, 0.08, 'sine', { volume: 0.1 });
      setTimeout(() => playTone(1000, 0.08, 'sine', { volume: 0.1 }), 100);
      setTimeout(() => playTone(1200, 0.08, 'sine', { volume: 0.1 }), 200);
      setTimeout(() => playTone(1600, 0.15, 'sine', { volume: 0.12 }), 300);
    }, 2200);

    // Final power-up sweep
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    }, 2800);
  }, [getContext, playTone]);

  const playAlert = useCallback(() => {
    playTone(880, 0.15, 'square', { volume: 0.08 });
    setTimeout(() => playTone(660, 0.15, 'square', { volume: 0.08 }), 200);
    setTimeout(() => playTone(880, 0.15, 'square', { volume: 0.08 }), 400);
  }, [playTone]);

  const playModuleSwitch = useCallback(() => {
    playTone(300, 0.03, 'sine', { volume: 0.05 });
    playTone(500, 0.05, 'triangle', { volume: 0.06 });
    setTimeout(() => playTone(700, 0.08, 'sine', { volume: 0.07 }), 50);
  }, [playTone]);

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playWarning,
    playTyping,
    playSend,
    playReceive,
    playStartup,
    playAlert,
    playModuleSwitch,
  };
};
