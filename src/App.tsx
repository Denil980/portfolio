import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen selection:bg-blue-500/20 overflow-x-hidden">
      <CustomCursor />
      
      {/* Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left z-[110]"
        style={{ scaleX }}
      />
      
      {/* Premium Texture & Backgrounds */}
      <div className="noise"></div>
      <div className="fixed inset-0 bg-dots opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
      
      {/* Global Ambient Glows */}
      <div className="fixed -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="fixed -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
