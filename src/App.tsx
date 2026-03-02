import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { 
  Activity, 
  Zap, 
  Target, 
  Users, 
  Trophy, 
  MessageSquare, 
  ChevronDown, 
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  BrainCircuit,
  Utensils,
  Network,
  Sparkles
} from 'lucide-react';
import PerformanceDashboard from './components/PerformanceDashboard';

import NetworkingSection from './components/NetworkingSection';
import VideoAnalysisSimulation from './components/VideoAnalysisSimulation';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  
  // Cursor proximity effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

 // Cursor proximity effect
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

// 🔥 Popup effect (SEPARATE)
useEffect(() => {
  const timer = setTimeout(() => {
    setShowPopup(true);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  const navLinks = [
    { name: 'Analysis', icon: Activity, href: '#analysis' },
    { name: 'AI Coach', icon: BrainCircuit, href: '#ai-coach' },
    { name: 'Sponsors', icon: Users, href: '#networking' },
    { name: 'Tournaments', icon: Trophy, href: '#networking' },
  ];

  const iplLogos = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Royal_Challengers_Bangalore_Logo.svg/1200px-Royal_Challengers_Bangalore_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sunrisers_Hyderabad.svg/1200px-Sunrisers_Hyderabad.svg.png',
  ];

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 relative">
      {/* Background Visuals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 grid-shimmer opacity-20"></div>
        
        {/* Parallax Abstract Shapes */}
        <motion.div 
          style={{ x: useTransform(springX, [0, 2000], [-20, 20]), y: useTransform(springY, [0, 1000], [-20, 20]) }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ x: useTransform(springX, [0, 2000], [20, -20]), y: useTransform(springY, [0, 1000], [20, -20]) }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"
        />

        {/* Beams */}
        <div className="beam left-[15%] opacity-10"></div>
        <div className="beam left-[45%] opacity-5"></div>
        <div className="beam left-[85%] opacity-10"></div>

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              '--duration': `${Math.random() * 10 + 10}s`,
              '--delay': `${Math.random() * 5}s`,
            } as any}
          />
        ))}
      </div>

      {/* Cursor Glow */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-[400px] h-[400px] -ml-[200px] -mt-[200px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none z-10"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center"
            >
              <Zap className="text-white" size={20} />
            </motion.div>
            <span className="text-xl font-display font-bold tracking-tighter">ATHLETIX<span className="text-emerald-500">I</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-zinc-400 hover:text-white transition-all flex items-center gap-2 group"
              >
                <link.icon size={16} className="icon-react" />
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/signup.html"
              className="hidden sm:block px-6 py-2 text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-all btn-glow"
            >
              Get Started
            </a>
            <button 
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-20 px-4"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-display font-bold flex items-center gap-4 group"
                >
                  <link.icon size={24} className="text-emerald-500 icon-react" />
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 text-lg font-bold bg-emerald-500 text-white rounded-2xl btn-glow">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest"
              >
                <Sparkles size={14} className="animate-pulse" /> AI-Powered Performance Analysis
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter"
              >
                The AI Companion for<br />
                <span className="gradient-text">Elite Performance</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl"
              >
                Analyze every move with computer vision. Get personalized coaching from your AI companion. Connect with the world's top clubs and sponsors.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a 
                  href="/signup.html"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 btn-glow"
                >
                  Start Analysis <ArrowRight size={20} />
                </a>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all">
                  View Demo
                </button>
              </motion.div>
            </div>

            {/* Logo Cloud */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 pt-10 border-t border-white/5"
            >
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-8 font-mono">Trusted by Elite Teams & Organizations</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
                {iplLogos.map((logo, i) => (
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    key={i} 
                    src={logo} 
                    alt="Team Logo" 
                    className="h-10 md:h-14 object-contain cursor-pointer" 
                    referrerPolicy="no-referrer" 
                  />
                ))}
                <motion.img 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/International_Cricket_Council_logo.svg/1200px-International_Cricket_Council_logo.svg.png" 
                  alt="ICC" 
                  className="h-10 md:h-14 object-contain cursor-pointer" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="analysis" className="py-20 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Real-Time <span className="text-emerald-500">Performance</span></h2>
                <p className="text-zinc-400 max-w-xl">Monitor every metric that matters. From bat speed to bowling accuracy, our AI tracks it all in real-time.</p>
              </div>
              <VideoAnalysisSimulation />
            </div>
            <PerformanceDashboard />
          </div>
        </section>

        {/* Networking Section */}
        <section id="networking" className="py-20 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4">
            <NetworkingSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="glass-card p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-3xl -ml-32 -mb-32"></div>
              
              <h2 className="text-4xl md:text-6xl font-bold relative z-10">Ready to <span className="text-emerald-500">Step Out</span>?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto relative z-10">Join thousands of players who are using ATHLETIXI to transform their game and get noticed by top scouts.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a 
                  href="/signup.html"
                  className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl transition-all btn-glow"
                >
                  Join the Academy
                </a>
                <button className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <span className="text-xl font-display font-bold tracking-tighter">ATHLETIX<span className="text-emerald-500">I</span></span>
              </div>
              <p className="text-zinc-500 max-w-sm">The world's first AI-integrated sports performance ecosystem. Empowering athletes from grassroots to international levels.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Performance Analysis</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Nutritionist</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Career Roadmap</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sponsorships</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600">© 2026 AthletixI. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a key={social} href="#" className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
       {/* 🔥 Early Access Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-zinc-900 border border-emerald-500/20 p-8 rounded-2xl max-w-md w-full text-center relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">
                🚀 Early Access Offer
              </h2>

              <p className="text-zinc-400 mb-6">
                Sign up now to get exclusive early access and special launch discounts.
              </p>

              <a
                href="/signup.html"
                className="w-full block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all btn-glow"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TrendingUp = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
