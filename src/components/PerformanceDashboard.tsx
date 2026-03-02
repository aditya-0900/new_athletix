import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, Target, Award, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Jan', performance: 65, fitness: 70 },
  { name: 'Feb', performance: 72, fitness: 75 },
  { name: 'Mar', performance: 68, fitness: 80 },
  { name: 'Apr', performance: 85, fitness: 82 },
  { name: 'May', performance: 80, fitness: 85 },
  { name: 'Jun', performance: 92, fitness: 88 },
];

export default function PerformanceDashboard() {
  const [tasks, setTasks] = useState([
    { time: '06:00 AM', task: 'High-Intensity Cardio', status: 'Completed' },
    { time: '09:00 AM', task: 'Net Session: Spin Focus', status: 'In Progress' },
    { time: '01:00 PM', task: 'Nutrition: High Protein Meal', status: 'Pending' },
    { time: '04:00 PM', task: 'ML Video Analysis', status: 'Pending' },
    { time: '08:00 PM', task: 'Recovery: Yoga & Mobility', status: 'Pending' },
  ]);

  const toggleTask = (index: number) => {
    setTasks(prev => prev.map((t, i) => {
      if (i === index) {
        const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      {/* ... existing stats grid ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Strike Rate', value: '142.5', icon: Activity, color: 'text-emerald-400' },
          { label: 'Consistency', value: '88%', icon: Target, color: 'text-cyan-400' },
          { label: 'Fitness Score', value: '9.2', icon: TrendingUp, color: 'text-amber-400' },
          { label: 'Rank', value: '#12', icon: Award, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex items-center gap-4 cursor-pointer group"
          >
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color} icon-react`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold font-display">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-1 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Performance Analytics</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span>Fitness</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="performance" stroke="#10b981" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={3} />
                <Area type="monotone" dataKey="fitness" stroke="#22d3ee" fillOpacity={1} fill="url(#colorFit)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-bold mb-4">Skill Training</h3>
          <div className="space-y-6">
            {[
              { skill: 'Power Hitting', level: 75, color: 'bg-emerald-500' },
              { skill: 'Spin Defense', level: 62, color: 'bg-cyan-500' },
              { skill: 'Running Speed', level: 88, color: 'bg-amber-500' },
            ].map((s, i) => (
              <div key={i} className="space-y-2 group">
                <div className="flex justify-between text-xs">
                  <span className="font-medium group-hover:text-emerald-400 transition-colors">{s.skill}</span>
                  <span className="text-zinc-500">{s.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    className={`h-full ${s.color}`}
                  />
                </div>
                <button className="w-full py-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-lg hover:bg-emerald-500 hover:text-white transition-all btn-glow">
                  Start Drill
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-bold mb-4">Daily Roadmap</h3>
          <div className="space-y-4">
            {tasks.map((item, i) => (
              <motion.div 
                key={i} 
                layout
                onClick={() => toggleTask(i)}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer relative overflow-hidden"
              >
                {item.status === 'Completed' && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="absolute inset-0 bg-emerald-500/5 z-0"
                  />
                )}
                <div className="text-[10px] font-mono text-zinc-500 mt-1 w-16 relative z-10">{item.time}</div>
                <div className="flex-1 relative z-10">
                  <p className={`text-sm font-medium transition-all ${item.status === 'Completed' ? 'text-zinc-500 line-through' : 'group-hover:text-emerald-400'}`}>
                    {item.task}
                  </p>
                  <p className={`text-[10px] uppercase tracking-widest ${
                    item.status === 'Completed' ? 'text-emerald-500' : 
                    item.status === 'In Progress' ? 'text-amber-500' : 'text-zinc-500'
                  }`}>{item.status}</p>
                </div>
                <div className={`mt-1 p-1 rounded-full border ${item.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700 text-transparent'} relative z-10`}>
                  <ChevronRight size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
