-- Drop policies if they already exist (safe to run multiple times)
drop policy if exists "Allow insert for authenticated users" on public.platform_feedback;
drop policy if exists "Allow select for authenticated users" on public.platform_feedback;

-- Create the table if it does not exist
create table if not exists public.platform_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category text not null,
  rating int,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table public.platform_feedback enable row level security;

-- Allow inserts by authenticated users for their own user_id (Postgres 15+ syntax)
create policy "Allow insert for authenticated users"
  on public.platform_feedback
  for insert
  with check (auth.uid() = user_id);

-- Allow select for authenticated users to view their feedback
create policy "Allow select for authenticated users"
  on public.platform_feedback
  for select
  using (auth.uid() = user_id);