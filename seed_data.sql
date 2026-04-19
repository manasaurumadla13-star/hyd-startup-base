-- SEED DATA FOR HYD STARTUP PORTAL

-- 1. POPULATE STARTUPS
insert into startups (name, founder, category, stage, funding, website, initials, color, description) values
('Darwinbox', 'Chaitanya Peddi, Jayant Paleti, Rohit Chennamaneni, Vineet Singh', 'SaaS', 'Unicorn', '$307M', 'https://darwinbox.com', 'DB', '#7c6af7', 'End-to-end cloud HR platform unifying recruitment, onboarding, payroll and performance for 350+ global enterprises. Hyderabad''s only unicorn valued at $1B+.'),
('Keka HR', 'Vijay Yalamanchili', 'SaaS', 'Series A', '$57M', 'https://keka.com', 'KH', '#1dd5a0', 'Cloud-based HR & payroll automation platform for mid-sized enterprises. India''s fastest-growing HR SaaS — raised $57M Series A in 2024.'),
('Skyroot Aerospace', 'Pawan Kumar Chandana, Naga Bharath Daka', 'SpaceTech', 'Series C', '$95.1M', 'https://skyroot.in', 'SA', '#5ba4f5', 'India''s first privately developed orbital launch vehicle company. The Vikram series rockets make small-satellite deployment affordable and accessible.'),
('Dhruva Space', 'Sanjay Nekkanti', 'SpaceTech', 'Series A', '$40M', 'https://dhruvaspace.com', 'DS', '#5ba4f5', 'End-to-end space technology solutions provider. Launched India''s first commercial satellite mission aboard SpaceX in 2025 — a historic milestone.'),
('Fourth Partner Energy', 'Vivek Subramanian, Saif Dhorajiwala', 'CleanTech', 'Series D', '$710M+', 'https://fourthpartner.co', 'FP', '#f5a623', 'India''s largest commercial and industrial solar energy company. Operates utility-scale, rooftop and open-access solar projects across 15+ states.'),
('StanPlus', 'Prabhdeep Singh, Tanmay Newatia', 'Health', 'Series B', '$30M', 'https://stanplus.com', 'SP', '#ff6b6b', 'Tech-enabled 24/7 emergency medical transportation using GPS tracking and optimised hospital dispatch. Building India''s most reliable emergency network.'),
('Credright', 'Neeraj Bansal, Vineet Jawa', 'FinTech', 'Series B', '$23.5M', 'https://credright.com', 'CR', '#e879b0', 'Fintech lending platform bridging the credit gap for micro and small businesses underserved by traditional banking with streamlined digital workflows.'),
('NextBillion.ai', 'Ajay Bulusu, Gaurav Bubna', 'AI', 'Series B', '$45M', 'https://nextbillion.ai', 'NB', '#7c6af7', 'AI-powered mapping and navigation APIs purpose-built for emerging markets. Their customisable location stack powers logistics, mobility and last-mile delivery.'),
('Marut Drones', 'Prem Kumar Vislawath', 'AgriTech', 'Series B', '$18M', 'https://marutdrones.com', 'MD', '#5ecb8a', 'India''s leading agri-drone company offering precision spraying, seeding and crop-monitoring services. Deep-tech meets farm productivity.'),
('UrbanKissan', 'Narayanan Ayyappan', 'AgriTech', 'Series A', '$8M', 'https://urbankissan.com', 'UK', '#5ecb8a', 'Sustainable urban farming platform connecting consumers directly with local organic farmers, cutting food miles and ensuring farm-fresh produce delivery.');

-- 2. POPULATE INVESTORS
insert into investors (name, type, focus, portfolio, initials, color) values
('Peak XV Partners', 'Venture Capital', 'SaaS, FinTech, Consumer Tech — Series A to D', 'Darwinbox, Keka HR, 80+ Hyd companies', 'PX', '#7c6af7'),
('T-Hub Foundation', 'Incubator / Accelerator', 'All sectors — world''s largest startup incubator', 'EON Space Labs, Kenyt.AI, 2,000+ startups', 'TH', '#1dd5a0'),
('Accel India', 'Venture Capital', 'Early-stage SaaS, Consumer & Deep Tech', 'Skyroot, Keka HR, Darwinbox, 50+ portfolio', 'AC', '#5ba4f5'),
('WE-Hub', 'Women Entrepreneur Hub', 'Women-led startups across all sectors', '150+ women founders mentored & funded', 'WH', '#e879b0'),
('CIE IIIT Hyderabad', 'University Incubator', 'Deep Tech, AI, Enterprise & Cybersecurity', 'NextBillion.ai, 100+ alumni startups', 'CI', '#f5a623');

-- 3. POPULATE JOBS
insert into jobs (title, company, category, location, salary, experience, description, initials, color) values
('Senior Backend Engineer', 'Darwinbox', 'Engineering', 'Banjara Hills, Hyd', '₹28L–₹45L', '4–7 yrs', 'Build and scale microservices powering HR workflows for 350+ global enterprises. Strong Node.js, PostgreSQL and AWS skills required.', 'DB', '#7c6af7'),
('ML Engineer — NLP', 'Kenyt.AI', 'Data', 'Gachibowli, Hyd', '₹18L–₹32L', '2–5 yrs', 'Train and deploy multilingual NLP models for conversational AI in 30+ Indian languages. Experience with transformers and LLM fine-tuning a plus.', 'KA', '#a08bff'),
('Aerospace Systems Engineer', 'Skyroot Aerospace', 'Engineering', 'Gachibowli, Hyd', '₹20L–₹36L', '3–6 yrs', 'Design and test propulsion and avionics systems for the Vikram launch vehicle series. Experience in MATLAB, systems integration and launch ops preferred.', 'SA', '#5ba4f5'),
('UI/UX Designer', 'NextBillion.ai', 'Design', 'HITEC City, Hyd', '₹14L–₹24L', '2–4 yrs', 'Design intuitive dashboards and developer portals for AI-powered mapping APIs used across 25+ countries. Figma and user research expertise required.', 'NB', '#7c6af7'),
('Drone Operations Lead', 'Marut Drones', 'Operations', 'HITEC City, Hyd', '₹10L–₹18L', '2–4 yrs', 'Manage end-to-end agri-drone spraying operations across Telangana and AP. DGCA drone pilot certification required.', 'MD', '#5ecb8a');

-- 4. POPULATE EVENTS
insert into events (title, day, month, venue, type, color) values
('Founder Friday — Pitch Night #48', '19', 'Apr', 'T-Hub Phase 2, Raidurgam, Hyderabad', 'Pitch Night', '#7c6af7'),
('Deep Tech Demo Day — SpaceTech Edition 2026', '26', 'Apr', 'IIIT Hyderabad Auditorium, Gachibowli', 'Demo Day', '#5ba4f5'),
('HydTech Hackathon 2026 — AI & Sustainability', '03', 'May', 'Microsoft Hyderabad Campus, Gachibowli', 'Hackathon', '#1dd5a0'),
('WE-Hub Women Founders Summit 2026', '10', 'May', 'WE-Hub, IIIT-H Campus, Hyderabad', 'Summit', '#e879b0'),
('AgriTech & DronesTech Innovation Conclave', '24', 'May', 'ICRISAT Campus, Patancheru, Hyderabad', 'Conference', '#5ecb8a');
