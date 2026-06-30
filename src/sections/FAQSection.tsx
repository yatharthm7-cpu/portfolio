import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../components/FadeIn';

const faqs = [
  {
    question: "Are you currently accepting new staff positions?",
    answer: "Yes! I am currently open to new opportunities. I am primarily looking for roles in server management, community management, or discord setup. Feel free to reach out to discuss potential roles."
  },
  {
    question: "What is your typical availability?",
    answer: "I am generally available for 15-20 hours per week, depending on my academic schedule. I ensure that any commitments I take on are met with dedication and consistent activity."
  },
  {
    question: "Do you charge for your services?",
    answer: "It depends on the scope of the project. Basic moderation or community management roles are often on a volunteer basis depending on the server size, whereas custom website development, complex discord setups, or custom bot development are paid services. Contact me for a quote."
  },
  {
    question: "What platforms do you work with?",
    answer: "I primarily work with Minecraft (Java/Bedrock), Discord, and web platforms. For web development, I specialize in React, Tailwind CSS, and modern web technologies."
  },
  {
    question: "How do you handle time zone differences?",
    answer: "I am based in India (IST), but I am accustomed to working with international teams and can adapt to overlapping hours for meetings and important server events."
  }
];

import { BlockBurstButton } from '../components/BlockBurstButton';

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden mb-4 transition-colors hover:bg-white/[0.04]">
      <BlockBurstButton 
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
        onClick={onClick}
      >
        <span className="font-bold uppercase tracking-widest text-sm sm:text-base text-foreground pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-foreground/50 text-2xl font-light"
        >
          +
        </motion.div>
      </BlockBurstButton>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 text-foreground/60 text-sm sm:text-base leading-relaxed font-light">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] mb-12 sm:mb-16 text-foreground">
            FAQ
          </h2>
        </FadeIn>
        
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={0.1 + index * 0.1} y={20}>
              <FAQItem 
                faq={faq} 
                isOpen={openIndex === index} 
                onClick={() => setOpenIndex(openIndex === index ? null : index)} 
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
