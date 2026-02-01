import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#020202]">
      {/* Background Ambient Glows - Refined Green */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#A3FF00]/10 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#A3FF00]/5 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="inline-block px-5 py-2 mb-8 text-[10px] font-bold tracking-[0.3em] uppercase border border-[#A3FF00]/20 rounded-full bg-[#A3FF00]/5 backdrop-blur-sm text-[#A3FF00] shadow-[0_0_20px_rgba(163,255,0,0.1)]">
            Intelligence Evolved
          </span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-10 leading-[0.95] uppercase">
            Thinking <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#A3FF00]">
              Interfaces.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-14 font-medium">
            A dashboard that doesn't just display data—it understands context. 
            Experience the first UI that <span className="text-white/80 italic">morphs with your intent.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}
            className="group relative px-10 py-5 bg-[#A3FF00] text-black font-black tracking-tighter uppercase rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(163,255,0,0.3)] active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              See how it adapts <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button className="px-10 py-5 text-white/60 font-bold tracking-widest uppercase hover:text-[#A3FF00] transition-all duration-300 border border-white/5 rounded-full hover:bg-[#A3FF00]/5 hover:border-[#A3FF00]/20 text-sm">
            The Manifesto
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 via-[#A3FF00]/40 to-transparent" />
      </motion.div>
    </section>
  );
};
