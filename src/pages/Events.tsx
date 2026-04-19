import React from "react";
import { EVENTS } from "../constants";
import EventCard from "../components/EventCard";

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
      <div className="mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">📅 Ecosystem Calendar</span>
        <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter">Upcoming Events</h1>
        <p className="text-lg text-text-secondary mt-4 max-w-xl">
          From pitch nights to mega-summits, stay on top of everything happening in Cyberabad from April to June 2026.
        </p>
      </div>

      <div className="space-y-4">
        {EVENTS.map((ev, i) => (
          <EventCard key={i} event={ev} />
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-surface to-surface2 border border-border-strong rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold mb-2">Hosting an event in Hyderabad?</h3>
          <p className="text-text-secondary max-w-md">Promote your meetup, hackathon or demo day to our community of 10,000+ ecosystem active users.</p>
        </div>
        <button className="px-8 py-4 bg-teal text-bg font-bold rounded-xl whitespace-nowrap hover:scale-105 transition-all">
          List Your Event +
        </button>
      </div>
    </div>
  );
}
