import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Layout } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-6 h-6 text-[#A3FF00]" />,
    title: "Declare Intent",
    description: "Describe what you need to achieve in simple, natural language. No menus, no hunting."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#A3FF00]" />,
    title: "AI Interpretation",
    description: "Chameleon's engine analyzes your workload, priority, and emotional context instantly."
  },
  {
    icon: <Layout className="w-6 h-6 text-[#A3FF00]" />,
    title: "Dynamic Reshaping",
    description: "The entire interface morphs, bringing relevant data forward and hiding the noise."
  }
];

export const CoreIdea = () => {
  return (
    <section className="py-40 px-6 bg-[#020202] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase"
          >
            A Living Architecture
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl max-w-2xl mx-auto font-medium"
          >
            Static dashboards are a relic of the past. Chameleon lives in the present, 
            continuously evolving to match your cognitive load.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-10 rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-[#A3FF00]/20 hover:bg-[#A3FF00]/[0.02] transition-all duration-500 group"
            >
              <div className="mb-8 inline-block p-5 rounded-3xl bg-white/[0.02] border border-white/5 group-hover:border-[#A3FF00]/40 group-hover:shadow-[0_0_20px_rgba(163,255,0,0.1)] transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-5 tracking-tight">{step.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">{step.description}</p>
              
              {/* Subtle green accent at bottom */}
              <div className="absolute bottom-8 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#A3FF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
