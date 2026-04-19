import React, { useState, useMemo } from "react";
import { JOBS } from "../constants";
import { Job } from "../types";
import JobCard from "../components/JobCard";
import { Search, BriefcaseBusiness, Users, Banknote, MapPin } from "lucide-react";

export default function Jobs({ onApply }: { onApply: (j: Job) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Engineering", "Product", "Design", "Sales", "Operations", "Data"];

  const filtered = useMemo(() => {
    return JOBS.filter(j => {
      const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.company.toLowerCase().includes(search.toLowerCase()) ||
                          j.desc.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || j.category === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
      <div className="mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">💡 The Talent Hub</span>
        <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter">Jobs at Hyderabad Startups</h1>
        <p className="text-lg text-text-secondary mt-4 max-w-xl">
          Build the future of India from the heart of Telangana. 48+ open roles at the city's fastest-growing venture-backed startups.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-surface border border-border-default rounded-2xl p-6 text-center">
          <div className="text-2xl font-display font-bold text-teal mb-1">48+</div>
          <div className="text-[0.7rem] text-text-muted font-bold uppercase tracking-widest">Open Positions</div>
        </div>
        <div className="bg-surface border border-border-default rounded-2xl p-6 text-center">
          <div className="text-2xl font-display font-bold text-blue mb-1">16</div>
          <div className="text-[0.7rem] text-text-muted font-bold uppercase tracking-widest">Hiring Companies</div>
        </div>
        <div className="bg-surface border border-border-default rounded-2xl p-6 text-center">
          <div className="text-2xl font-display font-bold text-amber mb-1">₹60L</div>
          <div className="text-[0.7rem] text-text-muted font-bold uppercase tracking-widest">Highest Salary</div>
        </div>
        <div className="bg-surface border border-border-default rounded-2xl p-6 text-center">
          <div className="text-2xl font-display font-bold text-accent2 mb-1">Remote+</div>
          <div className="text-[0.7rem] text-text-muted font-bold uppercase tracking-widest">Hybrid Roles</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-12 sticky top-[72px] z-50 bg-bg py-4 border-b border-border-default">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border-strong rounded-xl pl-12 pr-4 py-3.5 text-text-primary text-[0.95rem] outline-none focus:border-accent transition-all placeholder:text-text-muted"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-3 rounded-xl text-[0.85rem] font-bold whitespace-nowrap border transition-all
                ${filter === cat 
                  ? 'bg-teal/15 border-teal text-teal shadow-lg shadow-teal/10' 
                  : 'bg-surface border-border-strong text-text-secondary hover:text-text-primary hover:border-border-default'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((j) => {
          const Card: any = JobCard;
          return <Card key={j.id} job={j} onApply={onApply} />;
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <div className="text-5xl mb-4 opacity-50">👩‍💻</div>
          <h3 className="text-xl font-bold mb-2">No jobs matched your criteria</h3>
          <p className="text-text-muted">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
