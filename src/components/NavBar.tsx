import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { BlockBurstButton } from './BlockBurstButton';
import { useTheme } from './ThemeProvider';
import { Moon, Sparkles } from 'lucide-react';

export function NavBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { themeMode, toggleVoidTheme } = useTheme();

  useEffect(() => {
    let ticking = false;
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrameId: number;

    const updateProgress = () => {
      // Smooth interpolation for the progress bar
      currentProgress += (targetProgress - currentProgress) * 0.15;

      if (progressBarRef.current) {
        // Direct DOM manipulation for maximum performance
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      // Continue animation if still moving
      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        ticking = false;
      }
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      
      // Update state for background styling (this is okay because it's a simple boolean and doesn't fire every frame)
      setIsScrolled(window.scrollY > 50);

      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[60] origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center sm:justify-between items-center px-6 md:px-10 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5 shadow-lg' : 'bg-transparent py-6 md:py-10'
        }`}
      >
      <div className="hidden sm:flex items-center gap-6">
        <div className="text-foreground font-black tracking-widest uppercase text-xl">
          CooKie
        </div>
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-sm cursor-help" title="Currently open to new opportunities">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-foreground/90 font-bold uppercase tracking-widest mt-0.5">Accepting Staff Positions</span>
        </div>
      </div>
      <div className="flex gap-4 md:gap-6 lg:gap-10 overflow-x-auto hide-scrollbar whitespace-nowrap px-4 py-2 items-center">
        {['About', 'Experience', 'Services', 'Skills', 'Reviews', 'FAQ', 'Contact'].map(link => {
          const targetId = link === 'Experience' ? 'history' : link === 'Reviews' ? 'testimonials' : link.toLowerCase();
          return (
            <BlockBurstButton 
              as="a"
              key={link} 
              href={`#${targetId}`} 
              className="text-foreground font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg hover:opacity-70 transition-opacity duration-200 block"
            >
              {link}
            </BlockBurstButton>
          );
        })}
        <button
          onClick={toggleVoidTheme}
          className="ml-2 flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          title={themeMode === 'auto' ? "Switch to Void Mode" : "Switch to Auto Mode"}
        >
          {themeMode === 'auto' ? (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80" />
          ) : (
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80" />
          )}
        </button>
      </div>
    </motion.nav>
    </>
  );
}
