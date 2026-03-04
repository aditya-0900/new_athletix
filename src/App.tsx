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
               className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter"
              >
                AI That Analyzes Your Game<br />
                <span className="gradient-text">and Helps You Train Like a Pro</span>
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
<section className="py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      Why Most Athletes <span className="text-emerald-500">Struggle to Improve</span>
    </h2>

    {/* Subheading */}
    <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
      Even talented players fail to reach the next level because they lack the tools used by professional athletes.
    </p>

    {/* Problem Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-emerald-500/30 transition">
        <Activity className="text-emerald-500 mb-4" size={28}/>
        <h3 className="text-lg font-semibold mb-2">No Performance Analysis</h3>
        <p className="text-zinc-400 text-sm">
          Athletes rely on guesswork instead of real performance data.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-emerald-500/30 transition">
        <Target className="text-emerald-500 mb-4" size={28}/>
        <h3 className="text-lg font-semibold mb-2">No Structured Training</h3>
        <p className="text-zinc-400 text-sm">
          Training routines are random and not optimized for improvement.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-emerald-500/30 transition">
        <Users className="text-emerald-500 mb-4" size={28}/>
        <h3 className="text-lg font-semibold mb-2">Hard to Get Discovered</h3>
        <p className="text-zinc-400 text-sm">
          Clubs and sponsors rarely notice talented athletes.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-emerald-500/30 transition">
        <BrainCircuit className="text-emerald-500 mb-4" size={28}/>
        <h3 className="text-lg font-semibold mb-2">No Personalized Coaching</h3>
        <p className="text-zinc-400 text-sm">
          Most athletes don’t have access to expert feedback.
        </p>
      </div>

    </div>

    {/* Divider */}
    <div className="w-24 h-[2px] bg-emerald-500 mx-auto mt-16 mb-8 opacity-50"></div>

    {/* Animated Solution Text */}
    <motion.p
      className="text-center text-lg md:text-xl font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05 }
        }
      }}
    >
      {"ATHLETIXI solves this using AI-powered analysis and structured training."
        .split(" ")
        .map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`inline-block mr-2 ${
              word.includes("AI-powered") || word.includes("structured")
                ? "text-emerald-400 font-bold"
                : "text-zinc-300"
            }`}
          >
            {word}
          </motion.span>
        ))}
    </motion.p>

  </div>
</section>
{/* How It Works Section */}
<section className="py-24 bg-zinc-900/40">
  <div className="max-w-7xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      How <span className="text-emerald-500">ATHLETIXI</span> Works
    </h2>

    <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
      Turn your game footage into powerful insights and structured improvement with AI.
    </p>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Step 1 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/40 transition"
      >
        <div className="text-emerald-500 text-3xl font-bold mb-4">1</div>
        <Activity size={32} className="text-emerald-500 mb-4 mx-auto"/>
        <h3 className="text-xl font-semibold mb-3">Upload Match Video</h3>
        <p className="text-zinc-400 text-sm">
          Record your game or practice session and upload the footage to ATHLETIXI.
        </p>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/40 transition"
      >
        <div className="text-emerald-500 text-3xl font-bold mb-4">2</div>
        <BrainCircuit size={32} className="text-emerald-500 mb-4 mx-auto"/>
        <h3 className="text-xl font-semibold mb-3">AI Performance Analysis</h3>
        <p className="text-zinc-400 text-sm">
          Our computer vision models analyze movement, technique, speed, and performance metrics.
        </p>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/40 transition"
      >
        <div className="text-emerald-500 text-3xl font-bold mb-4">3</div>
        <Trophy size={32} className="text-emerald-500 mb-4 mx-auto"/>
        <h3 className="text-xl font-semibold mb-3">Improve & Get Discovered</h3>
        <p className="text-zinc-400 text-sm">
          Receive personalized training plans, AI coaching, and visibility to clubs and sponsors.
        </p>
      </motion.div>

    </div>

  </div>
</section>
{/* Built For Section */}
<section className="py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      Built For <span className="text-emerald-500">Serious Athletes</span>
    </h2>

    <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
      Whether you're an aspiring player or competing at academy level, ATHLETIXI
      helps you analyze performance, improve faster, and get noticed.
    </p>

    {/* Sports Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

      <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition">
        <span className="text-4xl">🏏</span>
        <h3 className="mt-4 font-semibold">Cricket Players</h3>
        <p className="text-sm text-zinc-400 mt-2">
          Improve batting, bowling, and fielding performance.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition">
        <span className="text-4xl">⚽</span>
        <h3 className="mt-4 font-semibold">Football Players</h3>
        <p className="text-sm text-zinc-400 mt-2">
          Track movement, speed, and tactical awareness.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition">
        <span className="text-4xl">🏃</span>
        <h3 className="mt-4 font-semibold">Track Athletes</h3>
        <p className="text-sm text-zinc-400 mt-2">
          Analyze running technique, speed, and endurance.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition">
        <span className="text-4xl">🎾</span>
        <h3 className="mt-4 font-semibold">Tennis Players</h3>
        <p className="text-sm text-zinc-400 mt-2">
          Improve stroke mechanics and court performance.
        </p>
      </div>

    </div>

    {/* Bottom Line */}
    <p className="text-emerald-400 mt-16 text-lg font-semibold">
      From grassroots players to elite academy athletes.
    </p>

  </div>
