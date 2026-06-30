import { FadeIn } from '../components/FadeIn';
import { motion, useInView } from 'motion/react';
import React, { useRef } from 'react';

const skills = [
  { name: "Community Management", percentage: 95 },
  { name: "Discord Moderation", percentage: 98 },
  { name: "Ticket Management", percentage: 90 },
  { name: "Team Leadership", percentage: 85 },
  { name: "Server Configuration", percentage: 80 },
];

const SkillChart: React.FC<{ skill: typeof skills[0], index: number }> = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl"
    >
      <div className="relative flex items-center justify-center mb-6">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-mono text-foreground font-bold leading-none">
            {skill.percentage}%
          </span>
        </div>
      </div>
      <span className="text-foreground font-medium uppercase tracking-wider text-sm text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="bg-background px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,10vw,100px)] mb-16 sm:mb-20 text-foreground">
            Skills
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, i) => (
            <SkillChart key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
