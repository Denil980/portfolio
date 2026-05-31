import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const dotX = useSpring(0, { damping: 15, stiffness: 150 });
  const dotY = useSpring(0, { damping: 15, stiffness: 150 });
  
  const ringX = useSpring(0, { damping: 25, stiffness: 180 });
  const ringY = useSpring(0, { damping: 25, stiffness: 180 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      ringX.set(e.clientX - 32);
      ringY.set(e.clientY - 32);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      const target = e.currentTarget as HTMLElement;
      const textVal = target.getAttribute('data-cursor-text');
      if (textVal) {
        setCursorText(textVal);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const updateInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-text]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateInteractiveListeners();
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY, scale: isHovering ? 0 : 1 }}
      />
      {/* Outer morphing ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-blue-500/50 pointer-events-none z-[9998] hidden md:flex items-center justify-center select-none overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          scale: cursorText ? 1.4 : isHovering ? 1.0 : isClicking ? 0.7 : 0.6,
          backgroundColor: cursorText ? 'rgba(37, 99, 235, 0.95)' : isHovering ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
          borderColor: cursorText ? 'transparent' : isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)',
        }}
        transition={{ scale: { type: 'spring', damping: 15, stiffness: 150 } }}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-[9px] font-black uppercase tracking-widest text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
