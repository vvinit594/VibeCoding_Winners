import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal,
  Maximize2,
  Settings,
  Heart,
  Sun,
  Moon,
  Zap,
  Activity,
  Shield,
  RefreshCw,
  X,
  ArrowLeft
} from 'lucide-react';

// --- MOCK AI ENGINE ---
const getAIResponse = (input: string) => {
  const query = input.toLowerCase();
  
  if (query.match(/beast mode|show all data|data trends|q3 analysis|advanced view|power mode/)) {
    return {
      mood: "power",
      primaryPalette: "neon-green",
      emojiSet: [],
      animationIntensity: "none",
      ui_mode: "POWER",
      density: "high",
      contrast: "very_high",
      motion: "snappy"
    };
  }
  
  if (query.match(/happy|joy|excited|positive|wonderful|great/)) {
    return {
      mood: "happy",
      primaryPalette: "yellow",
      emojiSet: ["🥰", "😇", "😊", "💖", "✨", "☀️"],
      animationIntensity: "medium"
    };
  }
  
  if (query.match(/sad|down|low|tired|unhappy|blue/)) {
    return {
      mood: "sad",
      primaryPalette: "lavender",
      emojiSet: ["☹️", "😔", "💔", "🥺", "💧"],
      animationIntensity: "low"
    };
  }
  
  if (query.match(/angry|mad|frustrated|annoyed|furious/)) {
    return {
      mood: "angry",
      primaryPalette: "red",
      emojiSet: ["😡", "🔥", "😤", "🤬", "💢"],
      animationIntensity: "high"
    };
  }

  return {
    mood: "intelligent",
    primaryPalette: "neon-green",
    emojiSet: [],
    animationIntensity: "none"
  };
};

// --- THEME MAPPING ---
const getThemeFromAI = (aiResponse: any, mode: 'dark' | 'light') => {
  const palette = aiResponse.primaryPalette;
  const isDark = mode === 'dark';
  const isPower = aiResponse.mood === 'power';
  
  const baseColors = {
    yellow: { dark: '#FDE047', light: '#CA8A04' },
    lavender: { dark: '#A78BFA', light: '#8B5CF6' },
    red: { dark: '#EF4444', light: '#DC2626' },
    'neon-green': { dark: '#A3FF00', light: '#65A30D' }
  }[palette as keyof typeof baseColors] || { dark: '#A3FF00', light: '#65A30D' };

  const primaryColor = isDark ? baseColors.dark : baseColors.light;

  if (isPower) {
    return {
      primaryColor: '#A3FF00',
      bgTint: 'rgba(163, 255, 0, 0.02)',
      pageBg: '#050505',
      accentStyle: 'solid',
      borderRadius: '4px',
      fontStyle: 'font-mono tracking-tight',
      contrast: 'very-high',
      isPower: true
    };
  }

  switch (palette) {
    case 'yellow':
      return {
        primaryColor,
        bgTint: isDark ? 'rgba(253, 224, 71, 0.1)' : 'rgba(254, 249, 195, 0.6)', 
        pageBg: isDark ? '#0A0900' : '#FEFCE8', 
        accentStyle: isDark ? 'glow' : 'shadow',
        borderRadius: '32px',
        fontStyle: 'tracking-tight uppercase font-black',
        contrast: isDark ? 'medium' : 'high',
        isPower: false
      };
    case 'lavender':
      return {
        primaryColor,
        bgTint: isDark ? 'rgba(167, 139, 250, 0.03)' : 'rgba(245, 243, 255, 0.5)',
        pageBg: isDark ? '#020005' : '#F5F3FF',
        accentStyle: 'soft',
        borderRadius: '48px',
        fontStyle: 'tracking-normal font-medium',
        contrast: 'low',
        isPower: false
      };
    case 'red':
      return {
        primaryColor,
        bgTint: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(254, 242, 242, 0.4)',
        pageBg: isDark ? '#050000' : '#FEF2F2',
        accentStyle: isDark ? 'neon' : 'outline',
        borderRadius: '8px',
        fontStyle: 'tracking-tighter uppercase font-black',
        contrast: 'high',
        isPower: false
      };
    default:
      return {
        primaryColor,
        bgTint: isDark ? 'rgba(163, 255, 0, 0.05)' : 'rgba(249, 250, 251, 0.5)',
        pageBg: isDark ? '#020202' : '#F9FAFB',
        accentStyle: isDark ? 'glow' : 'shadow',
        borderRadius: '24px',
        fontStyle: 'tracking-tighter uppercase font-black',
        contrast: 'high',
        isPower: false
      };
  }
};

// --- SAD MODE COMPONENTS ---

