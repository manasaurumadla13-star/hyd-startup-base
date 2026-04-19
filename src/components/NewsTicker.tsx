import React from "react";
import { Smartphone } from "lucide-react";

export default function NewsTicker() {
  const news = [
    { name: "Darwinbox", info: "$307M Series D · Hyderabad's only unicorn" },
    { name: "Keka HR", info: "$57M Series A raised · fastest-growing HR SaaS" },
    { name: "Skyroot Aerospace", info: "$95M Series C · India's first private rocket company" },
    { name: "Dhruva Space", info: "first commercial SpaceX launch 2025" },
    { name: "Fourth Partner Energy", info: "$710M+ total funding · India's #1 C&I solar" },
    { name: "T-Hub", info: "world's largest startup incubator · 2,000+ startups" },
    { name: "STPI Hyderabad", info: "₹1.4 lakh crore IT exports FY 2024-25" },
    { name: "Marut Drones", info: "India's leading agri-drone company · Series B" }
  ];

  return (
    <div className="bg-surface border-b border-border-default h-10 overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-ticker gap-12 px-6">
        {[...news, ...news].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[0.8rem] text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-bold text-text-primary underline decoration-accent/30 decoration-2 underline-offset-4">{item.name}</span>
            <span>{item.info}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
