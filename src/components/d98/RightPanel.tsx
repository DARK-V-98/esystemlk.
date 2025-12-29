
"use client";
import { motion } from 'framer-motion';
import { Activity, Cpu, Wifi, Zap, Shield, Clock, AlertTriangle, Thermometer, HardDrive, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'accent' | 'green';
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
}

const RightPanel = () => {
  const [stats, setStats] = useState<Stat[]>([
    { id: 'power', label: 'Core Power', value: '98%', icon: Zap, color: 'primary', percentage: 98, trend: 'up' },
    { id: 'sync', label: 'Neural Sync', value: 'OPTIMAL', icon: Activity, color: 'green' },
    { id: 'latency', label: 'Latency', value: '0.02ms', icon: Clock, color: 'primary' },
    { id: 'intel', label: 'Intelligence', value: 'MAX', icon: Cpu, color: 'accent', percentage: 100, trend: 'stable' },
    { id: 'network', label: 'Network', value: 'ONLINE', icon: Wifi, color: 'green' },
    { id: 'security', label: 'Security', value: 'ACTIVE', icon: Shield, color: 'primary', percentage: 100 },
    { id: 'temp', label: 'Core Temp', value: '42°C', icon: Thermometer, color: 'secondary', percentage: 42 },
    { id: 'storage', label: 'Storage', value: '2.4 PB', icon: HardDrive, color: 'primary', percentage: 67 },
  ]);
  
  const [isClient, setIsClient] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(16).fill(0.5));
  const [signalStrength, setSignalStrength] = useState<number[]>(Array(8).fill(0.5));
  const [threatLevel, setThreatLevel] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setWaveformData(Array(16).fill(0).map(() => Math.random() * 0.8 + 0.2));
      setSignalStrength(Array(8).fill(0).map(() => Math.random() * 0.7 + 0.3));
      setThreatLevel(Math.random() * 15);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'accent': return 'text-accent';
      case 'green': return 'text-green-500';
      default: return 'text-foreground';
    }
  };

  const getBgClass = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary';
      case 'secondary': return 'bg-secondary';
      case 'accent': return 'bg-accent';
      case 'green': return 'bg-green-500';
      default: return 'bg-foreground';
    }
  };

  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-64 lg:w-72 h-full glass-panel border-l border-primary/20 p-4 lg:p-5 overflow-y-auto"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[10px] font-semibold text-muted-foreground tracking-[0.2em] mb-1 font-display">
          SYSTEM STATUS
        </h2>
        <div className="flex items-center gap-2">
          <motion.span 
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ 
              boxShadow: ['0 0 5px #ff0000', '0 0 15px #ff0000', '0 0 5px #ff0000'],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-primary neon-text font-bold font-display">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      {isClient && (
        <>
          {/* Threat Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 glass-panel rounded-lg p-3 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={12} className="text-green-500" />
                <span className="text-[10px] text-muted-foreground tracking-wider">THREAT LEVEL</span>
              </div>
              <span className="text-xs font-bold text-green-500">LOW</span>
            </div>
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full"
                animate={{ width: `${threatLevel}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Waveform Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4 glass-panel rounded-lg p-3 border border-primary/20"
          >
            <p className="text-[10px] text-muted-foreground tracking-wider mb-2 font-display">NEURAL ACTIVITY</p>
            <div className="flex items-end justify-between h-10 gap-0.5">
              {waveformData.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary via-accent to-secondary rounded-t-sm"
                  animate={{ height: `${height * 100}%` }}
                  transition={{ duration: 0.1 }}
                  style={{ boxShadow: '0 0 5px #ff0000' }}
                />
              ))}
            </div>
          </motion.div>

          {/* Signal Strength */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-4 glass-panel rounded-lg p-3 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Radio size={12} className="text-primary" />
                <span className="text-[10px] text-muted-foreground tracking-wider font-display">SIGNAL STRENGTH</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-6 gap-1">
              {signalStrength.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary rounded-sm"
                  animate={{ height: `${height * 100}%`, opacity: height }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Stats Grid */}
      <div className="space-y-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="glass-panel rounded-lg p-2.5 border border-primary/10 hover:border-primary/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${getBgClass(stat.color)}/20`}>
                    <Icon size={12} className={getColorClass(stat.color)} />
                  </div>
                  <span className="text-[10px] text-muted-foreground tracking-wider">{stat.label}</span>
                </div>
                <span className={`text-xs font-bold ${getColorClass(stat.color)} group-hover:neon-text transition-all`}>
                  {stat.value}
                </span>
              </div>
              
              {stat.percentage !== undefined && (
                <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${getBgClass(stat.color)} rounded-full stats-bar`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.08, duration: 0.6 }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 pt-3 border-t border-primary/20"
      >
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">VERSION</span>
            <span className="text-primary font-mono">D98.AI.v3.0.1</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">UPTIME</span>
            <span className="text-primary neon-text">∞</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">NODES</span>
            <span className="text-foreground font-mono">8,192</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">PROCESSES</span>
            <span className="text-foreground font-mono">1.2M</span>
          </div>
        </div>
      </motion.div>

      {/* Radar/Scanning Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-4 relative overflow-hidden rounded-lg aspect-square glass-panel border border-primary/20"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Radar circles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: `${25 + i * 25}%`,
                height: `${25 + i * 25}%`,
              }}
            />
          ))}
          {/* Radar sweep */}
          <div 
            className="absolute inset-0 radar-sweep origin-center"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,0,0,0.3) 30deg, transparent 60deg)',
            }}
          />
          {/* Center dot */}
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ boxShadow: '0 0 10px #ff0000' }}
          />
          {/* Random blips */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-accent rounded-full"
            animate={{ 
              x: [20, 25, 20],
              y: [-15, -20, -15],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-secondary rounded-full"
            animate={{ 
              x: [-30, -35, -30],
              y: [10, 15, 10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        <p className="absolute bottom-2 left-0 right-0 text-center text-[8px] text-muted-foreground/60 tracking-widest">
          SCANNING SECTOR 7-G
        </p>
      </motion.div>
    </motion.aside>
  );
};

export default RightPanel;
