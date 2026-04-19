import React from "react";
import { Job } from "../types";
import { motion } from "motion/react";
import { MapPin, Banknote, GraduationCap, Phone } from "lucide-react";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface border border-border-default rounded-xl p-5 hover:bg-surface2 hover:border-border-strong transition-all group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-11 h-11 rounded-lg flex items-center justify-center font-display text-sm font-extrabold flex-shrink-0 border border-border-strong"
          style={{ backgroundColor: `${job.color}18`, color: job.color }}
        >
          {job.initials}
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-[0.98rem] tracking-tight">{job.title}</h3>
          <p className="text-[0.78rem] text-text-muted">{job.company}</p>
        </div>
        <span className={`text-[0.68rem] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider
          ${job.type === 'Remote' ? 'bg-teal/10 text-teal' : 
            job.type === 'Internship' ? 'bg-amber/10 text-amber' : 
            job.type === 'Hybrid' ? 'bg-blue/10 text-blue' : 
            'bg-green/10 text-green'}`}
        >
          {job.type}
        </span>
      </div>
      
      <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-4 line-clamp-2">
        {job.desc}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 text-[0.7rem] px-2.5 py-1 rounded-full bg-blue/10 text-blue font-medium">
          <MapPin size={12} /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.7rem] px-2.5 py-1 rounded-full bg-amber/10 text-amber font-medium">
          <Banknote size={12} /> {job.salary}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.7rem] px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
          <GraduationCap size={12} /> {job.exp}
        </span>
      </div>
      
      <button 
        onClick={() => onApply(job)}
        className="w-full flex items-center justify-center gap-2 bg-teal/10 border border-teal/30 text-teal py-2.5 rounded-xl text-[0.82rem] font-bold hover:bg-teal/20 transition-all"
      >
        <Phone size={14} />
        Register & Apply
      </button>
    </motion.div>
  );
}