const PlaylistCard = ({ title, img, theme }: { title: string, img: string, theme: any }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="p-4 border border-white/5 bg-white/[0.02] backdrop-blur-md cursor-pointer transition-colors hover:bg-white/[0.04]"
    style={{ borderRadius: '24px', borderColor: `${theme.primaryColor}10` }}
  >
    <div className="aspect-square mb-4 overflow-hidden rounded-2xl relative">
      <img src={img} alt={title} className="w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <h5 className="text-[11px] font-black uppercase tracking-widest text-white/60 mb-1">{title}</h5>
    <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30" style={{ color: theme.primaryColor }}>Curated Comfort</p>
  </motion.div>
);

const NowPlaying = ({ theme }: { theme: any }) => (
  <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl" style={{ borderRadius: '32px', borderColor: `${theme.primaryColor}10` }}>
    <div className="flex items-center gap-6 mb-8">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: theme.primaryColor, boxShadow: `0 0 20px ${theme.primaryColor}30` }}
        />
      </div>
      <div className="flex-1">
        <h4 className="text-white text-lg font-black tracking-tighter uppercase mb-1">Ethereal Drift</h4>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ color: theme.primaryColor }}>Subconscious Echoes</p>
      </div>
      <Heart size={18} className="text-white/20 hover:text-red-400 cursor-pointer transition-colors" />
    </div>
    <div className="space-y-2">
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '64%' }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="h-full"
          style={{ backgroundColor: theme.primaryColor }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-mono opacity-20 text-white">
        <span>02:14</span>
        <span>04:45</span>
      </div>
    </div>
  </div>
);

const SadModeLayout = ({ theme }: { theme: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-12 gap-8"
  >
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
      <NowPlaying theme={theme} />
      <div className="p-8 border border-white/5 bg-white/[0.02] rounded-[32px] flex flex-col gap-4" style={{ borderColor: `${theme.primaryColor}10` }}>
         <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.primaryColor }}>Calm Meter</span>
         <div className="flex items-center gap-4">
           <div className="flex-1 h-12 bg-white/5 rounded-2xl border border-white/5 overflow-hidden relative">
             <motion.div 
               animate={{ x: ['-100%', '0%', '-100%'] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
             />
             <div className="absolute inset-y-0 left-0 w-3/4" style={{ backgroundColor: `${theme.primaryColor}10` }} />
           </div>
           <span className="text-xl font-black" style={{ color: theme.primaryColor }}>SOFT</span>
         </div>
      </div>
    </div>
    
    <div className="col-span-12 lg:col-span-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {['Soft Comfort', 'Healing Vibes', 'Rainy Night', 'Alone Time'].map((t, i) => (
          <PlaylistCard 
            key={t} 
            title={t} 
            theme={theme}
            img={`https://images.unsplash.com/photo-1555048428-44cf321ba886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&i=${i}`} 
          />
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="p-8 border border-white/5 bg-white/[0.02] rounded-[32px] flex flex-col gap-4" style={{ borderColor: `${theme.primaryColor}10` }}>
           <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.primaryColor }}>Genre Tiles</span>
           <div className="grid grid-cols-2 gap-3">
             {['Lo-fi', 'Ambient', 'Acoustic', 'Piano'].map(g => (
               <div key={g} className="p-4 border border-white/5 rounded-2xl text-[10px] font-black text-center text-white/40 hover:text-white transition-colors cursor-pointer bg-white/5">
                 {g}
               </div>
             ))}
           </div>
        </div>
        <div className="p-8 border border-white/5 bg-white/[0.03] rounded-[32px] flex flex-col justify-center text-center italic" style={{ borderColor: `${theme.primaryColor}20` }}>
           <p className="text-white/60 text-sm mb-4 leading-relaxed">"Sometimes you need to let the rain wash away the noise."</p>
           <span className="text-[9px] font-black uppercase tracking-widest opacity-20" style={{ color: theme.primaryColor }}>Track: Whisper in the Dark</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- ANGRY MODE COMPONENTS ---

const PunchPanel = ({ theme }: { theme: any }) => {
  const [isShaking, setIsShaking] = useState(false);
  const triggerPunch = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };
  
  return (
    <motion.div 
      animate={isShaking ? { x: [-10, 10, -10, 0] } : {}}
      transition={{ duration: 0.1 }}
      onClick={triggerPunch}
      className="h-full border-2 border-white/10 bg-black cursor-pointer flex flex-col items-center justify-center group active:border-red-500 transition-colors"
      style={{ borderRadius: '8px', borderColor: `${theme.primaryColor}20` }}
    >
      <div className="text-white/10 group-hover:text-white/20 transition-colors uppercase font-black text-4xl tracking-tighter mb-4 select-none">RELEASE IMPACT</div>
      <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-75 group-active:scale-90" style={{ borderColor: theme.primaryColor }}>
         <Zap size={32} style={{ color: theme.primaryColor }} />
      </div>
      <p className="mt-6 text-[10px] font-black uppercase tracking-widest opacity-20" style={{ color: theme.primaryColor }}>Tap to vent intensity</p>
    </motion.div>
  );
};

