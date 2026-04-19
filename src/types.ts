export interface Startup {
  name: string;
  founder: string;
  category: string;
  stage: string;
  funding: string;
  founded: number;
  location: string;
  desc: string;
  color: string;
  initials: string;
  website: string;
}

export interface Investor {
  name: string;
  type: string;
  focus: string;
  portfolio: string;
  initials: string;
  color: string;
}

export interface EcosystemEvent {
  day: string;
  month: string;
  title: string;
  venue: string;
  type: string;
  typeColor: string;
  desc?: string;
}

export interface Job {
  id: number | string;
  title: string;
  company: string;
  initials: string;
  color: string;
  category: string;
  location: string;
  type: string;
  salary: string;
  exp: string;
  desc: string;
}

export interface StartupDetail {
  tagline?: string;
  about?: string;
  products?: string[];
  founders?: { name: string; role: string }[];
  funding?: string;
  valuation?: string;
  employees?: string;
  customers?: string;
  recentNews?: { headline: string; date: string }[];
  techStack?: string[];
  awards?: string[];
  website?: string;
  linkedin?: string;
  hiring?: boolean;
}
