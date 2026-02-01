import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Experience = () => {
  return (
    <section className="py-40 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1760143769807-c282feb89d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwYWJzdHJhY3QlMjB0ZWNoJTIwZGFyayUyMGJsdWUlMjB2aW9sZXR8ZW58MXx8fHwxNzY5NTk0MzUwfDA"
                alt="Motion and experience visualization"
                className="w-full aspect-[4/5] object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
            </motion.div>
            
            {/* Overlay UI Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-10 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-[#A3FF00]/20 rounded-[40px] shadow-3xl"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A3FF00] to-[#000000] border border-[#A3FF00]/40 flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-black animate-ping" />
                </div>
                <div>
                  <div className="h-4 w-32 bg-white/20 rounded-full mb-3" />
                  <div className="h-2 w-20 bg-[#A3FF00]/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#A3FF00] font-bold tracking-[0.4em] uppercase text-[10px]">The Feeling of Flow</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-10 leading-[1.1] tracking-tighter uppercase">
                Motion as <br /> <span className="text-white/30">Language.</span>
              </h2>
              <p className="text-white/40 text-xl leading-relaxed mb-10 font-medium">
                Chameleon moves with organic grace. Transitions are fluid, responding to your pace and focus. 
                Every pixel is animated with intention, communicating change without breaking your state of mind.
              </p>
              <div className="space-y-6">
                {[
                  "Fluid Component Morphing",
                  "Context-Aware Transitions",
                  "Low-Latency Neural Feedback"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-4 h-4 rounded-full border border-[#A3FF00]/30 flex items-center justify-center transition-transform group-hover:scale-125">
                      <div className="w-1 h-1 rounded-full bg-[#A3FF00]" />
                    </div>
                    <span className="text-white/60 text-lg font-semibold tracking-tight uppercase group-hover:text-white transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