const RageMeter = ({ theme }: { theme: any }) => (
  <div className="p-6 border border-white/10 bg-black flex flex-col gap-4" style={{ borderRadius: '4px', borderColor: `${theme.primaryColor}15` }}>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-white">SYSTEM INTENSITY</span>
      <span className="font-mono text-red-500 font-bold">CRITICAL</span>
    </div>
    <div className="flex h-40 gap-2 items-end">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div 
          key={i}
          animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="flex-1"
          style={{ backgroundColor: i > 8 ? '#ef4444' : theme.primaryColor }}
        />
      ))}
    </div>
  </div>
);

const AngryModeLayout = ({ theme }: { theme: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="grid grid-cols-12 gap-6"
  >
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
      <RageMeter theme={theme} />
      <div className="p-6 border border-white/10 bg-black flex flex-col gap-4" style={{ borderRadius: '4px', borderColor: `${theme.primaryColor}15` }}>
         <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.primaryColor }}>Control Rhythm</span>
         <div className="flex items-center justify-center p-8 border border-white/5 bg-white/[0.02]">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full border-2 border-red-500/50 flex items-center justify-center"
            >
              <span className="text-[10px] font-black uppercase text-red-500">Breathe</span>
            </motion.div>
         </div>
      </div>
    </div>
    
    <div className="col-span-12 lg:col-span-5">
      <PunchPanel theme={theme} />
    </div>

    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
       <div className="p-6 border border-white/10 bg-black flex flex-col gap-3" style={{ borderRadius: '4px', borderColor: `${theme.primaryColor}15` }}>
         {['RELEASE', 'STABILIZE', 'RESET'].map(btn => (
           <motion.button
             key={btn}
             whileHover={{ backgroundColor: theme.primaryColor, color: '#000' }}
             className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-colors"
           >
             {btn}
           </motion.button>
         ))}
       </div>
       <div className="p-6 border border-white/10 bg-red-950/20 flex flex-col gap-3" style={{ borderRadius: '4px', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div className="flex items-center gap-2 text-red-500">
            <Shield size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Intensity Alert</span>
          </div>
          <p className="text-[9px] font-bold text-red-500/60 leading-relaxed uppercase">Neural spikes detected in sector 4-G. Immediate stabilizing actions recommended.</p>
       </div>
       <div className="flex-1 p-6 border border-white/10 bg-black" style={{ borderRadius: '4px', borderColor: `${theme.primaryColor}15` }}>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 block" style={{ color: theme.primaryColor }}>Pulse Log</span>
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex justify-between font-mono text-[9px] text-white/20">
                <span>SEG_{i * 2}</span>
                <span className="text-red-500/40">[{Math.random().toFixed(2)}] SPIKE</span>
              </div>
            ))}
          </div>
       </div>
    </div>
  </motion.div>
);

// --- HAPPY MODE COMPONENTS ---

