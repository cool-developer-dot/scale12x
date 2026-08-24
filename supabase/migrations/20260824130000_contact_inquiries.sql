-- Phase 2: permanent contact inquiry storage
-- Apply via Supabase Dashboard → SQL Editor → Run
-- OR: supabase db push / migration runner when configured

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  work_email text not null,
  company text not null,
  role_title text null,
  website text null,
  service text not null,
  message text not null,
  budget text null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint contact_inquiries_status_check
    check (status in ('new', 'contacted', 'closed')),
  constraint contact_inquiries_first_name_len
    check (char_length(first_name) between 1 and 80),
  constraint contact_inquiries_last_name_len
    check (char_length(last_name) between 1 and 80),
  constraint contact_inquiries_work_email_len
    check (char_length(work_email) between 3 and 254),
  constraint contact_inquiries_company_len
    check (char_length(company) between 1 and 160),
  constraint contact_inquiries_role_title_len
    check (role_title is null or char_length(role_title) <= 120),
  constraint contact_inquiries_website_len
    check (website is null or char_length(website) <= 500),
  constraint contact_inquiries_service_len
    check (char_length(service) between 1 and 400),
  constraint contact_inquiries_message_len
    check (char_length(message) between 20 and 5000),
  constraint contact_inquiries_budget_len
    check (budget is null or char_length(budget) <= 80)
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create index if not exists contact_inquiries_status_idx
  on public.contact_inquiries (status);

create index if not exists contact_inquiries_work_email_idx
  on public.contact_inquiries (work_email);

alter table public.contact_inquiries enable row level security;

-- Defense in depth: no anon/authenticated table privileges.
-- Service role bypasses RLS for trusted server inserts (Phase 2).
-- Phase 3 will add authenticated admin SELECT policies as needed.
revoke all on table public.contact_inquiries from anon, authenticated;
grant all on table public.contact_inquiries to service_role;

comment on table public.contact_inquiries is
  'Scale12x contact form leads. Writes only via trusted server (service role).';
