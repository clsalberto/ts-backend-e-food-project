create table plans (
  id uuid primary key,
  name text not null,
  description text null,
  quantity_months int2 not null,
  value int8 not null
);

alter table plans enable row level security;
