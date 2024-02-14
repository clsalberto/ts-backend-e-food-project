create table signatures (
  id uuid primary key,
  store_id uuid not null,
  plan_id uuid not null,
  created_at timestamp not null
);

alter table signatures add foreign key (store_id) references stores (id);
alter table signatures add foreign key (plan_id) references plans (id);

alter table signatures enable row level security;
