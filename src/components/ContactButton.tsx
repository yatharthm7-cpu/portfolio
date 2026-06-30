import { BlockBurstButton } from './BlockBurstButton';

export function ContactButton() {
  return (
    <BlockBurstButton 
      as="a" 
      href="#contact"
      className="contact-btn-bg rounded-full text-white font-medium uppercase tracking-[0.2em] px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 text-xs sm:text-sm md:text-base transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center text-center"
    >
      Contact Me
    </BlockBurstButton>
  );
}
