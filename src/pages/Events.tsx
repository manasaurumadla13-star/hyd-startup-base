import React, { useState, useEffect, useMemo } from "react";
import { EVENTS } from "../constants";
import EventCard from "../components/EventCard";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export default function Events() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await supabase.from('events').select('*');
        if (data) setDbEvents(data);
      } catch (err) {
        console.error("Events fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const allEvents = useMemo(() => {
    const combined = [...EVENTS];
    dbEvents.forEach(dbE => {
      combined.push({
        day: dbE.day,
        month: dbE.month,
        title: dbE.title,
        venue: dbE.venue || "T-Hub, Hyderabad",
        type: dbE.type || "Meetup",
        typeColor: dbE.color || "var(--accent)"
      });
    });
    return combined;
  }, [dbEvents]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 min-h-screen">
      <div className="mb-16">
        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">📅 Ecosystem Calendar</span>
        <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter flex items-center gap-4">
          Upcoming Events
          {loading && <Loader2 className="animate-spin text-accent" size={24} />}
        </h1>
        <p className="text-lg text-text-secondary mt-4 max-w-xl">
          From pitch nights to mega-summits, stay on top of everything happening in Cyberabad.
        </p>
      </div>

      <div className="space-y-4">
        {allEvents.map((ev, i) => (
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
