import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/ContactButton';
import { ParticleBackground } from '../components/ParticleBackground';

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row overflow-x-clip relative pt-20 md:pt-0">
      <ParticleBackground />

      <div className="flex-1 flex flex-col justify-center items-center md:items-start relative px-6 md:px-12 lg:px-20 z-20 pointer-events-none mt-10 md:mt-0">
         <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[6vw] text-center md:text-left">
              Hi, I&apos;m<br className="hidden md:block" /><span className="md:hidden"> </span>aNoobieCooKie
            </h1>
         </FadeIn>

         <FadeIn delay={0.35} y={20} className="mt-6 md:mt-8 max-w-lg w-full text-center md:text-left">
            <p className="text-foreground font-light uppercase tracking-wide leading-snug text-sm sm:text-base md:text-lg">
              a minecraft staff member driven by building safe and engaging communities
            </p>
         </FadeIn>

         <FadeIn delay={0.5} y={20} className="mt-8 md:mt-12 pointer-events-auto w-full flex justify-center md:justify-start">
            <ContactButton />
         </FadeIn>
      </div>

      <div className="flex-1 flex justify-center items-end relative z-30 pointer-events-auto min-h-[400px] md:min-h-screen pt-10 pb-0">
        <Magnet className="w-[240px] h-[360px] sm:w-[320px] sm:h-[460px] md:w-[400px] md:h-[520px] lg:w-[450px] lg:h-[600px] flex items-end">
           <FadeIn delay={0.6} y={30} className="w-full h-full">
              <img src="https://mc-heads.net/body/aNoobieCooKie" alt="aNoobieCooKie Portrait" className="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]" />
           </FadeIn>
        </Magnet>
      </div>
    </section>
  );
}
