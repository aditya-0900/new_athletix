import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileVideo, CheckCircle2, Loader2, Play, BarChart3 } from 'lucide-react';

export default function VideoAnalysisSimulation() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setStatus('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('processing');
        setTimeout(() => setStatus('complete'), 3000);
      }
    }, 50);
  };

  return (
    <div className="glass-card p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6 group"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-emerald-500/30 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-all cursor-pointer" onClick={startAnalysis}>
              <Upload className="text-emerald-500 icon-react" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">AI Video Analysis</h3>
              <p className="text-zinc-400 text-sm mt-2">Upload your match or net session video for instant ML-driven feedback.</p>
            </div>
            <button 
              onClick={startAnalysis}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all btn-glow"
            >
              Select Video File
            </button>
          </motion.div>
        )}

        {status === 'uploading' && (
          <motion.div 
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 py-10"
          >
            <Loader2 className="animate-spin text-emerald-500 mx-auto" size={48} />
            <div>
              <h3 className="text-xl font-bold">Uploading Session...</h3>
              <p className="text-zinc-400 text-sm mt-2">{progress}% completed</p>
            </div>
          </motion.div>
        )}

        {status === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 py-10"
          >
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-emerald-500 rounded-full"
              ></motion.div>
              <FileVideo className="absolute inset-0 m-auto text-emerald-500" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">ML Processing</h3>
              <p className="text-zinc-400 text-sm mt-2">Extracting biomechanics and ball trajectory data...</p>
            </div>
          </motion.div>
        )}

        {status === 'complete' && (
          <motion.div 
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="text-white" size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400">Analysis Complete!</h3>
              <p className="text-zinc-400 text-sm mt-2">We've identified 3 key areas for technical improvement.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-all">
                <Play size={16} /> Watch Clips
              </button>
              <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-all">
                <BarChart3 size={16} /> View Stats
              </button>
            </div>
            <button onClick={() => setStatus('idle')} className="text-xs text-zinc-500 hover:text-zinc-300 underline block mx-auto">Upload another video</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
