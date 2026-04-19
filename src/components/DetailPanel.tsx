import React from "react";
import { Startup, StartupDetail } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe, ExternalLink, Linkedin, Info, Users, Briefcase, Award, TrendingUp, Cpu } from "lucide-react";

interface DetailPanelProps {
  startup: Startup | null;
  details: StartupDetail | null;
  loading: boolean;
  onClose: () => void;
}

export default function DetailPanel({ startup, details, loading, onClose }: DetailPanelProps) {
  if (!startup) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-[460px] bg-bg2 border-l border-border-strong z-[160] overflow-y-auto flex flex-col shadow-2xl"
        >
          <div className="sticky top-0 bg-bg2 bg-opacity-95 backdrop-blur-md z-10 px-6 py-4 border-b border-border-default flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-lg flex items-center justify-center font-display text-base font-extrabold flex-shrink-0 border border-border-strong"
              style={{ backgroundColor: `${startup.color}18`, color: startup.color }}
            >
              {startup.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg leading-tight truncate">{startup.name}</h2>
              <p className="text-[0.74rem] text-text-muted mt-0.5 truncate">{startup.category} · {startup.stage} · {startup.funding}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface border border-border-strong text-text-secondary flex items-center justify-center hover:text-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <a 
              href={startup.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-surface border border-border-strong rounded-xl px-4 py-3 text-[0.85rem] text-accent2 font-medium hover:border-accent group transition-all"
            >
              <Globe size={16} />
              <span className="truncate flex-1">{startup.website.replace(/^https?:\/\//, '')}</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {loading ? (
              <div className="bg-accent/5 border border-accent/10 rounded-xl p-5 text-[0.85rem] space-y-2">
                <div className="flex items-center gap-2 text-accent2 font-bold">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu size={18} />
                  </motion.div>
                  AI Assistant is browsing...
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Gemini is visiting the official site to extract the latest valuation, news, and team details.
                </p>
              </div>
            ) : details ? (
              <>
                {details.tagline && (
                  <p className="text-lg font-medium italic text-text-primary border-l-4 border-accent pl-4 py-1 leading-relaxed">
                    "{details.tagline}"
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">Funding</div>
                    <div className="font-display font-bold text-amber">{details.funding || startup.funding}</div>
                  </div>
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">
                      {details.valuation ? 'Valuation' : 'Stage'}
                    </div>
                    <div className="font-display font-bold text-teal">{details.valuation || startup.stage}</div>
                  </div>
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">Team Size</div>
                    <div className="font-display font-bold">{details.employees || '—'}</div>
                  </div>
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">Customers</div>
                    <div className="font-display font-bold">{details.customers || 'Commercial'}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <section>
                    <h3 className="text-[0.67rem] font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Info size={12} /> About
                    </h3>
                    <p className="text-[0.88rem] text-text-secondary leading-relaxed">
                      {details.about}
                    </p>
                  </section>

                  {details.founders && details.founders.length > 0 && (
                    <section>
                      <h3 className="text-[0.67rem] font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Users size={12} /> Leadership
                      </h3>
                      <div className="space-y-3">
                        {details.founders.map((f, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div 
                              className="w-9 h-9 rounded-full flex items-center justify-center text-[0.7rem] font-bold border border-border-strong flex-shrink-0"
                              style={{ backgroundColor: `${startup.color}12`, color: startup.color }}
                            >
                              {f.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-[0.85rem] font-bold">{f.name}</div>
                              <div className="text-[0.72rem] text-text-muted">{f.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="pt-4 border-t border-border-default flex gap-3">
                  <a 
                    href={details.website || startup.website} 
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold text-[0.9rem] hover:bg-accent2 transition-colors"
                  >
                    Visit Website ↗
                  </a>
                  {details.linkedin && (
                    <a 
                      href={details.linkedin}
                      target="_blank"
                      className="flex items-center justify-center px-4 bg-surface border border-border-strong text-text-primary rounded-xl hover:bg-surface2 transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">Funding</div>
                    <div className="font-display font-bold text-amber">{startup.funding}</div>
                  </div>
                  <div className="bg-surface border border-border-default rounded-xl p-3">
                    <div className="text-[0.67rem] text-text-muted uppercase tracking-wider mb-1">Stage</div>
                    <div className="font-display font-bold text-teal">{startup.stage}</div>
                  </div>
                </div>
                <section>
                  <h3 className="text-[0.67rem] font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info size={12} /> About
                  </h3>
                  <p className="text-[0.85rem] text-text-secondary leading-relaxed">{startup.desc}</p>
                </section>
                <section>
                  <h3 className="text-[0.67rem] font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Users size={12} /> Founders
                  </h3>
                  <p className="text-[0.85rem] text-text-secondary">{startup.founder}</p>
                </section>
                <div className="pt-4 border-t border-border-default">
                  <a 
                    href={startup.website} 
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold text-[0.9rem] hover:bg-accent2 transition-colors"
                  >
                    Visit Website ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
