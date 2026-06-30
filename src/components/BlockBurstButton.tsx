import React, { useState, useCallback, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useSoundEffect } from '../hooks/useSoundEffect';

interface Particle {
  id: string;
  color: string;
  size: number;
  angle: number;
  velocity: number;
  rotation: number;
}

export function BlockBurstButton({ 
  children, 
  className, 
  onClick, 
  as: Component = "button",
  ...props 
}: { 
  children: ReactNode, 
  className?: string, 
  onClick?: (e: React.MouseEvent<any>) => void,
  as?: any,
  [key: string]: any 
}) {
  const [bursts, setBursts] = useState<{ id: string; particles: Particle[], x: number, y: number }[]>([]);
  const { playClickSound } = useSoundEffect();

  const triggerBurst = useCallback((e: React.MouseEvent<any>) => {
    playClickSound();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#55FFFF', '#55FF55', '#FFAA00', '#AAAAAA', '#FF5555'];
    
    const particles: Particle[] = Array.from({ length: 15 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.floor(Math.random() * 6) + 4,
      angle: Math.random() * Math.PI * 2,
      velocity: Math.random() * 50 + 30,
      rotation: (Math.random() - 0.5) * 360
    }));

    const burstId = Math.random().toString(36).substr(2, 9);
    setBursts(prev => [...prev, { id: burstId, particles, x, y }]);

    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== burstId));
    }, 800);
    
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <Component 
      className={`relative ${className || ''}`} 
      onClick={triggerBurst}
      {...props}
    >
      {children}
      {bursts.map(burst => (
        <div 
          key={burst.id} 
          className="absolute pointer-events-none" 
          style={{ left: burst.x, top: burst.y, zIndex: 50 }}
        >
          {burst.particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
              animate={{ 
                x: Math.cos(p.angle) * p.velocity, 
                y: Math.sin(p.angle) * p.velocity + 15,
                opacity: 0, 
                rotate: p.rotation,
                scale: 1.2
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                border: '1px solid rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>
      ))}
    </Component>
  );
}
