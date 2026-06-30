import { motion, useTransform, useMotionValue } from "motion/react";
import React, { useRef, useEffect } from "react";

export function AnimatedText({ text, className }: { text: string, className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let ticking = false;
    let animationFrameId: number;

    const updateProgress = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // offset: ["start 0.8", "end 0.2"]
      // start computing when top of element is at 80% of viewport
      const startTrigger = viewportHeight * 0.8;
      // stop computing when bottom of element is at 20% of viewport
      const endTrigger = viewportHeight * 0.2;
      
      // Calculate progress
      const distance = startTrigger - endTrigger;
      let progress = 0;
      
      if (distance > 0) {
        // As the element scrolls up, rect.top decreases
        // When rect.top == startTrigger, progress = 0
        // When rect.bottom == endTrigger, progress = 1
        
        // Let's map rect.top from startTrigger to endTrigger 
        // Wait, end 0.2 means when the END of the element hits 20% of viewport
        
        const currentPos = rect.top;
        const currentBottomPos = rect.bottom;
        
        // Progress should go from 0 to 1 as the element scrolls from startTrigger to endTrigger
        // We use the top of the element for the start, and bottom for the end
        const totalDistance = startTrigger - endTrigger + rect.height;
        const traveled = startTrigger - currentPos;
        
        progress = Math.max(0, Math.min(1, traveled / totalDistance));
      }

      scrollYProgress.set(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} word={word} />
        );
      })}
    </p>
  );
}

const Word = ({ word, progress, range }: { word: string, progress: any, range: [number, number], key?: React.Key }) => {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span className="relative inline-block mr-[0.25em] mt-2">
      {characters.map((char, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return (
          <Character key={i} progress={progress} range={[start, end]} char={char} />
        );
      })}
    </span>
  );
};

const Character = ({ char, progress, range }: { char: string, progress: any, range: [number, number], key?: React.Key }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>{char}</motion.span>
    </span>
  );
};
