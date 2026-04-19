import React, { useState, useCallback } from 'react';
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
  
  // Modal states
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [applyingJob, setApplyingJob] = useState(false);

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
    const confirmation = await getJobConfirmation(
      applyForm.name,
      applyForm.phone,
      applyForm.currentRole,
      applyJob.title,
      applyJob.company
    );
    setApplySuccess(confirmation);
    setApplyingJob(false);
    setApplyForm({ name: '', phone: '', currentRole: '' });
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
        onClose={() => setAuthModal(null)} 
        title={authModal === 'login' ? "Welcome Back 👋" : "Join the Portal 🚀"}
      >
        <InputField type="email" placeholder="Your Email Address" />
        <InputField type="password" placeholder="Password" />
        <PrimaryButton onClick={() => setAuthModal(null)}>
          {authModal === 'login' ? "Login to Profile" : "Create My Account"}
        </PrimaryButton>
        <p className="mt-4 text-center text-xs text-text-muted">
          By continuing, you agree to our Terms of Service.
        </p>
      </Modal>

      {/* List Startup Modal */}
      <Modal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        title="List Your Startup 🏢"
      >
        <InputField placeholder="Startup Name *" />
        <SelectField defaultValue="">
          <option value="" disabled>Select Category *</option>
          <option value="SaaS">SaaS</option>
          <option value="FinTech">FinTech</option>
          <option value="Health">Health</option>
          <option value="SpaceTech">SpaceTech</option>
          <option value="AgriTech">AgriTech</option>
          <option value="AI">AI</option>
        </SelectField>
        <TextAreaField placeholder="Short description of what you are building..." />
        <InputField placeholder="Founder Name" />
        <InputField placeholder="Website URL" />
        <PrimaryButton onClick={() => setListModalOpen(false)}>
          Submit For Review →
        </PrimaryButton>
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
