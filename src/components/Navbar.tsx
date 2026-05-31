import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Download, Menu, X, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (val: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-6 flex justify-center pointer-events-none">
      <motion.div 
        animate={{ 
          width: scrolled ? 'auto' : '100%',
          maxWidth: scrolled ? '900px' : '1200px',
          padding: scrolled ? '0.5rem 1.25rem' : '1rem 2rem'
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between rounded-full glass border-white/10 pointer-events-auto relative shadow-2xl overflow-hidden"
      >
        {/* Logo */}
        <Magnetic>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 cursor-pointer shrink-0"
          >
            DD
          </motion.div>
        </Magnetic>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-2 mx-6 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Magnetic key={link.name}>
                <motion.a
                  href={link.href}
                  className={`relative text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2.5 rounded-full transition-colors duration-300 block cursor-pointer select-none ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-extrabold' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-blue-500/10 dark:bg-white/5 rounded-full z-[-1] border border-blue-500/20 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </motion.a>
              </Magnetic>
            );
          })}
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Magnetic>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
            </motion.button>
          </Magnetic>
          
          <Magnetic>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-blue-700 transition-all cursor-pointer"
            >
              Resume
              <ArrowUpRight size={14} />
            </motion.a>
          </Magnetic>

          {/* Mobile Menu Toggle */}
          <Magnetic>
            <button
              className="lg:hidden p-3 rounded-full bg-slate-100/50 dark:bg-white/5 flex items-center justify-center cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </Magnetic>
        </div>
      </motion.div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[-1] pointer-events-auto"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-[#030712] p-12 flex flex-col pointer-events-auto shadow-2xl z-[101]"
            >
              <button className="self-end p-4 mb-12 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                <X size={32} />
              </button>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-4xl font-black tracking-tighter hover:text-blue-600 transition-colors flex items-center gap-4 ${
                        isActive ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {isActive && <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />}
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>
              
              <div className="mt-auto">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-3 px-8 py-6 rounded-[2rem] bg-blue-600 text-white font-black tracking-widest uppercase text-sm w-full cursor-pointer"
                >
                  Download CV
                  <Download size={20} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
