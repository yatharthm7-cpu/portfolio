import { motion, useInView } from "motion/react";
import React, { useRef, ElementType, useMemo } from "react";

interface FadeInProps {
  key?: React.Key;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as: Component = "div", className }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px", amount: 0 });

  const MotionComponent = useMemo(() => motion.create(Component as any), [Component]);

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
