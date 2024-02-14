create table locations (
  id uuid primary key,
  zip_code text not null,
  place text not null,
  district text not null,
  city text not null,
  state text not null,
  country text not null
);

alter table locations enable row level security;
