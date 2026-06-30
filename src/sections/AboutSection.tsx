import { FadeIn } from '../components/FadeIn';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 bg-background relative z-10">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] mb-12 sm:mb-16 text-foreground">
            About Me
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20} className="space-y-6 text-foreground/80 text-lg sm:text-xl leading-relaxed">
          <p>
            Hi! I'm <strong className="text-white font-bold">Yatharth Mehta</strong>, a 19-year-old student from India currently pursuing the prestigious <strong className="text-white font-bold">Chartered Accountancy (CA)</strong> qualification. Alongside my academic journey, I am passionate about technology, development, and building thriving online communities.
          </p>
          <p>
            My interests extend beyond academics into web development, server management, and community building. I have hands-on experience managing and developing Minecraft servers, where I focus on creating engaging gameplay experiences and maintaining reliable server infrastructure.
          </p>
          <p>
            I also specialize in designing and managing professional Discord servers with well-structured systems, automation, and an enhanced user experience. Additionally, I develop custom Discord bots with basic to intermediate functionality to automate tasks, improve moderation, and add unique features tailored to each community's needs.
          </p>
          <p>
            Beyond Discord and Minecraft, I develop custom websites that are modern, responsive, and tailored to client requirements. I can integrate secure payment gateways, implement custom functionality, and build solutions that meet specific business or community needs.
          </p>
          <p>
            In my free time, I enjoy reading books, exploring new technologies, and continuously improving my skills. I believe in lifelong learning and enjoy taking on new challenges that allow me to combine creativity with practical problem-solving.
          </p>
          <p>
            My goal is to deliver high-quality, reliable, and user-focused solutions while continuously growing as both a technology enthusiast and a future Chartered Accountant.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
