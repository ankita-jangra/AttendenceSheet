-- Attendance app schema for Supabase
create extension if not exists "pgcrypto";

create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hindi_name text not null default '',
  is_active boolean not null default true,
  salary_per_day numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.staff add column if not exists hindi_name text not null default '';
alter table public.staff add column if not exists is_active boolean not null default true;

create table if not exists public.attendance (
  id text primary key,
  staff_id uuid not null references public.staff(id) on delete cascade,
  date date not null,
  status text not null check (status in ('Present', 'Absent', 'Partial')),
  hours numeric(5,2) not null default 0,
  extra_hours numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  unique (staff_id, date)
);
alter table public.attendance add column if not exists extra_hours numeric(5,2) not null default 0;

create table if not exists public.advances (
  id text primary key,
  staff_id uuid not null references public.staff(id) on delete cascade,
  date date not null,
  type text not null check (type in ('taken', 'settle')),
  amount numeric(12,2) not null default 0,
  note text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.app_users (
  id text primary key,
  username text not null unique,
  password text not null,
  role text not null default 'user',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.app_users (id, username, password, role, is_active)
values ('admin', 'admin', 'ankita00', 'admin', true)
on conflict (id) do update set username = excluded.username;

-- If table already existed earlier, update status constraint for Partial support.
do $$
begin
  if exists (
    select 1
    from information_schema.table_constraints
    where table_schema = 'public'
      and table_name = 'attendance'
      and constraint_name = 'attendance_status_check'
  ) then
    alter table public.attendance drop constraint attendance_status_check;
  end if;
  alter table public.attendance
    add constraint attendance_status_check check (status in ('Present', 'Absent', 'Partial'));
exception when duplicate_object then
  null;
end $$;

create index if not exists idx_attendance_staff_id on public.attendance(staff_id);
create index if not exists idx_attendance_date on public.attendance(date);
create index if not exists idx_advances_staff_id on public.advances(staff_id);
create index if not exists idx_advances_date on public.advances(date);

alter table public.staff enable row level security;
alter table public.attendance enable row level security;
alter table public.advances enable row level security;
alter table public.app_users enable row level security;

-- Demo policy: public access with anon key (simple static app setup).
-- For production, switch to authenticated user-based policies.
drop policy if exists "public staff access" on public.staff;
create policy "public staff access" on public.staff for all using (true) with check (true);

drop policy if exists "public attendance access" on public.attendance;
create policy "public attendance access" on public.attendance for all using (true) with check (true);

drop policy if exists "public advances access" on public.advances;
create policy "public advances access" on public.advances for all using (true) with check (true);

drop policy if exists "public app users access" on public.app_users;
create policy "public app users access" on public.app_users for all using (true) with check (true);
