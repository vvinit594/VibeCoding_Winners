import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Zap, Brain } from 'lucide-react';

const features = [
  {
    icon: <RefreshCcw className="w-5 h-5" />,
    label: "Always Evolving",
    title: "Static is the enemy.",
    desc: "Chameleon continuously learns from your behavioral patterns, predicting the tools you'll need before you reach for them."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Frictionless Flow",
    title: "Zero UI overhead.",
    desc: "We've removed the middleman. No more searching through dashboards. Your intent creates your workspace."
  },
  {
    icon: <Brain className="w-5 h-5" />,
    label: "Cognitive Alignment",
    title: "Thinking-first design.",
    desc: "By aligning with your mental state, Chameleon reduces cognitive load and allows for deeper work cycles."
  }
];

export const Differentiation = () => {
  return (
    <section className="py-40 px-6 bg-[#020202] relative overflow-hidden">
      {/* Background Accent - Refined Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-[#A3FF00]/[0.02] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#A3FF00] font-bold tracking-[0.4em] uppercase text-[10px]"
          >
            The New Standard
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white mt-6 tracking-tighter uppercase"
          >
            Built for the <br />
            <span className="text-[#A3FF00]">Intelligence age.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group space-y-8"
            >
              <div className="flex items-center gap-4 text-white/30">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-[#A3FF00]/30 group-hover:text-[#A3FF00] transition-all duration-500">
                  {f.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{f.label}</span>
              </div>
              <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">{f.title}</h3>
              <p className="text-white/40 leading-relaxed text-lg font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
