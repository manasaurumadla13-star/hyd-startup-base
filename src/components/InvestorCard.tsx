import React from "react";
import { Investor } from "../types";
import { motion } from "motion/react";

const InvestorCard: React.FC<{ investor: Investor }> = ({ investor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-surface border border-border-default rounded-xl p-5 hover:bg-surface2 hover:border-border-strong transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xs font-extrabold flex-shrink-0"
          style={{ backgroundColor: `${investor.color}18`, color: investor.color }}
        >
          {investor.initials}
        </div>
        <div>
          <h3 className="font-bold text-[0.93rem] leading-tight">{investor.name}</h3>
          <p className="text-[0.74rem] text-text-muted mt-0.5">{investor.type}</p>
        </div>
      </div>
      <p className="text-[0.8rem] text-text-secondary mb-2 leading-relaxed">
        {investor.focus}
      </p>
      <p className="text-[0.75rem] text-teal font-medium">
        Portfolio: {investor.portfolio}
      </p>
    </motion.div>
  );
};

export default InvestorCard;
