
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import ParticleBackground from './ParticleBackground';
import MatrixRain from './MatrixRain';

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex bg-background overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Matrix Rain */}
      <MatrixRain />

      {/* Grid Overlay */}
      <div className="fixed inset-0 hex-grid pointer-events-none opacity-50" />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
      
      {/* Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Scan line overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)',
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left Panel - Modules */}
        <LeftPanel />

        {/* Center Panel - AI Interaction */}
        <CenterPanel />

        {/* Right Panel - System Status */}
        <div className="hidden md:block">
          <RightPanel />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-3 left-20 md:left-24 text-primary/30 text-[10px] font-mono z-20">
        <div className="flex items-center gap-2">
          {isClient && (
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <span>SYS.ACTIVE</span>
        </div>
      </div>
      <div className="fixed top-3 right-3 md:right-[300px] text-primary/30 text-[10px] font-mono z-20 text-right">
        <span className="flicker">CLASSIFIED</span>
      </div>
      <div className="fixed bottom-3 left-20 md:left-24 text-primary/30 text-[10px] font-mono z-20">
        <span>SEC.LEVEL: 5</span>
      </div>
      <div className="fixed bottom-3 right-3 md:right-[300px] text-primary/30 text-[10px] font-mono z-20 text-right">
        <span>D98.AI.v3.0.1</span>
      </div>
    </motion.div>
  );
};

export default Dashboard;