const JoyMeter = ({ theme }: { theme: any }) => (
  <div className="flex flex-col items-center justify-center p-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden" style={{ borderRadius: '100%', borderColor: `${theme.primaryColor}20`, aspectRatio: '1/1' }}>
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-2 border-2 border-dashed rounded-full"
      style={{ borderColor: `${theme.primaryColor}10` }}
    />
    <div className="relative z-10 text-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl mb-2"
      >
        ✨
      </motion.div>
      <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-1" style={{ color: theme.primaryColor }}>Joy Level</div>
      <div className="text-4xl font-black tracking-tighter" style={{ color: theme.primaryColor }}>98%</div>
    </div>
    <svg className="absolute inset-0 w-full h-full -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r="48%"
        fill="none"
        stroke={`${theme.primaryColor}05`}
        strokeWidth="4"
      />
      <motion.circle
        cx="50%"
        cy="50%"
        r="48%"
        fill="none"
        stroke={theme.primaryColor}
        strokeWidth="4"
        strokeDasharray="100 100"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 2 }}
        transition={{ duration: 2, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const EmojiClicker = ({ theme }: { theme: any }) => {
  const emojis = ["🍦", "🎈", "🍭", "🧸", "🎨", "🪁", "🌈", "🍕"];
  return (
    <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl" style={{ borderRadius: theme.borderRadius, borderColor: `${theme.primaryColor}20` }}>
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-40 text-center" style={{ color: theme.primaryColor }}>Interactive Playground</h4>
      <div className="grid grid-cols-4 gap-4">
        {emojis.map((e, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.8 }}
            className="aspect-square text-3xl flex items-center justify-center bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            {e}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ReactionTiles = ({ theme }: { theme: any }) => (
  <div className="grid grid-cols-2 gap-4">
    {['BOOST', 'SPARKLE', 'GLOW', 'FLOAT'].map((label, i) => (
      <motion.div
        key={label}
        whileHover={{ y: -5, backgroundColor: `${theme.primaryColor}10` }}
        className="p-6 border border-white/5 bg-white/[0.02] flex flex-col items-center gap-3 transition-colors cursor-pointer"
        style={{ borderRadius: '24px', borderColor: `${theme.primaryColor}15` }}
      >
        <div className="text-2xl">{["🚀", "💎", "🔮", "☁️"][i]}</div>
        <span className="text-[9px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.primaryColor }}>{label}</span>
      </motion.div>
    ))}
  </div>
);

const RewardBadges = ({ theme }: { theme: any }) => (
  <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col gap-6" style={{ borderRadius: theme.borderRadius, borderColor: `${theme.primaryColor}20` }}>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40" style={{ color: theme.primaryColor }}>Unlocked Essence</span>
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-xs">
            {["🥇", "🏆", "🎖️"][i-1]}
          </div>
        ))}
      </div>
    </div>
    <div className="flex gap-4">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex-1 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
        style={{ backgroundColor: theme.primaryColor, color: '#000' }}
      >
        Celebrate
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
        className="flex-1 py-4 rounded-full font-black text-[10px] uppercase tracking-widest border border-white/10 text-white"
      >
        Play
      </motion.button>
    </div>
  </div>
);

const HappyModeLayout = ({ theme }: { theme: any }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-12 gap-8"
  >
    <div className="col-span-12 lg:col-span-4">
      <JoyMeter theme={theme} />
    </div>
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
      <EmojiClicker theme={theme} />
      <div className="p-6 border border-white/5 bg-white/[0.02] rounded-[32px] flex items-center justify-between" style={{ borderColor: `${theme.primaryColor}10` }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primaryColor }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Vibe Check: Optimal</span>
        </div>
        <div className="text-xl">😎</div>
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
      <ReactionTiles theme={theme} />
      <RewardBadges theme={theme} />
    </div>
  </motion.div>
);

// --- POWER MODE COMPONENTS ---

const PowerTable = ({ theme }: { theme: any }) => (
  <div className="overflow-hidden border border-white/10 rounded" style={{ borderColor: `${theme.primaryColor}20` }}>
    <table className="w-full text-left font-mono text-[10px] border-collapse">
      <thead>
        <tr className="bg-white/5 border-b border-white/10" style={{ borderColor: `${theme.primaryColor}20` }}>
          {['TICKER', 'VOL', 'DELTA', 'STAT', 'REF', 'LOAD'].map((h) => (
            <th key={h} className="p-2 font-black uppercase tracking-tighter" style={{ color: theme.primaryColor }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 12 }).map((_, i) => (
          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <td className="p-2 text-white">CHMLN-{1024 + i}</td>
            <td className="p-2 text-white/60">{(Math.random() * 1000).toFixed(0)}k</td>
            <td className="p-2" style={{ color: Math.random() > 0.5 ? theme.primaryColor : '#ef4444' }}>
              {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 4).toFixed(2)}%
            </td>
            <td className="p-2 text-white/40">SYNCED</td>
            <td className="p-2 text-white/40">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</td>
            <td className="p-2">
              <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white/40" style={{ width: `${Math.random() * 100}%`, backgroundColor: theme.primaryColor }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PowerChart = ({ title, theme }: { title: string, theme: any }) => (
  <div className="p-4 border border-white/10 rounded bg-white/[0.01]" style={{ borderColor: `${theme.primaryColor}20` }}>
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">{title}</h4>
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </div>
    <div className="h-24 flex items-end gap-1 px-1">
      {Array.from({ length: 24 }).map((_, i) => (
        <div 
          key={i} 
          className="flex-1 rounded-t-sm transition-all"
          style={{ 
            height: `${20 + Math.random() * 80}%`, 
            backgroundColor: i % 4 === 0 ? theme.primaryColor : 'rgba(255,255,255,0.05)' 
          }}
        />
      ))}
    </div>
  </div>
);

const PowerModeLayout = ({ theme, aiResponse }: { theme: any, aiResponse: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.99 }}
    animate={{ opacity: 1, scale: 1 }}
    className="grid grid-cols-12 gap-4"
  >
    {/* Sidebar Controls */}
    <div className="col-span-12 lg:col-span-3 space-y-4">
      <div className="p-4 border border-white/10 rounded bg-white/[0.01]" style={{ borderColor: `${theme.primaryColor}20` }}>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">SYSTEM PARAMETERS</h4>
        <div className="space-y-3">
          {['Neural Gain', 'Data Density', 'Refresh Rate', 'Logic Latency'].map((p) => (
            <div key={p}>
              <div className="flex justify-between text-[9px] uppercase font-bold text-white/20 mb-1">
                <span>{p}</span>
                <span style={{ color: theme.primaryColor }}>88.4%</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: '88.4%', backgroundColor: theme.primaryColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <PowerChart title="VOLUMETRIC DELTA" theme={theme} />
      <PowerChart title="YOY PERFORMANCE" theme={theme} />
      
      <div className="p-4 border border-white/10 rounded bg-white/[0.01]" style={{ borderColor: `${theme.primaryColor}20` }}>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">ACTIVE NODE FILTER</h4>
        <div className="grid grid-cols-2 gap-2">
          {['ALPHA', 'BETA', 'SIGMA', 'DELTA', 'EPSILON', 'ZETA'].map(tag => (
            <div key={tag} className="p-2 border border-white/5 rounded text-[8px] font-black text-center text-white/20 hover:text-white transition-colors cursor-pointer">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main Data Table Area */}
    <div className="col-span-12 lg:col-span-6 space-y-4">
      <div className="flex items-center justify-between p-2 border border-white/10 rounded bg-white/[0.02]" style={{ borderColor: `${theme.primaryColor}30` }}>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Activity size={12} style={{ color: theme.primaryColor }} />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">LIVE_FEED_01</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-white/20" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">PROCESSOR_SYNC</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-white/20">Uptime: 48:12:04</span>
          <RefreshCw size={10} className="text-white/20" />
        </div>
      </div>
      <PowerTable theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <PowerChart title="CLUSTER HEATMAP" theme={theme} />
        <PowerChart title="NETWORK TOPOLOGY" theme={theme} />
      </div>
    </div>

    {/* Terminal / Output Area */}
    <div className="col-span-12 lg:col-span-3 space-y-4">
       <div className="p-4 border border-white/10 rounded bg-black h-full flex flex-col" style={{ borderColor: `${theme.primaryColor}20` }}>
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
            <Terminal size={14} style={{ color: theme.primaryColor }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">NEURAL_CONSOLE</span>
          </div>
          <div className="flex-1 font-mono text-[9px] text-white/40 overflow-hidden leading-relaxed">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-1">
                <span style={{ color: theme.primaryColor }}>[SYS_{i}]</span> INITIALIZING_STREAM_{Math.random().toString(36).slice(7)}... OK
              </div>
            ))}
            <div className="mt-4 animate-pulse" style={{ color: theme.primaryColor }}>_ WAITING_FOR_INPUT...</div>
          </div>
          <div className="mt-4 p-3 bg-white/5 rounded border border-white/5">
             <div className="text-[8px] font-black uppercase text-white/20 mb-1">MODE_STATUS</div>
             <div className="text-xs font-black uppercase text-white tracking-tighter" style={{ color: theme.primaryColor }}>BEAST_MODE_ACTIVE</div>
          </div>
       </div>
    </div>
  </motion.div>
);

// --- EMOTIONAL SYNC LOADER ---
const MoodLoader = ({ theme, isVisible, aiResponse }: { theme: any; isVisible: boolean; aiResponse: any }) => {
  const symbols = useMemo(() => {
    switch (aiResponse.mood) {
      case 'happy': return ["😄", "✨", "🌟"];
      case 'sad': return ["😔", "💧", "🌙"];
      case 'angry': return ["😡", "🔥", "⚠️"];
      default: return ["🧠", "⚡", "🌐"];
    }
  }, [aiResponse.mood]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-row gap-12 items-center justify-center">
            {symbols.map((symbol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 360 
                }}
                transition={{ 
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.1 } 
                }}
                className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                style={{ 
                  textShadow: `0 0 20px ${theme.primaryColor}40`
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MOOD BACKGROUND ANIMATION ---
const MoodBackground = ({ aiResponse, mode }: { aiResponse: any; mode: 'dark' | 'light' }) => {
  const [emojis, setEmojis] = useState<any[]>([]);

  useEffect(() => {
    if (aiResponse.emojiSet.length === 0 || aiResponse.mood === 'power') {
      setEmojis([]);
      return;
    }

    const count = aiResponse.animationIntensity === 'high' ? 12 : aiResponse.animationIntensity === 'medium' ? 8 : 5;
    
    const newEmojis = Array.from({ length: count }).map((_, i) => ({
      id: Math.random() + i,
      char: aiResponse.emojiSet[Math.floor(Math.random() * aiResponse.emojiSet.length)],
      x: Math.random() * 100, 
      drift: (Math.random() - 0.5) * 4, 
      delay: Math.random() * 10,
      duration: aiResponse.mood === 'sad' ? 25 + Math.random() * 10 : aiResponse.mood === 'angry' ? 10 + Math.random() * 5 : 18 + Math.random() * 7,
      scale: 0.6 + Math.random() * 0.4,
      blur: 1 + Math.random() * 2,
      baseOpacity: mode === 'dark' ? 0.08 + Math.random() * 0.12 : 0.04 + Math.random() * 0.08
    }));
    
    setEmojis(newEmojis);
  }, [aiResponse, mode]);

  if (aiResponse.mood === 'power') return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            initial={{ y: '110vh', opacity: 0, x: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, emoji.baseOpacity, emoji.baseOpacity, 0],
              x: `${emoji.drift}vw` 
            }}
            transition={{ 
              duration: emoji.duration, 
              delay: emoji.delay, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute select-none will-change-transform"
            style={{ 
              left: `${emoji.x}%`,
              fontSize: `${emoji.scale * 1.5}rem`,
              filter: `blur(${emoji.blur}px)`
            }}
          >
            {emoji.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- EMOJI TILE COMPONENT ---
const EmojiTile = ({ emoji, theme, mode }: any) => (
  <motion.div 
    layout
    className={`aspect-video flex items-center justify-center border transition-all duration-700 relative overflow-hidden group`}
    style={{ 
      borderColor: mode === 'dark' ? `${theme.primaryColor}20` : `${theme.primaryColor}30`,
      borderRadius: theme.borderRadius,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
      boxShadow: mode === 'light' ? `0 10px 30px rgba(0,0,0,0.04), inset 0 0 0 1px ${theme.primaryColor}10` : 'none'
    }}
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={emoji}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-6xl select-none"
      >
        {emoji}
      </motion.span>
    </AnimatePresence>
    {theme.accentStyle === 'glow' && mode === 'dark' && (
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] blur-md" 
        style={{ backgroundColor: theme.primaryColor }}
      />
    )}
  </motion.div>
);

const MainPanel = ({ theme, mode }: any) => (
  <motion.div 
    layout
    className={`col-span-12 lg:col-span-8 p-10 border transition-all duration-700 relative overflow-hidden backdrop-blur-xl`}
    style={{ 
      borderColor: mode === 'dark' ? `${theme.primaryColor}15` : `${theme.primaryColor}20`,
      borderRadius: theme.borderRadius,
      backgroundColor: mode === 'dark' ? 'rgba(5,5,5,0.6)' : 'rgba(255,255,255,0.7)',
      boxShadow: mode === 'light' ? '0 20px 50px rgba(0,0,0,0.05)' : 'none'
    }}
  >
    <div className="flex items-center justify-between mb-10">
      <div>
        <h3 className={`font-black text-2xl tracking-tighter mb-1 uppercase transition-colors duration-700 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>Emotional Intelligence</h3>
        <p className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-700 ${mode === 'dark' ? 'text-white/20' : 'text-black/30'}`}>Subconscious Processing Grid</p>
      </div>
      <div className="flex gap-3">
        <div className="w-3 h-3 rounded-full animate-pulse transition-all duration-700" style={{ backgroundColor: theme.primaryColor, boxShadow: mode === 'dark' ? `0 0 20px ${theme.primaryColor}` : `0 0 10px ${theme.primaryColor}60` }} />
        <div className={`w-3 h-3 rounded-full transition-colors duration-700 ${mode === 'dark' ? 'bg-white/5' : 'bg-black/10'}`} />
      </div>
    </div>
    
    <div className="h-72 flex items-end gap-3 px-2">
      {[40, 70, 45, 90, 65, 30, 85, 50, 95, 60, 40, 75, 55, 80, 45, 90].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 1.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-full"
          style={{ 
            backgroundColor: mode === 'dark' ? `${theme.primaryColor}${theme.contrast === 'high' ? '40' : '15'}` : `${theme.primaryColor}${theme.contrast === 'high' ? '30' : '15'}`,
            borderTop: `2px solid ${theme.primaryColor}`
          }}
        />
      ))}
    </div>
    
    <div className={`mt-10 grid grid-cols-4 gap-8 pt-10 border-t transition-colors duration-700 ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
      {['Stability', 'Clarity', 'Focus', 'Energy'].map((label, i) => (
        <div key={i}>
          <div className={`text-[10px] uppercase font-black tracking-[0.3em] mb-2 transition-colors duration-700 ${mode === 'dark' ? 'text-white/20' : 'text-black/30'}`}>{label}</div>
          <div className={`text-lg font-black tracking-tighter uppercase transition-colors duration-700 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
            {94 + i}%
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ConsolePanel = ({ theme, lastJson, mode }: any) => (
  <motion.div 
    layout
    className={`col-span-12 lg:col-span-4 p-10 border transition-all duration-700 backdrop-blur-xl flex flex-col`}
    style={{ 
      borderColor: mode === 'dark' ? `${theme.primaryColor}15` : `${theme.primaryColor}20`,
      borderRadius: theme.borderRadius,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)',
      boxShadow: mode === 'light' ? '0 20px 50px rgba(0,0,0,0.04)' : 'none'
    }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-2xl border transition-colors duration-700 ${mode === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'}`}>
        <Terminal size={20} style={{ color: theme.primaryColor }} />
      </div>
      <span className={`text-xs font-black tracking-[0.3em] uppercase transition-colors duration-700 ${mode === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Raw Neural Output</span>
    </div>
    
    <div className={`flex-1 font-mono text-[11px] overflow-hidden p-6 rounded-3xl border transition-all duration-700 leading-relaxed ${mode === 'dark' ? 'bg-black/40 text-white/60 border-white/5' : 'bg-white text-black/60 border-black/5'}`}>
      <AnimatePresence mode="wait">
        <motion.pre 
          key={JSON.stringify(lastJson)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="whitespace-pre-wrap break-all"
        >
          {JSON.stringify(lastJson, null, 2)}
        </motion.pre>
      </AnimatePresence>
    </div>

    <div className={`mt-10 p-6 rounded-3xl border transition-colors duration-700 flex items-center justify-between ${mode === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
      <div className="flex items-center gap-3">
        <Heart size={14} style={{ color: theme.primaryColor }} />
        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-700 ${mode === 'dark' ? 'text-white/40' : 'text-black/40'}`}>System Mood</span>
      </div>
      <span className="text-xs font-black uppercase tracking-tighter transition-colors duration-700" style={{ color: theme.primaryColor }}>
        {lastJson.mood}
      </span>
    </div>
  </motion.div>
);

// --- MAIN DASHBOARD ---

export const Dashboard = ({ onBack }: { onBack: () => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [aiResponse, setAiResponse] = useState(getAIResponse('neon green'));
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [displayMode, setDisplayMode] = useState<'dark' | 'light'>('dark');

  const theme = useMemo(() => getThemeFromAI(aiResponse, displayMode), [aiResponse, displayMode]);

  const emojiTiles = useMemo(() => {
    switch (aiResponse.mood) {
      case 'happy': return ["😄", "😊", "🌟", "✨"];
      case 'sad': return ["😔", "😞", "🌧️", "💧"];
      case 'angry': return ["😡", "🔥", "⚠️", "💥"];
      default: return ["🧠", "⚙️", "🌐", "⚡"];
    }
  }, [aiResponse.mood]);

  const handleIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsProcessing(true);
    
    // Determine if it's a mood change
    const nextResponse = getAIResponse(inputValue);
    const isMoodChange = nextResponse.mood !== aiResponse.mood;

    if (isMoodChange) {
      setTimeout(() => {
        setIsRecalibrating(true);
        setTimeout(() => {
          setAiResponse(nextResponse);
          setIsProcessing(false);
          setIsRecalibrating(false);
          setInputValue('');
        }, 1200); // Loader Duration
      }, 300); // Initial Thinking Delay
    } else {
      setTimeout(() => {
        setAiResponse(nextResponse);
        setIsProcessing(false);
        setInputValue('');
      }, 800);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`min-h-screen transition-all duration-1000 p-6 lg:p-12 font-sans overflow-x-hidden relative`}
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* Recalibration Loader Overlay */}
      <MoodLoader theme={theme} isVisible={isRecalibrating} aiResponse={aiResponse} />

      <MoodBackground aiResponse={aiResponse} mode={displayMode} />

      {/* Main Content Area with Dimming Effect */}
      <motion.div 
        animate={{ 
          filter: isRecalibrating ? 'blur(8px)' : 'blur(0px)',
          opacity: isRecalibrating ? 0.3 : 1,
          scale: isRecalibrating ? 0.98 : 1,
          background: `radial-gradient(circle at 50% 50%, ${theme.primaryColor}${displayMode === 'dark' ? '10' : '15'}, transparent)` 
        }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={onBack}>
            <motion.div 
              animate={{ 
                backgroundColor: theme.primaryColor,
                boxShadow: theme.accentStyle === 'glow' && displayMode === 'dark' ? `0 0 30px ${theme.primaryColor}50` : `0 0 15px ${theme.primaryColor}40`
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700"
            >
              <div className="w-3 h-3 rounded-full bg-black" />
            </motion.div>
            <div>
              <h2 className={`text-2xl font-black uppercase tracking-tighter leading-none mb-1 transition-colors duration-700 ${displayMode === 'dark' ? 'text-white' : 'text-black'}`}>Chameleon</h2>
              <span className={`text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 transition-colors duration-700 ${displayMode === 'dark' ? 'text-white' : 'text-black'}`}>Emotion Core v2.4</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className={`hidden md:flex items-center gap-6 px-8 py-3 border rounded-full transition-all duration-700 ${displayMode === 'dark' ? 'bg-white/[0.03] border-white/5 backdrop-blur-md' : 'bg-white border-black/5 backdrop-blur-md shadow-sm'}`}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-700 ${displayMode === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Secure Bio-Link Active</span>
            </div>
            
            <button 
              onClick={() => setDisplayMode(prev => prev === 'dark' ? 'light' : 'dark')}
              className={`p-4 rounded-2xl transition-all hover:scale-110 active:scale-90 border transition-all duration-700 ${displayMode === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-white border-black/10 text-black hover:bg-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'}`}
            >
               {displayMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex gap-2">
              <button 
                onClick={onBack} 
                className={`px-6 py-4 rounded-2xl transition-all border flex items-center gap-3 group transition-all duration-700 ${displayMode === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20' : 'bg-white border-black/10 text-black hover:bg-black/5 hover:border-black/20'}`}
              >
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Exit System</span>
                 <ArrowLeft size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className={`p-4 rounded-2xl transition-all opacity-40 hover:opacity-100 hover:scale-110 active:scale-90 ${displayMode === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                 <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto mb-20 relative">
          <motion.form 
            onSubmit={handleIntent}
            className="relative z-20"
            animate={{ 
              boxShadow: isProcessing 
                ? `0 0 60px ${theme.primaryColor}40` 
                : displayMode === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.05)' 
            }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="absolute inset-y-0 left-8 flex items-center pointer-events-none transition-colors duration-700"
              style={{ color: theme.primaryColor }}
            >
              <Search size={22} />
            </div>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your current mood or state of mind..."
              className={`w-full backdrop-blur-3xl border rounded-full py-8 pl-20 pr-40 transition-all text-xl font-medium ${displayMode === 'dark' ? 'bg-[#080808]/90 border-white/10 text-white placeholder:text-white/20' : 'bg-white/90 border-black/10 text-black placeholder:text-black/30 shadow-sm'}`}
              style={{ 
                borderColor: isProcessing ? `${theme.primaryColor}60` : (displayMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') 
              }}
            />
            <div className="absolute inset-y-3 right-3 flex items-center">
              <button 
                type="submit"
                disabled={isProcessing}
                className="h-full px-10 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                style={{ 
                  backgroundColor: theme.primaryColor,
                  color: displayMode === 'dark' ? '#000' : '#fff',
                  boxShadow: `0 10px 20px ${theme.primaryColor}30`
                }}
              >
                {isProcessing ? 'Processing...' : 'Sync Mind'}
              </button>
            </div>
          </motion.form>
          
          <div className="mt-8 flex justify-center gap-10">
             {['Feel happy', 'Feeling a bit low', 'I am so angry', 'Beast Mode', 'Back to intelligent'].map((hint) => (
               <button 
                key={hint}
                onClick={() => setInputValue(hint)}
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:translate-y-[-2px] ${displayMode === 'dark' ? 'text-white/30 hover:text-white' : 'text-black/40 hover:text-black'}`}
               >
                 {hint}
               </button>
             ))}
          </div>
        </div>

        {theme.isPower ? (
          <PowerModeLayout theme={theme} aiResponse={aiResponse} />
        ) : aiResponse.mood === 'happy' ? (
          <HappyModeLayout theme={theme} />
        ) : aiResponse.mood === 'sad' ? (
          <SadModeLayout theme={theme} />
        ) : aiResponse.mood === 'angry' ? (
          <AngryModeLayout theme={theme} />
        ) : (
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {emojiTiles.map((emoji, index) => (
                <EmojiTile key={index} emoji={emoji} theme={theme} mode={displayMode} />
              ))}
            </div>

            <MainPanel theme={theme} mode={displayMode} />
            <ConsolePanel theme={theme} lastJson={aiResponse} mode={displayMode} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
