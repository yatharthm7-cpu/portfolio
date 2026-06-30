/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavBar } from './components/NavBar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { StaffingHistorySection } from './sections/StaffingHistorySection';
import { ServicesSection } from './sections/ServicesSection';
import { SkillsSection } from './sections/SkillsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import { SectionSeparator } from './components/SectionSeparator';
import { CursorTrail } from './components/CursorTrail';
import { HealthBar } from './components/HealthBar';

export default function App() {
  return (
    <main className="w-full overflow-x-clip bg-background">
      <CursorTrail />
      <HealthBar />
      <NavBar />
      <HeroSection />
      <SectionSeparator />
      <AboutSection />
      <SectionSeparator />
      <StaffingHistorySection />
      <SectionSeparator />
      <ServicesSection />
      <SectionSeparator />
      <SkillsSection />
      <SectionSeparator />
      <TestimonialsSection />
      <SectionSeparator />
      <FAQSection />
      <SectionSeparator />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
