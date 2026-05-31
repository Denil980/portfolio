import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';
import TiltCard from './TiltCard';
import denil1 from '../assets/denil.jpg';
import denil2 from '../assets/denil2.jpg';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [denil1, denil2];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // Auto transition every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const titleText = "I'm Denil Daby";
  const titleWords = titleText.split(" ");

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { y: 120, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-28 lg:pt-20 px-4 overflow-hidden">
      {/* Dynamic Interactive Background */}
      <InteractiveBackground />

      {/* Background Animated Blobs with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          x: [0, 30, -20, 0], 
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen pointer-events-none z-0"
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Text Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">

          {/* Name & Title with split letter wave for "I'm" and image mask overlay for "Denil Daby" */}
          <motion.h1 
            variants={wordContainerVariants} 
            className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-9xl font-black mb-6 md:mb-10 tracking-tight leading-[1.1] flex flex-wrap justify-center lg:justify-start overflow-hidden items-center"
          >
            {/* "I'm" split by letter */}
            <span className="mr-3 md:mr-6 flex overflow-hidden py-2 text-slate-900 dark:text-white">
              {titleWords[0].split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* "Denil Daby" with continuous dual-photo text mask crossfade */}
            <span className="inline-grid py-2 relative overflow-hidden">
              <motion.span
                variants={itemVariants}
                className="col-start-1 row-start-1"
                style={{
                  backgroundImage: `url(${denil1})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 20%',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  opacity: currentImageIndex === 0 ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                Denil Daby
              </motion.span>

              <motion.span
                variants={itemVariants}
                className="col-start-1 row-start-1 pointer-events-none"
                style={{
                  backgroundImage: `url(${denil2})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 20%',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  opacity: currentImageIndex === 1 ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                Denil Daby
              </motion.span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xs sm:text-sm md:text-base font-black tracking-[0.4em] uppercase text-blue-600 dark:text-blue-400 mb-6"
          >
            Frontend Developer &bull; MERN Stack
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 md:mb-16 leading-relaxed font-medium px-4 lg:px-0"
          >
            Crafting <span className="text-slate-950 dark:text-white font-black underline decoration-blue-500/30">digital solutions</span> with code and creative design.
          </motion.p>
        </div>

        {/* Profile Image Slideshow Column */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col items-center justify-center relative w-full px-4 sm:px-12 lg:px-0"
        >
          {/* Ambient pulsing backlight glows */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] opacity-35 blur-3xl animate-pulse -z-10" style={{ animationDuration: '8s' }} />
          
          {/* 3D Interactive Tilt Card container */}
          <TiltCard 
            className="w-full max-w-[340px] aspect-[3/4] rounded-3xl border border-white/10 dark:border-white/5 bg-slate-950/20 backdrop-blur-xl shadow-2xl p-3 flex flex-col justify-between"
            glowColor="rgba(59, 130, 246, 0.25)"
          >
            {/* Slideshow display frame */}
            <div className="relative w-full h-[90%] rounded-2xl overflow-hidden bg-slate-900/50">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="Denil Daby"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </AnimatePresence>
            </div>

            {/* Custom Manual Dot Navigation Indicator */}
            <div className="flex justify-center items-center gap-3 py-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="relative p-1 focus:outline-none group cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="w-2 h-2 rounded-full bg-slate-400/40 group-hover:bg-slate-400/80 transition-colors" />
                  {currentImageIndex === idx && (
                    <motion.div 
                      layoutId="activeDot"
                      className="absolute inset-0 bg-blue-500 rounded-full scale-100"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 cursor-pointer group z-10"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 group-hover:opacity-100 transition-opacity">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center p-1 group-hover:border-blue-500 transition-colors">
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
