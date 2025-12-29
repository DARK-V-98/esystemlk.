
"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, Eye, Database, Shield, Zap, Settings, Cpu, Radio, Target } from 'lucide-react';
import { useState } from 'react';
import { useSound } from '@/hooks/d98/useSound';

interface Module {
  id: string;
  icon: React.ElementType;
  name: string;
  status: 'active' | 'standby' | 'offline';
  power: number;
}

const modules: Module[] = [
  { id: 'core', icon: Brain, name: 'AI Core', status: 'active', power: 98 },
  { id: 'neural', icon: Network, name: 'Neural Net', status: 'active', power: 100 },
  { id: 'vision', icon: Eye, name: 'Vision', status: 'active', power: 95 },
  { id: 'data', icon: Database, name: 'Data Hub', status: 'active', power: 100 },
  { id: 'security', icon: Shield, name: 'Security', status: 'active', power: 100 },
  { id: 'power', icon: Zap, name: 'Power Grid', status: 'active', power: 98 },
  { id: 'cpu', icon: Cpu, name: 'Processing', status: 'active', power: 96 },
  { id: 'comms', icon: Radio, name: 'Comms', status: 'standby', power: 75 },
  { id: 'target', icon: Target, name: 'Targeting', status: 'standby', power: 80 },
];

const LeftPanel = () => {
  const [activeModule, setActiveModule] = useState('core');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const { playModuleSwitch, playHover } = useSound();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary';
      case 'standby':
        return 'bg-accent';
      case 'offline':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const handleModuleClick = (moduleId: string) => {
    playModuleSwitch();
    setActiveModule(moduleId);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-16 md:w-20 h-full glass-panel border-r border-primary/20 flex flex-col items-center py-4"
    >
      {/* Logo */}
      <motion.div 
        className="mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-primary/50 neon-border">
          <span className="text-primary-foreground font-bold text-lg font-display">D</span>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />

      {/* Module Icons */}
      <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto scrollbar-none">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          const isHovered = hoveredModule === module.id;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="relative"
            >
              <motion.button
                onMouseEnter={() => {
                  setHoveredModule(module.id);
                  playHover();
                }}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => handleModuleClick(module.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center
                  transition-all duration-300 module-icon relative
                  ${isActive 
                    ? 'bg-primary/20 text-primary border border-primary/60 active neon-border' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent'
                  }
                `}
              >
                <Icon size={18} />
                
                {/* Status indicator */}
                <motion.span 
                  className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${getStatusColor(module.status)}`}
                  animate={{
                    boxShadow: module.status === 'active' 
                      ? ['0 0 4px #ff0000', '0 0 8px #ff0000', '0 0 4px #ff0000']
                      : '0 0 4px #ff6600',
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                    style={{ boxShadow: '0 0 10px #ff0000' }}
                  />
                )}
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50"
                  >
                    <div className="glass-panel px-3 py-2 rounded-md whitespace-nowrap border border-primary/30">
                      <p className="text-xs font-bold text-primary">{module.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] capitalize ${module.status === 'active' ? 'text-green-400' : 'text-accent'}`}>
                          {module.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground">|</span>
                        <span className="text-[10px] text-muted-foreground">{module.power}%</span>
                      </div>
                      {/* Mini power bar */}
                      <div className="w-full h-0.5 bg-muted/50 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${module.power}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4" />

      {/* Settings */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => playModuleSwitch()}
        className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
      >
        <Settings size={18} />
      </motion.button>
    </motion.aside>
  );
};

export default LeftPanel;