</section>
{/* Everything in One Platform */}
<section className="py-24 bg-zinc-900/40">
  <div className="max-w-7xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      Everything an Athlete Needs <br />
      <span className="text-emerald-500">in One Platform</span>
    </h2>

    <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
      ATHLETIXI combines performance analytics, AI coaching, training plans,
      and career opportunities into a single powerful ecosystem.
    </p>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

      {/* Feature 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <Activity className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">AI Performance Analysis</h3>
        <p className="text-zinc-400 text-sm">
          Track movement, technique, and performance metrics using advanced computer vision.
        </p>
      </motion.div>

      {/* Feature 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <BrainCircuit className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">AI Coaching Assistant</h3>
        <p className="text-zinc-400 text-sm">
          Get personalized training guidance and performance feedback from your AI coach.
        </p>
      </motion.div>

      {/* Feature 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <Target className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">Structured Training Plans</h3>
        <p className="text-zinc-400 text-sm">
          Follow structured training roadmaps designed to accelerate athlete development.
        </p>
      </motion.div>

      {/* Feature 4 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <Utensils className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">Personalized Nutrition</h3>
        <p className="text-zinc-400 text-sm">
          AI-powered nutrition guidance tailored to your sport and training intensity.
        </p>
      </motion.div>

      {/* Feature 5 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <Trophy className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">Tournaments & Opportunities</h3>
        <p className="text-zinc-400 text-sm">
          Discover competitions and opportunities that match your skill level.
        </p>
      </motion.div>

      {/* Feature 6 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 transition"
      >
        <Network className="text-emerald-500 mb-4 mx-auto" size={30} />
        <h3 className="text-lg font-semibold mb-2">Sponsors & Clubs</h3>
        <p className="text-zinc-400 text-sm">
          Connect with clubs, academies, and sponsors looking for emerging talent.
        </p>
      </motion.div>

    </div>

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
{/* Get Discovered Section */}
<section className="py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Left Content */}
      <div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Get <span className="text-emerald-500">Discovered</span>
        </h2>

        <p className="text-zinc-400 mb-10 max-w-xl">
          ATHLETIXI helps talented athletes get noticed by clubs, academies,
          and sponsors through AI-powered performance profiles.
        </p>

        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10">
              <Users className="text-emerald-500" size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Clubs & Academies</h4>
              <p className="text-sm text-zinc-400">
                Showcase your performance data to professional clubs and training academies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10">
              <Network className="text-emerald-500" size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Sponsors</h4>
              <p className="text-sm text-zinc-400">
                Build a performance-backed athlete profile that attracts sponsorship opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10">
              <Trophy className="text-emerald-500" size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Talent Scouts</h4>
              <p className="text-sm text-zinc-400">
                Get discovered by scouts looking for emerging talent across multiple sports.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Visual Cards */}
      <div className="grid grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-2">Performance Profile</h3>
          <p className="text-sm text-zinc-400">
            AI-generated athlete performance reports and insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-2">Talent Visibility</h3>
          <p className="text-sm text-zinc-400">
            Athletes get visibility across clubs, tournaments, and leagues.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-2">Career Growth</h3>
          <p className="text-sm text-zinc-400">
            Structured development pathways powered by AI insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-2">Sponsorship Potential</h3>
          <p className="text-sm text-zinc-400">
            Brands and sponsors discover promising athletes.
          </p>
        </motion.div>

      </div>

    </div>

  </div>
</section>
{/* Landing Page Signup */}
<section className="py-24 bg-zinc-950">
  <div className="max-w-4xl mx-auto px-4 text-center">

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Join the <span className="text-emerald-500">ATHLETIXI Early Access</span>
    </h2>

    <p className="text-zinc-400 mb-12">
      Be among the first athletes to experience AI-powered performance analysis
      and career opportunities.
    </p>

    <form
      action="/signup.html"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
    >
      <input
        type="text"
        placeholder="Full Name"
        required
        className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-emerald-500 outline-none"
      />

     
      <input
        type="text"
        placeholder="Sport (Cricket, Football...)"
        className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-emerald-500 outline-none"
      />

    
      <button
        type="submit"
        className="md:col-span-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition btn-glow"
      >
        Get Early Access
      </button>
    </form>

    <p className="text-xs text-zinc-500 mt-6">
      You will be redirected to complete your athlete profile.
    </p>

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
