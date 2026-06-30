import { motion } from 'motion/react';

export function SectionSeparator() {
  return (
    <div className="w-full flex justify-center py-12 relative z-10 pointer-events-none">
      <motion.svg
        width="300"
        height="24"
        viewBox="0 0 300 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M150 4L154 12L150 20L146 12L150 4Z" fill="#D7E2EA" />
        <rect x="0" y="11" width="135" height="1" fill="url(#paint0_linear)" />
        <rect x="165" y="11" width="135" height="1" fill="url(#paint1_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="135" y1="11" x2="0" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7E2EA" stopOpacity="0.3"/>
            <stop offset="1" stopColor="#D7E2EA" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="165" y1="11" x2="300" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7E2EA" stopOpacity="0.3"/>
            <stop offset="1" stopColor="#D7E2EA" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
