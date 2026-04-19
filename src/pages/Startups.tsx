import React, { useState, useMemo } from "react";
import { STARTUPS } from "../constants";
import { Startup } from "../types";
import StartupCard from "../components/StartupCard";
import { Search } from "lucide-react";

export default function Startups({ onViewDetails }: { onViewDetails: (s: Startup) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "SaaS", "FinTech", "Health", "SpaceTech", "AgriTech", "CleanTech", "AI"];

  const filtered = useMemo(() => {
    return STARTUPS.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.desc.toLowerCase().includes(search.toLowerCase()) ||
                          s.founder.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || s.category === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 min-h-screen">
      <div className="mb-12 text-center md:text-left">
        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">🏢 Active Directory</span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Featured Startups</h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Discover companies reshaping industries from the City of Pearls. Click any card to fetch live data using Gemini AI.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10 sticky top-[72px] z-50 bg-bg py-4 border-b border-border-default">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search by name, founder, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border-strong rounded-xl pl-12 pr-4 py-3.5 text-text-primary text-[0.95rem] outline-none focus:border-accent transition-all placeholder:text-text-muted"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-3 rounded-xl text-[0.88rem] font-bold whitespace-nowrap border transition-all
                ${filter === cat 
                  ? 'bg-accent/15 border-accent text-accent2 shadow-lg shadow-accent/10' 
                  : 'bg-surface border-border-strong text-text-secondary hover:text-text-primary hover:border-border-default'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-[0.85rem] text-text-muted">
        Showing <strong>{filtered.length}</strong> of {STARTUPS.length} startups
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((s, i) => {
          const Card: any = StartupCard;
          return <Card key={s.name} startup={s} index={i} onViewDetails={onViewDetails} />;
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-32 text-center">
          <div className="text-5xl mb-4 opacity-50">🔍</div>
          <h3 className="text-xl font-bold mb-2">No startups matched your search</h3>
          <p className="text-text-muted">Try a different keyword or filter category.</p>
        </div>
      )}
    </div>
  );
}
