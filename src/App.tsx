import React, { useState, useCallback, useEffect } from 'react';
import { supabase, signIn, signUp, signOut } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';
import DetailPanel from './components/DetailPanel';
import { Modal, InputField, SelectField, TextAreaField, PrimaryButton } from './components/Modals';
import { Startup, Job, StartupDetail } from './types';
import { getStartupLiveDetails, getJobConfirmation } from './lib/gemini';
import { AnimatePresence, motion } from 'motion/react';

// Pages
import Home from './pages/Home';
import Startups from './pages/Startups';
import Investors from './pages/Investors';
import Events from './pages/Events';
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [startupDetails, setStartupDetails] = useState<StartupDetail | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  // Auth & Session state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '', fullName: '' });

  // Modal states
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [applyingJob, setApplyingJob] = useState(false);

  // Handle Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authModal === 'signup') {
        const { error } = await signUp(authForm.email, authForm.password, authForm.fullName);
        if (error) throw error;
        alert("Verification Email Sent! Please check your inbox (and spam folder) to confirm your account.");
      } else {
        const { error } = await signIn(authForm.email, authForm.password);
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            throw new Error("Email not confirmed. Please check your inbox for the verification link.");
          }
          throw error;
        }
      }
      setAuthModal(null);
      setAuthForm({ email: '', password: '', fullName: '' });
    } catch (err: any) {
      setAuthError(err.message || "An authentication error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Application form state
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', currentRole: '' });

  const handlePageChange = useCallback((page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewStartup = async (startup: Startup) => {
    setSelectedStartup(startup);
    setStartupDetails(null);
    setLoadingDetails(true);
    
    const details = await getStartupLiveDetails(startup.name, startup.website, startup.category);
    setStartupDetails(details);
    setLoadingDetails(false);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob || !applyForm.name || !applyForm.phone) return;

    setApplyingJob(true);
    
    try {
      // 1. Save to Database
      const { error: dbError } = await supabase
        .from('job_applications')
        .insert([{
          user_id: user?.id || null, // Allow guest applications or linked to user
          job_id: applyJob.id,
          job_title: applyJob.title,
          company_name: applyJob.company,
          applicant_name: applyForm.name,
          phone_number: applyForm.phone,
          experience_level: applyForm.currentRole
        }]);

      if (dbError) throw dbError;

      // 2. Generate AI Confirmation
      const confirmation = await getJobConfirmation(
        applyForm.name,
        applyForm.phone,
        applyForm.currentRole,
        applyJob.title,
        applyJob.company
      );
      setApplySuccess(confirmation);
      setApplyForm({ name: '', phone: '', currentRole: '' });
    } catch (err) {
      console.error("Application Error:", err);
      alert("Failed to submit application. Please check your connection.");
    } finally {
      setApplyingJob(false);
    }
  };

  const [listForm, setListForm] = useState({ name: '', category: '', desc: '', founder: '', website: '' });
  const [listingStartup, setListingStartup] = useState(false);

  const handleListStartupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthModal('login');
      return;
    }
    
    setListingStartup(true);
    try {
      const { error } = await supabase
        .from('startups')
        .insert([{
          name: listForm.name,
          category: listForm.category,
          description: listForm.desc,
          founder: listForm.founder,
          website: listForm.website,
          initials: listForm.name.substring(0,2).toUpperCase(),
          color: '#7c6af7',
          created_by: user.id
        }]);

      if (error) throw error;
      setListForm({ name: '', category: '', desc: '', founder: '', website: '' });
      setListModalOpen(false);
      alert("Startup listed successfully! It will appear in the directory.");
    } catch (err) {
      console.error("Listing Error:", err);
    } finally {
      setListingStartup(false);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onPageChange={handlePageChange} onListStartup={() => setListModalOpen(true)} />;
      case 'startups': return <Startups onViewDetails={handleViewStartup} />;
      case 'investors': return <Investors />;
      case 'events': return <Events />;
      case 'jobs': return <Jobs onApply={setApplyJob} />;
      case 'contact': return <Contact />;
      default: return <Home onPageChange={handlePageChange} onListStartup={() => setListModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 flex flex-col">
      <Navbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        onAuth={setAuthModal}
        user={user}
        onSignOut={handleSignOut}
      />
      <NewsTicker />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onPageChange={handlePageChange} />

      {/* Detail Panel for Startups */}
      <DetailPanel 
        startup={selectedStartup}
        details={startupDetails}
        loading={loadingDetails}
        onClose={() => setSelectedStartup(null)}
      />

      {/* Auth Modals */}
      <Modal 
        isOpen={authModal !== null} 
        onClose={() => { setAuthModal(null); setAuthError(null); }} 
        title={authModal === 'login' ? "Welcome Back 👋" : "Join the Portal 🚀"}
      >
        <form onSubmit={handleAuthSubmit}>
          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center">
              {authError}
            </div>
          )}
          
          {authModal === 'signup' && (
            <InputField 
              type="text" 
              placeholder="Full Name" 
              required
              value={authForm.fullName}
              onChange={e => setAuthForm({ ...authForm, fullName: e.target.value })}
            />
          )}
          
          <InputField 
            type="email" 
            placeholder="Your Email Address" 
            required
            value={authForm.email}
            onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
          />
          <InputField 
            type="password" 
            placeholder="Password" 
            required
            value={authForm.password}
            onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
          />
          
          <PrimaryButton type="submit" loading={authLoading}>
            {authModal === 'login' ? "Login to Profile" : "Create My Account"}
          </PrimaryButton>
        </form>
        
        <p className="mt-6 text-center text-[0.8rem] text-text-muted">
          {authModal === 'login' ? (
            <>Don't have an account? <button onClick={() => setAuthModal('signup')} className="text-accent font-bold">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setAuthModal('login')} className="text-accent font-bold">Log in</button></>
          )}
        </p>
      </Modal>

      {/* List Startup Modal */}
      <Modal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        title="List Your Startup 🏢"
      >
        <form onSubmit={handleListStartupSubmit}>
          <InputField 
            placeholder="Startup Name *" 
            required
            value={listForm.name}
            onChange={e => setListForm({ ...listForm, name: e.target.value })}
          />
          <SelectField 
            defaultValue="" 
            required
            value={listForm.category}
            onChange={e => setListForm({ ...listForm, category: e.target.value })}
          >
            <option value="" disabled>Select Category *</option>
            <option value="SaaS">SaaS</option>
            <option value="FinTech">FinTech</option>
            <option value="Health">Health</option>
            <option value="SpaceTech">SpaceTech</option>
            <option value="AgriTech">AgriTech</option>
            <option value="AI">AI</option>
          </SelectField>
          <TextAreaField 
            placeholder="Short description of what you are building..." 
            value={listForm.desc}
            onChange={e => setListForm({ ...listForm, desc: e.target.value })}
          />
          <InputField 
            placeholder="Founder Name" 
            value={listForm.founder}
            onChange={e => setListForm({ ...listForm, founder: e.target.value })}
          />
          <InputField 
            placeholder="Website URL" 
            value={listForm.website}
            onChange={e => setListForm({ ...listForm, website: e.target.value })}
          />
          <PrimaryButton type="submit" loading={listingStartup}>
            {user ? "Submit For Review →" : "Login to List Startup"}
          </PrimaryButton>
        </form>
      </Modal>

      {/* Job Apply Modal */}
      <Modal
        isOpen={applyJob !== null}
        onClose={() => { setApplyJob(null); setApplySuccess(null); }}
        title="Apply for Mission 🚀"
      >
        {applyJob && (
          <div className="mb-6 flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border-strong">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-base flex-shrink-0"
              style={{ backgroundColor: `${applyJob.color}18`, color: applyJob.color }}
            >
              {applyJob.initials}
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight">{applyJob.title}</div>
              <div className="text-xs text-text-muted mt-0.5">{applyJob.company} · {applyJob.location}</div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {applySuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6">
                <div className="text-teal font-bold uppercase tracking-widest text-[0.7rem] mb-2">✅ Application Confirmed</div>
                <p className="text-[0.9rem] leading-relaxed text-text-primary whitespace-pre-wrap">
                  {applySuccess}
                </p>
              </div>
              <PrimaryButton onClick={() => { setApplyJob(null); setApplySuccess(null); }}>
                Back to Jobs
              </PrimaryButton>
            </motion.div>
          ) : (
            <form onSubmit={handleApply}>
              <p className="text-[0.85rem] text-text-secondary mb-6 leading-relaxed">
                Register your interest below. Our hiring team will review your profile and contact you within 48 business hours.
              </p>
              <InputField 
                placeholder="Your Full Name *" 
                required 
                value={applyForm.name}
                onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
              />
              <InputField 
                placeholder="Phone Number (e.g. +91 98765 43210) *" 
                required 
                value={applyForm.phone}
                onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
              />
              <InputField 
                placeholder="Current Role / Experience Level" 
                value={applyForm.currentRole}
                onChange={e => setApplyForm({ ...applyForm, currentRole: e.target.value })}
              />
              <PrimaryButton type="submit" loading={applyingJob}>
                Confirm & Apply
              </PrimaryButton>
            </form>
          )}
        </AnimatePresence>
      </Modal>

      {/* Floating CTA for listing startup when on Startups page */}
      {activePage === 'startups' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={() => setListModalOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-accent text-white px-6 py-4 rounded-2xl font-bold shadow-2xl shadow-accent/40 flex items-center gap-2 hover:bg-accent2 transition-all hover:scale-105 active:scale-95"
        >
          <span>List Your Startup</span>
          <span className="text-xl">+</span>
        </motion.button>
      )}
    </div>
  );
}
