import React from "react";

export default function Footer({ onPageChange }: { onPageChange: (p: string) => void }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'startups', label: 'Startups' },
    { id: 'investors', label: 'Investors' },
    { id: 'events', label: 'Events' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-bg2 border-t border-border-default pt-16 pb-12 px-8 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => onPageChange(link.id)}
            className="text-[0.85rem] text-text-secondary hover:text-accent2 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-xl mb-4">
        <span>Proudly built for the City of Pearls</span>
        <span className="grayscale">🦢</span>
      </div>
      
      <div className="text-[0.78rem] text-text-muted text-center max-w-xl leading-relaxed">
        <p>© 2026 HYD Startup Portal · Data sourced from T-Hub, Tracxn, Failory & official startup websites</p>
        <p className="mt-1">Powered by Gemini AI · HITEC City, Hyderabad, Telangana</p>
      </div>
    </footer>
  );
}
