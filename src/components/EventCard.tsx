import React from "react";
import { EcosystemEvent } from "../types";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const EventCard: React.FC<{ event: EcosystemEvent }> = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-surface border border-border-default rounded-xl p-4 md:p-5 flex gap-5 items-start hover:border-border-strong transition-all"
    >
      <div className="bg-surface2 rounded-xl py-3 px-4 text-center flex-shrink-0 min-w-[64px]">
        <div className="font-display text-2xl font-extrabold text-accent2 leading-none">{event.day}</div>
        <div className="text-[0.68rem] text-text-muted uppercase tracking-widest mt-1 font-bold">{event.month}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[0.92rem] leading-tight">{event.title}</h3>
        <div className="flex items-center gap-1.5 text-[0.78rem] text-text-muted mt-1.5">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
        <p className="text-[0.78rem] text-text-secondary mt-2 leading-relaxed">
          {event.desc}
        </p>
      </div>
      <div 
        className="hidden sm:inline-block text-[0.7rem] px-3 py-1 rounded-full font-bold uppercase tracking-wider flex-shrink-0"
        style={{ backgroundColor: `${event.typeColor}18`, color: event.typeColor }}
      >
        {event.type}
      </div>
    </motion.div>
  );
};

export default EventCard;
