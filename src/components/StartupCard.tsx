import React from "react";
import { Startup } from "../types";
import { motion } from "motion/react";
import { Globe } from "lucide-react";

interface StartupCardProps {
  startup: Startup;
  index: number;
  onViewDetails: (startup: Startup) => void;
}

export default function StartupCard({ startup, index, onViewDetails }: StartupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-surface border border-border-default rounded-xl p-5 relative overflow-hidden group hover:bg-surface2 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-accent transition-colors duration-300" />
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-11 h-11 rounded-lg flex items-center justify-center font-display text-sm font-extrabold flex-shrink-0 border border-border-strong"
          style={{ backgroundColor: `${startup.color}18`, color: startup.color }}
        >
          {startup.initials}
        </div>
        <div>
          <h3 className="font-display font-bold text-[0.95rem] tracking-tight">{startup.name}</h3>
          <p className="text-[0.74rem] text-text-muted mt-0.5">Est. {startup.founded} · {startup.location.split(',')[0]}</p>
        </div>
      </div>
      <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-4 line-clamp-3">
        {startup.desc}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[0.7rem] px-2 py-0.5 rounded-full font-medium bg-accent/10 text-accent2">
            {startup.category}
          </span>
          <span className="text-[0.7rem] px-2 py-0.5 rounded-full font-medium bg-teal/10 text-teal">
            {startup.stage}
          </span>
        </div>
        <div className="font-display text-[0.78rem] font-bold text-amber">
          {startup.funding}
        </div>
      </div>
      
      <button 
        onClick={() => onViewDetails(startup)}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 text-accent2 py-2 rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors"
      >
        <Globe size={13} />
        View Live Details
      </button>
    </motion.div>
  );
}
