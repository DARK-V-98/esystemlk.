
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/d98/useSound';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [stage, setStage] = useState<'idle' | 'booting' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const [threatLevel, setThreatLevel] = useState('SCANNING...');
  const { playStartup, playClick, playSuccess } = useSound();

  const bootMessages = [
    '> Initializing quantum neural matrix...',
    '> Loading cognitive enhancement protocols...',
    '> Calibrating synaptic accelerators...',
    '> Establishing encrypted neural links...',
    '> Syncing with global intelligence network...',
    '> Activating threat detection systems...',
    '> Deploying defensive countermeasures...',
    '> Neural network synchronization: 100%',
    '> D98.AI CORE FULLY OPERATIONAL.',
  ];

  const handleInitialize = () => {
    playClick();
    setStage('booting');
    playStartup();

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 2.5 + 0.5;
      });
    }, 60);

    // System messages
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setSystemMessages((prev) => [...prev, msg]);
      }, i * 350 + 200);
    });

    // Threat level updates
    setTimeout(() => setThreatLevel('ANALYZING...'), 1000);
    setTimeout(() => setThreatLevel('NEUTRALIZING...'), 2000);
    setTimeout(() => setThreatLevel('SECURED'), 3000);

    // Complete boot
    setTimeout(() => {
      playSuccess();
      setStage('complete');
      setTimeout(onComplete, 600);
    }, 3800);
  };

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background hex-grid"
        >
          {/* Animated background rings */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full border-2 ${i % 2 === 0 ? 'ring-spin' : 'ring-spin-reverse'} ${i === 0 ? 'border-primary' : 'border-primary/30'}`}
                style={{
                  width: `${250 + i * 120}px`,
                  height: `${250 + i * 120}px`,
                  borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: stage === 'booting' ? (i === 0 ? 0.8 : 0.4) : 0.2, 
                  scale: 1,
                }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              />
            ))}
            
            {/* Center pulsing core */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-primary/20 border-2 border-primary"
              animate={{
                boxShadow: stage === 'booting' 
                  ? ['0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000', '0 0 40px #ff0000, 0 0 80px #ff0000, 0 0 120px #ff0000', '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000']
                  : '0 0 20px #ff0000',
                scale: stage === 'booting' ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="absolute inset-2 rounded-full bg-primary/40 heartbeat" />
            </motion.div>
          </div>

          {/* Scan lines overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-primary"
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.3, scaleX: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-2xl">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-2 font-display">
                <span className="text-gradient neon-text-intense">D98.AI</span>
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '250px', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ boxShadow: '0 0 20px #ff0000' }}
              />
            </motion.div>

            {stage === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-8"
              >
                <div className="glitch">
                  <p className="text-3xl md:text-4xl text-foreground/90 font-light tracking-[0.2em] neon-text font-display">
                    — START ENGINE —
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 40px #ff0000, 0 0 80px #ff000060' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInitialize}
                  className="glass-panel px-10 py-5 rounded-lg border-2 border-primary/70 text-primary font-bold tracking-widest transition-all pulse-glow text-lg font-display"
                >
                  INITIALIZE D98 AI CORE
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-muted-foreground/60 tracking-widest">
                    ▸ Audio-enabled startup sequence detected
                  </p>
                  <p className="text-xs text-primary/60 tracking-widest warning-blink">
                    ▸ CLASSIFIED SYSTEM — AUTHORIZED ACCESS ONLY
                  </p>
                </motion.div>
              </motion.div>
            )}

            {stage === 'booting' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Waveform visualizer */}
                <div className="flex items-end justify-center gap-1 h-20 mb-4">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-primary via-accent to-secondary rounded-full"
                      animate={{
                        height: [8, Math.random() * 60 + 20, 8],
                      }}
                      transition={{
                        duration: 0.3 + Math.random() * 0.2,
                        repeat: Infinity,
                        delay: i * 0.03,
                      }}
                      style={{
                        boxShadow: '0 0 10px #ff0000',
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                    <span className="tracking-wider">CORE INITIALIZATION</span>
                    <span className="text-primary neon-text font-bold">{Math.min(100, Math.round(progress))}%</span>
                  </div>
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden border border-primary/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary via-primary to-accent rounded-full stats-bar"
                      style={{ 
                        width: `${Math.min(100, progress)}%`,
                        boxShadow: '0 0 20px #ff0000',
                      }}
                    />
                  </div>
                </div>

                {/* Threat Level */}
                <div className="glass-panel rounded-lg px-4 py-2 inline-block border border-primary/30">
                  <span className="text-xs text-muted-foreground mr-2">THREAT LEVEL:</span>
                  <span className={`text-sm font-bold ${threatLevel === 'SECURED' ? 'text-green-500' : 'text-primary neon-text'}`}>
                    {threatLevel}
                  </span>
                </div>

                {/* System messages */}
                <div className="h-40 overflow-hidden glass-panel rounded-lg p-4 text-left border border-primary/20">
                  <div className="space-y-1">
                    {systemMessages.map((msg, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs font-mono ${i === systemMessages.length - 1 ? 'text-primary neon-text' : 'text-muted-foreground/80'}`}
                      >
                        {msg}
                        {i === systemMessages.length - 1 && <span className="typing-cursor" />}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Loading indicators */}
                <div className="flex justify-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                        boxShadow: ['0 0 5px #ff0000', '0 0 20px #ff0000', '0 0 5px #ff0000'],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-primary/40 text-xs font-mono">
            <div>SYS.D98.AI</div>
            <div>v3.0.1-ALPHA</div>
          </div>
          <div className="absolute top-4 right-4 text-primary/40 text-xs font-mono text-right">
            <div>NEURAL.NET</div>
            <div>8192 NODES</div>
          </div>
          <div className="absolute bottom-4 left-4 text-primary/40 text-xs font-mono">
            <div>LAT: 0.02ms</div>
            <div>SYNC: 100%</div>
          </div>
          <div className="absolute bottom-4 right-4 text-primary/40 text-xs font-mono text-right">
            <div>CLASSIFIED</div>
            <div>LEVEL-5</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
