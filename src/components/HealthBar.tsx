import { motion } from 'motion/react';
import React, { useEffect, useRef } from 'react';

const PixelHeart = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  return (
    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
      {/* Empty Heart */}
      <svg viewBox="-0.5 -0.5 12 12" className="absolute inset-0 w-full h-full" style={{ shapeRendering: 'crispEdges' }}>
        <path 
          fill="#333333"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="miter"
          d="M2,1 h2 v1 h1 v1 h1 v-1 h1 v-1 h2 v2 h1 v3 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-3 h1 v-2 z" 
        />
      </svg>
      {/* Full Heart */}
      <svg 
        ref={ref}
        viewBox="-0.5 -0.5 12 12" 
        className="absolute inset-0 w-full h-full" 
        style={{ shapeRendering: 'crispEdges', opacity: 1, willChange: 'opacity' }}
      >
        <path 
          fill="#FF5555"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="miter"
          d="M2,1 h2 v1 h1 v1 h1 v-1 h1 v-1 h2 v2 h1 v3 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-3 h1 v-2 z" 
        />
        <rect x="2" y="2" width="1" height="1" fill="#FFaaaa" />
      </svg>
    </div>
  );
});

export function HealthBar() {
  const heartRefs = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrameId: number;

    const updateHearts = () => {
      // Smooth interpolation
      currentProgress += (targetProgress - currentProgress) * 0.1;

      heartRefs.current.forEach((heartRef, i) => {
        if (!heartRef) return;
        
        const startFade = (9 - i) * 0.09;
        const endFade = (10 - i) * 0.09;
        
        let opacity = 1;
        if (currentProgress >= endFade) opacity = 0;
        else if (currentProgress <= startFade) opacity = 1;
        else {
          opacity = 1 - (currentProgress - startFade) / (endFade - startFade);
        }

        // Apply smooth clamping
        opacity = Math.max(0, Math.min(1, opacity));
        heartRef.style.opacity = opacity.toFixed(3);
      });

      // Continue animation if still moving
      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        animationFrameId = requestAnimationFrame(updateHearts);
      } else {
        ticking = false;
      }
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      
      if (!ticking) {
        ticking = true;
        animationFrameId = requestAnimationFrame(updateHearts);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-1 bg-background/80 p-2 sm:p-3 rounded-2xl backdrop-blur-md border border-white/10 pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <PixelHeart key={i} ref={(el: SVGSVGElement | null) => { heartRefs.current[i] = el; }} />
      ))}
    </motion.div>
  );
}
