import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { getContactAutoReply } from "../lib/gemini";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [aiReply, setAiReply] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    
    try {
      // 1. Save message to Supabase
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (dbError) throw dbError;

      // 2. Get AI Reply
      const reply = await getContactAutoReply(formData.name, formData.email, formData.message);
      setAiReply(reply);
      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact Submission Error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-bg2">
      <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">✉️ Get in Touch</span>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[1.1] mb-8">
              Let's Build the Future of Hyderabad Together.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-lg">
              Have a startup to list, an event to promote, or want to explore investment partnerships? Reach out and our community team will get back to you within 24 hours.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:hello@hydstartupportal.in" className="bg-surface border border-border-strong rounded-2xl p-6 hover:border-accent transition-colors group">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent2 mb-6 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div className="text-[0.67rem] text-text-muted uppercase tracking-widest mb-1 font-bold">Email Us</div>
                <div className="font-display font-bold text-accent2">hello@hydstartupportal.in</div>
                <p className="text-[0.77rem] text-text-muted mt-2">Startups · Investors · Partners</p>
              </a>
              <a href="tel:+914012345678" className="bg-surface border border-border-strong rounded-2xl p-6 hover:border-teal transition-colors group">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div className="text-[0.67rem] text-text-muted uppercase tracking-widest mb-1 font-bold">Call Us</div>
                <div className="font-display font-bold text-teal">+91 40 1234 5678</div>
                <p className="text-[0.77rem] text-text-muted mt-2">Mon – Fri · 9am – 6pm IST</p>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-3 text-text-muted text-[0.85rem]">
              <MapPin size={16} className="text-accent flex-shrink-0" />
              <span>T-Hub Phase 2, Raidurgam, HITEC City, Hyderabad, Telangana 500081</span>
            </div>
          </div>

          <div className="bg-surface border border-border-strong rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold mb-2">Send a Message</h3>
              <p className="text-[0.88rem] text-text-secondary mb-8">Fill in the details below — our AI assistant will craft a personalized response instantly.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  disabled={status === 'submitting'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface2 border border-border-strong rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                />
                <input
                  type="email"
                  placeholder="Your Email Address *"
                  disabled={status === 'submitting'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface2 border border-border-strong rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted"
                />
                <textarea
                  placeholder="Your Message — tell us about your project, idea or question… *"
                  rows={5}
                  disabled={status === 'submitting'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface2 border border-border-strong rounded-xl px-5 py-3.5 outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted resize-none"
                />
                
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-teal/5 border border-teal/20 rounded-xl p-5"
                    >
                      <div className="text-[0.72rem] font-bold text-teal uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Send size={12} /> Message Received — AI Reply
                      </div>
                      <p className="text-[0.88rem] text-text-primary leading-relaxed whitespace-pre-wrap">
                        {aiReply}
                      </p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="text-[0.8rem] text-teal underline mt-4 font-bold"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      exit={{ opacity: 0, scale: 0.95 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent2 transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
                      ) : (
                        <Send size={18} />
                      )}
                      {status === 'submitting' ? "Sending..." : "Send Message"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
