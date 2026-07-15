import { FadeIn } from '../components/FadeIn';

const services = [
  { num: "01", name: "Minecraft Server Management", desc: "Creating engaging gameplay experiences and maintaining reliable server infrastructure, with a focus on community and moderation." },
  { num: "02", name: "Custom Plugin Development", desc: "Creating bespoke, highly optimized Spigot, Paper, and Velocity plugins tailored perfectly to your Minecraft server's unique game mechanics and systems." },
  { num: "03", name: "Discord Server Design", desc: "Designing and managing professional Discord servers with well-structured systems, automation, and an enhanced user experience." },
  { num: "04", name: "Custom Discord Bots", desc: "Developing custom bots to automate tasks, improve moderation, and add unique features tailored to your community's needs." },
  { num: "05", name: "Custom Websites", desc: "Building modern, responsive websites tailored to client requirements, complete with secure payment gateways and custom functionality." }
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] mb-16 sm:mb-20 text-foreground">
            Services
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <FadeIn 
              key={svc.num} 
              delay={0.1 + i * 0.1} 
              className={`group p-8 sm:p-10 md:p-12 bg-white/[0.02] backdrop-blur-md shadow-xl border border-white/5 rounded-[30px] sm:rounded-[40px] hover:-translate-y-2 hover:scale-[1.01] hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_0_40px_rgba(215,226,234,0.08)] transition-all duration-500 flex flex-col ${
                i === 0 ? 'lg:col-span-2 lg:flex-row lg:items-center lg:justify-between gap-8' : 'gap-8'
              }`}
            >
              <div className={`flex flex-col ${i === 0 ? 'lg:w-[60%]' : ''}`}>
                <div className="font-mono text-5xl sm:text-6xl text-white/5 group-hover:text-white/20 transition-colors duration-500 font-bold mb-6 sm:mb-8">{svc.num}</div>
                <h3 className="font-bold uppercase tracking-widest text-xl sm:text-2xl text-foreground mb-4 group-hover:text-white transition-colors">{svc.name}</h3>
                <p className="font-light leading-relaxed text-base sm:text-lg text-foreground/60 group-hover:text-foreground/80 transition-colors">
                  {svc.desc}
                </p>
              </div>
              
              {i === 0 && (
                <div className="hidden lg:flex lg:w-[35%] items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 group-hover:scale-105 transition-all duration-500 bg-white/[0.01]">
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                  </div>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
