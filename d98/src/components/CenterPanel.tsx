import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Terminal, Zap, Brain, Shield, Eye } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const CenterPanel = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const { playTyping, playSend, playReceive, playClick, playHover } = useSound();
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholderTexts = [
    'Command D98.AI...',
    'Enter directive...',
    'Execute protocol...',
    'Initiate sequence...',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');

  // Typing effect for placeholder
  useEffect(() => {
    const targetText = placeholderTexts[placeholderIndex];
    let charIndex = 0;
    setDisplayedPlaceholder('');

    const typeInterval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setDisplayedPlaceholder(targetText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > input.length) {
      playTyping();
    }
    setInput(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSend();
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setIsTyping(true);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      playReceive();
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: `PROCESSING: "${input}"\n\n▸ Quantum neural analysis complete\n▸ Threat assessment: NULL\n▸ Confidence level: 99.7%\n\nD98.AI has processed your request using advanced cognitive algorithms. Intelligence matrix suggests optimal pathways have been identified. Ready for next directive.`,
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const quickCommands = [
    { label: 'Analyze Threats', icon: Shield },
    { label: 'Neural Scan', icon: Brain },
    { label: 'Deep Vision', icon: Eye },
    { label: 'Power Surge', icon: Zap },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex-1 h-full flex flex-col overflow-hidden relative"
    >
      {/* Animated background core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[800px] h-[800px] border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[600px] h-[600px] border border-primary/15 rounded-full"
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[400px] h-[400px] border-2 border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[250px] h-[250px] border border-primary/30 rounded-full"
          style={{ borderStyle: 'dashed' }}
        />
        
        {/* Core glow */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          animate={{
            boxShadow: [
              '0 0 60px #ff000040, 0 0 120px #ff000020',
              '0 0 100px #ff000060, 0 0 200px #ff000030',
              '0 0 60px #ff000040, 0 0 120px #ff000020',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-8 h-8 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ boxShadow: '0 0 30px #ff0000, 0 0 60px #ff0000' }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 relative z-10">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            {/* System label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase font-display glitch">
                Premier Intelligence System • Level-5 Classified
              </span>
            </motion.div>

            {/* Hero Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight font-display"
            >
              <span className="text-gradient neon-text-intense">NEXT-LEVEL</span>
              <br />
              <span className="text-foreground">AI INTELLIGENCE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-muted-foreground text-sm md:text-base mb-10 max-w-lg mx-auto tracking-wide"
            >
              Beyond human limits. The future is now. Unleash the power of quantum neural processing.
            </motion.p>

            {/* Quick Commands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {quickCommands.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <motion.button
                    key={cmd.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px #ff000060' }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHover}
                    onClick={() => {
                      playClick();
                      setInput(cmd.label);
                    }}
                    className="glass-panel px-4 py-2.5 rounded-lg text-xs text-muted-foreground hover:text-primary hover:border-primary/50 border border-primary/20 transition-all flex items-center gap-2 group"
                  >
                    <Icon size={14} className="text-primary group-hover:neon-text transition-all" />
                    <span className="font-display tracking-wider">{cmd.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Stats display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12 flex justify-center gap-8 text-[10px] text-muted-foreground/50"
            >
              <div className="text-center">
                <div className="text-primary text-lg font-bold neon-text font-display">8,192</div>
                <div className="tracking-wider">NEURAL NODES</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-lg font-bold neon-text font-display">0.02ms</div>
                <div className="tracking-wider">LATENCY</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-lg font-bold neon-text font-display">∞</div>
                <div className="tracking-wider">PROCESSING</div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full max-w-3xl flex-1 overflow-y-auto py-8 space-y-4 scrollbar-thin">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'glass-panel border border-primary/40 text-foreground'
                        : 'glass-panel border border-accent/30'
                    }`}
                    style={{
                      boxShadow: msg.role === 'ai' ? '0 0 20px #ff000020' : undefined,
                    }}
                  >
                    {msg.role === 'ai' && (
                      <div className="flex items-center gap-2 mb-3">
                        <motion.span 
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ boxShadow: ['0 0 5px #ff0000', '0 0 15px #ff0000', '0 0 5px #ff0000'] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-[10px] text-primary tracking-widest font-display font-bold">D98.AI RESPONSE</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line font-mono">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass-panel border border-accent/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-primary tracking-widest font-display">PROCESSING</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ 
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="p-4 md:p-6"
      >
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-2xl p-1 border border-primary/30 hover:border-primary/50 focus-within:border-primary focus-within:shadow-neon transition-all">
            <div className="flex items-center gap-3 p-3 md:p-4">
              <motion.div 
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-primary/50"
                animate={{ 
                  boxShadow: ['0 0 10px #ff0000', '0 0 20px #ff0000', '0 0 10px #ff0000'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Terminal size={18} className="text-primary-foreground" />
              </motion.div>
              
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={displayedPlaceholder}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 text-sm md:text-base outline-none font-mono"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim()}
                onMouseEnter={playHover}
                className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  input.trim()
                    ? 'bg-primary text-primary-foreground neon-border'
                    : 'bg-muted/50 text-muted-foreground'
                }`}
                style={{
                  boxShadow: input.trim() ? '0 0 20px #ff0000' : undefined,
                }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>

          <p className="text-center text-[10px] text-muted-foreground/40 mt-4 tracking-widest font-display">
            D98.AI • PREMIER INTELLIGENCE ENGINE • BEYOND HUMAN LIMITS • THE FUTURE IS NOW
          </p>
        </form>
      </motion.div>
    </motion.main>
  );
};

export default CenterPanel;
