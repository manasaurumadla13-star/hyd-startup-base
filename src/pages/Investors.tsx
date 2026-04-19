import React from "react";
import { INVESTORS } from "../constants";
import InvestorCard from "../components/InvestorCard";

export default function Investors() {
  return (
    <div className="bg-bg2">
      <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
        <div className="mb-16 text-center">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">💼 Venture Capital & Angels</span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter">The Investor Network</h1>
          <p className="text-lg text-text-secondary mt-6 max-w-xl mx-auto">
            Connect with leading VC funds, growth firms, and angel networks fueling Hyderabad's next generation of category leaders.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {INVESTORS.map((inv, i) => (
            <InvestorCard key={i} investor={inv} />
          ))}
        </div>

        <div className="mt-20 p-12 bg-surface border border-border-strong rounded-3xl text-center">
          <h3 className="font-display text-2xl font-bold mb-4">Are you investing in Hyderabad?</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">Join our private network to get curated deal-flow and connects with top-vetted founders across the city.</p>
          <button className="px-8 py-3.5 bg-accent text-white rounded-xl font-bold hover:bg-accent2 transition-all">
            Join Invester Network
          </button>
        </div>
      </div>
    </div>
  );
}
