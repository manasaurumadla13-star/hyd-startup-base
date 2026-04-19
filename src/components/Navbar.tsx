interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  onAuth: (type: 'login' | 'signup') => void;
}

export default function Navbar({ activePage, onPageChange, onAuth }: NavbarProps) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'startups', label: 'Startups' },
    { id: 'investors', label: 'Investors' },
    { id: 'events', label: 'Events' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-16 bg-bg/95 backdrop-blur-xl border-b border-border-default px-4 md:px-8 flex items-center justify-between">
      <div 
        className="flex items-center gap-2.5 cursor-pointer group" 
        onClick={() => onPageChange('home')}
      >
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-display font-extrabold text-xs text-white group-hover:scale-105 transition-transform">
          H
        </div>
        <span className="font-display font-extrabold text-[1.1rem] tracking-tight text-text-primary hidden sm:inline-block">
          HYD Startup Portal
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-1">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => onPageChange(link.id)}
            className={`px-4 py-2 rounded-lg text-[0.88rem] font-medium transition-all relative
              ${activePage === link.id ? 'text-accent2' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            {link.label}
            {activePage === link.id && (
              <span className="absolute bottom-[2px] left-4 right-4 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button 
          onClick={() => onAuth('login')}
          className="px-4 py-1.5 rounded-lg border border-border-strong text-text-secondary text-[0.82rem] font-medium hover:bg-surface hover:text-text-primary transition-all"
        >
          Login
        </button>
        <button 
          onClick={() => onAuth('signup')}
          className="px-4 py-1.5 rounded-lg bg-accent text-white text-[0.82rem] font-bold hover:bg-accent2 transition-all shadow-lg shadow-accent/20"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
