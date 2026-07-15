import { FadeIn } from "../components/FadeIn";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useRef, useEffect } from "react";

const history = [
  {
    role: "Founder",
    server: "Exora Studios",
    duration: "Active",
    description:
      "Co-founded and leading Exora Studios, a professional development and creative studio specialized in delivering top-tier custom plugins, system architecture, and Discord communities for Minecraft networks.",
  },
  {
    role: "Owner",
    server: "SoulBerry",
    duration: "Releasing Soon",
    description:
      "Leading the development and preparation for the upcoming launch. Overseeing all aspects of server creation, community building, and strategic planning.",
    ip: "play.soulberry.fun",
  },
  {
    role: "Manager",
    server: "NitroMC",
    duration: "Resigned",
    description:
      "Managing daily operations, coordinating staff teams, and ensuring a smooth, engaging player experience across the network.",
    ip: "play.nitromc.lol",
  },
  {
    role: "Network Manager",
    server: "Heartless",
    duration: "Resigned",
    description:
      "Directed network-wide operations, managed upper staff teams, and implemented new features and community policies.",
    ip: "play.heartless.in",
  },
  {
    role: "Head Manager",
    server: "IceMC",
    duration: "Resigned",
    description:
      "Led the management team, oversaw all server activities, and focused on maximizing player retention and satisfaction.",
    ip: "icemc.pro",
  },
  {
    role: "General Manager",
    server: "MineRush",
    duration: "Resigned (Closed)",
    description:
      "Managed all server operations, coordinated with development teams, and handled community relations.",
  },
  {
    role: "Manager",
    server: "UltimateMC",
    duration: "Resigned (Sold)",
    description:
      "Oversaw staff, community engagement, and server performance up until the network's successful acquisition.",
  },
  {
    role: "Co. Owner",
    server: "MineFloat",
    duration: "Resigned (Closed)",
    description:
      "Co-managed the network, handled major administrative tasks, and directed overall server growth and direction.",
    ip: "play.minefloat.org",
  },
  {
    role: "Moderator",
    server: "FatalMC",
    duration: "Resigned",
    description:
      "Monitored chat, resolved player disputes, and punished rule-breakers to maintain a fair and safe environment.",
    ip: "play.fatalmc.org",
  },
  {
    role: "Jr. Mod",
    server: "BananaSMP",
    duration: "Resigned",
    description:
      "Assisted players with inquiries, enforced basic rules, and helped maintain a positive community atmosphere.",
    ip: "play.bananasmp.net",
  },
];

const TiltCard: React.FC<{
  item: (typeof history)[0];
  i: number;
  progress: any;
  total: number;
}> = ({ item, i, progress, total }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const targetScale = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  const topOffset = 100 + i * 24;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="min-h-[40vh] sm:min-h-[50vh] flex items-start justify-center sticky w-full perspective-1000"
      style={{ top: `${topOffset}px` }}
    >
      <FadeIn delay={0.1} y={40} className="w-full">
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full glass-card rounded-[30px] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 hover:bg-white/5 transition-colors cursor-default shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <div
            style={{ transform: "translateZ(30px)" }}
            className="flex flex-col sm:w-[45%]"
          >
            <span className="text-foreground/60 uppercase tracking-widest text-xs sm:text-sm mb-2">
              {item.duration}
            </span>
            <h3 className="text-foreground font-medium uppercase text-2xl sm:text-3xl md:text-4xl tracking-wide mb-2">
              {item.server}
            </h3>
            <span className="hero-heading font-black uppercase text-xl sm:text-2xl">
              {item.role}
            </span>
            {item.ip && (
              <div className="mt-4 flex items-center gap-2 text-foreground/50 font-mono text-sm bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                {item.ip}
              </div>
            )}
          </div>
          <div style={{ transform: "translateZ(20px)" }} className="sm:w-[55%]">
            <p className="text-foreground/70 font-light leading-relaxed text-sm sm:text-base md:text-lg">
              {item.description}
            </p>
          </div>
        </motion.div>
      </FadeIn>
    </div>
  );
};

export function StaffingHistorySection() {
  const containerRef = useRef<HTMLElement>(null);
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
      
      const startY = rect.top;
      const scrollableDistance = rect.height - viewportHeight;
      
      let progress = 0;
      if (scrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, -startY / scrollableDistance));
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

  return (
    <section
      ref={containerRef}
      id="history"
      className="bg-background px-5 sm:px-8 md:px-10 py-20 relative z-10"
    >
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,120px)] mb-16 sm:mb-20 sticky top-[20px] z-20 mix-blend-difference text-white/50 pointer-events-none">
        <FadeIn delay={0} y={40}>
          Staffing History
        </FadeIn>
      </h2>
      <div className="max-w-5xl mx-auto flex flex-col relative z-30 pb-[10vh]">
        {history.map((item, i) => (
          <TiltCard
            key={i}
            item={item}
            i={i}
            progress={scrollYProgress}
            total={history.length}
          />
        ))}
      </div>
    </section>
  );
}
