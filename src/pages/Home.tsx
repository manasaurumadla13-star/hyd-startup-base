import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Globe, Loader2 } from "lucide-react";
import { STARTUPS, JOBS, EVENTS } from "../constants";
import { supabase } from "../lib/supabase";

export default function Home({ onPageChange, onListStartup }: { onPageChange: (p: string) => void, onListStartup: () => void }) {
  const [counts, setCounts] = useState({
    startups: STARTUPS.length,
    jobs: JOBS.length,
    events: EVENTS.length,
    capital: 2100 // Default Cr
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [
          { count: sCount },
          { count: jCount },
          { count: eCount },
          { data: startupData }
        ] = await Promise.all([
          supabase.from('startups').select('*', { count: 'exact', head: true }),
          supabase.from('jobs').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('startups').select('funding')
        ]);

        // Helper to parse funding like "$307M" or "₹500Cr"
        const parseFunding = (f: string | null) => {
          if (!f) return 0;
          const num = parseFloat(f.replace(/[^0-9.]/g, ''));
          if (isNaN(num)) return 0;
          if (f.toLowerCase().includes('cr')) return num; // Already in Cr
          if (f.toLowerCase().includes('m')) return num * 0.083; // $M to ₹Cr (roughly 1 $M = 8.3 Cr)
          return num;
        };

        const dbStartupsTotal = sCount || 0;
        const dbJobsTotal = jCount || 0;
        const dbEventsTotal = eCount || 0;

        // Sum capital from constants and DB
        let totalCapital = STARTUPS.reduce((acc, s) => acc + parseFunding(s.funding), 0);
        if (startupData) {
          totalCapital += startupData.reduce((acc, s) => acc + parseFunding(s.funding), 0);
        }

        setCounts({
          startups: STARTUPS.length + dbStartupsTotal,
          jobs: JOBS.length + dbJobsTotal,
          events: EVENTS.length + dbEventsTotal,
          capital: Math.round(totalCapital)
        });
      } catch (err) {
        console.error("Stats Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  const stats = [
    { label: "Active Startups", value: counts.startups.toString() },
    { label: "Capital Deployed", value: `₹${counts.capital.toLocaleString()}Cr+` },
    { label: "Open Jobs", value: counts.jobs.toString() },
    { label: "Events / Year", value: counts.events.toString() }
  ];

  const highlights = [
    { icon: "🦄", title: "Darwinbox hits $1B+ valuation", desc: "Hyderabad's only unicorn closes $307M Series D. The HR SaaS platform now serves 350+ global enterprises.", tag: "SaaS · Unicorn" },
    { icon: "🚀", title: "Skyroot launches on SpaceX Falcon", desc: "Successfully deployed India's first private commercial payload via SpaceX Falcon — a watershed moment.", tag: "SpaceTech · Series C" },
    { icon: "☀️", title: "Fourth Partner: $710M total funding", desc: "India's #1 C&I solar company expands to 15+ states with over 1GW operational capacity.", tag: "CleanTech · Series D" },
    { icon: "🌾", title: "Marut Drones scales to 10k acres/day", desc: "India's agri-drone leader now covers record acreage daily with its autonomous precision fleet.", tag: "AgriTech · Series B" },
    { icon: "🏆", title: "T-Hub crosses 2,000 startups", desc: "The world's largest incubator hit a milestone in 2025, reaching 2,000+ portfolio companies.", tag: "Ecosystem · Milestone" },
    { icon: "💡", title: "48+ new jobs listed", desc: "From ML engineers to drone ops — Hyderabad startups are on a hiring spree. Roles up to ₹60L.", tag: "Careers · Hiring" }
  ];

  const ecostats = [
    { num: counts.startups.toString(), lbl: "Active Startups across 12 sectors" },
    { num: "2,000+", lbl: "T-Hub portfolio companies" },
    { num: "1", lbl: "Unicorn — Darwinbox valued at $1B+" },
    { num: "#4", lbl: "India startup ecosystem rank 2025" },
    { num: counts.events.toString(), lbl: "Startup events & summits per year" }
  ];

  const features = [
    { icon: "🏢", title: "Startup Directory", desc: "Browse Hyderabad startups. Fetch live data straight from their websites using AI.", link: "startups", arrow: "Explore Startups →", bg: "rgba(124,106,247,0.12)" },
    { icon: "💼", title: "Investor Network", desc: "Connect with top VCs, angel networks, and funds backing Hyderabad's next unicorns.", link: "investors", arrow: "Meet Investors →", bg: "rgba(29,213,160,0.1)" },
    { icon: "📅", title: "Events Calendar", desc: `Stay on top of pitch nights, hackathons, and summits happening in Hyderabad.`, link: "events", arrow: "View Events →", bg: "rgba(91,164,245,0.1)" },
    { icon: "💡", title: "Jobs at Startups", desc: `Discover open roles at the city's fastest-growing startups. Apply in seconds with our register flow.`, link: "jobs", arrow: "Browse Jobs →", bg: "rgba(29,213,160,0.1)" },
    { icon: "✉️", title: "Get in Touch", desc: "List your startup, promote an event, or explore partnerships. Our AI gets you a reply instantly.", link: "contact", arrow: "Contact Us →", bg: "rgba(232,121,176,0.1)" },
    { icon: "🚀", title: "Join the Portal", desc: "Create your free account to save startups, track investor activity, and get event alerts.", bg: "rgba(245,166,35,0.1)", arrow: "Sign Up Free →" },
    { icon: "🏢", title: "List Your Startup", desc: "Get featured on our directory. Reach thousands of local investors and talent instantly.", action: true, arrow: "List Now →", bg: "rgba(29,213,160,0.15)" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-64px-40px)] flex items-center overflow-hidden px-4 md:px-8 py-20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-150px] right-[10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(124,106,247,0.12)_0%,transparent_65%)] pointer-events-none blur-3xl opacity-50" />
        <div className="absolute bottom-[-100px] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(29,213,160,0.07)_0%,transparent_65%)] pointer-events-none blur-3xl opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-sm font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Hyderabad ranked #4 startup ecosystem — StartupBlink 2025
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.05em] mb-8 text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent2 to-teal drop-shadow-sm">
              Where Bold Ideas Meet Real Capital
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
              Discover Hyderabad's local startups, connect with visionary investors, explore open jobs, and be part of India's fastest-growing innovation hub — Cyberabad.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => onPageChange('startups')}
                className="px-8 py-4 bg-gradient-to-r from-accent to-[#6457d4] text-white rounded-xl font-bold text-lg hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/40 shadow-xl shadow-accent/35 transition-all flex items-center gap-2"
              >
                Explore Startups <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onPageChange('jobs')}
                className="px-8 py-4 bg-surface border border-border-strong text-text-primary rounded-xl font-bold text-lg hover:border-accent hover:translate-y-[-2px] transition-all"
              >
                Browse Jobs
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-col gap-3 pr-12">
            {[
              { name: "Darwinbox", sub: "HR SaaS · Unicorn 🦄", amount: "$307M raised", color: "#7c6af7", initials: "DB", progress: 92, pill: "🟢 Currently Hiring", pillBg: "rgba(29,213,160,0.1)", pillColor: "var(--teal)" },
              { name: "Skyroot Aerospace", sub: "SpaceTech · Series C", amount: "$95.1M raised", color: "#5ba4f5", initials: "SA", progress: 72, pill: "🚀 India's first private rocket", pillBg: "rgba(91,164,245,0.1)", pillColor: "var(--blue)" },
              { name: "Fourth Partner Energy", sub: "CleanTech · Series D", amount: "$710M+ raised", color: "#f5a623", initials: "FP", progress: 98, pill: "☀️ India's #1 C&I Solar", pillBg: "rgba(245,166,35,0.1)", pillColor: "var(--amber)" }
            ].map((s, i) => (
              <motion.div
                key={i}
                className={`bg-surface border border-border-strong rounded-[14px] p-5 shadow-2xl animate-float`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-[0.75rem] font-extrabold flex-shrink-0 border border-border-strong"
                    style={{ backgroundColor: `${s.color}18`, color: s.color }}
                  >
                    {s.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[0.88rem] text-text-primary leading-tight">{s.name}</h3>
                    <p className="text-[0.72rem] text-text-muted">{s.sub}</p>
                  </div>
                </div>
                <div className="font-display text-[1.1rem] font-extrabold text-amber mt-1.5">{s.amount}</div>
                <div className="h-1 bg-surface2 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-teal animate-shimmer" style={{ width: `${s.progress}%` }} />
                </div>
                <div>
                  <span className="inline-flex mt-2 items-center gap-1.5 text-[0.7rem] px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: s.pillBg, color: s.pillColor }}>
                    {s.pill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Strip */}
      <section className="bg-bg2 border-y border-border-default py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-[0.7rem] block mb-2">🏙️ Hyderabad Ecosystem</span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight mb-2 text-text-primary">Cyberabad by the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            {ecostats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent2 to-teal mb-2">{s.num}</div>
                <div className="text-[0.75rem] text-text-muted leading-snug font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem DNA */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-[0.7rem] block mb-2">🏙️ The DNA of Cyberabad</span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[1.1] mb-8 text-text-primary">
              Why Founders are Flocking to Hyderabad
            </h2>
            <div className="space-y-8">
              {[
                { icon: "🎯", title: "Infrastructure-First", desc: "Home to T-Hub, the world's largest startup incubator, and world-class campuses of tech giants." },
                { icon: "⚡", title: "Active Governance", desc: "Telangana state's startup policies are designed to reduce friction and accelerate growth across all sectors." },
                { icon: "👥", title: "Talent Density", desc: "Proximity to top institutions like IIIT-H, ISB, and IIT-H ensures a steady stream of elite tech and business talent." },
                { icon: "🏆", title: "Quality of Living", desc: "Consistently ranked as one of India's most liveable cities with a perfect balance of work and lifestyle." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-border-strong flex items-center justify-center flex-shrink-0 text-xl shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-text-primary">{item.title}</h4>
                    <p className="text-[0.92rem] text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-surface border border-border-strong rounded-3xl p-8 flex flex-col justify-center text-center shadow-xl">
                <div className="font-display text-5xl md:text-6xl font-extrabold text-teal mb-2 underline decoration-accent decoration-4">2,000+</div>
                <div className="text-[0.7rem] text-text-muted font-bold uppercase tracking-widest leading-snug">T-Hub Startups</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-gradient-to-br from-accent to-accent2 rounded-3xl p-8 flex flex-col justify-center text-center text-white shadow-2xl shadow-accent/20">
                <div className="font-display text-5xl md:text-6xl font-extrabold mb-2 tracking-tighter">#4</div>
                <div className="text-[0.7rem] font-bold uppercase tracking-widest leading-snug opacity-90">Ranked ecosystem in India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-accent font-bold uppercase tracking-widest text-[0.7rem] block mb-2">🔍 What You Can Do</span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight mb-2 leading-none text-text-primary">Everything the Ecosystem Needs</h2>
          <p className="text-text-secondary text-[0.95rem] max-w-lg mt-4">One portal for founders, investors, job seekers and startup enthusiasts across Hyderabad.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (f.link) onPageChange(f.link);
                if (f.action && onListStartup) onListStartup();
              }}
              className="bg-surface border border-border-default rounded-2xl p-8 hover:bg-surface2 hover:border-border-strong cursor-pointer transition-all flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-black/20" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-[1.1rem] mb-2 text-text-primary tracking-tight">{f.title}</h3>
              <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-6">{f.desc}</p>
              <div className="mt-auto text-[0.8rem] text-accent2 font-bold flex items-center gap-1 group">
                {f.arrow}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-bg2 py-24 px-4 md:px-8 border-y border-border-default">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-[0.7rem] block mb-2">⚡ Latest From the Ecosystem</span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight mb-2 leading-none text-text-primary">Hyderabad Making Headlines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface border border-border-default rounded-xl p-6 flex gap-4 items-start hover:border-border-strong transition-all"
              >
                <div className="text-2xl mt-1 flex-shrink-0">{h.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-[0.95rem] mb-1 text-text-primary">{h.title}</h3>
                  <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-3">{h.desc}</p>
                  <span className="inline-block text-[0.7rem] px-3 py-1 rounded-full font-bold bg-accent/10 text-accent2 border border-accent/15">
                    {h.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-accent/15 to-teal/10 border border-accent/20 rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-accent/10">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Globe size={280} />
          </div>
          <div className="text-5xl mb-6 scale-150 inline-block">🌟</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-8 max-w-4xl mx-auto leading-none text-text-primary">
            Ready to Join Hyderabad's Startup Revolution?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 font-medium">
            Whether you're a founder raising capital, an investor scouting deals, or a talent looking for your dream role — you're in the right place.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button 
              onClick={() => onPageChange('startups')}
              className="px-10 py-5 bg-gradient-to-r from-accent to-[#6457d4] text-white rounded-xl font-extrabold text-[1.05rem] hover:translate-y-[-2px] transition-all shadow-2xl shadow-accent/40"
            >
              Explore {counts.startups} Startups
            </button>
            <button 
              onClick={() => onPageChange('jobs')}
              className="px-10 py-5 bg-surface border border-border-strong text-text-primary rounded-xl font-extrabold text-[1.05rem] hover:border-accent hover:translate-y-[-2px] transition-all"
            >
              Find a Job
            </button>
            <button 
              onClick={onListStartup}
              className="px-10 py-5 bg-white text-bg rounded-xl font-extrabold text-[1.05rem] hover:bg-slate-100 transition-all shadow-2xl shadow-white/10"
            >
              List Your Startup
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
