import { FadeIn } from '../components/FadeIn';
import { motion } from 'motion/react';
import React, { useState } from 'react';

type Testimonial = {
  id: number;
  author: string;
  role: string;
  text: string;
};

const initialTestimonials: Testimonial[] = [];

import { BlockBurstButton } from '../components/BlockBurstButton';

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

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'view' | 'add'>('view');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const handleAddReview = (newReview: { author: string; role: string; text: string }) => {
    setTestimonials([{ id: Date.now(), ...newReview }, ...testimonials]);
    setActiveTab('view');
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
          <FadeIn delay={0.2} y={20} className="w-full overflow-hidden">
             {testimonials.length > 0 ? (
               <>
                 {/* Scrolling Carousel */}
                 <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                    {testimonials.map((testimonial, i) => (
                      <motion.div 
                        key={testimonial.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="min-w-[85vw] sm:min-w-[400px] max-w-[500px] bg-white/[0.02] border border-white/5 rounded-[30px] p-8 sm:p-10 snap-center flex-shrink-0 flex flex-col justify-between"
                      >
                        <p className="text-foreground/80 italic mb-8 text-lg sm:text-xl leading-relaxed">"{testimonial.text}"</p>
                        <div>
                          <div className="text-foreground font-bold uppercase tracking-wider text-lg">{testimonial.author}</div>
                          <div className="text-foreground/50 text-sm uppercase tracking-widest mt-1">{testimonial.role}</div>
                        </div>
                      </motion.div>
                    ))}
                 </div>
                 <div className="text-center mt-4 text-foreground/30 text-xs uppercase tracking-widest">
                    Swipe to view more →
                 </div>
               </>
             ) : (
               <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-[30px]">
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
