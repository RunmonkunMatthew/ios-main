-- ================================================
-- IOS Wedding Main Site — Supabase Schema
-- Run in your Supabase SQL editor
-- ================================================

-- Full RSVP table (main site)
create table if not exists rsvp_main (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  email            text not null,
  attendance       text not null check (attendance in ('yes', 'no')),
  guest_count      integer not null default 0 check (guest_count between 0 and 5),
  meal_preference  text,
  message          text,
  created_at       timestamptz default now()
);

create unique index if not exists rsvp_main_email_idx on rsvp_main (lower(email));

alter table rsvp_main enable row level security;

create policy "Allow public RSVP insert"
  on rsvp_main for insert to anon
  with check (true);

create policy "Allow authenticated read"
  on rsvp_main for select to authenticated
  using (true);

-- Guestbook / Wishes (goes live after wedding)
-- Toggle visibility by enabling/disabling the insert policy
create table if not exists wishes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  message     text not null,
  created_at  timestamptz default now()
);

alter table wishes enable row level security;

-- DISABLED by default — enable this policy after the wedding
-- create policy "Allow public wish insert"
--   on wishes for insert to anon
--   with check (true);

-- Wishes are public to read (guestbook is displayed to all)
create policy "Allow public wish read"
  on wishes for select to anon
  using (true);

create policy "Allow authenticated wish read"
  on wishes for select to authenticated
  using (true);
