import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const modes = [
  {
    id: 'calm',
    title: 'Calm Mode',
    tagline: 'Deep flow, minimal noise.',
    description: 'When you need to reflect and think. High negative space, muted colors, and prioritised long-form content.',
    color: 'from-[#A3FF00]/10 to-transparent',
    accent: 'text-white'
  },
  {
    id: 'focus',
    title: 'Focus Mode',
    tagline: 'Execution at its peak.',
    description: 'High contrast, sharp edges, and zero distractions. Only the essential metrics for the task at hand.',
    color: 'from-[#A3FF00]/20 to-transparent',
    accent: 'text-[#A3FF00]'
  },
  {
    id: 'power',
    title: 'Power Mode',
    tagline: 'Information at scale.',
    description: 'Maximum data density for high-stakes decision making. Complex visualizations rendered with clinical precision.',
    color: 'from-[#A3FF00]/30 to-[#000000]',
    accent: 'text-[#A3FF00]'
  }
];

export const ModeShowcase = () => {
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <section className="py-40 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase">The Mindset Shift</h2>
              <p className="text-white/40 text-xl font-medium">
                Switch modes seamlessly. Watch as the architecture of information transforms to support your cognitive state.
              </p>
            </motion.div>

            <div className="space-y-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`w-full text-left p-8 rounded-[30px] border transition-all duration-700 relative overflow-hidden group ${
                    activeMode.id === mode.id 
                    ? 'bg-white/5 border-[#A3FF00]/30 shadow-[0_0_40px_rgba(163,255,0,0.05)]' 
                    : 'bg-transparent border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <div className={`relative z-10 ${activeMode.id === mode.id ? 'text-white' : 'text-white/60'}`}>
                    <h4 className="text-2xl font-bold tracking-tight mb-2 uppercase">
                      {mode.title}
                    </h4>
                    <p className={`text-sm font-semibold tracking-widest uppercase ${activeMode.id === mode.id ? 'text-[#A3FF00]' : 'text-white/40'}`}>
                      {mode.tagline}
                    </p>
                  </div>
                  {activeMode.id === mode.id && (
                    <motion.div 
                      layoutId="active-mode-bg"
                      className="absolute inset-0 bg-gradient-to-r from-[#A3FF00]/5 to-transparent pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-[1.5] w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.id}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative aspect-[16/10] rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-br ${activeMode.color} p-[1px] shadow-2xl shadow-black`}
              >
                <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-3xl" />
                
                <div className="relative h-full w-full p-10 flex flex-col">
                  {/* Mock UI Preview */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#A3FF00]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#A3FF00]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#A3FF00]/20" />
                    </div>
                    <div className="h-2 w-32 bg-white/5 rounded-full" />
                  </div>

                  <div className="flex-1 grid grid-cols-12 gap-8">
                    {activeMode.id === 'calm' && (
                      <div className="col-span-12 flex flex-col items-center justify-center space-y-8">
                        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: '70%', opacity: 1 }} className="h-10 bg-[#A3FF00]/5 border border-[#A3FF00]/10 rounded-2xl" />
                        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: '50%', opacity: 1 }} transition={{ delay: 0.1 }} className="h-4 bg-white/5 rounded-full" />
                        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: '60%', opacity: 1 }} transition={{ delay: 0.2 }} className="h-4 bg-white/5 rounded-full" />
                      </div>
                    )}

                    {activeMode.id === 'focus' && (
                      <>
                        <div className="col-span-8 space-y-6">
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-40 bg-[#A3FF00]/5 border border-[#A3FF00]/20 rounded-3xl" />
                          <div className="grid grid-cols-2 gap-6">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h-24 bg-white/5 rounded-2xl" />
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="h-24 bg-white/5 rounded-2xl" />
                          </div>
                        </div>
                        <div className="col-span-4 h-full bg-[#A3FF00]/10 border border-[#A3FF00]/20 rounded-3xl flex flex-col p-6 space-y-4">
                           <div className="w-full h-8 bg-[#A3FF00]/20 rounded-xl" />
                           <div className="w-full h-2 bg-white/10 rounded-full" />
                           <div className="w-full h-2 bg-white/10 rounded-full" />
                        </div>
                      </>
                    )}

                    {activeMode.id === 'power' && (
                      <div className="col-span-12 grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <motion.div 
                            key={i} 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            transition={{ delay: i * 0.05 }}
                            className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center" 
                          >
                             <div className="w-1/2 h-1 bg-[#A3FF00]/20 rounded-full" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-12">
                    <p className={`text-2xl font-bold tracking-tight uppercase ${activeMode.accent} mb-3`}>{activeMode.title}</p>
                    <p className="text-white/40 text-base max-w-md font-medium">{activeMode.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
