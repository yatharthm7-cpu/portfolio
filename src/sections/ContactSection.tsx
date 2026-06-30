import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from '../components/FadeIn';

import { BlockBurstButton } from '../components/BlockBurstButton';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('error');
      setErrorMessage('Web3Forms Access Key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to your environment variables.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Convert to JSON
    const object = Object.fromEntries(formData.entries());
    object.access_key = accessKey;
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          form.reset();
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="bg-background px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] mb-6 text-foreground">
            Let's Talk
          </h2>
          <p className="text-center text-foreground/60 text-lg mb-16 max-w-2xl mx-auto uppercase tracking-widest font-light">
            Ready to elevate your community? Reach out for staffing inquiries or custom development projects.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <div className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-[30px] shadow-xl backdrop-blur-sm">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground mb-2">Message Sent</h3>
                <p className="text-foreground/60">Thank you for reaching out. I'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-light">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-foreground/80 uppercase tracking-widest text-xs font-bold pl-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-foreground/80 uppercase tracking-widest text-xs font-bold pl-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-foreground/80 uppercase tracking-widest text-xs font-bold pl-1">Subject</label>
                  <select 
                    id="subject" 
                    name="subject"
                    required
                    defaultValue=""
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light appearance-none"
                  >
                    <option value="" disabled className="text-black">Select an inquiry type</option>
                    <option value="staffing" className="text-black">Staffing & Server Management</option>
                    <option value="discord" className="text-black">Discord Server Setup</option>
                    <option value="development" className="text-black">Custom Web/Bot Development</option>
                    <option value="other" className="text-black">Other Inquiry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-foreground/80 uppercase tracking-widest text-xs font-bold pl-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={5}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light resize-none"
                    placeholder="Tell me about your project or community..."
                  />
                </div>

                <BlockBurstButton 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm py-5 rounded-xl hover:bg-white/90 focus:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[60px]"
                >
                  {status === 'submitting' ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                    />
                  ) : (
                    "Send Message"
                  )}
                </BlockBurstButton>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
