-- Phase 3.1: simplify inquiry workflow to new | handled
-- Idempotent / production-safe for existing contacted/closed rows

-- 1) Drop legacy status check if present
alter table public.contact_inquiries
  drop constraint if exists contact_inquiries_status_check;

-- 2) Migrate legacy workflow values → handled
update public.contact_inquiries
set status = 'handled'
where status in ('contacted', 'closed');

-- 3) Normalize anything unexpected (defensive) to handled, keep new
update public.contact_inquiries
set status = 'handled'
where status is distinct from 'new'
  and status is distinct from 'handled';

-- 4) Final allowed statuses
alter table public.contact_inquiries
  add constraint contact_inquiries_status_check
  check (status in ('new', 'handled'));

-- 5) Ensure default remains new
alter table public.contact_inquiries
  alter column status set default 'new';

comment on column public.contact_inquiries.status is
  'Workflow state: new = needs attention; handled = reviewed/processed.';
