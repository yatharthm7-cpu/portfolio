import { FadeIn } from '../components/FadeIn';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { BlockBurstButton } from '../components/BlockBurstButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  id: number;
  author: string;
  role: string;
  text: string;
};

function AddReviewForm({ onSubmit }: { onSubmit: (review: { author: string; role: string; text: string }) => void }) {
  const [newReview, setNewReview] = useState({ author: '', role: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;
    onSubmit(newReview);
    setNewReview({ author: '', role: '', text: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 rounded-[30px] p-8 sm:p-12 flex flex-col gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <div>
        <label className="block text-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">Name / Username</label>
        <input 
          type="text" 
          value={newReview.author}
          onChange={(e) => setNewReview({...newReview, author: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors"
          placeholder="Steve"
          required
        />
      </div>
      <div>
        <label className="block text-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">Role / Server (Optional)</label>
        <input 
          type="text" 
          value={newReview.role}
          onChange={(e) => setNewReview({...newReview, role: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors"
          placeholder="Owner, ExampleCraft"
        />
      </div>
      <div>
        <label className="block text-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">Review</label>
        <textarea 
          value={newReview.text}
          onChange={(e) => setNewReview({...newReview, text: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors min-h-[150px] resize-none"
          placeholder="Write your review here..."
          required
        />
      </div>
      <BlockBurstButton 
        type="submit"
        className="bg-white text-black font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-white/90 transition-colors mt-2"
      >
        Submit Review
      </BlockBurstButton>
    </form>
  );
}

const defaultTestimonials: Testimonial[] = [];

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'view' | 'add'>('view');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out old mock testimonials with IDs 1, 2, or 3
        return parsed.filter((t: Testimonial) => t.id > 3);
      }
    } catch (e) {
      console.error("Error reading testimonials from localStorage", e);
    }
    return defaultTestimonials;
  });

  const handleAddReview = (newReview: { author: string; role: string; text: string }) => {
    const updated = [{ id: Date.now(), ...newReview }, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem('testimonials', JSON.stringify(updated));
    } catch (e) {
      console.error("Error writing testimonials to localStorage", e);
    }
    setCurrentIndex(0); // Reset index to the newly added review
    setActiveTab('view');
  };

  const safeIndex = Math.min(currentIndex, Math.max(0, testimonials.length - 1));
  const activeTestimonial = testimonials[safeIndex];

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-background px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] mb-8 sm:mb-12 text-foreground">
            Testimonials
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20} className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-white/5 p-1 rounded-full inline-flex border border-white/10">
            <BlockBurstButton 
              onClick={() => setActiveTab('view')}
              className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'view' ? 'bg-white text-black' : 'text-foreground/70 hover:text-white'}`}
            >
              Endorsements
            </BlockBurstButton>
            <BlockBurstButton 
              onClick={() => setActiveTab('add')}
              className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'add' ? 'bg-white text-black' : 'text-foreground/70 hover:text-white'}`}
            >
              Add a Review
            </BlockBurstButton>
          </div>
        </FadeIn>

        {activeTab === 'view' ? (
          <FadeIn delay={0.2} y={20} className="w-full flex flex-col items-center">
             {testimonials.length > 0 && activeTestimonial ? (
               <div className="w-full max-w-2xl flex flex-col items-center">
                 {/* Testimonial Card */}
                 <motion.div 
                   key={activeTestimonial.id}
                   initial={{ opacity: 0, scale: 0.95, y: 15 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   transition={{ duration: 0.3, ease: "easeOut" }}
                   className="w-full bg-white/[0.02] border border-white/5 rounded-[30px] p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col justify-between min-h-[260px] relative"
                 >
                   <div>
                     <p className="text-foreground/90 italic text-xl sm:text-2xl leading-relaxed relative z-10 pl-2">
                       "{activeTestimonial.text}"
                     </p>
                   </div>
                   <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-6">
                     <div>
                       <div className="text-foreground font-bold uppercase tracking-wider text-lg">{activeTestimonial.author}</div>
                       {activeTestimonial.role && (
                         <div className="text-foreground/50 text-sm uppercase tracking-widest mt-1">{activeTestimonial.role}</div>
                       )}
                     </div>
                     <div className="text-foreground/30 text-xs font-mono tracking-widest uppercase">
                       {safeIndex + 1} of {testimonials.length}
                     </div>
                   </div>
                 </motion.div>

                 {/* Pagination Controls */}
                 {testimonials.length > 1 && (
                   <div className="flex gap-4 mt-8">
                     <button 
                       onClick={handlePrev}
                       className="p-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-white/20 text-foreground/70 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                       title="Previous testimonial"
                     >
                       <ChevronLeft className="w-6 h-6" />
                     </button>
                     <button 
                       onClick={handleNext}
                       className="p-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-white/20 text-foreground/70 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                       title="Next testimonial"
                     >
                       <ChevronRight className="w-6 h-6" />
                     </button>
                   </div>
                 )}
               </div>
             ) : (
               <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-[30px] w-full max-w-2xl">
                 <p className="text-foreground/50 italic text-lg mb-6">No endorsements yet.</p>
                 <BlockBurstButton 
                   onClick={() => setActiveTab('add')}
                   className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                 >
                   Be the first to review
                 </BlockBurstButton>
               </div>
             )}
          </FadeIn>
        ) : (
          <FadeIn delay={0.2} y={20} className="max-w-2xl mx-auto">
            <AddReviewForm onSubmit={handleAddReview} />
          </FadeIn>
        )}
      </div>
    </section>
  );
}
