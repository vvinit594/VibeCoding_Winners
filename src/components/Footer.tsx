import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-32 px-6 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      {/* Subtle green tint at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#A3FF00]/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 mb-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#A3FF00] flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-black" />
              </div>
              <span className="text-white font-black tracking-tighter text-2xl uppercase">Chameleon</span>
            </div>
            <p className="text-white/30 text-base max-w-xs leading-relaxed font-medium">
              Architecting the next generation of human-computer interaction through adaptive, AI-native interfaces.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Product</h4>
            <ul className="space-y-3 text-[13px] text-white/40 font-semibold tracking-wide">
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Vision</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Roadmap</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Safety</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Company</h4>
            <ul className="space-y-3 text-[13px] text-white/40 font-semibold tracking-wide">
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">About</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Careers</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Press</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Connect</h4>
            <ul className="space-y-3 text-[13px] text-white/40 font-semibold tracking-wide">
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Twitter</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">Discord</a></li>
              <li><a href="#" className="hover:text-[#A3FF00] transition-colors uppercase">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-0">
            © 2026 Chameleon Technologies Inc. 
          </p>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
