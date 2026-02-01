import React from 'react';
import { motion } from 'motion/react';

import { ChevronRight } from 'lucide-react';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#A3FF00] to-[#000000] border border-[#A3FF00]/30 shadow-[0_0_15px_rgba(163,255,0,0.2)] group-hover:shadow-[0_0_25px_rgba(163,255,0,0.4)] transition-all duration-500" />
          <span className="text-white font-bold text-xl tracking-tighter uppercase">Chameleon</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Vision', 'Modes', 'Technology', 'Manifesto'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-white/40 hover:text-white transition-colors text-[13px] font-semibold tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}
            className="group flex items-center gap-2 text-[#A3FF00] font-bold text-[13px] tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Dashboard <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <button className="px-6 py-2 rounded-full border border-[#A3FF00]/20 bg-white/5 backdrop-blur-md text-[#A3FF00] text-xs font-bold tracking-widest uppercase hover:bg-[#A3FF00]/10 hover:border-[#A3FF00]/40 transition-all duration-300">
          Join Beta
        </button>
      </div>
    </motion.nav>
  );
};
