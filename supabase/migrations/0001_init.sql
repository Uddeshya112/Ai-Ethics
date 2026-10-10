-- Beyond Autopilot schema. Initial research remains draft until editorial review.
-- Research tables are public-read only for published records; private workspace
-- rows are isolated by auth.uid(). No browser code uses the service-role key.

create or replace function public.is_editor() returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'editor'
$$;

create table if not exists public.incidents (
  id text primary key, slug text not null unique, title text not null,
  incident_date date, location text, summary text,
  publication_status text not null default 'draft' check (publication_status in ('draft','published')),
  created_at timestamptz not null default now()
);
create table if not exists public.incident_events (
  id uuid primary key default gen_random_uuid(),
  incident_id text not null references public.incidents(id) on update cascade on delete cascade,
  event_date date, description text not null,
  classification text not null check (classification in ('official_finding','documented_fact','reported_fact','research_interpretation','hypothesis','conceptual_assumption')),
  source_ids text[] not null default '{}', position integer not null default 0
);
create table if not exists public.sources (
  id text primary key, title text not null, publisher text not null, url text not null default '',
  source_type text not null check (source_type in ('official_report','government_data','peer_reviewed','journalism','company_statement','legal_filing','primary_translation')),
  language text not null default 'en', published_at date, accessed_at date, last_verified_at date,
  limitations text[] not null default '{}', translation_of_id text
);
create table if not exists public.claims (
  id text primary key, incident_id text references public.incidents(id) on update cascade on delete set null,
  statement text not null,
  classification text not null check (classification in ('official_finding','documented_fact','reported_fact','research_interpretation','hypothesis','conceptual_assumption')),
  confidence text not null default 'unassessed' check (confidence in ('high','moderate','limited','unassessed')),
  status text not null default 'draft' check (status in ('draft','in_review','published')),
  limitations text[] not null default '{}', last_verified_at date, created_at timestamptz not null default now()
);
create table if not exists public.claim_sources (
  claim_id text not null references public.claims(id) on update cascade on delete cascade,
  source_id text not null references public.sources(id) on update cascade on delete restrict,
  relationship text not null check (relationship in ('supports','qualifies','contradicts')),
  locator text, notes text, primary key (claim_id, source_id, relationship)
);
create table if not exists public.correction_log (
  id uuid primary key default gen_random_uuid(),
  claim_id text references public.claims(id) on update cascade on delete set null,
  affected_claim_ids text[] not null default '{}',
  title text not null, description text not null, reason text not null,
  corrected_at timestamptz not null default now(),
  status text not null default 'draft' check (status in ('draft','published')),
  reviewer_id text, source_ids text[] not null default '{}'
);
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text, created_at timestamptz not null default now()
);
create table if not exists public.user_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text, claim_id text references public.claims(id) on update cascade on delete set null,
  incident_id text references public.incidents(id) on update cascade on delete set null,
  body text not null check (char_length(body) <= 10000),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.user_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('claim','incident','source')), target_id text not null,
  created_at timestamptz not null default now(), unique (user_id, target_type, target_id)
);
create table if not exists public.saved_simulations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario_id text not null, scenario_version text not null,
  inputs jsonb not null default '{}'::jsonb check (jsonb_typeof(inputs) = 'object'),
  created_at timestamptz not null default now()
);

create index if not exists claims_incident_status_idx on public.claims(incident_id,status);
create index if not exists claim_sources_source_id_idx on public.claim_sources(source_id);
create index if not exists user_notes_user_id_idx on public.user_notes(user_id);
create index if not exists user_bookmarks_user_id_idx on public.user_bookmarks(user_id);
create index if not exists saved_simulations_user_id_idx on public.saved_simulations(user_id);

alter table public.incidents enable row level security;
alter table public.incident_events enable row level security;
alter table public.sources enable row level security;
alter table public.claims enable row level security;
alter table public.claim_sources enable row level security;
alter table public.correction_log enable row level security;
alter table public.profiles enable row level security;
alter table public.user_notes enable row level security;
alter table public.user_bookmarks enable row level security;
alter table public.saved_simulations enable row level security;

create policy incidents_public_read on public.incidents for select to anon, authenticated
  using (publication_status = 'published' or public.is_editor());
create policy incidents_editor_manage on public.incidents for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy events_public_read on public.incident_events for select to anon, authenticated
  using (public.is_editor() or exists (select 1 from public.incidents i where i.id = incident_events.incident_id and i.publication_status = 'published'));
create policy events_editor_manage on public.incident_events for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy claims_public_read on public.claims for select to anon, authenticated
  using (status = 'published' or public.is_editor());
create policy claims_editor_manage on public.claims for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy sources_public_read on public.sources for select to anon, authenticated
  using (public.is_editor() or exists (select 1 from public.claim_sources cs join public.claims c on c.id = cs.claim_id where cs.source_id = sources.id and c.status = 'published'));
create policy sources_editor_manage on public.sources for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy claim_sources_public_read on public.claim_sources for select to anon, authenticated
  using (public.is_editor() or exists (select 1 from public.claims c where c.id = claim_sources.claim_id and c.status = 'published'));
create policy claim_sources_editor_manage on public.claim_sources for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy corrections_public_read on public.correction_log for select to anon, authenticated
  using (status = 'published' or public.is_editor());
create policy corrections_editor_manage on public.correction_log for all to authenticated
  using (public.is_editor()) with check (public.is_editor());
create policy profiles_owner on public.profiles for all to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);
create policy user_notes_owner_only on public.user_notes for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy user_bookmarks_owner_only on public.user_bookmarks for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy saved_simulations_owner_only on public.saved_simulations for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Explicitly remove delete privileges on research records; user-owned workspace rows can be deleted.
revoke delete on public.incidents, public.incident_events, public.sources, public.claims, public.claim_sources, public.correction_log from anon, authenticated;
grant select on public.incidents, public.incident_events, public.sources, public.claims, public.claim_sources, public.correction_log to anon, authenticated;
grant insert, update on public.incidents, public.incident_events, public.sources, public.claims, public.claim_sources, public.correction_log to authenticated;
grant select, insert, update, delete on public.profiles, public.user_notes, public.user_bookmarks, public.saved_simulations to authenticated;
