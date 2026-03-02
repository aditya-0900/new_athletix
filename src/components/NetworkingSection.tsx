import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, MapPin, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

const tournaments = [
  { id: '1', name: 'IPL 2026 Qualifiers', date: 'March 15, 2026', location: 'Mumbai, India', category: 'T20', logo: 'https://picsum.photos/seed/ipl/100/100' },
  { id: '2', name: 'ICC Champions Trophy', date: 'April 02, 2026', location: 'Dubai, UAE', category: 'ODI', logo: 'https://picsum.photos/seed/icc/100/100' },
  { id: '3', name: 'County Championship', date: 'May 10, 2026', location: 'London, UK', category: 'First Class', logo: 'https://picsum.photos/seed/county/100/100' },
];

const sponsors = [
  { name: 'Nike Cricket', industry: 'Apparel', logo: 'https://picsum.photos/seed/nike/100/100' },
  { name: 'MRF Tyres', industry: 'Equipment', logo: 'https://picsum.photos/seed/mrf/100/100' },
  { name: 'Dream11', industry: 'Tech', logo: 'https://picsum.photos/seed/dream11/100/100' },
  { name: 'Tata Group', industry: 'Conglomerate', logo: 'https://picsum.photos/seed/tata/100/100' },
];

export default function NetworkingSection() {
  const [pitched, setPitched] = useState<string[]>([]);

  const handlePitch = (name: string) => {
    if (pitched.includes(name)) return;
    setPitched(prev => [...prev, name]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ... tournaments ... */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="text-amber-400" /> Upcoming Tournaments
          </h2>
          <button className="text-xs text-emerald-400 hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {tournaments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 flex items-center gap-4 hover:border-emerald-500/50 transition-colors cursor-pointer group"
            >
              <img src={t.logo} alt={t.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <h4 className="font-bold group-hover:text-emerald-400 transition-colors">{t.name}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {t.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {t.location}</span>
                </div>
              </div>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                <Bell size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-cyan-400" /> Top Sponsors
          </h2>
          <button className="text-xs text-emerald-400 hover:underline">Connect</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {sponsors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 flex flex-col items-center text-center gap-3 group cursor-pointer relative overflow-hidden"
            >
              <AnimatePresence>
                {pitched.includes(s.name) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-emerald-500/90 z-20 flex flex-col items-center justify-center p-4 text-white"
                  >
                    <CheckCircle2 size={32} className="mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Pitch Sent!</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPitched(prev => prev.filter(p => p !== s.name)); }}
                      className="mt-4 text-[10px] underline opacity-70 hover:opacity-100"
                    >
                      Undo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                <img src={s.logo} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{s.name}</h4>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{s.industry}</p>
              </div>
              <button 
                onClick={() => handlePitch(s.name)}
                className="mt-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
              >
                Pitch Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
