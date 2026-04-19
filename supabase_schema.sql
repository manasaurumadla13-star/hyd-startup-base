-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. STARTUPS TABLE
create table startups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  founder text,
  category text not null,
  stage text,
  funding text,
  founded int,
  location text,
  description text,
  website text,
  initials text,
  color text,
  created_at timestamp with time zone default now(),
  created_by uuid references auth.users(id)
);

-- 3. INVESTORS TABLE
create table investors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text,
  focus text,
  portfolio text,
  initials text,
  color text,
  created_at timestamp with time zone default now()
);

-- 4. JOBS TABLE
create table jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  category text,
  location text,
  job_type text,
  salary text,
  experience text,
  description text,
  initials text,
  color text,
  created_at timestamp with time zone default now()
);

-- 5. EVENTS TABLE
create table events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  day text not null,
  month text not null,
  venue text,
  type text,
  description text,
  color text,
  created_at timestamp with time zone default now()
);

-- 6. CONTACT MESSAGES (For the backend logs)
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
alter table startups enable row level security;
alter table investors enable row level security;
alter table jobs enable row level security;
alter table events enable row security;
alter table contact_messages enable row level security;

-- 8. POLICIES (Public read, Private write)
-- Allow anyone to read these tables
create policy "Allow public read on startups" on startups for select using (true);
create policy "Allow public read on investors" on investors for select using (true);
create policy "Allow public read on jobs" on jobs for select using (true);
create policy "Allow public read on events" on events for select using (true);

-- Allow anyone to insert contact messages
create policy "Allow public contact insert" on contact_messages for insert with check (true);

-- Protect internal tables (Example: Profile)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
