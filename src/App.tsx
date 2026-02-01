import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreIdea } from './components/CoreIdea';
import { ModeShowcase } from './components/ModeShowcase';
import { Differentiation } from './components/Differentiation';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('landing');

  React.useEffect(() => {
    const handleNavigate = (e: any) => setCurrentPage(e.detail);
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <main className="bg-[#020202] min-h-screen text-white font-sans selection:bg-[#A3FF00]/30 selection:text-black">
            <Navbar />
            
            <Hero />
            
            <CoreIdea />
            
            <ModeShowcase />
            
            <Differentiation />
            
            <Experience />
            
            {/* Final CTA Section - High Energy Neon Refinement */}
            <section className="py-52 px-6 bg-[#020202] relative overflow-hidden text-center">
              {/* Cinematic Background Glows */}
              <motion.div 
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1000px] bg-gradient-to-tr from-[#A3FF00]/10 via-transparent to-transparent blur-[180px] rounded-full pointer-events-none"
              />

              <div className="max-w-5xl mx-auto relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-6xl md:text-8xl font-black text-white mb-12 leading-[0.9] tracking-tighter uppercase"
                >
                  Stop managing. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#A3FF00]">
                    Start thinking.
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white/40 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                    Chameleon is currently in private beta. Join a selected group of visionaries defining the future of human-machine collaboration.
                  </p>
                  
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="group relative px-16 py-7 bg-white text-black font-black tracking-tighter text-xl uppercase rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-[#A3FF00] hover:shadow-[0_0_50px_rgba(163,255,0,0.4)] active:scale-95"
                  >
                    <span className="relative z-10">Enter the Experience</span>
                    <motion.div 
                      className="absolute inset-0 bg-[#A3FF00] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                  
                  <p className="mt-10 text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">Limited Availability — Q1 2026</p>
                </motion.div>
              </div>
            </section>

            <Footer />
          </main>
        </motion.div>
      ) : (
        <Dashboard key="dashboard" onBack={() => setCurrentPage('landing')} />
      )}
    </AnimatePresence>
  );
}
